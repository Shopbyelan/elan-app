import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { CollectionSection } from "@/components/products/CollectionSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
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
        <div
          className="animate-marquee"
          role="group"
          aria-label="Hallmarked. Certified. All orders fully insured in transit. Free Abuja collection available. 18k Gold, 925 Sterling Silver, Cultivated Diamond, Platinum, Crystal Moissanite. Hallmarked and verified. Complimentary gift wrapping on all orders. Free Abuja pick-up. Insured delivery nationwide. First-year maintenance included."
        >
          {[...Array(2)].map((_, i) => (
            <span key={i} aria-hidden="true" className="flex gap-10 font-sans text-sm tracking-[0.2em] text-[#8A9BAB] uppercase whitespace-nowrap pr-10">
              <span>Hallmarked</span>
              <span className="text-[#4A6B8A]">✦</span>
              <span>Certified</span>
              <span className="text-[#4A6B8A]">✦</span>
              <span>All Orders Fully Insured in Transit</span>
              <span className="text-[#4A6B8A]">✦</span>
              <span>Free Abuja Collection Available</span>
              <span className="text-[#4A6B8A]">✦</span>
              <span>18k Gold</span>
              <span className="text-[#4A6B8A]">✦</span>
              <span>925 Sterling Silver</span>
              <span className="text-[#4A6B8A]">✦</span>
              <span>Cultivated Diamond</span>
              <span className="text-[#4A6B8A]">✦</span>
              <span>Platinum</span>
              <span className="text-[#4A6B8A]">✦</span>
              <span>Crystal Moissanite</span>
              <span className="text-[#4A6B8A]">✦</span>
              <span>Hallmarked & Verified</span>
              <span className="text-[#4A6B8A]">✦</span>
              <span>Complimentary Gift Wrapping on All Orders</span>
              <span className="text-[#4A6B8A]">✦</span>
              <span>Free Abuja Pick-Up</span>
              <span className="text-[#4A6B8A]">✦</span>
              <span>Insured Delivery Nationwide</span>
              <span className="text-[#4A6B8A]">✦</span>
              <span>First-Year Maintenance Included</span>
              <span className="text-[#4A6B8A]">✦</span>
            </span>
          ))}
        </div>
      </div>

      <CollectionSection label="Curated for You" heading="Featured Pieces" products={c.featured} viewAllHref="/shop?collection=featured" background="bg" />
      <CollectionSection label="Just In" heading="New Arrivals" products={c.newArrivals} viewAllHref="/shop?collection=new-arrivals" background="bg-alt" />
      {/* Best Sellers temporarily removed — ranking isn't meaningful yet with current order volume */}
      <CollectionSection label="Piece Type" heading="Necklaces" products={c.necklaces} viewAllHref="/shop?type=necklace" background="bg" />
      <CollectionSection label="Piece Type" heading="Earrings" products={c.earrings} viewAllHref="/shop?type=earrings" background="bg-alt" />
      <CollectionSection label="Piece Type" heading="Rings" products={c.rings} viewAllHref="/shop?type=ring" background="bg" />
      <CollectionSection label="Piece Type" heading="Bracelets" products={c.bracelets} viewAllHref="/shop?type=bracelet" background="bg-alt" />
      <CollectionSection label="Crystal Moissanite" heading="Moissanite" products={c.moissanite} viewAllHref="/shop?category=crystal-moissanite" background="bg" />
      <CollectionSection label="Thoughtful & Timeless" heading="Gifts Under ₦200,000" products={c.gifts} viewAllHref="/shop?collection=gifts-under-200k" background="bg-alt" />
      <CollectionSection label="For the Aisle" heading="Bridal" products={c.bridal} viewAllHref="/shop?collection=bridal" background="bg" />
      <CollectionSection label="While They Last" heading="Limited Edition" products={c.limitedEdition} viewAllHref="/shop?collection=limited-edition" background="bg-alt" />

      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
