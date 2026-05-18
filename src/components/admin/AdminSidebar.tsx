"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, Package, Tag, ShoppingCart, Users, Ticket, LogOut, ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/categories", icon: Tag, label: "Categories" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/admin/customers", icon: Users, label: "Customers" },
  { href: "/admin/coupons", icon: Ticket, label: "Coupons" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-[#0D0D0D] border-r border-[#1A1A1A] flex-col z-30">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-[#1A1A1A]">
        <Link href="/">
          <span className="font-serif text-xl tracking-[0.3em] text-white">ÉLAN</span>
        </Link>
        <p className="font-sans text-[9px] tracking-[0.3em] text-[#85A0B5] uppercase mt-0.5">
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-3">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 mb-1 transition-all duration-200 group ${
                active
                  ? "bg-[#85A0B5]/10 text-[#85A0B5] border-l-2 border-[#85A0B5]"
                  : "text-[#5A5A5A] hover:text-[#9A9A9A] hover:bg-[#141414]"
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="font-sans text-xs tracking-[0.1em] uppercase">{label}</span>
              {active && <ChevronRight className="h-3 w-3 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-6 border-t border-[#1A1A1A] pt-4">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 mb-1 text-[#5A5A5A] hover:text-[#9A9A9A] hover:bg-[#141414] transition-all"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          <span className="font-sans text-xs tracking-[0.1em] uppercase">View Store</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-[#5A5A5A] hover:text-red-400 hover:bg-[#141414] transition-all"
        >
          <LogOut className="h-4 w-4" />
          <span className="font-sans text-xs tracking-[0.1em] uppercase">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
