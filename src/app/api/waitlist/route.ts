import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/waitlist?productId=xxx  → check if on waitlist
// GET /api/waitlist                → list all entries for current user
export async function GET(req: NextRequest) {
  const session = await auth();
  const productId = req.nextUrl.searchParams.get("productId");

  if (!session?.user?.id) {
    if (productId) return NextResponse.json({ joined: false });
    return NextResponse.json({ entries: [] });
  }

  if (productId) {
    const entry = await prisma.waitlistEntry.findFirst({
      where: { productId, userId: session.user.id },
    });
    return NextResponse.json({ joined: !!entry });
  }

  const entries = await prisma.waitlistEntry.findMany({
    where: { userId: session.user.id },
    include: {
      product: {
        include: { images: true, categories: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ entries });
}

// POST /api/waitlist  { productId, email? }
export async function POST(req: NextRequest) {
  const session = await auth();
  const { productId, email: guestEmail } = await req.json();

  if (!productId) {
    return NextResponse.json({ error: "productId required" }, { status: 400 });
  }

  const email = session?.user?.email ?? guestEmail;
  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true, stock: true, name: true },
  });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  if (product.stock > 0) {
    return NextResponse.json({ error: "Product is currently in stock" }, { status: 400 });
  }

  try {
    const entry = await prisma.waitlistEntry.create({
      data: {
        email,
        productId,
        userId: session?.user?.id ?? null,
      },
    });
    return NextResponse.json({ entry }, { status: 201 });
  } catch {
    // Unique constraint violation — already on waitlist
    return NextResponse.json({ error: "Already on the waiting list" }, { status: 409 });
  }
}

// DELETE /api/waitlist?productId=xxx  (auth required)
export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in to leave the waiting list" }, { status: 401 });
  }

  const productId = req.nextUrl.searchParams.get("productId");
  if (!productId) {
    return NextResponse.json({ error: "productId required" }, { status: 400 });
  }

  await prisma.waitlistEntry.deleteMany({
    where: { productId, userId: session.user.id },
  });
  return NextResponse.json({ ok: true });
}
