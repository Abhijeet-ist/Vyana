"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, User } from "lucide-react";
import { fadeIn } from "@/lib/motion";
import { useAppStore } from "@/store/use-app-store";
import { ProfileDialog } from "@/components/profile-dialog";

export function Header() {
  const { setProfileModalOpen, isAuthenticated, user } = useAppStore();
  return (
    <motion.header
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-40 w-full"
      style={{
        backgroundColor: "hsl(36 33% 93% / 0.85)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          {/* Diamond logo like reference */}
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ backgroundColor: "hsl(135 12% 26%)" }}
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
                fill="hsl(36 33% 93%)"
              />
              <path
                d="M8 5L11 8L8 11L5 8L8 5Z"
                fill="hsl(105 15% 43%)"
              />
            </svg>
          </div>
          <span
            className="text-lg font-semibold tracking-tight"
            style={{ color: "hsl(135 12% 26%)" }}
          >
            Clarity
          </span>
        </Link>

        {/* Soft circular profile button */}
        <motion.button
          whileHover={{ 
            y: -2, 
            scale: 1.05,
            transition: { duration: 0.2, ease: [0.25, 1, 0.5, 1] }
          }}
          whileTap={{ 
            y: 0, 
            scale: 0.95,
            transition: { duration: 0.1 }
          }}
          onClick={() => setProfileModalOpen(true)}
          className="relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 group"
          style={{ 
            background: isAuthenticated && user?.name
              ? `linear-gradient(135deg, 
                  hsl(var(--seaweed)) 0%, 
                  hsl(var(--sage)) 100%
                )`
              : `linear-gradient(135deg, 
                  hsl(var(--warm-beige) / 0.8) 0%, 
                  hsl(var(--warm-beige) / 0.6) 100%
                )`,
            boxShadow: `
              0 4px 12px hsl(var(--seaweed) / 0.15),
              inset 0 1px 0 hsl(255 255% 255% / 0.2)
            `,
            backdropFilter: 'blur(8px)',
            focusRingColor: 'hsl(var(--sage))',
            focusRingOffsetColor: 'hsl(var(--wheat))'
          }}
          aria-label={isAuthenticated ? `Profile menu for ${user?.name}` : "Sign in to your account"}
        >
          <AnimatePresence mode="wait">
            {isAuthenticated && user?.name ? (
              <motion.div
                key="avatar"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="h-full w-full overflow-hidden rounded-full"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span
                    className="flex h-full w-full items-center justify-center text-sm font-medium tracking-wide"
                    style={{ color: 'hsl(var(--wheat))' }}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="user-icon"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              >
                <User
                  className="h-5 w-5 transition-transform duration-200 group-hover:scale-110"
                  strokeWidth={1.75}
                  style={{ color: 'hsl(var(--seaweed) / 0.8)' }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Subtle glow effect on hover */}
          <div 
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, 
                  hsl(var(--sage) / 0.3) 0%, 
                  transparent 70%
                )
              `
            }}
          />
        </motion.button>
      </div>
      
      <ProfileDialog />
    </motion.header>
  );
}
