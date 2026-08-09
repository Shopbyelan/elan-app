"use client";

import Link from "next/link";
import Image from "next/image";
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
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white border-r border-[#E4E1DA] flex-col z-30">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-[#E4E1DA]">
        <Link href="/">
          <Image src="/ElanLogoblack.png" alt="Élan Fine Jewellery" width={100} height={36} className="h-7 w-auto" />
        </Link>
        <p className="font-sans text-[11px] tracking-[0.3em] text-[#3A5A78] uppercase mt-0.5">
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
                  ? "bg-[#3A5A78]/10 text-[#3A5A78] border-l-2 border-[#3A5A78]"
                  : "text-[#6B6B6B] hover:text-[#0A0A0A] hover:bg-[#F7F5F2]"
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
      <div className="px-3 pb-6 border-t border-[#E4E1DA] pt-4">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 mb-1 text-[#6B6B6B] hover:text-[#0A0A0A] hover:bg-[#F7F5F2] transition-all"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          <span className="font-sans text-xs tracking-[0.1em] uppercase">View Store</span>
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-[#6B6B6B] hover:text-red-500 hover:bg-[#F7F5F2] transition-all"
        >
          <LogOut className="h-4 w-4" />
          <span className="font-sans text-xs tracking-[0.1em] uppercase">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
