import { prisma } from "@/lib/prisma";
import { formatDate, formatPrice } from "@/lib/utils";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toggleCoupon } from "@/actions/coupon.actions";

async function getCoupons() {
  try {
    return await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    return [];
  }
}

export default async function AdminCouponsPage() {
  const coupons = await getCoupons();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-white">Coupons</h1>
          <p className="font-sans text-sm text-[#5A5A5A] mt-1">{coupons.length} discount codes</p>
        </div>
        <Button variant="gold" asChild>
          <Link href="/admin/coupons/new">
            <Plus className="h-4 w-4" /> New Coupon
          </Link>
        </Button>
      </div>

      <div className="bg-[#111] border border-[#1A1A1A] overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1A1A1A]">
              {["Code", "Discount", "Min. Order", "Uses", "Expires", "Status", "Action"].map((h) => (
                <th key={h} className="px-5 py-4 text-left font-sans text-[9px] tracking-[0.2em] text-[#5A5A5A] uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#141414]">
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="hover:bg-[#141414] transition-colors">
                <td className="px-5 py-4">
                  <span className="font-sans text-xs text-[#C9A84C] font-mono tracking-wider bg-[#C9A84C]/10 px-2 py-0.5">
                    {coupon.code}
                  </span>
                </td>
                <td className="px-5 py-4 font-sans text-xs text-white">
                  {coupon.discountType === "PERCENTAGE"
                    ? `${coupon.discountValue}%`
                    : formatPrice(coupon.discountValue)}
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#9A9A9A]">
                  {coupon.minOrderAmount ? formatPrice(coupon.minOrderAmount) : "—"}
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#9A9A9A]">
                  {coupon.usedCount}{coupon.maxUses ? ` / ${coupon.maxUses}` : ""}
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#9A9A9A]">
                  {coupon.expiresAt ? formatDate(coupon.expiresAt) : "No expiry"}
                </td>
                <td className="px-5 py-4">
                  <Badge variant={coupon.isActive ? "green" : "dark"}>
                    {coupon.isActive ? "Active" : "Disabled"}
                  </Badge>
                </td>
                <td className="px-5 py-4">
                  <form action={toggleCoupon}>
                    <input type="hidden" name="id" value={coupon.id} />
                    <input type="hidden" name="isActive" value={String(!coupon.isActive)} />
                    <button type="submit" className={`font-sans text-[10px] tracking-wider uppercase transition-colors ${coupon.isActive ? "text-red-400 hover:text-red-300" : "text-emerald-400 hover:text-emerald-300"}`}>
                      {coupon.isActive ? "Disable" : "Enable"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center font-sans text-sm text-[#5A5A5A]">
                  No coupons yet.{" "}
                  <Link href="/admin/coupons/new" className="text-[#C9A84C] hover:underline">Create one →</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
