"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Music,
  Clock,
  Sparkles,
  Heart,
  User,
  Play,
} from "lucide-react";
import { Suspense } from "react";
import { bookDataset, musicDataset } from "@/lib/datasets";

/* ——— Motion variants (calm, never aggressive) ——— */
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  },
};

/* ——— Mood → data mapping ——— */
interface MoodConfig {
  label: string;
  tagline: string;
  description: string;
  color: string;
  bgGradient: string;
  iconBg: string;
  accentBg: string;
  mouthPath: string;
  bookMoods: string[];
  musicMoods: string[];
  musicEnergyRange: number[];
  musicValenceRange: number[];
}

const moodConfigs: Record<string, MoodConfig> = {
  happy: {
    label: "Happy",
    mouthPath: "M8 14c1 2 7 2 8 0",
    tagline: "Joyful picks",
    description: "Uplifting reads and feel-good melodies to match your radiant mood",
    color: "hsl(53 55% 55%)",
    bgGradient: "linear-gradient(135deg, hsl(53 55% 92%) 0%, hsl(36 33% 93%) 100%)",
    iconBg: "hsl(53 55% 77%)",
    accentBg: "hsl(53 55% 77% / 0.35)",
    bookMoods: ["hopeful", "just-checking", "peaceful"],
    musicMoods: ["uplifting", "empowering", "peaceful"],
    musicEnergyRange: [3, 4, 5],
    musicValenceRange: [4, 5],
  },
  calm: {
    label: "Calm",
    mouthPath: "M9 14h6",
    tagline: "Peaceful selections",
    description: "Serene stories and soothing sounds to deepen your tranquility",
    color: "hsl(108 22% 60%)",
    bgGradient: "linear-gradient(135deg, hsl(108 22% 92%) 0%, hsl(36 33% 93%) 100%)",
    iconBg: "hsl(108 22% 80%)",
    accentBg: "hsl(108 22% 80% / 0.35)",
    bookMoods: ["peaceful", "hopeful", "just-checking"],
    musicMoods: ["calming", "serene", "meditative", "peaceful"],
    musicEnergyRange: [1, 2],
    musicValenceRange: [3, 4, 5],
  },
  relax: {
    label: "Relax",
    mouthPath: "M8 13c1 1.5 7 1.5 8 0",
    tagline: "Gentle unwind",
    description: "Soft narratives and ambient melodies to help your mind rest",
    color: "hsl(260 25% 72%)",
    bgGradient: "linear-gradient(135deg, hsl(260 18% 92%) 0%, hsl(36 33% 93%) 100%)",
    iconBg: "hsl(260 18% 84%)",
    accentBg: "hsl(260 18% 84% / 0.35)",
    bookMoods: ["peaceful", "hopeful", "lonely"],
    musicMoods: ["calming", "meditative", "contemplative", "serene"],
    musicEnergyRange: [1, 2],
    musicValenceRange: [3, 4],
  },
  focus: {
    label: "Focus",
    mouthPath: "M9 14c0.5 0.5 5.5 0.5 6 0",
    tagline: "Sharpened mind",
    description: "Thought-provoking reads and clarity-boosting instrumentals",
    color: "hsl(15 27% 72%)",
    bgGradient: "linear-gradient(135deg, hsl(15 27% 93%) 0%, hsl(36 33% 93%) 100%)",
    iconBg: "hsl(15 27% 86%)",
    accentBg: "hsl(15 27% 86% / 0.35)",
    bookMoods: ["just-checking", "confused", "burned-out"],
    musicMoods: ["contemplative", "reflective", "meditative"],
    musicEnergyRange: [1, 2, 3],
    musicValenceRange: [3, 4],
  },
};

function getRecommendations(mood: string) {
  const config = moodConfigs[mood] || moodConfigs.calm;

  // Pick 3 books: prefer those whose targetMoods overlap with config.bookMoods
  const scoredBooks = bookDataset.map((book) => {
    const overlap = book.targetMoods.filter((m) =>
      config.bookMoods.includes(m)
    ).length;
    return { ...book, score: overlap };
  });
  scoredBooks.sort((a, b) => b.score - a.score);
  const books = scoredBooks.slice(0, 3);

  // Pick 3 songs: prefer those whose mood matches and energy/valence in range
  const scoredMusic = musicDataset.map((track) => {
    let score = 0;
    if (config.musicMoods.includes(track.mood)) score += 3;
    if (config.musicEnergyRange.includes(track.energyLevel)) score += 1;
    if (config.musicValenceRange.includes(track.valence)) score += 1;
    return { ...track, score };
  });
  scoredMusic.sort((a, b) => b.score - a.score);
  const music = scoredMusic.slice(0, 3);

  return { books, music, config };
}

function MoodRecommendationsContent() {
  const searchParams = useSearchParams();
  const mood = (searchParams.get("mood") || "calm").toLowerCase();
  const { books, music, config } = getRecommendations(mood);

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8"
    >
      {/* ——— Back + header ——— */}
      <motion.div variants={fadeUp} className="flex items-center gap-3 pt-2">
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105"
          style={{
            backgroundColor: "hsl(0 0% 100% / 0.6)",
            border: "1px solid hsl(var(--border) / 0.4)",
          }}
        >
          <ArrowLeft
            className="h-4 w-4"
            strokeWidth={1.75}
            style={{ color: "hsl(var(--seaweed))" }}
          />
        </Link>
        <div>
          <p
            className="text-xs font-medium"
            style={{ color: "hsl(var(--seaweed) / 0.4)" }}
          >
            Mood recommendations
          </p>
        </div>
      </motion.div>

      {/* ——— Hero mood card ——— */}
      <motion.div
        variants={scaleIn}
        className="relative overflow-hidden rounded-[24px] p-7"
        style={{
          background: config.bgGradient,
          border: "1px solid hsl(0 0% 100% / 0.6)",
        }}
      >
        {/* Organic shape decorations */}
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-2xl"
          style={{ backgroundColor: config.color }}
        />
        <div
          className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full opacity-25 blur-2xl"
          style={{ backgroundColor: config.iconBg }}
        />

        <div className="relative z-10 flex items-start gap-4">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full"
            style={{
              backgroundColor: config.iconBg,
              boxShadow: `0 6px 20px ${config.color.replace(")", " / 0.25)")}`,
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" stroke="hsl(135 12% 26% / 0.3)" strokeWidth="1.5" fill="none" />
              <circle cx="9" cy="10" r="1" fill="hsl(135 12% 26% / 0.5)" />
              <circle cx="15" cy="10" r="1" fill="hsl(135 12% 26% / 0.5)" />
              <path d={config.mouthPath} stroke="hsl(135 12% 26% / 0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </motion.div>
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex items-center gap-2">
              <h1
                className="text-2xl font-semibold tracking-tight"
                style={{ color: "hsl(var(--seaweed))" }}
              >
                {config.label}
              </h1>
              <span
                className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                style={{
                  backgroundColor: config.accentBg,
                  color: "hsl(var(--seaweed) / 0.6)",
                }}
              >
                {config.tagline}
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "hsl(var(--seaweed) / 0.5)" }}
            >
              {config.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ——— Books section ——— */}
      <motion.section variants={fadeUp} className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: config.iconBg }}
          >
            <BookOpen
              className="h-4 w-4"
              strokeWidth={1.75}
              style={{ color: "hsl(0 0% 100% / 0.85)" }}
            />
          </div>
          <h2
            className="text-lg font-semibold tracking-tight"
            style={{ color: "hsl(var(--seaweed))" }}
          >
            Recommended reads
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {books.map((book, i) => (
            <motion.div
              key={book.id}
              variants={scaleIn}
              whileHover={{
                y: -3,
                transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
              }}
              className="group flex gap-4 rounded-[20px] p-5"
              style={{
                backgroundColor: "hsl(0 0% 100% / 0.55)",
                border: "1px solid hsl(var(--border) / 0.3)",
              }}
            >
              {/* Book number badge */}
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-semibold"
                style={{
                  backgroundColor: config.accentBg,
                  color: "hsl(var(--seaweed) / 0.6)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                <h3
                  className="text-[15px] font-semibold leading-snug"
                  style={{ color: "hsl(var(--seaweed))" }}
                >
                  {book.title}
                </h3>
                <div className="flex items-center gap-1.5">
                  <User
                    className="h-3 w-3"
                    strokeWidth={1.75}
                    style={{ color: "hsl(var(--seaweed) / 0.35)" }}
                  />
                  <span
                    className="text-xs"
                    style={{ color: "hsl(var(--seaweed) / 0.45)" }}
                  >
                    {book.author}
                  </span>
                </div>
                <p
                  className="mt-0.5 text-xs leading-relaxed"
                  style={{ color: "hsl(var(--seaweed) / 0.4)" }}
                >
                  {book.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {book.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor: config.accentBg,
                        color: "hsl(var(--seaweed) / 0.5)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ——— Music section ——— */}
      <motion.section variants={fadeUp} className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor: "hsl(var(--seaweed))" }}
          >
            <Music
              className="h-4 w-4"
              strokeWidth={1.75}
              style={{ color: "hsl(0 0% 100% / 0.85)" }}
            />
          </div>
          <h2
            className="text-lg font-semibold tracking-tight"
            style={{ color: "hsl(var(--seaweed))" }}
          >
            Soothing sounds
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {music.map((track) => (
            <motion.div
              key={track.id}
              variants={scaleIn}
              whileHover={{
                y: -3,
                transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
              }}
              className="group flex items-center gap-4 rounded-[20px] p-5"
              style={{
                backgroundColor: "hsl(0 0% 100% / 0.55)",
                border: "1px solid hsl(var(--border) / 0.3)",
              }}
            >
              {/* Play icon */}
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105"
                style={{
                  backgroundColor: config.iconBg,
                  boxShadow: `0 4px 14px ${config.color.replace(")", " / 0.2)")}`,
                }}
              >
                <Play
                  className="h-5 w-5 translate-x-[1px]"
                  strokeWidth={1.75}
                  style={{ color: "hsl(0 0% 100% / 0.85)" }}
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <h3
                  className="text-[15px] font-semibold leading-snug"
                  style={{ color: "hsl(var(--seaweed))" }}
                >
                  {track.title}
                </h3>
                <span
                  className="text-xs"
                  style={{ color: "hsl(var(--seaweed) / 0.45)" }}
                >
                  {track.artist}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <div className="flex items-center gap-1">
                  <Clock
                    className="h-3 w-3"
                    strokeWidth={1.75}
                    style={{ color: "hsl(var(--seaweed) / 0.3)" }}
                  />
                  <span
                    className="text-[11px]"
                    style={{ color: "hsl(var(--seaweed) / 0.35)" }}
                  >
                    {track.duration}
                  </span>
                </div>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-medium capitalize"
                  style={{
                    backgroundColor: config.accentBg,
                    color: "hsl(var(--seaweed) / 0.5)",
                  }}
                >
                  {track.mood}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ——— Bottom CTA ——— */}
      <motion.div variants={fadeUp} className="pb-4">
        <div
          className="flex flex-col items-center gap-3 rounded-[24px] p-7 text-center"
          style={{
            backgroundColor: "hsl(var(--seaweed) / 0.04)",
            border: "1px solid hsl(var(--border) / 0.25)",
          }}
        >
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: "hsl(var(--seaweed) / 0.07)" }}
          >
            <Sparkles
              className="h-5 w-5"
              strokeWidth={1.75}
              style={{ color: "hsl(var(--seaweed) / 0.4)" }}
            />
          </div>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "hsl(var(--seaweed) / 0.45)" }}
          >
            Want more personalized recommendations?
          </p>
          <Link
            href="/assessment"
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform duration-200 hover:scale-[1.02]"
            style={{
              backgroundColor: "hsl(var(--seaweed))",
              color: "hsl(var(--cream))",
            }}
          >
            <Heart className="h-3.5 w-3.5" strokeWidth={1.75} />
            Take mental check-in
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MoodRecommendationsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-sm"
            style={{ color: "hsl(var(--seaweed) / 0.4)" }}
          >
            Loading recommendations...
          </motion.div>
        </div>
      }
    >
      <MoodRecommendationsContent />
    </Suspense>
  );
}
