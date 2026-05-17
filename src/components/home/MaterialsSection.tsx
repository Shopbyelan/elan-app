"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const materials = [
  {
    code: "18k",
    name: "Gold Purity Standard",
    description:
      "75% pure gold. The jeweller's choice — hallmarked 750. Endures generations without compromise.",
    href: "/materials#gold",
  },
  {
    code: "925",
    name: "Sterling Silver Hallmark",
    description:
      "92.5% pure silver, rhodium-plated. Anti-tarnish sealed for lasting brilliance.",
    href: "/materials#silver",
  },
  {
    code: "4C",
    name: "Diamond Grading Certified",
    description:
      "Cut · Colour · Clarity · Carat. Every stone graded and certified by GIA standards.",
    href: "/materials#diamond",
  },
  {
    code: "950",
    name: "Platinum Purity",
    description:
      "95% pure platinum. Rarer than gold, stronger than white gold. The prestige standard.",
    href: "/materials#platinum",
  },
];

export function MaterialsSection() {
  return (
    <section className="py-20 md:py-32 bg-[#0A0A0A] border-t border-b border-[#141414]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-sans text-[9px] tracking-[0.4em] text-[#C9A84C] uppercase mb-4">
            Knowledge is Luxury
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-white">
            Understanding Your{" "}
            <em className="text-[#C9A84C] not-italic">Élan</em>
          </h2>
          <p className="font-sans text-sm text-[#9A9A9A] max-w-xl mx-auto mt-4 leading-relaxed">
            True luxury is not just owning something rare — it is understanding what you carry and why it matters.
          </p>
        </motion.div>

        {/* Material grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#141414]">
          {materials.map((mat, i) => (
            <motion.div
              key={mat.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-[#0A0A0A] p-8 md:p-10 group hover:bg-[#111] transition-colors duration-300"
            >
              <p className="font-serif text-5xl md:text-6xl text-[#C9A84C] mb-4 leading-none">
                {mat.code}
              </p>
              <p className="font-sans text-[9px] tracking-[0.25em] text-[#5A5A5A] uppercase mb-4">
                {mat.name}
              </p>
              <p className="font-sans text-xs text-[#9A9A9A] leading-relaxed">
                {mat.description}
              </p>
              <Link
                href={mat.href}
                className="inline-flex items-center gap-2 mt-6 font-sans text-[10px] tracking-[0.2em] text-[#C9A84C] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                Learn more →
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/materials"
            className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.25em] text-[#9A9A9A] uppercase hover:text-[#C9A84C] transition-colors"
          >
            <div className="h-px w-12 bg-[#2A2A2A]" />
            Explore All Materials
            <div className="h-px w-12 bg-[#2A2A2A]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
