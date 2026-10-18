import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  toggleItem: (product: Product) => void;
}

const VISITOR_KEY = "elan-visitor-id";

/** Stable anonymous id so one visitor counts once per product in save stats. */
function getVisitorId(): string | null {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

/** Fire-and-forget: feeds the "saved N times this week" alert. */
function trackSave(productId: string, method: "POST" | "DELETE") {
  const visitorId = getVisitorId();
  if (!visitorId) return;
  fetch("/api/product-saves", {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, visitorId }),
    keepalive: true,
  }).catch(() => {});
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        if (!get().isWishlisted(product.id)) {
          set((state) => ({ items: [...state.items, product] }));
          trackSave(product.id, "POST");
        }
      },

      removeItem: (productId) => {
        if (get().isWishlisted(productId)) trackSave(productId, "DELETE");
        set((state) => ({
          items: state.items.filter((i) => i.id !== productId),
        }));
      },

      isWishlisted: (productId) => {
        return get().items.some((i) => i.id === productId);
      },

      toggleItem: (product) => {
        if (get().isWishlisted(product.id)) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },
    }),
    { name: "elan-wishlist" }
  )
);
