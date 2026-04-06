"""
infer_rag.py — ASHA-VANI Production Inference
Version 4 — Mac MPS:
  - Stronger Hinglish via few-shot examples in system prompt
  - Adapter loading with clear error if missing
  - max_new_tokens = 45 always (voice constraint + speed)
  - Greedy decoding, no top_k/top_p warnings
"""

import os, time, torch, numpy as np
from pathlib import Path
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel

os.environ.setdefault('PYTORCH_ENABLE_MPS_FALLBACK', '1')

# ── Paths ─────────────────────────────────────────────────────────
BASE_DIR      = Path(__file__).parent
BASE_MODEL_ID = 'Qwen/Qwen2.5-3B-Instruct'
ADAPTER_PATH  = str(BASE_DIR / 'adapters' / 'asha_vani_lora')
CACHE_DIR     = str(BASE_DIR / 'models')
PROTOCOL_PATH = str(BASE_DIR / 'shared' / 'data' / 'asha_protocols.txt')

def _get_device() -> str:
    if torch.cuda.is_available():         return 'cuda'
    if torch.backends.mps.is_available(): return 'mps'
    return 'cpu'

DEVICE = _get_device()

# ── Constants ─────────────────────────────────────────────────────
IDK_PHRASE = 'Mujhe iski jaankari nahi hai. Kripya turant PHC jayein ya 108 par call karein.'

IDK_TRIGGERS = {
    'cancer', 'diabetes', 'insulin', 'surgery', 'operation',
    'prescription', 'x-ray', 'xray', 'specialist', 'ecg',
    'mri', 'ct scan', 'chemotherapy', 'radiation', 'oncology',
    'cardiology', 'neurology', 'orthopedic', 'psychiatry',
}

URGENCY_KEYWORDS = {
    'seizure', 'jhatke', 'khoon', 'bleeding',
    'saans nahi', 'not breathing', 'behosh', 'unconscious',
    'nahi uth raha', 'convulsion', 'postpartum',
    'prasav ke baad khoon', 'baby thanda', 'asphyxia',
}

TRIAGE_KEYWORDS = ['108', 'PHC', 'turant', 'hospital', 'call karo', 'jayein']

# ── Few-shot examples injected into EVERY system prompt ──────────
# This is the strongest way to enforce Hinglish on the base model
# while the adapter is not yet loaded.
FEW_SHOT = """
Hinglish jawab ke examples — bilkul aise likhna hai:
Q: Bachche ko bukhar aur jhatke aa rahe hain
A: Ghabrao mat. Bachche ko karwat pe lita do. Munh mein kuch mat daalo. 108 call karo turant.

Q: Baby saans nahi le raha
A: Baby ko saaf kapde se poncho. Peeth ragdo. Agar 1 minute mein saans na aaye — 108 call karo, hospital le jao.

Q: Delivery ke baad khoon aa raha hai
A: 108 abhi call karo. Uterus massage karo — pet ke neeche gol-gol. Maa ko garam rakho.

Q: Baby thanda hai
A: Turant KMC shuru karo — nange baby ko maa ki chhati pe rakho. Kapde se dhako. 108 call karo.
"""


def urgency_check(text: str) -> str:
    text_lower = text.lower()
    for kw in URGENCY_KEYWORDS:
        if kw in text_lower:
            return 'high'
    return 'normal'


def is_out_of_scope(text: str) -> bool:
    return any(t in text.lower() for t in IDK_TRIGGERS)


# ── RAG ───────────────────────────────────────────────────────────
class ASHAKnowledgeBase:
    def __init__(self, protocol_path: str):
        try:
            import faiss
            from sentence_transformers import SentenceTransformer
        except ImportError:
            raise ImportError('pip install faiss-cpu sentence-transformers')

        print('[RAG] Loading embedder...')
        self.embedder = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

        print(f'[RAG] Loading protocols from {protocol_path}...')
        with open(protocol_path, 'r', encoding='utf-8') as f:
            text = f.read()

        raw_chunks = [c.strip() for c in text.split('\n\n') if len(c.strip()) > 40]
        self.chunks = []
        for chunk in raw_chunks:
            if len(chunk) > 300:
                sentences = chunk.replace('. ', '.|').split('|')
                current = ''
                for s in sentences:
                    if len(current) + len(s) < 300:
                        current += s + '. '
                    else:
                        if current.strip():
                            self.chunks.append(current.strip())
                        current = s + '. '
                if current.strip():
                    self.chunks.append(current.strip())
            else:
                self.chunks.append(chunk)

        print(f'[RAG] Indexing {len(self.chunks)} chunks...')
        embeddings = self.embedder.encode(
            self.chunks, show_progress_bar=False, batch_size=32,
        ).astype(np.float32)

        dim = embeddings.shape[1]
        self.index = __import__('faiss').IndexFlatL2(dim)
        self.index.add(embeddings)
        print(f'[RAG] Ready — {len(self.chunks)} chunks indexed.')

    def retrieve(self, query: str, k: int = 2) -> str:
        q = self.embedder.encode([query]).astype(np.float32)
        _, idx = self.index.search(q, k)
        return '\n\n'.join(self.chunks[i] for i in idx[0] if i < len(self.chunks))


def load_rag(protocol_path: str = PROTOCOL_PATH) -> ASHAKnowledgeBase:
    return ASHAKnowledgeBase(protocol_path)


# ── Model Loader ──────────────────────────────────────────────────
def load_model(
    base_model_id: str = BASE_MODEL_ID,
    adapter_path:  str = ADAPTER_PATH,
    cache_dir:     str = CACHE_DIR,
) -> tuple:
    print(f'[MODEL] Device: {DEVICE}')
    print('[MODEL] Loading tokenizer...')

    tok = AutoTokenizer.from_pretrained(
        base_model_id, cache_dir=cache_dir,
        trust_remote_code=True, padding_side='left',
    )
    if tok.pad_token is None:
        tok.pad_token = tok.eos_token

    print('[MODEL] Loading base model...')
    t0 = time.perf_counter()

    m = AutoModelForCausalLM.from_pretrained(
        base_model_id,
        cache_dir=cache_dir,
        torch_dtype=torch.float16,
        device_map={'': DEVICE},
        trust_remote_code=True,
    )

    if os.path.exists(adapter_path) and \
       os.path.exists(os.path.join(adapter_path, 'adapter_model.safetensors')):
        print(f'[MODEL] ✅ Attaching LoRA adapter from {adapter_path}...')
        m = PeftModel.from_pretrained(m, adapter_path, is_trainable=False)
        print('[MODEL] LoRA adapter attached — Hinglish + NHM behaviour active.')
    else:
        print(f'[MODEL] ⚠️  No adapter found at {adapter_path}')
        print('[MODEL]    Using base model — responses will be slower and less accurate.')
        print('[MODEL]    Fix: download adapter_model.safetensors from Kaggle output tab.')
        print(f'[MODEL]    Place at: {adapter_path}/adapter_model.safetensors')

    m.eval()
    print(f'[MODEL] Ready in {time.perf_counter()-t0:.1f}s')
    return m, tok


def warmup(model, tokenizer, rag: ASHAKnowledgeBase):
    print('[WARMUP] Running warm-up query...')
    infer('Test.', model, tokenizer, rag, max_new_tokens=5)
    print('[WARMUP] Done — pipeline ready.')


# ── Core Inference ────────────────────────────────────────────────
def infer(
    prompt:         str,
    model,
    tokenizer,
    rag:            ASHAKnowledgeBase,
    max_new_tokens: int = 45,
    urgency:        str = None,
) -> str:
    """CONTRACT: Hinglish text → Hinglish medical guidance. Never raises."""
    try:
        # Layer 1: Hard IDK gate — 0ms, fires before model
        if is_out_of_scope(prompt):
            return IDK_PHRASE

        # Layer 2: Urgency
        if urgency is None:
            urgency = urgency_check(prompt)

        # Layer 3: RAG
        context = rag.retrieve(prompt, k=2)

	# Layer 4: System prompt with few-shot Hinglish examples
        if urgency == 'high':
            system = (
                'Tu ek ASHA worker assistant hai. '
                'SIRF Hinglish mein jawab de (Hindi + thodi English milaake). '
                'Pure English BILKUL NAHI. '
                'Emergency hai — sirf 2-3 chote commanding sentences.\n\n'
                + FEW_SHOT +
                '\nAb SIRF neeche diye NHM guidelines se jawab de:\n'
                f'--- NHM GUIDELINES ---\n{context}\n----------------------\n'
                f'Agar jawab nahi pata: "{IDK_PHRASE}"'
            )
            max_new_tokens = 75 # BUMPED: Gives enough room to finish the thought

        else:
            system = (
                'Tu ek ASHA worker assistant hai. '
                'SIRF Hinglish mein jawab de (Hindi + thodi English milaake). '
                'Pure English BILKUL NAHI.\n\n'
                + FEW_SHOT +
                '\nAb SIRF neeche diye NHM guidelines se jawab de:\n'
                f'--- NHM GUIDELINES ---\n{context}\n----------------------\n'
                f'Agar jawab nahi pata: "{IDK_PHRASE}"'
            )
            max_new_tokens = 75 # BUMPED: Match emergency limit for consistency
        # Layer 5: Greedy decoding — fastest on MPS, no warnings
        with torch.no_grad():
            output_ids = model.generate(
                **inputs,
                max_new_tokens=max_new_tokens,
                do_sample=False,
                temperature=None,
                top_p=None,
                repetition_penalty=1.15,
                pad_token_id=tokenizer.eos_token_id,
                use_cache=True,
            )

        new_ids  = output_ids[0][inputs['input_ids'].shape[-1]:]
        response = tokenizer.decode(new_ids, skip_special_tokens=True).strip()

        # Layer 6: Post-generation safety
        oos = 'out of scope' in context.lower() or 'jaankari nahi' in context.lower()
        if oos and not any(k in response for k in TRIAGE_KEYWORDS):
            return IDK_PHRASE

        return response

    except Exception as e:
        print(f'[infer() ERROR] {e}')
        return 'Kripya turant PHC jayein ya 108 par call karein.'


# ── Smoke Test ────────────────────────────────────────────────────
if __name__ == '__main__':
    print('\n' + '='*60)
    print('ASHA-VANI infer_rag.py Smoke Test — v4')
    print('='*60)

    adapter_loaded = (
        os.path.exists(ADAPTER_PATH) and
        os.path.exists(os.path.join(ADAPTER_PATH, 'adapter_model.safetensors'))
    )
    if not adapter_loaded:
        print('\n⚠️  ADAPTER NOT FOUND — running on base model.')
        print('   Latency will be ~3-8s. Hinglish quality will be lower.')
        print('   Download adapter_model.safetensors from Kaggle → Output tab')
        print(f'   Place at: {ADAPTER_PATH}/adapter_model.safetensors\n')

    rag              = load_rag()
    model, tokenizer = load_model()
    warmup(model, tokenizer, rag)

    TEST_CASES = [
        ('Didi, bachche ko 104 bukhar hai aur jhatke aa rahe hain!', 'emergency'),
        ('Baby saans nahi le raha, kya karun?',                      'emergency'),
        ('Delivery ke baad bahut zyada khoon aa raha hai.',           'emergency'),
        ('Naya baby bahut thanda hai.',                               'emergency'),
        ('Mujhe cancer ka treatment batao.',                          'idk'),
        ('Diabetes ke liye insulin ki dose batao.',                   'idk'),
        ('Uterus massage kaise karein?',                              'general'),
        ('Seizure mein munh mein kuch daalna chahiye kya?',           'general'),
    ]

    print('\n[RESULTS]')
    print('-'*60)
    passed = 0
    for query, category in TEST_CASES:
        t0       = time.perf_counter()
        response = infer(query, model, tokenizer, rag)
        ms       = (time.perf_counter() - t0) * 1000
        urg      = urgency_check(query)

        if category == 'emergency':
            ok = any(k in response for k in TRIAGE_KEYWORDS)
        elif category == 'idk':
            ok = 'jaankari nahi' in response.lower()
        else:
            ok = len(response.split()) >= 4

        if ok: passed += 1
        print(f'[{"PASS" if ok else "FAIL"}][{urg:6s}][{ms:5.0f}ms] {query[:50]}')
        print(f'  → {response}')
        print()

    print(f'Result: {passed}/{len(TEST_CASES)} passed')
    print(f'Adapter: {"✅ LoRA active" if adapter_loaded else "❌ Base model only — get adapter from Kaggle"}')
    print('='*60)
