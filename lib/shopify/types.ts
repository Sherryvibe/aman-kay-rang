// ─── Shopify Storefront API Types ────────────────────────────────────────────
// These types map directly to the Shopify Storefront API GraphQL schema.
// Normalized types for use in the existing Aman Kay Rang frontend are below.

export interface ShopifyMoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width?: number;
  height?: number;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable?: number;
  price: ShopifyMoneyV2;
  compareAtPrice: ShopifyMoneyV2 | null;
  selectedOptions: { name: string; value: string }[];
  image?: ShopifyImage | null;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  productType: string;
  tags: string[];
  featuredImage: ShopifyImage | null;
  images: { edges: { node: ShopifyImage }[] };
  variants: { edges: { node: ShopifyProductVariant }[] };
  collections: { edges: { node: { title: string; handle: string } }[] };
  priceRange: {
    minVariantPrice: ShopifyMoneyV2;
    maxVariantPrice: ShopifyMoneyV2;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoneyV2;
    maxVariantPrice: ShopifyMoneyV2;
  };
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
  products: { edges: { node: ShopifyProduct }[] };
}

// ─── Cart Types ──────────────────────────────────────────────────────────────

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
      handle: string;
      featuredImage: ShopifyImage | null;
    };
    price: ShopifyMoneyV2;
    selectedOptions: { name: string; value: string }[];
    image?: ShopifyImage | null;
  };
  cost: {
    totalAmount: ShopifyMoneyV2;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoneyV2;
    totalAmount: ShopifyMoneyV2;
    totalTaxAmount?: ShopifyMoneyV2 | null;
  };
  lines: { edges: { node: ShopifyCartLine }[] };
}

// ─── Normalized Types (used by the Aman Kay Rang frontend) ──────────────────

export interface NormalizedProduct {
  slug: string;               // Shopify handle
  name: string;               // Shopify title
  price: number;
  compareAtPrice?: number;
  description: string;
  descriptionHtml: string;
  details: string[];           // Parsed from description or empty
  fabric: string;              // From productType or metafield
  care: string[];              // Default care instructions
  sizes: string[];             // From variant options named "Size"
  colors: { name: string; hex: string }[];  // From variant options named "Color"
  images: { main: string; alt: string };
  shopifyImages: { url: string; altText: string }[];
  category: string;            // First collection handle or productType
  categoryTitle: string;       // First collection title
  collection: string;          // First collection handle
  badge?: "New" | "Bestseller" | "Limited";
  inStock: boolean;
  variants: NormalizedVariant[];
  shopifyId: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
}

export interface NormalizedVariant {
  id: string;                  // Shopify variant GID
  title: string;
  available: boolean;
  price: number;
  compareAtPrice?: number;
  options: { name: string; value: string }[];
  image?: { url: string; altText: string };
}

export interface NormalizedCollection {
  slug: string;
  name: string;
  description: string;
  image: string;
  featured: boolean;
  products?: NormalizedProduct[];
}

export interface NormalizedCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: number;
  total: number;
  currencyCode: string;
  lines: NormalizedCartLine[];
}

export interface NormalizedCartLine {
  id: string;                  // Cart line ID (for update/remove)
  variantId: string;           // Merchandise variant ID
  productHandle: string;
  productTitle: string;
  variantTitle: string;
  image: string;
  price: number;
  quantity: number;
  totalPrice: number;
  options: { name: string; value: string }[];
}
