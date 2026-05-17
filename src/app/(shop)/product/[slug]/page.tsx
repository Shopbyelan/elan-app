import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductDetail } from "@/components/products/ProductDetail";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  return prisma.product.findUnique({
    where: { slug, isActive: true },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      category: true,
      reviews: {
        where: { isVisible: true },
        include: { user: { select: { name: true, image: true } } },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      variants: true,
    },
  });
}

async function getRelatedProducts(categoryId: string, excludeId: string) {
  return prisma.product.findMany({
    where: { categoryId, isActive: true, id: { not: excludeId } },
    include: { images: true, category: true },
    take: 4,
  });
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProduct(slug);
    if (!product) return { title: "Product Not Found" };
    return {
      title: product.name,
      description: product.shortDesc || product.description.slice(0, 155),
      openGraph: {
        title: product.name,
        description: product.shortDesc || product.description.slice(0, 155),
        images: product.images[0]?.url ? [{ url: product.images[0].url }] : [],
      },
    };
  } catch {
    return { title: "Product" };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let product: any;
  try {
    product = await getProduct(slug);
  } catch {
    notFound();
  }

  if (!product) notFound();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let related: any[] = [];
  try {
    related = await getRelatedProducts(product.categoryId, product.id);
  } catch {
    // ignore
  }

  return <ProductDetail product={product} related={related} />;
}
