// ─── Shopify Product Service ─────────────────────────────────────────────────
// Fetches products ONLY from Shopify Storefront API and normalizes them to the Aman Kay Rang format.
// NO FALLBACK TO MOCK/LOCAL DATA — Shopify is the 100% Single Source of Truth.

import { shopifyFetch } from "./client";
import {
  PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCTS_BY_TYPE_QUERY,
  SEARCH_PRODUCTS_QUERY,
} from "./queries";
import type {
  ShopifyProduct,
  NormalizedProduct,
  NormalizedVariant,
} from "./types";

// ── Normalization helpers ────────────────────────────────────────────────────

function parseMoney(money: { amount: string } | null | undefined): number {
  if (!money) return 0;
  return parseFloat(money.amount);
}

function extractSizes(product: ShopifyProduct): string[] {
  const sizes = new Set<string>();
  for (const { node: variant } of product.variants.edges) {
    for (const opt of variant.selectedOptions) {
      if (opt.name.toLowerCase() === "size") {
        sizes.add(opt.value);
      }
    }
  }
  return Array.from(sizes);
}

function extractColors(product: ShopifyProduct): { name: string; hex: string }[] {
  const colors = new Map<string, string>();
  for (const { node: variant } of product.variants.edges) {
    for (const opt of variant.selectedOptions) {
      if (opt.name.toLowerCase() === "color" || opt.name.toLowerCase() === "colour") {
        if (!colors.has(opt.value)) {
          colors.set(opt.value, "#999999");
        }
      }
    }
  }
  return Array.from(colors.entries()).map(([name, hex]) => ({ name, hex }));
}

function detectBadge(product: ShopifyProduct): "New" | "Bestseller" | "Limited" | undefined {
  const tags = product.tags.map((t) => t.toLowerCase());
  if (tags.includes("new")) return "New";
  if (tags.includes("bestseller")) return "Bestseller";
  if (tags.includes("limited")) return "Limited";
  return undefined;
}

function normalizeVariant(variant: ShopifyProduct["variants"]["edges"][0]["node"]): NormalizedVariant {
  return {
    id: variant.id,
    title: variant.title,
    available: variant.availableForSale,
    price: parseMoney(variant.price),
    compareAtPrice: variant.compareAtPrice ? parseMoney(variant.compareAtPrice) : undefined,
    options: variant.selectedOptions,
    image: variant.image
      ? { url: variant.image.url, altText: variant.image.altText || "" }
      : undefined,
  };
}

export function normalizeProduct(product: ShopifyProduct): NormalizedProduct {
  const images = product.images.edges.map((e) => ({
    url: e.node.url,
    altText: e.node.altText || product.title,
  }));

  const mainImage = images[0]?.url || "";
  const altImage = images[1]?.url || mainImage;

  const firstCollection = product.collections.edges[0]?.node;
  const collectionsList = product.collections?.edges?.map((e) => ({
    title: e.node.title,
    handle: e.node.handle,
  })) || [];
  const collectionHandles = collectionsList.map((c) => c.handle.toLowerCase());

  const sizes = extractSizes(product);
  const colors = extractColors(product);
  const variants = product.variants.edges.map((e) => normalizeVariant(e.node));

  const category = firstCollection?.handle || product.productType.toLowerCase().replace(/\s+/g, "-") || "uncategorized";
  const categoryTitle = firstCollection?.title || product.productType || "Uncategorized";

  return {
    slug: product.handle,
    name: product.title,
    price: parseMoney(product.priceRange.minVariantPrice),
    compareAtPrice: product.compareAtPriceRange.minVariantPrice
      ? parseMoney(product.compareAtPriceRange.minVariantPrice) || undefined
      : undefined,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    details: [],
    fabric: product.productType || "Premium Fabric",
    care: ["Handle with care", "See garment label for care instructions"],
    sizes: sizes.length > 0 ? sizes : ["XS", "S", "M", "L", "XL"],
    colors,
    images: { main: mainImage, alt: altImage },
    shopifyImages: images,
    category,
    categoryTitle,
    collection: firstCollection?.handle || "",
    collections: collectionsList,
    collectionHandles,
    badge: detectBadge(product),
    inStock: product.availableForSale,
    variants,
    shopifyId: product.id,
    productType: product.productType,
    tags: product.tags,
    availableForSale: product.availableForSale,
  };
}

export interface FetchResult<T> {
  data: T;
  error: string | null;
}

// ── Public API ───────────────────────────────────────────────────────────────

/**
 * Fetch all products directly from Shopify using cursor-based pagination.
 * Retrieves the complete catalog without an arbitrary fixed cap.
 * Returns { data: NormalizedProduct[], error: string | null }.
 * Does NOT fall back to any mock data.
 */
interface ShopifyProductsResponse {
  products: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    edges: { node: ShopifyProduct }[];
  };
}

export async function getAllProducts(): Promise<FetchResult<NormalizedProduct[]>> {
  try {
    const allProducts: NormalizedProduct[] = [];
    let hasNextPage = true;
    let afterCursor: string | null = null;
    const BATCH_SIZE = 100;

    while (hasNextPage) {
      const res: ShopifyProductsResponse = await shopifyFetch<ShopifyProductsResponse>({
        query: PRODUCTS_QUERY,
        variables: { first: BATCH_SIZE, after: afterCursor },
      });

      const pageProducts = res.products.edges.map((edge) => normalizeProduct(edge.node));
      allProducts.push(...pageProducts);

      hasNextPage = res.products.pageInfo.hasNextPage;
      afterCursor = res.products.pageInfo.endCursor;

      // Circuit breaker to prevent runaway pagination
      if (!afterCursor || allProducts.length >= 5000) {
        break;
      }
    }

    return { data: allProducts, error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch products from Shopify.";
    if (process.env.NODE_ENV === "development") {
      console.error("[Shopify API Failure] getAllProducts:", error);
    }
    return { data: [], error: message };
  }
}

/**
 * Fetch a single product by handle directly from Shopify.
 */
export async function getProductByHandle(handle: string): Promise<FetchResult<NormalizedProduct | null>> {
  try {
    const res = await shopifyFetch<{
      productByHandle: ShopifyProduct | null;
    }>({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    });

    if (!res.productByHandle) {
      return { data: null, error: null };
    }
    return { data: normalizeProduct(res.productByHandle), error: null };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load product from Shopify.";
    if (process.env.NODE_ENV === "development") {
      console.error(`[Shopify API Failure] getProductByHandle("${handle}"):`, error);
    }
    return { data: null, error: message };
  }
}

/**
 * Fetch related products of the same product type from Shopify.
 */
export async function getRelatedProducts(
  category: string,
  excludeHandle: string,
  count: number = 4
): Promise<NormalizedProduct[]> {
  try {
    const query = category ? `product_type:${category}` : "";
    const res = await shopifyFetch<{
      products: { edges: { node: ShopifyProduct }[] };
    }>({
      query: PRODUCTS_BY_TYPE_QUERY,
      variables: { query, first: count + 5 },
    });

    return res.products.edges
      .map((e) => normalizeProduct(e.node))
      .filter((p) => p.slug !== excludeHandle)
      .slice(0, count);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Shopify API Failure] getRelatedProducts:", error);
    }
    return [];
  }
}

/**
 * Search products directly via Shopify Storefront API.
 */
export async function searchProducts(query: string, count: number = 10): Promise<NormalizedProduct[]> {
  if (!query.trim()) return [];

  try {
    const res = await shopifyFetch<{
      products: { edges: { node: ShopifyProduct }[] };
    }>({
      query: SEARCH_PRODUCTS_QUERY,
      variables: { query, first: count },
    });

    return res.products.edges.map((e) => normalizeProduct(e.node));
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Shopify API Failure] searchProducts:", error);
    }
    return [];
  }
}
