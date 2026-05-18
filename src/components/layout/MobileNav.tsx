"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useCurrencyStore } from "@/store/currency.store";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/shop", label: "All Collections" },
  { href: "/shop?category=18k-gold", label: "18k Gold" },
  { href: "/shop?category=sterling-silver", label: "Sterling Silver" },
  { href: "/shop?category=cultivated-diamond", label: "Cultivated Diamond" },
  { href: "/shop?category=platinum", label: "Platinum" },
  { href: "/shop?category=crystal-moissanite", label: "Crystal Moissanite" },
  { href: "/materials", label: "Our Materials" },
];

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const { data: session } = useSession();
  const { currency, setCurrency } = useCurrencyStore();

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
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed left-0 top-0 h-full w-72 z-50 bg-[#0A0A0A] border-r border-[#1A1A1A] transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#1A1A1A] shrink-0">
          <span className="font-serif text-xl tracking-[0.3em] text-white">ÉLAN</span>
          <button onClick={onClose} className="text-[#9A9A9A] hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <nav className="py-6">
            <p className="px-6 mb-4 font-sans text-[9px] tracking-[0.3em] text-[#85A0B5] uppercase">
              Collections
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="block px-6 py-3 font-sans text-sm tracking-widest text-[#9A9A9A] hover:text-white hover:bg-[#141414] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-[#1A1A1A] py-6">
            <p className="px-6 mb-4 font-sans text-[9px] tracking-[0.3em] text-[#85A0B5] uppercase">
              Account
            </p>
            {session ? (
              <>
                <Link href="/account" onClick={onClose} className="block px-6 py-3 font-sans text-sm tracking-widest text-[#9A9A9A] hover:text-white hover:bg-[#141414] transition-colors">
                  My Account
                </Link>
                <Link href="/orders" onClick={onClose} className="block px-6 py-3 font-sans text-sm tracking-widest text-[#9A9A9A] hover:text-white hover:bg-[#141414] transition-colors">
                  My Orders
                </Link>
                <Link href="/wishlist" onClick={onClose} className="block px-6 py-3 font-sans text-sm tracking-widest text-[#9A9A9A] hover:text-white hover:bg-[#141414] transition-colors">
                  Wishlist
                </Link>
                <button
                  onClick={() => { signOut(); onClose(); }}
                  className="block w-full text-left px-6 py-3 font-sans text-sm tracking-widest text-[#9A9A9A] hover:text-red-400 hover:bg-[#141414] transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={onClose} className="block px-6 py-3 font-sans text-sm tracking-widest text-[#9A9A9A] hover:text-white hover:bg-[#141414] transition-colors">
                  Sign In
                </Link>
                <Link href="/register" onClick={onClose} className="block px-6 py-3 font-sans text-sm tracking-widest text-[#9A9A9A] hover:text-white hover:bg-[#141414] transition-colors">
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Sticky footer — currency + shop now */}
        <div className="shrink-0 border-t border-[#1A1A1A] px-6 py-5 space-y-3">
          <p className="font-sans text-[9px] tracking-[0.3em] text-[#85A0B5] uppercase mb-3">
            Currency
          </p>
          <div className="flex items-center border border-[#2A2A2A] overflow-hidden">
            <button
              onClick={() => setCurrency("NGN")}
              className={`flex-1 py-2.5 font-sans text-[10px] tracking-[0.2em] uppercase transition-colors ${
                currency === "NGN"
                  ? "bg-[#1A2A3A] text-[#85A0B5]"
                  : "text-[#3A3A3A] hover:text-[#5A5A5A]"
              }`}
            >
              ₦ Naira
            </button>
            <div className="w-px h-5 bg-[#2A2A2A]" />
            <button
              onClick={() => setCurrency("USD")}
              className={`flex-1 py-2.5 font-sans text-[10px] tracking-[0.2em] uppercase transition-colors ${
                currency === "USD"
                  ? "bg-[#1A2A3A] text-[#85A0B5]"
                  : "text-[#3A3A3A] hover:text-[#5A5A5A]"
              }`}
            >
              $ Dollar
            </button>
          </div>

          <Link
            href="/shop"
            onClick={onClose}
            className="btn-gold w-full h-11 flex items-center justify-center"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </>
  );
}
