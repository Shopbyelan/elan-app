import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPayment } from "@/lib/paystack";
import { confirmPaystackPayment } from "@/lib/order-confirmation";

export async function POST(req: NextRequest) {
  try {
    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json({ message: "Missing reference" }, { status: 400 });
    }

    // Verify with Paystack
    const result = await verifyPayment(reference);

    if (!result.status || result.data.status !== "success") {
      await prisma.transaction.updateMany({
        where: { reference, status: { not: "SUCCESS" } },
        data: { status: "FAILED", gatewayResponse: result.data.gateway_response },
      });
      return NextResponse.json({ message: "Payment verification failed" }, { status: 400 });
    }

    const confirmation = await confirmPaystackPayment({
      reference,
      gatewayResponse: result.data.gateway_response,
      paidAt: result.data.paid_at,
      customerEmail: result.data.customer.email,
    });

    if (!confirmation.ok) {
      return NextResponse.json({ message: "Unknown transaction" }, { status: 404 });
    }

    return NextResponse.json({ message: "Payment verified", status: "success" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Verification error" }, { status: 500 });
  }
}
