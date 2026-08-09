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
        <h1 className="font-serif text-3xl text-[#0A0A0A]">Orders</h1>
        <p className="font-sans text-sm text-[#9A9A9A] mt-1">{orders.length} total orders</p>
      </div>

      <div className="bg-[#FFFFFF] border border-[#E4E1DA] overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E4E1DA]">
              {["Order", "Customer", "Items", "Total", "Payment", "Date", "Status", "Actions"].map((h) => (
                <th key={h} className="px-5 py-4 text-left font-sans text-[11px] tracking-[0.2em] text-[#9A9A9A] uppercase whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4E1DA]">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-[#F7F5F2] transition-colors">
                <td className="px-5 py-4">
                  <Link href={`/admin/orders/${order.id}`} className="font-sans text-xs text-[#3A5A78] hover:underline whitespace-nowrap">
                    {order.orderNumber}
                  </Link>
                </td>
                <td className="px-5 py-4">
                  <p className="font-sans text-xs text-[#3A3A3A]">{order.user?.name || "—"}</p>
                  <p className="font-sans text-[12px] text-[#9A9A9A]">{order.user?.email}</p>
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#6B6B6B]">
                  {order.items.length} piece{order.items.length !== 1 ? "s" : ""}
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#3A5A78] whitespace-nowrap">
                  {formatPrice(order.total)}
                </td>
                <td className="px-5 py-4">
                  <span className={`font-sans text-[11px] tracking-wider ${
                    order.transaction?.status === "SUCCESS" ? "text-emerald-400" :
                    order.transaction?.status === "FAILED" ? "text-red-400" :
                    "text-amber-400"
                  }`}>
                    {order.transaction?.status || "PENDING"}
                  </span>
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#6B6B6B] whitespace-nowrap">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 font-sans text-[11px] tracking-wider border ${STATUS_COLORS[order.status] || "text-[#6B6B6B] bg-[#F7F5F2] border-[#E4E1DA]"}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <form action={updateOrderStatus} className="flex items-center gap-2">
                    <input type="hidden" name="id" value={order.id} />
                    <select name="status" defaultValue={order.status} className="bg-[#F7F5F2] border border-[#E4E1DA] text-[#6B6B6B] font-sans text-[12px] px-2 py-1 focus:outline-none focus:border-[#3A5A78] appearance-none">
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button type="submit" className="font-sans text-[12px] tracking-wider text-[#3A5A78] hover:text-[#9DB5C8] uppercase">
                      Update
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center font-sans text-sm text-[#9A9A9A]">
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
