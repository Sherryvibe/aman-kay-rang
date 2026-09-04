import { img, photos } from "@/lib/images";

export interface Artisan {
  id: string;
  name: string;
  craft: string;
  region: string;
  quote: string;
  image: string;
  story: string;
}

export const artisans: Artisan[] = [
  {
    id: "sajida-bibi",
    name: "Sajida Bibi",
    craft: "Chikankari & Shadow-Work",
    region: "Bahawalpur",
    quote: "Every stitch is a silent word of patience. Our craft is the heritage of our grandmothers, woven for the future.",
    image: img(photos.artisan1, { w: 1200, q: 90 }),
    story: "Sajida has been leading a local group of 15 embroidery makers in Bahawalpur for over a decade. Her signature shadow stitches bring depth and light to modern lawn silhouettes."
  },
  {
    id: "muhammad-shoaib",
    name: "Muhammad Shoaib",
    craft: "Traditional Hand-Block Printing",
    region: "Multan",
    quote: "The woodblock is my voice, and the natural dyes are my melody. We align the patterns to create visual music.",
    image: img(photos.artisan2, { w: 1200, q: 90 }),
    story: "Shoaib mixes organic dyes from indigo, pomegranate rinds, and madder root. His rhythmic printing technique has been passed down through four generations of block print masters."
  },
  {
    id: "zeenat-begum",
    name: "Zeenat Begum",
    craft: "Zardozi & Gold Tilla Work",
    region: "Walled City, Lahore",
    quote: "Capturing the light of stars on pure silk with silver and gold threads. Our hands mold the history that people wear.",
    image: img(photos.artisan3, { w: 1200, q: 90 }),
    story: "Zeenat works from a small sunny room in the historical center of Lahore. Her fine wire tilla work forms the delicate gold boundaries on our festive range."
  }
];
