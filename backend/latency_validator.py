TARGETS     = { 'stt': 150, 'slm': 100, 'tts': 200, 'total': 500 }
HARD_LIMITS = { 'stt': 200, 'slm': 150, 'tts': 250, 'total': 800 }

def validate_latency(stage: str, ms: float) -> str:
    if ms <= TARGETS[stage]:     return 'GREEN'
    if ms <= HARD_LIMITS[stage]: return 'YELLOW'
    return 'RED — ESCALATE'
