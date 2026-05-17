import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import { sendEmailVerificationEmail } from "@/lib/resend";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
  try {
    const { email } = schema.parse(await req.json());

    const user = await prisma.user.findUnique({ where: { email } });

    // Always return success to avoid email enumeration
    if (!user || user.emailVerified) {
      return NextResponse.json({ message: "If that email is registered and unverified, a new link has been sent." });
    }

    await prisma.verificationToken.deleteMany({
      where: { identifier: `verify:${email}` },
    });

    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: { identifier: `verify:${email}`, token, expires },
    });

    const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`;
    sendEmailVerificationEmail(email, user.name || "there", verifyUrl).catch(console.error);

    return NextResponse.json({ message: "Verification email sent." });
  } catch {
    return NextResponse.json({ message: "If that email is registered and unverified, a new link has been sent." });
  }
}
