'use client';

import type { Variants, Transition } from "framer-motion";

/* ——— Global timing ——— */
export const calmTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1],
};

export const softSpring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 1,
};

/* ——— Fade in from below ——— */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ——— Fade in ——— */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ——— Stagger container ——— */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/* ——— Card hover (safe, non-aggressive) ——— */
export const cardHover = {
  rest: {
    y: 0,
    boxShadow: "0 2px 8px rgba(31,61,58,0.06)",
    transition: calmTransition,
  },
  hover: {
    y: -4,
    boxShadow: "0 8px 24px rgba(31,61,58,0.1)",
    transition: calmTransition,
  },
};

/* ——— Slide transitions for assessment ——— */
export const slideLeft: Variants = {
  enter: { x: 80, opacity: 0 },
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    x: -80,
    opacity: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ——— Breathing animation ——— */
export const breathingCircle: Variants = {
  inhale: {
    scale: 1.3,
    opacity: 0.7,
    transition: { duration: 4, ease: "easeInOut" },
  },
  exhale: {
    scale: 1,
    opacity: 0.4,
    transition: { duration: 4, ease: "easeInOut" },
  },
};
