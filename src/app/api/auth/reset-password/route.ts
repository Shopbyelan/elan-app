import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  token: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: NextRequest) {
  try {
    const { token, email, password } = schema.parse(await req.json());

    const record = await prisma.verificationToken.findFirst({
      where: {
        identifier: `reset:${email}`,
        token,
        expires: { gt: new Date() },
      },
    });

    if (!record) {
      return NextResponse.json({ message: "This reset link is invalid or has expired." }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 12);

    await prisma.$transaction([
      prisma.user.update({
        where: { email },
        data: { password: hashed, emailVerified: new Date() },
      }),
      prisma.verificationToken.deleteMany({
        where: { identifier: `reset:${email}` },
      }),
    ]);

    return NextResponse.json({ message: "Password updated successfully." });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
