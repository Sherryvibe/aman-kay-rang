// ─── Shopify Storefront API Client ───────────────────────────────────────────
// Centralized GraphQL client. All Shopify API calls go through shopifyFetch().

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const apiVersion = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || "2024-01";

const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;

interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
}

interface ShopifyResponse<T> {
  data?: T;
  errors?: { message: string; locations?: { line: number; column: number }[] }[];
}

/**
 * Execute a GraphQL query against the Shopify Storefront API.
 * Returns the `data` field from the response, or throws on errors.
 */
export async function shopifyFetch<T>(
  { query, variables }: ShopifyFetchOptions
): Promise<T> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text();
    if (process.env.NODE_ENV === "development") {
      console.error("[Shopify API] HTTP error:", res.status, text);
    }
    throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  }

  const json: ShopifyResponse<T> = await res.json();

  if (json.errors) {
    if (process.env.NODE_ENV === "development") {
      console.error("[Shopify API] GraphQL errors:", JSON.stringify(json.errors, null, 2));
    }
    throw new Error(`Shopify GraphQL error: ${json.errors.map((e) => e.message).join(", ")}`);
  }

  if (!json.data) {
    throw new Error("Shopify API returned no data");
  }

  return json.data;
}
