"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Send,
  Bot,
  User,
  Sparkles,
  ShieldCheck,
  Loader2,
} from "lucide-react";

/* ——— Motion ——— */
const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  },
};
const msgIn = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
  },
};

/* ——— Types ——— */
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const WELCOME_MSG: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello, I'm your mental health support companion. I'm here to listen and provide information from trusted sources. How are you feeling today? You can ask me anything — there's no judgment here.",
  timestamp: new Date(),
};

const QUICK_PROMPTS = [
  "I'm feeling anxious",
  "How to manage stress?",
  "I can't sleep well",
  "I feel lonely",
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const sendMessage = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: msg,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });

      const data = await res.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.answer || "I'm sorry, I couldn't process that. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Please try again in a moment, or reach out to crisis resources if you need immediate support.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="flex h-[calc(100vh-120px)] flex-col"
    >
      {/* ——— Header ——— */}
      <motion.div
        variants={fadeUp}
        className="flex items-center gap-3 pb-4 pt-2"
      >
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105"
          style={{
            backgroundColor: "hsl(0 0% 100% / 0.6)",
            border: "1px solid hsl(var(--border) / 0.4)",
          }}
        >
          <ArrowLeft
            className="h-4 w-4"
            strokeWidth={1.75}
            style={{ color: "hsl(var(--seaweed))" }}
          />
        </Link>
        <div className="flex flex-1 items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: "hsl(var(--seaweed))" }}
          >
            <Bot
              className="h-5 w-5"
              strokeWidth={1.75}
              style={{ color: "hsl(var(--cream))" }}
            />
          </div>
          <div>
            <h1
              className="text-base font-semibold tracking-tight"
              style={{ color: "hsl(var(--seaweed))" }}
            >
              Clarity AI
            </h1>
            <div className="flex items-center gap-1.5">
              <div
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "hsl(var(--sage))" }}
              />
              <span
                className="text-[11px]"
                style={{ color: "hsl(var(--seaweed) / 0.4)" }}
              >
                Mental health support
              </span>
            </div>
          </div>
        </div>
        <div
          className="flex items-center gap-1 rounded-full px-2.5 py-1"
          style={{
            backgroundColor: "hsl(var(--sage-card) / 0.4)",
          }}
        >
          <ShieldCheck
            className="h-3 w-3"
            strokeWidth={1.75}
            style={{ color: "hsl(var(--sage))" }}
          />
          <span
            className="text-[10px] font-medium"
            style={{ color: "hsl(var(--seaweed) / 0.5)" }}
          >
            Private
          </span>
        </div>
      </motion.div>

      {/* ——— Chat area ——— */}
      <motion.div
        variants={fadeUp}
        ref={scrollRef}
        className="flex-1 overflow-y-auto rounded-[24px] p-4"
        style={{
          backgroundColor: "hsl(0 0% 100% / 0.35)",
          border: "1px solid hsl(var(--border) / 0.25)",
        }}
      >
        <div className="flex flex-col gap-4">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                variants={msgIn}
                initial="hidden"
                animate="visible"
                className={`flex gap-3 ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor:
                      msg.role === "assistant"
                        ? "hsl(var(--seaweed))"
                        : "hsl(var(--sage-card))",
                  }}
                >
                  {msg.role === "assistant" ? (
                    <Bot
                      className="h-4 w-4"
                      strokeWidth={1.75}
                      style={{ color: "hsl(var(--cream))" }}
                    />
                  ) : (
                    <User
                      className="h-4 w-4"
                      strokeWidth={1.75}
                      style={{ color: "hsl(var(--seaweed) / 0.6)" }}
                    />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className="max-w-[80%] rounded-[18px] px-4 py-3"
                  style={{
                    backgroundColor:
                      msg.role === "assistant"
                        ? "hsl(0 0% 100% / 0.7)"
                        : "hsl(var(--seaweed))",
                    border:
                      msg.role === "assistant"
                        ? "1px solid hsl(var(--border) / 0.3)"
                        : "none",
                  }}
                >
                  <p
                    className="text-[13px] leading-relaxed"
                    style={{
                      color:
                        msg.role === "assistant"
                          ? "hsl(var(--seaweed) / 0.75)"
                          : "hsl(var(--cream))",
                    }}
                  >
                    {msg.content}
                  </p>
                  <span
                    className="mt-1.5 block text-[10px]"
                    style={{
                      color:
                        msg.role === "assistant"
                          ? "hsl(var(--seaweed) / 0.25)"
                          : "hsl(var(--cream) / 0.4)",
                    }}
                  >
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                className="flex gap-3"
              >
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "hsl(var(--seaweed))" }}
                >
                  <Bot
                    className="h-4 w-4"
                    strokeWidth={1.75}
                    style={{ color: "hsl(var(--cream))" }}
                  />
                </div>
                <div
                  className="flex items-center gap-2 rounded-[18px] px-4 py-3"
                  style={{
                    backgroundColor: "hsl(0 0% 100% / 0.7)",
                    border: "1px solid hsl(var(--border) / 0.3)",
                  }}
                >
                  <Loader2
                    className="h-3.5 w-3.5 animate-spin"
                    strokeWidth={1.75}
                    style={{ color: "hsl(var(--sage))" }}
                  />
                  <span
                    className="text-[12px]"
                    style={{ color: "hsl(var(--seaweed) / 0.4)" }}
                  >
                    Thinking...
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* ——— Quick prompts (only show when few messages) ——— */}
      <AnimatePresence>
        {messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-wrap gap-2 py-3"
          >
            {QUICK_PROMPTS.map((prompt) => (
              <motion.button
                key={prompt}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                onClick={() => sendMessage(prompt)}
                className="rounded-full px-3.5 py-2 text-[12px] font-medium transition-colors"
                style={{
                  backgroundColor: "hsl(0 0% 100% / 0.6)",
                  color: "hsl(var(--seaweed) / 0.6)",
                  border: "1px solid hsl(var(--border) / 0.4)",
                }}
              >
                <Sparkles
                  className="mr-1 inline h-3 w-3"
                  strokeWidth={1.75}
                  style={{ color: "hsl(var(--sage))" }}
                />
                {prompt}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ——— Input area ——— */}
      <motion.div variants={fadeUp} className="pt-3">
        <div
          className="flex items-end gap-2 rounded-[20px] p-2.5"
          style={{
            backgroundColor: "hsl(0 0% 100% / 0.6)",
            border: "1px solid hsl(var(--border) / 0.4)",
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Share what's on your mind..."
            rows={1}
            className="max-h-[120px] flex-1 resize-none bg-transparent px-3 py-2.5 text-[13px] leading-relaxed outline-none placeholder:text-[13px]"
            style={{
              color: "hsl(var(--seaweed))",
              caretColor: "hsl(var(--sage))",
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-opacity disabled:opacity-30"
            style={{
              backgroundColor: "hsl(var(--seaweed))",
            }}
          >
            <Send
              className="h-4 w-4 -translate-x-[0.5px]"
              strokeWidth={1.75}
              style={{ color: "hsl(var(--cream))" }}
            />
          </motion.button>
        </div>
        <p
          className="mt-2 text-center text-[10px]"
          style={{ color: "hsl(var(--seaweed) / 0.25)" }}
        >
          AI-powered support · Not a replacement for professional help
        </p>
      </motion.div>
    </motion.div>
  );
}
