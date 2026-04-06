import os, torch, numpy as np, sounddevice as sd
os.environ.setdefault('PYTORCH_ENABLE_MPS_FALLBACK', '1')
from faster_whisper import WhisperModel

SAMPLE_RATE      = 16000
SILENCE_TIMEOUT  = 0.5   # seconds

# Load VAD
vad_model, vad_utils = torch.hub.load('snakers4/silero-vad', 'silero_vad', force_reload=False)
(get_speech_timestamps, _, _, VADIterator, _) = vad_utils

# Faster-Whisper — CPU on Mac (GPU not needed, still fast enough)
# Use 'base' for best Hinglish accuracy. 'tiny' if latency > 200ms.
asr = WhisperModel('base', device='cpu', compute_type='int8')

def transcribe(audio_bytes: bytes) -> str:
    """CONTRACT: bytes (16kHz mono int16 PCM) -> Hinglish text. Never raises."""
    try:
        audio = np.frombuffer(audio_bytes, dtype=np.int16).astype(np.float32) / 32768.0
        segments, _ = asr.transcribe(audio, language='hi', beam_size=5)
        return ' '.join(s.text for s in segments).strip()
    except Exception as e:
        print(f'[STT ERROR] {e}')
        return ''

def capture_audio(silence_timeout: float = SILENCE_TIMEOUT) -> bytes:
    """Listens on Mac mic until silence detected. Returns int16 PCM bytes."""
    chunks, speaking = [], False
    silence_frames = 0
    max_silence = int(silence_timeout * SAMPLE_RATE / 512)

    def callback(indata, frames, time_info, status):
        nonlocal speaking, silence_frames
        audio_chunk = indata[:, 0].copy()
        chunks.append((audio_chunk * 32767).astype(np.int16))

    with sd.InputStream(samplerate=SAMPLE_RATE, channels=1,
                        dtype='float32', blocksize=512, callback=callback):
        print('[VAD] Listening...')
        import time
        while True:
            time.sleep(0.05)
            if len(chunks) > 10:
                audio = np.concatenate([c.astype(np.float32)/32767 for c in chunks[-20:]])
                ts = get_speech_timestamps(torch.tensor(audio), vad_model, sampling_rate=SAMPLE_RATE)
                if ts:
                    speaking = True
                    silence_frames = 0
                elif speaking:
                    silence_frames += 1
                    if silence_frames >= max_silence:
                        break
    audio_out = np.concatenate(chunks)
    print(f'[VAD] Captured {len(audio_out)/SAMPLE_RATE:.1f}s of audio')
    return audio_out.tobytes()
