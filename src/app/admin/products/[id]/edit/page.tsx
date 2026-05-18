import { prisma } from "@/lib/prisma";
import { updateProduct, deleteProductImage } from "@/actions/product.actions";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

async function getProduct(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { images: { orderBy: { sortOrder: "asc" } }, category: true },
  });
}

async function getCategories() {
  try {
    return await prisma.category.findMany({ orderBy: { name: "asc" } });
  } catch {
    return [];
  }
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getProduct(id), getCategories()]);

  if (!product) notFound();

  const remainingSlots = 3 - product.images.length;

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-white">Edit Product</h1>
          <p className="font-sans text-sm text-[#5A5A5A] mt-1">{product.name}</p>
        </div>
        <Button variant="ghost" asChild>
          <Link href="/admin/products">← Back</Link>
        </Button>
      </div>

      {/* Photos */}
      <div className="bg-[#111] border border-[#1A1A1A] p-6 space-y-4 mb-6">
        <h2 className="font-serif text-lg text-white">Photos</h2>

        {/* Existing images */}
        {product.images.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {product.images.map((img) => (
              <div key={img.id} className={`relative group w-24 h-24 border-2 ${img.isPrimary ? "border-[#85A0B5]" : "border-transparent"}`}>
                <Image src={img.url} alt={img.alt || product.name} fill className="object-cover" />

                {img.isPrimary && (
                  <span className="absolute bottom-0 left-0 right-0 bg-[#85A0B5]/90 text-black font-sans text-[8px] tracking-wider uppercase text-center py-0.5">
                    Primary
                  </span>
                )}

                {/* Delete */}
                <form action={deleteProductImage} className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <input type="hidden" name="id" value={img.id} />
                  <input type="hidden" name="productId" value={product.id} />
                  <button
                    type="submit"
                    className="bg-red-900/80 text-white w-5 h-5 flex items-center justify-center hover:bg-red-700 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}

        {/* Upload new images */}
        {remainingSlots > 0 && (
          <form action={updateProduct}>
            <input type="hidden" name="id" value={product.id} />
            <ImageUploader maxImages={3} existingCount={product.images.length} />
            <button type="submit" className="mt-3 font-sans text-[10px] tracking-[0.2em] text-[#85A0B5] uppercase hover:underline">
              Save new photos →
            </button>
          </form>
        )}

        {remainingSlots === 0 && (
          <p className="font-sans text-[10px] text-[#3A3A3A]">3 / 3 photos · Delete one to add another</p>
        )}
      </div>

      {/* Product details form */}
      <form action={updateProduct} className="space-y-6">
        <input type="hidden" name="id" value={product.id} />

        <div className="bg-[#111] border border-[#1A1A1A] p-6 space-y-5">
          <h2 className="font-serif text-lg text-white">Product Details</h2>

          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Product Name *</label>
            <input name="name" required defaultValue={product.name} className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Category *</label>
              <select name="categoryId" required defaultValue={product.categoryId} className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors appearance-none">
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">SKU</label>
              <input name="sku" defaultValue={product.sku || ""} className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Price (₦) *</label>
              <input name="price" type="number" step="0.01" required defaultValue={product.price} className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors" />
            </div>
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Compare Price</label>
              <input name="comparePrice" type="number" step="0.01" defaultValue={product.comparePrice || ""} className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors" />
            </div>
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Stock *</label>
              <input name="stock" type="number" required defaultValue={product.stock} className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors" />
            </div>
          </div>

          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Short Description</label>
            <input name="shortDesc" defaultValue={product.shortDesc || ""} className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors" />
          </div>

          <div>
            <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Description *</label>
            <textarea name="description" required rows={5} defaultValue={product.description} className="w-full px-4 py-3 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Material</label>
              <input name="material" defaultValue={product.material || ""} className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors" />
            </div>
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">Badge</label>
              <input name="badge" defaultValue={product.badge || ""} className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="isFeatured" name="isFeatured" defaultChecked={product.isFeatured} className="h-4 w-4 accent-[#85A0B5]" />
            <label htmlFor="isFeatured" className="font-sans text-xs text-[#9A9A9A]">Feature on homepage</label>
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" variant="gold" size="lg">Save Changes</Button>
          <Button type="button" variant="ghost" size="lg" asChild>
            <Link href="/admin/products">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
