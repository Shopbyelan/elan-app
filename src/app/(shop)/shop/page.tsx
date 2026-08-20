import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/skeleton";
import {
  getBestSellers,
  getBridalProducts,
  getFeaturedProducts,
  getGiftsUnder200k,
  getLimitedEditionProducts,
  getNewArrivals,
} from "@/lib/products";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Shop — Select Your Standard",
  description: "Browse our curated fine jewellery collections — 18k Gold, Sterling Silver, Cultivated Diamond, Platinum, and Crystal Moissanite.",
};

interface ShopPageProps {
  searchParams: Promise<{ category?: string; type?: string; collection?: string; sort?: string; search?: string }>;
}

async function getCategories() {
  try {
    return await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  } catch {
    return [];
  }
}

async function getProducts(params: { category?: string; type?: string; collection?: string; sort?: string; search?: string }) {
  try {
    // Collection values with dedicated, reusable filter logic (shared with the homepage sections).
    switch (params.collection) {
      case "featured":
        return await getFeaturedProducts({ search: params.search });
      case "new-arrivals":
        return await getNewArrivals({ search: params.search });
      case "best-sellers":
        return await getBestSellers({ search: params.search, take: 24 });
      case "bridal":
        return await getBridalProducts({ search: params.search });
      case "limited-edition":
        return await getLimitedEditionProducts({ search: params.search });
      case "gifts-under-200k":
        return await getGiftsUnder200k({ search: params.search });
    }

    // Category/type/search/sort combinations need the `sort` param, which the
    // shared collection helpers don't support, so this path stays a direct query.
    const searchFilter = params.search
      ? {
          OR: [
            { name: { contains: params.search, mode: "insensitive" as const } },
            { description: { contains: params.search, mode: "insensitive" as const } },
          ],
        }
      : {};

    const orderBy =
      params.sort === "price-asc" ? { price: "asc" as const } :
      params.sort === "price-desc" ? { price: "desc" as const } :
      { createdAt: "desc" as const };

    return await prisma.product.findMany({
      where: {
        isActive: true,
        ...(params.category ? { categories: { some: { slug: params.category } } } : {}),
        ...(params.type ? { productType: params.type } : {}),
        ...searchFilter,
      },
      include: { images: true, categories: true },
      orderBy,
    });
  } catch {
    return [];
  }
}

const FILTER_TABS = [
  { label: "All", slug: "" },
  { label: "18k Gold", slug: "18k-gold" },
  { label: "Sterling Silver", slug: "sterling-silver" },
  { label: "Cultivated Diamond", slug: "cultivated-diamond" },
  { label: "Platinum", slug: "platinum" },
  { label: "Crystal Moissanite", slug: "crystal-moissanite" },
];

const TYPE_TABS = [
  { label: "Necklaces", value: "necklace" },
  { label: "Earrings", value: "earrings" },
  { label: "Rings", value: "ring" },
  { label: "Bracelets", value: "bracelet" },
];

const COLLECTION_TABS = [
  { label: "Featured", value: "featured" },
  { label: "New Arrivals", value: "new-arrivals" },
  { label: "Best Sellers", value: "best-sellers" },
  { label: "Bridal", value: "bridal" },
  { label: "Limited Edition", value: "limited-edition" },
  { label: "Gifts Under ₦200,000", value: "gifts-under-200k" },
];

const COLLECTION_HEADINGS: Record<string, { label: string; title: string; sub: string }> = {
  featured: { label: "Curated for You", title: "Featured Pieces", sub: "Hand-picked by the Élan house." },
  "new-arrivals": { label: "Just In", title: "New Arrivals", sub: "The latest pieces to join the Élan house." },
  "best-sellers": { label: "Most Loved", title: "Best Sellers", sub: "The pieces our clients return for, again and again." },
  bridal: { label: "For the Aisle", title: "Bridal", sub: "Engagement, wedding bands, and pieces made for a lifetime." },
  "limited-edition": { label: "While They Last", title: "Limited Edition", sub: "Rare pieces, produced in restricted numbers." },
  "gifts-under-200k": { label: "Thoughtful & Timeless", title: "Gifts Under ₦200,000", sub: "Exceptional pieces at an accessible price." },
};

const TYPE_HEADINGS: Record<string, string> = {
  necklace: "Necklaces",
  earrings: "Earrings",
  ring: "Rings",
  bracelet: "Bracelets",
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const [products] = await Promise.all([
    getProducts(params),
    getCategories(),
  ]);

  const activeCategory = params.category || "";
  const activeType = params.type || "";
  const activeCollection = params.collection || "";

  const collectionHeading = activeCollection ? COLLECTION_HEADINGS[activeCollection] : null;
  const typeHeading = activeType ? TYPE_HEADINGS[activeType] : null;

  return (
    <>
      {/* Hero Banner */}
      <div className="bg-[#F7F5F2] border-b border-[#E4E1DA] py-16 md:py-20 px-4 text-center">
        <p className="font-sans text-[11px] tracking-[0.4em] text-[#3A5A78] uppercase mb-4">
          {collectionHeading ? collectionHeading.label : typeHeading ? "Shop by Piece" : "Shop by Collection"}
        </p>
        <h1 className="font-serif text-4xl md:text-6xl text-[#0A0A0A] mb-4">
          {collectionHeading ? (
            collectionHeading.title
          ) : typeHeading ? (
            typeHeading
          ) : (
            <>Select Your <em className="text-[#3A5A78] not-italic">Standard</em></>
          )}
        </h1>
        <p className="font-sans text-sm text-[#6B6B6B] max-w-lg mx-auto leading-relaxed">
          {collectionHeading
            ? collectionHeading.sub
            : "Every tier is exceptional. The difference is in the metal, the stone, and the statement you wish to make."}
        </p>
      </div>

      {/* Filter tabs */}
      <div className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur border-b border-[#E4E1DA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-3">
          {/* Collections + piece type */}
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {COLLECTION_TABS.map((tab) => (
              <a
                key={tab.value}
                href={`/shop?collection=${tab.value}`}
                className={`flex-shrink-0 px-4 py-2 font-sans text-[12px] tracking-[0.2em] uppercase border transition-all duration-200 whitespace-nowrap ${
                  activeCollection === tab.value
                    ? "bg-[#3A5A78] text-white border-[#3A5A78]"
                    : "border-[#E4E1DA] text-[#6B6B6B] hover:border-[#3A5A78] hover:text-[#3A5A78]"
                }`}
              >
                {tab.label}
              </a>
            ))}
            <div className="w-px flex-shrink-0 bg-[#E4E1DA] mx-1" />
            {TYPE_TABS.map((tab) => (
              <a
                key={tab.value}
                href={`/shop?type=${tab.value}`}
                className={`flex-shrink-0 px-4 py-2 font-sans text-[12px] tracking-[0.2em] uppercase border transition-all duration-200 whitespace-nowrap ${
                  activeType === tab.value
                    ? "bg-[#3A5A78] text-white border-[#3A5A78]"
                    : "border-[#E4E1DA] text-[#6B6B6B] hover:border-[#3A5A78] hover:text-[#3A5A78]"
                }`}
              >
                {tab.label}
              </a>
            ))}
          </div>

          {/* Material tabs */}
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {FILTER_TABS.map((tab) => (
              <a
                key={tab.slug}
                href={tab.slug ? `/shop?category=${tab.slug}` : "/shop"}
                className={`flex-shrink-0 px-4 py-2 font-sans text-[12px] tracking-[0.2em] uppercase border transition-all duration-200 whitespace-nowrap ${
                  !activeType && !activeCollection && activeCategory === tab.slug
                    ? "bg-[#3A5A78] text-white border-[#3A5A78]"
                    : "border-[#E4E1DA] text-[#6B6B6B] hover:border-[#3A5A78] hover:text-[#3A5A78]"
                }`}
              >
                {tab.label}
              </a>
            ))}

            <div className="ml-auto flex-shrink-0 flex gap-2">
              <a href={`/shop${activeCategory ? `?category=${activeCategory}&` : "?"}sort=price-asc`}
                className={`px-3 py-2 font-sans text-[12px] tracking-wider uppercase border border-[#E4E1DA] text-[#6B6B6B] hover:border-[#3A5A78] hover:text-[#3A5A78] transition-all ${params.sort === "price-asc" ? "border-[#3A5A78] text-[#3A5A78]" : ""}`}>
                Price ↑
              </a>
              <a href={`/shop${activeCategory ? `?category=${activeCategory}&` : "?"}sort=price-desc`}
                className={`px-3 py-2 font-sans text-[12px] tracking-wider uppercase border border-[#E4E1DA] text-[#6B6B6B] hover:border-[#3A5A78] hover:text-[#3A5A78] transition-all ${params.sort === "price-desc" ? "border-[#3A5A78] text-[#3A5A78]" : ""}`}>
                Price ↓
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="font-sans text-xs text-[#9A9A9A]">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
          {activeCategory && (
            <a href="/shop" className="font-sans text-[12px] tracking-[0.15em] text-[#3A5A78] uppercase hover:text-[#2E4560] transition-colors">
              Clear filter ×
            </a>
          )}
        </div>

        {products.length === 0 ? (
          <div className="py-32 text-center">
            <p className="font-serif text-2xl text-[#9A9A9A] mb-4">No pieces found</p>
            <p className="font-sans text-sm text-[#9A9A9A]">
              Try a different collection or explore all pieces.
            </p>
            <a href="/shop" className="inline-flex mt-8 btn-gold h-11 px-8 items-center">
              Explore All
            </a>
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#E4E1DA]">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-white">
                    <ProductCardSkeleton />
                  </div>
                ))}
              </div>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#E4E1DA]">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(products as any[]).map((product, i) => (
                <div key={product.id} className="bg-white">
                  <ProductCard product={product} index={i} />
                </div>
              ))}
            </div>
          </Suspense>
        )}
      </div>
    </>
  );
}
