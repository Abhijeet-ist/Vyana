"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/use-app-store";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { AlertTriangle, ArrowUpRight, Bell, Eye, Gauge, Globe, RotateCcw, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const {
    reducedMotion,
    toggleReducedMotion,
    highContrast,
    toggleHighContrast,
    resetAssessment,
    notifications,
    toggleNotification,
  } = useAppStore();

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
          Preferences
        </p>
        <h1
          className="mt-2 text-[26px] font-semibold leading-tight tracking-tight"
          style={{ color: "hsl(135 12% 26%)" }}
        >
          Adjust your <span className="font-bold">experience</span>
        </h1>
      </motion.div>

      {/* Notifications */}
      <motion.div variants={fadeInUp} className="flex flex-col gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "hsl(135 12% 26% / 0.35)" }}
        >
          Notifications
        </p>

        {/* Assessment reminders */}
        <div
          className="flex items-center justify-between rounded-2xl p-5"
          style={{ backgroundColor: "hsl(0 0% 100% / 0.7)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: "hsl(260 18% 84% / 0.4)" }}
            >
              <Bell className="h-4 w-4" strokeWidth={1.75} style={{ color: "hsl(260 18% 54%)" }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                Assessment reminders
              </p>
              <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                Daily check-in notifications
              </p>
            </div>
          </div>
          <Switch
            checked={notifications.assessmentReminders}
            onCheckedChange={() => toggleNotification("assessmentReminders")}
            className="data-[state=checked]:bg-[hsl(var(--seaweed))] data-[state=unchecked]:bg-[hsl(var(--warm-beige))]"
            style={{ boxShadow: "0 2px 8px hsl(var(--seaweed) / 0.1)" }}
          />
        </div>

        {/* Weekly insights */}
        <div
          className="rounded-2xl"
          style={{ backgroundColor: "hsl(0 0% 100% / 0.7)" }}
        >
          <div className="flex items-center justify-between p-5 pb-3">
            <div className="flex items-center gap-3">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: "hsl(108 22% 80% / 0.4)" }}
              >
                <Globe className="h-4 w-4" strokeWidth={1.75} style={{ color: "hsl(105 15% 43%)" }} />
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                  Weekly insights
                </p>
                <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                  Summary of your mental health journey
                </p>
              </div>
            </div>
            <Switch
              checked={notifications.weeklyInsights}
              onCheckedChange={() => toggleNotification("weeklyInsights")}
              className="data-[state=checked]:bg-[hsl(var(--seaweed))] data-[state=unchecked]:bg-[hsl(var(--warm-beige))]"
              style={{ boxShadow: "0 2px 8px hsl(var(--seaweed) / 0.1)" }}
            />
          </div>
          <div className="px-5 pb-4">
            <Link
              href="/weekly-insights"
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-200"
              style={{ backgroundColor: "hsl(108 22% 80% / 0.35)", color: "hsl(105 15% 35%)" }}
            >
              <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
              View your journey
            </Link>
          </div>
        </div>

        {/* Emergency alerts */}
        <div
          className="flex items-center justify-between rounded-2xl p-5"
          style={{ backgroundColor: "hsl(0 0% 100% / 0.7)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: "hsl(17 55% 62% / 0.15)" }}
            >
              <AlertTriangle className="h-4 w-4" strokeWidth={1.75} style={{ color: "hsl(17 55% 52%)" }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                Emergency alerts
              </p>
              <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                Critical mental health support notifications
              </p>
            </div>
          </div>
          <Switch
            checked={notifications.emergencyAlerts}
            onCheckedChange={() => toggleNotification("emergencyAlerts")}
            className="data-[state=checked]:bg-[hsl(var(--seaweed))] data-[state=unchecked]:bg-[hsl(var(--warm-beige))]"
            style={{ boxShadow: "0 2px 8px hsl(var(--seaweed) / 0.1)" }}
          />
        </div>
      </motion.div>

      {/* Accessibility */}
      <motion.div variants={fadeInUp} className="flex flex-col gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "hsl(135 12% 26% / 0.35)" }}
        >
          Accessibility
        </p>

        {/* Reduced motion */}
        <div
          className="flex items-center justify-between rounded-2xl p-5"
          style={{ backgroundColor: "hsl(0 0% 100% / 0.7)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: "hsl(108 22% 80% / 0.4)" }}
            >
              <Gauge className="h-4 w-4" strokeWidth={1.75} style={{ color: "hsl(105 15% 43%)" }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                Reduced motion
              </p>
              <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                Minimize animations
              </p>
            </div>
          </div>
          <Switch
            checked={reducedMotion}
            onCheckedChange={toggleReducedMotion}
            className="data-[state=checked]:bg-[hsl(var(--seaweed))] data-[state=unchecked]:bg-[hsl(var(--warm-beige))]"
            style={{
              boxShadow: `
                0 2px 8px hsl(var(--seaweed) / 0.1),
                inset 0 1px 0 hsl(255 255% 255% / 0.2)
              `
            }}
          />
        </div>

        {/* High contrast */}
        <div
          className="flex items-center justify-between rounded-2xl p-5"
          style={{ backgroundColor: "hsl(0 0% 100% / 0.7)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: "hsl(260 18% 84% / 0.35)" }}
            >
              <Eye className="h-4 w-4" strokeWidth={1.75} style={{ color: "hsl(260 18% 64%)" }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                High contrast
              </p>
              <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                Increase visual contrast
              </p>
            </div>
          </div>
          <Switch
            checked={highContrast}
            onCheckedChange={toggleHighContrast}
            className="data-[state=checked]:bg-[hsl(var(--seaweed))] data-[state=unchecked]:bg-[hsl(var(--warm-beige))]"
            style={{
              boxShadow: `
                0 2px 8px hsl(var(--seaweed) / 0.1),
                inset 0 1px 0 hsl(255 255% 255% / 0.2)
              `
            }}
          />
        </div>
      </motion.div>

      {/* Data section */}
      <motion.div variants={fadeInUp} className="flex flex-col gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "hsl(135 12% 26% / 0.35)" }}
        >
          Data
        </p>

        {/* Reset */}
        <div
          className="flex items-center justify-between rounded-2xl p-5"
          style={{ backgroundColor: "hsl(0 0% 100% / 0.7)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: "hsl(17 55% 62% / 0.15)" }}
            >
              <RotateCcw className="h-4 w-4" strokeWidth={1.75} style={{ color: "hsl(17 55% 52%)" }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                Reset assessment
              </p>
              <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                Clear all responses and insights
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetAssessment}
            className="rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-300"
            style={{
              backgroundColor: "hsl(17 55% 62% / 0.15)",
              color: "hsl(17 55% 52%)",
            }}
          >
            Reset
          </button>
        </div>

        {/* Privacy */}
        <div
          className="flex items-start gap-3 rounded-2xl p-5"
          style={{ backgroundColor: "hsl(0 0% 100% / 0.7)" }}
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "hsl(108 22% 80% / 0.4)" }}
          >
            <Shield className="h-4 w-4" strokeWidth={1.75} style={{ color: "hsl(105 15% 43%)" }} />
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
              Privacy first
            </p>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
              Your data stays in your browser. We do not track, store, or
              share your responses. Fully anonymous.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
