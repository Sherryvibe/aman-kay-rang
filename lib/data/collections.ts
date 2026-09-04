import { img, photos } from "@/lib/images";

export interface Collection {
  slug: string;
  name: string;
  description: string;
  image: string;
  featured: boolean;
}

export const collections: Collection[] = [
  {
    slug: "gul-e-naz",
    name: "Gul-e-Naz",
    description: "Where florals meet tradition. A spring edit of hand-block printed lawn, featuring delicate floral trails and pastel backdrops.",
    image: img(photos.collection1, { w: 1600, q: 90 }),
    featured: true,
  },
  {
    slug: "rang-e-aman",
    name: "Rang-e-Aman",
    description: "A tribute in crimson and rose. Heritage block prints in bold, soulful hues designed for structured grace.",
    image: img(photos.collection2, { w: 1600, q: 90 }),
    featured: true,
  },
  {
    slug: "noor-e-chasham",
    name: "Noor-e-Chasham",
    description: "Dawn-inspired elegance. Chikankari panels and organza borders designed for modern, daily-wear visual poetry.",
    image: img(photos.collection3, { w: 1600, q: 90 }),
    featured: false,
  },
  {
    slug: "meh-e-rang",
    name: "Meh-e-Rang",
    description: "The warmth of heritage. Soft pastels combined with mirror-work accents optimized for absolute summer ease.",
    image: img(photos.collection4, { w: 1600, q: 90 }),
    featured: false,
  },
];
