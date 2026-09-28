import type { Metadata } from "next";
import { Gift, PenLine, Package, UserCheck, Truck, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { MIN_BULK_QUANTITY } from "@/lib/corporate";
import { CorporateInquiryForm, type GiftableProduct } from "@/components/corporate/CorporateInquiryForm";

export const metadata: Metadata = {
  title: "Corporate & Gifting — Élan Fine Jewellery",
  description:
    "Bulk and corporate jewellery gifting from Élan — preferential volume pricing, personalised engraving, co-branded packaging and a dedicated gifting concierge.",
};

// Product list for the picker must reflect current stock/activation.
export const dynamic = "force-dynamic";

const benefits = [
  {
    icon: Gift,
    title: "Preferential Volume Pricing",
    body: `Tailored pricing on orders of ${MIN_BULK_QUANTITY} pieces or more, quoted individually for your programme.`,
  },
  {
    icon: PenLine,
    title: "Personalised Engraving",
    body: "Names, initials, dates or your company mark — engraved by hand for a piece that is unmistakably theirs.",
  },
  {
    icon: Package,
    title: "Co-Branded Presentation",
    body: "Signature Élan boxes with your logo, bespoke message cards and ribbon in your brand colours.",
  },
  {
    icon: UserCheck,
    title: "Dedicated Concierge",
    body: "One advisor from brief to delivery — curating the selection, managing sizing and keeping you on schedule.",
  },
  {
    icon: Truck,
    title: "Coordinated Delivery",
    body: "Delivered to one office or individually to each recipient, across Lagos, Abuja, Port Harcourt and beyond.",
  },
  {
    icon: ShieldCheck,
    title: "Certified Authenticity",
    body: "Every piece ships with its Élan certificate verifying metal purity and stone specification.",
  },
];

const steps = [
  { n: "01", title: "Share your brief", body: "Tell us the occasion, quantity, budget and timeline using the form below." },
  { n: "02", title: "Receive a proposal", body: "Within one business day, your concierge sends a curated selection and quote." },
  { n: "03", title: "Approve & personalise", body: "Confirm pieces, engraving and packaging. We share proofs before production." },
  { n: "04", title: "We deliver", body: "Finished gifts are quality-checked, presented and delivered on your date." },
];

const occasions = [
  "Employee Recognition",
  "Client Appreciation",
  "Product Launches",
  "End-of-Year Gifting",
  "Bridal Parties",
  "Milestones & Anniversaries",
];

async function getGiftableProducts(): Promise<GiftableProduct[]> {
  try {
    return await prisma.product.findMany({
      where: { isActive: true },
      select: { id: true, name: true, price: true },
      orderBy: { name: "asc" },
    });
  } catch {
    return [];
  }
}

export default async function CorporateGiftingPage() {
  const products = await getGiftableProducts();

  return (
    <>
      {/* Hero */}
      <section className="gradient-diamond relative overflow-hidden py-24 md:py-32 px-4 text-center">
        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(184,212,232,0.1) 30px, rgba(184,212,232,0.1) 31px)" }}
        />
        <div className="relative max-w-3xl mx-auto">
          <p className="font-sans text-[11px] tracking-[0.4em] text-[#85A0B5] uppercase mb-5">
            Corporate &amp; Gifting
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-white mb-6 leading-tight">
            Gifts that carry <em className="text-[#85A0B5] not-italic">your name</em> for generations
          </h1>
          <p className="font-sans text-sm md:text-base text-[#9A9A9A] max-w-xl mx-auto leading-relaxed mb-10">
            Fine jewellery for teams, clients and celebrations — curated, personalised and delivered
            at scale, with the same care as a single heirloom.
          </p>
          <a href="#request" className="btn-gold inline-flex items-center px-10 h-13 font-sans text-xs">
            Request a Bulk Quote
          </a>
        </div>
      </section>

      {/* Occasions strip */}
      <div className="bg-[#F7F5F2] border-b border-[#E4E1DA]">
        <div className="max-w-6xl mx-auto px-4 py-5 flex gap-8 overflow-x-auto no-scrollbar justify-start md:justify-center">
          {occasions.map((o) => (
            <span key={o} className="flex-shrink-0 font-sans text-[11px] tracking-[0.25em] text-[#6B6B6B] uppercase">
              {o}
            </span>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <div className="text-center mb-14">
          <p className="font-sans text-[11px] tracking-[0.4em] text-[#3A5A78] uppercase mb-4">The Élan Standard, at Scale</p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#0A0A0A]">Why organisations gift Élan</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E4E1DA] border border-[#E4E1DA]">
          {benefits.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-white p-8">
              <Icon className="h-5 w-5 text-[#3A5A78] mb-5" />
              <h3 className="font-serif text-lg text-[#0A0A0A] mb-3">{title}</h3>
              <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-[#0A0A0A] py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-sans text-[11px] tracking-[0.4em] text-[#85A0B5] uppercase mb-4">How It Works</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white">From brief to delivery</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {steps.map((s) => (
              <div key={s.n} className="border-t border-[#85A0B5]/30 pt-6">
                <span className="font-serif text-3xl text-[#85A0B5]">{s.n}</span>
                <h3 className="font-serif text-lg text-white mt-4 mb-2">{s.title}</h3>
                <p className="font-sans text-sm text-[#9A9A9A] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request form */}
      <section id="request" className="bg-[#F7F5F2] py-20 md:py-28 px-4 scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-sans text-[11px] tracking-[0.4em] text-[#3A5A78] uppercase mb-4">Bulk Request</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0A0A0A] mb-4">Begin your gifting programme</h2>
            <p className="font-sans text-sm text-[#6B6B6B] max-w-lg mx-auto leading-relaxed">
              Requests start from {MIN_BULK_QUANTITY} pieces. Share as much or as little as you know —
              your concierge will shape the rest with you.
            </p>
          </div>
          <CorporateInquiryForm products={products} />
        </div>
      </section>
    </>
  );
}
