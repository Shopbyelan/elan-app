import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendEmailVerificationEmail } from "@/lib/resend";
import { z } from "zod";

const schema = z.object({
  // Letters (any language), spaces, apostrophes, hyphens and dots only — no
  // digits, emoji, symbols or URLs. Spam bots were registering with names like
  // "🔥 15k TL + 200 FS bedava! Tıkla ve kazan…" to abuse our verification email.
  name: z
    .string()
    .trim()
    .min(2)
    .max(60)
    .regex(/^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u, "Please enter a valid name"),
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(8).max(128),
});

// Best-effort per-IP limit (per server instance).
const IP_WINDOW_MS = 60 * 60 * 1000;
const IP_MAX = 5;
const ipHits = new Map<string, number[]>();

function ipLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < IP_WINDOW_MS);
  hits.push(now);
  ipHits.set(ip, hits);
  if (ipHits.size > 10_000) ipHits.clear();
  return hits.length > IP_MAX;
}

// Global circuit breaker shared across all instances (uses the DB).
const GLOBAL_WINDOW_MS = 10 * 60 * 1000;
const GLOBAL_MAX_UNVERIFIED = 30;

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (ipLimited(ip)) {
      return NextResponse.json({ message: "Too many attempts. Please try again later." }, { status: 429 });
    }

    const recentUnverified = await prisma.user.count({
      where: { emailVerified: null, createdAt: { gte: new Date(Date.now() - GLOBAL_WINDOW_MS) } },
    });
    if (recentUnverified >= GLOBAL_MAX_UNVERIFIED) {
      return NextResponse.json(
        { message: "Sign-ups are temporarily busy. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, password } = schema.parse(body);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ message: "An account with this email already exists" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: { name, email, password: hashed, role: "CUSTOMER" },
    });

    // Delete any existing verification tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { identifier: `verify:${email}` },
    });

    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.verificationToken.create({
      data: { identifier: `verify:${email}`, token, expires },
    });

    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`;
    const emailResult = await sendEmailVerificationEmail(email, name, verifyUrl);
    console.log("[register] Resend result:", JSON.stringify(emailResult));

    return NextResponse.json(
      { message: "Account created. Please check your email to verify your account." },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid data", errors: err.issues }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
