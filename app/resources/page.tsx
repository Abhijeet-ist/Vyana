"use client";

import { motion } from "framer-motion";
import {
  Phone,
  Wind,
  Building2,
  BookOpen,
  ExternalLink,
  ArrowUpRight,
  Music,
  Sparkles,
} from "lucide-react";
import { useAppStore } from "@/store/use-app-store";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const resourceCategories = [
  {
    title: "Crisis Support",
    description: "Immediate help when you need it",
    icon: Phone,
    cardBg: "hsl(17 55% 62% / 0.15)",
    items: [
      {
        name: "988 Suicide & Crisis Lifeline",
        detail: "Call or text 988 - free, confidential, 24/7",
        link: "tel:988",
      },
      {
        name: "Crisis Text Line",
        detail: "Text HOME to 741741",
        link: "sms:741741",
      },
      {
        name: "SAMHSA Helpline",
        detail: "1-800-662-4357 - treatment referrals",
        link: "tel:18006624357",
      },
    ],
  },
  {
    title: "Self-Care Techniques",
    description: "Gentle practices for regulation",
    icon: Wind,
    cardBg: "hsl(108 22% 80% / 0.35)",
    items: [
      {
        name: "Box Breathing",
        detail: "Inhale 4s, hold 4s, exhale 4s, hold 4s. Repeat 4 times.",
        link: null,
      },
      {
        name: "5-4-3-2-1 Grounding",
        detail:
          "Name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste.",
        link: null,
      },
      {
        name: "Body Scan",
        detail:
          "Starting from your toes, slowly notice each part of your body.",
        link: null,
      },
    ],
  },
  {
    title: "Campus Resources",
    description: "Support within your university",
    icon: Building2,
    cardBg: "hsl(260 18% 84% / 0.35)",
    items: [
      {
        name: "Counseling Center",
        detail: "Most campuses offer free sessions. Check your website.",
        link: null,
      },
      {
        name: "Wellness Programs",
        detail: "Group workshops, peer support, and activities.",
        link: null,
      },
      {
        name: "Academic Support",
        detail: "Accommodations for mental health-related needs.",
        link: null,
      },
    ],
  },
  {
    title: "Further Reading",
    description: "Understanding emotional patterns",
    icon: BookOpen,
    cardBg: "hsl(53 55% 77% / 0.35)",
    items: [
      {
        name: "Cognitive Patterns",
        detail: "Learn about common thinking patterns and their effects.",
        link: null,
      },
      {
        name: "Stress Response",
        detail: "Understanding fight, flight, freeze, and fawn.",
        link: null,
      },
      {
        name: "Building Resilience",
        detail: "Small, evidence-based steps toward steadiness.",
        link: null,
      },
    ],
  },
];

export default function ResourcesPage() {
  const { personalizedRecommendations } = useAppStore();

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
          Support
        </p>
        <h1
          className="mt-2 text-[26px] font-semibold leading-tight tracking-tight"
          style={{ color: "hsl(135 12% 26%)" }}
        >
          Resources for <span className="font-bold">your wellbeing</span>
        </h1>
      </motion.div>

      {/* ML-Generated Recommendations */}
      {personalizedRecommendations && (
        <>
          <motion.div
            variants={fadeInUp}
            className="flex flex-col gap-3 rounded-2xl p-5"
            style={{ backgroundColor: "hsl(108 22% 80% / 0.35)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "hsl(0 0% 100% / 0.6)" }}
              >
                <BookOpen
                  className="h-5 w-5"
                  strokeWidth={1.75}
                  style={{ color: "hsl(135 12% 26% / 0.7)" }}
                />
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold" style={{ color: "hsl(135 12% 26%)" }}>
                  Recommended Books
                </h2>
                <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.5)" }}>
                  Personalized based on your assessment
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" style={{ color: "hsl(105 15% 43%)" }} />
                <span className="text-xs font-medium" style={{ color: "hsl(105 15% 43%)" }}>
                  {Math.round(personalizedRecommendations.confidenceScore)}% match
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {personalizedRecommendations.books.map((book) => (
                <div
                  key={book.id}
                  className="flex flex-col gap-2 rounded-xl p-3.5"
                  style={{ backgroundColor: "hsl(0 0% 100% / 0.6)" }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium" style={{ color: "hsl(135 12% 26% / 0.8)" }}>
                        {book.title}
                      </h3>
                      <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.6)" }}>
                        by {book.author}
                      </p>
                    </div>
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{ 
                        backgroundColor: "hsl(105 15% 43% / 0.1)", 
                        color: "hsl(105 15% 43%)" 
                      }}
                    >
                      {book.genre}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                    {book.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {book.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-xs"
                        style={{ 
                          backgroundColor: "hsl(135 12% 26% / 0.1)", 
                          color: "hsl(135 12% 26% / 0.6)" 
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col gap-3 rounded-2xl p-5"
            style={{ backgroundColor: "hsl(260 18% 84% / 0.35)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "hsl(0 0% 100% / 0.6)" }}
              >
                <Music
                  className="h-5 w-5"
                  strokeWidth={1.75}
                  style={{ color: "hsl(135 12% 26% / 0.7)" }}
                />
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold" style={{ color: "hsl(135 12% 26%)" }}>
                  Recommended Music
                </h2>
                <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.5)" }}>
                  Personalized based on your assessment
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" style={{ color: "hsl(105 15% 43%)" }} />
                <span className="text-xs font-medium" style={{ color: "hsl(105 15% 43%)" }}>
                  {Math.round(personalizedRecommendations.confidenceScore)}% match
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {personalizedRecommendations.music.map((music) => (
                <div
                  key={music.id}
                  className="flex items-start justify-between gap-2 rounded-xl p-3.5"
                  style={{ backgroundColor: "hsl(0 0% 100% / 0.6)" }}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium" style={{ color: "hsl(135 12% 26% / 0.8)" }}>
                        {music.title}
                      </h3>
                      <span className="text-xs" style={{ color: "hsl(135 12% 26% / 0.5)" }}>
                        {music.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.6)" }}>
                        by {music.artist}
                      </p>
                      <span 
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: "hsl(105 15% 43% / 0.1)", 
                          color: "hsl(105 15% 43%)" 
                        }}
                      >
                        {music.mood}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {music.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-xs"
                          style={{ 
                            backgroundColor: "hsl(135 12% 26% / 0.1)", 
                            color: "hsl(135 12% 26% / 0.6)" 
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {/* Static Resource Categories */}

      {/* Resource Cards */}
      {resourceCategories.map((category) => {
        const CategoryIcon = category.icon;
        return (
          <motion.div
            key={category.title}
            variants={fadeInUp}
            className="flex flex-col gap-3 rounded-2xl p-5"
            style={{ backgroundColor: category.cardBg }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: "hsl(0 0% 100% / 0.6)" }}
              >
                <CategoryIcon
                  className="h-5 w-5"
                  strokeWidth={1.75}
                  style={{ color: "hsl(135 12% 26% / 0.7)" }}
                />
              </div>
              <div>
                <h2 className="text-sm font-semibold" style={{ color: "hsl(135 12% 26%)" }}>
                  {category.title}
                </h2>
                <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.5)" }}>
                  {category.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start justify-between gap-2 rounded-xl p-3.5"
                  style={{ backgroundColor: "hsl(0 0% 100% / 0.6)" }}
                >
                  <div>
                    <h3 className="text-sm font-medium" style={{ color: "hsl(135 12% 26% / 0.8)" }}>
                      {item.name}
                    </h3>
                    <p className="mt-0.5 text-xs leading-relaxed" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                      {item.detail}
                    </p>
                  </div>
                  {item.link && (
                    <a
                      href={item.link}
                      className="mt-0.5 shrink-0"
                      aria-label={`Contact ${item.name}`}
                    >
                      <ArrowUpRight
                        className="h-4 w-4"
                        strokeWidth={1.75}
                        style={{ color: "hsl(105 15% 43%)" }}
                      />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
