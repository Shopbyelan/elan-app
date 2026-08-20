"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { useCurrencyStore } from "@/store/currency.store";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice } = useCartStore();
  const { format } = useCurrencyStore();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md z-50 bg-[#0A0A0A] border-l border-[#1A1A1A] transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1A1A1A]">
          <div>
            <h2 className="font-serif text-lg text-white">Your Selection</h2>
            <p className="font-sans text-[12px] tracking-[0.2em] text-[#5A5A5A] uppercase mt-0.5">
              {items.length} {items.length === 1 ? "piece" : "pieces"}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="text-[#5A5A5A] hover:text-white transition-colors p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 px-8 text-center">
              <ShoppingBag className="h-12 w-12 text-[#2A2A2A]" />
              <div>
                <p className="font-serif text-lg text-[#5A5A5A]">Your selection is empty</p>
                <p className="font-sans text-xs text-[#3A3A3A] mt-2 leading-relaxed">
                  Discover our curated collections and find pieces that speak to you.
                </p>
              </div>
              <Button
                variant="outline"
                size="md"
                className="border-[#85A0B5] text-[#85A0B5] hover:bg-[#85A0B5] hover:text-black"
                onClick={closeCart}
                asChild
              >
                <Link href="/shop">Explore Collections</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-[#1A1A1A]">
              {items.map(({ product, quantity }) => {
                const primaryImg =
                  product.images.find((i) => i.isPrimary)?.url ||
                  product.images[0]?.url ||
                  "/placeholder.jpg";
                return (
                  <li key={product.id} className="px-6 py-5 flex gap-4">
                    {/* Image */}
                    <div className="relative w-20 h-24 flex-shrink-0 bg-[#141414] overflow-hidden">
                      <Image
                        src={primaryImg}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-sans text-xs tracking-[0.2em] text-[#85A0B5] uppercase">
                            {product.categories?.[0]?.name}
                          </p>
                          <h3 className="font-serif text-base text-white mt-0.5 truncate">
                            {product.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-[#3A3A3A] hover:text-red-400 transition-colors flex-shrink-0"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <p className="font-sans text-sm text-[#85A0B5] mt-2">
                        {format(product.price)}
                      </p>

                      {/* Quantity */}
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="h-7 w-7 flex items-center justify-center border border-[#2A2A2A] text-[#9A9A9A] hover:border-[#85A0B5] hover:text-white transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-sans text-sm text-white w-4 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="h-7 w-7 flex items-center justify-center border border-[#2A2A2A] text-[#9A9A9A] hover:border-[#85A0B5] hover:text-white transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <span className="ml-auto font-sans text-xs text-[#5A5A5A]">
                          {format(product.price * quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#1A1A1A] px-6 py-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-sans text-xs tracking-[0.15em] text-[#9A9A9A] uppercase">
                Subtotal
              </span>
              <span className="font-serif text-lg text-white">
                {format(totalPrice())}
              </span>
            </div>
            <p className="font-sans text-[12px] text-[#5A5A5A]">
              Shipping calculated at checkout · Certificate of Authenticity included
            </p>
            <Button
              variant="gold"
              size="lg"
              className="w-full"
              onClick={closeCart}
              asChild
            >
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button
              variant="ghost"
              size="md"
              className="w-full text-[#9A9A9A] hover:text-white hover:bg-white/5"
              onClick={closeCart}
              asChild
            >
              <Link href="/cart">View Full Cart</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
