import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

export interface CartItem {
  product: Product;
  quantity: number;
  /** Ring size label, e.g. "US 6 / UK M½". The same ring in two sizes is two lines. */
  size?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number, size?: string) => void;
  removeItem: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

const sameLine = (item: CartItem, productId: string, size?: string) =>
  item.product.id === productId && (item.size ?? null) === (size ?? null);

/** Stable React key for a cart line. */
export const cartLineKey = (item: CartItem) => `${item.product.id}:${item.size ?? ""}`;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, size) => {
        set((state) => {
          const existing = state.items.find((i) => sameLine(i, product.id, size));
          if (existing) {
            return {
              items: state.items.map((i) =>
                sameLine(i, product.id, size)
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity, ...(size ? { size } : {}) }] };
        });
      },

      removeItem: (productId, size) => {
        set((state) => ({
          items: state.items.filter((i) => !sameLine(i, productId, size)),
        }));
      },

      updateQuantity: (productId, quantity, size) => {
        if (quantity < 1) {
          get().removeItem(productId, size);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            sameLine(i, productId, size) ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    { name: "elan-cart" }
  )
);
