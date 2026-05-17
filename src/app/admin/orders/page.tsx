import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import Link from "next/link";
import { updateOrderStatus } from "@/actions/order.actions";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "text-amber-400 bg-amber-400/10 border-amber-800/30",
  CONFIRMED: "text-blue-400 bg-blue-400/10 border-blue-800/30",
  PROCESSING: "text-purple-400 bg-purple-400/10 border-purple-800/30",
  SHIPPED: "text-cyan-400 bg-cyan-400/10 border-cyan-800/30",
  DELIVERED: "text-emerald-400 bg-emerald-400/10 border-emerald-800/30",
  CANCELLED: "text-red-400 bg-red-400/10 border-red-800/30",
};

const STATUSES = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

async function getOrders() {
  try {
    return await prisma.order.findMany({
      include: {
        user: { select: { name: true, email: true } },
        items: true,
        transaction: true,
        address: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-white">Orders</h1>
        <p className="font-sans text-sm text-[#5A5A5A] mt-1">{orders.length} total orders</p>
      </div>

      <div className="bg-[#111] border border-[#1A1A1A] overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1A1A1A]">
              {["Order", "Customer", "Items", "Total", "Payment", "Date", "Status", "Actions"].map((h) => (
                <th key={h} className="px-5 py-4 text-left font-sans text-[9px] tracking-[0.2em] text-[#5A5A5A] uppercase whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#141414]">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-[#141414] transition-colors">
                <td className="px-5 py-4">
                  <Link href={`/admin/orders/${order.id}`} className="font-sans text-xs text-[#C9A84C] hover:underline whitespace-nowrap">
                    {order.orderNumber}
                  </Link>
                </td>
                <td className="px-5 py-4">
                  <p className="font-sans text-xs text-white">{order.user?.name || "—"}</p>
                  <p className="font-sans text-[10px] text-[#5A5A5A]">{order.user?.email}</p>
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#9A9A9A]">
                  {order.items.length} piece{order.items.length !== 1 ? "s" : ""}
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#C9A84C] whitespace-nowrap">
                  {formatPrice(order.total)}
                </td>
                <td className="px-5 py-4">
                  <span className={`font-sans text-[9px] tracking-wider ${
                    order.transaction?.status === "SUCCESS" ? "text-emerald-400" :
                    order.transaction?.status === "FAILED" ? "text-red-400" :
                    "text-amber-400"
                  }`}>
                    {order.transaction?.status || "PENDING"}
                  </span>
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#9A9A9A] whitespace-nowrap">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 font-sans text-[9px] tracking-wider border ${STATUS_COLORS[order.status] || "text-[#9A9A9A] bg-[#1A1A1A] border-[#2A2A2A]"}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <form action={updateOrderStatus} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={order.id} />
                    <select name="status" defaultValue={order.status} className="bg-[#141414] border border-[#2A2A2A] text-[#9A9A9A] font-sans text-[10px] px-2 py-1 focus:outline-none focus:border-[#C9A84C] appearance-none">
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button type="submit" className="font-sans text-[10px] tracking-wider text-[#C9A84C] hover:text-[#D4AF6C] uppercase">
                      Update
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center font-sans text-sm text-[#5A5A5A]">
                  No orders yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
