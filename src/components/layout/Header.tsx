"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShoppingBag, Heart, User, Search, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { MobileNav } from "@/components/layout/MobileNav";

export function Header() {
  const { data: session } = useSession();
  const { totalItems, openCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#C9A84C] text-black text-center py-2 overflow-hidden">
        <div className="animate-marquee">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="flex gap-12 font-sans text-[10px] tracking-[0.25em] uppercase font-medium whitespace-nowrap pr-12">
              <span>Free delivery on orders above ₦100,000</span>
              <span>·</span>
              <span>Certificate of Authenticity with every piece</span>
              <span>·</span>
              <span>Lifetime polishing service</span>
              <span>·</span>
              <span>Complimentary gift wrapping</span>
              <span>·</span>
            </span>
          ))}
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[#1A1A1A]"
            : "bg-[#0A0A0A]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left — mobile menu + nav */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden text-[#9A9A9A] hover:text-white transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-8">
                <Link
                  href="/shop"
                  className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#9A9A9A] hover:text-[#C9A84C] transition-colors"
                >
                  Collections
                </Link>
                <Link
                  href="/shop?category=18k-gold"
                  className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#9A9A9A] hover:text-[#C9A84C] transition-colors"
                >
                  Fine Gold
                </Link>
                <Link
                  href="/materials"
                  className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#9A9A9A] hover:text-[#C9A84C] transition-colors"
                >
                  Our Materials
                </Link>
              </nav>
            </div>

            {/* Center — Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <div className="flex flex-col items-center">
                <span className="font-serif text-xl md:text-2xl text-white tracking-[0.3em]">
                  ÉLAN
                </span>
                <span className="font-sans text-[7px] tracking-[0.4em] text-[#C9A84C] uppercase mt-0.5 hidden md:block">
                  Fine Jewellery
                </span>
              </div>
            </Link>

            {/* Right — Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 text-[#9A9A9A] hover:text-white transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>

              <Link
                href="/wishlist"
                className="relative p-2.5 text-[#9A9A9A] hover:text-white transition-colors"
              >
                <Heart className="h-4 w-4" />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-1 h-3.5 w-3.5 flex items-center justify-center bg-[#C9A84C] text-black text-[8px] font-bold rounded-full">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {session ? (
                <div className="relative group">
                  <button className="p-2.5 text-[#9A9A9A] hover:text-white transition-colors flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <ChevronDown className="h-3 w-3 hidden md:block" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#111] border border-[#2A2A2A] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link href="/account" className="block px-4 py-2.5 font-sans text-[11px] tracking-[0.15em] uppercase text-[#9A9A9A] hover:text-[#C9A84C] hover:bg-[#1A1A1A] transition-colors">
                      My Account
                    </Link>
                    <Link href="/orders" className="block px-4 py-2.5 font-sans text-[11px] tracking-[0.15em] uppercase text-[#9A9A9A] hover:text-[#C9A84C] hover:bg-[#1A1A1A] transition-colors">
                      My Orders
                    </Link>
                    {session.user?.role === "ADMIN" && (
                      <Link href="/admin" className="block px-4 py-2.5 font-sans text-[11px] tracking-[0.15em] uppercase text-[#C9A84C] hover:bg-[#1A1A1A] transition-colors">
                        Admin Panel
                      </Link>
                    )}
                    <div className="my-1 border-t border-[#2A2A2A]" />
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2.5 font-sans text-[11px] tracking-[0.15em] uppercase text-[#9A9A9A] hover:text-red-400 hover:bg-[#1A1A1A] transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="p-2.5 text-[#9A9A9A] hover:text-white transition-colors"
                >
                  <User className="h-4 w-4" />
                </Link>
              )}

              <button
                onClick={openCart}
                className="relative p-2.5 text-[#9A9A9A] hover:text-white transition-colors"
              >
                <ShoppingBag className="h-4 w-4" />
                {totalItems() > 0 && (
                  <span className="absolute top-1 right-1 h-3.5 w-3.5 flex items-center justify-center bg-[#C9A84C] text-black text-[8px] font-bold rounded-full">
                    {totalItems()}
                  </span>
                )}
              </button>

              {/* Shop Now — desktop only */}
              <Link
                href="/shop"
                className="hidden md:inline-flex ml-2 btn-gold h-9 px-5 text-[10px] items-center justify-center tracking-[0.2em]"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5A5A5A]" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search for pieces..."
                  className="w-full h-11 pl-11 pr-4 bg-[#141414] border border-[#2A2A2A] font-sans text-sm text-white placeholder:text-[#5A5A5A] focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5A5A5A] hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <CartDrawer />
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
