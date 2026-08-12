import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ subscribed: false });
  }

  const existing = await prisma.newsletter.findUnique({
    where: { email: session.user.email },
  });

  return NextResponse.json({ subscribed: !!existing });
}
