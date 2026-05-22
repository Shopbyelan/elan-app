import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Shop — Select Your Standard",
  description: "Browse our curated fine jewellery collections — 18k Gold, Sterling Silver, Cultivated Diamond, Platinum, and Crystal Moissanite.",
};

interface ShopPageProps {
  searchParams: Promise<{ category?: string; sort?: string; search?: string }>;
}

async function getCategories() {
  try {
    return await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });
  } catch {
    return [];
  }
}

async function getProducts(params: { category?: string; sort?: string; search?: string }) {
  try {
    const orderBy =
      params.sort === "price-asc" ? { price: "asc" as const } :
      params.sort === "price-desc" ? { price: "desc" as const } :
      { createdAt: "desc" as const };

    return await prisma.product.findMany({
      where: {
        isActive: true,
        ...(params.category ? { category: { slug: params.category } } : {}),
        ...(params.search
          ? {
              OR: [
                { name: { contains: params.search, mode: "insensitive" } },
                { description: { contains: params.search, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: { images: true, category: true },
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

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const [products] = await Promise.all([
    getProducts(params),
    getCategories(),
  ]);

  const activeCategory = params.category || "";

  return (
    <>
      {/* Hero Banner */}
      <div className="bg-[#0D0D0D] border-b border-[#141414] py-16 md:py-20 px-4 text-center">
        <p className="font-sans text-[9px] tracking-[0.4em] text-[#85A0B5] uppercase mb-4">
          Shop by Collection
        </p>
        <h1 className="font-serif text-4xl md:text-6xl text-white mb-4">
          Select Your <em className="text-[#85A0B5] not-italic">Standard</em>
        </h1>
        <p className="font-sans text-sm text-[#9A9A9A] max-w-lg mx-auto leading-relaxed">
          Every tier is exceptional. The difference is in the metal, the stone, and the statement you wish to make.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="sticky top-16 md:top-20 z-30 bg-[#0A0A0A]/95 backdrop-blur border-b border-[#141414]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-hide">
            {FILTER_TABS.map((tab) => (
              <a
                key={tab.slug}
                href={tab.slug ? `/shop?category=${tab.slug}` : "/shop"}
                className={`flex-shrink-0 px-4 py-2 font-sans text-[10px] tracking-[0.2em] uppercase border transition-all duration-200 whitespace-nowrap ${
                  activeCategory === tab.slug
                    ? "bg-[#85A0B5] text-black border-[#85A0B5]"
                    : "border-[#2A2A2A] text-[#5A5A5A] hover:border-[#85A0B5] hover:text-[#85A0B5]"
                }`}
              >
                {tab.label}
              </a>
            ))}

            <div className="ml-auto flex-shrink-0 flex gap-2">
              <a href={`/shop${activeCategory ? `?category=${activeCategory}&` : "?"}sort=price-asc`}
                className={`px-3 py-2 font-sans text-[10px] tracking-wider uppercase border border-[#2A2A2A] text-[#5A5A5A] hover:border-[#85A0B5] hover:text-[#85A0B5] transition-all ${params.sort === "price-asc" ? "border-[#85A0B5] text-[#85A0B5]" : ""}`}>
                Price ↑
              </a>
              <a href={`/shop${activeCategory ? `?category=${activeCategory}&` : "?"}sort=price-desc`}
                className={`px-3 py-2 font-sans text-[10px] tracking-wider uppercase border border-[#2A2A2A] text-[#5A5A5A] hover:border-[#85A0B5] hover:text-[#85A0B5] transition-all ${params.sort === "price-desc" ? "border-[#85A0B5] text-[#85A0B5]" : ""}`}>
                Price ↓
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="font-sans text-xs text-[#5A5A5A]">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
          {activeCategory && (
            <a href="/shop" className="font-sans text-[10px] tracking-[0.15em] text-[#85A0B5] uppercase hover:text-[#9DB5C8] transition-colors">
              Clear filter ×
            </a>
          )}
        </div>

        {products.length === 0 ? (
          <div className="py-32 text-center">
            <p className="font-serif text-2xl text-[#5A5A5A] mb-4">No pieces found</p>
            <p className="font-sans text-sm text-[#3A3A3A]">
              Try a different collection or explore all pieces.
            </p>
            <a href="/shop" className="inline-flex mt-8 btn-gold h-11 px-8 items-center">
              Explore All
            </a>
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#141414]">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-[#0A0A0A]">
                    <ProductCardSkeleton />
                  </div>
                ))}
              </div>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#141414]">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(products as any[]).map((product, i) => (
                <div key={product.id} className="bg-[#0A0A0A]">
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
