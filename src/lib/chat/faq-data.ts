export interface FaqItem {
  q: string;
  a: string;
}

export interface FaqCategory {
  category: string;
  items: FaqItem[];
}

/**
 * Single source of truth for Élan's FAQ copy — rendered by FAQSection.tsx
 * and flattened into the chat assistant's system prompt (see
 * src/lib/chat/system-prompt.ts) so the bot never invents policy details.
 */
export const faqData: FaqCategory[] = [
  {
    category: "Our Materials",
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
