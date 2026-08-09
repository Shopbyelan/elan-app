"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useWishlistStore } from "@/store/wishlist.store";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { items } = useWishlistStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="mb-12">
        <p className="font-sans text-[11px] tracking-[0.4em] text-[#3A5A78] uppercase mb-2">
          Saved Pieces
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-[#0A0A0A]">
          Your Wishlist
        </h1>
      </div>

      {items.length === 0 ? (
        <div className="py-24 text-center">
          <Heart className="h-16 w-16 text-[#E4E1DA] mx-auto mb-8" />
          <h2 className="font-serif text-2xl text-[#9A9A9A] mb-4">
            Your wishlist is empty
          </h2>
          <p className="font-sans text-sm text-[#9A9A9A] mb-10 max-w-sm mx-auto leading-relaxed">
            Save pieces that speak to you, and return when you&apos;re ready to make them yours.
          </p>
          <Button variant="gold" size="lg" asChild>
            <Link href="/shop">Explore Collections</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-[#F7F5F2]">
          {items.map((product, i) => (
            <div key={product.id} className="bg-[#FFFFFF]">
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
