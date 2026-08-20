import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

const PRODUCT_INCLUDE = { images: true, categories: true } satisfies Prisma.ProductInclude;

export type ProductWithRelations = Prisma.ProductGetPayload<{ include: typeof PRODUCT_INCLUDE }>;

interface CollectionOpts {
  take?: number;
  search?: string;
}

function searchFilter(search?: string): Prisma.ProductWhereInput {
  return search
    ? {
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }
    : {};
}

async function getProductsByFilter(
  where: Prisma.ProductWhereInput,
  opts: CollectionOpts = {}
): Promise<ProductWithRelations[]> {
  try {
    return await prisma.product.findMany({
      where: { isActive: true, ...where, ...searchFilter(opts.search) },
      include: PRODUCT_INCLUDE,
      orderBy: { createdAt: "desc" },
      take: opts.take,
    });
  } catch {
    return [];
  }
}

export const getFeaturedProducts = (opts?: CollectionOpts) =>
  getProductsByFilter({ isFeatured: true }, opts);
export const getNewArrivals = (opts?: CollectionOpts) => getProductsByFilter({}, opts);
export const getBridalProducts = (opts?: CollectionOpts) =>
  getProductsByFilter({ isBridal: true }, opts);
export const getLimitedEditionProducts = (opts?: CollectionOpts) =>
  getProductsByFilter({ isLimitedEdition: true }, opts);
export const getGiftsUnder200k = (opts?: CollectionOpts) =>
  getProductsByFilter({ price: { lte: 200000 } }, opts);
export const getMoissaniteProducts = (opts?: CollectionOpts) =>
  getProductsByFilter({ categories: { some: { slug: "crystal-moissanite" } } }, opts);
export const getProductsByType = (
  type: "necklace" | "earrings" | "ring" | "bracelet",
  opts?: CollectionOpts
) => getProductsByFilter({ productType: type }, opts);

/** Best Sellers is ranked by units sold, not a simple where-clause. */
export async function getBestSellers(opts: CollectionOpts = {}): Promise<ProductWithRelations[]> {
  try {
    const topSellers = await prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: opts.take ?? 24,
    });
    const ids = topSellers.map((t) => t.productId);
    if (ids.length === 0) return [];

    const products = await prisma.product.findMany({
      where: { id: { in: ids }, isActive: true, ...searchFilter(opts.search) },
      include: PRODUCT_INCLUDE,
    });
    const rank = new Map(ids.map((id, i) => [id, i]));
    return products.sort((a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0));
  } catch {
    return [];
  }
}

const PER_SECTION = 8;

/**
 * The Supabase connection string this app uses is capped at `connection_limit=1`,
 * so N separate queries always run one-at-a-time no matter how they're issued —
 * `Promise.all()` of 11 collection queries previously took 30+ seconds. Instead,
 * fetch the active catalog once and partition it in memory; only Best Sellers
 * needs a second round-trip (order history isn't on the Product record).
 */
export async function getHomepageCollections() {
  let allActive: ProductWithRelations[] = [];
  try {
    allActive = await prisma.product.findMany({
      where: { isActive: true },
      include: PRODUCT_INCLUDE,
      orderBy: { createdAt: "desc" },
    });
  } catch {
    allActive = [];
  }

  const byId = new Map(allActive.map((p) => [p.id, p]));
  const take = <T,>(arr: T[]) => arr.slice(0, PER_SECTION);

  let bestSellers: ProductWithRelations[] = [];
  try {
    const topSellers = await prisma.orderItem.groupBy({
      by: ["productId"],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 24,
    });
    bestSellers = take(
      topSellers.map((t) => byId.get(t.productId)).filter((p): p is ProductWithRelations => !!p)
    );
  } catch {
    bestSellers = [];
  }

  return {
    featured: take(allActive.filter((p) => p.isFeatured)),
    newArrivals: take(allActive),
    bestSellers,
    necklaces: take(allActive.filter((p) => p.productType === "necklace")),
    earrings: take(allActive.filter((p) => p.productType === "earrings")),
    rings: take(allActive.filter((p) => p.productType === "ring")),
    bracelets: take(allActive.filter((p) => p.productType === "bracelet")),
    moissanite: take(allActive.filter((p) => p.categories.some((c) => c.slug === "crystal-moissanite"))),
    gifts: take(allActive.filter((p) => p.price <= 200000)),
    bridal: take(allActive.filter((p) => p.isBridal)),
    limitedEdition: take(allActive.filter((p) => p.isLimitedEdition)),
  };
}
