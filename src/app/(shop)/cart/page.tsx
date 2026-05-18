"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-[#2A2A2A] mb-8" />
        <h1 className="font-serif text-3xl text-white mb-4">Your selection is empty</h1>
        <p className="font-sans text-sm text-[#9A9A9A] mb-10 max-w-sm leading-relaxed">
          Discover our curated collections and find pieces that speak to your aesthetic.
        </p>
        <Button variant="gold" size="lg" asChild>
          <Link href="/shop">Explore Collections</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="font-sans text-[9px] tracking-[0.4em] text-[#85A0B5] uppercase mb-2">
            Your Selection
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-white">
            {items.length} {items.length === 1 ? "Piece" : "Pieces"}
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="font-sans text-[10px] tracking-[0.15em] text-[#5A5A5A] uppercase hover:text-red-400 transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-0 divide-y divide-[#141414]">
          {items.map(({ product, quantity }) => {
            const img = product.images.find((i) => i.isPrimary)?.url || product.images[0]?.url || "/placeholder.jpg";
            return (
              <div key={product.id} className="flex gap-5 py-6">
                <Link href={`/product/${product.slug}`} className="relative flex-shrink-0 w-24 h-28 bg-[#111] overflow-hidden">
                  <Image src={img} alt={product.name} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                </Link>
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-[9px] tracking-[0.25em] text-[#85A0B5] uppercase mb-1">
                    {product.category?.name}
                  </p>
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="font-serif text-base text-white hover:text-[#85A0B5] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-sans text-sm text-[#85A0B5] mt-1.5">
                    {formatPrice(product.price)}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 border border-[#2A2A2A]">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="px-3 py-2 text-[#9A9A9A] hover:text-white transition-colors">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-sans text-sm text-white w-4 text-center">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="px-3 py-2 text-[#9A9A9A] hover:text-white transition-colors">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-sans text-sm text-[#9A9A9A]">
                        {formatPrice(product.price * quantity)}
                      </span>
                      <button onClick={() => removeItem(product.id)} className="text-[#3A3A3A] hover:text-red-400 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="bg-[#111] border border-[#1A1A1A] p-6 h-fit">
          <h2 className="font-serif text-lg text-white mb-6">Order Summary</h2>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between font-sans text-sm">
              <span className="text-[#9A9A9A]">Subtotal</span>
              <span className="text-white">{formatPrice(totalPrice())}</span>
            </div>
            <div className="flex justify-between font-sans text-sm">
              <span className="text-[#9A9A9A]">Delivery</span>
              <span className="text-[#5A5A5A]">Calculated at checkout</span>
            </div>
          </div>
          <div className="border-t border-[#1A1A1A] pt-4 mb-6">
            <div className="flex justify-between">
              <span className="font-sans text-xs tracking-[0.15em] text-[#9A9A9A] uppercase">Estimated Total</span>
              <span className="font-serif text-xl text-[#85A0B5]">{formatPrice(totalPrice())}</span>
            </div>
          </div>
          <Button variant="gold" size="lg" className="w-full mb-3" asChild>
            <Link href="/checkout">
              Proceed to Checkout <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
          <Button variant="ghost" size="md" className="w-full" asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
          <div className="mt-6 pt-5 border-t border-[#1A1A1A] space-y-2">
            {["Certificate of Authenticity included", "Secure payment via Paystack", "Complimentary gift wrapping"].map((t) => (
              <p key={t} className="font-sans text-[10px] text-[#3A3A3A] flex items-center gap-2">
                <span className="text-[#85A0B5]">✓</span> {t}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
