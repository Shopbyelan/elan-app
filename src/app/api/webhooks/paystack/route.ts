import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-paystack-signature");

  // Verify webhook signature
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(body);

  try {
    if (event.event === "charge.success") {
      const { reference } = event.data;
      const transaction = await prisma.transaction.findUnique({
        where: { reference },
      });

      if (transaction && transaction.status !== "SUCCESS") {
        await prisma.$transaction([
          prisma.transaction.update({
            where: { reference },
            data: {
              status: "SUCCESS",
              gatewayResponse: event.data.gateway_response,
              paidAt: new Date(event.data.paid_at),
            },
          }),
          prisma.order.update({
            where: { id: transaction.orderId },
            data: { status: "CONFIRMED" },
          }),
        ]);
      }
    }

    if (event.event === "refund.processed") {
      const { reference } = event.data;
      await prisma.transaction.update({
        where: { reference },
        data: { status: "REFUNDED" },
      });
    }
  } catch (err) {
    console.error("Webhook processing error:", err);
  }

  return NextResponse.json({ received: true });
}
