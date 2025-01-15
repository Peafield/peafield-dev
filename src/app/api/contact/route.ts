import clientPromise from "@/lib/mongodb";
import { contactFormSchema } from "@/types/contact";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const parsedData = contactFormSchema.safeParse(json);
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    await db.collection("messages").insertOne(parsedData);
    return new Response("Message sent", { status: 201 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error inserting contact message:", error);
    }
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
