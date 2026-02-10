"use client";

import { motion } from "framer-motion";
import type { StressProfile } from "@/types";

interface EmotionalVisualizationProps {
  profile: StressProfile;
}

const bubbles = [
  {
    key: "cognitive",
    label: "Cognitive",
    color: "hsl(260 18% 84%)",
    size: 100,
    x: 30,
    y: 20,
  },
  {
    key: "stress",
    label: "Stress",
    color: "hsl(17 55% 62% / 0.6)",
    size: 80,
    x: 180,
    y: 80,
  },
  {
    key: "behavior",
    label: "Behavior",
    color: "hsl(108 22% 80%)",
    size: 90,
    x: 60,
    y: 130,
  },
  {
    key: "overall",
    label: "Wellbeing",
    color: "hsl(53 55% 77%)",
    size: 70,
    x: 200,
    y: 10,
  },
];

export function EmotionalVisualization({
  profile,
}: EmotionalVisualizationProps) {
  const scoreMap: Record<string, number> = {
    cognitive: profile.cognitive,
    stress: profile.stress,
    behavior: profile.behavior,
    overall: profile.overall,
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Floating bubble visualization like Statistics reference */}
      <div className="relative h-[260px] w-full max-w-[320px]">
        {bubbles.map((bubble, i) => {
          const score = scoreMap[bubble.key];
          const scaledSize = bubble.size * (0.7 + (score / 5) * 0.5);
          return (
            <motion.div
              key={bubble.key}
              className="absolute flex flex-col items-center justify-center rounded-full"
              style={{
                width: scaledSize,
                height: scaledSize,
                backgroundColor: bubble.color,
                left: bubble.x,
                top: bubble.y,
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.2 + i * 0.15,
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <span
                className="text-xs font-semibold"
                style={{ color: "hsl(135 12% 26%)" }}
              >
                {bubble.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Large score display like "89%" reference */}
      <motion.div
        className="flex flex-col items-center gap-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex items-baseline gap-1">
          <span
            className="text-5xl font-bold tracking-tight"
            style={{ color: "hsl(135 12% 26%)" }}
          >
            {Math.round((1 - profile.overall / 5) * 100)}
          </span>
          <span
            className="text-2xl font-bold"
            style={{ color: "hsl(135 12% 26% / 0.5)" }}
          >
            %
          </span>
        </div>
        <span
          className="text-sm"
          style={{ color: "hsl(135 12% 26% / 0.45)" }}
        >
          Emotional steadiness score
        </span>
      </motion.div>
    </div>
  );
}
