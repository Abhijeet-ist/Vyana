import { NextRequest, NextResponse } from "next/server";

/**
 * Proxies chat requests to the local RAG FastAPI server.
 * The RAG model runs on localhost:8000 (start with: uvicorn lib.rag.api:app --reload)
 */
const RAG_API_URL = process.env.RAG_API_URL || "http://localhost:8000";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const response = await fetch(`${RAG_API_URL}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: message.trim() }),
    });

    if (!response.ok) {
      throw new Error(`RAG API responded with ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      answer: data.answer,
      disclaimer: data.disclaimer || "Informational guidance only. Not medical advice.",
    });
  } catch (error) {
    console.error("Chat API error:", error);

    // Fallback: if RAG server is not running, return a helpful message
    return NextResponse.json({
      answer:
        "I'm here to support you. It seems the AI service is temporarily unavailable. " +
        "Please try again in a moment, or reach out to one of the crisis resources listed on this platform. " +
        "You are not alone — help is always available.",
      disclaimer: "Informational guidance only. Not medical advice.",
      fallback: true,
    });
  }
}
