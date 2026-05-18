import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendWaitlistNotificationEmail } from "@/lib/resend";

// POST /api/admin/waitlist/notify  { productId }
export async function POST(req: NextRequest) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { productId } = await req.json();
  if (!productId) {
    return NextResponse.json({ error: "productId required" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true, name: true, slug: true, stock: true },
  });
  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  // Fetch all un-notified entries for this product
  const entries = await prisma.waitlistEntry.findMany({
    where: { productId, notified: false },
    select: { id: true, email: true },
  });

  if (entries.length === 0) {
    return NextResponse.json({ notified: 0, message: "No pending waitlist entries" });
  }

  const productUrl = `${process.env.NEXT_PUBLIC_APP_URL}/product/${product.slug}`;

  // Send emails and mark as notified
  const results = await Promise.allSettled(
    entries.map((entry) =>
      sendWaitlistNotificationEmail(entry.email, product.name, productUrl),
    ),
  );

  const notifiedIds = entries
    .filter((_, i) => results[i].status === "fulfilled")
    .map((e) => e.id);

  if (notifiedIds.length > 0) {
    await prisma.waitlistEntry.updateMany({
      where: { id: { in: notifiedIds } },
      data: { notified: true },
    });
  }

  return NextResponse.json({ notified: notifiedIds.length, total: entries.length });
}
