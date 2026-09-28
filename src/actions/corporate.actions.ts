"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { INQUIRY_STATUSES } from "@/lib/corporate";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/login");
}

export async function updateCorporateInquiry(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  const adminNotes = formData.get("adminNotes") as string | null;

  if (!INQUIRY_STATUSES.includes(status as (typeof INQUIRY_STATUSES)[number])) return;

  await prisma.corporateInquiry.update({
    where: { id },
    data: {
      status: status as (typeof INQUIRY_STATUSES)[number],
      ...(adminNotes !== null && { adminNotes: adminNotes || null }),
    },
  });

  revalidatePath("/admin/corporate");
  revalidatePath(`/admin/corporate/${id}`);
}
