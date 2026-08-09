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
        <h1 className="font-serif text-3xl text-[#0A0A0A]">Customers</h1>
        <p className="font-sans text-sm text-[#9A9A9A] mt-1">{customers.length} registered customers</p>
      </div>

      <div className="bg-[#FFFFFF] border border-[#E4E1DA] overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E4E1DA]">
              {["Customer", "Email", "Orders", "Joined", "Provider"].map((h) => (
                <th key={h} className="px-5 py-4 text-left font-sans text-[11px] tracking-[0.2em] text-[#9A9A9A] uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E4E1DA]">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-[#F7F5F2] transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 flex items-center justify-center bg-[#F7F5F2] text-[#3A5A78] font-serif text-sm">
                      {customer.name?.[0] || customer.email[0].toUpperCase()}
                    </div>
                    <p className="font-sans text-xs text-[#3A3A3A]">{customer.name || "—"}</p>
                  </div>
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#6B6B6B]">
                  {customer.email}
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#3A5A78]">
                  {customer._count.orders}
                </td>
                <td className="px-5 py-4 font-sans text-xs text-[#6B6B6B]">
                  {formatDate(customer.createdAt)}
                </td>
                <td className="px-5 py-4">
                  <span className="font-sans text-[12px] text-[#9A9A9A]">
                    {customer.password ? "Email" : "OAuth"}
                  </span>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-12 text-center font-sans text-sm text-[#9A9A9A]">
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
