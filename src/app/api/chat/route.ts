import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";
import { anthropic } from "@/lib/anthropic";
import { checkRateLimit } from "@/lib/chat/rate-limit";
import { findRelevantProducts } from "@/lib/chat/product-search";
import { buildSystemPrompt } from "@/lib/chat/system-prompt";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2347079579907";

const schema = z.object({
  message: z.string().trim().min(1).max(2000),
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1).max(2000) }))
    .max(8)
    .default([]),
});

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  try {
    const { message, history } = schema.parse(await req.json());

    const { allowed, retryAfterSeconds } = await checkRateLimit(getClientIp(req));
    if (!allowed) {
      const headers: HeadersInit = {};
      if (retryAfterSeconds) headers["Retry-After"] = String(retryAfterSeconds);
      return NextResponse.json(
        {
          error: "rate_limited",
          message:
            "We're getting a lot of questions right now — please try again in a little while, or reach us directly on WhatsApp.",
        },
        { status: 429, headers }
      );
    }

    const products = await findRelevantProducts(message);

    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 500,
      system: buildSystemPrompt(products),
      messages: [...history, { role: "user" as const, content: message }],
    });

    const textBlock = response.content.find((b): b is Anthropic.TextBlock => b.type === "text");
    return NextResponse.json({
      reply: textBlock?.text ?? "Sorry, I couldn't put together a reply just then — please try again.",
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "invalid_request", message: "Please enter a message." },
        { status: 400 }
      );
    }

    if (err instanceof Anthropic.APIError) {
      console.error("Anthropic API error:", err.status, err.message);
    } else {
      console.error("Chat route error:", err);
    }

    return NextResponse.json(
      {
        error: "upstream_unavailable",
        message: `Our assistant is briefly unavailable — for immediate help, message us on WhatsApp: https://wa.me/${WHATSAPP_NUMBER}`,
      },
      { status: 502 }
    );
  }
}
