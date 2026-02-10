"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useAppStore } from "@/store/use-app-store";

export function CrisisFAB() {
  const setCrisisModalOpen = useAppStore((s) => s.setCrisisModalOpen);

  return (
    <motion.button
      type="button"
      onClick={() => setCrisisModalOpen(true)}
      className="fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-shadow duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-sage/40 focus:ring-offset-2"
      style={{
        backgroundColor: "hsl(17 55% 62%)",
        color: "hsl(0 0% 100%)",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.05 }}
      aria-label="Need support now? Open crisis resources"
    >
      <Heart className="h-5 w-5" strokeWidth={1.75} />
    </motion.button>
  );
}
