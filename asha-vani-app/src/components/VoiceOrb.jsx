import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState, useMemo, useCallback } from "react";

/**
 * VoiceOrb — Animated interactive orb for voice AI interaction.
 *
 * Props:
 *   state      — "idle" | "listening" | "processing" | "responding"  (default: "idle")
 *   onClick    — callback fired when the orb is clicked
 *   className  — optional extra classes on the wrapper
 */

const STATE_LABELS = {
  idle: "Tap to speak",
  listening: "Listening…",
  processing: "Thinking…",
  responding: "Speaking…",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function VoiceOrb({
  state = "idle",
  onClick,
  className = "",
  mode = "interactive",
}) {
  /* ---------- blinking eyes ---------- */
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (state !== "idle" && state !== "listening") return;

    let timeout;
    const scheduleBlink = () => {
      timeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
        scheduleBlink();
      }, Math.random() * 3000 + 3000);
    };

    scheduleBlink();
    return () => clearTimeout(timeout);
  }, [state]);

  const [simVolume, setSimVolume] = useState(0);

  useEffect(() => {
    if (state !== "listening" && state !== "responding") {
      setSimVolume(0);
      return;
    }
    const id = setInterval(() => {
      setSimVolume(Math.random() * 180 + 40);
    }, 120);
    return () => clearInterval(id);
  }, [state]);

  /* ---------- cursor tracking ---------- */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (mode !== "interactive-preview") return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const { clientX, clientY } = e;

      // Normalize position (-1 to 1) relative to center of screen
      const nx = (clientX / innerWidth) * 2 - 1;
      const ny = (clientY / innerHeight) * 2 - 1;

      // Max constraint in pixels targeting a subtle highlight shift
      const maxTranslate = 8;
      mouseX.set(nx * maxTranslate);
      mouseY.set(ny * maxTranslate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mode, mouseX, mouseY]);

  /* ---------- container (whole orb) animation variants ---------- */
  const containerVariants = useMemo(
    () => ({
      idle: {
        y: [0, -15, 0],
        scale: 1,
        rotate: 0,
        transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      },
      listening: {
        y: 0,
        scale: 1.05 + (simVolume / 255) * 0.1,
        rotate: 0,
        transition: { type: "spring", stiffness: 100, damping: 10 },
      },
      processing: {
        y: [0, -5, 0],
        scale: 1,
        rotate: 0,
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      },
      responding: {
        y: 0,
        scale: 1 + (simVolume / 255) * 0.15,
        rotate: 0,
        transition: { type: "spring", stiffness: 200, damping: 15 },
      },
    }),
    [simVolume]
  );

  /* ---------- eye animation variants ---------- */
  const leftEyeVariants = useMemo(
    () => ({
      idle: { scaleY: isBlinking ? 0.1 : 1, scaleX: 1, y: 0, x: 0, rotate: 0 },
      listening: {
        scaleY: isBlinking ? 0.1 : 1.2,
        scaleX: 1.1,
        y: 0,
        x: 0,
        rotate: 0,
      },
      processing: { scaleY: 1, scaleX: 1, y: -8, x: 8, rotate: 0 },
      responding: {
        scaleY: 1 + (simVolume / 255) * 0.2,
        scaleX: 1,
        y: 0,
        x: 0,
        rotate: 0,
      },
    }),
    [isBlinking, simVolume]
  );

  const rightEyeVariants = useMemo(
    () => ({
      idle: { scaleY: isBlinking ? 0.1 : 1, scaleX: 1, y: 0, x: 0, rotate: 0 },
      listening: {
        scaleY: isBlinking ? 0.1 : 1.2,
        scaleX: 1.1,
        y: 0,
        x: 0,
        rotate: 0,
      },
      processing: { scaleY: 1, scaleX: 1, y: -8, x: 8, rotate: 0 },
      responding: {
        scaleY: 1 + (simVolume / 255) * 0.2,
        scaleX: 1,
        y: 0,
        x: 0,
        rotate: 0,
      },
    }),
    [isBlinking, simVolume]
  );

  /* ---------- glow ---------- */
  const getGlow = useCallback(() => {
    const baseColor = "rgba(200, 169, 126, 0.5)";      // warm gold
    const listeningColor = "rgba(196, 139, 113, 0.6)";  // accent #C48B71
    const processingColor = "rgba(200, 169, 126, 0.45)"; // subtle gold
    const respondingColor = "rgba(131, 117, 98, 0.6)";  // secondary

    let color = baseColor;
    let size = 40;

    switch (state) {
      case "listening":
        color = listeningColor;
        size = 50 + (simVolume / 255) * 40;
        break;
      case "processing":
        color = processingColor;
        size = 45;
        break;
      case "responding":
        color = respondingColor;
        size = 60 + (simVolume / 255) * 50;
        break;
      default:
        size = 40;
    }

    return `0 0 ${size}px ${size / 2}px ${color}, inset 0 0 ${size / 2}px ${color}`;
  }, [state, simVolume]);

  /* ---------- background particles ---------- */
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 12 + 8,
        delay: Math.random() * 4,
      })),
    []
  );

  /* ---------- state‑based orb body gradient ---------- */
  const orbBackground =
    state === "processing"
      ? "conic-gradient(from 0deg, #C8A97E, #837562, #9FAFCA, #C8A97E)"
      : "linear-gradient(135deg, rgba(200,169,126,0.8), rgba(131,117,98,0.8), rgba(159,175,202,0.8))";

  /* ---------------------------------------------------------------- */
  /*  RENDER                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      style={{ minHeight: 340 }}
    >
      {/* ---- ambient particles ---- */}
      <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: "rgba(200,169,126,0.25)",
            }}
            animate={{ y: [0, -20, 0], opacity: [0.1, 0.35, 0.1] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ---- orb wrapper (click target) ---- */}
      <button
        onClick={mode === "interactive" ? onClick : undefined}
        className={`relative z-10 flex items-center justify-center w-64 h-64 bg-transparent border-none outline-none group ${
          mode === "preview" || mode === "interactive-preview"
            ? "cursor-default pointer-events-none"
            : "cursor-pointer"
        }`}
        aria-label={STATE_LABELS[state]}
        disabled={mode === "preview" || mode === "interactive-preview"}
        type="button"
      >
        {/* aura / glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          animate={{
            boxShadow: getGlow(),
            rotate: state === "processing" ? 360 : 0,
          }}
          transition={{
            boxShadow: { type: "spring", stiffness: 50, damping: 10 },
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          }}
        />

        {/* main orb body */}
        <motion.div
          variants={containerVariants}
          animate={state}
          className="relative w-48 h-48 rounded-full backdrop-blur-md border border-white/20 shadow-2xl overflow-hidden flex items-center justify-center"
          style={{ background: orbBackground }}
        >
          {/* glassy reflection */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none" />
          <div className="absolute top-4 left-8 w-16 h-8 bg-white/20 rounded-full blur-md -rotate-45 pointer-events-none" />

          {/* processing spinner overlay */}
          {state === "processing" && (
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 0%, rgba(200,169,126,0.3) 50%, transparent 100%)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )}

          {/* Interactive Core tracking the cursor */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center gap-8 pointer-events-none"
            style={{ x: smoothX, y: smoothY }}
          >
            {/* left eye */}
            <motion.div
              variants={leftEyeVariants}
              animate={state}
              className="w-3 h-12 rounded-full"
              style={{
                backgroundColor: "#F5F1E8",
                boxShadow: "0 0 10px rgba(245,241,232,0.8)",
              }}
            />

            {/* right eye */}
            <motion.div
              variants={rightEyeVariants}
              animate={state}
              className="w-3 h-12 rounded-full"
              style={{
                backgroundColor: "#F5F1E8",
                boxShadow: "0 0 10px rgba(245,241,232,0.8)",
              }}
            />
          </motion.div>
        </motion.div>
      </button>

      {/* ---- state label ---- */}
      {mode === "interactive" && (
        <motion.p
          key={state}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-sm uppercase tracking-[0.2em] font-label text-outline z-10 pointer-events-none"
        >
          {STATE_LABELS[state]}
        </motion.p>
      )}
    </div>
  );
}
