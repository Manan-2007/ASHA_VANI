// ASHA-VANI API Client — connects React to FastAPI backend
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function queryASHA(text, urgency = 'normal') {
  const res = await fetch(`${BASE_URL}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, urgency })
  });
  if (!res.ok) throw new Error('Backend error: ' + res.status);
  return res.json();
}

export async function checkHealth() {
  const res = await fetch(`${BASE_URL}/health`);
  return res.json();
}

export async function sendAudioBlob(blob, onChunk) {
  const formData = new FormData();
  formData.append('audio', blob, 'recording.webm');
  const res = await fetch(`${BASE_URL}/transcribe_and_query`, {
    method: 'POST', body: formData
  });
  if (!res.ok) throw new Error('Backend error: ' + res.status);
  return res.json();
}
