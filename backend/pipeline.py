"""
pipeline.py — ASHA-VANI Production Pipeline
Person E: Integration Lead

Fixed for Mac MPS:
  - Loads model/tokenizer/rag ONCE at startup (not per-call)
  - Passes model, tokenizer, rag into infer() correctly
  - Falls back gracefully to stub if real modules not yet ready
"""

import os, sys, time
os.environ.setdefault('PYTORCH_ENABLE_MPS_FALLBACK', '1')
sys.path.insert(0, '.')

from urgency_check import urgency_check

# ── Try real modules, fall back to stubs if not ready ──────────
try:
    from infer_rag import load_model, load_rag, infer, warmup
    USE_REAL_INFER = True
    print('[pipeline] Using real infer_rag.py')
except ImportError:
    from stubs.stub_infer import infer as _stub_infer
    USE_REAL_INFER = False
    print('[pipeline] Using stub_infer (infer_rag.py not found)')

try:
    from vad_stt import transcribe, capture_audio
    USE_REAL_STT = True
    print('[pipeline] Using real vad_stt.py')
except ImportError:
    from stubs.stub_transcribe import transcribe
    USE_REAL_STT = False
    print('[pipeline] Using stub_transcribe')

try:
    from tts import speak
    USE_REAL_TTS = True
    print('[pipeline] Using real tts.py')
except ImportError:
    from stubs.stub_speak import speak
    USE_REAL_TTS = False
    print('[pipeline] Using stub_speak')

# ── Load model once at startup ──────────────────────────────────
model = tokenizer = rag = None

if USE_REAL_INFER:
    print('[pipeline] Loading RAG + model (this takes ~10-15s on Mac MPS)...')
    rag            = load_rag()
    model, tokenizer = load_model()
    warmup(model, tokenizer, rag)
    print('[pipeline] Ready.')


# ── Core pipeline function ──────────────────────────────────────
def run_pipeline(audio_bytes: bytes):
    """
    Full pipeline: audio bytes → transcription → urgency → infer → TTS bytes.
    Prints latency for every stage.
    """
    t0 = time.perf_counter()

    # Stage 1: STT
    t1 = time.perf_counter()
    text = transcribe(audio_bytes)
    t_stt = (time.perf_counter() - t1) * 1000

    if not text.strip():
        print('[pipeline] Empty transcription — skipping.')
        return '', b''

    # Stage 2: Urgency detection (zero latency — string search)
    t2 = time.perf_counter()
    urgency = urgency_check(text)
    t_urg = (time.perf_counter() - t2) * 1000

    # Stage 3: SLM inference
    t3 = time.perf_counter()
    if USE_REAL_INFER:
        response = infer(text, model, tokenizer, rag, urgency=urgency)
    else:
        response = _stub_infer(text, urgency=urgency)
    t_slm = (time.perf_counter() - t3) * 1000

    # Stage 4: TTS
    t4 = time.perf_counter()
    audio_out = speak(response)
    t_tts = (time.perf_counter() - t4) * 1000

    total = (time.perf_counter() - t0) * 1000

    # Latency report
    from latency_validator import validate_latency
    stt_status  = validate_latency('stt',  t_stt)
    slm_status  = validate_latency('slm',  t_slm)
    tts_status  = validate_latency('tts',  t_tts)
    tot_status  = validate_latency('total', total)

    print(f'\n[STT:{t_stt:.0f}ms {stt_status} | URG:{t_urg:.0f}ms | SLM:{t_slm:.0f}ms {slm_status} | TTS:{t_tts:.0f}ms {tts_status} | TOTAL:{total:.0f}ms {tot_status}]')
    print(f'  Transcript: {text}')
    print(f'  Response:   {response}')
    print(f'  Urgency:    {urgency}')

    return response, audio_out


# ── Smoke test when run directly ────────────────────────────────
if __name__ == '__main__':
    print('\n' + '='*60)
    print('ASHA-VANI Pipeline Smoke Test')
    print('='*60)

    TEST_QUERIES_TEXT = [
        ('Didi, bachche ko 104 bukhar hai aur jhatke aa rahe hain!', 'emergency'),
        ('Baby saans nahi le raha, kya karun?',                      'emergency'),
        ('Delivery ke baad bahut zyada khoon aa raha hai.',           'emergency'),
        ('Mujhe cancer ka treatment batao.',                          'idk'),
        ('Uterus massage kaise karein?',                              'general'),
    ]

    TRIAGE_KEYWORDS = ['108', 'PHC', 'turant', 'hospital', 'karwat', 'massage', 'poncho']
    IDK_PHRASE      = 'jaankari nahi'
    passed = 0

    for query_text, category in TEST_QUERIES_TEXT:
        print(f'\nTesting [{category.upper()}]: {query_text}')

        # Use stub transcriber with injected text for text-only testing
        from stubs.stub_transcribe import transcribe as stub_t
        original_transcribe_func = transcribe

        # Directly call infer for text-mode smoke test
        t0 = time.perf_counter()
        if USE_REAL_INFER:
            response = infer(query_text, model, tokenizer, rag)
        else:
            response = _stub_infer(query_text)
        ms = (time.perf_counter() - t0) * 1000

        if category == 'emergency':
            ok = any(k in response for k in TRIAGE_KEYWORDS)
        elif category == 'idk':
            ok = IDK_PHRASE in response.lower()
        else:
            ok = len(response.split()) >= 4

        if ok:
            passed += 1
        status = 'PASS' if ok else 'FAIL'
        print(f'  [{status}] {ms:.0f}ms → {response[:80]}')

    print(f'\n{"="*60}')
    print(f'Result: {passed}/{len(TEST_QUERIES_TEXT)} passed')
    if passed == len(TEST_QUERIES_TEXT):
        print('✅ All tests passed — pipeline ready for demo.')
    else:
        print('⚠️  Some tests failed — check adapter is loaded (not base model only).')
    print('='*60)