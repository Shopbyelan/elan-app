import type { Metadata } from "next";
import Link from "next/link";
import { CareGuide } from "@/components/guide/CareGuide";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  title: "Client Guide — Élan Fine Jewellery",
  description:
    "Everything you need to know about your Élan piece — authentication, sizing, care, and our return policy.",
};

/* ─── Shared primitives ─── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[11px] tracking-[0.45em] text-[#3A5A78] uppercase mb-4">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-serif text-3xl md:text-5xl text-[#0A0A0A] leading-tight">
      {children}
    </h2>
  );
}

function Callout({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-l-2 border-[#85A0B5]/40 bg-[#FFFFFF] pl-4 py-3 pr-4">
      <p className="font-sans text-[10px] tracking-[0.3em] text-[#3A5A78] uppercase mb-1.5">
        {label}
      </p>
      <p className="font-serif text-sm text-[#9A9A9A] italic leading-relaxed">
        {children}
      </p>
    </div>
  );
}

function DocumentsBox({ items }: { items: string[] }) {
  return (
    <div className="border-l-2 border-[#85A0B5]/40 bg-[#FFFFFF] pl-4 py-3 pr-4">
      <p className="font-sans text-[10px] tracking-[0.3em] text-[#3A5A78] uppercase mb-3">
        Documents Enclosed
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 font-sans text-xs text-[#6B6B6B]">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-[#85A0B5]/50 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-[#F7F5F2] my-0" />;
}

/* ─── PAGE ─── */

export default function GuidePage() {
  return (
    <div className="bg-[#FFFFFF]">

      {/* ══ 1. AUTHENTICATION & CERTIFICATION ══════════════════════════ */}
      <section id="authentication" className="py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <SectionLabel>What Comes With Your Purchase</SectionLabel>
            <SectionTitle>
              Authentication &amp;{" "}
              <em className="not-italic text-[#3A5A78]">Certification</em>
            </SectionTitle>
            <p className="font-serif text-base md:text-lg text-[#9A9A9A] italic leading-relaxed max-w-2xl mx-auto mt-6">
              Every Élan piece is authenticated. What that authentication looks like depends
              on the material — because different materials warrant different documentation.
            </p>
          </div>

          <div className="space-y-px bg-[#E4E1DA]">

            {/* Card: GIA / IGI Certificate */}
            <div className="bg-[#F7F5F2] overflow-hidden">
              <div className="gradient-platinum flex flex-col items-center justify-center py-12 gap-3">
                <span className="text-5xl">📜</span>
                <span className="border border-[#85A0B5]/40 px-4 py-1.5 font-sans text-[10px] tracking-[0.35em] text-[#C4CDD6] uppercase">
                  GIA / IGI Certificate
                </span>
              </div>
              <div className="p-6 md:p-8">
                <p className="font-sans text-[11px] tracking-[0.35em] text-[#3A5A78] uppercase mb-3">
                  Cultivated Diamond
                </p>
                <h3 className="font-serif text-xl md:text-2xl text-[#0A0A0A] mb-5 leading-snug">
                  Included for stones{" "}
                  <em className="not-italic text-[#3A5A78]">1 carat and above</em>
                </h3>
                <div className="space-y-4 text-sm font-sans text-[#6B6B6B] leading-relaxed mb-6 max-w-2xl">
                  <p>
                    Every cultivated diamond of 1 carat or above is accompanied by its original GIA
                    (Gemological Institute of America) or IGI (International Gemological Institute)
                    grading report. This document certifies the exact Cut, Colour, Clarity, and Carat
                    weight of your stone — the same grading standard applied to the world&apos;s most
                    prestigious mined diamonds.
                  </p>
                  <p>
                    For cultivated diamonds below 1 carat, your Élan Certificate of Authenticity
                    specifies the stone grade, origin, and verification details. The stone is no less
                    genuine — the external grading report is not issued by laboratories for smaller
                    stones as standard industry practice.
                  </p>
                </div>
                <DocumentsBox
                  items={[
                    "GIA or IGI grading report (1ct+)",
                    "Élan Certificate of Authenticity",
                    "Metal hallmark documentation",
                    "Care guide",
                  ]}
                />
              </div>
            </div>

            {/* Card: Élan Stone Specification Card */}
            <div className="bg-[#F7F5F2] overflow-hidden">
              <div className="gradient-moiss flex flex-col items-center justify-center py-12 gap-3">
                <span className="text-5xl">📋</span>
                <span className="border border-[#85A0B5]/40 px-4 py-1.5 font-sans text-[10px] tracking-[0.35em] text-[#C4CDD6] uppercase">
                  Élan Stone Specification Card
                </span>
              </div>
              <div className="p-6 md:p-8">
                <p className="font-sans text-[11px] tracking-[0.35em] text-[#3A5A78] uppercase mb-3">
                  Crystal Moissanite
                </p>
                <h3 className="font-serif text-xl md:text-2xl text-[#0A0A0A] mb-5 leading-snug">
                  Included with{" "}
                  <em className="not-italic text-[#3A5A78]">all moissanite purchases</em>
                </h3>
                <div className="space-y-4 text-sm font-sans text-[#6B6B6B] leading-relaxed mb-6 max-w-2xl">
                  <p>
                    Every crystal moissanite piece includes our Élan Stone Specification Card —
                    a detailed document stating the stone dimensions, millimetre size,
                    diamond-equivalent carat weight, colour grade (DEF / GH / IJ), and clarity
                    classification.
                  </p>
                  <p>
                    Crystal moissanite is not graded by GIA or IGI — it is a distinct gemstone
                    assessed by its own standards. Our Specification Card provides complete
                    transparency on exactly what you own, verified by our in-house gemological team.
                  </p>
                </div>
                <DocumentsBox
                  items={[
                    "Élan Stone Specification Card",
                    "Élan Certificate of Authenticity",
                    "Metal hallmark documentation",
                    "Care guide",
                  ]}
                />
              </div>
            </div>

            {/* Card: Hallmark Engraving */}
            <div className="bg-[#F7F5F2] overflow-hidden">
              <div className="gradient-gold flex flex-col items-center justify-center py-12 gap-3">
                <span className="text-5xl">🔑</span>
                <span className="border border-[#85A0B5]/40 px-4 py-1.5 font-sans text-[10px] tracking-[0.35em] text-[#C4CDD6] uppercase">
                  Hallmark Engraving
                </span>
              </div>
              <div className="p-6 md:p-8">
                <p className="font-sans text-[11px] tracking-[0.35em] text-[#3A5A78] uppercase mb-3">
                  18k Gold &amp; Sterling Silver 925
                </p>
                <h3 className="font-serif text-xl md:text-2xl text-[#0A0A0A] mb-5 leading-snug">
                  Authentication is{" "}
                  <em className="not-italic text-[#3A5A78]">engraved directly onto the piece</em>
                </h3>
                <div className="space-y-4 text-sm font-sans text-[#6B6B6B] leading-relaxed mb-6 max-w-2xl">
                  <p>
                    For all 18k gold and 925 sterling silver pieces, authentication is permanent and
                    built into the jewellery itself. Every piece is hallmarked with the internationally
                    recognised purity stamp — <strong className="text-[#3A3A3A] font-normal">750</strong> for
                    18k gold and <strong className="text-[#3A3A3A] font-normal">925</strong> for sterling
                    silver — engraved directly onto the metal by an independent assay process.
                  </p>
                  <p>
                    This hallmark is not a sticker, not a tag, and not a certificate that can be
                    separated from the piece. It lives on the jewellery permanently. You carry your
                    authentication with you.
                  </p>
                </div>
                <DocumentsBox
                  items={[
                    "750 hallmark engraved on all 18k gold pieces",
                    "925 hallmark engraved on all sterling silver pieces",
                    "Élan maker's mark engraved alongside purity stamp",
                    "Élan Certificate of Authenticity also enclosed",
                  ]}
                />
                <div className="mt-4">
                  <Callout label="Why Engraved?">
                    International hallmarking law requires that precious metal purity be marked
                    directly on the metal — not on a separate document. An engraved hallmark is the
                    highest and most permanent form of authentication that exists in fine jewellery.
                  </Callout>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ══ 2. RING SIZING GUIDE ════════════════════════════════════════ */}
      <section id="sizing" className="py-20 md:py-32 px-4 sm:px-6 bg-[#F7F5F2]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Get the Perfect Fit</SectionLabel>
            <SectionTitle>
              Ring Sizing{" "}
              <em className="not-italic text-[#3A5A78]">Guide</em>
            </SectionTitle>
            <p className="font-serif text-base md:text-lg text-[#9A9A9A] italic leading-relaxed max-w-xl mx-auto mt-6">
              A ring that fits perfectly is a ring you will never take off. Use our guide
              to find your size before ordering — or contact us and we will advise.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-px bg-[#E4E1DA] mb-14">
            {[
              {
                icon: "📐",
                num: "01",
                title: "Measure an Existing Ring",
                body: [
                  "The easiest method. Take a ring that already fits the finger you are buying for and measure the internal diameter (straight across the inside of the band) in millimetres using a ruler.",
                  "Match your measurement to the size chart below. If you fall between two sizes, always size up.",
                ],
              },
              {
                icon: "🧵",
                num: "02",
                title: "Measure Your Finger",
                body: [
                  "Wrap a thin strip of paper or a piece of string around the base of your finger. Mark where it meets and measure the length in millimetres — this is your finger circumference.",
                  "Divide that number by 3.14 to get your internal diameter in mm, then match to the chart below.",
                ],
                callout: {
                  label: "Pro Tip",
                  text: "Measure in the evening — fingers are slightly larger later in the day due to warmth. This gives you the most accurate fit.",
                },
              },
              {
                icon: "💬",
                num: "03",
                title: "Not Sure? Ask Us.",
                body: [
                  "If you are buying as a surprise gift or are unsure between sizes, contact our client services team. We will advise on the best size to order and arrange a complimentary resize after gifting.",
                  "All non-bespoke rings qualify for one complimentary resize within 30 days of delivery.",
                ],
                callout: {
                  label: "Important",
                  text: "Wide bands (4mm+) sit slightly tighter. If ordering a wide band, we recommend sizing up by half a size.",
                },
              },
            ].map((step) => (
              <div key={step.num} className="relative bg-[#F7F5F2] p-6 md:p-8 overflow-hidden">
                <span className="absolute top-4 right-5 font-serif text-7xl md:text-8xl text-[#E4E1DA] leading-none select-none pointer-events-none">
                  {step.num}
                </span>
                <div className="relative">
                  <span className="text-2xl mb-4 block">{step.icon}</span>
                  <p className="font-sans text-[11px] tracking-[0.35em] text-[#3A5A78] uppercase mb-3">
                    {step.title}
                  </p>
                  <div className="space-y-3 max-w-2xl">
                    {step.body.map((para, i) => (
                      <p key={i} className="font-sans text-sm text-[#6B6B6B] leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                  {step.callout && (
                    <div className="mt-5 max-w-2xl">
                      <Callout label={step.callout.label}>{step.callout.text}</Callout>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Size chart */}
          <div>
            <p className="font-sans text-[11px] tracking-[0.45em] text-[#3A5A78] uppercase text-center mb-6">
              International Size Chart
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#85A0B5]">
                    {["Diameter (mm)", "UK Size", "US Size"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 font-sans text-[11px] tracking-[0.2em] text-black uppercase text-left"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["14.9mm", "F", "3"],
                    ["15.3mm", "G½", "3½"],
                    ["15.7mm", "H½", "4"],
                    ["16.1mm", "J", "4½"],
                    ["16.5mm", "K½", "5"],
                    ["16.9mm", "L½", "5½"],
                    ["17.3mm", "M½", "6"],
                    ["17.7mm", "N½", "6½"],
                    ["18.2mm", "P", "7"],
                    ["18.6mm", "Q", "7½"],
                    ["19.0mm", "R", "8"],
                    ["19.4mm", "S", "8½"],
                    ["19.8mm", "T", "9"],
                    ["20.2mm", "U", "9½"],
                    ["20.6mm", "V", "10"],
                  ].map(([mm, uk, us], i) => (
                    <tr
                      key={mm}
                      className={`border-b border-[#E4E1DA] ${i % 2 === 0 ? "bg-[#FFFFFF]" : "bg-[#F7F5F2]"}`}
                    >
                      <td className="px-4 py-3 font-sans text-sm text-[#6B6B6B]">{mm}</td>
                      <td className="px-4 py-3 font-serif text-sm text-[#3A3A3A]">{uk}</td>
                      <td className="px-4 py-3 font-sans text-sm text-[#6B6B6B]">{us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-serif text-xs text-[#9A9A9A] italic text-center mt-4 leading-relaxed">
              Sizes K½ – N½ represent the most common ring sizes for women. Sizes R – V represent
              the most common sizes for men. If your measurement falls between sizes, always size up.
              Complimentary resizing available within 30 days.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* ══ 3. CARE GUIDE ═══════════════════════════════════════════════ */}
      <section id="care" className="py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Your Piece Deserves It</SectionLabel>
            <SectionTitle>
              Complete Jewellery{" "}
              <em className="not-italic text-[#3A5A78]">Care Guide</em>
            </SectionTitle>
            <p className="font-serif text-base md:text-lg text-[#9A9A9A] italic leading-relaxed max-w-2xl mx-auto mt-6">
              Fine jewellery cared for properly does not age — it deepens. Every Élan piece
              is built to last generations. These practices ensure it does.
            </p>
          </div>
          <CareGuide />
        </div>
      </section>

      <Divider />

      {/* ══ 4. RETURN & EXCHANGE POLICY ════════════════════════════════ */}
      <section id="returns" className="py-20 md:py-32 px-4 sm:px-6 bg-[#F7F5F2]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Shop With Confidence</SectionLabel>
            <SectionTitle>
              Return &amp; Exchange{" "}
              <em className="not-italic text-[#3A5A78]">Policy</em>
            </SectionTitle>
            <p className="font-serif text-base md:text-lg text-[#9A9A9A] italic leading-relaxed max-w-2xl mx-auto mt-6">
              We want you to love your Élan piece unconditionally. If for any reason you do
              not, we make the process simple, transparent, and respectful of your time.
            </p>
          </div>

          <div className="space-y-px bg-[#E4E1DA]">

            {/* 14-day returns */}
            <div className="relative bg-[#F7F5F2] p-6 md:p-8 overflow-hidden">
              <span className="absolute top-4 right-5 font-serif text-7xl md:text-8xl text-[#E4E1DA] leading-none select-none pointer-events-none">
                01
              </span>
              <div className="relative">
                <span className="text-2xl mb-4 block">↩</span>
                <p className="font-sans text-[11px] tracking-[0.35em] text-[#3A5A78] uppercase mb-3">
                  14-Day Returns
                </p>
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed mb-4 max-w-2xl">
                  Unworn, unaltered pieces may be returned within{" "}
                  <strong className="text-[#3A3A3A] font-normal">14 days</strong> of confirmed delivery.
                  The piece must be in its original condition, in its original packaging, with all
                  documentation enclosed.
                </p>
                <ul className="space-y-2 mb-4 max-w-2xl">
                  {[
                    "Certificate of Authenticity must be included",
                    "Original Élan gift box and silk pouch required",
                    "Stone specification cards and grading reports enclosed",
                    "Piece must show no signs of wear or alteration",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 font-sans text-sm text-[#6B6B6B]">
                      <span className="mt-2 w-1 h-1 rounded-full bg-[#85A0B5]/50 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed max-w-2xl">
                  All returns are subject to a professional condition inspection before processing.
                  Any piece found to have been worn, resized by a third party, or altered in any way
                  will not be accepted.
                </p>
              </div>
            </div>

            {/* 30-day exchanges */}
            <div className="relative bg-[#F7F5F2] p-6 md:p-8 overflow-hidden">
              <span className="absolute top-4 right-5 font-serif text-7xl md:text-8xl text-[#E4E1DA] leading-none select-none pointer-events-none">
                02
              </span>
              <div className="relative">
                <span className="text-2xl mb-4 block">🔄</span>
                <p className="font-sans text-[11px] tracking-[0.35em] text-[#3A5A78] uppercase mb-3">
                  30-Day Exchanges
                </p>
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed mb-4 max-w-2xl">
                  Exchanges are accepted within{" "}
                  <strong className="text-[#3A3A3A] font-normal">30 days</strong> of confirmed delivery at
                  the original purchase price, applied as full credit toward any equal or higher-value
                  Élan piece.
                </p>
                <ul className="space-y-2 mb-5 max-w-2xl">
                  {[
                    "Contact client services to initiate your exchange",
                    "We issue a prepaid insured return label",
                    "Credit applied within 2–3 business days of inspection",
                    "New piece despatched within 1–2 business days of credit confirmation",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 font-sans text-sm text-[#6B6B6B]">
                      <span className="mt-2 w-1 h-1 rounded-full bg-[#85A0B5]/50 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Callout label="Good to Know">
                  If you are unsure between two pieces, we recommend contacting us before ordering.
                  Our team can help you choose with confidence — and avoid the need to exchange at all.
                </Callout>
              </div>
            </div>

            {/* Final sale items */}
            <div className="relative bg-[#F7F5F2] p-6 md:p-8 overflow-hidden">
              <span className="absolute top-4 right-5 font-serif text-7xl md:text-8xl text-[#E4E1DA] leading-none select-none pointer-events-none">
                03
              </span>
              <div className="relative">
                <span className="text-2xl mb-4 block">⚠️</span>
                <p className="font-sans text-[11px] tracking-[0.35em] text-[#3A5A78] uppercase mb-3">
                  Final Sale Items
                </p>
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed mb-4 max-w-2xl">
                  The following are{" "}
                  <strong className="text-[#3A3A3A] font-normal">
                    final sale and cannot be returned or exchanged
                  </strong>{" "}
                  under any circumstances:
                </p>
                <ul className="space-y-2 mb-4 max-w-2xl">
                  {[
                    "Custom-sized or resized rings",
                    "Engraved pieces of any kind",
                    "Bespoke commissions and custom designs",
                    "Pieces altered by any third-party jeweller",
                    "Earrings (for hygiene reasons)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 font-sans text-sm text-[#6B6B6B]">
                      <span className="mt-2 w-1 h-1 rounded-full bg-[#85A0B5]/50 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed max-w-2xl">
                  If you are unsure whether your piece qualifies for return, contact us before
                  initiating — we will advise clearly and honestly.
                </p>
              </div>
            </div>

            {/* Refund processing */}
            <div className="relative bg-[#F7F5F2] p-6 md:p-8 overflow-hidden">
              <span className="absolute top-4 right-5 font-serif text-7xl md:text-8xl text-[#E4E1DA] leading-none select-none pointer-events-none">
                04
              </span>
              <div className="relative">
                <span className="text-2xl mb-4 block">💳</span>
                <p className="font-sans text-[11px] tracking-[0.35em] text-[#3A5A78] uppercase mb-3">
                  Refund Processing
                </p>
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed mb-4 max-w-2xl">
                  Once your return is received and passes our condition inspection — typically within{" "}
                  <strong className="text-[#3A3A3A] font-normal">2–3 business days</strong> of arrival —
                  your refund is processed to the original payment method.
                </p>
                <ul className="space-y-2 mb-4 max-w-2xl">
                  {[
                    "Credit/debit card: 5–7 business days",
                    "PayPal / digital wallet: 3–5 business days",
                    "Bank transfer: 5–10 business days",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 font-sans text-sm text-[#6B6B6B]">
                      <span className="mt-2 w-1 h-1 rounded-full bg-[#85A0B5]/50 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed mb-5 max-w-2xl">
                  You will receive an email confirmation at each stage. Original shipping fees are
                  non-refundable unless the return is due to a fault on our part.
                </p>
                <div className="max-w-2xl">
                  <Callout label="Damaged on Arrival?">
                    Contact us within 48 hours with photographs. We will arrange an immediate
                    replacement or full refund — including original shipping.
                  </Callout>
                </div>
              </div>
            </div>

            {/* Complimentary ring resizing */}
            <div className="relative bg-[#F7F5F2] p-6 md:p-8 overflow-hidden">
              <span className="absolute top-4 right-5 font-serif text-7xl md:text-8xl text-[#E4E1DA] leading-none select-none pointer-events-none">
                05
              </span>
              <div className="relative">
                <span className="text-2xl mb-4 block">💍</span>
                <p className="font-sans text-[11px] tracking-[0.35em] text-[#3A5A78] uppercase mb-3">
                  Complimentary Ring Resizing
                </p>
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed max-w-2xl">
                  All non-bespoke, non-engraved ring purchases qualify for one complimentary resize
                  within 30 days of delivery. Simply contact client services, return your ring in
                  its original packaging, and we will resize and return it to you within 5–7 business
                  days — fully insured both ways.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Divider />

      {/* ══ 5. THE ÉLAN PROMISE + NEWSLETTER ═══════════════════════════ */}
      <section id="promise" className="py-20 md:py-32 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#85A0B5]/40" />
            <svg width="8" height="8" viewBox="0 0 8 8" className="text-[#3A5A78]" fill="currentColor">
              <rect x="0" y="4" width="5.66" height="5.66" transform="rotate(-45 0 4)" />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#85A0B5]/40" />
          </div>

          <SectionLabel>The Élan Promise</SectionLabel>

          <blockquote className="font-serif text-2xl md:text-4xl text-[#0A0A0A] leading-snug mb-12">
            &ldquo;We will never sell you a stone you don&apos;t understand, a metal you
            can&apos;t verify, or a story that isn&apos;t{" "}
            <em className="not-italic text-[#3A5A78]">entirely true.</em>&rdquo;
          </blockquote>
        </div>
      </section>

      <NewsletterSection />

      {/* ══ Quick nav ════════════════════════════════════════════════════ */}
      <div className="border-t border-[#E4E1DA] py-8 px-4 sm:px-6 bg-[#FFFFFF]">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-6 justify-center">
          {[
            { href: "#authentication", label: "Authentication" },
            { href: "#sizing", label: "Ring Sizing" },
            { href: "#care", label: "Care Guide" },
            { href: "#returns", label: "Returns & Exchanges" },
            { href: "#promise", label: "The Élan Promise" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-sans text-[12px] tracking-[0.2em] text-[#9A9A9A] uppercase hover:text-[#3A5A78] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
