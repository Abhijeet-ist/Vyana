"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/store/use-app-store";
import {
  getQuestionsForState,
  calculateStressProfile,
} from "@/lib/insights";
import { generatePersonalizedRecommendations } from "@/lib/ml-recommendations";
import { ArrowLeft } from "lucide-react";

const scaleLabels = ["Rarely", "Sometimes", "Often", "Very often", "Always"];

export default function AssessmentPage() {
  const router = useRouter();
  const { addAnswer, assessmentAnswers, setStressProfile, setPersonalizedRecommendations, onboardingSelection } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Redirect to check-in if no emotional state selected
  useEffect(() => {
    if (!onboardingSelection) {
      router.replace("/check-in");
    }
  }, [onboardingSelection, router]);

  // Get personalized questions based on user's emotional state — stable for the session
  const questionsRef = useRef<ReturnType<typeof getQuestionsForState> | null>(null);
  const lastSelectionRef = useRef(onboardingSelection);

  // Only regenerate questions if onboardingSelection changes or assessment was reset (fresh start)
  if (
    !questionsRef.current ||
    lastSelectionRef.current !== onboardingSelection ||
    assessmentAnswers.length === 0
  ) {
    questionsRef.current = getQuestionsForState(onboardingSelection);
    lastSelectionRef.current = onboardingSelection;
  }

  const assessmentQuestions = questionsRef.current;
  const totalQuestions = assessmentQuestions.length;
  const currentQuestion = assessmentQuestions[currentIndex];
  const currentAnswer = assessmentAnswers.find(
    (a) => a.questionId === currentQuestion?.id
  );

  // Show loading if no onboarding selection (while redirecting)
  if (!onboardingSelection || !currentQuestion) {
    return (
      <div className="flex min-h-[75vh] flex-col items-center justify-center">
        <div className="text-sm" style={{ color: "hsl(135 12% 26% / 0.6)" }}>
          Loading your personalized assessment...
        </div>
      </div>
    );
  }

  const handleAnswer = useCallback(
    async (score: number) => {
      addAnswer({ questionId: currentQuestion.id, score });

      if (currentIndex < totalQuestions - 1) {
        setDirection(1);
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, 150);
      } else {
        const allAnswers = [
          ...assessmentAnswers.filter(
            (a) => a.questionId !== currentQuestion.id
          ),
          { questionId: currentQuestion.id, score },
        ];
        const profile = calculateStressProfile(allAnswers, onboardingSelection);
        setStressProfile(profile);
        
        // Generate ML-based recommendations with Spotify integration
        try {
          console.log('Generating personalized recommendations...');
          const recommendations = await generatePersonalizedRecommendations(
            allAnswers,
            profile,
            onboardingSelection
          );
          console.log('Recommendations generated:', recommendations);
          setPersonalizedRecommendations(recommendations);
        } catch (error) {
          console.error('Failed to generate recommendations:', error);
        }
        
        router.push("/results");
      }
    },
    [
      addAnswer,
      assessmentAnswers,
      currentIndex,
      currentQuestion,
      router,
      setStressProfile,
      setPersonalizedRecommendations,
      totalQuestions,
      onboardingSelection,
    ]
  );

  const handleBack = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center">
      {/* Back + progress row */}
      <div className="mb-8 flex w-full items-center gap-4">
        {currentIndex > 0 ? (
          <button
            type="button"
            onClick={handleBack}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors"
            style={{ backgroundColor: "hsl(0 0% 100% / 0.6)" }}
            aria-label="Previous question"
          >
            <ArrowLeft className="h-4 w-4" style={{ color: "hsl(135 12% 26% / 0.5)" }} />
          </button>
        ) : (
          <div className="h-9 w-9" />
        )}

        {/* Progress bar */}
        <div className="flex flex-1 items-center gap-1.5">
          {assessmentQuestions.map((q, i) => {
            const isAnswered = assessmentAnswers.some((a) => a.questionId === q.id);
            const isCurrent = i === currentIndex;
            return (
              <div
                key={q.id}
                className="h-1.5 flex-1 rounded-full transition-all duration-500"
                style={{
                  backgroundColor:
                    isAnswered || isCurrent
                      ? "hsl(135 12% 26%)"
                      : "hsl(33 30% 86%)",
                }}
              />
            );
          })}
        </div>

        <span className="text-xs font-medium" style={{ color: "hsl(135 12% 26% / 0.4)" }}>
          {currentIndex + 1}/{totalQuestions}
        </span>
      </div>

      {/* Question card */}
      <div className="w-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion.id}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d * 60, opacity: 0 }),
              center: {
                x: 0,
                opacity: 1,
                transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
              },
              exit: (d: number) => ({
                x: d * -60,
                opacity: 0,
                transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col gap-8"
          >
            <h2
              className="text-balance text-[22px] font-semibold leading-snug tracking-tight"
              style={{ color: "hsl(135 12% 26%)" }}
            >
              {currentQuestion.text}
            </h2>

            {/* Scale selection buttons */}
            <div className="flex flex-col gap-2.5">
              {scaleLabels.map((label, i) => {
                const score = i + 1;
                const isSelected = currentAnswer?.score === score;
                return (
                  <motion.button
                    key={label}
                    type="button"
                    onClick={() => handleAnswer(score)}
                    className="flex items-center gap-3 rounded-2xl px-5 py-4 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:ring-offset-2"
                    style={{
                      backgroundColor: isSelected
                        ? "hsl(135 12% 26%)"
                        : "hsl(0 0% 100% / 0.7)",
                    }}
                    whileHover={{
                      backgroundColor: isSelected
                        ? "hsl(135 12% 26%)"
                        : "hsl(0 0% 100% / 0.9)",
                    }}
                  >
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: isSelected
                          ? "hsl(36 33% 93% / 0.2)"
                          : "hsl(33 30% 86% / 0.5)",
                        color: isSelected
                          ? "hsl(36 33% 93%)"
                          : "hsl(135 12% 26% / 0.5)",
                      }}
                    >
                      {score}
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{
                        color: isSelected
                          ? "hsl(36 33% 93%)"
                          : "hsl(135 12% 26% / 0.7)",
                      }}
                    >
                      {label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
