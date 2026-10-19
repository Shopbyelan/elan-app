/** International ring size chart — shared by the product size picker and the Client Guide. */
export const RING_SIZES = [
  { mm: "14.9mm", uk: "F", us: "3" },
  { mm: "15.3mm", uk: "G½", us: "3½" },
  { mm: "15.7mm", uk: "H½", us: "4" },
  { mm: "16.1mm", uk: "J", us: "4½" },
  { mm: "16.5mm", uk: "K½", us: "5" },
  { mm: "16.9mm", uk: "L½", us: "5½" },
  { mm: "17.3mm", uk: "M½", us: "6" },
  { mm: "17.7mm", uk: "N½", us: "6½" },
  { mm: "18.2mm", uk: "P", us: "7" },
  { mm: "18.6mm", uk: "Q", us: "7½" },
  { mm: "19.0mm", uk: "R", us: "8" },
  { mm: "19.4mm", uk: "S", us: "8½" },
  { mm: "19.8mm", uk: "T", us: "9" },
  { mm: "20.2mm", uk: "U", us: "9½" },
  { mm: "20.6mm", uk: "V", us: "10" },
] as const;

export type RingSize = (typeof RING_SIZES)[number];

/** The label stored on cart lines and orders, e.g. "US 6 / UK M½". */
export function ringSizeLabel(size: RingSize): string {
  return `US ${size.us} / UK ${size.uk}`;
}

export function needsRingSize(product: { productType?: string | null }): boolean {
  return product.productType === "ring";
}

/** Sizes offered for a ring, as ticked in the admin. None ticked means the full chart. */
export function availableRingSizes(product: { ringSizes?: string[] | null }): readonly RingSize[] {
  const picked = product.ringSizes ?? [];
  if (picked.length === 0) return RING_SIZES;
  return RING_SIZES.filter((s) => picked.includes(s.us));
}
