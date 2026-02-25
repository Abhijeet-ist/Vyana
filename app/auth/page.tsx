"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Chrome,
  Github,
  Sparkles,
  Heart,
  AlertCircle,
  Check,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInWithPopup } from "firebase/auth";
import Link from "next/link";

import { auth, googleProvider, githubProvider } from "@/lib/firebase";
import { useAppStore } from "@/store/use-app-store";

/* ——— Validation Schemas ——— */
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

/* ——— Motion Variants ——— */
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
  },
};

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
  },
};

const buttonHover = {
  hover: {
    y: -2,
    scale: 1.02,
    transition: { duration: 0.2, ease: [0.25, 1, 0.5, 1] },
  },
  tap: {
    y: 0,
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

const floatingOrb = {
  animate: {
    y: [0, -8, 0],
    transition: {
      repeat: Infinity,
      duration: 4,
      ease: "easeInOut",
    },
  },
};

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();
  const { setUser, loadWeeklyEntries } = useAppStore();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Login failed");
      }

      setUser({
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        avatar: result.user.avatar,
      });

      // Load persisted weekly entries from server
      await loadWeeklyEntries();

      setSuccess("Welcome back! Redirecting...");
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Signup failed");
      }

      setSuccess("Account created! You can now sign in.");
      setTimeout(() => {
        setMode("login");
        setSuccess(null);
        loginForm.setValue("email", data.email);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    setSocialLoading(provider);
    setError(null);

    try {
      const selectedProvider = provider === "google" ? googleProvider : githubProvider;
      const result = await signInWithPopup(auth, selectedProvider);
      const firebaseUser = result.user;

      setUser({
        id: firebaseUser.uid,
        name: firebaseUser.displayName || firebaseUser.email?.split("@")[0] || "Explorer",
        email: firebaseUser.email || "",
        avatar: firebaseUser.photoURL || undefined,
      });

      // Load persisted weekly entries from server
      await loadWeeklyEntries();

      setSuccess("Welcome! Redirecting...");
      setTimeout(() => router.push("/"), 1500);
    } catch (err) {
      setError("Social login failed. Please try again.");
      console.error("Social login error:", err);
    } finally {
      setSocialLoading(null);
    }
  };

  const switchMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError(null);
    setSuccess(null);
    loginForm.reset();
    signupForm.reset();
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen overflow-hidden relative"
      style={{ backgroundColor: "hsl(var(--bg-neutral))" }}
    >
      {/* ——— Organic Background Shapes ——— */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          variants={floatingOrb}
          animate="animate"
          className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--lagoon) / 0.4) 0%, transparent 70%)",
          }}
        />
        <motion.div
          variants={floatingOrb}
          animate="animate"
          transition={{ delay: 1 }}
          className="absolute top-1/3 -left-48 h-[450px] w-[450px] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--lavender) / 0.5) 0%, transparent 70%)",
          }}
        />
        <motion.div
          variants={floatingOrb}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute bottom-10 right-[-15%] h-[400px] w-[400px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--wheat-card) / 0.6) 0%, transparent 70%)",
          }}
        />
        <motion.div
          variants={floatingOrb}
          animate="animate"
          transition={{ delay: 1.5 }}
          className="absolute bottom-1/4 left-1/4 h-[300px] w-[300px] rounded-full opacity-15 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--pink-card) / 0.5) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ——— Header ——— */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        className="sticky top-0 z-50 w-full"
        style={{
          backgroundColor: "hsl(var(--bg-neutral) / 0.85)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="mx-auto flex max-w-[1140px] items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ backgroundColor: "hsl(var(--seaweed))" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1L15 8L8 15L1 8L8 1Z" fill="hsl(var(--cream))" />
                <path d="M8 5L11 8L8 11L5 8L8 5Z" fill="hsl(var(--sage))" />
              </svg>
            </div>
            <span
              className="text-lg font-semibold tracking-tight"
              style={{ color: "hsl(var(--seaweed))" }}
            >
              Clarity
            </span>
          </Link>
        </div>
      </motion.header>

      {/* ——— Main Content ——— */}
      <main className="relative z-10 flex min-h-[calc(100vh-76px)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* ——— Auth Card ——— */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
            className="relative overflow-hidden"
            style={{
              borderRadius: "28px",
              background: `
                linear-gradient(135deg,
                  hsl(var(--bg-calm) / 0.9) 0%,
                  hsl(var(--bg-neutral) / 0.95) 100%
                )
              `,
              backdropFilter: "blur(24px)",
              boxShadow: `
                0 24px 48px hsl(var(--seaweed) / 0.08),
                0 12px 24px hsl(var(--seaweed) / 0.05),
                inset 0 1px 0 hsl(255 255% 255% / 0.25)
              `,
            }}
          >
            {/* ——— Decorative Top Accent ——— */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{
                background: `
                  linear-gradient(90deg,
                    hsl(var(--lagoon)) 0%,
                    hsl(var(--sage)) 50%,
                    hsl(var(--lavender)) 100%
                  )
                `,
              }}
            />

            <div className="p-8 pt-10">
              {/* ——— Header Section ——— */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center mb-8"
              >
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{
                    background: `
                      linear-gradient(135deg,
                        hsl(var(--seaweed) / 0.95) 0%,
                        hsl(var(--sage) / 0.85) 100%
                      )
                    `,
                    boxShadow: `
                      0 8px 20px hsl(var(--seaweed) / 0.2),
                      inset 0 2px 8px hsl(var(--seaweed) / 0.15)
                    `,
                  }}
                >
                  <Sparkles
                    className="w-7 h-7"
                    strokeWidth={1.5}
                    style={{ color: "hsl(var(--wheat))" }}
                  />
                </div>
                <h1
                  className="text-2xl font-semibold tracking-tight"
                  style={{ color: "hsl(var(--seaweed))" }}
                >
                  {mode === "login" ? "Welcome back" : "Begin your journey"}
                </h1>
                <p
                  className="text-sm mt-2 leading-relaxed"
                  style={{ color: "hsl(var(--seaweed) / 0.55)" }}
                >
                  {mode === "login"
                    ? "Sign in to continue your wellness journey"
                    : "Create an account to start feeling better"}
                </p>
              </motion.div>

              {/* ——— Tab Switcher ——— */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
                className="flex gap-2 p-1.5 rounded-2xl mb-8"
                style={{
                  backgroundColor: "hsl(var(--seaweed) / 0.06)",
                }}
              >
                {["login", "signup"].map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => switchMode()}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex-1 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300"
                    style={{
                      backgroundColor:
                        mode === tab ? "white" : "transparent",
                      color:
                        mode === tab
                          ? "hsl(var(--seaweed))"
                          : "hsl(var(--seaweed) / 0.5)",
                      boxShadow:
                        mode === tab
                          ? "0 4px 12px hsl(var(--seaweed) / 0.1)"
                          : "none",
                    }}
                  >
                    {tab === "login" ? "Sign In" : "Create Account"}
                  </motion.button>
                ))}
              </motion.div>

              {/* ——— Error/Success Messages ——— */}
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl mb-6"
                    style={{
                      backgroundColor: "hsl(var(--melon) / 0.15)",
                      border: "1px solid hsl(var(--melon) / 0.3)",
                    }}
                  >
                    <AlertCircle
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: "hsl(var(--melon))" }}
                    />
                    <p
                      className="text-sm"
                      style={{ color: "hsl(var(--seaweed) / 0.8)" }}
                    >
                      {error}
                    </p>
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="flex items-center gap-3 p-4 rounded-xl mb-6"
                    style={{
                      backgroundColor: "hsl(var(--sage-card) / 0.4)",
                      border: "1px solid hsl(var(--sage) / 0.3)",
                    }}
                  >
                    <Check
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: "hsl(var(--sage))" }}
                    />
                    <p
                      className="text-sm"
                      style={{ color: "hsl(var(--seaweed) / 0.8)" }}
                    >
                      {success}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ——— Forms ——— */}
              <AnimatePresence mode="wait">
                {mode === "login" ? (
                  <motion.form
                    key="login-form"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onSubmit={loginForm.handleSubmit(handleLogin)}
                    className="space-y-5"
                  >
                    {/* Email Field */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label
                        htmlFor="login-email"
                        className="text-sm font-medium"
                        style={{ color: "hsl(var(--seaweed) / 0.7)" }}
                      >
                        Email
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5"
                          strokeWidth={1.75}
                          style={{ color: "hsl(var(--seaweed) / 0.4)" }}
                        />
                        <input
                          id="login-email"
                          type="email"
                          placeholder="you@example.com"
                          {...loginForm.register("email")}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm transition-all duration-300 outline-none"
                          style={{
                            backgroundColor: "hsl(var(--bg-neutral) / 0.7)",
                            border: "1px solid hsl(var(--seaweed) / 0.12)",
                            color: "hsl(var(--seaweed))",
                          }}
                        />
                      </div>
                      {loginForm.formState.errors.email && (
                        <p className="text-xs" style={{ color: "hsl(var(--melon))" }}>
                          {loginForm.formState.errors.email.message}
                        </p>
                      )}
                    </motion.div>

                    {/* Password Field */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label
                        htmlFor="login-password"
                        className="text-sm font-medium"
                        style={{ color: "hsl(var(--seaweed) / 0.7)" }}
                      >
                        Password
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5"
                          strokeWidth={1.75}
                          style={{ color: "hsl(var(--seaweed) / 0.4)" }}
                        />
                        <input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...loginForm.register("password")}
                          className="w-full pl-12 pr-12 py-3.5 rounded-xl text-sm transition-all duration-300 outline-none"
                          style={{
                            backgroundColor: "hsl(var(--bg-neutral) / 0.7)",
                            border: "1px solid hsl(var(--seaweed) / 0.12)",
                            color: "hsl(var(--seaweed))",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                          style={{ color: "hsl(var(--seaweed) / 0.4)" }}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4.5 h-4.5" strokeWidth={1.75} />
                          ) : (
                            <Eye className="w-4.5 h-4.5" strokeWidth={1.75} />
                          )}
                        </button>
                      </div>
                      {loginForm.formState.errors.password && (
                        <p className="text-xs" style={{ color: "hsl(var(--melon))" }}>
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </motion.div>

                    {/* Forgot Password Link */}
                    <motion.div variants={itemVariants} className="text-right">
                      <button
                        type="button"
                        className="text-xs font-medium transition-colors"
                        style={{ color: "hsl(var(--sage))" }}
                      >
                        Forgot password?
                      </button>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={itemVariants}>
                      <motion.button
                        type="submit"
                        variants={buttonHover}
                        whileHover="hover"
                        whileTap="tap"
                        disabled={isLoading}
                        className="w-full py-4 rounded-2xl flex items-center justify-center gap-2.5 text-sm font-medium transition-all duration-300"
                        style={{
                          backgroundColor: "hsl(var(--seaweed))",
                          color: "hsl(var(--cream))",
                          boxShadow: "0 8px 24px hsl(var(--seaweed) / 0.25)",
                          opacity: isLoading ? 0.7 : 1,
                        }}
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            Sign In
                            <ArrowRight className="w-4 h-4" strokeWidth={2} />
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.form>
                ) : (
                  <motion.form
                    key="signup-form"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onSubmit={signupForm.handleSubmit(handleSignup)}
                    className="space-y-5"
                  >
                    {/* Name Field */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label
                        htmlFor="signup-name"
                        className="text-sm font-medium"
                        style={{ color: "hsl(var(--seaweed) / 0.7)" }}
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5"
                          strokeWidth={1.75}
                          style={{ color: "hsl(var(--seaweed) / 0.4)" }}
                        />
                        <input
                          id="signup-name"
                          type="text"
                          placeholder="Your name"
                          {...signupForm.register("name")}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm transition-all duration-300 outline-none"
                          style={{
                            backgroundColor: "hsl(var(--bg-neutral) / 0.7)",
                            border: "1px solid hsl(var(--seaweed) / 0.12)",
                            color: "hsl(var(--seaweed))",
                          }}
                        />
                      </div>
                      {signupForm.formState.errors.name && (
                        <p className="text-xs" style={{ color: "hsl(var(--melon))" }}>
                          {signupForm.formState.errors.name.message}
                        </p>
                      )}
                    </motion.div>

                    {/* Email Field */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label
                        htmlFor="signup-email"
                        className="text-sm font-medium"
                        style={{ color: "hsl(var(--seaweed) / 0.7)" }}
                      >
                        Email
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5"
                          strokeWidth={1.75}
                          style={{ color: "hsl(var(--seaweed) / 0.4)" }}
                        />
                        <input
                          id="signup-email"
                          type="email"
                          placeholder="you@example.com"
                          {...signupForm.register("email")}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm transition-all duration-300 outline-none"
                          style={{
                            backgroundColor: "hsl(var(--bg-neutral) / 0.7)",
                            border: "1px solid hsl(var(--seaweed) / 0.12)",
                            color: "hsl(var(--seaweed))",
                          }}
                        />
                      </div>
                      {signupForm.formState.errors.email && (
                        <p className="text-xs" style={{ color: "hsl(var(--melon))" }}>
                          {signupForm.formState.errors.email.message}
                        </p>
                      )}
                    </motion.div>

                    {/* Password Field */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label
                        htmlFor="signup-password"
                        className="text-sm font-medium"
                        style={{ color: "hsl(var(--seaweed) / 0.7)" }}
                      >
                        Password
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5"
                          strokeWidth={1.75}
                          style={{ color: "hsl(var(--seaweed) / 0.4)" }}
                        />
                        <input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...signupForm.register("password")}
                          className="w-full pl-12 pr-12 py-3.5 rounded-xl text-sm transition-all duration-300 outline-none"
                          style={{
                            backgroundColor: "hsl(var(--bg-neutral) / 0.7)",
                            border: "1px solid hsl(var(--seaweed) / 0.12)",
                            color: "hsl(var(--seaweed))",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                          style={{ color: "hsl(var(--seaweed) / 0.4)" }}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4.5 h-4.5" strokeWidth={1.75} />
                          ) : (
                            <Eye className="w-4.5 h-4.5" strokeWidth={1.75} />
                          )}
                        </button>
                      </div>
                      {signupForm.formState.errors.password && (
                        <p className="text-xs" style={{ color: "hsl(var(--melon))" }}>
                          {signupForm.formState.errors.password.message}
                        </p>
                      )}
                      <p
                        className="text-xs"
                        style={{ color: "hsl(var(--seaweed) / 0.4)" }}
                      >
                        8+ characters with uppercase, lowercase & number
                      </p>
                    </motion.div>

                    {/* Confirm Password Field */}
                    <motion.div variants={itemVariants} className="space-y-2">
                      <label
                        htmlFor="signup-confirm-password"
                        className="text-sm font-medium"
                        style={{ color: "hsl(var(--seaweed) / 0.7)" }}
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5"
                          strokeWidth={1.75}
                          style={{ color: "hsl(var(--seaweed) / 0.4)" }}
                        />
                        <input
                          id="signup-confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...signupForm.register("confirmPassword")}
                          className="w-full pl-12 pr-12 py-3.5 rounded-xl text-sm transition-all duration-300 outline-none"
                          style={{
                            backgroundColor: "hsl(var(--bg-neutral) / 0.7)",
                            border: "1px solid hsl(var(--seaweed) / 0.12)",
                            color: "hsl(var(--seaweed))",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2"
                          style={{ color: "hsl(var(--seaweed) / 0.4)" }}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-4.5 h-4.5" strokeWidth={1.75} />
                          ) : (
                            <Eye className="w-4.5 h-4.5" strokeWidth={1.75} />
                          )}
                        </button>
                      </div>
                      {signupForm.formState.errors.confirmPassword && (
                        <p className="text-xs" style={{ color: "hsl(var(--melon))" }}>
                          {signupForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={itemVariants}>
                      <motion.button
                        type="submit"
                        variants={buttonHover}
                        whileHover="hover"
                        whileTap="tap"
                        disabled={isLoading}
                        className="w-full py-4 rounded-2xl flex items-center justify-center gap-2.5 text-sm font-medium transition-all duration-300"
                        style={{
                          backgroundColor: "hsl(var(--seaweed))",
                          color: "hsl(var(--cream))",
                          boxShadow: "0 8px 24px hsl(var(--seaweed) / 0.25)",
                          opacity: isLoading ? 0.7 : 1,
                        }}
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            Create Account
                            <ArrowRight className="w-4 h-4" strokeWidth={2} />
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* ——— Divider ——— */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 my-8"
              >
                <div
                  className="flex-1 h-px"
                  style={{ backgroundColor: "hsl(var(--seaweed) / 0.1)" }}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: "hsl(var(--seaweed) / 0.35)" }}
                >
                  or continue with
                </span>
                <div
                  className="flex-1 h-px"
                  style={{ backgroundColor: "hsl(var(--seaweed) / 0.1)" }}
                />
              </motion.div>

              {/* ——— Social Login ——— */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="grid grid-cols-2 gap-3"
              >
                <motion.button
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleSocialLogin("google")}
                  disabled={socialLoading === "google"}
                  className="p-4 rounded-xl flex items-center justify-center gap-3 text-sm font-medium transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, white 0%, hsl(var(--wheat) / 0.8) 100%)",
                    color: "hsl(var(--seaweed))",
                    boxShadow: "0 4px 12px hsl(var(--seaweed) / 0.08)",
                  }}
                >
                  {socialLoading === "google" ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Chrome className="w-5 h-5" strokeWidth={1.75} />
                      Google
                    </>
                  )}
                </motion.button>

                <motion.button
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => handleSocialLogin("github")}
                  disabled={socialLoading === "github"}
                  className="p-4 rounded-xl flex items-center justify-center gap-3 text-sm font-medium transition-all duration-300"
                  style={{
                    backgroundColor: "hsl(255 255% 255% / 0.6)",
                    border: "1px solid hsl(var(--seaweed) / 0.12)",
                    color: "hsl(var(--seaweed))",
                  }}
                >
                  {socialLoading === "github" ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      <Github className="w-5 h-5" strokeWidth={1.75} />
                      GitHub
                    </>
                  )}
                </motion.button>
              </motion.div>

              {/* ——— Footer Text ——— */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-8 text-xs"
                style={{ color: "hsl(var(--seaweed) / 0.4)" }}
              >
                By continuing, you agree to our{" "}
                <button className="underline" style={{ color: "hsl(var(--sage))" }}>
                  Terms of Service
                </button>{" "}
                and{" "}
                <button className="underline" style={{ color: "hsl(var(--sage))" }}>
                  Privacy Policy
                </button>
              </motion.p>
            </div>
          </motion.div>

          {/* ——— Security Badge ——— */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-2 mt-6"
          >
            <Heart
              className="w-3.5 h-3.5"
              strokeWidth={1.75}
              style={{ color: "hsl(var(--sage))" }}
            />
            <span
              className="text-xs"
              style={{ color: "hsl(var(--seaweed) / 0.4)" }}
            >
              Your data is encrypted and never shared
            </span>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}
