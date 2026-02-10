"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, fadeIn } from "@/lib/motion";
import {
  ArrowUpRight,
  Shield,
  EyeOff,
  Activity,
  HeartHandshake,
} from "lucide-react";
import { useAppStore } from "@/store/use-app-store";
import { LandingPage } from "@/components/landing-page";

const moodIcons = [
  { label: "Happy", color: "#E8DFA0" },
  { label: "Calm", color: "#C5D5BE" },
  { label: "Relax", color: "#D4CEDF" },
  { label: "Focus", color: "#E5D5D0" },
];

const trustItems = [
  { icon: EyeOff, label: "Anonymous" },
  { icon: Shield, label: "Private" },
  { icon: Activity, label: "No tracking" },
  { icon: HeartHandshake, label: "Support 24/7" },
];

export default function HomePage() {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6"
    >
      {/* Welcome section */}
      <motion.section variants={fadeInUp} className="pt-4">
        <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
          Daily reflection
        </p>
        <h1
          className="mt-2 text-balance text-[28px] font-semibold leading-tight tracking-tight"
          style={{ color: "hsl(135 12% 26%)" }}
        >
          How do you feel about{" "}
          <span className="italic">your current emotions?</span>
        </h1>
      </motion.section>

      {/* Reflection input card */}
      <motion.div variants={fadeInUp}>
        <Link
          href="/check-in"
          className="flex items-center justify-between rounded-2xl px-5 py-4"
          style={{
            backgroundColor: "hsl(33 30% 86% / 0.5)",
            border: "1px solid hsl(33 20% 85% / 0.6)",
          }}
        >
          <span className="text-sm" style={{ color: "hsl(135 12% 26% / 0.4)" }}>
            Your reflection..
          </span>
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: "hsl(135 12% 26%)" }}
          >
            <ArrowUpRight className="h-4 w-4" style={{ color: "hsl(36 33% 93%)" }} />
          </div>
        </Link>
      </motion.div>

      {/* How are you feeling - mood icons like reference */}
      <motion.section variants={fadeInUp}>
        <p className="mb-4 text-sm font-medium" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
          How are you feeling today?
        </p>
        <div className="flex items-center gap-4">
          {moodIcons.map((mood) => (
            <Link
              key={mood.label}
              href={`/mood?mood=${mood.label.toLowerCase()}`}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105"
                style={{ backgroundColor: mood.color, border: "2px solid hsl(33 30% 86% / 0.5)" }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" stroke="hsl(135 12% 26% / 0.3)" strokeWidth="1.5" fill="none" />
                  <circle cx="9" cy="10" r="1" fill="hsl(135 12% 26% / 0.5)" />
                  <circle cx="15" cy="10" r="1" fill="hsl(135 12% 26% / 0.5)" />
                  {mood.label === "Happy" && (
                    <path d="M8 14c1 2 7 2 8 0" stroke="hsl(135 12% 26% / 0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  )}
                  {mood.label === "Calm" && (
                    <path d="M9 14h6" stroke="hsl(135 12% 26% / 0.5)" strokeWidth="1.5" strokeLinecap="round" />
                  )}
                  {mood.label === "Relax" && (
                    <path d="M8 13c1 1.5 7 1.5 8 0" stroke="hsl(135 12% 26% / 0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  )}
                  {mood.label === "Focus" && (
                    <path d="M9 14c0.5 0.5 5.5 0.5 6 0" stroke="hsl(135 12% 26% / 0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  )}
                </svg>
              </div>
              <span className="text-xs font-medium" style={{ color: "hsl(135 12% 26% / 0.5)" }}>
                {mood.label}
              </span>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Today's Task cards - like reference Medad app */}
      <motion.section variants={fadeInUp} className="flex flex-col gap-3">
        <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
          {"Today's practices"}
        </p>

        <Link
          href="/assessment"
          className="flex items-center justify-between rounded-2xl p-5"
          style={{ backgroundColor: "hsl(135 12% 26%)", color: "hsl(36 33% 93%)" }}
        >
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold">Mental Check-in</span>
            <span className="text-xs" style={{ color: "hsl(36 33% 93% / 0.6)" }}>
              A few gentle questions to map where you are
            </span>
          </div>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ backgroundColor: "hsl(36 33% 93% / 0.15)" }}
          >
            <ArrowUpRight className="h-4 w-4" style={{ color: "hsl(36 33% 93%)" }} />
          </div>
        </Link>

        <Link
          href="/resources"
          className="flex items-center justify-between rounded-2xl p-5"
          style={{ backgroundColor: "hsl(108 22% 80% / 0.4)" }}
        >
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold" style={{ color: "hsl(135 12% 26%)" }}>
              Self-Care Toolkit
            </span>
            <span className="text-xs" style={{ color: "hsl(135 12% 26% / 0.55)" }}>
              Breathing exercises and grounding techniques
            </span>
          </div>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ backgroundColor: "hsl(0 0% 100% / 0.5)" }}
          >
            <ArrowUpRight className="h-4 w-4" style={{ color: "hsl(135 12% 26%)" }} />
          </div>
        </Link>
      </motion.section>

      {/* Trust strip */}
      <motion.section
        variants={fadeIn}
        className="flex flex-wrap items-center justify-center gap-2 py-4"
      >
        {trustItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
            style={{
              backgroundColor: "hsl(0 0% 100% / 0.6)",
              color: "hsl(135 12% 26% / 0.5)",
            }}
          >
            <item.icon className="h-3.5 w-3.5" strokeWidth={1.75} style={{ color: "hsl(105 15% 43%)" }} />
            {item.label}
          </div>
        ))}
      </motion.section>
    </motion.div>
  );
}
