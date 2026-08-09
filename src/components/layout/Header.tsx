"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { ShoppingBag, Heart, User, Search, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { useCurrencyStore } from "@/store/currency.store";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { MobileNav } from "@/components/layout/MobileNav";

function CurrencyToggle() {
  const { currency, setCurrency } = useCurrencyStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-[60px] h-[26px]" />;

  return (
    <div className="hidden md:flex items-center border border-[#2A2A2A] overflow-hidden">
      <button
        onClick={() => setCurrency("NGN")}
        className={`px-2.5 py-1 font-sans text-[11px] tracking-[0.15em] transition-colors ${
          currency === "NGN"
            ? "bg-[#1A2A3A] text-[#85A0B5]"
            : "text-[#3A3A3A] hover:text-[#5A5A5A]"
        }`}
      >
        ₦
      </button>
      <div className="w-px h-3.5 bg-[#2A2A2A]" />
      <button
        onClick={() => setCurrency("USD")}
        className={`px-2.5 py-1 font-sans text-[11px] tracking-[0.15em] transition-colors ${
          currency === "USD"
            ? "bg-[#1A2A3A] text-[#85A0B5]"
            : "text-[#3A3A3A] hover:text-[#5A5A5A]"
        }`}
      >
        $
      </button>
    </div>
  );
}

export function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  const { totalItems, openCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    router.push(`/shop?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-[#3A5A78] text-center py-2.5 overflow-hidden">
        <div className="animate-marquee">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="flex gap-12 font-sans text-[12px] tracking-[0.25em] uppercase font-medium whitespace-nowrap pr-12 text-[#C4CDD6]">
              <span>Free delivery on orders above ₦100,000</span>
              <span className="text-[#85A0B5]">✦</span>
              <span>Certificate of Authenticity with every piece</span>
              <span className="text-[#85A0B5]">✦</span>
              <span>Lifetime polishing service</span>
              <span className="text-[#85A0B5]">✦</span>
              <span>Complimentary gift wrapping</span>
              <span className="text-[#85A0B5]">✦</span>
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
                <div className="relative group">
                  <Link
                    href="/shop"
                    className="flex items-center gap-1 font-sans text-[11px] tracking-[0.2em] uppercase text-[#9A9A9A] hover:text-[#85A0B5] transition-colors"
                  >
                    Collections
                    <ChevronDown className="h-3 w-3" />
                  </Link>
                  <div className="absolute left-0 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="w-140 bg-white border border-[#E4E1DA] p-6 grid grid-cols-3 gap-x-8 gap-y-5 shadow-2xl">
                      <div>
                        <p className="font-sans text-[11px] tracking-[0.25em] text-[#3A5A78] uppercase mb-3">Shop By</p>
                        <div className="flex flex-col gap-2.5">
                          <Link href="/shop?collection=new-arrivals" className="font-sans text-xs text-[#3A3A3A] hover:text-[#0A0A0A] transition-colors">New Arrivals</Link>
                          <Link href="/shop?collection=best-sellers" className="font-sans text-xs text-[#3A3A3A] hover:text-[#0A0A0A] transition-colors">Best Sellers</Link>
                          <Link href="/shop?collection=bridal" className="font-sans text-xs text-[#3A3A3A] hover:text-[#0A0A0A] transition-colors">Bridal</Link>
                          <Link href="/shop?collection=limited-edition" className="font-sans text-xs text-[#3A3A3A] hover:text-[#0A0A0A] transition-colors">Limited Edition</Link>
                          <Link href="/shop?collection=gifts-under-200k" className="font-sans text-xs text-[#3A3A3A] hover:text-[#0A0A0A] transition-colors">Gifts Under ₦200,000</Link>
                        </div>
                      </div>
                      <div>
                        <p className="font-sans text-[11px] tracking-[0.25em] text-[#3A5A78] uppercase mb-3">Piece Type</p>
                        <div className="flex flex-col gap-2.5">
                          <Link href="/shop?type=necklace" className="font-sans text-xs text-[#3A3A3A] hover:text-[#0A0A0A] transition-colors">Necklaces</Link>
                          <Link href="/shop?type=earrings" className="font-sans text-xs text-[#3A3A3A] hover:text-[#0A0A0A] transition-colors">Earrings</Link>
                          <Link href="/shop?type=ring" className="font-sans text-xs text-[#3A3A3A] hover:text-[#0A0A0A] transition-colors">Rings</Link>
                          <Link href="/shop?type=bracelet" className="font-sans text-xs text-[#3A3A3A] hover:text-[#0A0A0A] transition-colors">Bracelets</Link>
                        </div>
                      </div>
                      <div>
                        <p className="font-sans text-[11px] tracking-[0.25em] text-[#3A5A78] uppercase mb-3">Material</p>
                        <div className="flex flex-col gap-2.5">
                          <Link href="/shop?category=18k-gold" className="font-sans text-xs text-[#3A3A3A] hover:text-[#0A0A0A] transition-colors">18k Gold</Link>
                          <Link href="/shop?category=sterling-silver" className="font-sans text-xs text-[#3A3A3A] hover:text-[#0A0A0A] transition-colors">Sterling Silver</Link>
                          <Link href="/shop?category=cultivated-diamond" className="font-sans text-xs text-[#3A3A3A] hover:text-[#0A0A0A] transition-colors">Cultivated Diamond</Link>
                          <Link href="/shop?category=platinum" className="font-sans text-xs text-[#3A3A3A] hover:text-[#0A0A0A] transition-colors">Platinum</Link>
                          <Link href="/shop?category=crystal-moissanite" className="font-sans text-xs text-[#3A3A3A] hover:text-[#0A0A0A] transition-colors">Moissanite</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Link
                  href="/shop?category=18k-gold"
                  className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#9A9A9A] hover:text-[#85A0B5] transition-colors"
                >
                  Fine Gold
                </Link>
                <Link
                  href="/materials"
                  className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#9A9A9A] hover:text-[#85A0B5] transition-colors"
                >
                  Our Materials
                </Link>
              </nav>
            </div>

            {/* Center — Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <Image src="/ElanLogowhite.png" alt="Élan Fine Jewellery" width={120} height={48} className="h-8 md:h-10 w-auto" />
            </Link>

            {/* Right — Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              <CurrencyToggle />

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
                  <span className="absolute top-1 right-1 h-3.5 w-3.5 flex items-center justify-center bg-[#85A0B5] text-black text-[10px] font-bold rounded-full">
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
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#E4E1DA] py-2 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link href="/account" className="block px-4 py-2.5 font-sans text-[11px] tracking-[0.15em] uppercase text-[#3A3A3A] hover:text-[#3A5A78] hover:bg-[#F7F5F2] transition-colors">
                      My Account
                    </Link>
                    <Link href="/orders" className="block px-4 py-2.5 font-sans text-[11px] tracking-[0.15em] uppercase text-[#3A3A3A] hover:text-[#3A5A78] hover:bg-[#F7F5F2] transition-colors">
                      My Orders
                    </Link>
                    {session.user?.role === "ADMIN" && (
                      <Link href="/admin" className="block px-4 py-2.5 font-sans text-[11px] tracking-[0.15em] uppercase text-[#3A5A78] hover:bg-[#F7F5F2] transition-colors">
                        Admin Panel
                      </Link>
                    )}
                    <div className="my-1 border-t border-[#E4E1DA]" />
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2.5 font-sans text-[11px] tracking-[0.15em] uppercase text-[#3A3A3A] hover:text-red-500 hover:bg-[#F7F5F2] transition-colors"
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
                  <span className="absolute top-1 right-1 h-3.5 w-3.5 flex items-center justify-center bg-[#85A0B5] text-black text-[10px] font-bold rounded-full">
                    {totalItems()}
                  </span>
                )}
              </button>

              {/* Shop Now — desktop only */}
              <Link
                href="/shop"
                className="hidden md:inline-flex ml-2 btn-gold h-9 px-5 text-[12px] items-center justify-center tracking-[0.2em]"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4">
              <form onSubmit={submitSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5A5A5A]" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for pieces..."
                  className="w-full h-11 pl-11 pr-11 bg-[#141414] border border-[#2A2A2A] font-sans text-sm text-white placeholder:text-[#5A5A5A] focus:outline-none focus:border-[#85A0B5] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5A5A5A] hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      <CartDrawer />
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
