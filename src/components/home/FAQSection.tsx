"use client";

import { useState } from "react";

const faqData = [
  {
    category: "Our Materials",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
        <path d="M9 2L12 6H6L9 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M6 6L3 10L9 16L15 10L12 6H6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M6 6L9 11L12 6" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M3 10H15" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    items: [
      {
        q: "What does 18k gold actually mean?",
        a: "18k means 75% pure gold alloyed with metals like copper, silver or palladium for strength. It's the standard used by Cartier and Van Cleef & Arpels — durable enough for daily wear, pure enough to last generations. We never use anything below 18k.",
      },
      {
        q: "What is Sterling Silver 925 and why does it have that number?",
        a: "The 925 stamp is a legal hallmark meaning 92.5% of the metal is pure silver. The remaining 7.5% is copper for structural strength. All our silver is rhodium-plated to prevent tarnishing and maintain its mirror brilliance.",
      },
      {
        q: "Is a cultivated diamond a real diamond?",
        a: "Completely. A cultivated (lab-grown) diamond is 100% real diamond — pure carbon, identical in every chemical, optical and physical way to a mined diamond. The only difference is origin. Ours come with GIA or IGI certification and full 4C grading.",
      },
      {
        q: "What is the difference between a cultivated diamond and crystal moissanite?",
        a: "A cultivated diamond is a real diamond grown in a lab. Crystal moissanite is a completely different gemstone — silicon carbide — with its own extraordinary properties. Moissanite actually has more fire (rainbow dispersion) than a diamond, and rates 9.25 on the Mohs hardness scale. We will always clearly identify which stone is in every piece. We never misrepresent moissanite as diamond.",
      },
      {
        q: "Why is platinum more expensive than gold?",
        a: "Platinum is significantly rarer than gold, nearly twice as dense, and requires far more expertise to work with. Unlike white gold, which is yellow gold alloyed and plated to appear white, platinum is naturally and permanently white — it never needs re-plating and will outlast any other metal.",
      },
    ],
  },
  {
    category: "Product & Quality",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
        <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2.5 9H6M12 9H15.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M9 2.5V6M9 12V15.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    items: [
      {
        q: "Do all your pieces come with a certificate?",
        a: "Yes, always. Every Élan piece includes a Certificate of Authenticity detailing the exact metal purity (independently hallmarked), stone grade and origin, and craftsperson ID. Cultivated diamonds include their original GIA or IGI grading report. Moissanite pieces include our Élan Stone Specification Card.",
      },
      {
        q: "Are your pieces hallmarked?",
        a: "Every piece is independently hallmarked and third-party tested — 750 for 18k gold, 925 for sterling silver, 950 for platinum. These are not claims we make ourselves. They are legal certifications.",
      },
      {
        q: "Do you offer bespoke or custom pieces?",
        a: "Yes. We offer bespoke design consultations for engagement rings, anniversary pieces, and heirloom commissions. Custom pieces require a minimum 6–8 week lead time and are final sale. Contact us to begin the conversation.",
      },
      {
        q: "What sizes are available?",
        a: "Rings are available in standard UK/US sizing. We offer complimentary resizing within 30 days of purchase on non-bespoke pieces (one resize per purchase). Bracelets and bangles are listed with internal diameter measurements. Our size guide is available in Client Services.",
      },
    ],
  },
  {
    category: "Orders & Delivery",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
        <path d="M3 6L9 3L15 6V12L9 15L3 12V6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M9 3V15" stroke="currentColor" strokeWidth="1.2" />
        <path d="M3 6L9 9L15 6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    items: [
      {
        q: "How is my order packaged?",
        a: "Every Élan order arrives in our signature matte black gift box, wrapped in tissue, accompanied by a silk dust pouch, Certificate of Authenticity, stone specification card, and a personalised care guide. We do not use branded courier bags — your package arrives looking like the gift it is.",
      },
      {
        q: "Do you offer gift wrapping?",
        a: "All orders are gift-ready by default at no extra charge. We also offer handwritten gift notes — add your message at checkout.",
      },
      {
        q: "How long does delivery take?",
        a: "Standard delivery is 3–5 business days. Express 1–2 business day delivery is available at checkout. All orders are fully insured in transit and require a signature on delivery. International delivery times vary by destination — typically 5–10 business days.",
      },
      {
        q: "Is my order insured during shipping?",
        a: "Yes. Every order is fully insured for its full retail value from the moment it leaves our studio until it is signed for at your door.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
        <rect x="2.5" y="2.5" width="13" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6 9.5L4.5 8L6 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.5 8H10.5C11.6 8 12.5 8.9 12.5 10V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    items: [
      {
        q: "Can I return my order?",
        a: "Élan accepts returns of unworn, unaltered pieces in original packaging within 2 days of confirmed delivery. The piece must be in its original condition with all documentation enclosed. Your Certificate of Authenticity must be included — it is required for all return processing.",
      },
      {
        q: "What items are non-returnable?",
        a: "Custom-sized rings, engraved pieces, and all bespoke commissions are final sale. This is because they have been created exclusively for you.",
      },
      {
        q: "How do I make an exchange?",
        a: "Exchanges are accepted within 14 days of confirmed delivery, subject to inspection and approval. The piece must be unworn and in its original condition, with the original box, silk pouch, and documentation included. Contact Client Services to initiate — we'll provide a prepaid, insured return label and issue full credit toward an equal- or higher-value Élan piece once approved.",
      },
      {
        q: "What is Élan's refund policy?",
        a: "Élan does not offer refunds for change of mind, preference, sizing, or other reasons unrelated to a fault on our part. If an item arrives damaged, defective, incorrect, or materially different from what was ordered due to an error on our part, contact Client Services within 48 hours of delivery with photographs — we will arrange an immediate replacement or a full refund to the original payment method.",
      },
    ],
  },
  {
    category: "Care & Maintenance",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
        <path d="M9 3C9 3 4 8 4 11.5C4 14 6.2 16 9 16C11.8 16 14 14 14 11.5C14 8 9 3 9 3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M6.5 12C6.5 12 7 13.5 9 13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    items: [
      {
        q: "How do I clean my jewellery at home?",
        a: "Warm water, one drop of gentle dish soap, a soft-bristle brush, and a lint-free cloth. That is all you need for most pieces. Never use paper towels (micro-scratches), ultrasonic cleaners at home, or harsh chemicals. Full care guidance is in your package.",
      },
      {
        q: "My silver piece is looking dull — what do I do?",
        a: "Rhodium-plated silver can be refreshed with a specialist silver polishing cloth. Do not use liquid silver dip products on plated pieces — they strip the rhodium. For a full refresh, bring it to us or contact us to arrange service. Re-plating takes approximately 5–7 business days.",
      },
      {
        q: "How often should I have my ring professionally serviced?",
        a: "We recommend a professional inspection every 12–18 months for any stone-set piece. Prong wear is invisible to the eye until a stone becomes loose. Élan offers complimentary annual inspections for all registered clients — just book through Client Services.",
      },
      {
        q: "Does platinum scratch?",
        a: "Platinum can show surface scratches with daily wear — this develops into what jewellers call a \"patina bloom,\" which many connoisseurs love for its romantic, aged quality. Unlike other metals, platinum is not lost when scratched — the metal simply moves. It can always be returned to a high-polish mirror finish by our team upon request.",
      },
    ],
  },
  {
    category: "Sustainability & Ethics",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
        <path d="M9 2L9.9 6.6H14.6L10.8 9.3L12.2 14L9 11.3L5.8 14L7.2 9.3L3.4 6.6H8.1L9 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
    items: [
      {
        q: "Where does your gold come from?",
        a: "All Élan gold is sourced through certified responsible mining channels that meet international ethical sourcing standards. Our supply chain is documented and available upon request.",
      },
      {
        q: "Are cultivated diamonds environmentally better?",
        a: "Yes, significantly. Lab-grown diamonds eliminate the land disruption, water usage, and carbon footprint associated with mining. They are also conflict-free by nature. Same stone. Cleaner origin.",
      },
      {
        q: "Is moissanite ethical?",
        a: "Crystal moissanite is 100% laboratory-created — no mining involved whatsoever. It is one of the most sustainable fine jewellery choices available.",
      },
    ],
  },
  {
    category: "About Élan",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.2" />
        <path d="M11.2 7.2C10.8 6.5 10 6 9 6C7.3 6 6 7.3 6 9C6 10.7 7.3 12 9 12C10 12 10.8 11.5 11.2 10.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    items: [
      {
        q: "Is Élan a luxury brand or a fashion brand?",
        a: "Élan is a fine jewellery house. We use only 18k gold, 925 sterling silver, 950 platinum, certified cultivated diamonds, and crystal moissanite. Every piece is hallmarked, certified, and backed by a certificate of authenticity. We are not fashion jewellery. We are pieces you will pass down.",
      },
      {
        q: "Why are your prices lower than traditional luxury houses?",
        a: "Because we choose not to spend your money on retail square footage and legacy marketing. Our cultivated diamonds give you the same stone for a fraction of the mined price. Our moissanite offers extraordinary brilliance at accessible luxury pricing. We believe the stone and the craft should speak — not the markup.",
      },
      {
        q: "How do I know I can trust Élan?",
        a: "Every claim we make is independently verified. Every metal is hallmarked by a third party. Every diamond comes with a GIA or IGI certificate. Every piece ships with documentation. We have never — and will never — misrepresent a material, a stone, or a price. Transparency is not a policy at Élan. It is the brand.",
      },
    ],
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#E4E1DA]">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-sans text-sm text-[#3A3A3A] tracking-wide leading-relaxed group-hover:text-[#0A0A0A] transition-colors duration-200">
          {question}
        </span>
        <span
          className={`flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center border border-[#E4E1DA] text-[#3A5A78] transition-all duration-300 ${
            isOpen ? "rotate-45 border-[#85A0B5]" : "group-hover:border-[#85A0B5]"
          }`}
          aria-hidden
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <line x1="5" y1="0" x2="5" y2="10" stroke="currentColor" strokeWidth="1.2" />
            <line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="font-sans text-sm text-[#9A9A9A] leading-relaxed pb-5 pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-[#FFFFFF] border-t border-[#E4E1DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10 md:mb-16">
          <p className="font-sans text-[11px] tracking-[0.4em] text-[#3A5A78] uppercase mb-4">
            Client Services
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-[#0A0A0A]">
            Frequently Asked <em className="text-[#3A5A78] not-italic">Questions</em>
          </h1>
        </div>

        {/* ── Mobile layout ── */}
        <div className="md:hidden">
          {/* Category list card */}
          <div className="border border-[#E4E1DA] mb-8">
            {faqData.map((section, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveCategory(i);
                  setOpenItems({});
                }}
                className={`w-full flex items-center gap-3.5 px-4 py-4 border-b border-[#E4E1DA] last:border-b-0 text-left transition-all duration-200 ${
                  activeCategory === i
                    ? "text-[#3A5A78] bg-[#F7F5F2] border-l-2 border-l-[#85A0B5]"
                    : "text-[#9A9A9A]"
                }`}
              >
                <span className={`transition-colors duration-200 ${activeCategory === i ? "text-[#3A5A78]" : "text-[#9A9A9A]"}`}>
                  {section.icon}
                </span>
                <span className="font-sans text-[12px] tracking-[0.25em] uppercase">
                  {section.category}
                </span>
              </button>
            ))}
          </div>

          {/* Active category label */}
          <div className="mb-4 pb-3 border-b border-[#E4E1DA]">
            <p className="font-sans text-[11px] tracking-[0.4em] text-[#3A5A78] uppercase">
              {faqData[activeCategory].category}
            </p>
          </div>

          {/* Accordion items */}
          <div>
            {faqData[activeCategory].items.map((item, i) => {
              const key = `${activeCategory}-${i}`;
              return (
                <AccordionItem
                  key={key}
                  question={item.q}
                  answer={item.a}
                  isOpen={!!openItems[key]}
                  onToggle={() => toggleItem(key)}
                />
              );
            })}
          </div>
        </div>

        {/* ── Desktop layout ── */}
        <div className="hidden md:flex gap-16">
          {/* Sidebar */}
          <div className="w-56 lg:w-64 flex-shrink-0">
            <nav className="sticky top-8 border border-[#E4E1DA]">
              {faqData.map((section, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveCategory(i);
                    setOpenItems({});
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3.5 border-b border-[#E4E1DA] last:border-b-0 text-left transition-all duration-200 ${
                    activeCategory === i
                      ? "text-[#3A5A78] bg-[#F7F5F2] border-l-2 border-l-[#85A0B5]"
                      : "text-[#9A9A9A] hover:text-[#6B6B6B]"
                  }`}
                >
                  <span className={`transition-colors duration-200 ${activeCategory === i ? "text-[#3A5A78]" : "text-[#9A9A9A]"}`}>
                    {section.icon}
                  </span>
                  <span className="font-sans text-[12px] tracking-[0.2em] uppercase">
                    {section.category}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* FAQ items */}
          <div className="flex-1 min-w-0">
            <div className="mb-6 pb-4 border-b border-[#E4E1DA]">
              <h3 className="font-sans text-[11px] tracking-[0.4em] text-[#3A5A78] uppercase">
                {faqData[activeCategory].category}
              </h3>
            </div>
            <div>
              {faqData[activeCategory].items.map((item, i) => {
                const key = `${activeCategory}-${i}`;
                return (
                  <AccordionItem
                    key={key}
                    question={item.q}
                    answer={item.a}
                    isOpen={!!openItems[key]}
                    onToggle={() => toggleItem(key)}
                  />
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
