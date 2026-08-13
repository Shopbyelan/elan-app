"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { Heart, ShoppingBag, Star, Shield, RotateCcw, Truck } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { useCurrencyStore } from "@/store/currency.store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WaitlistButton } from "@/components/products/WaitlistButton";
import { ProductCard } from "@/components/products/ProductCard";
import { formatDate, formatCategoryTag } from "@/lib/utils";
import { toast } from "sonner";
import type { Product, Review } from "@/types";

interface ProductDetailProps {
  product: Product & {
    reviews: Review[];
    variants: { id: string; name: string; value: string; price: number | null }[];
  };
  related: Product[];
}

export function ProductDetail({ product, related }: ProductDetailProps) {
  const [activeImg, setActiveImg] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "materials" | "care">("description");
  const { addItem, openCart } = useCartStore();
  const { toggleItem, isWishlisted } = useWishlistStore();

  const { format } = useCurrencyStore();
  const wishlisted = isWishlisted(product.id);
  const images = product.images.length > 0 ? product.images : [{ url: "/placeholder.jpg", alt: product.name }];
  const avgRating = product.reviews.length > 0
    ? product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length
    : 0;

  function goToImage(index: number) {
    if (index < 0 || index >= images.length || index === activeImg) return;
    setSwipeDirection(index > activeImg ? 1 : -1);
    setActiveImg(index);
  }

  function handleSwipeEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    const swipeThreshold = 50;
    const velocityThreshold = 500;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      goToImage(activeImg + 1);
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      goToImage(activeImg - 1);
    }
  }

  function handleZoomMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  }

  const lensSize = 38;
  const lensHalf = lensSize / 2;
  const lensX = Math.min(Math.max(zoomPos.x, lensHalf), 100 - lensHalf);
  const lensY = Math.min(Math.max(zoomPos.y, lensHalf), 100 - lensHalf);

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) addItem(product);
    openCart();
    toast.success(`${product.name} added to your selection`);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 font-sans text-sm tracking-[0.15em] text-[#9A9A9A] uppercase mb-8">
        <Link href="/shop" className="hover:text-[#3A5A78] transition-colors">Collections</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category?.slug}`} className="hover:text-[#3A5A78] transition-colors">
          {product.category?.name}
        </Link>
        <span>/</span>
        <span className="text-[#6B6B6B]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Gallery */}
        <div className="space-y-3 relative">
          {/* Main image */}
          <div
            className="relative aspect-4/5 bg-[#FFFFFF] overflow-hidden md:cursor-zoom-in"
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleZoomMove}
          >
            <AnimatePresence initial={false} custom={swipeDirection}>
              <motion.div
                key={activeImg}
                custom={swipeDirection}
                initial={{ x: swipeDirection >= 0 ? "100%" : "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: swipeDirection >= 0 ? "-100%" : "100%", opacity: 0 }}
                transition={{ x: { type: "spring", stiffness: 300, damping: 32 }, opacity: { duration: 0.15 } }}
                drag={images.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={handleSwipeEnd}
                className="absolute inset-0"
              >
                <Image
                  src={images[activeImg]?.url || "/placeholder.jpg"}
                  alt={images[activeImg]?.alt || product.name}
                  fill
                  className="object-cover pointer-events-none"
                  draggable={false}
                  priority={activeImg === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>
            {product.badge && (
              <div className="absolute top-4 left-4 z-10">
                <Badge variant="gold">{product.badge}</Badge>
              </div>
            )}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeImg === i ? "w-5 bg-white" : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Zoom lens */}
            {isZooming && (
              <div
                className="hidden md:block absolute border-2 border-white shadow-[0_0_0_9999px_rgba(10,10,10,0.25)] pointer-events-none z-20"
                style={{
                  width: `${lensSize}%`,
                  height: `${lensSize}%`,
                  left: `${lensX}%`,
                  top: `${lensY}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            )}
          </div>

          {/* Zoomed preview */}
          {isZooming && (
            <div
              className="hidden md:block absolute top-0 left-full ml-6 w-full aspect-4/5 bg-[#FFFFFF] border border-[#E4E1DA] shadow-2xl overflow-hidden z-30 pointer-events-none"
              style={{
                backgroundImage: `url(${images[activeImg]?.url})`,
                backgroundSize: "260%",
                backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                backgroundRepeat: "no-repeat",
              }}
            />
          )}

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => goToImage(i)}
                  className={`relative shrink-0 w-16 h-16 overflow-hidden border-2 transition-all ${
                    activeImg === i ? "border-[#85A0B5]" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.alt || `View ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {/* Category & rating */}
          <div className="flex items-center justify-between mb-4">
            <Link
              href={`/shop?category=${product.category?.slug}`}
              className="font-sans text-sm tracking-[0.3em] text-[#3A5A78] uppercase hover:text-[#9DB5C8] transition-colors"
            >
              {product.category?.name && formatCategoryTag(product.category.name)}
            </Link>
            {avgRating > 0 && (
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3 w-3 ${i < Math.round(avgRating) ? "fill-[#85A0B5] text-[#3A5A78]" : "text-[#E4E1DA]"}`} />
                  ))}
                </div>
                <span className="font-sans text-sm text-[#9A9A9A]">
                  ({product.reviews.length})
                </span>
              </div>
            )}
          </div>

          {/* Name */}
          <h1 className="font-serif text-3xl md:text-4xl text-[#0A0A0A] mb-3 leading-tight">
            {product.name}
          </h1>

          {/* Short desc */}
          {product.shortDesc && (
            <p className="font-sans text-base text-[#6B6B6B] leading-relaxed mb-6">
              {product.shortDesc}
            </p>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-4 mb-8">
            <span className="font-sans text-2xl text-[#3A5A78]">
              {format(product.price)}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="font-sans text-base text-[#9A9A9A] line-through">
                {format(product.comparePrice)}
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-[#F7F5F2] mb-8" />

          {/* Quantity */}
          <div className="mb-6">
            <p className="font-sans text-sm tracking-[0.2em] text-[#6B6B6B] uppercase mb-3">
              Quantity
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="h-10 w-10 flex items-center justify-center border border-[#E4E1DA] text-[#6B6B6B] hover:border-[#85A0B5] hover:text-[#3A5A78] transition-all text-lg"
              >
                −
              </button>
              <span className="font-sans text-base text-[#3A3A3A] w-8 text-center">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="h-10 w-10 flex items-center justify-center border border-[#E4E1DA] text-[#6B6B6B] hover:border-[#85A0B5] hover:text-[#3A5A78] transition-all text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-8">
            {product.stock === 0 ? (
              <WaitlistButton productId={product.id} productName={product.name} />
            ) : (
              <>
                <Button
                  variant="gold"
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Selection
                </Button>
                <button
                  onClick={() => {
                    toggleItem(product);
                    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist");
                  }}
                  className={`h-13 w-13 min-w-13 flex items-center justify-center border transition-all ${
                    wishlisted
                      ? "border-[#85A0B5] text-[#3A5A78]"
                      : "border-[#E4E1DA] text-[#6B6B6B] hover:border-[#85A0B5] hover:text-[#3A5A78]"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${wishlisted ? "fill-[#85A0B5]" : ""}`} />
                </button>
              </>
            )}
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-[#E4E1DA] mb-8">
            {[
              { icon: Shield, label: "Certificate of Authenticity" },
              { icon: Truck, label: "Secure Nationwide Delivery" },
              { icon: RotateCcw, label: "2-Day Returns" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="text-center">
                <Icon className="h-4 w-4 text-[#3A5A78] mx-auto mb-2" />
                <p className="font-sans text-xs tracking-widest text-[#9A9A9A] leading-relaxed">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div>
            <div className="flex border-b border-[#E4E1DA] mb-6">
              {(["description", "materials", "care"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`mr-6 pb-3 font-sans text-sm tracking-[0.2em] uppercase border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-[#85A0B5] text-[#3A5A78]"
                      : "border-transparent text-[#9A9A9A] hover:text-[#6B6B6B]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "description" && (
              <p className="font-sans text-base text-[#6B6B6B] leading-relaxed">
                {product.description}
              </p>
            )}
            {activeTab === "materials" && (
              <div className="space-y-3">
                {product.material && (
                  <div className="flex justify-between border-b border-[#E4E1DA] pb-3">
                    <span className="font-sans text-sm text-[#9A9A9A] uppercase tracking-wider">Material</span>
                    <span className="font-sans text-sm text-[#6B6B6B]">{product.material}</span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex justify-between border-b border-[#E4E1DA] pb-3">
                    <span className="font-sans text-sm text-[#9A9A9A] uppercase tracking-wider">Weight</span>
                    <span className="font-sans text-sm text-[#6B6B6B]">{product.weight}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div className="flex justify-between border-b border-[#E4E1DA] pb-3">
                    <span className="font-sans text-sm text-[#9A9A9A] uppercase tracking-wider">Dimensions</span>
                    <span className="font-sans text-sm text-[#6B6B6B]">{product.dimensions}</span>
                  </div>
                )}
              </div>
            )}
            {activeTab === "care" && (
              <p className="font-sans text-base text-[#6B6B6B] leading-relaxed">
                {product.careInstr ||
                  "Store in the provided Élan pouch when not worn. Avoid contact with perfumes, lotions, and chemicals. Polish gently with a soft cloth. Professional cleaning available at any Élan boutique."}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Reviews */}
      {product.reviews.length > 0 && (
        <section className="mt-20 pt-16 border-t border-[#E4E1DA]">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-sans text-[11px] tracking-[0.4em] text-[#3A5A78] uppercase mb-2">Client Experiences</p>
              <h2 className="font-serif text-2xl text-[#0A0A0A]">
                {avgRating.toFixed(1)} / 5.0
                <span className="font-sans text-sm text-[#9A9A9A] ml-3">
                  ({product.reviews.length} reviews)
                </span>
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="p-6 bg-[#FFFFFF] border border-[#E4E1DA]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded-full bg-[#F7F5F2] flex items-center justify-center text-[#3A5A78] font-serif text-sm">
                    {review.user?.name?.[0] || "C"}
                  </div>
                  <div>
                    <p className="font-sans text-xs text-[#3A3A3A]">{review.user?.name || "Client"}</p>
                    <p className="font-sans text-[12px] text-[#9A9A9A]">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                  <div className="ml-auto flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-[#85A0B5] text-[#3A5A78]" : "text-[#E4E1DA]"}`} />
                    ))}
                  </div>
                </div>
                {review.comment && (
                  <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20 pt-16 border-t border-[#E4E1DA]">
          <div className="mb-10">
            <p className="font-sans text-[11px] tracking-[0.4em] text-[#3A5A78] uppercase mb-2">You May Also Love</p>
            <h2 className="font-serif text-2xl text-[#0A0A0A]">From the Same Collection</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#F7F5F2]">
            {related.map((p, i) => (
              <div key={p.id} className="bg-[#FFFFFF]">
                <ProductCard product={p} index={i} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
