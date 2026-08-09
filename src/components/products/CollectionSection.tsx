import { ProductCard } from "@/components/products/ProductCard";
import type { ProductWithRelations } from "@/lib/products";

interface CollectionSectionProps {
  label: string;
  heading: string;
  products: ProductWithRelations[];
  viewAllHref: string;
  background?: "bg" | "bg-alt";
}

export function CollectionSection({
  label,
  heading,
  products,
  viewAllHref,
  background = "bg",
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
