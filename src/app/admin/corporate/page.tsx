import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { INQUIRY_STATUS_COLORS, INQUIRY_STATUSES } from "@/lib/corporate";

async function getInquiries() {
  try {
    return await prisma.corporateInquiry.findMany({
      include: { _count: { select: { items: true } } },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function AdminCorporatePage() {
  const inquiries = await getInquiries();
  const counts = Object.fromEntries(
    INQUIRY_STATUSES.map((s) => [s, inquiries.filter((i) => i.status === s).length]),
  );
  const totalPieces = inquiries
    .filter((i) => i.status !== "CLOSED")
    .reduce((sum, i) => sum + i.totalQuantity, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-[#0A0A0A]">Corporate &amp; Gifting</h1>
        <p className="font-sans text-sm text-[#9A9A9A] mt-1">
          {inquiries.length} bulk requests · {totalPieces.toLocaleString()} pieces in open requests
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {INQUIRY_STATUSES.map((s) => (
          <div key={s} className="bg-white border border-[#E4E1DA] px-4 py-3">
            <p className="font-sans text-[11px] tracking-[0.2em] text-[#9A9A9A] uppercase">{s}</p>
            <p className="font-serif text-2xl text-[#0A0A0A] mt-1">{counts[s]}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#FFFFFF] border border-[#E4E1DA] overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E4E1DA]">
              {["Reference", "Company", "Contact", "Occasion", "Pieces", "Needed By", "Received", "Status"].map((h) => (
                <th key={h} className="px-5 py-4 text-left font-sans text-[11px] tracking-[0.2em] text-[#9A9A9A] uppercase whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4E1DA]">
            {inquiries.map((inq) => (
              <tr key={inq.id} className="hover:bg-[#F7F5F2] transition-colors">
                <td className="px-5 py-4">
                  <Link href={`/admin/corporate/${inq.id}`} className="font-sans text-xs text-[#3A5A78] hover:underline whitespace-nowrap">
                    {inq.reference}
                  </Link>
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#3A3A3A]">{inq.companyName}</td>
                <td className="px-5 py-4">
                  <p className="font-sans text-xs text-[#3A3A3A]">{inq.contactName}</p>
                  <p className="font-sans text-[12px] text-[#9A9A9A]">{inq.email}</p>
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#6B6B6B]">{inq.occasion}</td>
                <td className="px-5 py-4 font-sans text-xs text-[#3A5A78]">
                  {inq.totalQuantity}
                  {inq._count.items > 0 && (
                    <span className="text-[#9A9A9A]"> · {inq._count.items} styles</span>
                  )}
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#6B6B6B] whitespace-nowrap">
                  {inq.deliveryDate ? formatDate(inq.deliveryDate) : "—"}
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#6B6B6B] whitespace-nowrap">{formatDate(inq.createdAt)}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex px-2 py-0.5 font-sans text-[11px] tracking-wider border ${INQUIRY_STATUS_COLORS[inq.status]}`}>
                    {inq.status}
                  </span>
                </td>
              </tr>
            ))}
            {inquiries.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center font-sans text-sm text-[#9A9A9A]">
                  No corporate requests yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
