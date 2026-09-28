import { z } from "zod";

/** Smallest total piece count we treat as a bulk / corporate request. */
export const MIN_BULK_QUANTITY = 10;
export const MAX_BULK_QUANTITY = 10000;

export const OCCASIONS = [
  "Employee Recognition",
  "Client Appreciation",
  "Corporate Event / Launch",
  "End-of-Year Gifting",
  "Wedding Party / Bridal Gifts",
  "Milestone Celebration",
  "Other",
] as const;

export const BUDGET_RANGES = [
  "Under ₦100,000",
  "₦100,000 – ₦250,000",
  "₦250,000 – ₦500,000",
  "₦500,000 – ₦1,000,000",
  "Above ₦1,000,000",
  "Flexible",
] as const;

export const INQUIRY_STATUSES = ["NEW", "CONTACTED", "QUOTED", "CONFIRMED", "CLOSED"] as const;

export const INQUIRY_STATUS_COLORS: Record<string, string> = {
  NEW: "text-amber-400 bg-amber-400/10 border-amber-800/30",
  CONTACTED: "text-blue-400 bg-blue-400/10 border-blue-800/30",
  QUOTED: "text-purple-400 bg-purple-400/10 border-purple-800/30",
  CONFIRMED: "text-emerald-400 bg-emerald-400/10 border-emerald-800/30",
  CLOSED: "text-[#6B6B6B] bg-[#F7F5F2] border-[#E4E1DA]",
};

const optionalText = (max: number) =>
  z.string().trim().max(max).optional().transform((v) => v || undefined);

export const corporateInquirySchema = z
  .object({
    companyName: z.string().trim().min(2, "Company name is required").max(120),
    contactName: z.string().trim().min(2, "Your name is required").max(120),
    email: z.string().trim().email("Enter a valid email"),
    phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
    jobTitle: optionalText(120),
    occasion: z.enum(OCCASIONS, { message: "Select an occasion" }),
    totalQuantity: z.coerce
      .number()
      .int()
      .min(MIN_BULK_QUANTITY, `Bulk requests start at ${MIN_BULK_QUANTITY} pieces`)
      .max(MAX_BULK_QUANTITY),
    budgetPerPiece: z.enum(BUDGET_RANGES).optional(),
    deliveryDate: optionalText(10).refine(
      (v) => !v || !Number.isNaN(Date.parse(v)),
      "Enter a valid date",
    ),
    deliveryCity: optionalText(120),
    engraving: z.boolean().default(false),
    brandedPackaging: z.boolean().default(false),
    message: optionalText(2000),
    items: z
      .array(
        z.object({
          productId: z.string().min(1),
          quantity: z.coerce.number().int().min(1).max(MAX_BULK_QUANTITY),
        }),
      )
      .max(30)
      .default([]),
  })
  .refine(
    (d) => d.items.reduce((sum, i) => sum + i.quantity, 0) <= d.totalQuantity,
    { message: "Selected piece quantities exceed the total quantity", path: ["totalQuantity"] },
  );

export type CorporateInquiryInput = z.input<typeof corporateInquirySchema>;

export function generateInquiryReference(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ELC-${timestamp}-${random}`;
}
