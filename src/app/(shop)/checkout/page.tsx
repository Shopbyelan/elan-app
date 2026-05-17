"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCartStore } from "@/store/cart.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";
import { getDeliveryFee, NIGERIAN_STATES } from "@/types";
import { toast } from "sonner";

const STATE_OPTIONS = NIGERIAN_STATES.map((s) => ({ value: s, label: s }));

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  couponCode: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, totalPrice, clearCart } = useCartStore();
  const [form, setForm] = useState<CheckoutForm>({
    firstName: "",
    lastName: "",
    email: session?.user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    couponCode: "",
  });
  const [loading, setLoading] = useState(false);

  const subtotal = totalPrice();
  const delivery = form.state ? getDeliveryFee(form.state) : 0;
  const total = subtotal + delivery;

  function update(field: keyof CheckoutForm, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handlePaystack() {
    if (!form.firstName || !form.email || !form.phone || !form.address || !form.state) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);
    try {
      // Create order first
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
            price: i.product.price,
            productName: i.product.name,
            productImg: i.product.images[0]?.url,
          })),
          subtotal,
          deliveryFee: delivery,
          total,
          address: form,
          couponCode: form.couponCode || undefined,
        }),
      });

      if (!orderRes.ok) throw new Error("Failed to create order");
      const { order, reference } = await orderRes.json();

      // Initialize Paystack
      const PaystackPop = (await import("@paystack/inline-js")).default;
      const handler = PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        email: form.email,
        amount: Math.round(total * 100), // kobo
        currency: "NGN",
        ref: reference,
        metadata: {
          orderId: order.id,
          orderNumber: order.orderNumber,
          custom_fields: [
            { display_name: "Order Number", variable_name: "order_number", value: order.orderNumber },
          ],
        },
        callback: async (response: { reference: string }) => {
          // Verify payment
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference: response.reference, orderId: order.id }),
          });
          if (verifyRes.ok) {
            clearCart();
            toast.success("Payment successful! Your order is confirmed.");
            if (session) {
              router.push("/orders");
            } else {
              router.push(`/order-confirmed?ref=${order.orderNumber}`);
            }
          } else {
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        onClose: () => {
          toast("Payment window closed");
          setLoading(false);
        },
      });
      handler.openIframe();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="font-serif text-3xl text-white mb-4">Your cart is empty</h1>
        <Button variant="gold" asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="mb-10">
        <p className="font-sans text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase mb-2">
          Secure Checkout
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-white">
          Complete Your Order
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Form */}
        <div className="lg:col-span-3 space-y-6">
          {!session && (
            <div className="bg-[#111] border border-[#C9A84C]/20 p-4">
              <p className="font-sans text-xs text-[#9A9A9A]">
                <Link href="/login?callbackUrl=/checkout" className="text-[#C9A84C] hover:underline">Sign in</Link>
                {" "}to auto-fill your details and track your order.
              </p>
            </div>
          )}

          <div className="bg-[#111] border border-[#1A1A1A] p-6 space-y-4">
            <h2 className="font-serif text-lg text-white mb-2">Delivery Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name *" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="Ada" required />
              <Input label="Last Name *" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="Okonkwo" required />
            </div>
            <Input label="Email Address *" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="ada@example.com" required />
            <Input label="Phone Number *" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+234 800 000 0000" required />
            <Input label="Street Address *" value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="12 Victoria Island, Lagos" required />
            <Input label="City *" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Lagos" required />
            <Select
              label="State *"
              options={STATE_OPTIONS}
              placeholder="Select state"
              value={form.state}
              onChange={(e) => update("state", e.target.value)}
              required
            />
          </div>

          <div className="bg-[#111] border border-[#1A1A1A] p-6">
            <h2 className="font-serif text-lg text-white mb-4">Coupon Code</h2>
            <div className="flex gap-3">
              <Input
                placeholder="Enter coupon code"
                value={form.couponCode}
                onChange={(e) => update("couponCode", e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" size="md" className="flex-shrink-0">
                Apply
              </Button>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-2">
          <div className="bg-[#111] border border-[#1A1A1A] p-6 sticky top-24">
            <h2 className="font-serif text-lg text-white mb-6">Order Summary</h2>

            {/* Items */}
            <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-sans text-xs text-[#9A9A9A] truncate">{product.name}</p>
                    <p className="font-sans text-[10px] text-[#5A5A5A]">Qty: {quantity}</p>
                  </div>
                  <p className="font-sans text-xs text-white flex-shrink-0">
                    {formatPrice(product.price * quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-[#1A1A1A] pt-4 space-y-3 mb-6">
              <div className="flex justify-between font-sans text-sm">
                <span className="text-[#9A9A9A]">Subtotal</span>
                <span className="text-white">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between font-sans text-sm">
                <span className="text-[#9A9A9A]">Delivery</span>
                <span className="text-white">
                  {form.state ? formatPrice(delivery) : "Select state"}
                </span>
              </div>
              <div className="border-t border-[#1A1A1A] pt-3 flex justify-between">
                <span className="font-sans text-xs tracking-[0.15em] text-[#9A9A9A] uppercase">Total</span>
                <span className="font-serif text-xl text-[#C9A84C]">{formatPrice(total)}</span>
              </div>
            </div>

            <Button
              variant="gold"
              size="lg"
              className="w-full"
              loading={loading}
              onClick={handlePaystack}
            >
              Pay with Paystack
            </Button>

            <div className="mt-4 space-y-1.5">
              {["Secured by Paystack", "256-bit SSL encryption", "Certificate of Authenticity included"].map((t) => (
                <p key={t} className="font-sans text-[10px] text-[#3A3A3A] flex items-center gap-2">
                  <span className="text-[#C9A84C]">✓</span> {t}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
