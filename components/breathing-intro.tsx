"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/use-app-store";

export function BreathingIntro() {
  const { hasSeenBreathingIntro, setHasSeenBreathingIntro, reducedMotion } =
    useAppStore();
  const [phase, setPhase] = useState<"inhale" | "exhale">("inhale");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (hasSeenBreathingIntro) {
      setVisible(false);
      return;
    }

    const cycleTimer = setInterval(() => {
      setPhase((p) => (p === "inhale" ? "exhale" : "inhale"));
    }, 4000);

    const dismissTimer = setTimeout(() => {
      setVisible(false);
      setHasSeenBreathingIntro(true);
    }, 9000);

    return () => {
      clearInterval(cycleTimer);
      clearTimeout(dismissTimer);
    };
  }, [hasSeenBreathingIntro, setHasSeenBreathingIntro]);

  if (hasSeenBreathingIntro) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ backgroundColor: "hsl(36 33% 93%)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
        >
          {/* Organic background blobs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div
              className="absolute -left-24 -top-24 h-80 w-80 rounded-full opacity-20 blur-3xl"
              style={{ backgroundColor: "hsl(108 22% 80%)" }}
            />
            <div
              className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full opacity-15 blur-3xl"
              style={{ backgroundColor: "hsl(260 18% 84%)" }}
            />
          </div>

          {/* Breathing circle */}
          <motion.div
            className="relative rounded-full"
            style={{
              width: 140,
              height: 140,
              background:
                "radial-gradient(circle, hsl(105 15% 43% / 0.25), hsl(108 22% 80% / 0.15))",
            }}
            animate={
              reducedMotion
                ? {}
                : {
                    scale: phase === "inhale" ? 1.4 : 1,
                    opacity: phase === "inhale" ? 0.8 : 0.35,
                  }
            }
            transition={{ duration: 4, ease: "easeInOut" }}
          />

          {/* Phase text */}
          <motion.p
            className="mt-8 font-sans text-lg tracking-wide"
            style={{ color: "hsl(135 12% 26% / 0.5)" }}
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            {phase === "inhale" ? "Breathe in" : "Breathe out"}
          </motion.p>

          {/* Skip */}
          <button
            type="button"
            onClick={() => {
              setVisible(false);
              setHasSeenBreathingIntro(true);
            }}
            className="mt-12 rounded-2xl px-6 py-2 text-sm transition-colors duration-300"
            style={{ color: "hsl(135 12% 26% / 0.35)" }}
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
