def speak(text: str) -> bytes:
    return b'\x00' * 3200  # 100ms silence at 16kHz mono int16
