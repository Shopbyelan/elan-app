import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story — Élan Fine Jewellery",
  description:
    "Why Élan exists, what we believe about fine jewellery, and the promise behind every piece we make.",
};

const pillars = [
  {
    code: "01",
    title: "The Stone and the Craft Should Speak",
    body: "We choose not to spend your money on retail square footage and legacy marketing. Our cultivated diamonds give you the same stone as a mined diamond, for a fraction of the price. Our crystal moissanite offers extraordinary brilliance at accessible luxury pricing. We believe the value of a piece should come from the metal, the stone, and the craftsmanship — never from the markup.",
  },
  {
    code: "02",
    title: "Nothing Is Ever Misrepresented",
    body: "Every metal we use is independently hallmarked by a third party — 750 for 18k gold, 925 for sterling silver, 950 for platinum. Every cultivated diamond ships with its GIA or IGI certificate. Every piece includes a Certificate of Authenticity. We will always clearly identify whether a stone is a diamond or crystal moissanite. We have never — and will never — misrepresent a material, a stone, or a price.",
  },
  {
    code: "03",
    title: "Built to Be Passed Down",
    body: "Élan is a fine jewellery house, not a fashion brand. We work only in 18k gold, 925 sterling silver, 950 platinum, certified cultivated diamonds, and crystal moissanite — materials chosen because they last generations, not seasons. A piece from Élan is made to be worn, cared for, and one day handed to someone else.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-[#F7F5F2] border-b border-[#E4E1DA] py-16 md:py-24 px-4 text-center">
        <p className="font-sans text-[11px] tracking-[0.4em] text-[#3A5A78] uppercase mb-4">
          Our Story
        </p>
        <h1 className="font-serif text-4xl md:text-6xl text-[#0A0A0A] mb-4">
          Where Rarity Becomes <em className="text-[#3A5A78] not-italic">Ritual</em>
        </h1>
        <p className="font-sans text-sm text-[#6B6B6B] max-w-xl mx-auto leading-relaxed">
          Élan was built on a simple belief: that fine jewellery should be honest about what it is,
          transparent about what it costs, and made to be worn for a lifetime.
        </p>
      </div>

      {/* Pillars */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <div className="space-y-px bg-[#E4E1DA]">
          {pillars.map((p) => (
            <div key={p.code} className="relative bg-[#FFFFFF] p-8 md:p-10 overflow-hidden">
              <span className="absolute top-4 right-6 font-serif text-7xl md:text-8xl text-[#F7F5F2] leading-none select-none pointer-events-none">
                {p.code}
              </span>
              <div className="relative max-w-2xl">
                <h2 className="font-serif text-2xl md:text-3xl text-[#0A0A0A] mb-4 leading-snug">
                  {p.title}
                </h2>
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Promise */}
        <div className="text-center mt-20 md:mt-28">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#85A0B5]/40" />
            <svg width="8" height="8" viewBox="0 0 8 8" className="text-[#3A5A78]" fill="currentColor">
              <rect x="0" y="4" width="5.66" height="5.66" transform="rotate(-45 0 4)" />
            </svg>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#85A0B5]/40" />
          </div>
          <blockquote className="font-serif text-2xl md:text-4xl text-[#0A0A0A] leading-snug mb-10 max-w-2xl mx-auto">
            &ldquo;We will never sell you a stone you don&apos;t understand, a metal you
            can&apos;t verify, or a story that isn&apos;t{" "}
            <em className="not-italic text-[#3A5A78]">entirely true.</em>&rdquo;
          </blockquote>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/shop" className="btn-gold inline-flex items-center h-11 px-8">
              Shop the Collection
            </Link>
            <Link
              href="/faq"
              className="font-sans text-[12px] tracking-[0.2em] text-[#9A9A9A] uppercase hover:text-[#3A5A78] transition-colors"
            >
              Read Our FAQ
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
