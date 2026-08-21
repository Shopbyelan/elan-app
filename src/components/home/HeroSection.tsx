"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  src: string;
  /**
   * These are portrait/square campaign photos being object-cover cropped into
   * a full-bleed frame, so the crop axis flips between breakpoints: on a
   * narrow mobile viewport the image is height-constrained (full height
   * shown, sides cropped), on a wide desktop viewport it's width-constrained
   * (full width shown, top/bottom cropped). Each needs its own focal point
   * per axis, hence separate Tailwind object-position classes per breakpoint
   * rather than a single object-center.
   */
  positionClassName: string;
}

const SLIDES: Slide[] = [
  { src: "/hero-flower-shell.png", positionClassName: "object-[50%_center] md:object-[center_98%]" },
  { src: "/hero-profile-earring.jpg", positionClassName: "object-[62%_center] md:object-[center_57%]" },
  { src: "/hero-hand-ring.png", positionClassName: "object-[50%_center] md:object-[center_40%]" },
  { src: "/hero-heart-studs-stone.png", positionClassName: "object-[42%_center] md:object-[center_45%]" },
  { src: "/hero-rings-stone.png", positionClassName: "object-[58%_center] md:object-[center_55%]" },
];

const SLIDE_DURATION_MS = 6000;

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, SLIDE_DURATION_MS);
    return () => clearInterval(id);
  }, [paused, next, current]);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#0A0A0A]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Photo carousel */}
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={SLIDES[current].src}
            alt="Élan fine jewellery"
            fill
            className={`object-cover ${SLIDES[current].positionClassName}`}
            priority={current === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark gradient overlay — kept regardless of body theme, purely for text legibility over the photo */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0A0A0A]/75 via-[#0A0A0A]/10 to-[#0A0A0A]/30 pointer-events-none" />

      {/* Slide counter */}
      <div className="absolute top-8 right-8 z-10 font-sans text-[12px] tracking-[0.3em] text-white/60 hidden md:block">
        {String(current + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(SLIDES.length).padStart(2, "0")}
      </div>

      {/* Prev/Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 h-10 w-10 flex items-center justify-center border border-white/15 text-white/60 hover:text-white hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 h-10 w-10 flex items-center justify-center border border-white/15 text-white/60 hover:text-white hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Headline + CTA — pointer-events-none so this full-height wrapper doesn't
          steal clicks meant for the arrows/dots sitting at the same z-index;
          only the actual CTA button opts back in. */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-end text-center px-6 pb-32 md:pb-40 pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6"
        >
          Timeless Luxury.
          <br />
          <em className="text-[#85A0B5] not-italic">Crafted to Last.</em>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="pointer-events-auto"
        >
          <Button variant="gold" size="lg" asChild>
            <Link href="/shop">Shop Collection</Link>
          </Button>
        </motion.div>
      </div>

      {/* Line-segment slide indicators with progress animation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-2 items-center">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative h-px w-10 overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/25" />
            {i === current && (
              <motion.span
                key={current}
                className="absolute inset-0 bg-[#85A0B5]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: paused ? undefined : 1 }}
                transition={{ duration: paused ? 0 : SLIDE_DURATION_MS / 1000, ease: "linear" }}
                style={{ transformOrigin: "left" }}
              />
            )}
            {i < current && <span className="absolute inset-0 bg-white/60" />}
          </button>
        ))}
      </div>
    </section>
  );
}
