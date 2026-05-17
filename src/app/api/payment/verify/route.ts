import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPayment } from "@/lib/paystack";
import { sendOrderConfirmationEmail } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const { reference, orderId } = await req.json();

    if (!reference || !orderId) {
      return NextResponse.json({ message: "Missing reference or orderId" }, { status: 400 });
    }

    // Verify with Paystack
    const result = await verifyPayment(reference);

    if (!result.status || result.data.status !== "success") {
      await prisma.transaction.update({
        where: { reference },
        data: { status: "FAILED", gatewayResponse: result.data.gateway_response },
      });
      return NextResponse.json({ message: "Payment verification failed" }, { status: 400 });
    }

    // Update transaction and order
    await prisma.$transaction([
      prisma.transaction.update({
        where: { reference },
        data: {
          status: "SUCCESS",
          gatewayResponse: result.data.gateway_response,
          paidAt: new Date(result.data.paid_at),
        },
      }),
      prisma.order.update({
        where: { id: orderId },
        data: { status: "CONFIRMED" },
      }),
    ]);

    // Fetch order for email
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { user: true, address: true },
    });

    if (order) {
      const recipientName =
        order.address
          ? `${order.address.firstName} ${order.address.lastName}`.trim()
          : order.user?.name || "Valued Client";
      const isGuest = !order.user || !order.user.password;

      sendOrderConfirmationEmail(
        result.data.customer.email,
        recipientName,
        order.orderNumber,
        order.total,
        isGuest
      ).catch(console.error);
    }

    return NextResponse.json({ message: "Payment verified", status: "success" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Verification error" }, { status: 500 });
  }
}
