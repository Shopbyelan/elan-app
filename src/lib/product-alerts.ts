/**
 * Urgency/social-proof alerts shown on products. Every alert is derived from
 * real data and only appears when it's actually true — never invented.
 */

/** Stock at or below this shows "Only N left in stock". */
export const LOW_STOCK_THRESHOLD = 3;
/** Weekly saves must reach this before the count is worth showing. */
export const SAVED_THIS_WEEK_MIN = 3;

export type StockAlert =
  | { kind: "last-at-price" }
  | { kind: "low-stock"; remaining: number }
  | null;

interface StockFields {
  stock: number;
  price: number;
  comparePrice: number | null;
}

/**
 * "Last one at this price" only applies to a single remaining unit that is
 * currently marked down — it supersedes "Only 1 left", so the two never stack.
 */
export function getStockAlert({ stock, price, comparePrice }: StockFields): StockAlert {
  if (stock <= 0) return null;
  const onSale = comparePrice != null && comparePrice > price;
  if (stock === 1 && onSale) return { kind: "last-at-price" };
  if (stock <= LOW_STOCK_THRESHOLD) return { kind: "low-stock", remaining: stock };
  return null;
}

export function stockAlertText(alert: NonNullable<StockAlert>): string {
  return alert.kind === "last-at-price"
    ? "Last one at this price"
    : `Only ${alert.remaining} left in stock`;
}
