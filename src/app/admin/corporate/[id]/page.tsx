import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, ClipboardList, Package } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate, formatPrice } from "@/lib/utils";
import { INQUIRY_STATUS_COLORS, INQUIRY_STATUSES } from "@/lib/corporate";
import { updateCorporateInquiry } from "@/actions/corporate.actions";
import { Button } from "@/components/ui/button";

async function getInquiry(id: string) {
  return prisma.corporateInquiry.findUnique({
    where: { id },
    include: {
      items: { include: { product: { select: { slug: true, price: true } } } },
      user: { select: { name: true, email: true } },
    },
  });
}

export default async function AdminCorporateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const inquiry = await getInquiry(id);
  if (!inquiry) notFound();

  const retailValue = inquiry.items.reduce((sum, i) => sum + (i.product?.price ?? 0) * i.quantity, 0);
  const extras = [inquiry.engraving && "Engraving", inquiry.brandedPackaging && "Co-branded packaging"].filter(Boolean);

  const details: [string, React.ReactNode][] = [
    ["Occasion", inquiry.occasion],
    ["Total Pieces", inquiry.totalQuantity],
    ["Budget / Piece", inquiry.budgetPerPiece || "Not specified"],
    ["Needed By", inquiry.deliveryDate ? formatDate(inquiry.deliveryDate) : "Not specified"],
    ["Delivery City", inquiry.deliveryCity || "Not specified"],
    ["Extras", extras.length ? extras.join(", ") : "None"],
  ];

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <Link href="/admin/corporate" className="inline-flex items-center gap-1.5 font-sans text-[12px] tracking-[0.2em] text-[#9A9A9A] uppercase hover:text-[#3A5A78] transition-colors mb-3">
            <ArrowLeft className="h-3 w-3" /> All Requests
          </Link>
          <h1 className="font-serif text-3xl text-[#0A0A0A]">{inquiry.companyName}</h1>
          <p className="font-sans text-sm text-[#9A9A9A] mt-1">
            {inquiry.reference} · {formatDate(inquiry.createdAt)}
          </p>
        </div>
        <span className={`inline-flex items-center px-3 py-1 font-sans text-[12px] tracking-wider border ${INQUIRY_STATUS_COLORS[inquiry.status]}`}>
          {inquiry.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Request */}
          <div className="bg-[#FFFFFF] border border-[#E4E1DA]">
            <div className="px-5 py-4 border-b border-[#E4E1DA] flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-[#3A5A78]" />
              <h2 className="font-serif text-lg text-[#0A0A0A]">Request</h2>
            </div>
            <dl className="px-5 py-4 grid grid-cols-2 gap-x-6 gap-y-4 font-sans text-sm">
              {details.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[11px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-1">{label}</dt>
                  <dd className="text-[#3A3A3A]">{value}</dd>
                </div>
              ))}
            </dl>
            {inquiry.message && (
              <div className="px-5 pb-5">
                <p className="text-[11px] font-sans tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Message</p>
                <p className="font-sans text-sm text-[#3A3A3A] whitespace-pre-wrap bg-[#F7F5F2] border-l-2 border-[#3A5A78] px-4 py-3 leading-relaxed">
                  {inquiry.message}
                </p>
              </div>
            )}
          </div>

          {/* Pieces */}
          <div className="bg-[#FFFFFF] border border-[#E4E1DA] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#E4E1DA] flex items-center gap-2">
              <Package className="h-4 w-4 text-[#3A5A78]" />
              <h2 className="font-serif text-lg text-[#0A0A0A]">Pieces of Interest</h2>
            </div>
            {inquiry.items.length === 0 ? (
              <p className="px-5 py-6 font-sans text-sm text-[#9A9A9A]">
                No specific pieces selected — client would like a curated selection.
              </p>
            ) : (
              <>
                <div className="divide-y divide-[#E4E1DA]">
                  {inquiry.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                      <div className="flex-1 min-w-0">
                        {item.product ? (
                          <Link href={`/product/${item.product.slug}`} target="_blank" className="font-sans text-sm text-[#3A3A3A] hover:text-[#3A5A78]">
                            {item.productName}
                          </Link>
                        ) : (
                          <p className="font-sans text-sm text-[#3A3A3A]">{item.productName} <span className="text-[#9A9A9A]">(removed)</span></p>
                        )}
                        <p className="font-sans text-[12px] text-[#9A9A9A] mt-0.5">Qty: {item.quantity}</p>
                      </div>
                      {item.product && (
                        <p className="font-sans text-sm text-[#3A5A78] flex-shrink-0">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                <div className="px-5 py-4 border-t border-[#E4E1DA] bg-[#F7F5F2] flex justify-between font-serif text-base text-[#3A5A78]">
                  <span>Current retail value</span>
                  <span>{formatPrice(retailValue)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Contact */}
          <div className="bg-[#FFFFFF] border border-[#E4E1DA]">
            <div className="px-5 py-4 border-b border-[#E4E1DA] flex items-center gap-2">
              <Building2 className="h-4 w-4 text-[#3A5A78]" />
              <h2 className="font-serif text-lg text-[#0A0A0A]">Contact</h2>
            </div>
            <div className="px-5 py-4 space-y-2 font-sans text-sm">
              <p className="text-[#3A3A3A]">{inquiry.contactName}</p>
              {inquiry.jobTitle && <p className="text-[#9A9A9A] text-xs">{inquiry.jobTitle}</p>}
              <a href={`mailto:${inquiry.email}?subject=${encodeURIComponent(`Your Élan gifting request ${inquiry.reference}`)}`} className="block text-[#6B6B6B] break-all hover:text-[#3A5A78]">
                {inquiry.email}
              </a>
              <a href={`tel:${inquiry.phone}`} className="block text-[#3A5A78]">{inquiry.phone}</a>
              {inquiry.user && (
                <p className="text-[12px] text-[#9A9A9A] pt-1">Submitted while signed in as {inquiry.user.email}</p>
              )}
            </div>
          </div>

          {/* Manage */}
          <div className="bg-[#FFFFFF] border border-[#E4E1DA]">
            <div className="px-5 py-4 border-b border-[#E4E1DA]">
              <h2 className="font-serif text-lg text-[#0A0A0A]">Manage Request</h2>
            </div>
            <form action={updateCorporateInquiry} className="px-5 py-4 space-y-4">
              <input type="hidden" name="id" value={inquiry.id} />

              <div>
                <label className="block font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">Status</label>
                <select name="status" defaultValue={inquiry.status} className="w-full h-10 px-3 bg-[#F7F5F2] border border-[#E4E1DA] text-[#3A3A3A] font-sans text-sm focus:outline-none focus:border-[#3A5A78] appearance-none transition-colors">
                  {INQUIRY_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">Internal Notes</label>
                <textarea
                  name="adminNotes"
                  defaultValue={inquiry.adminNotes || ""}
                  rows={5}
                  placeholder="Quote sent, pricing agreed, follow-up dates…"
                  className="w-full px-3 py-2 bg-[#F7F5F2] border border-[#E4E1DA] text-[#3A3A3A] font-sans text-sm focus:outline-none focus:border-[#3A5A78] transition-colors resize-none"
                />
              </div>

              <Button type="submit" variant="gold" size="md" className="w-full">
                Save Changes
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
