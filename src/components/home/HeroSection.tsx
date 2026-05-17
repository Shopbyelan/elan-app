"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg, transparent, transparent 59px, #C9A84C 59px, #C9A84C 60px
          ), repeating-linear-gradient(
            90deg, transparent, transparent 59px, #C9A84C 59px, #C9A84C 60px
          )`,
        }}
      />

      {/* Subtle gold glow center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A84C]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-6 mb-10"
        >
          <div className="h-px w-16 bg-[#C9A84C]/40" />
          <span className="font-sans text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase">
            Where Rarity Becomes Ritual
          </span>
          <div className="h-px w-16 bg-[#C9A84C]/40" />
        </motion.div>

        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex flex-col items-center bg-[#85A0B5] px-16 py-10 mx-auto">
            <span className="font-serif text-5xl md:text-7xl tracking-[0.2em] text-[#0A0A0A]">
              ÉLAN
            </span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
            Worn by{" "}
            <em className="text-[#C9A84C] not-italic">Royalty.</em>
          </h1>
          <p className="font-sans text-sm md:text-base text-[#9A9A9A] max-w-xl mx-auto leading-relaxed mb-4">
            Where Cartier&apos;s precision meets Tiffany&apos;s poetry — and surpasses both.
          </p>
          <p className="font-sans text-xs text-[#5A5A5A] max-w-md mx-auto leading-relaxed">
            Fine Jewellery · Est. in Excellence
          </p>
        </motion.div>

        {/* Material tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mt-10 mb-12"
        >
          {["18k Gold", "Sterling Silver 925", "Cultivated Diamond", "Platinum 950", "Crystal Moissanite"].map((tag) => (
            <span
              key={tag}
              className={`px-4 py-2 border border-[#2A2A2A] font-sans text-[10px] tracking-[0.2em] text-[#5A5A5A] uppercase transition-colors cursor-pointer ${
                tag === "Sterling Silver 925"
                  ? "hover:border-[#85A0B5] hover:text-[#85A0B5]"
                  : "hover:border-[#C9A84C] hover:text-[#C9A84C]"
              }`}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="gold" size="lg" asChild>
            <Link href="/shop">Discover the Collection</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/materials">Our Materials</Link>
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-[9px] tracking-[0.3em] text-[#3A3A3A] uppercase">
          Discover
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[#3A3A3A] to-transparent" />
      </motion.div>
    </section>
  );
}
