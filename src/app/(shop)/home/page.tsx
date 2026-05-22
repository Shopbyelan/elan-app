import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { CollectionsSection } from "@/components/home/CollectionsSection";
import { MaterialsSection } from "@/components/home/MaterialsSection";
import { StandardsSection } from "@/components/home/StandardsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { FAQSection } from "@/components/home/FAQSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/products/ProductCard";

export const metadata: Metadata = {
  title: "ÉLAN — Fine Jewellery | Worn by Royalty",
};

async function getShowcaseProducts() {
  try {
    const featured = await prisma.product.findMany({
      where: { isFeatured: true, isActive: true },
      include: { images: true, category: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    });
    if (featured.length > 0) return { products: featured, label: "Featured Pieces", heading: "Curated for You" };

    // Fallback: show latest active products
    const latest = await prisma.product.findMany({
      where: { isActive: true },
      include: { images: true, category: true },
      orderBy: { createdAt: "desc" },
      take: 8,
    });
    return { products: latest, label: "New Arrivals", heading: "The Latest Pieces" };
  } catch {
    return { products: [], label: "", heading: "" };
  }
}

export default async function HomePage() {
  const { products, label, heading } = await getShowcaseProducts();

  return (
    <>
      <HeroSection />

      {/* Ticker bar */}
      <div className="bg-[#0D1E2E] border-t border-b border-[#3A5A78]/30 overflow-hidden py-3">
        <div className="animate-marquee">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="flex gap-10 font-sans text-[10px] tracking-[0.25em] text-[#8A9BAB] uppercase whitespace-nowrap pr-10">
              <span>Complimentary Gift Wrapping</span>
              <span className="text-[#4A6B8A]">✦</span>
              <span>Lifetime Polishing</span>
              <span className="text-[#4A6B8A]">✦</span>
              <span>Certificate of Authenticity</span>
              <span className="text-[#4A6B8A]">✦</span>
              <span>Secure Nationwide Delivery</span>
              <span className="text-[#4A6B8A]">✦</span>
            </span>
          ))}
        </div>
      </div>

      <CollectionsSection />

      {/* Products showcase */}
      {products.length > 0 && (
        <section className="py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-sans text-[9px] tracking-[0.4em] text-[#85A0B5] uppercase mb-3">
                {label}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-white">
                {heading}
              </h2>
            </div>
            <a
              href="/shop"
              className="hidden md:flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] text-[#5A5A5A] uppercase hover:text-[#85A0B5] transition-colors"
            >
              View all →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#141414]">
            {products.map((product, i) => (
              <div key={product.id} className="bg-[#0A0A0A]">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                <ProductCard product={product as any} index={i} />
              </div>
            ))}
          </div>
        </section>
      )}

      <TestimonialsSection />
      <StandardsSection />
      <MaterialsSection />
      <FAQSection />
      <NewsletterSection />
    </>
  );
}
