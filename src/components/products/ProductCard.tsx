"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Bell } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { useCurrencyStore } from "@/store/currency.store";
import type { Product } from "@/types";
import { toast } from "sonner";
import { formatCategoryTag } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

function getCategoryGradient(slug: string | undefined, name: string | undefined): string {
  const s = (slug || name || "").toLowerCase();
  if (s.includes("gold")) return "gradient-gold";
  if (s.includes("silver")) return "gradient-silver";
  if (s.includes("diamond")) return "gradient-diamond";
  if (s.includes("platinum")) return "gradient-platinum";
  if (s.includes("moissanite")) return "gradient-moiss";
  return "bg-[#111111]";
}

function PlaceholderIcon({ slug }: { slug: string | undefined }) {
  const s = (slug || "").toLowerCase();

  if (s.includes("moissanite")) {
    return (
      <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20 text-white/10">
        <path d="M40 4L44 36L76 40L44 44L40 76L36 44L4 40L36 36L40 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }
  if (s.includes("diamond")) {
    return (
      <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20 text-white/10">
        <path d="M40 8L60 28H20L40 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M20 28L10 44L40 72L70 44L60 28H20Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M20 28L40 48L60 28" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 44H70" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (s.includes("gold")) {
    return (
      <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20 text-white/10">
        <circle cx="40" cy="40" r="24" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M40 16V24M40 56V64M16 40H24M56 40H64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (s.includes("platinum")) {
    return (
      <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20 text-white/10">
        <path d="M40 8L42 38L72 40L42 42L40 72L38 42L8 40L38 38L40 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="40" cy="40" r="6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (s.includes("silver")) {
    return (
      <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20 text-white/10">
        <circle cx="40" cy="40" r="26" stroke="currentColor" strokeWidth="1.5" />
        <path d="M26 40C26 32.3 32.3 26 40 26C47.7 26 54 32.3 54 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M26 40C26 47.7 32.3 54 40 54C47.7 54 54 47.7 54 40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20 text-white/10">
      <rect x="16" y="16" width="48" height="48" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 16L64 64M64 16L16 64" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();
  const { format } = useCurrencyStore();

  const primaryImg =
    product.images.find((i) => i.isPrimary)?.url ||
    product.images[0]?.url ||
    null;

  const wishlisted = isWishlisted(product.id);
  const primaryCategory = product.categories?.[0];
  const categorySlug = primaryCategory?.slug;
  const categoryName = primaryCategory?.name || product.material || "";
  const categoryTag = formatCategoryTag(categoryName);
  const gradientClass = getCategoryGradient(categorySlug, categoryName);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product);
    openCart();
    toast.success(`${product.name} added to your selection`);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggleItem(product);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist", {
      icon: wishlisted ? "🗑️" : "♥",
    });
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* ── Image ── */}
      <div className={`relative aspect-[3/4] overflow-hidden ${gradientClass}`}>
        {primaryImg ? (
          <Image
            src={primaryImg}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <PlaceholderIcon slug={categorySlug} />
          </div>
        )}

        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Out-of-stock dim */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-[#0A0A0A]/50 z-[1]" />
        )}

        {/* Category badge — top left */}
        <div className="absolute top-3 left-3 z-[2]">
          <span className="inline-block border border-[#85A0B5]/50 bg-black/50 backdrop-blur-sm px-3 py-1.5 font-sans text-[10px] tracking-[0.3em] text-[#C4CDD6] uppercase leading-none">
            {categoryTag}
          </span>
        </div>

        {/* Sale badge — top right */}
        {product.comparePrice && product.comparePrice > product.price && (
          <div className="absolute top-3 right-3 z-[2]">
            <span className="inline-block border border-[#85A0B5]/30 bg-black/50 backdrop-blur-sm px-2 py-1 font-sans text-[9px] tracking-[0.2em] text-[#85A0B5] uppercase leading-none">
              Sale
            </span>
          </div>
        )}

        {/* Wishlist — bottom left, always visible */}
        <div className="absolute bottom-3 left-3 z-[2]">
          <button
            onClick={handleWishlist}
            className={`h-9 w-9 flex items-center justify-center border bg-black/60 backdrop-blur-sm transition-all duration-200 ${
              wishlisted
                ? "border-[#85A0B5] text-[#85A0B5]"
                : "border-[#3A3A3A] text-[#9A9A9A] hover:border-[#85A0B5] hover:text-[#85A0B5]"
            }`}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`h-3.5 w-3.5 ${wishlisted ? "fill-[#85A0B5]" : ""}`} />
          </button>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="bg-white px-4 pt-4 pb-4">
        {/* Category + badge */}
        <p className="font-sans text-xs tracking-[0.25em] text-[#3A5A78]/80 uppercase mb-2 truncate">
          {categoryTag}
          {product.badge && (
            <span className="text-[#9A9A9A]"> · {product.badge}</span>
          )}
        </p>

        {/* Product name */}
        <h3 className="font-serif text-2xl text-[#0A0A0A] leading-snug mb-2 group-hover:text-[#3A5A78] transition-colors duration-300">
          {product.name}
        </h3>

        {/* Short description */}
        {product.shortDesc && (
          <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed line-clamp-2 mb-4">
            {product.shortDesc}
          </p>
        )}

        {/* Price + action */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E4E1DA]">
          <div>
            <span className="font-sans text-base text-[#3A5A78]">
              From {format(product.price)}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="block font-sans text-sm text-[#9A9A9A] line-through">
                {format(product.comparePrice)}
              </span>
            )}
          </div>

          {product.stock === 0 ? (
            <button
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-1.5 border border-[#E4E1DA] text-[#9A9A9A] px-3 py-2 font-sans text-xs tracking-[0.2em] uppercase hover:border-[#3A5A78] hover:text-[#3A5A78] transition-colors duration-200"
            >
              <Bell className="h-3 w-3" />
              Notify Me
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-[#85A0B5] text-black px-4 py-2.5 font-sans text-xs tracking-[0.2em] uppercase font-medium hover:bg-[#9DB5C8] transition-colors duration-200"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
