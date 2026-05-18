"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

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
        className={`fixed left-0 top-0 h-full w-72 z-50 bg-[#0A0A0A] border-r border-[#1A1A1A] transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#1A1A1A]">
          <span className="font-serif text-xl tracking-[0.3em] text-white">ÉLAN</span>
          <button onClick={onClose} className="text-[#9A9A9A] hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="py-6">
          <p className="px-6 mb-4 font-sans text-[9px] tracking-[0.3em] text-[#85A0B5] uppercase">
            Collections
          </p>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="block px-6 py-3 font-sans text-sm tracking-[0.1em] text-[#9A9A9A] hover:text-white hover:bg-[#141414] transition-colors"
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
              <Link href="/account" onClick={onClose} className="block px-6 py-3 font-sans text-sm tracking-[0.1em] text-[#9A9A9A] hover:text-white hover:bg-[#141414] transition-colors">
                My Account
              </Link>
              <Link href="/orders" onClick={onClose} className="block px-6 py-3 font-sans text-sm tracking-[0.1em] text-[#9A9A9A] hover:text-white hover:bg-[#141414] transition-colors">
                My Orders
              </Link>
              <Link href="/wishlist" onClick={onClose} className="block px-6 py-3 font-sans text-sm tracking-[0.1em] text-[#9A9A9A] hover:text-white hover:bg-[#141414] transition-colors">
                Wishlist
              </Link>
              <button
                onClick={() => { signOut(); onClose(); }}
                className="block w-full text-left px-6 py-3 font-sans text-sm tracking-[0.1em] text-[#9A9A9A] hover:text-red-400 hover:bg-[#141414] transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={onClose} className="block px-6 py-3 font-sans text-sm tracking-[0.1em] text-[#9A9A9A] hover:text-white hover:bg-[#141414] transition-colors">
                Sign In
              </Link>
              <Link href="/register" onClick={onClose} className="block px-6 py-3 font-sans text-sm tracking-[0.1em] text-[#9A9A9A] hover:text-white hover:bg-[#141414] transition-colors">
                Create Account
              </Link>
            </>
          )}
        </div>

        <div className="absolute bottom-8 left-6 right-6">
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
