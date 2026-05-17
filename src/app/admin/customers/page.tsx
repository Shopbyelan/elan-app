import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

async function getCustomers() {
  try {
    return await prisma.user.findMany({
      where: { role: "CUSTOMER" },
      include: { _count: { select: { orders: true } } },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function AdminCustomersPage() {
  const customers = await getCustomers();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-white">Customers</h1>
        <p className="font-sans text-sm text-[#5A5A5A] mt-1">{customers.length} registered customers</p>
      </div>

      <div className="bg-[#111] border border-[#1A1A1A] overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1A1A1A]">
              {["Customer", "Email", "Orders", "Joined", "Provider"].map((h) => (
                <th key={h} className="px-5 py-4 text-left font-sans text-[9px] tracking-[0.2em] text-[#5A5A5A] uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#141414]">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-[#141414] transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 flex items-center justify-center bg-[#1A1A1A] text-[#C9A84C] font-serif text-sm">
                      {customer.name?.[0] || customer.email[0].toUpperCase()}
                    </div>
                    <p className="font-sans text-xs text-white">{customer.name || "—"}</p>
                  </div>
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#9A9A9A]">
                  {customer.email}
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#C9A84C]">
                  {customer._count.orders}
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#9A9A9A]">
                  {formatDate(customer.createdAt)}
                </td>
                <td className="px-5 py-4">
                  <span className="font-sans text-[10px] text-[#5A5A5A]">
                    {customer.password ? "Email" : "OAuth"}
                  </span>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center font-sans text-sm text-[#5A5A5A]">
                  No customers yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
