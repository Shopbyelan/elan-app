import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { CollectionSection } from "@/components/products/CollectionSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { getHomepageCollections } from "@/lib/products";

export const metadata: Metadata = {
  title: "ÉLAN — Fine Jewellery | Worn by Royalty",
};

export default async function HomePage() {
  const c = await getHomepageCollections();

  return (
    <>
      <HeroSection />

      {/* Ticker bar */}
      <div className="bg-[#0D1E2E] border-t border-b border-[#3A5A78]/30 overflow-hidden py-3">
        <div className="animate-marquee">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="flex gap-10 font-sans text-[12px] tracking-[0.25em] text-[#8A9BAB] uppercase whitespace-nowrap pr-10">
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

      <CollectionSection label="Curated for You" heading="Featured Pieces" products={c.featured} viewAllHref="/shop?collection=featured" background="bg" />
      <CollectionSection label="Just In" heading="New Arrivals" products={c.newArrivals} viewAllHref="/shop?collection=new-arrivals" background="bg-alt" />
      <CollectionSection label="Most Loved" heading="Best Sellers" products={c.bestSellers} viewAllHref="/shop?collection=best-sellers" background="bg" />
      <CollectionSection label="Piece Type" heading="Necklaces" products={c.necklaces} viewAllHref="/shop?type=necklace" background="bg-alt" />
      <CollectionSection label="Piece Type" heading="Earrings" products={c.earrings} viewAllHref="/shop?type=earrings" background="bg" />
      <CollectionSection label="Piece Type" heading="Rings" products={c.rings} viewAllHref="/shop?type=ring" background="bg-alt" />
      <CollectionSection label="Piece Type" heading="Bracelets" products={c.bracelets} viewAllHref="/shop?type=bracelet" background="bg" />
      <CollectionSection label="Crystal Moissanite" heading="Moissanite" products={c.moissanite} viewAllHref="/shop?category=crystal-moissanite" background="bg-alt" />
      <CollectionSection label="Thoughtful & Timeless" heading="Gifts Under ₦200,000" products={c.gifts} viewAllHref="/shop?collection=gifts-under-200k" background="bg" />
      <CollectionSection label="For the Aisle" heading="Bridal" products={c.bridal} viewAllHref="/shop?collection=bridal" background="bg-alt" />
      <CollectionSection label="While They Last" heading="Limited Edition" products={c.limitedEdition} viewAllHref="/shop?collection=limited-edition" background="bg" />

      <TestimonialsSection />
      <FAQSection />
      <NewsletterSection />
    </>
  );
}
