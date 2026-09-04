// ─── Shopify Storefront API GraphQL Queries & Mutations ─────────────────────
// All queries are written for the Storefront API (not Admin API).
//
// IMPORTANT: Fragments are defined as standalone strings WITHOUT embedding
// sub-fragments via ${} interpolation. Each exported query composes exactly
// the fragments it needs at the query level, ensuring every fragment name
// appears only once in the final query string sent to Shopify.

// ── Fragments (standalone — do NOT embed other fragments inside these) ───────

const IMAGE_FRAGMENT = `
  fragment ImageFields on Image {
    url
    altText
    width
    height
  }
`;

const VARIANT_FRAGMENT = `
  fragment VariantFields on ProductVariant {
    id
    title
    availableForSale
    price { amount currencyCode }
    compareAtPrice { amount currencyCode }
    selectedOptions { name value }
    image { ...ImageFields }
  }
`;

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    title
    handle
    description
    descriptionHtml
    availableForSale
    productType
    tags
    featuredImage { ...ImageFields }
    images(first: 10) {
      edges { node { ...ImageFields } }
    }
    variants(first: 50) {
      edges { node { ...VariantFields } }
    }
    collections(first: 5) {
      edges { node { title handle } }
    }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
  }
`;

const COLLECTION_FRAGMENT = `
  fragment CollectionFields on Collection {
    id
    title
    handle
    description
    image { ...ImageFields }
  }
`;

// ── Product Queries ──────────────────────────────────────────────────────────

export const PRODUCTS_QUERY = `
  query Products($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      pageInfo { hasNextPage endCursor }
      edges {
        node { ...ProductFields }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
  ${VARIANT_FRAGMENT}
  ${IMAGE_FRAGMENT}
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      ...ProductFields
    }
  }
  ${PRODUCT_FRAGMENT}
  ${VARIANT_FRAGMENT}
  ${IMAGE_FRAGMENT}
`;

export const PRODUCTS_BY_TYPE_QUERY = `
  query ProductsByType($query: String!, $first: Int!) {
    products(first: $first, query: $query) {
      edges {
        node { ...ProductFields }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
  ${VARIANT_FRAGMENT}
  ${IMAGE_FRAGMENT}
`;

export const SEARCH_PRODUCTS_QUERY = `
  query SearchProducts($query: String!, $first: Int!) {
    products(first: $first, query: $query) {
      edges {
        node { ...ProductFields }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
  ${VARIANT_FRAGMENT}
  ${IMAGE_FRAGMENT}
`;

// ── Collection Queries ───────────────────────────────────────────────────────

export const COLLECTIONS_QUERY = `
  query Collections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          ...CollectionFields
        }
      }
    }
  }
  ${COLLECTION_FRAGMENT}
  ${IMAGE_FRAGMENT}
`;

export const COLLECTION_BY_HANDLE_QUERY = `
  query CollectionByHandle($handle: String!, $productsFirst: Int!) {
    collectionByHandle(handle: $handle) {
      ...CollectionFields
      products(first: $productsFirst) {
        edges {
          node { ...ProductFields }
        }
      }
    }
  }
  ${COLLECTION_FRAGMENT}
  ${PRODUCT_FRAGMENT}
  ${VARIANT_FRAGMENT}
  ${IMAGE_FRAGMENT}
`;

// ── Cart Mutations & Queries ─────────────────────────────────────────────────

const CART_LINE_FRAGMENT = `
  fragment CartLineFields on CartLine {
    id
    quantity
    merchandise {
      ... on ProductVariant {
        id
        title
        product {
          title
          handle
          featuredImage { ...ImageFields }
        }
        price { amount currencyCode }
        selectedOptions { name value }
        image { ...ImageFields }
      }
    }
    cost {
      totalAmount { amount currencyCode }
    }
  }
`;

const CART_FRAGMENT = `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    lines(first: 100) {
      edges { node { ...CartLineFields } }
    }
  }
`;

export const CART_CREATE_MUTATION = `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
  ${CART_LINE_FRAGMENT}
  ${IMAGE_FRAGMENT}
`;

export const CART_LINES_ADD_MUTATION = `
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
  ${CART_LINE_FRAGMENT}
  ${IMAGE_FRAGMENT}
`;

export const CART_LINES_UPDATE_MUTATION = `
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
  ${CART_LINE_FRAGMENT}
  ${IMAGE_FRAGMENT}
`;

export const CART_LINES_REMOVE_MUTATION = `
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
  ${CART_LINE_FRAGMENT}
  ${IMAGE_FRAGMENT}
`;

export const CART_QUERY = `
  query Cart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFields
    }
  }
  ${CART_FRAGMENT}
  ${CART_LINE_FRAGMENT}
  ${IMAGE_FRAGMENT}
`;
