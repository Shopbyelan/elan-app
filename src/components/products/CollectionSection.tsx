import Image from "next/image";
import { ProductCard } from "@/components/products/ProductCard";
import type { ProductWithRelations } from "@/lib/products";

interface CollectionSectionProps {
  label: string;
  heading: string;
  products: ProductWithRelations[];
  viewAllHref: string;
  background?: "bg" | "bg-alt";
  /** Optional editorial photo shown as the first tile in the carousel. */
  feature?: {
    src: string;
    alt: string;
    eyebrow: string;
    caption: string;
    /** CSS object-position, to keep the jewellery in frame when cropped. */
    focus?: string;
  };
}

export function CollectionSection({
  label,
  heading,
  products,
  viewAllHref,
  background = "bg",
  feature,
}: CollectionSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className={`py-20 md:py-28 px-4 sm:px-6 ${background === "bg-alt" ? "bg-[#F7F5F2]" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-sans text-[11px] tracking-[0.4em] text-[#3A5A78] uppercase mb-3">
              {label}
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0A0A0A]">
              {heading}
            </h2>
          </div>
          <a
            href={viewAllHref}
            className="hidden md:flex items-center gap-2 font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase hover:text-[#3A5A78] transition-colors"
          >
            View all →
          </a>
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-4 px-4 pb-2 sm:-mx-6 sm:px-6">
          {feature && (
            <a
              href={viewAllHref}
              className="group relative flex-shrink-0 w-[min(75%,320px)] sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-3rem)/4)] min-h-[420px] snap-start overflow-hidden bg-[#0A0A0A]"
            >
              <Image
                src={feature.src}
                alt={feature.alt}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 75vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ objectPosition: feature.focus ?? "center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-[#0A0A0A]/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-sans text-[10px] tracking-[0.35em] text-[#C4CDD6] uppercase mb-2">
                  {feature.eyebrow}
                </p>
                <p className="font-serif text-2xl text-white leading-snug mb-4">{feature.caption}</p>
                <span className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.2em] text-white uppercase border-b border-white/40 pb-1 group-hover:border-white transition-colors">
                  Shop {heading} →
                </span>
              </div>
            </a>
          )}
          {products.map((product, i) => (
            <div
              key={product.id}
              className="bg-white flex-shrink-0 w-[min(75%,320px)] sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-3rem)/4)] snap-start"
            >
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <ProductCard product={product as any} index={i} />
            </div>
          ))}
        </div>

        <a
          href={viewAllHref}
          className="md:hidden mt-8 flex items-center justify-center gap-2 font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase hover:text-[#3A5A78] transition-colors"
        >
          View all →
        </a>
      </div>
    </section>
  );
}
