import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NormalizedProduct } from "@/lib/shopify/types";

interface WishlistState {
  items: NormalizedProduct[];
  isOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggle: (product: NormalizedProduct) => void;
  has: (slug: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      openWishlist: () => set({ isOpen: true }),
      closeWishlist: () => set({ isOpen: false }),
      toggle: (product) =>
        set((s) => {
          const exists = s.items.some((i) => i.slug === product.slug);
          if (exists) {
            return { items: s.items.filter((i) => i.slug !== product.slug) };
          } else {
            return { items: [...s.items, product] };
          }
        }),
      has: (slug) => get().items.some((i) => i.slug === slug),
    }),
    { name: "akr-wishlist" }
  )
);
