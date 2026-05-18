import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toggleProductActive } from "@/actions/product.actions";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { NotifyWaitlistButton } from "@/components/admin/NotifyWaitlistButton";

async function getProducts() {
  try {
    return await prisma.product.findMany({
      include: {
        images: true,
        category: true,
        _count: { select: { orderItems: true, waitlistEntries: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-white">Products</h1>
          <p className="font-sans text-sm text-[#5A5A5A] mt-1">{products.length} items</p>
        </div>
        <Button variant="gold" asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4" /> Add Product
          </Link>
        </Button>
      </div>

      <div className="bg-[#111] border border-[#1A1A1A] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1A1A1A]">
              {["Product", "Category", "Price", "Stock", "Waitlist", "Orders", "Status", "Actions"].map((h) => (
                <th key={h} className="px-5 py-4 text-left font-sans text-[9px] tracking-[0.2em] text-[#5A5A5A] uppercase">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#141414]">
            {products.map((product) => {
              const img = product.images.find((i) => i.isPrimary)?.url || product.images[0]?.url;
              const waitlistCount = product._count.waitlistEntries;
              return (
                <tr key={product.id} className="hover:bg-[#141414] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 flex-shrink-0 bg-[#1A1A1A]">
                        {img && <Image src={img} alt={product.name} fill className="object-cover" />}
                      </div>
                      <div>
                        <p className="font-sans text-xs text-white">{product.name}</p>
                        <p className="font-sans text-[10px] text-[#5A5A5A]">{product.sku || "—"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-sans text-xs text-[#9A9A9A]">
                    {product.category?.name || "—"}
                  </td>
                  <td className="px-5 py-4 font-sans text-xs text-[#85A0B5]">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`font-sans text-xs font-medium ${
                      product.stock === 0 ? "text-red-400" :
                      product.stock <= 5 ? "text-amber-400" :
                      "text-emerald-400"
                    }`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <NotifyWaitlistButton
                      productId={product.id}
                      count={waitlistCount}
                    />
                    {waitlistCount === 0 && (
                      <span className="font-sans text-xs text-[#3A3A3A]">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 font-sans text-xs text-[#9A9A9A]">
                    {product._count.orderItems}
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={product.isActive ? "green" : "dark"}>
                      {product.isActive ? "Active" : "Hidden"}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Link href={`/admin/products/${product.id}/edit`} className="text-[#5A5A5A] hover:text-[#85A0B5] transition-colors">
                        <Edit className="h-4 w-4" />
                      </Link>
                      <form action={toggleProductActive}>
                        <input type="hidden" name="id" value={product.id} />
                        <input type="hidden" name="isActive" value={String(!product.isActive)} />
                        <button type="submit" className={`transition-colors ${product.isActive ? "text-[#5A5A5A] hover:text-amber-400" : "text-[#5A5A5A] hover:text-emerald-400"}`}>
                          {product.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </form>
                      <DeleteProductButton
                        id={product.id}
                        name={product.name}
                        hasOrders={product._count.orderItems > 0}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
            {products.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center font-sans text-sm text-[#5A5A5A]">
                  No products yet.{" "}
                  <Link href="/admin/products/new" className="text-[#85A0B5] hover:underline">
                    Add your first product →
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
