export type EmotionalState = "calm" | "stressed" | "reflective" | "crisis" | "neutral";

export type OnboardingSelection =
  | "overwhelmed"
  | "lonely"
  | "burned-out"
  | "just-checking"
  | "anxious"
  | "confused"
  | "hopeful"
  | "exhausted"
  | "frustrated"
  | "peaceful"
  | null;

export interface AssessmentQuestion {
  id: string;
  text: string;
  category: "cognitive" | "stress" | "behavior";
}

export interface AssessmentAnswer {
  questionId: string;
  score: number; // 1-5
}

export interface InsightFragment {
  id: string;
  category: "cognitive" | "stress" | "behavior";
  text: string;
  minScore: number;
  maxScore: number;
}

export interface InsightCard {
  category: "cognitive" | "stress" | "behavior";
  text: string;
}

export interface StressProfile {
  cognitive: number;
  stress: number;
  behavior: number;
  overall: number;
}

export interface CrisisResource {
  name: string;
  description: string;
  contact: string;
  type: "hotline" | "campus" | "breathing" | "grounding";
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface BookRecommendation {
  id: string;
  title: string;
  author: string;
  genre: string;
  tags: string[];
  description: string;
  emotionalProfile: {
    stress: number;
    cognitive: number;
    behavior: number;
  };
  targetMoods: string[];
}

export interface MusicRecommendation {
  id: string;
  title: string;
  artist: string;
  genre: string;
  mood: string;
  tags: string[];
  duration: string;
  emotionalProfile: {
    stress: number;
    cognitive: number;
    behavior: number;
  };
  energyLevel: number; // 1-5
  valence: number; // 1-5 (positive/negative)
}

export interface PersonalizedRecommendations {
  books: BookRecommendation[];
  music: MusicRecommendation[];
  confidenceScore: number;
}
