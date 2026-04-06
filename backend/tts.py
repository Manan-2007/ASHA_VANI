import subprocess
from pathlib import Path

PIPER_BIN   = str(Path(__file__).parent / 'piper' / 'piper')
VOICE_MODEL = str(Path(__file__).parent / 'voices' / 'hi_IN-priyamvada-medium.onnx')
VOICE_JSON  = str(Path(__file__).parent / 'voices' / 'hi_IN-priyamvada-medium.onnx.json')

def speak(text: str) -> bytes:
    """CONTRACT: Hinglish text -> raw WAV bytes (16kHz mono int16). Never raises."""
    try:
        result = subprocess.run(
            [PIPER_BIN, '--model', VOICE_MODEL,
             '--config', VOICE_JSON, '--output_file', '-'],
            input=text.encode('utf-8'),
            capture_output=True, timeout=10.0
        )
        return result.stdout
    except Exception as e:
        print(f'[TTS ERROR] {e}')
        return b'\x00' * 3200  # 100ms silence fallback
