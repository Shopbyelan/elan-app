import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createCoupon } from "@/actions/coupon.actions";

export default function NewCouponPage() {
  return (
    <div className="max-w-xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-white">New Coupon</h1>
          <p className="font-sans text-sm text-[#5A5A5A] mt-1">Create a discount code</p>
        </div>
        <Button variant="ghost" asChild>
          <Link href="/admin/coupons">← Back</Link>
        </Button>
      </div>

      <form action={createCoupon} className="space-y-6">
        <div className="bg-[#111] border border-[#1A1A1A] p-6 space-y-5">
          <h2 className="font-serif text-lg text-white">Coupon Details</h2>

          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">
              Coupon Code *
            </label>
            <input
              name="code"
              required
              className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#C9A84C] transition-colors uppercase placeholder:normal-case"
              placeholder="WELCOME10"
            />
            <p className="mt-1.5 font-sans text-[10px] text-[#5A5A5A]">Will be auto-uppercased. Share this with customers.</p>
          </div>

          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">
              Description
            </label>
            <input
              name="description"
              className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
              placeholder="New customer welcome discount"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">
                Discount Type *
              </label>
              <select
                name="discountType"
                required
                className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#C9A84C] transition-colors appearance-none"
              >
                <option value="PERCENTAGE">Percentage (%)</option>
                <option value="FIXED">Fixed Amount (₦)</option>
              </select>
            </div>
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">
                Discount Value *
              </label>
              <input
                name="discountValue"
                type="number"
                step="0.01"
                min="0"
                required
                className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="10"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">
                Min. Order Amount (₦)
              </label>
              <input
                name="minOrderAmount"
                type="number"
                step="0.01"
                min="0"
                className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="50000"
              />
            </div>
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">
                Max Uses
              </label>
              <input
                name="maxUses"
                type="number"
                min="1"
                className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
                placeholder="100"
              />
            </div>
          </div>

          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">
              Expiry Date
            </label>
            <input
              name="expiresAt"
              type="date"
              className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#C9A84C] transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" variant="gold" size="lg">
            Create Coupon
          </Button>
          <Button type="button" variant="ghost" size="lg" asChild>
            <Link href="/admin/coupons">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
