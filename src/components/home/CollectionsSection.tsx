"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const collections = [
  {
    name: "The Golden Epoch",
    italicName: "Golden Epoch",
    label: "Featured Collection",
    slug: "18k-gold",
    gradient: "gradient-gold",
    description: "18k yellow gold pieces crafted for timeless elegance.",
    badge: "18K GOLD",
  },
  {
    name: "Silver Éclat",
    italicName: "Éclat",
    label: "New Arrival",
    slug: "sterling-silver",
    gradient: "gradient-silver",
    description: "Sterling silver 925 with rhodium plating for lasting brilliance.",
    badge: "925 SILVER",
  },
  {
    name: "Cultivé Lumière",
    italicName: "Lumière",
    label: "GIA Certified",
    slug: "cultivated-diamond",
    gradient: "gradient-diamond",
    description: "Lab-grown diamonds with the same fire as mined stones.",
    badge: "LAB DIAMOND",
  },
  {
    name: "Platinum Absolue",
    italicName: "Absolue",
    label: "Prestige",
    slug: "platinum",
    gradient: "gradient-platinum",
    description: "Platinum 950 — the ultimate expression of purity.",
    badge: "PLATINUM",
  },
  {
    name: "Moissanite Constellation",
    italicName: "Constellation",
    label: "Crystal Moissanite",
    slug: "crystal-moissanite",
    gradient: "gradient-moiss",
    description: "DEF colour crystal moissanite in white gold halo settings.",
    badge: "MOISSANITE",
  },
];

export function CollectionsSection() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="font-sans text-[11px] tracking-[0.4em] text-[#3A5A78] uppercase mb-4">
          Curated Collections
        </p>
        <h2 className="font-serif text-3xl md:text-5xl text-[#0A0A0A]">
          The{" "}
          <em className="text-[#3A5A78] not-italic">Élan</em>
          {" "}Edit
        </h2>
      </div>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible md:pb-0 snap-x snap-mandatory">
        {collections.map((col, i) => (
          <motion.div
            key={col.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="flex-shrink-0 w-64 md:w-auto snap-start"
          >
            <Link
              href={`/shop?category=${col.slug}`}
              className={`group block relative aspect-[3/4] overflow-hidden transition-shadow duration-500 ${
                col.slug === "sterling-silver"
                  ? "hover:shadow-[0_0_40px_rgba(133,160,181,0.12)]"
                  : ""
              }`}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 ${col.gradient} transition-all duration-500 group-hover:scale-105`} />

              {/* Subtle noise texture */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-5">
                {/* Badge */}
                <span className={`self-start font-sans text-[11px] tracking-[0.25em] uppercase bg-black/30 px-2.5 py-1 ${
                  col.slug === "sterling-silver" ? "text-[#3A5A78]" : "text-[#6B6B6B]"
                }`}>
                  {col.label}
                </span>

                {/* Title */}
                <div>
                  <h3 className="font-serif text-lg text-white leading-tight mb-1">
                    {col.name.split(" ")[0]}{" "}
                    <br />
                    <em className="text-[#3A5A78] not-italic">{col.italicName}</em>
                  </h3>
                  <p className="font-sans text-[12px] text-[#6B6B6B] leading-relaxed hidden group-hover:block transition-all">
                    {col.description}
                  </p>
                  <button className="mt-4 font-sans text-[12px] tracking-[0.2em] text-[#3A5A78] uppercase flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explore →
                  </button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
