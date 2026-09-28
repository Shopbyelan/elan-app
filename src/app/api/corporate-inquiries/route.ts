import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { corporateInquirySchema, generateInquiryReference } from "@/lib/corporate";
import {
  sendCorporateInquiryAdminEmail,
  sendCorporateInquiryConfirmationEmail,
} from "@/lib/resend";

const PER_IP_HOURLY_LIMIT = 5;

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// Reuses the ChatRateLimit counter table under its own key prefix so this
// form never eats into the chat widget's budget.
async function isRateLimited(ip: string): Promise<boolean> {
  const utcHour = new Date().toISOString().slice(0, 13);
  const id = `corporate:ip:${ip}:${utcHour}`;
  const bucket = await prisma.chatRateLimit.upsert({
    where: { id },
    create: { id, count: 1 },
    update: { count: { increment: 1 } },
  });
  return bucket.count > PER_IP_HOURLY_LIMIT;
}

// POST /api/corporate-inquiries — submit a bulk / corporate gifting request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot: real visitors never see or fill this field.
    if (body?.website) {
      return NextResponse.json({ reference: generateInquiryReference() }, { status: 201 });
    }

    const data = corporateInquirySchema.parse(body);

    if (await isRateLimited(getClientIp(req))) {
      return NextResponse.json(
        { message: "Too many requests. Please try again later or contact us directly." },
        { status: 429 },
      );
    }

    // Resolve product names server-side — never trust names from the client.
    const productIds = [...new Set(data.items.map((i) => i.productId))];
    const products = productIds.length
      ? await prisma.product.findMany({
          where: { id: { in: productIds }, isActive: true },
          select: { id: true, name: true },
        })
      : [];
    const nameById = new Map(products.map((p) => [p.id, p.name]));
    const items = data.items
      .filter((i) => nameById.has(i.productId))
      .map((i) => ({ productId: i.productId, productName: nameById.get(i.productId)!, quantity: i.quantity }));

    const session = await auth();

    const inquiry = await prisma.corporateInquiry.create({
      data: {
        reference: generateInquiryReference(),
        companyName: data.companyName,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone,
        jobTitle: data.jobTitle,
        occasion: data.occasion,
        totalQuantity: data.totalQuantity,
        budgetPerPiece: data.budgetPerPiece,
        deliveryDate: data.deliveryDate ? new Date(data.deliveryDate) : null,
        deliveryCity: data.deliveryCity,
        engraving: data.engraving,
        brandedPackaging: data.brandedPackaging,
        message: data.message,
        userId: session?.user?.id ?? null,
        items: { create: items },
      },
      include: { items: true },
    });

    // Awaited (not fire-and-forget) — serverless functions can be frozen as
    // soon as the response is sent. Email failures must not fail the request.
    const adminUrl = `${process.env.NEXT_PUBLIC_APP_URL}/admin/corporate/${inquiry.id}`;
    await Promise.all([
      sendCorporateInquiryConfirmationEmail(inquiry).catch(console.error),
      sendCorporateInquiryAdminEmail(inquiry, adminUrl).catch(console.error),
    ]);

    return NextResponse.json({ reference: inquiry.reference }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: err.issues[0]?.message ?? "Invalid request", issues: err.issues },
        { status: 400 },
      );
    }
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
