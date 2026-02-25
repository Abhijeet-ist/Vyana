"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  EmotionalState,
  OnboardingSelection,
  AssessmentAnswer,
  StressProfile,
  User,
  PersonalizedRecommendations,
  WeeklyEntry,
  InsightCard,
} from "@/types";

interface AppState {
  /* Emotional context */
  emotionalState: EmotionalState;
  setEmotionalState: (state: EmotionalState) => void;

  /* Onboarding */
  onboardingSelection: OnboardingSelection;
  setOnboardingSelection: (selection: OnboardingSelection) => void;

  /* Assessment */
  assessmentAnswers: AssessmentAnswer[];
  addAnswer: (answer: AssessmentAnswer) => void;
  resetAssessment: () => void;

  /* Stress profile */
  stressProfile: StressProfile | null;
  setStressProfile: (profile: StressProfile) => void;

  /* ML Recommendations */
  personalizedRecommendations: PersonalizedRecommendations | null;
  setPersonalizedRecommendations: (recommendations: PersonalizedRecommendations) => void;

  /* Breathing intro */
  hasSeenBreathingIntro: boolean;
  setHasSeenBreathingIntro: (seen: boolean) => void;

  /* Accessibility */
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;

  /* Crisis modal */
  crisisModalOpen: boolean;
  setCrisisModalOpen: (open: boolean) => void;

  /* Authentication */
  user: User | null;
  isAuthenticated: boolean;
  profileModalOpen: boolean;
  setUser: (user: User | null) => void;
  setProfileModalOpen: (open: boolean) => void;
  logout: () => void;

  /* Weekly Insights History */
  weeklyEntries: WeeklyEntry[];
  saveWeeklyEntry: (entry: { emotionalState: EmotionalState; stressProfile: StressProfile; insights: InsightCard[]; note?: string }) => void;
  deleteWeeklyEntry: (id: string) => void;
  clearWeeklyEntries: () => void;
  loadWeeklyEntries: () => Promise<void>;

  /* Notifications */
  notifications: {
    assessmentReminders: boolean;
    weeklyInsights: boolean;
    emergencyAlerts: boolean;
  };
  toggleNotification: (setting: keyof AppState['notifications']) => void;

  /* Privacy Settings */
  privacySettings: {
    dataCollection: boolean;
    analytics: boolean;
    personalizedContent: boolean;
  };
  togglePrivacySetting: (setting: keyof AppState['privacySettings']) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      emotionalState: "neutral",
      setEmotionalState: (emotionalState) => set({ emotionalState }),

      onboardingSelection: null,
      setOnboardingSelection: (onboardingSelection) => {
        const emotionalMap: Record<string, EmotionalState> = {
          overwhelmed: "stressed",
          lonely: "reflective",
          "burned-out": "stressed",
          "just-checking": "calm",
          anxious: "stressed",
          confused: "reflective",
          hopeful: "calm",
          exhausted: "stressed",
          frustrated: "stressed",
          peaceful: "calm",
        };
        set({
          onboardingSelection,
          emotionalState: onboardingSelection
            ? emotionalMap[onboardingSelection] || "neutral"
            : "neutral",
        });
      },

      assessmentAnswers: [],
      addAnswer: (answer) =>
        set((state) => ({
          assessmentAnswers: [
            ...state.assessmentAnswers.filter(
              (a) => a.questionId !== answer.questionId
            ),
            answer,
          ],
        })),
      resetAssessment: () => set({ assessmentAnswers: [], stressProfile: null, personalizedRecommendations: null }),

      stressProfile: null,
      setStressProfile: (stressProfile) => set({ stressProfile }),

      personalizedRecommendations: null,
      setPersonalizedRecommendations: (personalizedRecommendations) => set({ personalizedRecommendations }),

      hasSeenBreathingIntro: false,
      setHasSeenBreathingIntro: (hasSeenBreathingIntro) =>
        set({ hasSeenBreathingIntro }),

      reducedMotion: false,
      toggleReducedMotion: () =>
        set((state) => ({ reducedMotion: !state.reducedMotion })),

      highContrast: false,
      toggleHighContrast: () =>
        set((state) => ({ highContrast: !state.highContrast })),

      crisisModalOpen: false,
      setCrisisModalOpen: (crisisModalOpen) => set({ crisisModalOpen }),

      user: null,
      isAuthenticated: false,
      profileModalOpen: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setProfileModalOpen: (profileModalOpen) => set({ profileModalOpen }),
      logout: () => {
        // Clear auth state but preserve weeklyEntries in local cache
        // (the real data lives in MongoDB per user)
        set({
          user: null,
          isAuthenticated: false,
          profileModalOpen: false,
          weeklyEntries: [],
          assessmentAnswers: [],
          stressProfile: null,
          personalizedRecommendations: null,
          onboardingSelection: null,
          emotionalState: "neutral",
        });
      },

      weeklyEntries: [],
      saveWeeklyEntry: ({ emotionalState, stressProfile, insights, note }) => {
        const state = get();

        // Respect the weekly insights toggle — if off, don't save
        if (!state.notifications.weeklyInsights) return;

        const newEntry: WeeklyEntry = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          date: new Date().toISOString(),
          emotionalState,
          stressProfile,
          insights,
          note,
        };

        set({ weeklyEntries: [newEntry, ...state.weeklyEntries] });

        // Persist to MongoDB if authenticated
        if (state.user?.id) {
          fetch('/api/weekly-insights', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: state.user.id, entry: newEntry }),
          }).catch((err) => console.error('Failed to sync entry to server:', err));
        }
      },
      deleteWeeklyEntry: (id) => {
        const state = get();
        set({ weeklyEntries: state.weeklyEntries.filter((e) => e.id !== id) });

        // Sync deletion to MongoDB
        if (state.user?.id) {
          fetch(`/api/weekly-insights?userId=${state.user.id}&entryId=${id}`, {
            method: 'DELETE',
          }).catch((err) => console.error('Failed to delete entry on server:', err));
        }
      },
      clearWeeklyEntries: () => {
        const state = get();
        set({ weeklyEntries: [] });

        // Sync clear-all to MongoDB
        if (state.user?.id) {
          fetch(`/api/weekly-insights?userId=${state.user.id}&clearAll=true`, {
            method: 'DELETE',
          }).catch((err) => console.error('Failed to clear entries on server:', err));
        }
      },
      loadWeeklyEntries: async () => {
        const state = get();
        if (!state.user?.id) return;

        try {
          const res = await fetch(`/api/weekly-insights?userId=${state.user.id}`);
          if (res.ok) {
            const data = await res.json();
            set({ weeklyEntries: data.entries || [] });
          }
        } catch (err) {
          console.error('Failed to load weekly entries from server:', err);
        }
      },

      notifications: {
        assessmentReminders: true,
        weeklyInsights: true,
        emergencyAlerts: true,
      },
      toggleNotification: (setting) =>
        set((state) => ({
          notifications: {
            ...state.notifications,
            [setting]: !state.notifications[setting],
          },
        })),

      privacySettings: {
        dataCollection: false,
        analytics: false,
        personalizedContent: false,
      },
      togglePrivacySetting: (setting) =>
        set((state) => ({
          privacySettings: {
            ...state.privacySettings,
            [setting]: !state.privacySettings[setting],
          },
        })),
    }),
    {
      name: 'vyana-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        notifications: state.notifications,
        privacySettings: state.privacySettings,
        hasSeenBreathingIntro: state.hasSeenBreathingIntro,
        reducedMotion: state.reducedMotion,
        highContrast: state.highContrast,
        weeklyEntries: state.weeklyEntries,
      }),
    }
  )
);
