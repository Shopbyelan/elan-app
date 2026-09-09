import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { findValidCoupon, calculateDiscount } from "@/lib/coupon";

const schema = z.object({
  code: z.string().min(1),
  subtotal: z.number().positive(),
});

export async function POST(req: NextRequest) {
  try {
    const { code, subtotal } = schema.parse(await req.json());

    const coupon = await findValidCoupon(code);
    if (!coupon) {
      return NextResponse.json({ valid: false, message: "Invalid or expired coupon code" }, { status: 404 });
    }

    const discount = calculateDiscount(coupon, subtotal);
    return NextResponse.json({ valid: true, discount });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ valid: false, message: "Invalid request" }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ valid: false, message: "Something went wrong" }, { status: 500 });
  }
}
