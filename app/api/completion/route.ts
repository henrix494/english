import { NextResponse } from "next/server";
import { streamObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { text_schema } from "@/schema/schema";

export async function POST(req: Request) {
  try {
    const { level, text } = await req.json();
    console.log(level);
    const google = createGoogleGenerativeAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const randomId = Math.random().toString(36).substring(2, 8);

    const result = streamObject({
      temperature: 0.7,
      model: google("gemini-flash-latest"),
      schema: text_schema,
      prompt: `Generate an English text appropriate for a ${level} ${
        text && `in the topic of ${text}`
      } level with around 80 lines. The text should be unique, informative, and engaging. Random ID: ${randomId}.`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
