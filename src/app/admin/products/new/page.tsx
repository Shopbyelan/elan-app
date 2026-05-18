import { prisma } from "@/lib/prisma";
import { createProduct } from "@/actions/product.actions";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import Link from "next/link";

async function getCategories() {
  try {
    return await prisma.category.findMany({ orderBy: { name: "asc" } });
  } catch {
    return [];
  }
}

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-white">New Product</h1>
          <p className="font-sans text-sm text-[#5A5A5A] mt-1">Add a new piece to your collection</p>
        </div>
        <Button variant="ghost" asChild>
          <Link href="/admin/products">← Back</Link>
        </Button>
      </div>

      <form action={createProduct} className="space-y-6">
        {/* Photos */}
        <div className="bg-[#111] border border-[#1A1A1A] p-6 space-y-4">
          <h2 className="font-serif text-lg text-white">Photos</h2>
          <ImageUploader maxImages={3} />
        </div>

        <div className="bg-[#111] border border-[#1A1A1A] p-6 space-y-5">
          <h2 className="font-serif text-lg text-white">Product Details</h2>

          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Product Name *</label>
            <input name="name" required className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors" placeholder="Soleil Bangle" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Category *</label>
              <select name="categoryId" required className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors appearance-none">
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">SKU</label>
              <input name="sku" className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors" placeholder="ELN-001" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Price (₦) *</label>
              <input name="price" type="number" step="0.01" required className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors" placeholder="1240" />
            </div>
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Compare Price</label>
              <input name="comparePrice" type="number" step="0.01" className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors" placeholder="1500" />
            </div>
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Stock *</label>
              <input name="stock" type="number" required defaultValue={10} className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors" />
            </div>
          </div>

          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Short Description</label>
            <input name="shortDesc" className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors" placeholder="Hand-finished 18k yellow gold bangle, 7mm width." />
          </div>

          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Description *</label>
            <textarea name="description" required rows={5} className="w-full px-4 py-3 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors resize-none" placeholder="Full product description..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Material</label>
              <input name="material" className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors" placeholder="18k Yellow Gold" />
            </div>
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Badge</label>
              <input name="badge" className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors" placeholder="NEW ARRIVAL" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="isFeatured" name="isFeatured" className="h-4 w-4 accent-[#85A0B5]" />
            <label htmlFor="isFeatured" className="font-sans text-xs text-[#9A9A9A]">
              Feature on homepage
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" variant="gold" size="lg">
            Create Product
          </Button>
          <Button type="button" variant="ghost" size="lg" asChild>
            <Link href="/admin/products">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
