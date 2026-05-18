import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";
import { updateOrderStatus } from "@/actions/order.actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Package, MapPin, User, CreditCard, ArrowLeft } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "text-amber-400 bg-amber-400/10 border-amber-800/30",
  CONFIRMED: "text-blue-400 bg-blue-400/10 border-blue-800/30",
  PROCESSING: "text-purple-400 bg-purple-400/10 border-purple-800/30",
  SHIPPED: "text-cyan-400 bg-cyan-400/10 border-cyan-800/30",
  DELIVERED: "text-emerald-400 bg-emerald-400/10 border-emerald-800/30",
  CANCELLED: "text-red-400 bg-red-400/10 border-red-800/30",
};

const STATUSES = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

async function getOrder(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true, phone: true } },
      address: true,
      items: { include: { product: { select: { slug: true } } } },
      transaction: true,
      coupon: { select: { code: true, discountType: true, discountValue: true } },
    },
  });
}

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) notFound();

  const customerName = order.address
    ? `${order.address.firstName} ${order.address.lastName}`
    : order.user?.name || "—";
  const customerPhone = order.address?.phone || order.user?.phone || "—";
  const customerEmail = order.user?.email || "—";

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <Link href="/admin/orders" className="inline-flex items-center gap-1.5 font-sans text-[10px] tracking-[0.2em] text-[#5A5A5A] uppercase hover:text-[#85A0B5] transition-colors mb-3">
            <ArrowLeft className="h-3 w-3" /> All Orders
          </Link>
          <h1 className="font-serif text-3xl text-white">{order.orderNumber}</h1>
          <p className="font-sans text-sm text-[#5A5A5A] mt-1">{formatDate(order.createdAt)}</p>
        </div>
        <span className={`inline-flex items-center px-3 py-1 font-sans text-[10px] tracking-wider border ${STATUS_COLORS[order.status] || "text-[#9A9A9A] bg-[#1A1A1A] border-[#2A2A2A]"}`}>
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Items */}
          <div className="bg-[#111] border border-[#1A1A1A] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#1A1A1A] flex items-center gap-2">
              <Package className="h-4 w-4 text-[#85A0B5]" />
              <h2 className="font-serif text-lg text-white">Items Ordered</h2>
            </div>
            <div className="divide-y divide-[#141414]">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                  <div className="relative w-14 h-14 flex-shrink-0 bg-[#1A1A1A]">
                    {item.productImg && (
                      <Image src={item.productImg} alt={item.productName} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm text-white">{item.productName}</p>
                    <p className="font-sans text-[10px] text-[#5A5A5A] mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-sans text-sm text-[#85A0B5] flex-shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-[#1A1A1A] space-y-2 bg-[#0D0D0D]">
              <div className="flex justify-between font-sans text-xs text-[#9A9A9A]">
                <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between font-sans text-xs text-[#9A9A9A]">
                <span>Delivery</span><span>{formatPrice(order.deliveryFee)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between font-sans text-xs text-emerald-400">
                  <span>Discount {order.coupon ? `(${order.coupon.code})` : ""}</span>
                  <span>−{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-serif text-base text-[#85A0B5] pt-2 border-t border-[#1A1A1A]">
                <span>Total</span><span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Shipping address */}
          <div className="bg-[#111] border border-[#1A1A1A]">
            <div className="px-5 py-4 border-b border-[#1A1A1A] flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#85A0B5]" />
              <h2 className="font-serif text-lg text-white">Shipping Address</h2>
            </div>
            <div className="px-5 py-4 font-sans text-sm space-y-1">
              {order.address ? (
                <>
                  <p className="text-white font-medium">{order.address.firstName} {order.address.lastName}</p>
                  <p className="text-[#9A9A9A]">{order.address.address}</p>
                  <p className="text-[#9A9A9A]">{order.address.city}, {order.address.state}</p>
                  <p className="text-[#9A9A9A]">{order.address.country}</p>
                  <p className="text-[#85A0B5] mt-2">{order.address.phone}</p>
                </>
              ) : (
                <p className="text-[#5A5A5A]">No address on record</p>
              )}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">

          {/* Customer */}
          <div className="bg-[#111] border border-[#1A1A1A]">
            <div className="px-5 py-4 border-b border-[#1A1A1A] flex items-center gap-2">
              <User className="h-4 w-4 text-[#85A0B5]" />
              <h2 className="font-serif text-lg text-white">Customer</h2>
            </div>
            <div className="px-5 py-4 space-y-2 font-sans text-sm">
              <p className="text-white">{customerName}</p>
              <p className="text-[#9A9A9A] break-all">{customerEmail}</p>
              <p className="text-[#85A0B5]">{customerPhone}</p>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-[#111] border border-[#1A1A1A]">
            <div className="px-5 py-4 border-b border-[#1A1A1A] flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-[#85A0B5]" />
              <h2 className="font-serif text-lg text-white">Payment</h2>
            </div>
            <div className="px-5 py-4 space-y-2 font-sans text-sm">
              <div className="flex justify-between">
                <span className="text-[#5A5A5A]">Status</span>
                <span className={order.transaction?.status === "SUCCESS" ? "text-emerald-400" : order.transaction?.status === "FAILED" ? "text-red-400" : "text-amber-400"}>
                  {order.transaction?.status || "PENDING"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A5A5A]">Gateway</span>
                <span className="text-[#9A9A9A] capitalize">{order.transaction?.gateway || "Paystack"}</span>
              </div>
              {order.transaction?.reference && (
                <p className="text-[#3A3A3A] text-[10px] font-mono break-all pt-1">{order.transaction.reference}</p>
              )}
            </div>
          </div>

          {/* Manage order */}
          <div className="bg-[#111] border border-[#1A1A1A]">
            <div className="px-5 py-4 border-b border-[#1A1A1A]">
              <h2 className="font-serif text-lg text-white">Manage Order</h2>
            </div>
            <form action={updateOrderStatus} className="px-5 py-4 space-y-4">
              <input type="hidden" name="id" value={order.id} />

              <div>
                <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Status</label>
                <select name="status" defaultValue={order.status} className="w-full h-10 px-3 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] appearance-none transition-colors">
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Tracking Number</label>
                <input
                  name="trackingNumber"
                  defaultValue={order.trackingNumber || ""}
                  placeholder="e.g. GIG-123456"
                  className="w-full h-10 px-3 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Notes</label>
                <textarea
                  name="notes"
                  defaultValue={order.notes || ""}
                  rows={3}
                  placeholder="Internal notes..."
                  className="w-full px-3 py-2 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors resize-none"
                />
              </div>

              <Button type="submit" variant="gold" size="md" className="w-full">
                Save Changes
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
