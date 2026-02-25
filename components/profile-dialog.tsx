"use client";

import { signInWithPopup, signOut } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import { Chrome, Github, LogOut, Settings, User, Mail } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { auth, githubProvider, googleProvider } from "@/lib/firebase";
import { useAppStore } from "@/store/use-app-store";

// Motion variants following the design system
const containerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1], // ease-out
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.3,
      ease: [0.25, 1, 0.5, 1]
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1]
    }
  }
};

const buttonHoverVariants = {
  hover: {
    y: -2,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: [0.25, 1, 0.5, 1]
    }
  },
  tap: {
    y: 0,
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  }
};

export function ProfileDialog() {
  const { profileModalOpen, setProfileModalOpen, user, isAuthenticated, setUser, logout, loadWeeklyEntries } = useAppStore();
  const [loadingProvider, setLoadingProvider] = useState<"google" | "github" | null>(null);
  const router = useRouter();

  const handleProviderLogin = async (provider: "google" | "github") => {
    setLoadingProvider(provider);

    try {
      const selectedProvider = provider === "google" ? googleProvider : githubProvider;
      const result = await signInWithPopup(auth, selectedProvider);
      const firebaseUser = result.user;

      const nextUser = {
        id: firebaseUser.uid,
        name:
          firebaseUser.displayName ||
          firebaseUser.email?.split("@")[0] ||
          "Explorer",
        email: firebaseUser.email || "",
        avatar: firebaseUser.photoURL || undefined,
      };

      setUser(nextUser);
      // Load persisted weekly entries from server
      await loadWeeklyEntries();
      setProfileModalOpen(false);
    } catch (error) {
      console.error("Social login error:", error);
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
      setProfileModalOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      logout();
      setProfileModalOpen(false);
      router.push('/');
    }
  };

  const handleAccountSettings = () => {
    setProfileModalOpen(false);
    router.push('/account-settings');
  };

  return (
    <Dialog open={profileModalOpen} onOpenChange={setProfileModalOpen}>
      <DialogContent
        className="max-w-md p-0 overflow-hidden border-0"
        style={{
          borderRadius: '24px',
          background: `
            linear-gradient(135deg,
              hsl(var(--bg-calm) / 0.95) 0%,
              hsl(var(--bg-neutral) / 0.98) 100%
            )
          `,
          backdropFilter: 'blur(20px)',
          boxShadow: `
            0 20px 40px hsl(var(--seaweed) / 0.08),
            0 8px 16px hsl(var(--seaweed) / 0.04),
            inset 0 1px 0 hsl(255 255% 255% / 0.2)
          `
        }}
      >
        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            <motion.div
              key="auth"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="p-8 space-y-8"
            >
              <motion.div variants={itemVariants} className="text-center space-y-2">
                <div
                  className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                  style={{
                    background: `
                      linear-gradient(135deg,
                        hsl(var(--seaweed) / 0.9) 0%,
                        hsl(var(--sage) / 0.8) 100%
                      )
                    `,
                    boxShadow: 'inset 0 2px 8px hsl(var(--seaweed) / 0.2)'
                  }}
                >
                  <User
                    className="w-7 h-7"
                    strokeWidth={1.75}
                    style={{ color: 'hsl(var(--wheat))' }}
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-3">
                <motion.button
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonHoverVariants}
                  onClick={() => handleProviderLogin("google")}
                  disabled={loadingProvider === "google"}
                  className="w-full p-4 rounded-2xl flex items-center gap-4 justify-center text-sm font-medium border-0 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, white 0%, hsl(var(--wheat) / 0.9) 100%)',
                    color: 'hsl(var(--seaweed))',
                    boxShadow: '0 8px 16px hsl(var(--seaweed) / 0.12)'
                  }}
                >
                  <Chrome className="w-5 h-5" strokeWidth={1.75} />
                  {loadingProvider === "google" ? "Connecting..." : "Continue with Google"}
                </motion.button>

                <motion.button
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonHoverVariants}
                  onClick={() => handleProviderLogin("github")}
                  disabled={loadingProvider === "github"}
                  className="w-full p-4 rounded-2xl flex items-center gap-4 justify-center text-sm font-medium border-0 transition-all duration-300"
                  style={{
                    background: 'hsl(255 255% 255% / 0.7)',
                    border: '1px solid hsl(var(--seaweed) / 0.15)',
                    backdropFilter: 'blur(8px)',
                    color: 'hsl(var(--seaweed))'
                  }}
                >
                  <Github className="w-5 h-5" strokeWidth={1.75} />
                  {loadingProvider === "github" ? "Connecting..." : "Continue with GitHub"}
                </motion.button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-4">
                  <div
                    className="flex-1 h-px"
                    style={{ backgroundColor: 'hsl(var(--seaweed) / 0.1)' }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: 'hsl(var(--seaweed) / 0.35)' }}
                  >
                    or
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{ backgroundColor: 'hsl(var(--seaweed) / 0.1)' }}
                  />
                </div>

                {/* Email/Password Login Link */}
                <Link href="/auth" onClick={() => setProfileModalOpen(false)}>
                  <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonHoverVariants}
                    className="w-full p-4 rounded-2xl flex items-center gap-4 justify-center text-sm font-medium border-0 transition-all duration-300 cursor-pointer"
                    style={{
                      background: 'hsl(var(--sage-card) / 0.4)',
                      border: '1px solid hsl(var(--sage) / 0.2)',
                      color: 'hsl(var(--seaweed))'
                    }}
                  >
                    <Mail className="w-5 h-5" strokeWidth={1.75} />
                    Sign in with Email
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="profile"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="p-8"
            >
              {/* Profile header with organic shape */}
              <motion.div variants={itemVariants} className="text-center mb-8">
                <div
                  className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-lg font-medium"
                  style={{
                    background: `
                      linear-gradient(135deg,
                        hsl(var(--seaweed)) 0%,
                        hsl(var(--sage)) 100%
                      )
                    `,
                    color: 'hsl(var(--wheat))',
                    boxShadow: `
                      0 8px 16px hsl(var(--seaweed) / 0.2),
                      inset 0 2px 8px hsl(var(--seaweed) / 0.2)
                    `
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </div>

                <h2
                  className="text-xl font-medium tracking-wide leading-relaxed"
                  style={{
                    color: 'hsl(var(--seaweed))',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    letterSpacing: '0.01em'
                  }}
                >
                  {user?.name}
                </h2>
                <p
                  className="text-sm mt-1 leading-relaxed"
                  style={{ color: 'hsl(var(--seaweed) / 0.7)' }}
                >
                  {user?.email}
                </p>
              </motion.div>

              {/* Profile actions with floating cards */}
              <motion.div variants={itemVariants} className="space-y-3">
                <motion.button
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonHoverVariants}
                  onClick={handleAccountSettings}
                  className="w-full p-4 rounded-2xl flex items-center gap-4 text-left border-0 transition-all duration-300"
                  style={{
                    background: 'hsl(255 255% 255% / 0.7)',
                    border: '1px solid hsl(var(--warm-beige) / 0.4)',
                    backdropFilter: 'blur(8px)',
                    color: 'hsl(var(--seaweed))'
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'hsl(var(--sage) / 0.2)' }}
                  >
                    <Settings className="w-5 h-5" strokeWidth={1.75} style={{ color: 'hsl(var(--sage))' }} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Account Settings</p>
                    <p className="text-xs opacity-70">Manage your preferences</p>
                  </div>
                </motion.button>

                {/* Subtle divider */}
                <div
                  className="h-px my-4"
                  style={{
                    background: `
                      linear-gradient(90deg,
                        transparent 0%,
                        hsl(var(--warm-beige) / 0.3) 50%,
                        transparent 100%
                      )
                    `
                  }}
                />

                <motion.button
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonHoverVariants}
                  onClick={handleLogout}
                  className="w-full p-4 rounded-2xl flex items-center gap-4 text-left border-0 transition-all duration-300"
                  style={{
                    background: 'hsl(255 255% 255% / 0.7)',
                    border: '1px solid hsl(var(--melon) / 0.3)',
                    backdropFilter: 'blur(8px)',
                    color: 'hsl(var(--melon))'
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'hsl(var(--melon) / 0.2)' }}
                  >
                    <LogOut className="w-5 h-5" strokeWidth={1.75} style={{ color: 'hsl(var(--melon))' }} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Sign Out</p>
                    <p className="text-xs opacity-70">We'll miss you</p>
                  </div>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
