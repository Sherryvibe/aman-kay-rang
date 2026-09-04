// ─── Shopify Collections Service ─────────────────────────────────────────────
// Fetches collections ONLY from Shopify Storefront API and normalizes them for Aman Kay Rang.
// NO FALLBACK TO MOCK/LOCAL DATA — Shopify is the 100% Single Source of Truth.

import { shopifyFetch } from "./client";
import { COLLECTIONS_QUERY, COLLECTION_BY_HANDLE_QUERY } from "./queries";
import { normalizeProduct } from "./products";
import type {
  ShopifyCollection,
  NormalizedCollection,
  ShopifyProduct,
} from "./types";
import type { FetchResult } from "./products";

export function normalizeCollection(
  col: ShopifyCollection,
  featuredHandles: string[] = []
): NormalizedCollection {
  return {
    slug: col.handle,
    name: col.title,
    description: col.description || "",
    image: col.image?.url || "",
    featured: featuredHandles.includes(col.handle),
    products: col.products?.edges.map((e) => normalizeProduct(e.node)) || [],
  };
}

/**
 * Fetch all collections directly from Shopify.
 * Does NOT fall back to local mock data.
 */
export async function getAllCollections(): Promise<FetchResult<NormalizedCollection[]>> {
  try {
    const res = await shopifyFetch<{
      collections: { edges: { node: ShopifyCollection }[] };
    }>({
      query: COLLECTIONS_QUERY,
      variables: { first: 100 },
    });

    // Ignore default Shopify "frontpage" collection if other collections exist
    const validEdges = res.collections.edges.filter(
      (e) => e.node.handle !== "frontpage" || res.collections.edges.length === 1
    );

    const collections = validEdges.map((e, index) =>
      normalizeCollection(e.node, index < 2 ? [e.node.handle] : [])
    );

    return { data: collections, error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load collections from Shopify.";
    if (process.env.NODE_ENV === "development") {
      console.error("[Shopify API Failure] getAllCollections:", error);
    }
    return { data: [], error: message };
  }
}

/**
 * Fetch a single collection by handle directly from Shopify with its products.
 */
export async function getCollectionByHandle(
  handle: string
): Promise<FetchResult<NormalizedCollection | null>> {
  try {
    const res = await shopifyFetch<{
      collectionByHandle: (ShopifyCollection & {
        products: { edges: { node: ShopifyProduct }[] };
      }) | null;
    }>({
      query: COLLECTION_BY_HANDLE_QUERY,
      variables: { handle, productsFirst: 100 },
    });

    if (!res.collectionByHandle) {
      return { data: null, error: null };
    }
    return { data: normalizeCollection(res.collectionByHandle), error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load collection from Shopify.";
    if (process.env.NODE_ENV === "development") {
      console.error(`[Shopify API Failure] getCollectionByHandle("${handle}"):`, error);
    }
    return { data: null, error: message };
  }
}
