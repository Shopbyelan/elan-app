import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Records anonymous wishlist saves so the product page can show a genuine
// "saved N times this week" count. Failures are swallowed: this is analytics,
// and must never break the wishlist toggle on the client.

function parse(body: unknown): { productId: string; visitorId: string } | null {
  if (!body || typeof body !== "object") return null;
  const { productId, visitorId } = body as Record<string, unknown>;
  if (typeof productId !== "string" || typeof visitorId !== "string") return null;
  if (!productId || productId.length > 64 || !visitorId || visitorId.length > 64) return null;
  return { productId, visitorId };
}

// POST /api/product-saves  { productId, visitorId }
export async function POST(req: NextRequest) {
  const data = parse(await req.json().catch(() => null));
  if (!data) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  try {
    await prisma.productSave.upsert({
      where: { productId_visitorId: data },
      create: data,
      update: {},
    });
  } catch {
    // ignore — unknown product id, or table not yet pushed
  }
  return NextResponse.json({ ok: true });
}

// DELETE /api/product-saves  { productId, visitorId }
export async function DELETE(req: NextRequest) {
  const data = parse(await req.json().catch(() => null));
  if (!data) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  try {
    await prisma.productSave.deleteMany({ where: data });
  } catch {
    // ignore
  }
  return NextResponse.json({ ok: true });
}
