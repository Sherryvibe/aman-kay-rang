// ─── Shopify Cart Service ───────────────────────────────────────────────────
// Direct GraphQL integration with Shopify Storefront API Cart object.

import { shopifyFetch } from "./client";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_QUERY,
} from "./queries";
import type {
  ShopifyCart,
  ShopifyCartLine,
  NormalizedCart,
  NormalizedCartLine,
} from "./types";

function parseMoney(amount: string | null | undefined): number {
  if (!amount) return 0;
  return parseFloat(amount);
}

function normalizeCartLine(line: ShopifyCartLine): NormalizedCartLine {
  const merchandise = line.merchandise;
  const product = merchandise.product;
  const image = merchandise.image?.url || product.featuredImage?.url || "";

  return {
    id: line.id,
    variantId: merchandise.id,
    productHandle: product.handle,
    productTitle: product.title,
    variantTitle: merchandise.title !== "Default Title" ? merchandise.title : "",
    image,
    price: parseMoney(merchandise.price.amount),
    quantity: line.quantity,
    totalPrice: parseMoney(line.cost.totalAmount.amount),
    options: merchandise.selectedOptions,
  };
}

/**
 * Normalize a ShopifyCart API response into a clean NormalizedCart interface.
 */
export function normalizeCart(cart: ShopifyCart): NormalizedCart {
  const lines = cart.lines.edges.map((e) => normalizeCartLine(e.node));

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    subtotal: parseMoney(cart.cost.subtotalAmount.amount),
    total: parseMoney(cart.cost.totalAmount.amount),
    currencyCode: cart.cost.totalAmount.currencyCode,
    lines,
  };
}

/**
 * Create a new Shopify cart. Optionally pass an initial variant line item.
 */
export async function createCart(variantId?: string, quantity: number = 1): Promise<NormalizedCart | null> {
  try {
    const lines = variantId ? [{ merchandiseId: variantId, quantity }] : [];
    const data = await shopifyFetch<{
      cartCreate: {
        cart: ShopifyCart | null;
        userErrors: { field: string; message: string }[];
      };
    }>({
      query: CART_CREATE_MUTATION,
      variables: { input: { lines } },
    });

    if (data.cartCreate.userErrors.length > 0) {
      console.error("[Shopify Cart] Create errors:", data.cartCreate.userErrors);
      return null;
    }

    if (!data.cartCreate.cart) return null;
    return normalizeCart(data.cartCreate.cart);
  } catch (error) {
    console.error("[Shopify Cart] Failed to create cart:", error);
    return null;
  }
}

/**
 * Fetch existing cart by cart ID.
 */
export async function getCart(cartId: string): Promise<NormalizedCart | null> {
  try {
    const data = await shopifyFetch<{
      cart: ShopifyCart | null;
    }>({
      query: CART_QUERY,
      variables: { cartId },
    });

    if (!data.cart) return null;
    return normalizeCart(data.cart);
  } catch (error) {
    console.error(`[Shopify Cart] Failed to fetch cart "${cartId}":`, error);
    return null;
  }
}

/**
 * Add items (variant ID & quantity) to an existing Shopify cart.
 */
export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number = 1
): Promise<NormalizedCart | null> {
  try {
    const data = await shopifyFetch<{
      cartLinesAdd: {
        cart: ShopifyCart | null;
        userErrors: { field: string; message: string }[];
      };
    }>({
      query: CART_LINES_ADD_MUTATION,
      variables: {
        cartId,
        lines: [{ merchandiseId: variantId, quantity }],
      },
    });

    if (data.cartLinesAdd.userErrors.length > 0) {
      console.error("[Shopify Cart] Add line errors:", data.cartLinesAdd.userErrors);
      return null;
    }

    if (!data.cartLinesAdd.cart) return null;
    return normalizeCart(data.cartLinesAdd.cart);
  } catch (error) {
    console.error(`[Shopify Cart] Failed to add item to cart "${cartId}":`, error);
    return null;
  }
}

/**
 * Update quantity of a line item in Shopify cart.
 */
export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<NormalizedCart | null> {
  try {
    const data = await shopifyFetch<{
      cartLinesUpdate: {
        cart: ShopifyCart | null;
        userErrors: { field: string; message: string }[];
      };
    }>({
      query: CART_LINES_UPDATE_MUTATION,
      variables: {
        cartId,
        lines: [{ id: lineId, quantity }],
      },
    });

    if (data.cartLinesUpdate.userErrors.length > 0) {
      console.error("[Shopify Cart] Update line errors:", data.cartLinesUpdate.userErrors);
      return null;
    }

    if (!data.cartLinesUpdate.cart) return null;
    return normalizeCart(data.cartLinesUpdate.cart);
  } catch (error) {
    console.error(`[Shopify Cart] Failed to update line "${lineId}":`, error);
    return null;
  }
}

/**
 * Remove line item from Shopify cart.
 */
export async function removeCartLine(
  cartId: string,
  lineId: string
): Promise<NormalizedCart | null> {
  try {
    const data = await shopifyFetch<{
      cartLinesRemove: {
        cart: ShopifyCart | null;
        userErrors: { field: string; message: string }[];
      };
    }>({
      query: CART_LINES_REMOVE_MUTATION,
      variables: {
        cartId,
        lineIds: [lineId],
      },
    });

    if (data.cartLinesRemove.userErrors.length > 0) {
      console.error("[Shopify Cart] Remove line errors:", data.cartLinesRemove.userErrors);
      return null;
    }

    if (!data.cartLinesRemove.cart) return null;
    return normalizeCart(data.cartLinesRemove.cart);
  } catch (error) {
    console.error(`[Shopify Cart] Failed to remove line "${lineId}":`, error);
    return null;
  }
}
