"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login");
}

export async function createCategory(formData: FormData) {
  await requireAdmin();
  const name = (formData.get("name") as string).trim();
  const description = formData.get("description") as string;
  const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  await prisma.category.create({
    data: { name, slug, description: description || null },
  });

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
}

export async function seedDefaultCategories() {
  await requireAdmin();

  const defaults = [
    { name: "18k Gold", slug: "18k-gold", description: "75% pure gold pieces hallmarked 750.", sortOrder: 0 },
    { name: "Sterling Silver", slug: "sterling-silver", description: "Sterling silver 925 with rhodium plating.", sortOrder: 1 },
    { name: "Cultivated Diamond", slug: "cultivated-diamond", description: "Lab-grown diamonds with the same fire as mined stones.", sortOrder: 2 },
    { name: "Platinum", slug: "platinum", description: "Platinum 950 — the ultimate expression of purity.", sortOrder: 3 },
    { name: "Crystal Moissanite", slug: "crystal-moissanite", description: "DEF colour crystal moissanite in white gold halo settings.", sortOrder: 4 },
  ];

  const existing = await prisma.category.findMany({ select: { slug: true } });
  const existingSlugs = new Set(existing.map((c) => c.slug));
  const toCreate = defaults.filter((d) => !existingSlugs.has(d.slug));

  if (toCreate.length > 0) {
    await prisma.category.createMany({ data: toCreate });
  }

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  redirect("/admin/categories");
}
