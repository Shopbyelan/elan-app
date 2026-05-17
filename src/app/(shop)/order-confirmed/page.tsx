import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Order Confirmed — ÉLAN" };

export default async function OrderConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <CheckCircle className="h-16 w-16 text-[#C9A84C] mb-6" strokeWidth={1} />

      <p className="font-sans text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase mb-3">
        Order Confirmed
      </p>
      <h1 className="font-serif text-3xl md:text-4xl text-white mb-4">
        Thank you for your order
      </h1>

      {ref && (
        <p className="font-sans text-sm text-[#5A5A5A] mb-2">
          Order reference: <span className="text-[#9A9A9A] font-mono">{ref}</span>
        </p>
      )}

      <p className="font-sans text-sm text-[#5A5A5A] max-w-md leading-relaxed mb-10">
        Your payment was successful. You will receive a confirmation on your email shortly.
        Our team will begin processing your order right away.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="gold" asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/login">Sign in to track your order</Link>
        </Button>
      </div>
    </div>
  );
}
