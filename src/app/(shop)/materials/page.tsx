import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Materials — Understanding Your Élan",
  description: "Learn about the premium materials used in every Élan piece — 18k Gold, Sterling Silver 925, Cultivated Diamonds, Platinum 950, and Crystal Moissanite.",
};

const materials = [
  {
    id: "gold",
    code: "18k",
    name: "18k Gold",
    subtitle: "75% Pure Gold · The Jeweller's Choice · Hallmark 750c",
    body: [
      "18 karat gold means 75% of the metal is pure gold, with 25% composed of precision alloys — silver, copper, zinc, or palladium — chosen for durability while preserving gold's legendary warmth and colour richness.",
      "This is not a compromise. It is the intentional standard of Cartier, Van Cleef & Arpels, and every house whose pieces outlast generations. 24k is too soft to hold a stone, too fragile to hold its form. 18k is the gold of heirlooms.",
      "Each Élan gold piece is hallmarked 750c — verifying its purity — and finished to a polish that only hand-craftsmanship can achieve.",
    ],
    gradient: "gradient-gold",
    variants: ["18k Yellow Gold", "18k White Gold", "18k Rose Gold"],
    href: "/shop?category=18k-gold",
  },
  {
    id: "silver",
    code: "925",
    name: "Sterling Silver",
    subtitle: "92.5% Pure Silver · Rhodium Plated · Anti-Tarnish Sealed",
    body: [
      "Sterling silver — marked 925 — is 92.5% pure silver alloyed with copper for strength. At Élan, every sterling piece is rhodium-plated: a process that adds a hard, platinum-group metal barrier that prevents tarnishing and gives the piece a brilliant, mirror-like finish.",
      "Our anti-tarnish sealing means your Élan silver remains pristine far longer than conventional sterling. Properly maintained, it will serve as a faithful companion for decades.",
    ],
    gradient: "gradient-silver",
    href: "/shop?category=sterling-silver",
  },
  {
    id: "diamond",
    code: "4C",
    name: "Cultivated Diamond",
    subtitle: "Lab-Grown · GIA Certified · Chemically Identical to Mined",
    body: [
      "Cultivated diamonds are not imitations. They share every chemical, physical, and optical property with mined diamonds — the same hardness (10 on the Mohs scale), the same refractive index, the same fire.",
      "The difference is origin: cultivated diamonds are grown in controlled environments using the same carbon crystallisation processes that nature takes millions of years to complete — done in weeks with precision technology.",
      "Every Élan cultivated diamond is graded by GIA standards — Cut, Colour, Clarity, Carat. You receive a stone specification card with your piece.",
    ],
    gradient: "gradient-diamond",
    href: "/shop?category=cultivated-diamond",
  },
  {
    id: "platinum",
    code: "950",
    name: "Platinum",
    subtitle: "95% Pure · Rarer Than Gold · Hypoallergenic",
    body: [
      "Platinum is the rarest precious metal used in jewellery. Hallmarked 950, Élan platinum pieces are 95% pure — higher purity than most gold alloys.",
      "Unlike white gold, which requires periodic rhodium re-plating to maintain its appearance, platinum's natural white colour is permanent. It does not fade, does not tarnish. When it develops a patina over time, this is called 'platinum's natural beauty' — a soft lustre that collectors prize.",
      "Platinum is also hypoallergenic, making it the ideal choice for those with sensitive skin.",
    ],
    gradient: "gradient-platinum",
    href: "/shop?category=platinum",
  },
  {
    id: "moissanite",
    code: "DEF",
    name: "Crystal Moissanite",
    subtitle: "DEF Colour · VVS Clarity · 2.4× the Fire of Diamond",
    body: [
      "Originally discovered in meteorites by Nobel Prize winner Henri Moissan, moissanite is now grown with precision into the most brilliant stone available — with a refractive index of 2.65, versus diamond's 2.42.",
      "In practice: moissanite throws more fire. Its dispersion of light into spectral colours is measurably greater than diamond. To the eye, it is breathtaking.",
      "Élan uses only DEF-colour, VVS-clarity crystal moissanite — the top tier of the grading scale. Each stone is accompanied by an Élan Stone Specification Card.",
    ],
    gradient: "gradient-moiss",
    href: "/shop?category=crystal-moissanite",
  },
];

export default function MaterialsPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-[#0D0D0D] border-b border-[#141414] py-16 md:py-24 px-4 text-center">
        <p className="font-sans text-[9px] tracking-[0.4em] text-[#85A0B5] uppercase mb-4">
          Knowledge is Luxury
        </p>
        <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">
          Understanding Your <em className="text-[#85A0B5] not-italic">Élan</em>
        </h1>
        <p className="font-sans text-sm text-[#9A9A9A] max-w-xl mx-auto leading-relaxed">
          True luxury is not just owning something rare — it is understanding what you carry and why it matters.
        </p>
      </div>

      {/* Material nav */}
      <div className="sticky top-16 md:top-20 z-30 bg-[#0A0A0A]/95 backdrop-blur border-b border-[#141414]">
        <div className="max-w-4xl mx-auto px-4 flex gap-6 overflow-x-auto py-4">
          {materials.map((m) => (
            <a key={m.id} href={`#${m.id}`} className="flex-shrink-0 font-sans text-[10px] tracking-[0.2em] text-[#5A5A5A] uppercase hover:text-[#85A0B5] transition-colors">
              {m.name}
            </a>
          ))}
        </div>
      </div>

      {/* Materials */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-24">
        {materials.map((mat, idx) => (
          <section key={mat.id} id={mat.id}>
            {/* Tabs nav */}
            <div className="hidden">
              {["18K GOLD", "STERLING SILVER", "CULTIVATED DIAMOND", "PLATINUM", "CRYSTAL MOISSANITE"].map((t) => (
                <button key={t} className="font-sans text-[10px] tracking-[0.2em] uppercase">{t}</button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Visual */}
              <div className={`${idx % 2 === 1 ? "md:order-2" : ""}`}>
                <div className={`aspect-square relative overflow-hidden ${mat.gradient}`}>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <span className="font-serif text-7xl md:text-8xl text-[#85A0B5]">{mat.code}</span>
                    <p className="font-sans text-[9px] tracking-[0.3em] text-[#9A9A9A] uppercase mt-4">
                      {mat.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${idx % 2 === 1 ? "md:order-1" : ""}`}>
                <p className="font-sans text-[9px] tracking-[0.3em] text-[#85A0B5] uppercase mb-3">
                  {["18K GOLD", "STERLING SILVER", "CULTIVATED DIAMOND", "PLATINUM", "CRYSTAL MOISSANITE"][idx]}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">{mat.name}</h2>
                <p className="font-sans text-xs text-[#5A5A5A] tracking-wider mb-8">{mat.subtitle}</p>

                <div className="space-y-4 mb-10">
                  {mat.body.map((para, i) => (
                    <p key={i} className="font-sans text-sm text-[#9A9A9A] leading-relaxed">{para}</p>
                  ))}
                </div>

                {mat.variants && (
                  <div className="mb-8">
                    <p className="font-sans text-[9px] tracking-[0.25em] text-[#5A5A5A] uppercase mb-3">
                      Available In
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mat.variants.map((v) => (
                        <span key={v} className="px-3 py-1.5 border border-[#2A2A2A] font-sans text-[10px] tracking-[0.15em] text-[#9A9A9A]">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href={mat.href}
                  className="inline-flex items-center gap-3 btn-gold h-11 px-8"
                >
                  Shop {mat.name} →
                </Link>
              </div>
            </div>

            {idx < materials.length - 1 && (
              <div className="mt-24 h-px bg-gradient-to-r from-transparent via-[#2A2A2A] to-transparent" />
            )}
          </section>
        ))}
      </div>
    </>
  );
}
