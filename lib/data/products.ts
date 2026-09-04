import { img, photos } from "@/lib/images";

export interface Product {
  slug: string;
  name: string;
  price: number;
  description: string;
  details: string[];
  fabric: string;
  care: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  images: { main: string; alt: string };
  category: "stitched" | "unstitched";
  collection: string;
  badge?: "New" | "Bestseller" | "Limited";
  inStock: boolean;
}

// ─── Product image helper ─────────────────────────────────────────────────────
// All image URLs are generated via img() — never raw URLs in components.
// Card images use w:1200 (displayed at max ~600px @2x). Detail page uses w:1600.

const pi = (id: string) => img(id, { w: 1200, q: 82 }); // product card image

export const products: Product[] = [
  {
    slug: "gul-e-naz",
    name: "Gul-e-Naz",
    price: 14500,
    description:
      "A whisper of spring captured in premium lawn. Delicate hand-embroidery meets traditional block print details from the heart of Multan.",
    details: [
      "3-piece unstitched suit",
      "Premium lawn base shirt",
      "Embroidered neckline panel",
      "Block-printed dupatta",
      "Solid dyed trouser fabric included",
    ],
    fabric: "100% Premium Lawn",
    care: ["Dry clean recommended", "Iron on reverse", "Store away from direct sunlight"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Ivory Pink", hex: "#F5E6E8" }],
    images: {
      main: pi(photos.product1),
      alt: pi(photos.product1alt),
    },
    category: "unstitched",
    collection: "gul-e-naz",
    badge: "New",
    inStock: true,
  },
  {
    slug: "dhaani",
    name: "Dhaani",
    price: 13500,
    description:
      "Inspired by the lush orchards of Punjab, Dhaani brings a soothing sage green with fine gold zari borders and hand-finished embroidery.",
    details: [
      "3-piece unstitched ensemble",
      "Slub lawn fabric shirt",
      "Woven border detailing",
      "Printed dupatta with gold border",
      "Matching raw cotton trouser fabric",
    ],
    fabric: "Premium Slub Lawn",
    care: ["Hand wash carefully", "Line dry in shade", "Warm iron"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Sage Green", hex: "#B8C0B0" }],
    images: {
      main: pi(photos.product2),
      alt: pi(photos.product2alt),
    },
    category: "unstitched",
    collection: "gul-e-naz",
    badge: "Bestseller",
    inStock: true,
  },
  {
    slug: "noor-e-chasham",
    name: "Noor-e-Chasham",
    price: 16500,
    description:
      "Light captured in fabric. An elegant silhouette adorned with classic chikankari panels and a sheer organza dupatta. Inspired by dawn over Lahore's old city.",
    details: [
      "3-piece unstitched suit",
      "Chikankari embroidered front panel",
      "Organza border insert",
      "Sheer chiffon dupatta",
      "Plain trouser fabric included",
    ],
    fabric: "Pure Cotton with Chiffon Dupatta",
    care: ["Dry clean only", "Iron on low heat", "Handle with care"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Soft Ivory", hex: "#FAF6F0" }],
    images: {
      main: pi(photos.product3),
      alt: pi(photos.product3alt),
    },
    category: "unstitched",
    collection: "noor-e-chasham",
    badge: "Bestseller",
    inStock: true,
  },
  {
    slug: "rang-e-aman",
    name: "Rang-e-Aman",
    price: 17500,
    description:
      "A tribute in crimson. A signature piece honoring the heritage of traditional block print patterns — for the woman who carries love in her stride.",
    details: [
      "3-piece unstitched suit",
      "Block-printed cambric shirt",
      "Gold dust print overlay",
      "Chiffon printed dupatta",
      "Cambric trouser fabric",
    ],
    fabric: "Premium Cambric & Chiffon",
    care: ["Dry clean recommended", "Iron on reverse", "Store in clean cotton wrap"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Crimson Rose", hex: "#C96284" }],
    images: {
      main: pi(photos.product4),
      alt: pi(photos.product4alt),
    },
    category: "unstitched",
    collection: "rang-e-aman",
    inStock: true,
  },
  {
    slug: "meh-e-rang",
    name: "Meh-e-Rang",
    price: 15500,
    description:
      "The warmth of henna, the softness of dawn. A pastel pink fantasy with light mirror work along the neckline — made for moments.",
    details: [
      "3-piece unstitched lawn",
      "Embroidered front panel with mirror work",
      "Printed silk border dupatta",
      "Plain lawn trouser fabric",
    ],
    fabric: "Premium Mercerized Lawn",
    care: ["Gentle hand wash", "Do not wring", "Iron under damp cloth"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Dusty Rose", hex: "#D78598" }],
    images: {
      main: pi(photos.product5),
      alt: pi(photos.product5alt),
    },
    category: "unstitched",
    collection: "meh-e-rang",
    badge: "New",
    inStock: true,
  },
  {
    slug: "gulbano",
    name: "Gulbano",
    price: 14000,
    description:
      "A garden in bloom. Adorned with blooming floral trails, Gulbano is a classic summer lawn suit with hand-block prints from the heart of Punjab.",
    details: [
      "3-piece unstitched lawn",
      "Hand-block printed floral shirt",
      "Voile printed dupatta",
      "Dyed cotton trouser fabric",
    ],
    fabric: "Fine Cotton Voile & Lawn",
    care: ["Wash separately", "Do not dry in direct sunlight", "Warm iron"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Peach Voile", hex: "#F3D2C1" }],
    images: {
      main: pi(photos.product6),
      alt: pi(photos.product6alt),
    },
    category: "unstitched",
    collection: "gulbano",
    inStock: true,
  },
  {
    slug: "saya",
    name: "Saya",
    price: 13500,
    description:
      "Quiet elegance in shadow-printed cotton. A clean, minimal silhouette with structured pleats — understated luxury for the modern woman.",
    details: [
      "3-piece unstitched suit",
      "Shadow-print lawn base",
      "Embroidered sleeves",
      "Lawn printed dupatta",
      "Dyed trouser fabric",
    ],
    fabric: "Linen Cotton Blend",
    care: ["Machine wash cold", "Tumble dry low", "Warm iron"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Earthy Oatmeal", hex: "#D8C3A5" }],
    images: {
      main: pi(photos.product7),
      alt: pi(photos.product7alt),
    },
    category: "unstitched",
    collection: "saya",
    badge: "New",
    inStock: true,
  },
  {
    slug: "pari",
    name: "Pari",
    price: 15000,
    description:
      "A piece of paradise, hand-printed in soft hues. An oversized silhouette with delicate self-thread embroidery — a versatile staple for modern styling.",
    details: [
      "3-piece unstitched suit",
      "Lawn base with hand-block print",
      "Tone-on-tone self embroidery",
      "Chiffon dupatta",
      "Plain trouser fabric",
    ],
    fabric: "Premium Lawn & Chiffon",
    care: ["Hand wash only", "Hang dry", "Steam iron"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Pure Alabaster", hex: "#FFFFFF" }],
    images: {
      main: pi(photos.product8),
      alt: pi(photos.product8alt),
    },
    category: "unstitched",
    collection: "pari",
    inStock: true,
  },
  {
    slug: "nilofer",
    name: "Nilofer",
    price: 18500,
    description:
      "Sheer sophistication. A heavily embroidered chiffon shirt with a premium silk slip and raw silk trousers — crafted for evenings that demand presence.",
    details: [
      "3-piece stitched luxury set",
      "Embroidered crinkle chiffon shirt",
      "Pure silk inner slip",
      "Raw silk trousers",
    ],
    fabric: "Crinkle Chiffon & Silk",
    care: ["Dry clean only", "Handle with care", "Do not iron directly on embroidery"],
    sizes: ["S", "M", "L", "XL"],
    colors: [{ name: "Deep Teal", hex: "#1C4E56" }],
    images: {
      main: pi(photos.product9),
      alt: pi(photos.product9alt),
    },
    category: "stitched",
    collection: "noor-e-chasham",
    inStock: false,
  },
  {
    slug: "ziba",
    name: "Ziba",
    price: 19000,
    description:
      "Crafted for festive evenings, Ziba features gold tilla handwork on premium georgette chiffon — where tradition meets celebration.",
    details: [
      "3-piece unstitched suit",
      "Tilla-work embroidered shirt base",
      "Chiffon sleeves panel",
      "Silk trouser base fabric",
    ],
    fabric: "Georgette Chiffon",
    care: ["Dry clean only", "Store in moisture-free space"],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [{ name: "Royal Ochre", hex: "#D4A373" }],
    images: {
      main: pi(photos.product10),
      alt: pi(photos.product10alt),
    },
    category: "unstitched",
    collection: "rang-e-aman",
    badge: "New",
    inStock: true,
  },
];

export const collections = [
  {
    slug: "gul-e-naz",
    name: "Gul-e-Naz",
    description: "Where florals meet tradition. A spring edit of hand-block printed lawn.",
    cover: img(photos.collection1, { w: 1600, q: 90 }),
  },
  {
    slug: "rang-e-aman",
    name: "Rang-e-Aman",
    description: "A tribute in crimson and rose. Heritage block prints in bold, soulful hues.",
    cover: img(photos.collection2, { w: 1600, q: 90 }),
  },
  {
    slug: "noor-e-chasham",
    name: "Noor-e-Chasham",
    description: "Dawn-inspired elegance. Chikankari and organza for the quiet luxury woman.",
    cover: img(photos.collection3, { w: 1600, q: 90 }),
  },
  {
    slug: "meh-e-rang",
    name: "Meh-e-Rang",
    description: "The warmth of heritage. Mirror work and soft pastels for warm summer days.",
    cover: img(photos.collection4, { w: 1600, q: 90 }),
  },
];

export const artisans = [
  {
    name: "Zarina Bibi",
    craft: "Block Printing",
    location: "Multan, Pakistan",
    quote:
      "Each print carries the rhythm of my hands and the patience of forty years. I don't make patterns — I tell stories.",
    photo: img(photos.artisan1, { w: 1200, q: 90 }),
  },
  {
    name: "Sakeena Begum",
    craft: "Hand Embroidery",
    location: "Lahore, Pakistan",
    quote:
      "A stitch is a sentence. I write love letters on fabric — one thread at a time, one colour at a time.",
    photo: img(photos.artisan2, { w: 1200, q: 90 }),
  },
  {
    name: "Rukhsana Aslam",
    craft: "Weaving & Finishing",
    location: "Faisalabad, Pakistan",
    quote:
      "The loom remembers what hands forget. Every bolt of fabric carries the memory of every woman who worked it.",
    photo: img(photos.artisan3, { w: 1200, q: 90 }),
  },
];

export const testimonials = [
  {
    name: "Ayesha K.",
    city: "Karachi",
    rating: 5,
    text: "The fabric feels like a memory. Every piece from Aman Kay Rang is personal — you can feel the intention behind it.",
  },
  {
    name: "Mariam S.",
    city: "Lahore",
    rating: 5,
    text: "Worth every rupee. The craftsmanship is unmatched — and the story behind the brand makes it even more special.",
  },
  {
    name: "Fatima R.",
    city: "Dubai",
    rating: 5,
    text: "I've worn Pakistani clothing all my life. This is the first brand that feels truly editorial and deeply personal at once.",
  },
];
