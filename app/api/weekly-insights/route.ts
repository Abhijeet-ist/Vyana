import { NextResponse } from "next/server";
import { ObjectId, Document } from "mongodb";
import { getCollection } from "@/lib/mongodb";

interface WeeklyEntryDocument extends Document {
  _id?: ObjectId;
  userId: string;
  entryId: string;
  date: string;
  emotionalState: string;
  stressProfile: {
    cognitive: number;
    stress: number;
    behavior: number;
    overall: number;
  };
  insights: { category: string; text: string }[];
  note?: string;
  createdAt: Date;
}

// GET — fetch all weekly entries for a user
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const collection = await getCollection<WeeklyEntryDocument>("weeklyEntries");
    const entries = await collection
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    const formatted = entries.map((e) => ({
      id: e.entryId,
      date: e.date,
      emotionalState: e.emotionalState,
      stressProfile: e.stressProfile,
      insights: e.insights,
      note: e.note,
    }));

    return NextResponse.json({ entries: formatted }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch weekly entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 }
    );
  }
}

// POST — save a new weekly entry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, entry } = body;

    if (!userId || !entry) {
      return NextResponse.json(
        { error: "userId and entry are required" },
        { status: 400 }
      );
    }

    const collection = await getCollection<WeeklyEntryDocument>("weeklyEntries");

    const doc: WeeklyEntryDocument = {
      userId,
      entryId: entry.id,
      date: entry.date,
      emotionalState: entry.emotionalState,
      stressProfile: entry.stressProfile,
      insights: entry.insights,
      note: entry.note,
      createdAt: new Date(),
    };

    await collection.insertOne(doc);

    return NextResponse.json(
      { message: "Entry saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save weekly entry:", error);
    return NextResponse.json(
      { error: "Failed to save entry" },
      { status: 500 }
    );
  }
}

// DELETE — delete a specific entry or all entries for a user
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const entryId = searchParams.get("entryId");
    const clearAll = searchParams.get("clearAll");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const collection = await getCollection<WeeklyEntryDocument>("weeklyEntries");

    if (clearAll === "true") {
      await collection.deleteMany({ userId });
      return NextResponse.json(
        { message: "All entries cleared" },
        { status: 200 }
      );
    }

    if (!entryId) {
      return NextResponse.json(
        { error: "entryId is required for single deletion" },
        { status: 400 }
      );
    }

    await collection.deleteOne({ userId, entryId });
    return NextResponse.json(
      { message: "Entry deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete weekly entry:", error);
    return NextResponse.json(
      { error: "Failed to delete entry" },
      { status: 500 }
    );
  }
}
