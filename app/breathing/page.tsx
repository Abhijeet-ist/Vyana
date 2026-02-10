"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Play, Pause, RotateCcw, Wind } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface BreathingSession {
  phase: "inhale" | "hold" | "exhale" | "rest";
  seconds: number;
  cycle: number;
  isActive: boolean;
}

export default function BreathingPage() {
  const router = useRouter();
  const [session, setSession] = useState<BreathingSession>({
    phase: "inhale",
    seconds: 4,
    cycle: 1,
    isActive: false,
  });
  const [timeLeft, setTimeLeft] = useState(4);
  const [totalCycles, setTotalCycles] = useState(5);
  const [isCompleted, setIsCompleted] = useState(false);

  // 4-7-8 breathing pattern
  const breathingPattern = {
    inhale: 4,
    hold: 7,
    exhale: 8,
    rest: 2,
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (session.isActive && !isCompleted) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next phase
            const phases: (keyof typeof breathingPattern)[] = ["inhale", "hold", "exhale", "rest"];
            const currentIndex = phases.indexOf(session.phase);
            const nextPhase = phases[(currentIndex + 1) % phases.length];
            
            let nextCycle = session.cycle;
            if (session.phase === "rest") {
              nextCycle += 1;
              if (nextCycle > totalCycles) {
                setIsCompleted(true);
                setSession(prev => ({ ...prev, isActive: false }));
                return 0;
              }
            }
            
            setSession(prev => ({
              ...prev,
              phase: nextPhase,
              cycle: nextCycle,
            }));
            
            return breathingPattern[nextPhase];
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [session.isActive, session.phase, session.cycle, totalCycles, isCompleted]);

  const startBreathing = () => {
    setSession(prev => ({ ...prev, isActive: true }));
  };

  const pauseBreathing = () => {
    setSession(prev => ({ ...prev, isActive: false }));
  };

  const resetBreathing = () => {
    setSession({
      phase: "inhale",
      seconds: 4,
      cycle: 1,
      isActive: false,
    });
    setTimeLeft(4);
    setIsCompleted(false);
  };

  const getPhaseInstruction = () => {
    switch (session.phase) {
      case "inhale":
        return "Breathe in slowly through your nose";
      case "hold":
        return "Hold your breath gently";
      case "exhale":
        return "Exhale completely through your mouth";
      case "rest":
        return "Rest and prepare for next cycle";
      default:
        return "Get ready to begin";
    }
  };

  const getPhaseColor = () => {
    switch (session.phase) {
      case "inhale":
        return "hsl(200 100% 70%)"; // Light blue
      case "hold":
        return "hsl(45 100% 70%)"; // Light yellow
      case "exhale":
        return "hsl(120 60% 70%)"; // Light green
      case "rest":
        return "hsl(280 50% 70%)"; // Light purple
      default:
        return "hsl(135 12% 26%)";
    }
  };

  const circleScale = () => {
    switch (session.phase) {
      case "inhale":
        return 1.2;
      case "hold":
        return 1.2;
      case "exhale":
        return 0.8;
      case "rest":
        return 1.0;
      default:
        return 1.0;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(36 33% 93%)" }}>
      {/* Header */}
      <div className="sticky top-0 z-10 border-b" style={{ backgroundColor: "hsl(0 0% 100%)", borderColor: "hsl(135 12% 26% / 0.1)" }}>
        <div className="flex items-center gap-4 px-6 py-5">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-gray-100"
            style={{ color: "hsl(135 12% 26% / 0.6)" }}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold" style={{ color: "hsl(135 12% 26%)" }}>
              Guided Breathing Exercise
            </h1>
            <p className="text-sm mt-1" style={{ color: "hsl(135 12% 26% / 0.55)" }}>
              4-7-8 breathing technique for relaxation
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8 max-w-md mx-auto min-h-[calc(100vh-120px)]">
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key="breathing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col justify-center space-y-8 h-full"
            >
              {/* Breathing Circle */}
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative flex items-center justify-center">
                  <motion.div
                    className="w-56 h-56 rounded-full border-4 flex items-center justify-center relative"
                    style={{ 
                      borderColor: getPhaseColor(),
                      backgroundColor: `${getPhaseColor()}20`
                    }}
                    animate={{ 
                      scale: circleScale(),
                    }}
                    transition={{ 
                      duration: session.isActive ? breathingPattern[session.phase] : 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <Wind 
                      className="w-16 h-16" 
                      style={{ color: getPhaseColor() }}
                      strokeWidth={1.5}
                    />
                  </motion.div>
                  
                  {/* Timer - positioned at bottom of circle */}
                  <div className="absolute -bottom-16">
                    <div 
                      className="text-4xl font-bold text-center"
                      style={{ color: "hsl(135 12% 26%)" }}
                    >
                      {timeLeft}
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase Instruction */}
              <div className="mx-4">
                <div className="p-6 text-center rounded-3xl shadow-sm" style={{ backgroundColor: "hsl(0 0% 100%)" }}>
                  <h2 
                    className="text-2xl font-semibold mb-3 capitalize"
                    style={{ color: "hsl(135 12% 26%)" }}
                  >
                    {session.phase}
                  </h2>
                  <p 
                    className="text-base leading-relaxed"
                    style={{ color: "hsl(135 12% 26% / 0.7)" }}
                  >
                    {getPhaseInstruction()}
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="mx-4">
                <div className="p-5 rounded-3xl shadow-sm" style={{ backgroundColor: "hsl(0 0% 100%)" }}>
                  <div className="flex justify-between items-center mb-4">
                    <span 
                      className="text-base font-medium"
                      style={{ color: "hsl(135 12% 26%)" }}
                    >
                      Cycle Progress
                    </span>
                    <span 
                      className="text-base font-semibold"
                      style={{ color: "hsl(105 15% 43%)" }}
                    >
                      {session.cycle} / {totalCycles}
                    </span>
                  </div>
                  <div 
                    className="w-full h-3 rounded-full"
                    style={{ backgroundColor: "hsl(135 12% 26% / 0.1)" }}
                  >
                    <motion.div
                      className="h-3 rounded-full"
                      style={{ backgroundColor: "hsl(105 15% 43%)" }}
                      animate={{ width: `${(session.cycle / totalCycles) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center gap-4 px-4 pt-4">
                {!session.isActive ? (
                  <Button
                    onClick={startBreathing}
                    className="px-10 py-4 rounded-3xl text-base font-medium min-w-[200px]"
                    style={{ backgroundColor: "hsl(105 15% 43%)", color: "white" }}
                  >
                    <Play className="w-5 h-5 mr-3" />
                    Start Breathing
                  </Button>
                ) : (
                  <Button
                    onClick={pauseBreathing}
                    variant="outline"
                    className="px-10 py-4 rounded-3xl text-base font-medium min-w-[200px]"
                    style={{ borderColor: "hsl(135 12% 26% / 0.2)", color: "hsl(135 12% 26%)", backgroundColor: "white" }}
                  >
                    <Pause className="w-5 h-5 mr-3" />
                    Pause
                  </Button>
                )}
                
                <Button
                  onClick={resetBreathing}
                  variant="outline"
                  className="px-6 py-4 rounded-3xl"
                  style={{ borderColor: "hsl(135 12% 26% / 0.2)", color: "hsl(135 12% 26%)", backgroundColor: "white" }}
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          ) : (
            /* Completion Screen */
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center space-y-8 h-full py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-32 h-32 mx-auto rounded-full flex items-center justify-center"
                style={{ backgroundColor: "hsl(105 15% 43% / 0.15)" }}
              >
                <Wind className="w-16 h-16" style={{ color: "hsl(105 15% 43%)" }} />
              </motion.div>
              
              <div className="mx-4">
                <div className="p-8 rounded-3xl shadow-sm" style={{ backgroundColor: "hsl(0 0% 100%)" }}>
                  <h2 
                    className="text-3xl font-bold mb-4"
                    style={{ color: "hsl(135 12% 26%)" }}
                  >
                    Well Done! 
                  </h2>
                  <p 
                    className="text-base leading-relaxed mb-6"
                    style={{ color: "hsl(135 12% 26% / 0.7)" }}
                  >
                    You've completed {totalCycles} cycles of breathing exercises. Take a moment to notice how you feel.
                  </p>
                  
                  <div className="space-y-4">
                    <Button
                      onClick={resetBreathing}
                      className="w-full py-4 rounded-3xl text-base font-medium"
                      style={{ backgroundColor: "hsl(105 15% 43%)", color: "white" }}
                    >
                      Practice Again
                    </Button>
                    <Button
                      onClick={() => router.back()}
                      variant="outline"
                      className="w-full py-4 rounded-3xl text-base font-medium"
                      style={{ borderColor: "hsl(135 12% 26% / 0.2)", color: "hsl(135 12% 26%)", backgroundColor: "white" }}
                    >
                      Return to Resources
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions Card */}
        <div className="mt-8 mx-4">
          <div className="p-6 rounded-3xl shadow-sm" style={{ backgroundColor: "hsl(0 0% 100%)" }}>
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: "hsl(135 12% 26%)" }}
            >
              How it works:
            </h3>
            <ul 
              className="text-base space-y-2 leading-relaxed"
              style={{ color: "hsl(135 12% 26% / 0.7)" }}
            >
              <li className="flex items-start">
                <span className="mr-3 mt-1" style={{ color: "hsl(105 15% 43%)" }}>•</span>
                <span>Inhale for 4 seconds through your nose</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1" style={{ color: "hsl(105 15% 43%)" }}>•</span>
                <span>Hold your breath for 7 seconds</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1" style={{ color: "hsl(105 15% 43%)" }}>•</span>
                <span>Exhale for 8 seconds through your mouth</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1" style={{ color: "hsl(105 15% 43%)" }}>•</span>
                <span>Rest for 2 seconds before the next cycle</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}