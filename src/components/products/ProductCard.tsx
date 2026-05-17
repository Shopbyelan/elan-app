"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();

  const primaryImg =
    product.images.find((i) => i.isPrimary)?.url ||
    product.images[0]?.url ||
    "/placeholder.jpg";

  const wishlisted = isWishlisted(product.id);

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
      {/* Image container */}
      <div className="relative aspect-[3/4] bg-[#111111] overflow-hidden">
        <Image
          src={primaryImg}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <Badge variant="gold">{product.badge}</Badge>
          )}
          {product.comparePrice && product.comparePrice > product.price && (
            <Badge variant="dark">Sale</Badge>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
          <button
            onClick={handleWishlist}
            className={`h-8 w-8 flex items-center justify-center bg-[#0A0A0A]/90 border transition-colors duration-200 ${
              wishlisted
                ? "border-[#C9A84C] text-[#C9A84C]"
                : "border-[#2A2A2A] text-[#9A9A9A] hover:border-[#C9A84C] hover:text-[#C9A84C]"
            }`}
          >
            <Heart className={`h-3.5 w-3.5 ${wishlisted ? "fill-[#C9A84C]" : ""}`} />
          </button>
        </div>

        {/* Add to cart — bottom on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-[#C9A84C] text-black h-10 font-sans text-[10px] tracking-[0.2em] uppercase font-medium hover:bg-[#D4AF6C] transition-colors"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add to Selection
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 pb-2 px-1">
        <p className="font-sans text-[9px] tracking-[0.25em] text-[#C9A84C] uppercase mb-1">
          {product.category?.name || product.material}
        </p>
        <h3 className="font-serif text-base text-white group-hover:text-[#C9A84C] transition-colors duration-300 leading-snug">
          {product.name}
        </h3>
        {product.shortDesc && (
          <p className="font-sans text-xs text-[#5A5A5A] mt-1 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>
        )}
        <div className="flex items-center gap-3 mt-2.5">
          <span className="font-sans text-sm text-[#C9A84C]">
            From {formatPrice(product.price)}
          </span>
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="font-sans text-xs text-[#5A5A5A] line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
