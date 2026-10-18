"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

/**
 * Hotspot coordinates are percentages of the source photo (864×1080, 4:5).
 * The frames below are locked to the same 4:5 aspect ratio so object-cover
 * never crops, which keeps each dot sitting on its piece at every breakpoint.
 */
interface Hotspot {
  n: number;
  x: number;
  y: number;
  label: string;
  href: string;
}

const LOOK: Hotspot[] = [
  { n: 1, x: 61, y: 68, label: "Marquise Cluster Pendant", href: "/shop?type=necklace" },
  { n: 2, x: 39, y: 74.5, label: "Tennis Bracelet", href: "/shop?type=bracelet" },
  { n: 3, x: 18, y: 47.5, label: "Filigree Statement Ring", href: "/shop?type=ring" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function HotspotDot({ spot }: { spot: Hotspot }) {
  return (
    <Link
      href={spot.href}
      aria-label={`${spot.n}. Shop ${spot.label}`}
      className="group/dot absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
    >
      <span className="absolute inset-0 rounded-full bg-white/40 animate-ping motion-reduce:animate-none" />
      <span className="relative flex h-6 w-6 items-center justify-center rounded-full border border-white/70 bg-[#0A0A0A]/50 backdrop-blur-sm font-sans text-[10px] text-white transition-colors duration-300 group-hover/dot:bg-white group-hover/dot:text-[#0A0A0A]">
        {spot.n}
      </span>
      {/* Label appears on hover/focus for pointer devices; touch users get the legend below */}
      <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap bg-white px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.2em] text-[#0A0A0A] opacity-0 transition-opacity duration-300 group-hover/dot:opacity-100 group-focus-visible/dot:opacity-100 hidden md:block">
        {spot.label} →
      </span>
    </Link>
  );
}

export function CampaignSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Gentle counter-drift between the frames gives the spread depth as it scrolls past
  const driftSlow = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [40, -40]);
  const driftFast = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [90, -60]);

  return (
    <section
      ref={ref}
      aria-labelledby="campaign-heading"
      className="relative overflow-hidden bg-[#0A0806] py-24 md:py-36 px-4 sm:px-6"
    >
      {/* Amber glow lifted from the campaign's backdrop light */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[640px] w-[640px] rounded-full bg-[#C8873A]/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[480px] w-[480px] rounded-full bg-[#7A4A1E]/20 blur-[120px]" />

      {/* Oversized watermark word */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute right-[-2vw] top-10 select-none font-serif italic text-[22vw] leading-none text-white/[0.03] md:top-6"
      >
        Lumière
      </p>

      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-0">
          {/* ── Hero frame with shoppable hotspots ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1"
          >
            <figure className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/campaign-golden-hour-portrait.jpg"
                  alt="Model in warm amber light wearing an Élan marquise cluster pendant, tennis bracelet and filigree ring"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                {LOOK.map((spot) => (
                  <HotspotDot key={spot.n} spot={spot} />
                ))}
              </div>
              {/* Offset hairline frame — a quiet editorial detail */}
              <div className="pointer-events-none absolute -bottom-4 -right-4 -z-10 hidden h-full w-full border border-[#C8873A]/30 md:block" />

              <figcaption className="mt-10">
                <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.4em] text-[#C9A27A]">
                  Shop the Look
                </p>
                <ol className="divide-y divide-white/10 border-y border-white/10">
                  {LOOK.map((spot) => (
                    <li key={spot.n}>
                      <Link
                        href={spot.href}
                        className="group flex items-center justify-between py-3.5 font-sans text-[12px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
                      >
                        <span className="flex items-center gap-4">
                          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 text-[9px] text-white/60 group-hover:border-white group-hover:text-white">
                            {spot.n}
                          </span>
                          {spot.label}
                        </span>
                        <span className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </figcaption>
            </figure>
          </motion.div>

          {/* ── Copy + supporting frames ── */}
          <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="-order-1 lg:order-none lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:pl-8 lg:pt-10"
            >
              <p className="mb-5 flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.4em] text-[#C9A27A]">
                <span className="h-px w-10 bg-[#C9A27A]/60" />
                The Campaign
              </p>
              <h2 id="campaign-heading" className="mb-6 font-serif text-4xl leading-[1.05] text-white md:text-6xl">
                The Golden
                <br />
                <em className="text-[#E2C29B]">Hour.</em>
              </h2>
              <p className="mb-10 max-w-md font-sans text-sm leading-relaxed text-white/60">
                When the light turns low and warm, every facet answers. A study in shadow
                and brilliance — pieces made to be noticed in the moments that matter most.
              </p>
            </motion.div>

          <div className="flex flex-col lg:col-span-6 lg:col-start-7 lg:row-start-2 lg:pl-8">
            {/* Two supporting frames, staggered with counter-parallax */}
            <div className="relative grid grid-cols-2 gap-4 md:gap-6">
              <motion.div style={{ y: driftSlow }} className="relative">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative aspect-[4/5] overflow-hidden"
                >
                  <Image
                    src="/campaign-golden-hour-silhouette.jpg"
                    alt="Silhouetted model against amber light wearing an Élan pendant, bracelet and rings"
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                </motion.div>
                <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.3em] text-white/40">
                  No. 02 — Silhouette
                </p>
              </motion.div>

              <motion.div style={{ y: driftFast }} className="relative mt-16 md:mt-24">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href="/shop?type=necklace"
                    className="group relative block aspect-[4/5] overflow-hidden"
                    aria-label="Shop necklaces — station necklace and pavé rings"
                  >
                    <Image
                      src="/campaign-golden-hour-stations.jpg"
                      alt="Close-up of an Élan diamond station necklace layered with pavé band rings"
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0806]/80 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                    <span className="absolute inset-x-0 bottom-0 p-4 md:p-5 font-sans text-[10px] uppercase tracking-[0.25em] text-white">
                      <span className="border-b border-white/40 pb-1 transition-colors group-hover:border-white">
                        Shop Necklaces →
                      </span>
                    </span>
                  </Link>
                </motion.div>
                <p className="mt-3 font-sans text-[10px] uppercase tracking-[0.3em] text-white/40">
                  No. 03 — Stations
                </p>
              </motion.div>
            </div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-16 md:mt-24"
            >
              <Button variant="gold" size="lg" asChild>
                <Link href="/shop">Explore the Collection</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
