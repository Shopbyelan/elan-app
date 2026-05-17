import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const fail = () =>
    NextResponse.redirect(new URL("/login?error=invalid-link", req.url));

  if (!token || !email) return fail();

  const record = await prisma.verificationToken.findFirst({
    where: {
      identifier: `verify:${email}`,
      token,
      expires: { gt: new Date() },
    },
  });

  if (!record) return fail();

  await prisma.$transaction([
    prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    }),
    prisma.verificationToken.deleteMany({
      where: { identifier: `verify:${email}` },
    }),
  ]);

  return NextResponse.redirect(new URL("/login?verified=true", req.url));
}
