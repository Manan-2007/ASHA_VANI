"""
main.py — ASHA-VANI FastAPI Backend
Mac MPS Edition — fixed infer() call signature throughout
"""

import os, sys, torch
os.environ.setdefault('PYTORCH_ENABLE_MPS_FALLBACK', '1')
sys.path.insert(0, '.')

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import uvicorn

app = FastAPI(title='ASHA-VANI Backend')
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

# ── Global model state (loaded once at startup) ───────────────────
_rag   = None
_model = None
_tok   = None
_infer = None       # holds the real infer function after startup
_transcribe = None  # holds the real transcribe function after startup
_speak      = None  # holds the real speak function after startup

def _device():
    if torch.cuda.is_available():         return 'cuda'
    if torch.backends.mps.is_available(): return 'mps'
    return 'cpu'


# ── Startup: load everything once ────────────────────────────────
@app.on_event('startup')
async def warm_start():
    global _rag, _model, _tok, _infer, _transcribe, _speak

    print('[STARTUP] Loading modules...')

    # infer
    try:
        from infer_rag import load_model, load_rag, infer, warmup
        _rag        = load_rag()
        _model, _tok = load_model()
        warmup(_model, _tok, _rag)
        _infer = infer
        print('[STARTUP] ✅ infer_rag.py loaded.')
    except Exception as e:
        print(f'[STARTUP] ⚠️  infer_rag failed ({e}), using stub.')
        from stubs.stub_infer import infer as stub_infer
        _infer = lambda text, *a, **kw: stub_infer(text)

    # transcribe
    try:
        from vad_stt import transcribe
        _transcribe = transcribe
        print('[STARTUP] ✅ vad_stt.py loaded.')
    except Exception as e:
        print(f'[STARTUP] ⚠️  vad_stt failed ({e}), using stub.')
        from stubs.stub_transcribe import transcribe as stub_t
        _transcribe = stub_t

    # speak
    try:
        from tts import speak
        _speak = speak
        print('[STARTUP] ✅ tts.py loaded.')
    except Exception as e:
        print(f'[STARTUP] ⚠️  tts failed ({e}), using stub.')
        from stubs.stub_speak import speak as stub_s
        _speak = stub_s

    print('[ASHA-VANI] All models warm on MPS. Ready.')


# ── Request models ────────────────────────────────────────────────
class Query(BaseModel):
    text:    str
    urgency: str = 'normal'


# ── Endpoints ─────────────────────────────────────────────────────

@app.get('/health')
def health():
    return {
        'status':        'ready',
        'models_loaded': _model is not None,
        'device':        _device(),
        'adapter':       'lora' if (_model is not None and hasattr(_model, 'peft_config')) else 'base',
    }


@app.post('/query')
def query(q: Query):
    """Text-in / text-out. Used by curl tests and the latency demo terminal."""
    if _infer is None:
        return {'response': 'Models not loaded yet.', 'urgency': q.urgency}

    if _model is not None:
        response = _infer(q.text, _model, _tok, _rag, urgency=q.urgency)
    else:
        response = _infer(q.text, urgency=q.urgency)

    return {'response': response, 'urgency': q.urgency}


@app.post('/transcribe_and_query')
async def transcribe_and_query(audio: UploadFile = File(...)):
    """
    Receives audio/webm blob from React VoiceOrb (MediaRecorder).
    1. Transcribes audio bytes → Hinglish text
    2. Runs infer() → Hinglish response
    3. Returns both transcript and response as JSON
    """
    audio_bytes = await audio.read()

    # Step 1: STT
    text = _transcribe(audio_bytes) if _transcribe else ''
    if not text.strip():
        text = 'Audio unclear — please try again.'

    # Step 2: SLM inference — ALWAYS pass model, tok, rag
    if _model is not None and _infer is not None:
        response = _infer(text, _model, _tok, _rag)
    elif _infer is not None:
        response = _infer(text)
    else:
        response = 'Models not loaded yet.'

    return {'transcript': text, 'response': response}


@app.post('/query_audio')
async def query_audio(q: Query):
    """
    Text-in / audio-out (WAV bytes stream).
    Sentence-splits response and streams TTS chunks.
    """
    if _model is None or _infer is None:
        return {'error': 'Models not loaded.'}

    response = _infer(q.text, _model, _tok, _rag, urgency=q.urgency)

    return StreamingResponse(
        _stream_audio(response),
        media_type='audio/wav',
    )


async def _stream_audio(full_text: str):
    """Yield TTS audio sentence by sentence — drives <500ms perceived latency."""
    SENTENCE_ENDS = {'.', '!', '?', '|'}
    buf = ''
    for char in full_text:
        buf += char
        if char in SENTENCE_ENDS and len(buf.strip()) > 5:
            if _speak:
                yield _speak(buf.strip())
            buf = ''
    if buf.strip() and _speak:
        yield _speak(buf.strip())


# ── Run ───────────────────────────────────────────────────────────
if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=False)