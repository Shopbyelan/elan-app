import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story — Élan Fine Jewellery",
  description:
    "How two friends set out to build fine jewellery for a generation of women building something real — real metals, honest prices, no apology.",
};

type StoryBlock =
  | { kind: "p"; text: string }
  | { kind: "lead"; text: string }
  | { kind: "stack"; lines: string[] };

const story: StoryBlock[] = [
  { kind: "p", text: "Ours started somewhere between a flight, a dream, and the quiet frustration of two young women who couldn’t find what they were looking for." },
  { kind: "p", text: "We were travelling — the way you do when you’re young and ambitious and trying to figure out what your mark on the world looks like. We weren’t looking for a business idea. We were just looking. At cultures, at people, at the way women move through the world and what they choose to wear while doing it." },
  { kind: "lead", text: "And we kept noticing the same thing everywhere we went." },
  { kind: "p", text: "The women who turned heads weren’t always wearing the most. They were wearing the right things. Precise. Considered. Quietly expensive-looking without screaming about it. Jewellery that felt like it belonged to someone who knew exactly who she was." },
  { kind: "p", text: "We came home and started asking questions we couldn’t find good answers to." },
  { kind: "p", text: "Where does a young professional woman in Lagos, in Abuja, in London — a woman building something real with her life — find jewellery that actually matches who she is? Pieces that are genuinely fine. Made with real metals, real stones, real craftsmanship. That don’t turn green by Thursday. That don’t fall apart after three wears. That don’t require a trust fund to own." },
  { kind: "lead", text: "The gap was so obvious once we saw it we couldn’t unsee it." },
  { kind: "p", text: "Luxury jewellery in Nigeria either meant heirloom pieces locked in a mother’s wardrobe — or costume jewellery dressed up in fine language. There was almost nothing in between for the woman who is building her wealth right now. The woman who deserves something real today, not someday." },
  { kind: "lead", text: "So we built it." },
  { kind: "p", text: "Élan started the way all honest businesses do — with a very specific problem and an obsessive commitment to solving it properly." },
  { kind: "p", text: "We didn’t want to sell jewellery. We wanted to change what jewellery meant for our generation." },
  { kind: "p", text: "We spent months learning everything. The difference between 18k and 24k gold, and why the world’s finest jewellery houses have always chosen 18k. The science of cultivated diamonds — real diamonds, grown in a laboratory, identical in every way to mined stones, at a fraction of the price and none of the ethical cost. The extraordinary story of crystal moissanite — born from a meteorite crater in 1893, more brilliant than a diamond by every measurable standard, and almost entirely unknown to the women who would love it most." },
  { kind: "p", text: "We learned that most jewellery brands keep this knowledge to themselves." },
  { kind: "lead", text: "We decided ours never would." },
  { kind: "p", text: "Élan is built on a simple belief: that luxury should not require a secret to understand it." },
  { kind: "p", text: "Every material we use is independently verified. Every stone is certified or hallmarked. Every piece arrives with documentation that tells you exactly what you own and why it matters. Because we believe that knowing your jewellery — truly understanding what you’re wearing and why it was made the way it was — is part of the luxury itself." },
  {
    kind: "stack",
    lines: [
      "We are not a fast fashion brand with a gold finish.",
      "We are not a legacy house with a legacy price tag.",
      "We are something new — and we think it’s exactly what this generation of women has been waiting for.",
    ],
  },
  { kind: "lead", text: "Fine jewellery. Real metals. Honest prices. No apology." },
  { kind: "p", text: "We built Élan for the woman who wakes up knowing what she wants and moves through her day looking like she always has. For the lawyer who needs something that holds its own in a boardroom and a restaurant in the same afternoon. For the entrepreneur who understands value better than most and refuses to pay for a name when she can pay for the thing itself. For the young woman who is not yet where she is going but dresses like she already arrived." },
  { kind: "p", text: "For every woman who has ever picked up a piece of jewellery, turned it over in her hands, and thought: I deserve something real." },
  { kind: "lead", text: "You do." },
  { kind: "p", text: "That is why we are here." },
];

const principles = [
  {
    code: "01",
    title: "Our Philosophy",
    body: "Effortless luxury that celebrates individuality, confidence, and meaningful self-expression.",
  },
  {
    code: "02",
    title: "Our Vision",
    body: "To become a timeless luxury jewelry house known for refined design and emotional connection.",
  },
  {
    code: "03",
    title: "Our Mission",
    body: "To create beautifully crafted pieces that make women feel confident, elevated, and uniquely themselves.",
  },
  {
    code: "04",
    title: "Our Values",
    body: "Quality, intentionality, elegance, individuality, and timelessness.",
  },
  {
    code: "05",
    title: "Our Belief",
    body: "Jewelry is more than an accessory — it is a reflection of who you are and the moments you choose to remember.",
  },
];

function Divider() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#85A0B5]/40" />
      <svg width="8" height="8" viewBox="0 0 8 8" className="text-[#3A5A78]" fill="currentColor">
        <rect x="0" y="4" width="5.66" height="5.66" transform="rotate(-45 0 4)" />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#85A0B5]/40" />
    </div>
  );
}

export default function OurStoryPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-[#F7F5F2] border-b border-[#E4E1DA] py-16 md:py-24 px-4 text-center">
        <p className="font-sans text-[11px] tracking-[0.4em] text-[#3A5A78] uppercase mb-4">
          Our Story
        </p>
        <h1 className="font-serif text-4xl md:text-6xl text-[#0A0A0A] mb-4 max-w-3xl mx-auto leading-tight">
          Some of the best things start with a conversation{" "}
          <em className="text-[#3A5A78] not-italic">between friends.</em>
        </h1>
      </div>

      {/* Story */}
      <article className="max-w-2xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <div className="space-y-6">
          {story.map((block, i) => {
            if (block.kind === "lead") {
              return (
                <p key={i} className="font-serif text-2xl md:text-3xl text-[#0A0A0A] leading-snug py-4">
                  {block.text}
                </p>
              );
            }
            if (block.kind === "stack") {
              return (
                <div key={i} className="border-l-2 border-[#85A0B5] pl-6 my-10 space-y-3">
                  {block.lines.map((line) => (
                    <p key={line} className="font-serif text-xl md:text-2xl text-[#0A0A0A] leading-snug">
                      {line}
                    </p>
                  ))}
                </div>
              );
            }
            return (
              <p key={i} className="font-sans text-[15px] text-[#4A4A4A] leading-relaxed">
                {block.text}
              </p>
            );
          })}
        </div>

        {/* Sign-off */}
        <div className="text-center mt-16 md:mt-20">
          <Divider />
          <p className="font-serif text-3xl md:text-4xl text-[#0A0A0A] mt-10 mb-3">
            Minimalist. Unique. <em className="not-italic text-[#3A5A78]">Yours.</em>
          </p>
          <p className="font-sans text-[11px] tracking-[0.3em] text-[#6B6B6B] uppercase">
            Welcome to Élan Fine Jewels
          </p>
        </div>
      </article>

      {/* Principles */}
      <div className="bg-[#F7F5F2] border-y border-[#E4E1DA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <p className="font-sans text-[11px] tracking-[0.4em] text-[#3A5A78] uppercase mb-4 text-center">
            What We Stand For
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-[#0A0A0A] text-center mb-12 md:mb-16">
            The House of Élan
          </h2>
          <div className="space-y-px bg-[#E4E1DA]">
            {principles.map((p) => (
              <div key={p.code} className="relative bg-[#FFFFFF] p-8 md:p-10 overflow-hidden">
                <span className="absolute top-4 right-6 font-serif text-7xl md:text-8xl text-[#F7F5F2] leading-none select-none pointer-events-none">
                  {p.code}
                </span>
                <div className="relative max-w-2xl">
                  <h3 className="font-serif text-2xl md:text-3xl text-[#0A0A0A] mb-3 leading-snug">
                    {p.title}
                  </h3>
                  <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 md:py-24 text-center">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Link href="/shop" className="btn-gold inline-flex items-center h-11 px-8">
            Shop the Collection
          </Link>
          <Link
            href="/materials"
            className="font-sans text-[12px] tracking-[0.2em] text-[#9A9A9A] uppercase hover:text-[#3A5A78] transition-colors"
          >
            Explore Our Materials
          </Link>
        </div>
      </div>
    </>
  );
}
