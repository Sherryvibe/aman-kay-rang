const UNSPLASH = "https://images.unsplash.com";

/**
 * Build a high-quality Unsplash URL.
 * @param id  - The photo path segment, e.g. "photo-1610030469983-98e550d6193c"
 * @param opts - Optional overrides for width, quality, and fit
 */
export function img(
  id: string,
  {
    w = 2000,
    q = 90,
    fit = "crop",
  }: { w?: number; q?: number; fit?: "crop" | "max" } = {}
): string {
  return `${UNSPLASH}/${id}?w=${w}&q=${q}&auto=format&fit=${fit}`;
}

/**
 * Build a responsive srcSet string for use with `srcSet` attribute.
 * Not needed when using Next/Image — it generates srcsets automatically from `sizes`.
 * Useful for plain <img> fallbacks only.
 */
export function srcSet(
  id: string,
  widths = [640, 960, 1280, 1600, 2000, 2560]
): string {
  return widths.map((w) => `${img(id, { w })} ${w}w`).join(", ");
}

// ─── Curated editorial photo IDs ────────────────────────────────────────────
// These are the canonical IDs used across the site.
// Change the ID here to update every use-site automatically.

export const photos = {
  // Hero — woman in pink floral kurti against a neutral warm wall
  hero: "photo-1610030469983-98e550d6193c",

  // Brand Story — thread/fabric artisan detail
  brandStory: "photo-1596783074918-c84cb06531ca",

  // Our Story page — editorial founder portrait
  ourStory: "photo-1596783074918-c84cb06531ca",
  story1: "photo-1596783074918-c84cb06531ca",
  story2: "photo-1596783074918-c84cb06531ca",

  // Artisans
  artisan1: "photo-1528360983277-13d401cdc186",
  artisan2: "photo-1582719508461-905c673771fd",
  artisan3: "photo-1528360983277-13d401cdc186",

  // Products — main shots
  product1: "photo-1610030469983-98e550d6193c",
  product1alt: "photo-1583391733956-3750e0ff4e8b",
  product2: "photo-1595777457583-95e059d581b8",
  product2alt: "photo-1509631179647-0177331693ae",
  product3: "photo-1583391733956-3750e0ff4e8b",
  product3alt: "photo-1515886657613-9f3515b0c78f",
  product4: "photo-1610030469983-98e550d6193c",
  product4alt: "photo-1596783074918-c84cb06531ca",
  product5: "photo-1544005313-94ddf0286df2",
  product5alt: "photo-1509631179647-0177331693ae",
  product6: "photo-1539571696357-5a69c17a67c6",
  product6alt: "photo-1494790108377-be9c29b29330",
  product7: "photo-1515886657613-9f3515b0c78f",
  product7alt: "photo-1529139574466-a303027c1d8b",
  product8: "photo-1529139574466-a303027c1d8b",
  product8alt: "photo-1529139574466-a303027c1d8b",
  product9: "photo-1610030469983-98e550d6193c",
  product9alt: "photo-1595777457583-95e059d581b8",
  product10: "photo-1595777457583-95e059d581b8",
  product10alt: "photo-1583391733956-3750e0ff4e8b",

  // Lookbook / editorial spreads
  lookbook1: "photo-1509631179647-0177331693ae",
  lookbook2: "photo-1515886657613-9f3515b0c78f",
  lookbook3: "photo-1529139574466-a303027c1d8b",
  lookbook4: "photo-1529139574466-a303027c1d8b",
  lookbook5: "photo-1590735213920-68192a487bc2",
  lookbook6: "photo-1590735213920-68192a487bc2",

  // Collections cover images
  collection1: "photo-1610030469983-98e550d6193c",
  collection2: "photo-1583391733956-3750e0ff4e8b",
  collection3: "photo-1610030469983-98e550d6193c",
  collection4: "photo-1515886657613-9f3515b0c78f",

  // Instagram grid (square crops)
  ig1: "photo-1610030469983-98e550d6193c",
  ig2: "photo-1595777457583-95e059d581b8",
  ig3: "photo-1583391733956-3750e0ff4e8b",
  ig4: "photo-1529139574466-a303027c1d8b",
  ig5: "photo-1509631179647-0177331693ae",
  ig6: "photo-1515886657613-9f3515b0c78f",

  // Journal covers
  journal1: "photo-1515886657613-9f3515b0c78f",
  journal2: "photo-1509631179647-0177331693ae",
  journal3: "photo-1529139574466-a303027c1d8b",
} as const;

export type PhotoKey = keyof typeof photos;
