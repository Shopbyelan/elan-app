import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { PRODUCT_INCLUDE, type ProductWithRelations } from "@/lib/products";

const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "for", "to", "of", "in", "on", "with", "is",
  "are", "do", "you", "have", "has", "i", "im", "my", "me", "want", "looking",
  "need", "any", "some", "your", "please", "can", "could", "would", "like",
  "show", "see", "find", "give", "get", "what", "which", "how", "about",
  "gift", "gifts", "under", "over", "cheap", "cheapest", "expensive", "price",
  "prices", "buy", "shop", "shopping", "store", "sell", "sells", "selling",
]);

const TYPE_ALIASES: Record<string, string> = {
  ring: "ring", rings: "ring",
  necklace: "necklace", necklaces: "necklace", pendant: "necklace", pendants: "necklace",
  earring: "earrings", earrings: "earrings", stud: "earrings", studs: "earrings",
  bracelet: "bracelet", bracelets: "bracelet", bangle: "bracelet", bangles: "bracelet",
};

const MATERIAL_ALIASES = ["gold", "silver", "platinum", "moissanite", "diamond"];

function tokenize(message: string): string[] {
  return message
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length >= 3 && !STOPWORDS.has(word));
}

/**
 * One deterministic, keyword-based product search per chat turn — no tool-use
 * loop. Plain substring `contains` (as used elsewhere in src/lib/products.ts)
 * misses natural-language questions, so this maps recognizable nouns
 * (ring/necklace/material words) to structured filters before falling back
 * to a broad name/description keyword match.
 */
export async function findRelevantProducts(
  userMessage: string,
  opts: { take?: number } = {}
): Promise<ProductWithRelations[]> {
  const take = opts.take ?? 6;
  const tokens = tokenize(userMessage);
  if (tokens.length === 0) return [];

  const productTypes = [...new Set(tokens.map((t) => TYPE_ALIASES[t]).filter(Boolean))];

  // Any token may match a product's name, description, or (if it's a
  // recognized material word) its material field — broad recall by design.
  const keywordConditions: Prisma.ProductWhereInput[] = tokens.flatMap((word) => [
    { name: { contains: word, mode: "insensitive" as const } },
    { description: { contains: word, mode: "insensitive" as const } },
    ...(MATERIAL_ALIASES.includes(word)
      ? [{ material: { contains: word, mode: "insensitive" as const } }]
      : []),
  ]);

  if (productTypes.length === 0 && keywordConditions.length === 0) return [];

  try {
    return await prisma.product.findMany({
      where: {
        isActive: true,
        ...(productTypes.length > 0 ? { productType: { in: productTypes } } : {}),
        ...(keywordConditions.length > 0 ? { OR: keywordConditions } : {}),
      },
      include: PRODUCT_INCLUDE,
      orderBy: { createdAt: "desc" },
      take,
    });
  } catch {
    return [];
  }
}
