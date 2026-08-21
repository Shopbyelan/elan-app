"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { slugify } from "@/lib/utils";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login");
  }
}

/**
 * /home and /product/[slug] are statically rendered (no `revalidate`, no
 * dynamic API usage) so they only refresh via an explicit revalidation —
 * every mutation that changes what a product looks like on the storefront
 * must call this, or the change can sit stale indefinitely.
 */
function revalidateStorefront(slug?: string) {
  revalidatePath("/home");
  revalidatePath("/shop");
  if (slug) revalidatePath(`/product/${slug}`);
}

export async function toggleProductActive(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const isActive = formData.get("isActive") === "true";

  const updated = await prisma.product.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/products");
  revalidateStorefront(updated.slug);
}

export async function createProduct(formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const categoryIds = formData.getAll("categoryIds") as string[];
  const price = parseFloat(formData.get("price") as string);
  const comparePrice = formData.get("comparePrice") ? parseFloat(formData.get("comparePrice") as string) : null;
  const description = formData.get("description") as string;
  const shortDesc = formData.get("shortDesc") as string;
  const stock = parseInt(formData.get("stock") as string) || 0;
  const sku = formData.get("sku") as string;
  const material = formData.get("material") as string;
  const isFeatured = formData.get("isFeatured") === "on";
  const badge = formData.get("badge") as string;
  const productType = formData.get("productType") as string;
  const isBridal = formData.get("isBridal") === "on";
  const isLimitedEdition = formData.get("isLimitedEdition") === "on";

  let slug = slugify(name);
  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  const imageUrls = formData.getAll("imageUrls") as string[];
  const imagePublicIds = formData.getAll("imagePublicIds") as string[];
  const imagePrimary = formData.getAll("imagePrimary") as string[];

  const product = await prisma.product.create({
    data: {
      name, slug, price, comparePrice, description,
      shortDesc, stock, sku: sku || null, material: material || null,
      isFeatured, badge: badge || null,
      productType: productType || null, isBridal, isLimitedEdition,
      categories: { connect: categoryIds.map((id) => ({ id })) },
      images: {
        create: imageUrls.map((url, i) => ({
          url,
          publicId: imagePublicIds[i] || null,
          isPrimary: imagePrimary[i] === "true",
          sortOrder: i,
        })),
      },
    },
  });

  revalidatePath("/admin/products");
  revalidateStorefront(product.slug);
  redirect("/admin/products");
}

export async function updateProduct(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;

  const name = formData.get("name") as string;
  const categoryIds = formData.getAll("categoryIds") as string[];
  const price = parseFloat(formData.get("price") as string);
  const comparePrice = formData.get("comparePrice") ? parseFloat(formData.get("comparePrice") as string) : null;
  const description = formData.get("description") as string;
  const shortDesc = formData.get("shortDesc") as string;
  const stock = parseInt(formData.get("stock") as string) || 0;
  const material = formData.get("material") as string;
  const isFeatured = formData.get("isFeatured") === "on";
  const badge = formData.get("badge") as string;
  const productType = formData.get("productType") as string;
  const isBridal = formData.get("isBridal") === "on";
  const isLimitedEdition = formData.get("isLimitedEdition") === "on";

  await prisma.product.update({
    where: { id },
    data: {
      name, price, comparePrice, description,
      shortDesc, stock, material: material || null,
      isFeatured, badge: badge || null,
      productType: productType || null, isBridal, isLimitedEdition,
      categories: { set: categoryIds.map((id) => ({ id })) },
    },
  });

  const updated = await prisma.product.findUnique({ where: { id }, select: { slug: true } });
  revalidatePath("/admin/products");
  revalidateStorefront(updated?.slug);
  redirect("/admin/products");
}

export async function addProductImages(formData: FormData) {
  await requireAdmin();
  const productId = formData.get("id") as string;

  const imageUrls = formData.getAll("imageUrls") as string[];
  const imagePublicIds = formData.getAll("imagePublicIds") as string[];
  const imagePrimary = formData.getAll("imagePrimary") as string[];

  if (imageUrls.length === 0) return;

  const existingCount = await prisma.productImage.count({ where: { productId } });

  await prisma.product.update({
    where: { id: productId },
    data: {
      images: {
        create: imageUrls.map((url, i) => ({
          url,
          publicId: imagePublicIds[i] || null,
          isPrimary: imagePrimary[i] === "true",
          sortOrder: existingCount + i,
        })),
      },
    },
  });

  const product = await prisma.product.findUnique({ where: { id: productId }, select: { slug: true } });
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}/edit`);
  revalidateStorefront(product?.slug);
  redirect(`/admin/products/${productId}/edit`);
}

export async function deleteProductImage(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const productId = formData.get("productId") as string;

  const image = await prisma.productImage.findUnique({ where: { id } });
  if (!image) return;

  if (image.publicId) {
    const { deleteImage } = await import("@/lib/cloudinary");
    await deleteImage(image.publicId).catch(() => {});
  }

  await prisma.productImage.delete({ where: { id } });

  // if deleted image was primary, promote the next one
  const remaining = await prisma.productImage.findFirst({ where: { productId } });
  if (remaining) {
    await prisma.productImage.update({ where: { id: remaining.id }, data: { isPrimary: true } });
  }

  const product = await prisma.product.findUnique({ where: { id: productId }, select: { slug: true } });
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}/edit`);
  revalidateStorefront(product?.slug);
}

export async function hardDeleteProduct(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;

  // Products with orders can only be hidden, not deleted
  const orderCount = await prisma.orderItem.count({ where: { productId: id } });
  if (orderCount > 0) {
    const hidden = await prisma.product.update({ where: { id }, data: { isActive: false } });
    revalidatePath("/admin/products");
    revalidateStorefront(hidden.slug);
    return;
  }

  // Delete images from Cloudinary first
  const images = await prisma.productImage.findMany({ where: { productId: id } });
  const { deleteImage } = await import("@/lib/cloudinary");
  for (const img of images) {
    if (img.publicId) await deleteImage(img.publicId).catch(() => {});
  }

  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
  revalidateStorefront();
  redirect("/admin/products");
}
