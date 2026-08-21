"use client";

import { useState } from "react";
import { faqData } from "@/lib/chat/faq-data";

const categoryIcons: Record<string, React.ReactNode> = {
  "Our Materials": (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
      <path d="M9 2L12 6H6L9 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M6 6L3 10L9 16L15 10L12 6H6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M6 6L9 11L12 6" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M3 10H15" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  "Product & Quality": (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
      <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2.5 9H6M12 9H15.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M9 2.5V6M9 12V15.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  "Orders & Delivery": (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
      <path d="M3 6L9 3L15 6V12L9 15L3 12V6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M9 3V15" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3 6L9 9L15 6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  ),
  "Returns & Exchanges": (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
      <rect x="2.5" y="2.5" width="13" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 9.5L4.5 8L6 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 8H10.5C11.6 8 12.5 8.9 12.5 10V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  "Care & Maintenance": (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
      <path d="M9 3C9 3 4 8 4 11.5C4 14 6.2 16 9 16C11.8 16 14 14 14 11.5C14 8 9 3 9 3Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M6.5 12C6.5 12 7 13.5 9 13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  "Sustainability & Ethics": (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
      <path d="M9 2L9.9 6.6H14.6L10.8 9.3L12.2 14L9 11.3L5.8 14L7.2 9.3L3.4 6.6H8.1L9 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  ),
  "About Élan": (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="flex-shrink-0">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.2" />
      <path d="M11.2 7.2C10.8 6.5 10 6 9 6C7.3 6 6 7.3 6 9C6 10.7 7.3 12 9 12C10 12 10.8 11.5 11.2 10.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
};

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
                  {categoryIcons[section.category]}
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
                    {categoryIcons[section.category]}
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
