import json, threading, os
from datetime import datetime

LOG_FILE = 'logs/transcripts.jsonl'
os.makedirs('logs', exist_ok=True)

def _write(session: dict):
    session['timestamp'] = datetime.now().isoformat()
    with open(LOG_FILE, 'a') as f:
        f.write(json.dumps(session, ensure_ascii=False) + '\n')

def save_transcript(session: dict) -> None:
    threading.Thread(target=_write, args=(session,), daemon=True).start()
