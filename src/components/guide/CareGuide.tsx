"use client";

import { useState } from "react";

const TABS = ["All Pieces", "18k Gold", "Sterling Silver", "Platinum", "Stones"] as const;
type Tab = (typeof TABS)[number];

// ── Shared primitives ────────────────────────────────────────────────────────

function SpecBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F7F5F2] p-6 md:p-8">
      <span className="border border-[#85A0B5]/40 px-4 py-1.5 font-sans text-[10px] tracking-[0.35em] text-[#3A5A78] uppercase">
        {children}
      </span>
    </div>
  );
}

function SafeSection({ metalName, items }: { metalName: string; items: string[] }) {
  return (
    <div className="bg-[#F7F5F2] p-6 md:p-8">
      <p className="font-sans text-[11px] tracking-[0.35em] text-[#3A5A78] uppercase mb-5">
        ✓ Safe for {metalName}
      </p>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-2 w-1 h-1 rounded-full bg-[#85A0B5]/50 shrink-0" />
            <span className="font-sans text-sm text-[#6B6B6B] leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AvoidSection({ metalName, items }: { metalName: string; items: string[] }) {
  return (
    <div className="bg-[#150505] p-6 md:p-8">
      <p className="font-sans text-[11px] tracking-[0.35em] text-[#8B3232] uppercase mb-5">
        ✗ Avoid with {metalName}
      </p>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-2 w-1 h-1 rounded-full bg-[#8B3232]/50 shrink-0" />
            <span className="font-sans text-sm text-[#6B6B6B] leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NotesSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#F7F5F2] p-6 md:p-8">
      <p className="font-sans text-[11px] tracking-[0.35em] text-[#3A5A78] uppercase mb-5">{title}</p>
      {children}
    </div>
  );
}

function Callout({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-[#85A0B5]/40 bg-[#FFFFFF] pl-4 py-3 pr-4">
      <p className="font-sans text-[10px] tracking-[0.3em] text-[#3A5A78] uppercase mb-1.5">{label}</p>
      <p className="font-serif text-sm text-[#9A9A9A] italic leading-relaxed">{children}</p>
    </div>
  );
}

function StoneCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#F7F5F2] p-6 md:p-8">
      <div className="mb-5">
        <span className="border border-[#85A0B5]/40 px-4 py-1.5 font-sans text-[10px] tracking-[0.35em] text-[#3A5A78] uppercase">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

// ── Tab content ───────────────────────────────────────────────────────────────

function AllPiecesContent() {
  const steps = [
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
        "Chlorine in pools and hot tubs permanently weakens gold and silver alloys at a molecular level. Remove Élan pieces before swimming, bathing, and exercise.",
      ],
    },
    {
      icon: "💍",
      num: "04",
      title: "Annual Prong Check",
      body: [
        "Every stone-set piece should be professionally inspected every 12–18 months. Prong wear is invisible to the naked eye until a stone becomes loose.",
        "Registered Élan clients receive one complimentary annual inspection — we check every prong, setting, and clasp, tighten where needed, and return it fully polished.",
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
  ];

  return (
    <div className="space-y-px bg-[#E4E1DA]">
      {steps.map((step) => (
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
          </div>
        </div>
      ))}
    </div>
  );
}

function GoldContent() {
  return (
    <div className="space-y-px bg-[#E4E1DA]">
      <SpecBadge>18K Gold · 750 Hallmarked</SpecBadge>
      <SafeSection
        metalName="18k Gold"
        items={[
          "Warm soapy water with soft brush",
          "Lint-free polishing cloths",
          "Professional ultrasonic (for set pieces — confirm with us first)",
          "Professional steam clean (at jeweller)",
          "Jewellery-specific polishing creams",
        ]}
      />
      <AvoidSection
        metalName="18k Gold"
        items={[
          "Chlorine — permanently damages alloy structure",
          "Bleach and household cleaning chemicals",
          "Abrasive materials (toothpaste, baking soda)",
          "Acetone (nail polish remover)",
          "Extended saltwater exposure",
          "Direct heat sources (hairdryers, steam rooms)",
        ]}
      />
      <NotesSection title="Gold-Specific Notes">
        <ul className="space-y-4 max-w-2xl">
          <li className="font-sans text-sm text-[#6B6B6B] leading-relaxed">
            <strong className="text-[#3A3A3A] font-normal">Yellow &amp; Rose Gold:</strong>{" "}
            Does not tarnish. Light surface scratches develop into a desirable &ldquo;patina&rdquo; over time. Polish to restore original finish.
          </li>
          <li className="font-sans text-sm text-[#6B6B6B] leading-relaxed">
            <strong className="text-[#3A3A3A] font-normal">White Gold:</strong>{" "}
            Naturally light yellow — rhodium-plated to appear white. Re-plating recommended every 1–2 years for regularly worn pieces, or when yellowing becomes visible.
          </li>
        </ul>
      </NotesSection>
    </div>
  );
}

function SilverContent() {
  return (
    <div className="space-y-px bg-[#E4E1DA]">
      <SpecBadge>925 Sterling Silver · Rhodium Plated</SpecBadge>
      <SafeSection
        metalName="Sterling Silver"
        items={[
          "Warm water and gentle dish soap",
          "Specialist silver polishing cloth (dry polish only)",
          "Soft, lint-free cloth for drying",
          "Anti-tarnish storage pouches",
          "Élan re-plating service (every 2–3 years)",
        ]}
      />
      <AvoidSection
        metalName="Sterling Silver"
        items={[
          "Liquid silver dip solutions — strip rhodium plating",
          "Ultrasonic cleaners (can damage rhodium layer)",
          "Rubber bands and elastic — accelerate tarnishing",
          "Sulfur-rich environments (hot springs, eggs, certain foods)",
          "Perfume, hairspray, and lotions directly on the piece",
          "Chlorine and swimming pools",
        ]}
      />
      <NotesSection title="About Tarnishing">
        <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed mb-5 max-w-2xl">
          Our rhodium plating significantly delays tarnishing. If dulling occurs, a gentle polish with a specialist cloth will restore brilliance. For deeper tarnishing, contact us for a professional re-plate service — this fully restores the mirror finish and typically takes 5–7 business days.
        </p>
        <div className="max-w-2xl">
          <Callout label="Storage Tip">
            Store silver in an anti-tarnish cloth pouch with a small silica gel packet. This absorbs moisture and dramatically slows tarnishing.
          </Callout>
        </div>
      </NotesSection>
    </div>
  );
}

function PlatinumContent() {
  return (
    <div className="space-y-px bg-[#E4E1DA]">
      <SpecBadge>950 Platinum · Naturally White</SpecBadge>
      <SafeSection
        metalName="Platinum"
        items={[
          "Warm soapy water with soft brush",
          "Lint-free polishing cloth",
          "Professional ultrasonic cleaning",
          "Professional steam cleaning",
          "Professional high-polish service to remove patina",
        ]}
      />
      <AvoidSection
        metalName="Platinum"
        items={[
          "Chlorine — weakens the metal over time",
          "Abrasive polishing compounds",
          "Storing with softer metals (platinum will scratch them)",
          "Impact and hard knocks — can bend fine settings",
        ]}
      />
      <NotesSection title="Understanding Platinum Patina">
        <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed max-w-2xl">
          Platinum develops a natural surface bloom — a soft, satiny lustre that many connoisseurs love. Unlike other metals, platinum is not lost when scratched; the metal simply displaces. This patina can always be professionally polished back to a mirror finish by our team on request — free of charge in your first year of ownership.
        </p>
      </NotesSection>
    </div>
  );
}

function StonesContent() {
  return (
    <div className="space-y-px bg-[#E4E1DA]">
      <StoneCard title="Cultivated Diamond">
        <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed max-w-2xl">
          Diamond is the hardest substance on earth (10 Mohs). It is highly resistant to scratching but can chip under sharp impact — particularly on pointed or thin girdle cuts. Clean with warm soapy water and a soft brush. Safe for ultrasonic and steam cleaning in secure settings. Store separately — diamonds will scratch every other stone and most metals.
        </p>
      </StoneCard>
      <StoneCard title="Crystal Moissanite">
        <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed max-w-2xl">
          Crystal moissanite rates 9.25 Mohs — extraordinarily durable. Clean with warm soapy water and a soft brush. Safe for ultrasonic cleaning in secure settings. Moissanite is highly resistant to heat and chemical exposure compared to most gems. Store individually to prevent it from scratching softer stones. Its brilliance does not diminish with age.
        </p>
      </StoneCard>
      <StoneCard title="General Stone Care">
        <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed max-w-2xl mb-5">
          Regardless of stone, always remove jewellery before impact activities, heavy exercise, and swimming. Even the hardest stones can chip on a sharp edge. Inspect settings regularly — a loose stone is far easier to fix than a lost one. All Élan stone-set pieces qualify for our complimentary annual setting inspection.
        </p>
        <div className="max-w-2xl">
          <Callout label="Remember">
            Never use toothpaste on any stone or metal. Despite common advice, it is mildly abrasive and will dull polished surfaces over time.
          </Callout>
        </div>
      </StoneCard>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function CareGuide() {
  const [activeTab, setActiveTab] = useState<Tab>("All Pieces");

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 font-sans text-[12px] tracking-[0.2em] uppercase border transition-all duration-200 ${
              activeTab === tab
                ? "bg-[#85A0B5] text-black border-[#85A0B5]"
                : "border-[#E4E1DA] text-[#9A9A9A] hover:border-[#85A0B5] hover:text-[#3A5A78]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "All Pieces" && <AllPiecesContent />}
      {activeTab === "18k Gold" && <GoldContent />}
      {activeTab === "Sterling Silver" && <SilverContent />}
      {activeTab === "Platinum" && <PlatinumContent />}
      {activeTab === "Stones" && <StonesContent />}
    </div>
  );
}
