"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/use-app-store";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import type { OnboardingSelection } from "@/types";
import { ArrowUpRight } from "lucide-react";

const emotionalTiles: {
  id: OnboardingSelection;
  label: string;
  description: string;
  bgColor: string;
}[] = [
  {
    id: "overwhelmed",
    label: "Overwhelmed",
    description: "Everything feels like too much",
    bgColor: "hsl(260 18% 84%)", // Lavender
  },
  {
    id: "lonely",
    label: "Lonely",
    description: "Feeling disconnected from others",
    bgColor: "hsl(53 55% 77%)", // Wheat card
  },
  {
    id: "burned-out",
    label: "Burned Out",
    description: "Running on empty, need a reset",
    bgColor: "hsl(108 22% 80%)", // Sage card
  },
  {
    id: "just-checking",
    label: "Just Checking",
    description: "Curious about where I stand",
    bgColor: "hsl(15 27% 86%)", // Pink card
  },
  {
    id: "anxious",
    label: "Anxious",
    description: "Feeling worried or restless",
    bgColor: "hsl(200 25% 85%)", // Soft blue (Lagoon variant)
  },
  {
    id: "confused",
    label: "Confused",
    description: "Uncertain about my direction",
    bgColor: "hsl(280 20% 82%)", // Soft purple (Lavender variant)
  },
  {
    id: "hopeful",
    label: "Hopeful",
    description: "Looking for positive change",
    bgColor: "hsl(120 30% 85%)", // Soft green (Sage variant)
  },
  {
    id: "exhausted",
    label: "Exhausted",
    description: "Physically and mentally drained",
    bgColor: "hsl(45 35% 82%)", // Soft yellow (Wheat variant)
  },
  {
    id: "frustrated",
    label: "Frustrated",
    description: "Things aren't working out",
    bgColor: "hsl(25 40% 80%)", // Soft orange (Melon variant)
  },
  {
    id: "peaceful",
    label: "Peaceful",
    description: "In a good headspace today",
    bgColor: "hsl(160 25% 85%)", // Soft mint (Lagoon-Sage blend)
  },
];

export default function CheckInPage() {
  const router = useRouter();
  const setOnboardingSelection = useAppStore((s) => s.setOnboardingSelection);

  const handleSelect = (id: OnboardingSelection) => {
    setOnboardingSelection(id);
    router.push("/assessment");
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="pt-2">
        <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
          Practices
        </p>
        <h1
          className="mt-2 text-[26px] font-semibold leading-tight tracking-tight"
          style={{ color: "hsl(135 12% 26%)" }}
        >
          Exercises based on <span className="font-bold">your needs</span>
        </h1>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "hsl(135 12% 26% / 0.5)" }}>
          What brought you here today?
        </p>
      </motion.div>

      {/* Pastel card grid - 2 columns on mobile, 3 on larger screens */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {emotionalTiles.map((tile) => (
          <motion.button
            key={tile.id}
            type="button"
            variants={fadeInUp}
            onClick={() => handleSelect(tile.id)}
            className="group relative flex flex-col justify-between rounded-2xl p-5 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:ring-offset-2"
            style={{
              backgroundColor: tile.bgColor,
              minHeight: "150px",
            }}
            whileHover={{
              y: -3,
              boxShadow: "0 6px 20px rgba(60,74,62,0.1)",
            }}
            aria-label={`I am feeling ${tile.label}`}
          >
            <div>
              <span
                className="text-sm font-semibold"
                style={{ color: "hsl(135 12% 26%)" }}
              >
                {tile.label}
              </span>
              <p
                className="mt-1 text-xs leading-relaxed"
                style={{ color: "hsl(135 12% 26% / 0.55)" }}
              >
                {tile.description}
              </p>
            </div>
            <div className="flex justify-end">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: "hsl(0 0% 100% / 0.5)" }}
              >
                <ArrowUpRight
                  className="h-4 w-4"
                  strokeWidth={1.75}
                  style={{ color: "hsl(135 12% 26% / 0.6)" }}
                />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
