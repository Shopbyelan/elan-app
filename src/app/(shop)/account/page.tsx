import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getInitials, formatDate } from "@/lib/utils";
import { Package, Heart, MapPin, Bell, ChevronRight, LogOut } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Account — ÉLAN",
};

async function getAccountData(userId: string) {
  const [user, orderCount, wishlistCount, addressCount, waitlistCount] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.order.count({ where: { userId } }),
    prisma.wishlist.count({ where: { userId } }),
    prisma.address.count({ where: { userId } }),
    prisma.waitlistEntry.count({ where: { userId } }),
  ]);
  return { user, orderCount, wishlistCount, addressCount, waitlistCount };
}

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  let data;
  try {
    data = await getAccountData(session.user.id);
  } catch {
    data = { user: null, orderCount: 0, wishlistCount: 0, addressCount: 0, waitlistCount: 0 };
  }

  const { user, orderCount, wishlistCount, addressCount, waitlistCount } = data;
  const displayName = user?.name || session.user.name || "Member";
  const displayEmail = user?.email || session.user.email || "";

  const stats = [
    { label: "Orders", value: orderCount, icon: Package, href: "/orders" },
    { label: "Wishlist", value: wishlistCount, icon: Heart, href: "/wishlist" },
    { label: "Waiting List", value: waitlistCount, icon: Bell, href: "/account/waitlist" },
    { label: "Addresses", value: addressCount, icon: MapPin, href: "/account/addresses" },
  ];

  const links = [
    { label: "Order History", desc: "Track and manage your orders", href: "/orders", icon: Package },
    { label: "Saved Addresses", desc: "Manage your delivery addresses", href: "/account/addresses", icon: MapPin },
    { label: "Wishlist", desc: "Pieces you have saved", href: "/wishlist", icon: Heart },
    { label: "Waiting List", desc: "Get notified when out-of-stock pieces return", href: "/account/waitlist", icon: Bell },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      {/* Header */}
      <div className="mb-10">
        <p className="font-sans text-[11px] tracking-[0.4em] text-[#3A5A78] uppercase mb-2">
          My Account
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-[#0A0A0A]">
          Welcome back
        </h1>
      </div>

      {/* Profile card */}
      <div className="bg-[#FFFFFF] border border-[#E4E1DA] p-6 mb-6 flex items-center gap-5">
        {/* Avatar */}
        <div className="flex-shrink-0 w-14 h-14 bg-[#85A0B5] flex items-center justify-center">
          <span className="font-serif text-xl text-[#0A0A0A] tracking-wider">
            {getInitials(displayName)}
          </span>
        </div>

        <div className="min-w-0">
          <p className="font-serif text-lg text-[#3A3A3A] truncate">{displayName}</p>
          <p className="font-sans text-xs text-[#9A9A9A] truncate">{displayEmail}</p>
          {user?.createdAt && (
            <p className="font-sans text-[12px] text-[#9A9A9A] mt-1">
              Member since {formatDate(user.createdAt)}
            </p>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-px bg-[#E4E1DA] mb-6">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-[#FFFFFF] p-5 text-center hover:bg-[#FFFFFF] transition-colors group"
          >
            <Icon className="h-4 w-4 text-[#E4E1DA] group-hover:text-[#3A5A78] mx-auto mb-2 transition-colors" />
            <p className="font-serif text-2xl text-[#3A3A3A] mb-1">{value}</p>
            <p className="font-sans text-[11px] tracking-[0.2em] text-[#9A9A9A] uppercase">{label}</p>
          </Link>
        ))}
      </div>

      {/* Nav links */}
      <div className="bg-[#FFFFFF] border border-[#E4E1DA] divide-y divide-[#E4E1DA] mb-6">
        {links.map(({ label, desc, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-4 px-6 py-4 hover:bg-[#F7F5F2] transition-colors group"
          >
            <Icon className="h-4 w-4 text-[#9A9A9A] group-hover:text-[#3A5A78] transition-colors flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-sans text-xs text-[#3A3A3A] group-hover:text-[#0A0A0A] transition-colors">
                {label}
              </p>
              <p className="font-sans text-[12px] text-[#9A9A9A] mt-0.5">{desc}</p>
            </div>
            <ChevronRight className="h-3 w-3 text-[#E4E1DA] group-hover:text-[#3A5A78] transition-colors flex-shrink-0" />
          </Link>
        ))}
      </div>

      {/* Sign out */}
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-3 font-sans text-[12px] tracking-[0.2em] text-[#9A9A9A] uppercase border border-[#E4E1DA] hover:border-red-900/50 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="h-3 w-3" />
          Sign Out
        </button>
      </form>
    </div>
  );
}
