"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function StandardsSection() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 bg-[#F7F5F2]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-[11px] tracking-[0.4em] text-[#3A5A78] uppercase mb-4">
            Shop By Collection
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-[#0A0A0A] mb-4">
            Select Your <em className="text-[#3A5A78] not-italic">Standard</em>
          </h2>
          <p className="font-sans text-sm text-[#6B6B6B] max-w-lg mx-auto leading-relaxed">
            Every tier is exceptional. The difference is in the metal, the stone,
            and the statement you wish to make.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { label: "All", href: "/shop", active: true },
            { label: "18k Gold", href: "/shop?category=18k-gold", active: false },
            { label: "Sterling Silver", href: "/shop?category=sterling-silver", active: false },
            { label: "Cultivated Diamond", href: "/shop?category=cultivated-diamond", active: false },
            { label: "Platinum", href: "/shop?category=platinum", active: false },
            { label: "Crystal Moissanite", href: "/shop?category=crystal-moissanite", active: false },
          ].map((tab) => (
            <Link
              key={tab.label}
              href={tab.href}
              className={`px-4 py-2 font-sans text-[12px] tracking-[0.2em] uppercase border transition-all duration-200 ${
                tab.active
                  ? "bg-[#85A0B5] text-black border-[#85A0B5]"
                  : tab.label === "Sterling Silver"
                  ? "border-[#E4E1DA] text-[#9A9A9A] hover:border-[#85A0B5] hover:text-[#3A5A78]"
                  : "border-[#E4E1DA] text-[#9A9A9A] hover:border-[#85A0B5] hover:text-[#3A5A78]"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button variant="gold" size="lg" asChild>
            <Link href="/shop">Discover the Collection</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
