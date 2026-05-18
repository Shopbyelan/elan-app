import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createCategory, deleteCategory, seedDefaultCategories } from "@/actions/category.actions";

async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { products: true } } },
    });
  } catch {
    return [];
  }
}

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-white">Categories</h1>
          <p className="font-sans text-sm text-[#5A5A5A] mt-1">{categories.length} collections</p>
        </div>
        {categories.length === 0 && (
          <form action={seedDefaultCategories}>
            <Button type="submit" variant="gold">
              Seed Default Collections
            </Button>
          </form>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create form */}
        <div className="bg-[#111] border border-[#1A1A1A] p-6">
          <h2 className="font-serif text-lg text-white mb-5">New Category</h2>
          <form action={createCategory} className="space-y-4">
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">
                Name *
              </label>
              <input
                name="name"
                required
                className="w-full h-11 px-4 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors"
                placeholder="18k Gold"
              />
            </div>
            <div>
              <label className="block font-sans text-[10px] tracking-[0.2em] text-[#9A9A9A] uppercase mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                className="w-full px-4 py-3 bg-[#141414] border border-[#2A2A2A] text-[#E8E8E8] font-sans text-sm focus:outline-none focus:border-[#85A0B5] transition-colors resize-none"
                placeholder="Fine 18k gold jewellery pieces..."
              />
            </div>
            <Button type="submit" variant="gold" size="md">
              <Plus className="h-4 w-4" /> Create Category
            </Button>
          </form>
        </div>

        {/* Category list */}
        <div className="bg-[#111] border border-[#1A1A1A] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1A1A1A]">
            <h2 className="font-serif text-lg text-white">Existing Categories</h2>
          </div>
          {categories.length === 0 ? (
            <p className="px-5 py-10 text-center font-sans text-sm text-[#5A5A5A]">
              No categories yet. Create your first one.
            </p>
          ) : (
            <ul className="divide-y divide-[#141414]">
              {categories.map((cat) => (
                <li key={cat.id} className="flex items-center justify-between px-5 py-4 hover:bg-[#141414] transition-colors group">
                  <div>
                    <p className="font-sans text-sm text-white">{cat.name}</p>
                    <p className="font-sans text-[10px] text-[#5A5A5A] mt-0.5">
                      /{cat.slug} · {cat._count.products} products
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/shop?category=${cat.slug}`}
                      className="font-sans text-[10px] tracking-wider uppercase text-[#5A5A5A] hover:text-[#85A0B5] transition-colors"
                    >
                      View
                    </Link>
                    <form action={deleteCategory}>
                      <input type="hidden" name="id" value={cat.id} />
                      <button
                        type="submit"
                        disabled={cat._count.products > 0}
                        className="text-[#3A3A3A] hover:text-red-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        title={cat._count.products > 0 ? "Cannot delete — has products" : "Delete"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
