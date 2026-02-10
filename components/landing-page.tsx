"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  EyeOff,
  Heart,
  Sparkles,
  Brain,
  Leaf,
  Wind,
  Sun,
  Moon,
  HeartHandshake,
  Activity,
} from "lucide-react";
import { useAppStore } from "@/store/use-app-store";

/* ——— Motion variants (calm, never aggressive) ——— */
const heroStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  },
};

const featureStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

/* ——— Data ——— */
const features = [
  {
    icon: Brain,
    title: "Mental Check-in",
    description: "Gentle questions to understand where you are emotionally",
    bg: "hsl(var(--sage-card))",
    iconBg: "hsl(var(--seaweed))",
  },
  {
    icon: Wind,
    title: "Breathing Exercises",
    description: "Guided techniques to calm your nervous system",
    bg: "hsl(var(--lavender) / 0.5)",
    iconBg: "hsl(260 25% 65%)",
  },
  {
    icon: Leaf,
    title: "Self-Care Toolkit",
    description: "Grounding exercises and coping strategies",
    bg: "hsl(var(--wheat-card) / 0.5)",
    iconBg: "hsl(53 40% 55%)",
  },
  {
    icon: Sparkles,
    title: "AI Insights",
    description: "Personalized reflections based on your emotional patterns",
    bg: "hsl(var(--pink-card))",
    iconBg: "hsl(var(--melon))",
  },
];

const emotionalMoods = [
  { label: "Calm", color: "hsl(var(--lagoon))" },
  { label: "Reflect", color: "hsl(var(--lavender))" },
  { label: "Focus", color: "hsl(var(--wheat-card))" },
  { label: "Heal", color: "hsl(var(--sage-card))" },
  { label: "Grow", color: "hsl(var(--pink-card))" },
];

const trustBadges = [
  { icon: EyeOff, label: "Anonymous" },
  { icon: Shield, label: "Private" },
  { icon: Activity, label: "No tracking" },
  { icon: HeartHandshake, label: "Support 24/7" },
];

const testimonials = [
  {
    text: "Clarity helped me understand my emotions without judgment. It feels like a safe space.",
    name: "A Student",
    mood: "Calm",
  },
  {
    text: "The breathing exercises genuinely helped me through exam anxiety. So grateful.",
    name: "Anonymous",
    mood: "Relieved",
  },
  {
    text: "I love that it's private. No accounts tracking my mental state for ads.",
    name: "A User",
    mood: "Secure",
  },
];

export function LandingPage() {
  const { setProfileModalOpen } = useAppStore();

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "hsl(var(--bg-neutral))" }}
    >
      {/* ——— Organic background shapes ——— */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--lagoon) / 0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--lavender) / 0.4) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-20 right-[-10%] h-[350px] w-[350px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--wheat-card) / 0.5) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ——— Landing Header ——— */}
      <motion.header
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="sticky top-0 z-50 w-full"
        style={{
          backgroundColor: "hsl(var(--bg-neutral) / 0.85)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="mx-auto flex max-w-[1140px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ backgroundColor: "hsl(var(--seaweed))" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 1L15 8L8 15L1 8L8 1Z"
                  fill="hsl(var(--cream))"
                />
                <path
                  d="M8 5L11 8L8 11L5 8L8 5Z"
                  fill="hsl(var(--sage))"
                />
              </svg>
            </div>
            <span
              className="text-lg font-semibold tracking-tight"
              style={{ color: "hsl(var(--seaweed))" }}
            >
              Clarity
            </span>
          </div>

          <motion.button
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            onClick={() => setProfileModalOpen(true)}
            className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium"
            style={{
              backgroundColor: "hsl(var(--seaweed))",
              color: "hsl(var(--cream))",
            }}
          >
            Get Started
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </motion.button>
        </div>
      </motion.header>

      {/* ——— Hero Section ——— */}
      <section className="relative py-24 md:py-32">
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-[1140px] px-6"
        >
          <div className="mx-auto max-w-2xl text-center">
            <motion.div variants={fadeUp} className="mb-6">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium"
                style={{
                  backgroundColor: "hsl(var(--sage-card) / 0.5)",
                  color: "hsl(var(--seaweed) / 0.7)",
                }}
              >
                <Heart className="h-3 w-3" strokeWidth={1.75} />
                For students, by students
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-balance text-4xl font-semibold leading-[1.15] tracking-tight md:text-5xl lg:text-6xl"
              style={{ color: "hsl(var(--seaweed))" }}
            >
              A quiet space to{" "}
              <span className="italic" style={{ color: "hsl(var(--sage))" }}>
                understand
              </span>{" "}
              how you&apos;re{" "}
              <span className="italic" style={{ color: "hsl(var(--sage))" }}>
                really
              </span>{" "}
              doing
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-lg text-base leading-relaxed md:text-lg"
              style={{ color: "hsl(var(--seaweed) / 0.55)" }}
            >
              Clarity helps you reflect on your emotions, manage stress, and
              build mental resilience — privately, gently, at your own pace.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <motion.button
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                onClick={() => setProfileModalOpen(true)}
                className="flex items-center gap-2.5 rounded-2xl px-8 py-4 text-base font-medium shadow-lg"
                style={{
                  backgroundColor: "hsl(var(--seaweed))",
                  color: "hsl(var(--cream))",
                  boxShadow: "0 8px 30px hsl(var(--seaweed) / 0.2)",
                }}
              >
                Begin your journey
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </motion.button>
              <span
                className="text-sm"
                style={{ color: "hsl(var(--seaweed) / 0.35)" }}
              >
                Free · Private · No tracking
              </span>
            </motion.div>
          </div>

          {/* ——— Floating mood orbs ——— */}
          <motion.div
            variants={fadeUp}
            className="mt-16 flex items-center justify-center gap-3 md:gap-5"
          >
            {emotionalMoods.map((mood, i) => (
              <motion.div
                key={mood.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.6 + i * 0.1,
                  duration: 0.5,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="flex flex-col items-center gap-2"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + i * 0.5,
                    ease: "easeInOut",
                  }}
                  className="h-12 w-12 rounded-full md:h-14 md:w-14"
                  style={{
                    backgroundColor: mood.color,
                    boxShadow: `0 6px 20px ${mood.color.replace(")", " / 0.3)")}`,
                  }}
                />
                <span
                  className="text-[11px] font-medium"
                  style={{ color: "hsl(var(--seaweed) / 0.4)" }}
                >
                  {mood.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ——— Trust Strip ——— */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeIn}
        className="py-8"
      >
        <div className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-center gap-3 px-6">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium"
              style={{
                backgroundColor: "hsl(0 0% 100% / 0.6)",
                color: "hsl(var(--seaweed) / 0.5)",
                border: "1px solid hsl(var(--border) / 0.4)",
              }}
            >
              <badge.icon
                className="h-3.5 w-3.5"
                strokeWidth={1.75}
                style={{ color: "hsl(var(--sage))" }}
              />
              {badge.label}
            </div>
          ))}
        </div>
      </motion.section>

      {/* ——— Features Section ——— */}
      <section className="py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={featureStagger}
          className="mx-auto max-w-[1140px] px-6"
        >
          <motion.div variants={fadeUp} className="mx-auto mb-16 max-w-lg text-center">
            <span
              className="mb-3 inline-block text-xs font-medium uppercase tracking-widest"
              style={{ color: "hsl(var(--sage))" }}
            >
              What Clarity offers
            </span>
            <h2
              className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
              style={{ color: "hsl(var(--seaweed))" }}
            >
              Tools that meet you{" "}
              <span className="italic">where you are</span>
            </h2>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={scaleIn}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
                }}
                className="group flex flex-col gap-4 rounded-3xl p-7"
                style={{
                  backgroundColor: feature.bg,
                  border: "1px solid hsl(0 0% 100% / 0.5)",
                }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{ backgroundColor: feature.iconBg }}
                >
                  <feature.icon
                    className="h-5 w-5"
                    strokeWidth={1.75}
                    style={{ color: "hsl(0 0% 100% / 0.9)" }}
                  />
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: "hsl(var(--seaweed))" }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="mt-1.5 text-sm leading-relaxed"
                    style={{ color: "hsl(var(--seaweed) / 0.55)" }}
                  >
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ——— How it Works ——— */}
      <section className="py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={featureStagger}
          className="mx-auto max-w-[1140px] px-6"
        >
          <motion.div variants={fadeUp} className="mx-auto mb-16 max-w-lg text-center">
            <span
              className="mb-3 inline-block text-xs font-medium uppercase tracking-widest"
              style={{ color: "hsl(var(--sage))" }}
            >
              How it works
            </span>
            <h2
              className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
              style={{ color: "hsl(var(--seaweed))" }}
            >
              Three gentle steps to{" "}
              <span className="italic">self-awareness</span>
            </h2>
          </motion.div>

          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: Sun,
                title: "Check In",
                description:
                  "Answer a few soft questions about how you are feeling right now",
              },
              {
                step: "02",
                icon: Sparkles,
                title: "Reflect",
                description:
                  "See personalized insights about your emotional patterns",
              },
              {
                step: "03",
                icon: Moon,
                title: "Practice",
                description:
                  "Use guided breathing, grounding tools, and curated resources",
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={fadeUp}
                className="flex flex-col items-center gap-4 rounded-3xl p-7 text-center"
                style={{
                  backgroundColor: "hsl(0 0% 100% / 0.5)",
                  border: "1px solid hsl(var(--border) / 0.3)",
                }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "hsl(var(--seaweed) / 0.07)",
                  }}
                >
                  <item.icon
                    className="h-6 w-6"
                    strokeWidth={1.75}
                    style={{ color: "hsl(var(--seaweed) / 0.6)" }}
                  />
                </div>
                <span
                  className="text-xs font-medium"
                  style={{ color: "hsl(var(--sage))" }}
                >
                  Step {item.step}
                </span>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "hsl(var(--seaweed))" }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "hsl(var(--seaweed) / 0.5)" }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ——— Testimonials ——— */}
      <section className="py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={featureStagger}
          className="mx-auto max-w-[1140px] px-6"
        >
          <motion.div variants={fadeUp} className="mx-auto mb-16 max-w-lg text-center">
            <span
              className="mb-3 inline-block text-xs font-medium uppercase tracking-widest"
              style={{ color: "hsl(var(--sage))" }}
            >
              From the community
            </span>
            <h2
              className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
              style={{ color: "hsl(var(--seaweed))" }}
            >
              Shared with{" "}
              <span className="italic">kindness</span>
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="flex flex-col gap-5 rounded-3xl p-7"
                style={{
                  backgroundColor: "hsl(0 0% 100% / 0.55)",
                  border: "1px solid hsl(var(--border) / 0.3)",
                }}
              >
                <p
                  className="flex-1 text-sm leading-relaxed"
                  style={{ color: "hsl(var(--seaweed) / 0.65)" }}
                >
                  &ldquo;{item.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-medium"
                    style={{ color: "hsl(var(--seaweed) / 0.4)" }}
                  >
                    — {item.name}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-medium"
                    style={{
                      backgroundColor: "hsl(var(--sage-card) / 0.4)",
                      color: "hsl(var(--seaweed) / 0.5)",
                    }}
                  >
                    {item.mood}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ——— CTA Section ——— */}
      <section className="py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={heroStagger}
          className="mx-auto max-w-[1140px] px-6"
        >
          <motion.div
            variants={scaleIn}
            className="relative mx-auto max-w-2xl overflow-hidden rounded-[28px] px-8 py-16 text-center md:px-16"
            style={{
              backgroundColor: "hsl(var(--seaweed))",
            }}
          >
            {/* Decorative gradient overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, hsl(var(--sage) / 0.4) 0%, transparent 60%), radial-gradient(circle at 80% 80%, hsl(var(--lagoon) / 0.3) 0%, transparent 50%)",
              }}
            />

            <div className="relative z-10">
              <motion.h2
                variants={fadeUp}
                className="text-balance text-3xl font-semibold leading-tight tracking-tight md:text-4xl"
                style={{ color: "hsl(var(--cream))" }}
              >
                Your mental wellness{" "}
                <span className="italic" style={{ color: "hsl(var(--sage-card))" }}>
                  matters
                </span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-4 max-w-md text-sm leading-relaxed md:text-base"
                style={{ color: "hsl(var(--cream) / 0.6)" }}
              >
                Start with a single check-in. No pressure, no judgment — just a
                quiet moment for yourself.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-8">
                <motion.button
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                  onClick={() => setProfileModalOpen(true)}
                  className="inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-base font-medium"
                  style={{
                    backgroundColor: "hsl(var(--cream))",
                    color: "hsl(var(--seaweed))",
                    boxShadow: "0 8px 30px hsl(0 0% 0% / 0.15)",
                  }}
                >
                  Start for free
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ——— Footer ——— */}
      <footer className="py-12">
        <div className="mx-auto max-w-[1140px] px-6">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-2">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ backgroundColor: "hsl(var(--seaweed))" }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M8 1L15 8L8 15L1 8L8 1Z"
                    fill="hsl(var(--cream))"
                  />
                  <path
                    d="M8 5L11 8L8 11L5 8L8 5Z"
                    fill="hsl(var(--sage))"
                  />
                </svg>
              </div>
              <span
                className="text-sm font-semibold tracking-tight"
                style={{ color: "hsl(var(--seaweed))" }}
              >
                Clarity
              </span>
            </div>
            <p
              className="max-w-sm text-xs leading-relaxed"
              style={{ color: "hsl(var(--seaweed) / 0.35)" }}
            >
              This platform does not replace professional mental health support.
              If you or someone you know is in crisis, please reach out to a
              trained professional.
            </p>
            <div
              className="h-px w-16"
              style={{ backgroundColor: "hsl(var(--border) / 0.3)" }}
            />
            <p
              className="text-[11px]"
              style={{ color: "hsl(var(--seaweed) / 0.25)" }}
            >
              © {new Date().getFullYear()} Clarity. Built with care.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
