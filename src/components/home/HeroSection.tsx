"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    src: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1920&q=90",
    alt: "Elegant woman adorned in fine jewellery",
    position: "object-center",
  },
  {
    src: "https://images.unsplash.com/photo-1573408301185-9519eb7ed3ab?auto=format&fit=crop&w=1920&q=90",
    alt: "Model wearing a luxury necklace",
    position: "object-top",
  },
  {
    src: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1920&q=90",
    alt: "Fine jewellery portrait",
    position: "object-center",
  },
  {
    src: "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?auto=format&fit=crop&w=1920&q=90",
    alt: "Woman wearing elegant earrings",
    position: "object-top",
  },
  {
    src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1920&q=90",
    alt: "Luxury jewellery editorial portrait",
    position: "object-center",
  },
];

const INTERVAL = 5500;

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(p => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent(p => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, INTERVAL);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#0A0A0A]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Photo carousel ── */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slides[current].src}
            alt={slides[current].alt}
            fill
            className={`object-cover ${slides[current].position}`}
            priority={current === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlays — left dark panel + bottom vignette */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/10 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]/25 pointer-events-none" />

      {/* ── Brand content ── */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-14 lg:px-24 max-w-2xl py-28 md:py-0">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="h-px w-12 bg-[#85A0B5]/50" />
          <span className="font-sans text-[9px] tracking-[0.4em] text-[#85A0B5] uppercase">
            Where Rarity Becomes Ritual
          </span>
        </motion.div>

        {/* ÉLAN badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-10"
        >
          <div className="inline-flex flex-col items-center bg-[#85A0B5] px-12 py-8 shadow-2xl">
            <span className="font-serif text-5xl md:text-6xl tracking-[0.22em] text-[#0A0A0A]">
              ÉLAN
            </span>
            <span className="font-sans text-[7px] tracking-[0.5em] text-[#0A0A0A]/60 uppercase mt-1.5">
              Fine Jewellery
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mb-10"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.4rem] text-white leading-[1.12] mb-5">
            Worn by{" "}
            <em className="text-[#85A0B5] not-italic">Royalty.</em>
          </h1>
          <p className="font-sans text-sm text-[#9A9A9A] max-w-sm leading-relaxed mb-3">
            Where Cartier&apos;s precision meets Tiffany&apos;s poetry — and surpasses both.
          </p>
          <p className="font-sans text-[10px] text-[#5A5A5A] tracking-[0.3em] uppercase">
            Fine Jewellery · Est. in Excellence
          </p>
        </motion.div>

        {/* Material tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {[
            { label: "18k Gold", silver: false },
            { label: "Sterling Silver 925", silver: true },
            { label: "Cultivated Diamond", silver: false },
            { label: "Platinum 950", silver: false },
          ].map(({ label, silver }) => (
            <span
              key={label}
              className={`px-3 py-1.5 border font-sans text-[9px] tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer backdrop-blur-sm ${
                silver
                  ? "border-[#85A0B5]/35 text-[#85A0B5]/70 hover:border-[#85A0B5] hover:text-[#85A0B5]"
                  : "border-white/10 text-white/40 hover:border-[#85A0B5]/60 hover:text-[#85A0B5]"
              }`}
            >
              {label}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button variant="gold" size="lg" asChild>
            <Link href="/shop">Discover the Collection</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/materials">Our Materials</Link>
          </Button>
        </motion.div>
      </div>

      {/* ── Slide counter top-right ── */}
      <div className="absolute top-8 right-8 z-20 font-sans text-[10px] tracking-[0.3em] text-white/30 hidden md:block">
        {String(current + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(slides.length).padStart(2, "0")}
      </div>

      {/* ── Arrow buttons ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/10 text-white/40 hover:border-[#85A0B5]/70 hover:text-[#85A0B5] transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/10 text-white/40 hover:border-[#85A0B5]/70 hover:text-[#85A0B5] transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* ── Line indicators ── */}
      <div className="absolute bottom-10 left-8 md:left-14 lg:left-24 z-20 flex gap-2 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className="relative h-px overflow-hidden transition-all duration-500 focus:outline-none"
            style={{ width: i === current ? 40 : 16 }}
          >
            <span className="absolute inset-0 bg-white/20" />
            {i === current && (
              <motion.span
                className="absolute inset-0 bg-[#85A0B5]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                style={{ transformOrigin: "left" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Scroll indicator bottom-right ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 right-8 z-20 hidden md:flex flex-col items-end gap-2"
      >
        <span className="font-sans text-[9px] tracking-[0.3em] text-white/20 uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
