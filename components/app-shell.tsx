"use client";

import type { ReactNode } from "react";
import { useAppStore } from "@/store/use-app-store";
import { BreathingIntro } from "@/components/breathing-intro";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";
import { CrisisFAB } from "@/components/crisis-fab";
import { CrisisModal } from "@/components/crisis-modal";
import { ProfileDialog } from "@/components/profile-dialog";

export function AppShell({ children }: { children: ReactNode }) {
  const highContrast = useAppStore((s) => s.highContrast);
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);

  /* ——— Unauthenticated: render children directly (landing page handles its own layout) ——— */
  if (!isAuthenticated) {
    return (
      <>
        {children}
        <ProfileDialog />
        <CrisisModal />
      </>
    );
  }

  /* ——— Authenticated: full app shell ——— */
  return (
    <div
      className={`min-h-screen ${highContrast ? "contrast-125" : ""}`}
      style={{ backgroundColor: "hsl(36 33% 93%)" }}
    >
      <BreathingIntro />
      <Header />
      <main className="mx-auto w-full max-w-content px-5 pb-24 pt-4">
        {children}
      </main>
      <CrisisFAB />
      <CrisisModal />
      <BottomNav />
    </div>
  );
}
