"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/use-app-store";
import { assembleInsights } from "@/lib/insights";
import { EmotionalVisualization } from "@/components/emotional-visualization";
import { InsightCard } from "@/components/insight-card";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { RotateCcw, BookOpen, ArrowLeft } from "lucide-react";

export default function ResultsPage() {
  const router = useRouter();
  const { stressProfile, assessmentAnswers, personalizedRecommendations, resetAssessment } = useAppStore();

  useEffect(() => {
    if (!stressProfile || assessmentAnswers.length === 0) {
      router.replace("/check-in");
    }
  }, [stressProfile, assessmentAnswers, router]);

  const insights = useMemo(() => {
    if (!stressProfile) return [];
    return assembleInsights(stressProfile);
  }, [stressProfile]);

  if (!stressProfile) return null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2 text-sm"
          style={{ color: "hsl(135 12% 26% / 0.45)" }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
          Statistics
        </p>
        <h1
          className="mt-2 text-[26px] font-semibold leading-tight tracking-tight"
          style={{ color: "hsl(135 12% 26%)" }}
        >
          Based on your <span className="font-bold">daily surveys</span>
        </h1>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "hsl(135 12% 26% / 0.5)" }}>
          These observations are not diagnoses.
        </p>
      </motion.div>

      {/* Visualization */}
      <motion.div variants={fadeInUp}>
        <EmotionalVisualization profile={stressProfile} />
      </motion.div>

      {/* Insight Cards */}
      <motion.div
        variants={staggerContainer}
        className="flex flex-col gap-3"
      >
        <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
          Your insights
        </p>
        {insights.map((insight, i) => (
          <InsightCard
            key={`${insight.category}-${i}`}
            insight={insight}
            index={i}
          />
        ))}
      </motion.div>

      {/* ML Recommendations Preview */}
      {personalizedRecommendations && (
        <motion.div
          variants={fadeInUp}
          className="rounded-2xl p-5"
          style={{ backgroundColor: "hsl(53 55% 77% / 0.35)" }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ backgroundColor: "hsl(0 0% 100% / 0.6)" }}
            >
              <BookOpen className="h-4 w-4" strokeWidth={1.75} style={{ color: "hsl(135 12% 26% / 0.7)" }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold" style={{ color: "hsl(135 12% 26%)" }}>
                Personalized Recommendations Ready
              </h3>
              <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.5)" }}>
                {Math.round(personalizedRecommendations.confidenceScore)}% confidence match
              </p>
            </div>
          </div>
          <div className="text-xs" style={{ color: "hsl(135 12% 26% / 0.6)" }}>
            • {personalizedRecommendations.books.length} book recommendations
            <br />
            • {personalizedRecommendations.music.length} music recommendations  
            <br />
            • Based on your responses and emotional profile
          </div>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        variants={fadeInUp}
        className="flex flex-col gap-3 pb-4"
      >
        <Link
          href="/resources"
          className="flex items-center justify-center gap-2 rounded-2xl py-4 text-sm font-semibold transition-colors duration-300"
          style={{
            backgroundColor: "hsl(135 12% 26%)",
            color: "hsl(36 33% 93%)",
          }}
        >
          <BookOpen className="h-4 w-4" strokeWidth={1.75} />
          View resources
        </Link>

        <button
          type="button"
          onClick={() => {
            resetAssessment();
            router.push("/check-in");
          }}
          className="flex items-center justify-center gap-2 rounded-2xl py-4 text-sm font-medium transition-colors duration-300"
          style={{
            backgroundColor: "hsl(0 0% 100% / 0.6)",
            color: "hsl(135 12% 26% / 0.6)",
          }}
        >
          <RotateCcw className="h-4 w-4" strokeWidth={1.75} />
          Start over
        </button>
      </motion.div>
    </motion.div>
  );
}
