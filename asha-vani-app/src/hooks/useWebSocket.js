/**
 * hooks/useWebSocket.js
 * ASHA-VANI — WebSocket streaming hook
 *
 * Matches the /ws protocol defined in api/main.py:
 *   Send:    { type: "query", text, urgency }
 *   Receive: { type: "token", token }
 *            { type: "done", urgency, latency_ms, full_response }
 *            { type: "error", message }
 *            { type: "ping" }
 *
 * Returns:
 *   connected       bool
 *   orbState        "idle"|"listening"|"processing"|"speaking"|"error"
 *   transcript      string   (live STT text — set via setTranscript)
 *   streamedTokens  string   (accumulated LLM response)
 *   latencyMs       number|null
 *   urgency         "high"|"normal"|null
 *   sendQuery(text, urgency)
 *   startListening()
 *   stopListening()
 *   setTranscript(text)
 *   reset()
 */

import { useCallback, useEffect, useRef, useState } from "react";

const RECONNECT_DELAY_MS = 3_000;
const MAX_RECONNECT      = 8;

export default function useWebSocket(url) {
  const [connected,      setConnected]      = useState(false);
  const [orbState,       setOrbState]       = useState("idle");
  const [transcript,     setTranscript]     = useState("");
  const [streamedTokens, setStreamedTokens] = useState("");
  const [latencyMs,      setLatencyMs]      = useState(null);
  const [urgency,        setUrgency]        = useState(null);

  const wsRef           = useRef(null);
  const reconnectCount  = useRef(0);
  const reconnectTimer  = useRef(null);
  const mountedRef      = useRef(true);

  // ── Connect / reconnect ─────────────────────────────────────────
  const connect = useCallback(() => {
    if (!mountedRef.current) return;
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        if (!mountedRef.current) return;
        setConnected(true);
        reconnectCount.current = 0;
        console.log("[Saheli WS] Connected:", url);
      };

      ws.onclose = (e) => {
        if (!mountedRef.current) return;
        setConnected(false);
        setOrbState("idle");
        console.log("[Saheli WS] Closed:", e.code, e.reason);

        // Auto-reconnect with back-off
        if (reconnectCount.current < MAX_RECONNECT) {
          const delay = RECONNECT_DELAY_MS * Math.min(reconnectCount.current + 1, 4);
          reconnectTimer.current = setTimeout(() => {
            reconnectCount.current++;
            connect();
          }, delay);
        }
      };

      ws.onerror = (e) => {
        console.error("[Saheli WS] Error:", e);
      };

      ws.onmessage = (event) => {
        if (!mountedRef.current) return;
        let msg;
        try {
          msg = JSON.parse(event.data);
        } catch {
          return;
        }

        switch (msg.type) {
          case "token":
            // Accumulate streamed tokens from LLM
            setStreamedTokens((prev) => prev + (msg.token ?? ""));
            setOrbState("speaking");
            break;

          case "done":
            setLatencyMs(msg.latency_ms ?? null);
            setUrgency(msg.urgency ?? null);
            setOrbState("idle");
            break;

          case "error":
            console.error("[Saheli WS] Server error:", msg.message);
            setOrbState("error");
            // Auto-clear error state after 3s
            setTimeout(() => {
              if (mountedRef.current) setOrbState("idle");
            }, 3_000);
            break;

          case "ping":
            // Respond with pong to keep connection alive
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ type: "pong" }));
            }
            break;

          default:
            break;
        }
      };
    } catch (err) {
      console.error("[Saheli WS] Connect failed:", err);
    }
  }, [url]);

  // ── Mount / unmount ─────────────────────────────────────────────
  useEffect(() => {
    mountedRef.current = true;
    connect();
    return () => {
      mountedRef.current = false;
      clearTimeout(reconnectTimer.current);
      wsRef.current?.close(1000, "Component unmounted");
    };
  }, [connect]);

  // ── sendQuery ───────────────────────────────────────────────────
  const sendQuery = useCallback((text, urgencyOverride = "auto") => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.warn("[Saheli WS] Not connected — cannot send query");
      return;
    }
    // Reset accumulated response before new query
    setStreamedTokens("");
    setLatencyMs(null);
    setUrgency(null);
    setOrbState("processing");

    ws.send(JSON.stringify({
      type:    "query",
      text:    text.trim(),
      urgency: urgencyOverride,
    }));
  }, []);

  // ── startListening / stopListening ──────────────────────────────
  // In the full pipeline these trigger the microphone + VAD.
  // Here they control orbState so VoiceOrb.jsx animates correctly.
  // Actual audio capture wires into useAudioCapture.js (separate hook).
  const startListening = useCallback(() => {
    setTranscript("");
    setStreamedTokens("");
    setLatencyMs(null);
    setUrgency(null);
    setOrbState("listening");
  }, []);

  const stopListening = useCallback(() => {
    setOrbState("idle");
  }, []);

  // ── reset ───────────────────────────────────────────────────────
  const reset = useCallback(() => {
    setOrbState("idle");
    setTranscript("");
    setStreamedTokens("");
    setLatencyMs(null);
    setUrgency(null);
  }, []);

  return {
    connected,
    orbState,
    transcript,
    streamedTokens,
    latencyMs,
    urgency,
    sendQuery,
    startListening,
    stopListening,
    setTranscript,   // used by audio capture hook to push live STT text
    reset,
  };
}
