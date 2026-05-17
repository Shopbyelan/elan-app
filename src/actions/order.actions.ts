"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login");
}

export async function updateOrderStatus(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  const trackingNumber = formData.get("trackingNumber") as string | null;
  const notes = formData.get("notes") as string | null;

  await prisma.order.update({
    where: { id },
    data: {
      status: status as never,
      ...(trackingNumber !== null && { trackingNumber: trackingNumber || null }),
      ...(notes !== null && { notes: notes || null }),
    },
  });

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
}
