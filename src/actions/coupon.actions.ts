"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login");
}

export async function toggleCoupon(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const isActive = formData.get("isActive") === "true";
  await prisma.coupon.update({ where: { id }, data: { isActive } });
  revalidatePath("/admin/coupons");
}

export async function createCoupon(formData: FormData) {
  await requireAdmin();
  const code = (formData.get("code") as string).toUpperCase().trim();
  const discountType = formData.get("discountType") as string;
  const discountValue = parseFloat(formData.get("discountValue") as string);
  const minOrderAmount = formData.get("minOrderAmount") ? parseFloat(formData.get("minOrderAmount") as string) : null;
  const maxUses = formData.get("maxUses") ? parseInt(formData.get("maxUses") as string) : null;
  const expiresAt = formData.get("expiresAt") ? new Date(formData.get("expiresAt") as string) : null;
  const description = formData.get("description") as string;

  await prisma.coupon.create({
    data: { code, discountType, discountValue, minOrderAmount, maxUses, expiresAt, description },
  });

  revalidatePath("/admin/coupons");
  redirect("/admin/coupons");
}
