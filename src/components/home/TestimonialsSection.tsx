"use client";

const testimonials = [
  {
    quote:
      "I came knowing nothing about moissanite. They explained everything — the fire, the difference, why it suited my lifestyle. I left feeling like the most educated woman in the room.",
    name: "Temitope A.",
    product: "Crystal Moissanite Solitaire",
    location: "Lagos",
  },
  {
    quote:
      "The packaging alone made me feel like royalty before I even opened the box. The certificate, the silk pouch, the care card — every detail communicated: you have bought something real.",
    name: "Isabelle M.",
    product: "18k Rose Gold Collection",
    location: "London",
  },
  {
    quote:
      "I chose a cultivated diamond because I could not justify the cost or ethics of mining. Élan didn't just sell me a stone. They gave me a story I am genuinely proud to tell.",
    name: "Halima Y.",
    product: "Cultivated Diamond Ring",
    location: "Abuja",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 mb-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="text-[#3A5A78]">
          <path d="M7 1L8.545 5.09H13L9.5 7.636L10.91 12L7 9.273L3.09 12L4.5 7.636L1 5.09H5.455L7 1Z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <p className="font-sans text-[11px] tracking-[0.45em] text-[#3A5A78] uppercase mb-5">
            Client Voices
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-[#0A0A0A]">
            Worn &amp; <em className="not-italic text-[#6B6B6B]">Adored</em>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E4E1DA]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-[#F7F5F2] px-7 py-8 md:px-8 md:py-10 flex flex-col"
            >
              <Stars />

              <blockquote className="font-serif text-base md:text-[17px] text-[#3A3A3A] italic leading-relaxed flex-1 mb-8">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <footer>
                <p className="font-sans text-[12px] tracking-[0.25em] text-[#3A3A3A] uppercase mb-1">
                  {t.name}
                </p>
                <p className="font-sans text-[10px] tracking-[0.25em] text-[#9A9A9A] uppercase">
                  {t.product} &nbsp;·&nbsp; {t.location}
                </p>
              </footer>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
