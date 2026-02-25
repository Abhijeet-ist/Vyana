"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useAppStore } from "@/store/use-app-store";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import {
  ArrowLeft,
  Download,
  Trash2,
  TrendingUp,
  TrendingDown,
  Minus,
  Brain,
  Zap,
  Activity,
  BarChart3,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import type { WeeklyEntry } from "@/types";

/* ─── helpers ─── */
function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const emotionColors: Record<string, string> = {
  calm: "hsl(108 22% 80%)",
  stressed: "hsl(17 55% 62%)",
  reflective: "hsl(260 18% 84%)",
  crisis: "hsl(0 65% 70%)",
  neutral: "hsl(36 33% 80%)",
};

const emotionTextColors: Record<string, string> = {
  calm: "hsl(105 15% 35%)",
  stressed: "hsl(17 55% 42%)",
  reflective: "hsl(260 25% 48%)",
  crisis: "hsl(0 60% 42%)",
  neutral: "hsl(135 12% 40%)",
};

const emotionLabels: Record<string, string> = {
  calm: "Calm",
  stressed: "Stressed",
  reflective: "Reflective",
  crisis: "In Crisis",
  neutral: "Neutral",
};

/* ─── custom tooltip ─── */
function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl p-3 text-xs shadow-lg"
      style={{ backgroundColor: "hsl(0 0% 100%)", border: "1px solid hsl(33 20% 85%)" }}
    >
      <p className="font-semibold mb-2" style={{ color: "hsl(135 12% 26%)" }}>
        {label}
      </p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span style={{ color: "hsl(135 12% 40%)" }}>{p.name}:</span>
          <span className="font-medium" style={{ color: "hsl(135 12% 26%)" }}>
            {p.value.toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── score bar ─── */
function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: "hsl(33 20% 88%)" }}>
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${(value / 5) * 100}%` }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      />
    </div>
  );
}

/* ─── entry card ─── */
function EntryCard({ entry, onDelete }: { entry: WeeklyEntry; onDelete: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const s = entry.stressProfile;

  return (
    <motion.div
      layout
      variants={fadeInUp}
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: "hsl(0 0% 100% / 0.7)" }}
    >
      {/* Header row */}
      <div className="flex items-center gap-3 p-4">
        {/* Emotion badge */}
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
          style={{
            backgroundColor: emotionColors[entry.emotionalState] ?? "hsl(36 33% 80%)",
            color: emotionTextColors[entry.emotionalState] ?? "hsl(135 12% 26%)",
          }}
        >
          {emotionLabels[entry.emotionalState]?.[0] ?? "?"}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: "hsl(135 12% 26%)" }}>
            {emotionLabels[entry.emotionalState] ?? "Unknown"}
          </p>
          <p className="text-[11px]" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
            {formatDateTime(entry.date)}
          </p>
        </div>

        {/* Overall score pill */}
        <div
          className="shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{
            backgroundColor: "hsl(108 22% 80% / 0.35)",
            color: "hsl(105 15% 35%)",
          }}
        >
          {s.overall.toFixed(1)} / 5
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setExpanded((x) => !x)}
            className="flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200"
            style={{ backgroundColor: "hsl(33 20% 88% / 0.6)" }}
            aria-label="Toggle details"
          >
            {expanded
              ? <ChevronUp className="h-3.5 w-3.5" style={{ color: "hsl(135 12% 40%)" }} strokeWidth={2} />
              : <ChevronDown className="h-3.5 w-3.5" style={{ color: "hsl(135 12% 40%)" }} strokeWidth={2} />
            }
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200"
            style={{ backgroundColor: "hsl(17 55% 62% / 0.12)" }}
            aria-label="Delete entry"
          >
            <Trash2 className="h-3.5 w-3.5" style={{ color: "hsl(17 55% 48%)" }} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Mini score bars */}
      <div className="px-4 pb-3 flex gap-3">
        {[
          { label: "Cog", value: s.cognitive, color: "hsl(260 18% 64%)" },
          { label: "Str", value: s.stress, color: "hsl(17 55% 58%)" },
          { label: "Beh", value: s.behavior, color: "hsl(105 15% 48%)" },
        ].map((d) => (
          <div key={d.label} className="flex-1">
            <div className="flex justify-between mb-1">
              <span className="text-[10px]" style={{ color: "hsl(135 12% 26% / 0.45)" }}>{d.label}</span>
              <span className="text-[10px] font-medium" style={{ color: "hsl(135 12% 40%)" }}>{d.value.toFixed(1)}</span>
            </div>
            <ScoreBar value={d.value} color={d.color} />
          </div>
        ))}
      </div>

      {/* Expanded insights */}
      <AnimatePresence initial={false}>
        {expanded && entry.insights.length > 0 && (
          <motion.div
            key="insights"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <div
              className="mx-4 mb-4 rounded-xl p-3 flex flex-col gap-2"
              style={{ backgroundColor: "hsl(33 20% 93% / 0.6)" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide mb-1"
                style={{ color: "hsl(135 12% 26% / 0.4)" }}>
                Insights from this session
              </p>
              {entry.insights.map((ins, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div
                    className="mt-0.5 h-4 w-4 shrink-0 flex items-center justify-center rounded-full text-[9px]"
                    style={{
                      backgroundColor:
                        ins.category === "cognitive" ? "hsl(260 18% 84% / 0.5)" :
                        ins.category === "stress" ? "hsl(17 55% 62% / 0.2)" :
                        "hsl(108 22% 80% / 0.4)",
                    }}
                  >
                    {ins.category === "cognitive" ? "C" : ins.category === "stress" ? "S" : "B"}
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: "hsl(135 12% 26% / 0.65)" }}>
                    {ins.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── main page ─── */
export default function WeeklyInsightsPage() {
  const router = useRouter();
  const { weeklyEntries, deleteWeeklyEntry, clearWeeklyEntries } = useAppStore();
  const [confirmClear, setConfirmClear] = useState(false);
  const [highlightedSeries, setHighlightedSeries] = useState<"Overall" | "Cognitive" | "Stress" | "Behavior" | null>(null);

  /* Chart data — oldest first */
  const chartData = useMemo(() => {
    return [...weeklyEntries]
      .reverse()
      .map((e) => ({
        date: formatDate(e.date),
        Overall: parseFloat(e.stressProfile.overall.toFixed(2)),
        Cognitive: parseFloat(e.stressProfile.cognitive.toFixed(2)),
        Stress: parseFloat(e.stressProfile.stress.toFixed(2)),
        Behavior: parseFloat(e.stressProfile.behavior.toFixed(2)),
      }));
  }, [weeklyEntries]);

  /* Aggregate stats over all entries */
  const stats = useMemo(() => {
    if (!weeklyEntries.length) return null;
    const sum = weeklyEntries.reduce(
      (acc, e) => ({
        overall: acc.overall + e.stressProfile.overall,
        cognitive: acc.cognitive + e.stressProfile.cognitive,
        stress: acc.stress + e.stressProfile.stress,
        behavior: acc.behavior + e.stressProfile.behavior,
      }),
      { overall: 0, cognitive: 0, stress: 0, behavior: 0 }
    );
    const n = weeklyEntries.length;
    return {
      overall: sum.overall / n,
      cognitive: sum.cognitive / n,
      stress: sum.stress / n,
      behavior: sum.behavior / n,
    };
  }, [weeklyEntries]);

  /* Trend: compare last entry vs second-to-last */
  const trend = useMemo(() => {
    if (weeklyEntries.length < 2) return "neutral";
    const latest = weeklyEntries[0].stressProfile.overall;
    const prev = weeklyEntries[1].stressProfile.overall;
    const delta = latest - prev;
    if (delta <= -0.3) return "improving";
    if (delta >= 0.3) return "declining";
    return "stable";
  }, [weeklyEntries]);

  /* Download JSON */
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(weeklyEntries, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vyana-weekly-insights-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const trendConfig = {
    improving: {
      icon: TrendingUp,
      label: "Improving",
      description: "Your stress levels are trending down. Keep it up.",
      bg: "hsl(108 22% 80% / 0.35)",
      color: "hsl(105 15% 35%)",
      iconBg: "hsl(108 22% 80% / 0.5)",
    },
    stable: {
      icon: Minus,
      label: "Stable",
      description: "Your scores are consistent. Maintain your current habits.",
      bg: "hsl(53 55% 77% / 0.35)",
      color: "hsl(53 40% 38%)",
      iconBg: "hsl(53 55% 77% / 0.6)",
    },
    declining: {
      icon: TrendingDown,
      label: "Needs attention",
      description: "Stress has increased recently. Consider a breathing exercise.",
      bg: "hsl(17 55% 62% / 0.15)",
      color: "hsl(17 55% 42%)",
      iconBg: "hsl(17 55% 62% / 0.25)",
    },
    neutral: {
      icon: Sparkles,
      label: "Getting started",
      description: "Save more assessments to track your trend over time.",
      bg: "hsl(260 18% 84% / 0.3)",
      color: "hsl(260 25% 48%)",
      iconBg: "hsl(260 18% 84% / 0.5)",
    },
  };

  const tc = trendConfig[weeklyEntries.length < 2 ? "neutral" : trend];
  const TrendIcon = tc.icon;

  const statCards = stats
    ? [
        { label: "Overall", value: stats.overall, icon: BarChart3, color: "hsl(135 12% 26%)", bg: "hsl(33 20% 88% / 0.5)" },
        { label: "Cognitive", value: stats.cognitive, icon: Brain, color: "hsl(260 18% 54%)", bg: "hsl(260 18% 84% / 0.35)" },
        { label: "Stress", value: stats.stress, icon: Zap, color: "hsl(17 55% 48%)", bg: "hsl(17 55% 62% / 0.15)" },
        { label: "Behavior", value: stats.behavior, icon: Activity, color: "hsl(105 15% 43%)", bg: "hsl(108 22% 80% / 0.35)" },
      ]
    : [];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6 pb-4"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="pt-2">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm"
            style={{ color: "hsl(135 12% 26% / 0.45)" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          {weeklyEntries.length > 0 && (
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-200"
              style={{ backgroundColor: "hsl(135 12% 26% / 0.08)", color: "hsl(135 12% 26% / 0.7)" }}
            >
              <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
              Export
            </button>
          )}
        </div>
        <p className="mt-4 text-sm font-medium" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
          Progress
        </p>
        <h1
          className="mt-2 text-[26px] font-semibold leading-tight tracking-tight"
          style={{ color: "hsl(135 12% 26%)" }}
        >
          Your weekly <span className="font-bold">journey</span>
        </h1>
        <p className="mt-1 text-sm" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
          {weeklyEntries.length} session{weeklyEntries.length !== 1 ? "s" : ""} saved
        </p>
      </motion.div>

      {/* Empty state */}
      {weeklyEntries.length === 0 && (
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center gap-4 rounded-2xl p-8 text-center"
          style={{ backgroundColor: "hsl(0 0% 100% / 0.7)" }}
        >
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: "hsl(108 22% 80% / 0.35)" }}
          >
            <BarChart3 className="h-6 w-6" strokeWidth={1.5} style={{ color: "hsl(105 15% 43%)" }} />
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: "hsl(135 12% 26%)" }}>
              No sessions saved yet
            </p>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: "hsl(135 12% 26% / 0.5)" }}>
              Complete an assessment and tap{" "}
              <span className="font-medium" style={{ color: "hsl(105 15% 43%)" }}>
                Save to weekly insights
              </span>{" "}
              on the results page to start tracking.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/check-in")}
            className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-200"
            style={{ backgroundColor: "hsl(135 12% 26%)", color: "hsl(36 33% 93%)" }}
          >
            Start a check-in
          </button>
        </motion.div>
      )}

      {weeklyEntries.length > 0 && (
        <>
          {/* Trend card */}
          <motion.div
            variants={fadeInUp}
            className="flex items-start gap-3 rounded-2xl p-4"
            style={{ backgroundColor: tc.bg }}
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: tc.iconBg }}
            >
              <TrendIcon className="h-4 w-4" strokeWidth={1.75} style={{ color: tc.color }} />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: tc.color }}>
                {tc.label}
              </p>
              <p className="text-xs mt-0.5" style={{ color: tc.color + "99" }}>
                {tc.description}
              </p>
            </div>
          </motion.div>

          {/* Stat cards */}
          <motion.div variants={fadeInUp} className="grid grid-cols-4 gap-2">
            {statCards.map((s) => {
              const Icon = s.icon;
              const isActive = highlightedSeries === s.label;
              const isDimmed = highlightedSeries !== null && !isActive;
              return (
                <motion.button
                  key={s.label}
                  type="button"
                  onClick={() => setHighlightedSeries(isActive ? null : s.label as typeof highlightedSeries)}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-1.5 rounded-2xl p-3 transition-all duration-300 focus:outline-none"
                  style={{
                    backgroundColor: s.bg,
                    opacity: isDimmed ? 0.45 : 1,
                    boxShadow: isActive ? `0 0 0 2px ${s.color}40, 0 4px 12px ${s.color}20` : "none",
                    transform: isActive ? "translateY(-2px)" : "none",
                  }}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} style={{ color: s.color }} />
                  <p className="text-[15px] font-bold" style={{ color: s.color }}>
                    {s.value.toFixed(1)}
                  </p>
                  <p className="text-[9px] font-medium uppercase tracking-wide text-center leading-tight" style={{ color: s.color + "99" }}>
                    {s.label}
                  </p>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Area chart */}
          {chartData.length > 1 && (
            <motion.div
              variants={fadeInUp}
              className="rounded-2xl p-4"
              style={{ backgroundColor: "hsl(0 0% 100% / 0.7)" }}
            >
              <p className="text-xs font-semibold mb-3" style={{ color: "hsl(135 12% 26% / 0.5)" }}>
                Score trends over time
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradOverall" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(135 12% 26%)" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="hsl(135 12% 26%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradCog" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(260 18% 64%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(260 18% 64%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradStr" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(17 55% 58%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(17 55% 58%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradBeh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(105 15% 48%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(105 15% 48%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="hsl(33 20% 88%)" strokeDasharray="4 4" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: "hsl(135 12% 26% / 0.4)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 5]}
                    ticks={[0, 1, 2, 3, 4, 5]}
                    tick={{ fontSize: 10, fill: "hsl(135 12% 26% / 0.4)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    iconType="circle"
                    iconSize={6}
                    wrapperStyle={{ fontSize: "10px", paddingTop: "8px" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Overall"
                    stroke="hsl(135 12% 26%)"
                    strokeWidth={highlightedSeries === "Overall" ? 3 : 2}
                    strokeOpacity={!highlightedSeries || highlightedSeries === "Overall" ? 1 : 0.15}
                    fill="url(#gradOverall)"
                    fillOpacity={!highlightedSeries || highlightedSeries === "Overall" ? 1 : 0.05}
                    dot={!highlightedSeries || highlightedSeries === "Overall" ? { r: 3, fill: "hsl(135 12% 26%)", strokeWidth: 0 } : false}
                    activeDot={!highlightedSeries || highlightedSeries === "Overall" ? { r: 5 } : false}
                  />
                  <Area
                    type="monotone"
                    dataKey="Cognitive"
                    stroke="hsl(260 18% 54%)"
                    strokeWidth={highlightedSeries === "Cognitive" ? 3 : 1.5}
                    strokeOpacity={!highlightedSeries || highlightedSeries === "Cognitive" ? 1 : 0.15}
                    fill="url(#gradCog)"
                    fillOpacity={!highlightedSeries || highlightedSeries === "Cognitive" ? 1 : 0.05}
                    dot={!highlightedSeries || highlightedSeries === "Cognitive" ? { r: 2.5, fill: "hsl(260 18% 54%)", strokeWidth: 0 } : false}
                    activeDot={!highlightedSeries || highlightedSeries === "Cognitive" ? { r: 4 } : false}
                  />
                  <Area
                    type="monotone"
                    dataKey="Stress"
                    stroke="hsl(17 55% 52%)"
                    strokeWidth={highlightedSeries === "Stress" ? 3 : 1.5}
                    strokeOpacity={!highlightedSeries || highlightedSeries === "Stress" ? 1 : 0.15}
                    fill="url(#gradStr)"
                    fillOpacity={!highlightedSeries || highlightedSeries === "Stress" ? 1 : 0.05}
                    dot={!highlightedSeries || highlightedSeries === "Stress" ? { r: 2.5, fill: "hsl(17 55% 52%)", strokeWidth: 0 } : false}
                    activeDot={!highlightedSeries || highlightedSeries === "Stress" ? { r: 4 } : false}
                  />
                  <Area
                    type="monotone"
                    dataKey="Behavior"
                    stroke="hsl(105 15% 43%)"
                    strokeWidth={highlightedSeries === "Behavior" ? 3 : 1.5}
                    strokeOpacity={!highlightedSeries || highlightedSeries === "Behavior" ? 1 : 0.15}
                    fill="url(#gradBeh)"
                    fillOpacity={!highlightedSeries || highlightedSeries === "Behavior" ? 1 : 0.05}
                    dot={!highlightedSeries || highlightedSeries === "Behavior" ? { r: 2.5, fill: "hsl(105 15% 43%)", strokeWidth: 0 } : false}
                    activeDot={!highlightedSeries || highlightedSeries === "Behavior" ? { r: 4 } : false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {/* Entry history */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-2">
            <p
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: "hsl(135 12% 26% / 0.35)" }}
            >
              Session history
            </p>
            <motion.div variants={staggerContainer} className="flex flex-col gap-3">
              {weeklyEntries.map((entry) => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  onDelete={() => deleteWeeklyEntry(entry.id)}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Clear all */}
          <motion.div variants={fadeInUp}>
            {!confirmClear ? (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-medium transition-colors duration-200"
                style={{ backgroundColor: "hsl(17 55% 62% / 0.1)", color: "hsl(17 55% 48%)" }}
              >
                <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                Clear all history
              </button>
            ) : (
              <div
                className="rounded-2xl p-4 flex flex-col gap-3"
                style={{ backgroundColor: "hsl(17 55% 62% / 0.12)" }}
              >
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" strokeWidth={1.75} style={{ color: "hsl(17 55% 48%)" }} />
                  <p className="text-xs leading-relaxed" style={{ color: "hsl(17 55% 42%)" }}>
                    This will permanently delete all {weeklyEntries.length} saved sessions. This cannot be undone.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => { clearWeeklyEntries(); setConfirmClear(false); }}
                    className="flex-1 rounded-xl py-2.5 text-xs font-semibold transition-colors duration-200"
                    style={{ backgroundColor: "hsl(17 55% 52%)", color: "white" }}
                  >
                    Yes, clear all
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmClear(false)}
                    className="flex-1 rounded-xl py-2.5 text-xs font-medium transition-colors duration-200"
                    style={{ backgroundColor: "hsl(0 0% 100% / 0.7)", color: "hsl(135 12% 40%)" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
