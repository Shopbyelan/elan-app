import { prisma } from "@/lib/prisma";

export function findValidCoupon(code: string) {
  return prisma.coupon.findUnique({ where: { code, isActive: true } });
}

export function calculateDiscount(
  coupon: { discountType: string; discountValue: number },
  subtotal: number
) {
  const raw =
    coupon.discountType === "PERCENTAGE"
      ? (subtotal * coupon.discountValue) / 100
      : coupon.discountValue;
  return Math.min(raw, subtotal);
}
