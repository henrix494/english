import { NextResponse } from "next/server";
import { streamObject } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { text_scema } from "@/schema/schema";

export async function POST(req: Request) {
  const context = await req.json();
  const google = createGoogleGenerativeAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  console.log(context);
  const randomId = Math.random().toString(36).substring(2, 8);

  const result = streamObject({
    temperature: 2,
    model: google("gemini-1.5-flash-latest"),
    schema: text_scema,
    prompt: `Give me an English text at ${context} level with about 40 lines. Make it unique. Random ID: ${randomId}.`,
  });

  return result.toTextStreamResponse();
}
