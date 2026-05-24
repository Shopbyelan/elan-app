"use client";

import { useState } from "react";

const TABS = ["All Pieces", "18k Gold", "Sterling Silver", "Platinum", "Stones"] as const;
type Tab = (typeof TABS)[number];

type Step = { icon: string; num: string; title: string; body: string[]; callout?: { label: string; text: string } };

const content: Record<Tab, Step[]> = {
  "All Pieces": [
    {
      icon: "🫧",
      num: "01",
      title: "Weekly Home Clean",
      body: [
        "Warm water, one drop of gentle dish soap, and a soft-bristle toothbrush. Brush gently around prongs, settings, and engravings. Rinse thoroughly under running warm water.",
        "Pat dry immediately with a clean, lint-free cloth — never rub, never use paper towels (micro-scratches). Leave to air-dry completely before storing.",
      ],
    },
    {
      icon: "📦",
      num: "02",
      title: "Storage",
      body: [
        "Store every piece individually in its Élan silk pouch or original box. Storing jewellery together allows harder stones — diamond and moissanite — to scratch softer metals and other gems.",
        "Keep away from direct sunlight, humidity, and extreme temperature changes. A cool, dry drawer is ideal. Never store in a bathroom.",
      ],
    },
    {
      icon: "🧴",
      num: "03",
      title: "Chemical Avoidance",
      body: [
        "Remove all jewellery before applying perfume, body lotion, sunscreen, hairspray, or cleaning products. Put jewellery on last — after all beauty products have dried.",
        "Chlorine in pools and hot tubs permanently weakens gold and silver alloys at a molecular level. Sweat and gym equipment cause gradual surface wear. Remove Élan pieces before swimming, bathing, and exercise.",
      ],
    },
    {
      icon: "💍",
      num: "04",
      title: "Annual Prong Check",
      body: [
        "Every stone-set piece should be professionally inspected every 12–18 months. Prong wear is invisible to the naked eye until a stone becomes loose.",
        "Registered Élan clients receive one complimentary annual inspection — bring or post your piece to us and we will check every prong, setting, and clasp, tighten where needed, and return it fully polished.",
      ],
    },
    {
      icon: "✨",
      num: "05",
      title: "Professional Polish",
      body: [
        "A professional polish restores the factory finish on any metal. We recommend this every 2–3 years for regularly worn pieces. Élan offers polishing as part of our annual inspection service.",
        "For pieces with intentional matte or brushed finishes, inform us before polishing — these require a different technique to preserve the texture.",
      ],
    },
    {
      icon: "🔬",
      num: "06",
      title: "Ultrasonic Cleaning",
      body: [
        "Professional ultrasonic cleaning is safe for most diamond and moissanite pieces in secure settings. Avoid for: emeralds, opals, turquoise, pearls, and any treated or fracture-filled stones — vibration can crack inclusions or loosen fillings.",
        "Avoid for pieces with pavé settings where many small stones are closely set. Always consult Élan before any ultrasonic service.",
      ],
    },
  ],
  "18k Gold": [
    {
      icon: "🌊",
      num: "01",
      title: "Avoid Water & Chemicals",
      body: [
        "Remove 18k gold before swimming, bathing, or using cleaning products. Chlorine and saltwater cause progressive surface damage to gold alloys. Even brief repeated exposure weakens the metal over time.",
      ],
    },
    {
      icon: "🧴",
      num: "02",
      title: "Apply Products First",
      body: [
        "Always put jewellery on last — after all perfumes, lotions, and sprays have fully dried. Gold is a soft metal by nature; chemical residue accelerates wear on the surface and prong settings.",
      ],
    },
    {
      icon: "✨",
      num: "03",
      title: "Polishing & Replating",
      body: [
        "Yellow 18k gold can be professionally polished to restore its warm lustre. White gold is rhodium-plated — this plating wears over time with daily wear and will need refreshing every 1–3 years depending on use.",
        "Rose gold is a natural alloy and does not require replating — its colour is permanent.",
      ],
    },
    {
      icon: "📦",
      num: "04",
      title: "Separate Storage",
      body: [
        "Store individually in the provided Élan silk pouch. Diamonds and moissanite stones can scratch gold surfaces when stored together. Use separate compartments for each piece.",
      ],
    },
  ],
  "Sterling Silver": [
    {
      icon: "🪞",
      num: "01",
      title: "Regular Polishing",
      body: [
        "Use a specialist silver polishing cloth to refresh the rhodium-plated surface. Do not use liquid silver dip products — they strip the rhodium plating and can permanently dull the finish.",
        "Our silver pieces are rhodium-plated to prevent tarnishing. With proper care, the plating remains bright for years.",
      ],
    },
    {
      icon: "💧",
      num: "02",
      title: "Moisture & Tarnish Prevention",
      body: [
        "Exposure to air and moisture triggers tarnish on unplated silver. Store in the provided anti-tarnish silk pouch and avoid leaving pieces exposed on surfaces. Never store in a bathroom.",
        "If your piece begins to dull, this is a surface oxidation and can be corrected — not a defect in the metal.",
      ],
    },
    {
      icon: "🔄",
      num: "03",
      title: "Rhodium Re-plating",
      body: [
        "Rhodium plating will eventually wear in areas of highest friction — ring shanks, bracelet undersides. When you notice the base silver appearing, contact us for re-plating.",
        "Re-plating takes approximately 5–7 business days and restores your piece to its original mirror finish.",
      ],
    },
    {
      icon: "🧴",
      num: "04",
      title: "Chemical Avoidance",
      body: [
        "Silver is more reactive than gold. Remove before applying any topical products. Chlorine exposure can permanently stain and pit sterling silver surfaces beyond restoration.",
      ],
    },
  ],
  Platinum: [
    {
      icon: "🌸",
      num: "01",
      title: "Embrace the Patina",
      body: [
        "Platinum develops a natural surface texture over time called patina bloom — a soft, satin-like appearance that many connoisseurs prize. Unlike other metals, platinum is not lost when scratched; the metal simply displaces.",
        "If you prefer the original high-polish mirror finish, professional polishing will restore it completely at any time.",
      ],
    },
    {
      icon: "✨",
      num: "02",
      title: "Professional Polishing",
      body: [
        "Platinum can be polished as frequently as desired without the metal thinning. Its extraordinary density means polishing removes only microscopic amounts of surface material.",
        "We recommend polishing every 3–5 years for everyday-worn pieces, or whenever you wish to refresh the finish.",
      ],
    },
    {
      icon: "🔬",
      num: "03",
      title: "Ultrasonic Cleaning",
      body: [
        "Platinum is highly compatible with professional ultrasonic cleaning for diamond and moissanite-set pieces. The metal's density and stability make it the safest fine jewellery metal for professional cleaning methods.",
        "Always confirm stone type before ultrasonic cleaning — the limitation is the stone, not the platinum.",
      ],
    },
    {
      icon: "💍",
      num: "04",
      title: "Prong Inspection",
      body: [
        "Platinum prongs hold stones exceptionally well due to the metal's grip strength. Annual inspection is still recommended — not because platinum is weak, but because all stone settings benefit from professional review.",
      ],
    },
  ],
  Stones: [
    {
      icon: "💎",
      num: "01",
      title: "Diamond & Moissanite Cleaning",
      body: [
        "Warm water, a drop of dish soap, and a soft toothbrush is sufficient for weekly home cleaning. Both diamond and moissanite attract oils and can appear dull between cleans — this is normal and easily corrected.",
        "Both stones are safe for professional ultrasonic cleaning in secure settings. The brilliance will immediately return after a thorough clean.",
      ],
    },
    {
      icon: "🔍",
      num: "02",
      title: "Prong Inspection for Set Stones",
      body: [
        "Stone-set pieces should be professionally inspected every 12–18 months. Prong wear is invisible to the naked eye until a stone is already loose. Do not wait until you feel movement — inspect proactively.",
        "Registered Élan clients receive one complimentary annual prong inspection. Book through Client Services.",
      ],
    },
    {
      icon: "📦",
      num: "03",
      title: "Stone Storage",
      body: [
        "Diamond and moissanite (hardness 10 and 9.25 respectively) will scratch every other gemstone and most metals when stored together. Always store separately in individual Élan pouches.",
        "Never store loose stones or stone-set pieces with softer gemstones — pearls, opals, turquoise, and amber are particularly vulnerable.",
      ],
    },
    {
      icon: "⚠️",
      num: "04",
      title: "Avoid Thermal Shock",
      body: [
        "Avoid exposing stone-set pieces to sudden extreme temperature changes — moving from cold to very hot environments rapidly. While diamonds and moissanite are extremely durable, thermal shock can affect the settings and prongs around them.",
        "Remove fine jewellery before saunas, steam rooms, and exposure to direct high heat sources.",
      ],
    },
  ],
};

export function CareGuide() {
  const [activeTab, setActiveTab] = useState<Tab>("All Pieces");
  const steps = content[activeTab];

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 font-sans text-[10px] tracking-[0.2em] uppercase border transition-all duration-200 ${
              activeTab === tab
                ? "bg-[#85A0B5] text-black border-[#85A0B5]"
                : "border-[#2A2A2A] text-[#5A5A5A] hover:border-[#85A0B5] hover:text-[#85A0B5]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Steps */}
      <div className="space-y-px bg-[#1A1A1A]">
        {steps.map((step) => (
          <div key={step.num} className="relative bg-[#0F0F0F] p-6 md:p-8 overflow-hidden">
            {/* Faint step number */}
            <span className="absolute top-4 right-5 font-serif text-7xl md:text-8xl text-[#1A1A1A] leading-none select-none pointer-events-none">
              {step.num}
            </span>

            <div className="relative">
              <span className="text-2xl mb-4 block">{step.icon}</span>
              <p className="font-sans text-[9px] tracking-[0.35em] text-[#85A0B5] uppercase mb-3">
                {step.title}
              </p>
              <div className="space-y-3 max-w-2xl">
                {step.body.map((para, i) => (
                  <p key={i} className="font-sans text-sm text-[#9A9A9A] leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              {step.callout && (
                <div className="mt-5 border-l-2 border-[#85A0B5]/40 bg-[#111111] pl-4 py-3 pr-4 max-w-2xl">
                  <p className="font-sans text-[8px] tracking-[0.3em] text-[#85A0B5] uppercase mb-1.5">
                    {step.callout.label}
                  </p>
                  <p className="font-serif text-sm text-[#5A5A5A] italic leading-relaxed">
                    {step.callout.text}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
