import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/resend";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

const OK = NextResponse.json({ message: "If an account exists, a reset link has been sent." });

export async function POST(req: NextRequest) {
  try {
    const { email } = schema.parse(await req.json());

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) return OK; // Google-only accounts can't reset password

    await prisma.verificationToken.deleteMany({
      where: { identifier: `reset:${email}` },
    });

    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.verificationToken.create({
      data: { identifier: `reset:${email}`, token, expires },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
    sendPasswordResetEmail(email, resetUrl).catch(console.error);

    return OK;
  } catch {
    return OK;
  }
}
