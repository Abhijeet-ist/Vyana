import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

const SYSTEM_PROMPT = `You are Vyana, a compassionate and supportive mental health companion. Your role:
- Listen with empathy, validate feelings, never judge
- Give short, warm, practical responses (2-4 sentences max)
- Suggest simple coping techniques when appropriate (breathing, grounding, journaling)
- If someone is in crisis, gently direct them to professional help (988 Suicide & Crisis Lifeline, Crisis Text Line: text HOME to 741741)
- Never diagnose, prescribe, or replace professional therapy
- Use a calm, friendly tone — like a caring friend
- End with a gentle follow-up question to keep the conversation going`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message.trim() },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!groqRes.ok) {
      const errBody = await groqRes.text();
      console.error("Groq API error:", groqRes.status, errBody);
      throw new Error(`Groq API error: ${groqRes.status}`);
    }

    const data = await groqRes.json();
    const answer = data.choices?.[0]?.message?.content?.trim() || "I'm here for you. Could you tell me more?";

    return NextResponse.json({
      answer,
      disclaimer: "Informational guidance only. Not medical advice.",
    });
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json({
      answer:
        "I'm here to support you. It seems I'm having a brief hiccup. " +
        "Please try again in a moment, or reach out to the 988 Suicide & Crisis Lifeline if you need immediate support. " +
        "You are not alone — help is always available.",
      disclaimer: "Informational guidance only. Not medical advice.",
      fallback: true,
    });
  }
}
