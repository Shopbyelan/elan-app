import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { confirmPaystackPayment } from "@/lib/order-confirmation";

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
      await confirmPaystackPayment({
        reference: event.data.reference,
        gatewayResponse: event.data.gateway_response,
        paidAt: event.data.paid_at,
        customerEmail: event.data.customer.email,
      });
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
