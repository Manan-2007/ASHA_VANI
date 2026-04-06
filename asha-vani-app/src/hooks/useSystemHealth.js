/**
 * hooks/useSystemHealth.js
 * ASHA-VANI — Backend Health Polling Hook
 *
 * Polls GET /health on the FastAPI server and exposes the response
 * to NetworkStatus.jsx. Handles disconnected state gracefully so the
 * UI degrades cleanly when the backend is not running.
 *
 * /health response shape (from api/main.py):
 * {
 *   status:      "ok" | "degraded"
 *   mode:        "offline"
 *   model_ready: boolean
 *   startup_s:   number
 *   vram_mb:     number | null
 *   device:      "mps" | "cuda" | "cpu"
 *   components: {
 *     vad: { name, status, budget_ms }
 *     stt: { name, status, budget_ms }
 *     llm: { name, status, budget_ms }
 *     tts: { name, status, budget_ms }
 *   }
 *   ttfa_budget_ms: number
 * }
 *
 * Returns:
 *   connected    bool     — backend reachable
 *   health       object   — last successful /health response
 *   lastUpdated  number   — timestamp of last successful fetch
 *   loading      bool     — initial fetch in progress
 *   error        string   — last error message or null
 *   refetch()    fn       — manually trigger a health check
 */

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_POLLING_MS   = 15_000;
const DEFAULT_RETRY_MS     =  4_000;
const FETCH_TIMEOUT_MS     =  5_000;

export default function useSystemHealth(
  apiUrl = "http://localhost:8000",
  {
    pollingIntervalMs = DEFAULT_POLLING_MS,
    retryOnFailMs     = DEFAULT_RETRY_MS,
  } = {}
) {
  const [connected,    setConnected]    = useState(false);
  const [health,       setHealth]       = useState(null);
  const [lastUpdated,  setLastUpdated]  = useState(null);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);

  const timerRef   = useRef(null);
  const mountedRef = useRef(true);

  // ── Core fetch ──────────────────────────────────────────────────
  const fetchHealth = useCallback(async () => {
    const controller = new AbortController();
    const timeout    = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      const res = await fetch(`${apiUrl}/health`, {
        signal:  controller.signal,
        headers: { Accept: "application/json" },
        // Never cache health checks
        cache:   "no-store",
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (!mountedRef.current) return;

      setConnected(true);
      setHealth(data);
      setLastUpdated(Date.now());
      setError(null);
      setLoading(false);

      // Schedule next poll
      timerRef.current = setTimeout(fetchHealth, pollingIntervalMs);

    } catch (err) {
      clearTimeout(timeout);
      if (!mountedRef.current) return;

      const isAbort = err.name === "AbortError";
      const msg     = isAbort ? "Health check timed out" : err.message;

      setConnected(false);
      setError(msg);
      setLoading(false);

      console.warn("[Saheli health]", msg);

      // Retry sooner after failure
      timerRef.current = setTimeout(fetchHealth, retryOnFailMs);
    } finally {
      clearTimeout(timeout);
    }
  }, [apiUrl, pollingIntervalMs, retryOnFailMs]);

  // ── Mount / unmount ─────────────────────────────────────────────
  useEffect(() => {
    mountedRef.current = true;
    fetchHealth();
    return () => {
      mountedRef.current = false;
      clearTimeout(timerRef.current);
    };
  }, [fetchHealth]);

  // ── Manual refetch (bound to the ↻ button in NetworkStatus) ────
  const refetch = useCallback(() => {
    clearTimeout(timerRef.current);
    setLoading(true);
    fetchHealth();
  }, [fetchHealth]);

  return { connected, health, lastUpdated, loading, error, refetch };
}
