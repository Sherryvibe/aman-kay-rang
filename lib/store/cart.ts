import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  createCart,
  getCart,
  addToCart,
  updateCartLine,
  removeCartLine,
} from "@/lib/shopify/cart";
import type { NormalizedCart } from "@/lib/shopify/types";

export interface CartItem {
  id: string;             // Cart line ID (or fallback unique id)
  variantId?: string;     // Shopify variant GID
  slug: string;           // Product handle
  name: string;           // Product title
  price: number;
  size: string;           // Variant title / size
  quantity: number;
  image: string;
}

interface CartState {
  cartId: string | null;
  checkoutUrl: string | null;
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  isAdding: boolean;

  openCart: () => void;
  closeCart: () => void;
  initCart: () => Promise<void>;
  add: (item: {
    variantId?: string;
    slug: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    image: string;
  }) => Promise<void>;
  remove: (id: string) => Promise<void>;
  updateQty: (id: string, qty: number) => Promise<void>;
  getCheckoutUrl: () => Promise<string | null>;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartId: null,
      checkoutUrl: null,
      items: [],
      isOpen: false,
      isLoading: false,
      isAdding: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      /**
       * Retrieve or refresh fresh checkoutUrl directly from Shopify API.
       */
      getCheckoutUrl: async () => {
        const { checkoutUrl, cartId, items } = get();

        // 1. If checkoutUrl is present and valid, return it
        if (checkoutUrl && (checkoutUrl.startsWith("https://") || checkoutUrl.startsWith("http://"))) {
          return checkoutUrl;
        }

        // 2. Fetch fresh cart from Shopify using cartId
        if (cartId) {
          try {
            const cart = await getCart(cartId);
            if (cart?.checkoutUrl) {
              set({ checkoutUrl: cart.checkoutUrl });
              return cart.checkoutUrl;
            }
          } catch (err) {
            console.error("[CartStore] getCheckoutUrl fetch failed:", err);
          }
        }

        // 3. Fallback: if items with variantId exist, create cart line to get fresh checkoutUrl
        const targetItem = items.find((i) => i.variantId?.startsWith("gid://shopify/"));
        if (targetItem?.variantId) {
          try {
            const newCart = await createCart(targetItem.variantId, targetItem.quantity || 1);
            if (newCart?.checkoutUrl) {
              set({ cartId: newCart.id, checkoutUrl: newCart.checkoutUrl });
              return newCart.checkoutUrl;
            }
          } catch (err) {
            console.error("[CartStore] getCheckoutUrl createCart fallback failed:", err);
          }
        }

        return null;
      },

      /**
       * Initialize or rehydrate cart from Shopify API.
       */
      initCart: async () => {
        const { cartId } = get();
        if (!cartId) return;

        set({ isLoading: true });
        try {
          const cart = await getCart(cartId);
          if (cart) {
            const items: CartItem[] = cart.lines.map((l) => ({
              id: l.id,
              variantId: l.variantId,
              slug: l.productHandle,
              name: l.productTitle,
              price: l.price,
              size: l.variantTitle || "Standard",
              quantity: l.quantity,
              image: l.image,
            }));
            set({
              cartId: cart.id,
              checkoutUrl: cart.checkoutUrl,
              items,
              isLoading: false,
            });
          } else {
            // Cart expired or not found on Shopify — clear stale id
            set({ cartId: null, checkoutUrl: null, isLoading: false });
          }
        } catch (err) {
          console.error("[CartStore] initCart failed:", err);
          set({ isLoading: false });
        }
      },

      /**
       * Add item to Shopify cart (or local fallback if no variantId).
       */
      add: async (item) => {
        set({ isAdding: true, isOpen: true });
        const { cartId, items } = get();

        // 1. If variantId is present, sync with Shopify Storefront API
        if (item.variantId && item.variantId.startsWith("gid://shopify/")) {
          try {
            let updatedCart: NormalizedCart | null = null;
            if (cartId) {
              updatedCart = await addToCart(cartId, item.variantId, item.quantity);
            } else {
              updatedCart = await createCart(item.variantId, item.quantity);
            }

            if (updatedCart) {
              const newItems: CartItem[] = updatedCart.lines.map((l) => ({
                id: l.id,
                variantId: l.variantId,
                slug: l.productHandle,
                name: l.productTitle,
                price: l.price,
                size: l.variantTitle || item.size || "Standard",
                quantity: l.quantity,
                image: l.image || item.image,
              }));

              set({
                cartId: updatedCart.id,
                checkoutUrl: updatedCart.checkoutUrl,
                items: newItems,
                isAdding: false,
              });
              return;
            }
          } catch (err) {
            console.error("[CartStore] Shopify add to cart failed, using local fallback:", err);
          }
        }

        // 2. Local fallback add (for local demo items or offline state)
        const localId = `${item.slug}-${item.size.toLowerCase()}`;
        const existingIndex = items.findIndex((i) => i.slug === item.slug && i.size === item.size);

        if (existingIndex > -1) {
          const updated = [...items];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + item.quantity,
          };
          set({ items: updated, isAdding: false });
        } else {
          set({
            items: [
              ...items,
              {
                id: localId,
                variantId: item.variantId,
                slug: item.slug,
                name: item.name,
                price: item.price,
                size: item.size,
                quantity: item.quantity,
                image: item.image,
              },
            ],
            isAdding: false,
          });
        }
      },

      /**
       * Remove item from cart (Shopify API sync + local state update).
       */
      remove: async (id: string) => {
        const { cartId, items } = get();
        const targetItem = items.find((i) => i.id === id);

        // Optimistic local update
        set({ items: items.filter((i) => i.id !== id) });

        if (cartId && targetItem?.id.startsWith("gid://shopify/")) {
          try {
            const updated = await removeCartLine(cartId, id);
            if (updated) {
              const newItems: CartItem[] = updated.lines.map((l) => ({
                id: l.id,
                variantId: l.variantId,
                slug: l.productHandle,
                name: l.productTitle,
                price: l.price,
                size: l.variantTitle || "Standard",
                quantity: l.quantity,
                image: l.image,
              }));
              set({ items: newItems, checkoutUrl: updated.checkoutUrl });
            }
          } catch (err) {
            console.error("[CartStore] Shopify line remove failed:", err);
          }
        }
      },

      /**
       * Update item quantity in cart.
       */
      updateQty: async (id: string, qty: number) => {
        const newQty = Math.max(1, qty);
        const { cartId, items } = get();

        // Optimistic update
        set({
          items: items.map((i) => (i.id === id ? { ...i, quantity: newQty } : i)),
        });

        if (cartId && id.startsWith("gid://shopify/")) {
          try {
            const updated = await updateCartLine(cartId, id, newQty);
            if (updated) {
              const newItems: CartItem[] = updated.lines.map((l) => ({
                id: l.id,
                variantId: l.variantId,
                slug: l.productHandle,
                name: l.productTitle,
                price: l.price,
                size: l.variantTitle || "Standard",
                quantity: l.quantity,
                image: l.image,
              }));
              set({ items: newItems, checkoutUrl: updated.checkoutUrl });
            }
          } catch (err) {
            console.error("[CartStore] Shopify line update failed:", err);
          }
        }
      },

      clearCart: () => set({ items: [], cartId: null, checkoutUrl: null }),
    }),
    {
      name: "akr-shopify-cart",
      partialize: (state) => ({ cartId: state.cartId, items: state.items, checkoutUrl: state.checkoutUrl }),
    }
  )
);
