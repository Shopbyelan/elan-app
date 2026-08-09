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
          <Link href="/admin/orders" className="inline-flex items-center gap-1.5 font-sans text-[12px] tracking-[0.2em] text-[#9A9A9A] uppercase hover:text-[#3A5A78] transition-colors mb-3">
            <ArrowLeft className="h-3 w-3" /> All Orders
          </Link>
          <h1 className="font-serif text-3xl text-[#0A0A0A]">{order.orderNumber}</h1>
          <p className="font-sans text-sm text-[#9A9A9A] mt-1">{formatDate(order.createdAt)}</p>
        </div>
        <span className={`inline-flex items-center px-3 py-1 font-sans text-[12px] tracking-wider border ${STATUS_COLORS[order.status] || "text-[#6B6B6B] bg-[#F7F5F2] border-[#E4E1DA]"}`}>
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">

          {/* Items */}
          <div className="bg-[#FFFFFF] border border-[#E4E1DA] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E4E1DA] flex items-center gap-2">
              <Package className="h-4 w-4 text-[#3A5A78]" />
              <h2 className="font-serif text-lg text-[#0A0A0A]">Items Ordered</h2>
            </div>
            <div className="divide-y divide-[#E4E1DA]">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                  <div className="relative w-14 h-14 flex-shrink-0 bg-[#F7F5F2]">
                    {item.productImg && (
                      <Image src={item.productImg} alt={item.productName} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm text-[#3A3A3A]">{item.productName}</p>
                    <p className="font-sans text-[12px] text-[#9A9A9A] mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-sans text-sm text-[#3A5A78] flex-shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 border-t border-[#E4E1DA] space-y-2 bg-[#F7F5F2]">
              <div className="flex justify-between font-sans text-xs text-[#6B6B6B]">
                <span>Subtotal</span><span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between font-sans text-xs text-[#6B6B6B]">
                <span>Delivery</span><span>{formatPrice(order.deliveryFee)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between font-sans text-xs text-emerald-400">
                  <span>Discount {order.coupon ? `(${order.coupon.code})` : ""}</span>
                  <span>−{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between font-serif text-base text-[#3A5A78] pt-2 border-t border-[#E4E1DA]">
                <span>Total</span><span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Shipping address */}
          <div className="bg-[#FFFFFF] border border-[#E4E1DA]">
            <div className="px-5 py-4 border-b border-[#E4E1DA] flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#3A5A78]" />
              <h2 className="font-serif text-lg text-[#0A0A0A]">Shipping Address</h2>
            </div>
            <div className="px-5 py-4 font-sans text-sm space-y-1">
              {order.address ? (
                <>
                  <p className="text-[#3A3A3A] font-medium">{order.address.firstName} {order.address.lastName}</p>
                  <p className="text-[#6B6B6B]">{order.address.address}</p>
                  <p className="text-[#6B6B6B]">{order.address.city}, {order.address.state}</p>
                  <p className="text-[#6B6B6B]">{order.address.country}</p>
                  <p className="text-[#3A5A78] mt-2">{order.address.phone}</p>
                </>
              ) : (
                <p className="text-[#9A9A9A]">No address on record</p>
              )}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">

          {/* Customer */}
          <div className="bg-[#FFFFFF] border border-[#E4E1DA]">
            <div className="px-5 py-4 border-b border-[#E4E1DA] flex items-center gap-2">
              <User className="h-4 w-4 text-[#3A5A78]" />
              <h2 className="font-serif text-lg text-[#0A0A0A]">Customer</h2>
            </div>
            <div className="px-5 py-4 space-y-2 font-sans text-sm">
              <p className="text-[#3A3A3A]">{customerName}</p>
              <p className="text-[#6B6B6B] break-all">{customerEmail}</p>
              <p className="text-[#3A5A78]">{customerPhone}</p>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-[#FFFFFF] border border-[#E4E1DA]">
            <div className="px-5 py-4 border-b border-[#E4E1DA] flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-[#3A5A78]" />
              <h2 className="font-serif text-lg text-[#0A0A0A]">Payment</h2>
            </div>
            <div className="px-5 py-4 space-y-2 font-sans text-sm">
              <div className="flex justify-between">
                <span className="text-[#9A9A9A]">Status</span>
                <span className={order.transaction?.status === "SUCCESS" ? "text-emerald-400" : order.transaction?.status === "FAILED" ? "text-red-400" : "text-amber-400"}>
                  {order.transaction?.status || "PENDING"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9A9A9A]">Gateway</span>
                <span className="text-[#6B6B6B] capitalize">{order.transaction?.gateway || "Paystack"}</span>
              </div>
              {order.transaction?.reference && (
                <p className="text-[#9A9A9A] text-[12px] font-mono break-all pt-1">{order.transaction.reference}</p>
              )}
            </div>
          </div>

          {/* Manage order */}
          <div className="bg-[#FFFFFF] border border-[#E4E1DA]">
            <div className="px-5 py-4 border-b border-[#E4E1DA]">
              <h2 className="font-serif text-lg text-[#0A0A0A]">Manage Order</h2>
            </div>
            <form action={updateOrderStatus} className="px-5 py-4 space-y-4">
              <input type="hidden" name="id" value={order.id} />

              <div>
                <label className="block font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">Status</label>
                <select name="status" defaultValue={order.status} className="w-full h-10 px-3 bg-[#F7F5F2] border border-[#E4E1DA] text-[#3A3A3A] font-sans text-sm focus:outline-none focus:border-[#3A5A78] appearance-none transition-colors">
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">Tracking Number</label>
                <input
                  name="trackingNumber"
                  defaultValue={order.trackingNumber || ""}
                  placeholder="e.g. GIG-123456"
                  className="w-full h-10 px-3 bg-[#F7F5F2] border border-[#E4E1DA] text-[#3A3A3A] font-sans text-sm focus:outline-none focus:border-[#3A5A78] transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">Notes</label>
                <textarea
                  name="notes"
                  defaultValue={order.notes || ""}
                  rows={3}
                  placeholder="Internal notes..."
                  className="w-full px-3 py-2 bg-[#F7F5F2] border border-[#E4E1DA] text-[#3A3A3A] font-sans text-sm focus:outline-none focus:border-[#3A5A78] transition-colors resize-none"
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
