"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CheckCircle, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { BUDGET_RANGES, MIN_BULK_QUANTITY, OCCASIONS } from "@/lib/corporate";

export interface GiftableProduct {
  id: string;
  name: string;
  price: number;
}

interface SelectedItem {
  productId: string;
  quantity: number;
}

const selectClass =
  "w-full h-11 px-4 bg-[#F7F5F2] border border-[#E4E1DA] text-[#3A3A3A] font-sans text-sm focus:outline-none focus:border-[#3A5A78] transition-colors";
const labelClass = "block text-[12px] font-sans tracking-[0.2em] text-[#6B6B6B] uppercase mb-2";

export function CorporateInquiryForm({ products }: { products: GiftableProduct[] }) {
  const { data: session } = useSession();
  const [form, setForm] = useState({
    companyName: "",
    contactName: session?.user?.name ?? "",
    email: session?.user?.email ?? "",
    phone: "",
    jobTitle: "",
    occasion: "",
    totalQuantity: String(MIN_BULK_QUANTITY),
    budgetPerPiece: "",
    deliveryDate: "",
    deliveryCity: "",
    message: "",
    website: "", // honeypot
  });
  const [engraving, setEngraving] = useState(false);
  const [brandedPackaging, setBrandedPackaging] = useState(false);
  const [items, setItems] = useState<SelectedItem[]>([]);
  const [pickerId, setPickerId] = useState("");
  const [pickerQty, setPickerQty] = useState(String(MIN_BULK_QUANTITY));
  const [loading, setLoading] = useState(false);
  const [reference, setReference] = useState("");

  const productById = new Map(products.map((p) => [p.id, p]));
  const selectedTotal = items.reduce((sum, i) => sum + i.quantity, 0);
  const estimatedValue = items.reduce(
    (sum, i) => sum + (productById.get(i.productId)?.price ?? 0) * i.quantity,
    0,
  );

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function addItem() {
    const qty = parseInt(pickerQty, 10);
    if (!pickerId || !qty || qty < 1) {
      toast.error("Choose a piece and quantity");
      return;
    }
    const next = items.some((i) => i.productId === pickerId)
      ? items.map((i) => (i.productId === pickerId ? { ...i, quantity: i.quantity + qty } : i))
      : [...items, { productId: pickerId, quantity: qty }];
    const nextTotal = next.reduce((sum, i) => sum + i.quantity, 0);
    // Keep the overall total at least as large as the itemised pieces.
    if (nextTotal > (parseInt(form.totalQuantity, 10) || 0)) {
      update("totalQuantity", String(nextTotal));
    }
    setItems(next);
    setPickerId("");
  }

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const totalQuantity = parseInt(form.totalQuantity, 10) || 0;
    if (totalQuantity < MIN_BULK_QUANTITY) {
      toast.error(`Bulk requests start at ${MIN_BULK_QUANTITY} pieces`);
      return;
    }
    if (!form.occasion) {
      toast.error("Select an occasion");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/corporate-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          totalQuantity,
          budgetPerPiece: form.budgetPerPiece || undefined,
          engraving,
          brandedPackaging,
          items,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Could not submit your request");
        return;
      }
      setReference(data.reference);
      window.scrollTo({ top: document.getElementById("request")?.offsetTop ?? 0, behavior: "smooth" });
    } catch {
      toast.error("Network error — please try again");
    } finally {
      setLoading(false);
    }
  }

  if (reference) {
    return (
      <div className="bg-white border border-[#E4E1DA] px-6 py-16 text-center">
        <CheckCircle className="h-10 w-10 text-[#3A5A78] mx-auto mb-6" />
        <h3 className="font-serif text-3xl text-[#0A0A0A] mb-3">Request received</h3>
        <p className="font-sans text-[12px] tracking-[0.3em] text-[#3A5A78] uppercase mb-6">{reference}</p>
        <p className="font-sans text-sm text-[#6B6B6B] max-w-md mx-auto leading-relaxed">
          Thank you. A confirmation has been sent to <strong className="text-[#3A3A3A]">{form.email}</strong>.
          Our gifting concierge will be in touch within one business day with a tailored proposal.
        </p>
        <Button asChild variant="outline" className="mt-10">
          <Link href="/shop">Continue Browsing</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#E4E1DA] p-6 md:p-10 space-y-10">
      {/* Honeypot — hidden from people, tempting to bots */}
      <div className="hidden" aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} />
      </div>

      {/* Contact */}
      <fieldset>
        <legend className="font-serif text-xl text-[#0A0A0A] mb-6">Your details</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Input label="Company / Organisation *" required value={form.companyName} onChange={(e) => update("companyName", e.target.value)} />
          <Input label="Full Name *" required value={form.contactName} onChange={(e) => update("contactName", e.target.value)} />
          <Input label="Work Email *" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} />
          <Input label="Phone *" type="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)} />
          <Input label="Job Title" value={form.jobTitle} onChange={(e) => update("jobTitle", e.target.value)} />
        </div>
      </fieldset>

      {/* Request */}
      <fieldset>
        <legend className="font-serif text-xl text-[#0A0A0A] mb-6">Your request</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass} htmlFor="occasion">Occasion *</label>
            <select id="occasion" required value={form.occasion} onChange={(e) => update("occasion", e.target.value)} className={selectClass}>
              <option value="" disabled>Select an occasion</option>
              {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <Input
            label={`Total Pieces * (min ${MIN_BULK_QUANTITY})`}
            type="number"
            min={Math.max(MIN_BULK_QUANTITY, selectedTotal)}
            required
            value={form.totalQuantity}
            onChange={(e) => update("totalQuantity", e.target.value)}
          />
          <div>
            <label className={labelClass} htmlFor="budget">Budget per Piece</label>
            <select id="budget" value={form.budgetPerPiece} onChange={(e) => update("budgetPerPiece", e.target.value)} className={selectClass}>
              <option value="">Select a range</option>
              {BUDGET_RANGES.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <Input
            label="Needed By"
            type="date"
            min={new Date().toISOString().slice(0, 10)}
            value={form.deliveryDate}
            onChange={(e) => update("deliveryDate", e.target.value)}
          />
          <Input label="Delivery City" placeholder="e.g. Lagos" value={form.deliveryCity} onChange={(e) => update("deliveryCity", e.target.value)} />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-6">
          <label className="flex items-center gap-3 cursor-pointer font-sans text-sm text-[#3A3A3A]">
            <input type="checkbox" checked={engraving} onChange={(e) => setEngraving(e.target.checked)} className="h-4 w-4 accent-[#3A5A78]" />
            Personalised engraving
          </label>
          <label className="flex items-center gap-3 cursor-pointer font-sans text-sm text-[#3A3A3A]">
            <input type="checkbox" checked={brandedPackaging} onChange={(e) => setBrandedPackaging(e.target.checked)} className="h-4 w-4 accent-[#3A5A78]" />
            Co-branded packaging &amp; cards
          </label>
        </div>
      </fieldset>

      {/* Pieces */}
      <fieldset>
        <legend className="font-serif text-xl text-[#0A0A0A] mb-2">Pieces of interest</legend>
        <p className="font-sans text-xs text-[#9A9A9A] mb-6">
          Optional — add specific pieces from our collection, or leave this empty and let our concierge curate a selection for you.
        </p>

        {products.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-3">
            <select value={pickerId} onChange={(e) => setPickerId(e.target.value)} className={`${selectClass} sm:flex-1`} aria-label="Piece">
              <option value="">Choose a piece…</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name} — {formatPrice(p.price)}</option>
              ))}
            </select>
            <input
              type="number"
              min={1}
              value={pickerQty}
              onChange={(e) => setPickerQty(e.target.value)}
              aria-label="Quantity"
              className={`${selectClass} sm:w-28`}
            />
            <Button type="button" variant="outline" onClick={addItem}>
              <Plus className="h-3.5 w-3.5" /> Add
            </Button>
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-5 border border-[#E4E1DA] divide-y divide-[#E4E1DA]">
            {items.map((item) => {
              const product = productById.get(item.productId);
              return (
                <div key={item.productId} className="flex items-center gap-4 px-4 py-3">
                  <p className="flex-1 min-w-0 font-sans text-sm text-[#3A3A3A] truncate">{product?.name}</p>
                  <p className="font-sans text-xs text-[#6B6B6B] whitespace-nowrap">× {item.quantity}</p>
                  <button type="button" onClick={() => removeItem(item.productId)} aria-label={`Remove ${product?.name}`} className="text-[#9A9A9A] hover:text-red-500 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
            <div className="flex justify-between px-4 py-3 bg-[#F7F5F2] font-sans text-xs text-[#6B6B6B]">
              <span>{selectedTotal} pieces selected</span>
              <span>Retail value {formatPrice(estimatedValue)}</span>
            </div>
          </div>
        )}
      </fieldset>

      <Textarea
        label="Anything else we should know?"
        rows={4}
        placeholder="Recipients, sizing, engraving text, brand guidelines, delivery logistics…"
        value={form.message}
        onChange={(e) => update("message", e.target.value)}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <p className="font-sans text-xs text-[#9A9A9A] max-w-sm leading-relaxed">
          This is a no-obligation quote request. Final pricing is confirmed by our concierge before any payment.
        </p>
        <Button type="submit" size="lg" loading={loading} disabled={loading}>
          Submit Request
        </Button>
      </div>
    </form>
  );
}
