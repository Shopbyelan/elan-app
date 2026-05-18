import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Package, Users, TrendingUp, AlertCircle } from "lucide-react";
import Link from "next/link";

async function getStats() {
  try {
    const [totalOrders, totalProducts, totalCustomers, revenue, pendingOrders, lowStock] =
      await Promise.all([
        prisma.order.count(),
        prisma.product.count({ where: { isActive: true } }),
        prisma.user.count({ where: { role: "CUSTOMER" } }),
        prisma.transaction.aggregate({
          where: { status: "SUCCESS" },
          _sum: { amount: true },
        }),
        prisma.order.count({ where: { status: "PENDING" } }),
        prisma.product.findMany({
          where: { stock: { lte: 5 }, isActive: true },
          select: { id: true, name: true, stock: true },
          take: 5,
        }),
      ]);
    return {
      totalOrders,
      totalProducts,
      totalCustomers,
      revenue: revenue._sum.amount || 0,
      pendingOrders,
      lowStock,
    };
  } catch {
    return {
      totalOrders: 0,
      totalProducts: 0,
      totalCustomers: 0,
      revenue: 0,
      pendingOrders: 0,
      lowStock: [],
    };
  }
}

async function getRecentOrders() {
  try {
    return await prisma.order.findMany({
      include: { user: { select: { name: true, email: true } }, transaction: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
  } catch {
    return [];
  }
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "text-amber-400 bg-amber-400/10",
  CONFIRMED: "text-blue-400 bg-blue-400/10",
  PROCESSING: "text-purple-400 bg-purple-400/10",
  SHIPPED: "text-cyan-400 bg-cyan-400/10",
  DELIVERED: "text-emerald-400 bg-emerald-400/10",
  CANCELLED: "text-red-400 bg-red-400/10",
};

export default async function AdminDashboard() {
  const [stats, recentOrders] = await Promise.all([getStats(), getRecentOrders()]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-white">Dashboard</h1>
        <p className="font-sans text-sm text-[#5A5A5A] mt-1">
          Welcome to the Élan admin panel
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Revenue", value: formatPrice(stats.revenue), icon: TrendingUp, color: "text-[#85A0B5]" },
          { label: "Total Orders", value: stats.totalOrders.toString(), icon: ShoppingCart, color: "text-blue-400" },
          { label: "Active Products", value: stats.totalProducts.toString(), icon: Package, color: "text-purple-400" },
          { label: "Customers", value: stats.totalCustomers.toString(), icon: Users, color: "text-emerald-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[#111] border border-[#1A1A1A] p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="font-sans text-[10px] tracking-[0.2em] text-[#5A5A5A] uppercase">{label}</p>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
            <p className={`font-serif text-2xl ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-[#111] border border-[#1A1A1A]">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A]">
            <h2 className="font-serif text-lg text-white">Recent Orders</h2>
            <Link href="/admin/orders" className="font-sans text-[10px] tracking-[0.15em] text-[#85A0B5] uppercase hover:text-[#9DB5C8]">
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1A1A1A]">
                  {["Order", "Customer", "Amount", "Status"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left font-sans text-[9px] tracking-[0.2em] text-[#5A5A5A] uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#141414]">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#141414] transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/orders/${order.id}`} className="font-sans text-xs text-[#85A0B5] hover:underline">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-sans text-xs text-[#9A9A9A]">
                      {order.user?.name || order.user?.email || "—"}
                    </td>
                    <td className="px-6 py-4 font-sans text-xs text-white">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-0.5 font-sans text-[9px] tracking-wider rounded-sm ${STATUS_COLORS[order.status] || "text-[#9A9A9A] bg-[#1A1A1A]"}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center font-sans text-sm text-[#5A5A5A]">
                      No orders yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alerts */}
        <div className="space-y-4">
          {/* Pending orders alert */}
          {stats.pendingOrders > 0 && (
            <div className="bg-[#111] border border-amber-800/40 p-5">
              <div className="flex items-center gap-3 mb-3">
                <AlertCircle className="h-4 w-4 text-amber-400" />
                <h3 className="font-sans text-xs tracking-[0.15em] text-amber-400 uppercase">Pending Orders</h3>
              </div>
              <p className="font-serif text-2xl text-white mb-3">{stats.pendingOrders}</p>
              <Link href="/admin/orders?status=PENDING" className="font-sans text-[10px] tracking-[0.15em] text-[#85A0B5] uppercase hover:text-[#9DB5C8]">
                Review orders →
              </Link>
            </div>
          )}

          {/* Low stock */}
          {stats.lowStock.length > 0 && (
            <div className="bg-[#111] border border-[#1A1A1A] p-5">
              <h3 className="font-sans text-[10px] tracking-[0.2em] text-[#5A5A5A] uppercase mb-4">
                Low Stock Alert
              </h3>
              <div className="space-y-3">
                {stats.lowStock.map((p) => (
                  <div key={p.id} className="flex items-center justify-between">
                    <span className="font-sans text-xs text-[#9A9A9A] truncate max-w-32">{p.name}</span>
                    <span className={`font-sans text-xs font-medium ${p.stock === 0 ? "text-red-400" : "text-amber-400"}`}>
                      {p.stock === 0 ? "Out" : `${p.stock} left`}
                    </span>
                  </div>
                ))}
              </div>
              <Link href="/admin/products" className="mt-4 block font-sans text-[10px] tracking-[0.15em] text-[#85A0B5] uppercase hover:text-[#9DB5C8]">
                Manage inventory →
              </Link>
            </div>
          )}

          {/* Quick actions */}
          <div className="bg-[#111] border border-[#1A1A1A] p-5">
            <h3 className="font-sans text-[10px] tracking-[0.2em] text-[#5A5A5A] uppercase mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { href: "/admin/products/new", label: "Add New Product" },
                { href: "/admin/categories", label: "Manage Categories" },
                { href: "/admin/coupons/new", label: "Create Coupon" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="block px-3 py-2.5 font-sans text-xs text-[#9A9A9A] hover:text-[#85A0B5] hover:bg-[#141414] transition-all"
                >
                  + {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
