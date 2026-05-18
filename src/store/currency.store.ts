import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Currency = "NGN" | "USD";

// Approximate exchange rate — update periodically
export const NGN_PER_USD = 1400;

interface CurrencyStore {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  convert: (amountNGN: number) => number;
  format: (amountNGN: number) => string;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set, get) => ({
      currency: "NGN",
      setCurrency: (currency) => set({ currency }),
      convert: (amountNGN) => {
        const { currency } = get();
        return currency === "USD" ? amountNGN / NGN_PER_USD : amountNGN;
      },
      format: (amountNGN) => {
        const { currency } = get();
        const amount = currency === "USD" ? amountNGN / NGN_PER_USD : amountNGN;
        return new Intl.NumberFormat(currency === "USD" ? "en-US" : "en-NG", {
          style: "currency",
          currency,
          minimumFractionDigits: currency === "USD" ? 2 : 0,
          maximumFractionDigits: currency === "USD" ? 2 : 0,
        }).format(amount);
      },
    }),
    { name: "elan-currency" }
  )
);
