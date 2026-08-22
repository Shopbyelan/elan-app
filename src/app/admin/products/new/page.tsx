import { prisma } from "@/lib/prisma";
import { createProduct } from "@/actions/product.actions";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { UploadGateProvider } from "@/components/admin/UploadGate";
import { PhotoAwareSubmit } from "@/components/admin/PhotoAwareSubmit";
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
          <h1 className="font-serif text-3xl text-[#0A0A0A]">New Product</h1>
          <p className="font-sans text-sm text-[#6B6B6B] mt-1">Add a new piece to your collection</p>
        </div>
        <Button variant="ghost" asChild>
          <Link href="/admin/products">← Back</Link>
        </Button>
      </div>

      <UploadGateProvider>
      <form action={createProduct} className="space-y-6">
        {/* Photos */}
        <div className="bg-white border border-[#E4E1DA] p-6 space-y-4">
          <h2 className="font-serif text-lg text-[#0A0A0A]">Photos</h2>
          <ImageUploader maxImages={4} />
        </div>

        <div className="bg-white border border-[#E4E1DA] p-6 space-y-5">
          <h2 className="font-serif text-lg text-[#0A0A0A]">Product Details</h2>

          <div>
            <label className="block font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">Product Name *</label>
            <input name="name" required className="w-full h-11 px-4 bg-[#F7F5F2] border border-[#E4E1DA] text-[#3A3A3A] font-sans text-sm focus:outline-none focus:border-[#3A5A78] transition-colors" placeholder="Soleil Bangle" />
          </div>

          <div>
            <label className="block font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">Categories *</label>
            <div className="flex flex-wrap gap-x-6 gap-y-2 px-4 py-3 bg-[#F7F5F2] border border-[#E4E1DA]">
              {categories.map((c) => (
                <label key={c.id} className="flex items-center gap-2 font-sans text-sm text-[#3A3A3A] cursor-pointer">
                  <input type="checkbox" name="categoryIds" value={c.id} className="h-4 w-4 accent-[#3A5A78]" />
                  {c.name}
                </label>
              ))}
              {categories.length === 0 && (
                <p className="font-sans text-sm text-[#9A9A9A]">No categories yet — create one first.</p>
              )}
            </div>
            <p className="font-sans text-[12px] text-[#9A9A9A] mt-1.5">A product can belong to more than one category (e.g. 18k Gold and Platinum).</p>
          </div>

          <div>
            <label className="block font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">SKU</label>
            <input name="sku" className="w-full h-11 px-4 bg-[#F7F5F2] border border-[#E4E1DA] text-[#3A3A3A] font-sans text-sm focus:outline-none focus:border-[#3A5A78] transition-colors" placeholder="ELN-001" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">Price (₦) *</label>
              <input name="price" type="number" step="0.01" required className="w-full h-11 px-4 bg-[#F7F5F2] border border-[#E4E1DA] text-[#3A3A3A] font-sans text-sm focus:outline-none focus:border-[#3A5A78] transition-colors" placeholder="1240" />
            </div>
            <div>
              <label className="block font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">Compare Price</label>
              <input name="comparePrice" type="number" step="0.01" className="w-full h-11 px-4 bg-[#F7F5F2] border border-[#E4E1DA] text-[#3A3A3A] font-sans text-sm focus:outline-none focus:border-[#3A5A78] transition-colors" placeholder="1500" />
            </div>
            <div>
              <label className="block font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">Stock *</label>
              <input name="stock" type="number" required defaultValue={10} className="w-full h-11 px-4 bg-[#F7F5F2] border border-[#E4E1DA] text-[#3A3A3A] font-sans text-sm focus:outline-none focus:border-[#3A5A78] transition-colors" />
            </div>
          </div>

          <div>
            <label className="block font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">Short Description</label>
            <input name="shortDesc" className="w-full h-11 px-4 bg-[#F7F5F2] border border-[#E4E1DA] text-[#3A3A3A] font-sans text-sm focus:outline-none focus:border-[#3A5A78] transition-colors" placeholder="Hand-finished 18k yellow gold bangle, 7mm width." />
          </div>

          <div>
            <label className="block font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">Description *</label>
            <textarea name="description" required rows={5} className="w-full px-4 py-3 bg-[#F7F5F2] border border-[#E4E1DA] text-[#3A3A3A] font-sans text-sm focus:outline-none focus:border-[#3A5A78] transition-colors resize-none" placeholder="Full product description..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">Material</label>
              <input name="material" className="w-full h-11 px-4 bg-[#F7F5F2] border border-[#E4E1DA] text-[#3A3A3A] font-sans text-sm focus:outline-none focus:border-[#3A5A78] transition-colors" placeholder="18k Yellow Gold" />
            </div>
            <div>
              <label className="block font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">Badge</label>
              <input name="badge" className="w-full h-11 px-4 bg-[#F7F5F2] border border-[#E4E1DA] text-[#3A3A3A] font-sans text-sm focus:outline-none focus:border-[#3A5A78] transition-colors" placeholder="NEW ARRIVAL" />
            </div>
          </div>

          <div>
            <label className="block font-sans text-[12px] tracking-[0.2em] text-[#6B6B6B] uppercase mb-2">Piece Type</label>
            <select name="productType" defaultValue="" className="w-full h-11 px-4 bg-[#F7F5F2] border border-[#E4E1DA] text-[#3A3A3A] font-sans text-sm focus:outline-none focus:border-[#3A5A78] transition-colors appearance-none">
              <option value="">— None —</option>
              <option value="necklace">Necklace</option>
              <option value="earrings">Earrings</option>
              <option value="ring">Ring</option>
              <option value="bracelet">Bracelet</option>
              <option value="jewelry-set">Jewelry Set</option>
            </select>
            <p className="font-sans text-[12px] text-[#9A9A9A] mt-1.5">Used for the Necklaces / Earrings / Rings / Bracelets / Jewelry Set collections</p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <input type="checkbox" id="isFeatured" name="isFeatured" className="h-4 w-4 accent-[#3A5A78]" />
              <label htmlFor="isFeatured" className="font-sans text-xs text-[#6B6B6B]">
                Feature on homepage
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="isBridal" name="isBridal" className="h-4 w-4 accent-[#3A5A78]" />
              <label htmlFor="isBridal" className="font-sans text-xs text-[#6B6B6B]">
                Bridal collection
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="isLimitedEdition" name="isLimitedEdition" className="h-4 w-4 accent-[#3A5A78]" />
              <label htmlFor="isLimitedEdition" className="font-sans text-xs text-[#6B6B6B]">
                Limited edition
              </label>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <PhotoAwareSubmit variant="gold" size="lg">
            Create Product
          </PhotoAwareSubmit>
          <Button type="button" variant="ghost" size="lg" asChild>
            <Link href="/admin/products">Cancel</Link>
          </Button>
        </div>
      </form>
      </UploadGateProvider>
    </div>
  );
}
