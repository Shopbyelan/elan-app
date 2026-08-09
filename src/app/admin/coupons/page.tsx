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
          <h1 className="font-serif text-3xl text-[#0A0A0A]">Coupons</h1>
          <p className="font-sans text-sm text-[#9A9A9A] mt-1">{coupons.length} discount codes</p>
        </div>
        <Button variant="gold" asChild>
          <Link href="/admin/coupons/new">
            <Plus className="h-4 w-4" /> New Coupon
          </Link>
        </Button>
      </div>

      <div className="bg-[#FFFFFF] border border-[#E4E1DA] overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E4E1DA]">
              {["Code", "Discount", "Min. Order", "Uses", "Expires", "Status", "Action"].map((h) => (
                <th key={h} className="px-5 py-4 text-left font-sans text-[11px] tracking-[0.2em] text-[#9A9A9A] uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4E1DA]">
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="hover:bg-[#F7F5F2] transition-colors">
                <td className="px-5 py-4">
                  <span className="font-sans text-xs text-[#3A5A78] font-mono tracking-wider bg-[#85A0B5]/10 px-2 py-0.5">
                    {coupon.code}
                  </span>
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#3A3A3A]">
                  {coupon.discountType === "PERCENTAGE"
                    ? `${coupon.discountValue}%`
                    : formatPrice(coupon.discountValue)}
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#6B6B6B]">
                  {coupon.minOrderAmount ? formatPrice(coupon.minOrderAmount) : "—"}
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#6B6B6B]">
                  {coupon.usedCount}{coupon.maxUses ? ` / ${coupon.maxUses}` : ""}
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#6B6B6B]">
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
                    <button type="submit" className={`font-sans text-[12px] tracking-wider uppercase transition-colors ${coupon.isActive ? "text-red-400 hover:text-red-300" : "text-emerald-400 hover:text-emerald-300"}`}>
                      {coupon.isActive ? "Disable" : "Enable"}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center font-sans text-sm text-[#9A9A9A]">
                  No coupons yet.{" "}
                  <Link href="/admin/coupons/new" className="text-[#3A5A78] hover:underline">Create one →</Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
