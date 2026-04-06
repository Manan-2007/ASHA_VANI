// Real mic capture via MediaRecorder API — works on Mac Chrome/Safari
import { useState, useRef, useCallback } from 'react';
import { sendAudioBlob } from '../api/ashaApi';

export function useVoiceRecorder() {
  const [recording, setRecording] = useState(false);
  const [response, setResponse]   = useState('');
  const [transcript, setTranscript] = useState('');
  const [latency, setLatency]     = useState(null);
  const [error, setError]         = useState(null);
  const [loading, setLoading]     = useState(false);
  const mediaRef  = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = useCallback(async () => {
    try {
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];

      // Use webm/opus — best browser support on Mac
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus' : 'audio/webm';

      mediaRef.current = new MediaRecorder(stream, { 
        mimeType: mimeType,
        audioBitsPerSecond: 128000 
      });
      mediaRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mediaRef.current.start(100); // collect 100ms chunks
      setRecording(true);
      setError(null);
    } catch (e) {
      setError('Mic access denied: ' + e.message);
    }
  }, []);

const stopRecording = useCallback(async () => {
    if (!mediaRef.current || mediaRef.current.state === 'inactive') return;
    return new Promise((resolve) => {
      mediaRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        mediaRef.current.stream.getTracks().forEach(t => t.stop());
        setLoading(true);
        const t0 = performance.now();
        try {
          const data = await sendAudioBlob(blob);
          setResponse(data.response || '');
          setTranscript(data.transcript || '');
          setLatency(Math.round(performance.now() - t0));
          
          // --- NEW LINES START HERE ---
          if (data.audio_b64) {
            const snd = new Audio("data:audio/wav;base64," + data.audio_b64);
            snd.play();
          }
          // --- NEW LINES END HERE ---

        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
        resolve();
      };
      mediaRef.current.stop();
      setRecording(false);
    });
  }, []);
  return { recording, transcript, response, latency, error, loading, startRecording, stopRecording };
}
