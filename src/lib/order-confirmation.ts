import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail, sendNewOrderAdminEmail } from "@/lib/resend";

interface ConfirmPaymentInput {
  reference: string;
  gatewayResponse: string;
  paidAt: string | Date;
  customerEmail: string;
}

type ConfirmPaymentResult =
  | { ok: false; reason: "not_found" }
  | { ok: true; alreadyProcessed: true }
  | { ok: true; alreadyProcessed: false };

/**
 * Marks a transaction/order as paid, emails the customer, and alerts the team.
 * Called from both the client-triggered verify route and the Paystack webhook,
 * whichever fires first — the conditional updateMany atomically claims the
 * SUCCESS transition so the other caller finds count === 0 and short-circuits,
 * guaranteeing the order is confirmed and the email sent exactly once.
 */
export async function confirmPaystackPayment({
  reference,
  gatewayResponse,
  paidAt,
  customerEmail,
}: ConfirmPaymentInput): Promise<ConfirmPaymentResult> {
  const transaction = await prisma.transaction.findUnique({ where: { reference } });
  if (!transaction) return { ok: false, reason: "not_found" };

  const { count } = await prisma.transaction.updateMany({
    where: { reference, status: { not: "SUCCESS" } },
    data: {
      status: "SUCCESS",
      gatewayResponse,
      paidAt: new Date(paidAt),
    },
  });

  if (count === 0) {
    return { ok: true, alreadyProcessed: true };
  }

  const order = await prisma.order.update({
    where: { id: transaction.orderId },
    data: { status: "CONFIRMED" },
    include: { user: true, address: true, items: true },
  });

  const recipientName = order.address
    ? `${order.address.firstName} ${order.address.lastName}`.trim()
    : order.user?.name || "Valued Client";
  const isGuest = !order.user || !order.user.password;

  sendOrderConfirmationEmail(customerEmail, recipientName, order.orderNumber, order.total, isGuest).catch(
    console.error
  );

  sendNewOrderAdminEmail({
    orderId: order.id,
    orderNumber: order.orderNumber,
    subtotal: order.subtotal,
    deliveryFee: order.deliveryFee,
    discount: order.discount,
    total: order.total,
    notes: order.notes,
    customer: {
      name: recipientName,
      email: customerEmail,
      phone: order.address?.phone ?? order.user?.phone,
    },
    address: order.address,
    items: order.items,
  }).catch(console.error);

  return { ok: true, alreadyProcessed: false };
}
