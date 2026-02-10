"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Activity } from "lucide-react";
import type { InsightCard as InsightCardType } from "@/types";
import { fadeInUp, calmTransition } from "@/lib/motion";

const categoryConfig = {
  cognitive: {
    icon: Brain,
    label: "Cognitive Pattern",
    accentColor: "hsl(260 18% 74%)",
    bgColor: "hsl(260 18% 84% / 0.35)",
  },
  stress: {
    icon: Zap,
    label: "Stress Trigger",
    accentColor: "hsl(17 55% 52%)",
    bgColor: "hsl(17 55% 62% / 0.2)",
  },
  behavior: {
    icon: Activity,
    label: "Behavior Insight",
    accentColor: "hsl(105 15% 35%)",
    bgColor: "hsl(108 22% 80% / 0.4)",
  },
};

interface InsightCardProps {
  insight: InsightCardType;
  index: number;
}

export function InsightCard({ insight, index }: InsightCardProps) {
  const config = categoryConfig[insight.category];
  const Icon = config.icon;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.12 }}
      whileHover={{
        y: -3,
        boxShadow: "0 6px 20px rgba(60,74,62,0.08)",
        transition: calmTransition,
      }}
      className="flex flex-col gap-3 rounded-2xl p-5"
      style={{
        backgroundColor: "hsl(0 0% 100% / 0.7)",
      }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full"
          style={{ backgroundColor: config.bgColor }}
        >
          <Icon
            className="h-4 w-4"
            strokeWidth={1.75}
            style={{ color: config.accentColor }}
          />
        </div>
        <span
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: config.accentColor }}
        >
          {config.label}
        </span>
      </div>

      <p
        className="text-sm leading-relaxed"
        style={{ color: "hsl(135 12% 26% / 0.7)" }}
      >
        {insight.text}
      </p>
    </motion.div>
  );
}
