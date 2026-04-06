/**
 * useASHAQuery.js
 * ===============
 * React hook for text-based ASHA-VANI queries.
 * Handles loading state, error state, latency tracking.
 *
 * Usage:
 *   const { query, response, loading, error, latency, urgency, reset } = useASHAQuery();
 *   await query("Didi, jhatke aa rahe hain!");
 */

import { useState, useCallback } from "react";
import { queryText } from "../api/ashaApi";

export function useASHAQuery() {
  const [response, setResponse] = useState(null);
  const [urgency,  setUrgency]  = useState(null);
  const [latency,  setLatency]  = useState(null);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);
  const [history,  setHistory]  = useState([]);

  const query = useCallback(async (text, urgencyOverride = null) => {
    if (!text?.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await queryText(text, urgencyOverride);

      setResponse(data.response);
      setUrgency(data.urgency);
      setLatency(data.latency_ms);

      setHistory((prev) => [
        ...prev,
        {
          id:        Date.now(),
          timestamp: new Date().toISOString(),
          input:     text,
          response:  data.response,
          urgency:   data.urgency,
          latency:   data.latency_ms,
        },
      ]);

      return data;
    } catch (err) {
      setError(err.message || "Query failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResponse(null);
    setUrgency(null);
    setLatency(null);
    setError(null);
  }, []);

  return { query, response, urgency, latency, loading, error, history, reset };
}
