import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Bell, ArrowLeft, ShoppingBag } from "lucide-react";
import { RemoveWaitlistButton } from "@/components/products/RemoveWaitlistButton";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "My Waiting List — ÉLAN" };

async function getWaitlistItems(userId: string) {
  return prisma.waitlistEntry.findMany({
    where: { userId },
    include: {
      product: {
        include: { images: true, categories: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function WaitlistPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login?callbackUrl=/account/waitlist");

  let items: Awaited<ReturnType<typeof getWaitlistItems>> = [];
  try {
    items = await getWaitlistItems(session.user.id);
  } catch {
    items = [];
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
      <div className="mb-10">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 font-sans text-[12px] tracking-[0.2em] text-[#9A9A9A] uppercase hover:text-[#3A5A78] transition-colors mb-6"
        >
          <ArrowLeft className="h-3 w-3" /> My Account
        </Link>
        <p className="font-sans text-[11px] tracking-[0.4em] text-[#3A5A78] uppercase mb-2">
          Restock Alerts
        </p>
        <h1 className="font-serif text-3xl md:text-4xl text-[#0A0A0A]">My Waiting List</h1>
        {items.length > 0 && (
          <p className="font-sans text-sm text-[#9A9A9A] mt-2">
            {items.length} {items.length === 1 ? "piece" : "pieces"} — we&apos;ll email you when they&apos;re back.
          </p>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 flex items-center justify-center border border-[#E4E1DA] mb-6">
            <Bell className="h-6 w-6 text-[#9A9A9A]" />
          </div>
          <h2 className="font-serif text-xl text-[#0A0A0A] mb-3">No items yet</h2>
          <p className="font-sans text-sm text-[#9A9A9A] max-w-xs leading-relaxed mb-8">
            When a piece you love is out of stock, join its waiting list and we&apos;ll notify you the moment it&apos;s available.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-sans text-[12px] tracking-[0.2em] text-[#3A5A78] uppercase hover:text-[#9DB5C8] transition-colors"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Browse Collections
          </Link>
        </div>
      ) : (
        <div className="space-y-px">
          {items.map(({ id, product, createdAt, notified }) => {
            const img =
              product.images.find((i) => i.isPrimary)?.url ?? product.images[0]?.url;
            const inStock = product.stock > 0;

            return (
              <div
                key={id}
                className="flex items-center gap-5 bg-[#FFFFFF] border border-[#E4E1DA] p-4 hover:border-[#85A0B5]/20 transition-colors"
              >
                {/* Image */}
                <Link href={`/product/${product.slug}`} className="flex-shrink-0">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 bg-[#F7F5F2] overflow-hidden">
                    {img ? (
                      <Image src={img} alt={product.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#F7F5F2]" />
                    )}
                  </div>
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-[11px] tracking-[0.25em] text-[#3A5A78] uppercase mb-0.5">
                    {product.categories?.[0]?.name}
                  </p>
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="font-serif text-base text-[#0A0A0A] hover:text-[#3A5A78] transition-colors truncate">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-sans text-sm text-[#9A9A9A] mt-0.5">
                    {formatPrice(product.price)}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    {inStock ? (
                      <span className="inline-flex items-center gap-1.5 font-sans text-[12px] tracking-[0.15em] text-emerald-400 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                        Back in stock
                      </span>
                    ) : notified ? (
                      <span className="font-sans text-[12px] tracking-[0.15em] text-[#3A5A78] uppercase">
                        Notified
                      </span>
                    ) : (
                      <span className="font-sans text-[12px] tracking-[0.15em] text-[#9A9A9A] uppercase">
                        Waiting · joined {new Date(createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  {inStock && (
                    <Link
                      href={`/product/${product.slug}`}
                      className="font-sans text-[12px] tracking-[0.15em] text-[#3A5A78] uppercase hover:text-[#9DB5C8] transition-colors whitespace-nowrap"
                    >
                      Shop now →
                    </Link>
                  )}
                  <RemoveWaitlistButton entryId={id} productId={product.id} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
