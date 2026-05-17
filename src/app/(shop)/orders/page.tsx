import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import Link from "next/link";
import { Package } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "text-amber-400",
  CONFIRMED: "text-blue-400",
  PROCESSING: "text-purple-400",
  SHIPPED: "text-cyan-400",
  DELIVERED: "text-emerald-400",
  CANCELLED: "text-red-400",
};

async function getOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: { items: true, address: true, transaction: true },
    orderBy: { createdAt: "desc" },
  });
}

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  let orders: Awaited<ReturnType<typeof getOrders>> = [];
  try {
    orders = await getOrders(session.user.id);
  } catch {
    // ignore
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="mb-10">
        <p className="font-sans text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase mb-2">
          My Orders
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-white">
          Order History
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="py-24 text-center">
          <Package className="h-16 w-16 text-[#2A2A2A] mx-auto mb-8" />
          <h2 className="font-serif text-2xl text-[#5A5A5A] mb-4">No orders yet</h2>
          <p className="font-sans text-sm text-[#3A3A3A] mb-10">
            Your order history will appear here.
          </p>
          <Button variant="gold" asChild>
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-[#111] border border-[#1A1A1A] p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <p className="font-sans text-[10px] tracking-[0.2em] text-[#C9A84C] uppercase mb-1">
                    {order.orderNumber}
                  </p>
                  <p className="font-sans text-xs text-[#5A5A5A]">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`font-sans text-xs font-medium ${STATUS_COLORS[order.status] || "text-[#9A9A9A]"}`}>
                    {order.status}
                  </span>
                  <span className="font-serif text-lg text-[#C9A84C]">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>
              <div className="border-t border-[#141414] pt-4">
                <p className="font-sans text-xs text-[#5A5A5A] mb-2">
                  {order.items.length} piece{order.items.length !== 1 ? "s" : ""}
                </p>
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item) => (
                    <span key={item.id} className="font-sans text-xs text-[#9A9A9A]">
                      {item.productName} × {item.quantity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
