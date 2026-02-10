"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MessageCircle, Building2, Wind, Hand } from "lucide-react";
import { useAppStore } from "@/store/use-app-store";
import { crisisResources } from "@/lib/insights";

const iconMap: Record<string, typeof Phone> = {
  hotline: Phone,
  campus: Building2,
  breathing: Wind,
  grounding: Hand,
};

export function CrisisModal() {
  const { crisisModalOpen, setCrisisModalOpen } = useAppStore();

  return (
    <AnimatePresence>
      {crisisModalOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60]"
            style={{ backgroundColor: "hsl(135 12% 26% / 0.4)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setCrisisModalOpen(false)}
          />

          <motion.div
            className="fixed inset-x-4 top-[8%] z-[70] mx-auto max-w-md rounded-3xl p-7 shadow-2xl sm:inset-x-auto"
            style={{ backgroundColor: "hsl(0 0% 100%)", color: "hsl(135 12% 26%)" }}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Crisis support resources"
          >
            <button
              type="button"
              onClick={() => setCrisisModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 transition-colors"
              style={{ color: "hsl(135 12% 26% / 0.4)" }}
              aria-label="Close crisis resources"
            >
              <X className="h-5 w-5" strokeWidth={1.75} />
            </button>

            <h2 className="mb-2 text-xl font-semibold tracking-tight" style={{ color: "hsl(135 12% 26%)" }}>
              You are not alone
            </h2>
            <p className="mb-6 text-sm leading-relaxed" style={{ color: "hsl(135 12% 26% / 0.55)" }}>
              Here are some resources available to you right now.
            </p>

            <div className="flex flex-col gap-3">
              {crisisResources.map((resource) => {
                const Icon = iconMap[resource.type] || MessageCircle;
                return (
                  <div
                    key={resource.name}
                    className="flex items-start gap-3 rounded-2xl p-4"
                    style={{ backgroundColor: "hsl(36 33% 93%)" }}
                  >
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: "hsl(105 15% 43% / 0.12)" }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} style={{ color: "hsl(105 15% 43%)" }} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                        {resource.name}
                      </span>
                      <span className="text-xs" style={{ color: "hsl(135 12% 26% / 0.5)" }}>
                        {resource.description}
                      </span>
                      <span className="mt-1 text-xs font-medium" style={{ color: "hsl(105 15% 43%)" }}>
                        {resource.contact}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
