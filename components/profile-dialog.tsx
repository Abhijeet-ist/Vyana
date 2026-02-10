"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, User, Mail, LogOut, Settings, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/use-app-store";

// Form schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginForm = z.infer<typeof loginSchema>;
type SignupForm = z.infer<typeof signupSchema>;

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
  const { profileModalOpen, setProfileModalOpen, user, isAuthenticated, setUser, logout } = useAppStore();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogin = async (data: LoginForm) => {
    try {
      const mockUser = {
        id: "1",
        name: data.email.split('@')[0],
        email: data.email,
      };
      
      setUser(mockUser);
      setProfileModalOpen(false);
      loginForm.reset();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleSignup = async (data: SignupForm) => {
    try {
      const mockUser = {
        id: "1",
        name: data.name,
        email: data.email,
      };
      
      setUser(mockUser);
      setProfileModalOpen(false);
      signupForm.reset();
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const handleLogout = () => {
    logout();
    setProfileModalOpen(false);
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
              className="p-8"
            >
              {/* Header with organic shape */}
              <motion.div variants={itemVariants} className="text-center mb-8">
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
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
                
                <h2 
                  className="text-xl font-medium tracking-wide leading-relaxed"
                  style={{ 
                    color: 'hsl(var(--seaweed))',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    letterSpacing: '0.01em'
                  }}
                >
                  Welcome to Clarity
                </h2>
                <p 
                  className="text-sm mt-2 leading-relaxed"
                  style={{ color: 'hsl(var(--seaweed) / 0.7)' }}
                >
                  A gentle space for your mental wellness journey
                </p>
              </motion.div>

              {/* Floating card container for auth tabs */}
              <motion.div 
                variants={itemVariants}
                className="relative"
              >
                {/* Tab selector with soft circular design */}
                <div 
                  className="flex p-1 mb-6 rounded-full"
                  style={{
                    background: 'hsl(var(--bg-warm) / 0.6)',
                    border: '1px solid hsl(var(--warm-beige) / 0.3)'
                  }}
                >
                  <motion.button
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonHoverVariants}
                    onClick={() => setAuthMode('login')}
                    className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all duration-300 ${
                      authMode === 'login' 
                        ? 'shadow-lg' 
                        : 'hover:bg-white/20'
                    }`}
                    style={{
                      background: authMode === 'login' 
                        ? 'linear-gradient(135deg, white 0%, hsl(var(--wheat) / 0.9) 100%)'
                        : 'transparent',
                      color: authMode === 'login'
                        ? 'hsl(var(--seaweed))'
                        : 'hsl(var(--seaweed) / 0.7)',
                      boxShadow: authMode === 'login' 
                        ? '0 4px 12px hsl(var(--seaweed) / 0.1)'
                        : 'none'
                    }}
                  >
                    Sign In
                  </motion.button>
                  
                  <motion.button
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonHoverVariants}
                    onClick={() => setAuthMode('signup')}
                    className={`flex-1 py-3 px-6 rounded-full text-sm font-medium transition-all duration-300 ${
                      authMode === 'signup' 
                        ? 'shadow-lg' 
                        : 'hover:bg-white/20'
                    }`}
                    style={{
                      background: authMode === 'signup' 
                        ? 'linear-gradient(135deg, white 0%, hsl(var(--wheat) / 0.9) 100%)'
                        : 'transparent',
                      color: authMode === 'signup'
                        ? 'hsl(var(--seaweed))'
                        : 'hsl(var(--seaweed) / 0.7)',
                      boxShadow: authMode === 'signup' 
                        ? '0 4px 12px hsl(var(--seaweed) / 0.1)'
                        : 'none'
                    }}
                  >
                    Sign Up
                  </motion.button>
                </div>

                {/* Form container with glass effect */}
                <AnimatePresence mode="wait">
                  {authMode === 'login' ? (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="space-y-5"
                    >
                      <Form {...loginForm}>
                        <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-5">
                          <FormField
                            control={loginForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel 
                                  className="text-sm font-medium"
                                  style={{ color: 'hsl(var(--seaweed))' }}
                                >
                                  Email Address
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <div 
                                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center"
                                      style={{ background: 'hsl(var(--sage) / 0.2)' }}
                                    >
                                      <Mail className="w-3 h-3" strokeWidth={1.75} style={{ color: 'hsl(var(--sage))' }} />
                                    </div>
                                    <Input
                                      {...field}
                                      type="email"
                                      placeholder="your@email.com"
                                      className="pl-14 h-12 text-base"
                                      style={{ 
                                        background: 'hsl(255 255% 255% / 0.8)',
                                        border: '1px solid hsl(var(--warm-beige) / 0.6)',
                                        borderRadius: '16px',
                                        backdropFilter: 'blur(8px)',
                                        color: 'hsl(var(--seaweed))',
                                        fontSize: '15px',
                                        lineHeight: '1.6'
                                      }}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel 
                                  className="text-sm font-medium"
                                  style={{ color: 'hsl(var(--seaweed))' }}
                                >
                                  Password
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      {...field}
                                      type={showPassword ? "text" : "password"}
                                      placeholder="Enter your password"
                                      className="pr-14 h-12 text-base"
                                      style={{ 
                                        background: 'hsl(255 255% 255% / 0.8)',
                                        border: '1px solid hsl(var(--warm-beige) / 0.6)',
                                        borderRadius: '16px',
                                        backdropFilter: 'blur(8px)',
                                        color: 'hsl(var(--seaweed))',
                                        fontSize: '15px',
                                        lineHeight: '1.6'
                                      }}
                                    />
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      type="button"
                                      className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200"
                                      style={{ background: 'hsl(var(--sage) / 0.2)' }}
                                      onClick={() => setShowPassword(!showPassword)}
                                    >
                                      {showPassword ? (
                                        <EyeOff className="w-3.5 h-3.5" strokeWidth={1.75} style={{ color: 'hsl(var(--sage))' }} />
                                      ) : (
                                        <Eye className="w-3.5 h-3.5" strokeWidth={1.75} style={{ color: 'hsl(var(--sage))' }} />
                                      )}
                                    </motion.button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <motion.div
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonHoverVariants}
                          >
                            <Button 
                              type="submit" 
                              className="w-full h-12 text-base font-medium mt-8 border-0"
                              style={{ 
                                background: `
                                  linear-gradient(135deg, 
                                    hsl(var(--seaweed)) 0%, 
                                    hsl(var(--sage)) 100%
                                  )
                                `,
                                color: 'hsl(var(--wheat))',
                                borderRadius: '16px',
                                boxShadow: `
                                  0 8px 16px hsl(var(--seaweed) / 0.2),
                                  inset 0 1px 0 hsl(255 255% 255% / 0.2)
                                `
                              }}
                            >
                              Sign Into Your Journey
                            </Button>
                          </motion.div>
                        </form>
                      </Form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="signup"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="space-y-5"
                    >
                      <Form {...signupForm}>
                        <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-5">
                          <FormField
                            control={signupForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel 
                                  className="text-sm font-medium"
                                  style={{ color: 'hsl(var(--seaweed))' }}
                                >
                                  Full Name
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <div 
                                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center"
                                      style={{ background: 'hsl(var(--sage) / 0.2)' }}
                                    >
                                      <User className="w-3 h-3" strokeWidth={1.75} style={{ color: 'hsl(var(--sage))' }} />
                                    </div>
                                    <Input
                                      {...field}
                                      placeholder="Your name"
                                      className="pl-14 h-12 text-base"
                                      style={{ 
                                        background: 'hsl(255 255% 255% / 0.8)',
                                        border: '1px solid hsl(var(--warm-beige) / 0.6)',
                                        borderRadius: '16px',
                                        backdropFilter: 'blur(8px)',
                                        color: 'hsl(var(--seaweed))',
                                        fontSize: '15px',
                                        lineHeight: '1.6'
                                      }}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={signupForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel 
                                  className="text-sm font-medium"
                                  style={{ color: 'hsl(var(--seaweed))' }}
                                >
                                  Email Address
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <div 
                                      className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center"
                                      style={{ background: 'hsl(var(--sage) / 0.2)' }}
                                    >
                                      <Mail className="w-3 h-3" strokeWidth={1.75} style={{ color: 'hsl(var(--sage))' }} />
                                    </div>
                                    <Input
                                      {...field}
                                      type="email"
                                      placeholder="your@email.com"
                                      className="pl-14 h-12 text-base"
                                      style={{ 
                                        background: 'hsl(255 255% 255% / 0.8)',
                                        border: '1px solid hsl(var(--warm-beige) / 0.6)',
                                        borderRadius: '16px',
                                        backdropFilter: 'blur(8px)',
                                        color: 'hsl(var(--seaweed))',
                                        fontSize: '15px',
                                        lineHeight: '1.6'
                                      }}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={signupForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel 
                                  className="text-sm font-medium"
                                  style={{ color: 'hsl(var(--seaweed))' }}
                                >
                                  Password
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      {...field}
                                      type={showPassword ? "text" : "password"}
                                      placeholder="Create a password"
                                      className="pr-14 h-12 text-base"
                                      style={{ 
                                        background: 'hsl(255 255% 255% / 0.8)',
                                        border: '1px solid hsl(var(--warm-beige) / 0.6)',
                                        borderRadius: '16px',
                                        backdropFilter: 'blur(8px)',
                                        color: 'hsl(var(--seaweed))',
                                        fontSize: '15px',
                                        lineHeight: '1.6'
                                      }}
                                    />
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      type="button"
                                      className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200"
                                      style={{ background: 'hsl(var(--sage) / 0.2)' }}
                                      onClick={() => setShowPassword(!showPassword)}
                                    >
                                      {showPassword ? (
                                        <EyeOff className="w-3.5 h-3.5" strokeWidth={1.75} style={{ color: 'hsl(var(--sage))' }} />
                                      ) : (
                                        <Eye className="w-3.5 h-3.5" strokeWidth={1.75} style={{ color: 'hsl(var(--sage))' }} />
                                      )}
                                    </motion.button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={signupForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel 
                                  className="text-sm font-medium"
                                  style={{ color: 'hsl(var(--seaweed))' }}
                                >
                                  Confirm Password
                                </FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Input
                                      {...field}
                                      type={showConfirmPassword ? "text" : "password"}
                                      placeholder="Confirm your password"
                                      className="pr-14 h-12 text-base"
                                      style={{ 
                                        background: 'hsl(255 255% 255% / 0.8)',
                                        border: '1px solid hsl(var(--warm-beige) / 0.6)',
                                        borderRadius: '16px',
                                        backdropFilter: 'blur(8px)',
                                        color: 'hsl(var(--seaweed))',
                                        fontSize: '15px',
                                        lineHeight: '1.6'
                                      }}
                                    />
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      type="button"
                                      className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-200"
                                      style={{ background: 'hsl(var(--sage) / 0.2)' }}
                                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                      {showConfirmPassword ? (
                                        <EyeOff className="w-3.5 h-3.5" strokeWidth={1.75} style={{ color: 'hsl(var(--sage))' }} />
                                      ) : (
                                        <Eye className="w-3.5 h-3.5" strokeWidth={1.75} style={{ color: 'hsl(var(--sage))' }} />
                                      )}
                                    </motion.button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <motion.div
                            whileHover="hover"
                            whileTap="tap"
                            variants={buttonHoverVariants}
                          >
                            <Button 
                              type="submit" 
                              className="w-full h-12 text-base font-medium mt-8 border-0"
                              style={{ 
                                background: `
                                  linear-gradient(135deg, 
                                    hsl(var(--seaweed)) 0%, 
                                    hsl(var(--sage)) 100%
                                  )
                                `,
                                color: 'hsl(var(--wheat))',
                                borderRadius: '16px',
                                boxShadow: `
                                  0 8px 16px hsl(var(--seaweed) / 0.2),
                                  inset 0 1px 0 hsl(255 255% 255% / 0.2)
                                `
                              }}
                            >
                              Begin Your Journey
                            </Button>
                          </motion.div>
                        </form>
                      </Form>
                    </motion.div>
                  )}
                </AnimatePresence>
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