"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useCartStore } from "@/store/cart.store";
import { useCurrencyStore, NGN_PER_USD } from "@/store/currency.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { COUNTRIES, getInternationalDeliveryFee, getDeliveryLabel } from "@/data/countries";
import { toast } from "sonner";

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  couponCode: string;
}

const COUNTRY_OPTIONS = COUNTRIES.map((c) => ({ value: c.code, label: c.name }));

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, totalPrice, clearCart } = useCartStore();
  const { currency, format } = useCurrencyStore();

  const [form, setForm] = useState<CheckoutForm>({
    firstName: "",
    lastName: "",
    email: session?.user?.email ?? "",
    phone: "",
    address: "",
    city: "",
    country: "NG",
    state: "",
    postalCode: "",
    couponCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  const selectedCountry = useMemo(
    () => COUNTRIES.find((c) => c.code === form.country),
    [form.country],
  );
  const stateOptions = useMemo(
    () => selectedCountry?.states.map((s) => ({ value: s, label: s })) ?? [],
    [selectedCountry],
  );
  const hasStates = stateOptions.length > 0;
  const isPickup = deliveryMethod === "pickup";

  const subtotal = totalPrice();
  const delivery = isPickup ? 0 : getInternationalDeliveryFee(form.country, form.state);
  const deliveryLabel = isPickup ? "Pickup (Abuja studio)" : getDeliveryLabel(form.country);
  const total = subtotal + delivery - discount;

  function update<K extends keyof CheckoutForm>(field: K, value: string) {
    setForm((f) => {
      const next = { ...f, [field]: value };
      // Reset state when country changes
      if (field === "country") next.state = "";
      return next;
    });
    // Editing the code after applying invalidates the previously applied discount
    if (field === "couponCode" && couponApplied) {
      setCouponApplied(false);
      setDiscount(0);
    }
  }

  async function handleApplyCoupon() {
    if (!form.couponCode) return;
    setApplyingCoupon(true);
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: form.couponCode, subtotal }),
      });
      const data = await res.json();
      if (!res.ok || !data.valid) {
        setDiscount(0);
        setCouponApplied(false);
        toast.error(data.message ?? "Invalid coupon code");
        return;
      }
      setDiscount(data.discount);
      setCouponApplied(true);
      toast.success("Coupon applied");
    } catch (err) {
      console.error(err);
      toast.error("Could not apply coupon. Please try again.");
    } finally {
      setApplyingCoupon(false);
    }
  }

  async function handlePaystack() {
    const required: (keyof CheckoutForm)[] = isPickup
      ? ["firstName", "email", "phone"]
      : ["firstName", "email", "phone", "address", "city", "country"];
    if (required.some((k) => !form[k])) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (!isPickup && hasStates && !form.state) {
      toast.error("Please select a state / province");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);
    try {
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
          notes: isPickup ? "Store Pickup — Abuja Studio (no delivery required)" : undefined,
          address: isPickup
            ? {
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                phone: form.phone,
                address: "In-store pickup — Abuja studio",
                city: "Abuja",
                state: "FCT",
                country: "Nigeria",
              }
            : {
                ...form,
                country: selectedCountry?.name ?? form.country,
              },
          couponCode: form.couponCode || undefined,
        }),
      });

      if (!orderRes.ok) throw new Error("Failed to create order");
      const { order, reference } = await orderRes.json();

      // Charge exactly what the server persisted as order.total (post-discount),
      // not the locally computed `total` — keeps the amount charged in sync with
      // what's recorded even if the coupon state on this page is stale.
      const paystackAmount =
        currency === "USD"
          ? Math.round((order.total / NGN_PER_USD) * 100)
          : Math.round(order.total * 100);

      const PaystackPop = (await import("@paystack/inline-js")).default;
      const handler = PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        email: form.email,
        amount: paystackAmount,
        currency,
        ref: reference,
        metadata: {
          orderId: order.id,
          orderNumber: order.orderNumber,
          custom_fields: [
            { display_name: "Order Number", variable_name: "order_number", value: order.orderNumber },
          ],
        },
        callback: async (response: { reference: string }) => {
          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference: response.reference, orderId: order.id }),
          });
          if (verifyRes.ok) {
            clearCart();
            toast.success("Payment successful! Your order is confirmed.");
            router.push(session ? "/orders" : `/order-confirmed?ref=${order.orderNumber}`);
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
        <h1 className="font-serif text-3xl text-[#0A0A0A] mb-4">Your cart is empty</h1>
        <Button variant="gold" asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="mb-10">
        <p className="font-sans text-[11px] tracking-[0.4em] text-[#3A5A78] uppercase mb-2">
          Secure Checkout
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-[#0A0A0A]">Complete Your Order</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* ── Form ── */}
        <div className="lg:col-span-3 space-y-6">
          {!session && (
            <div className="bg-[#FFFFFF] border border-[#85A0B5]/20 p-4">
              <p className="font-sans text-xs text-[#6B6B6B]">
                <Link href="/login?callbackUrl=/checkout" className="text-[#3A5A78] hover:underline">
                  Sign in
                </Link>{" "}
                to auto-fill your details and track your order.
              </p>
            </div>
          )}

          {/* Contact */}
          <div className="bg-[#FFFFFF] border border-[#E4E1DA] p-6 space-y-4">
            <h2 className="font-serif text-lg text-[#0A0A0A] mb-2">Contact Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name *"
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                placeholder="Ada"
              />
              <Input
                label="Last Name"
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                placeholder="Okonkwo"
              />
            </div>
            <Input
              label="Email Address *"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="ada@example.com"
            />
            <Input
              label="Phone Number *"
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="+1 555 000 0000"
            />
          </div>

          {/* Delivery method */}
          <div className="bg-[#FFFFFF] border border-[#E4E1DA] p-6 space-y-4">
            <h2 className="font-serif text-lg text-[#0A0A0A] mb-2">Delivery Method</h2>

            <div className="flex gap-3">
              {(["delivery", "pickup"] as const).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setDeliveryMethod(method)}
                  className={`flex-1 h-11 font-sans text-xs tracking-[0.15em] uppercase border transition-colors ${
                    deliveryMethod === method
                      ? "border-[#3A5A78] bg-[#3A5A78] text-white"
                      : "border-[#E4E1DA] text-[#6B6B6B] hover:border-[#85A0B5]"
                  }`}
                >
                  {method === "delivery" ? "Home Delivery" : "Pickup — Abuja Studio (Free)"}
                </button>
              ))}
            </div>

            {isPickup ? (
              <p className="font-sans text-[12px] text-[#9A9A9A] leading-relaxed">
                No shipping details needed — we&apos;ll contact you to arrange collection from our Abuja studio
                once your order is confirmed.
              </p>
            ) : (
              <>
                {/* Country first */}
                <Select
                  label="Country *"
                  options={COUNTRY_OPTIONS}
                  placeholder="Select country"
                  value={form.country}
                  onChange={(e) => update("country", e.target.value)}
                />

                <Input
                  label="Street Address *"
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  placeholder="123 Main Street, Apt 4B"
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City *"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    placeholder="City"
                  />
                  <Input
                    label="Postal / ZIP Code"
                    value={form.postalCode}
                    onChange={(e) => update("postalCode", e.target.value)}
                    placeholder="00000"
                  />
                </div>

                {/* State: dropdown if country has states, text input otherwise */}
                {hasStates ? (
                  <Select
                    label="State / Province *"
                    options={stateOptions}
                    placeholder="Select state"
                    value={form.state}
                    onChange={(e) => update("state", e.target.value)}
                  />
                ) : (
                  <Input
                    label="State / Region / Province"
                    value={form.state}
                    onChange={(e) => update("state", e.target.value)}
                    placeholder="State or region"
                  />
                )}
              </>
            )}
          </div>

          {/* Coupon */}
          <div className="bg-[#FFFFFF] border border-[#E4E1DA] p-6">
            <h2 className="font-serif text-lg text-[#0A0A0A] mb-4">Coupon Code</h2>
            <div className="flex gap-3">
              <Input
                placeholder="Enter coupon code"
                value={form.couponCode}
                onChange={(e) => update("couponCode", e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="md"
                className="flex-shrink-0"
                loading={applyingCoupon}
                disabled={!form.couponCode || couponApplied}
                onClick={handleApplyCoupon}
              >
                {couponApplied ? "Applied" : "Apply"}
              </Button>
            </div>
          </div>
        </div>

        {/* ── Order summary ── */}
        <div className="lg:col-span-2">
          <div className="bg-[#FFFFFF] border border-[#E4E1DA] p-6 sticky top-24">
            <h2 className="font-serif text-lg text-[#0A0A0A] mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-sans text-xs text-[#6B6B6B] truncate">{product.name}</p>
                    <p className="font-sans text-[12px] text-[#9A9A9A]">Qty: {quantity}</p>
                  </div>
                  <p className="font-sans text-xs text-[#3A3A3A] flex-shrink-0">
                    {format(product.price * quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E4E1DA] pt-4 space-y-3 mb-6">
              <div className="flex justify-between font-sans text-sm">
                <span className="text-[#6B6B6B]">Subtotal</span>
                <span className="text-[#3A3A3A]">{format(subtotal)}</span>
              </div>
              <div className="flex justify-between font-sans text-sm">
                <span className="text-[#6B6B6B] capitalize">{deliveryLabel}</span>
                <span className="text-[#3A3A3A]">
                  {form.country ? format(delivery) : "Select country"}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-[#6B6B6B]">Discount</span>
                  <span className="text-[#3A5A78]">−{format(discount)}</span>
                </div>
              )}
              {form.country !== "NG" && (
                <p className="font-sans text-[12px] text-[#9A9A9A] leading-relaxed">
                  International orders are shipped via DHL / FedEx. Delivery within 5–10 business days.
                </p>
              )}
              <div className="border-t border-[#E4E1DA] pt-3 flex justify-between">
                <span className="font-sans text-xs tracking-[0.15em] text-[#6B6B6B] uppercase">Total</span>
                <span className="font-serif text-xl text-[#3A5A78]">{format(total)}</span>
              </div>
            </div>

            {currency === "USD" && (
              <p className="font-sans text-[12px] text-[#9A9A9A] text-center mb-3">
                Approx. {format(total)} · Rate: $1 = ₦{NGN_PER_USD.toLocaleString()}
              </p>
            )}

            <Button variant="gold" size="lg" className="w-full" loading={loading} onClick={handlePaystack}>
              Pay {format(total)} with Paystack
            </Button>

            <div className="mt-4 space-y-1.5">
              {[
                "Secured by Paystack",
                "256-bit SSL encryption",
                "Certificate of Authenticity included",
              ].map((t) => (
                <p key={t} className="font-sans text-[12px] text-[#9A9A9A] flex items-center gap-2">
                  <span className="text-[#3A5A78]">✓</span> {t}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
