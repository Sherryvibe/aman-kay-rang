// ─── Instagram Feed Service ──────────────────────────────────────────────────
// Fetches live posts from Instagram Graph API if INSTAGRAM_ACCESS_TOKEN is configured.
// Otherwise returns curated gallery items linking directly to official Instagram posts.

export interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
}

interface InstagramGraphMediaItem {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  permalink?: string;
  thumbnail_url?: string;
  timestamp?: string;
}

export const OFFICIAL_INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/amankayrang";

const DEFAULT_INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "ig-1",
    media_url: "/images/Hero image.png",
    permalink: OFFICIAL_INSTAGRAM_URL,
    caption: "Handcrafted Heritage — Traditional Floral Lawn Collection #AmanKayRang",
  },
  {
    id: "ig-2",
    media_url: "/images/Artisan Image.webp",
    permalink: OFFICIAL_INSTAGRAM_URL,
    caption: "Rooted in Tradition — Artisanal Block Print & Weaving #CraftedByHand",
  },
  {
    id: "ig-3",
    media_url: "/images/tribute image.webp",
    permalink: OFFICIAL_INSTAGRAM_URL,
    caption: "A Tribute to Aman — Celebrating Love & Pakistani Culture #AmanKayRang",
  },
  {
    id: "ig-4",
    media_url: "/images/Banner Image 1.png",
    permalink: OFFICIAL_INSTAGRAM_URL,
    caption: "The Heritage Shop — Explore New Seasonal Drops #PakistaniFashion",
  },
  {
    id: "ig-5",
    media_url: "/images/Hero image 1.png",
    permalink: OFFICIAL_INSTAGRAM_URL,
    caption: "Timeless Embroidery & Craftsmanship #PakistaniCouture",
  },
  {
    id: "ig-6",
    media_url: "/images/Hero image 2.png",
    permalink: OFFICIAL_INSTAGRAM_URL,
    caption: "Vibrant Palettes, Handwoven Stories #AmanKayRang",
  },
];

export async function getInstagramPosts(limit: number = 6): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    return DEFAULT_INSTAGRAM_POSTS.slice(0, limit);
  }

  try {
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=${limit}&access_token=${token}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      console.error("[Instagram API] Failed to fetch live posts:", res.statusText);
      return DEFAULT_INSTAGRAM_POSTS.slice(0, limit);
    }

    const data = await res.json();

    if (!data || !data.data || !Array.isArray(data.data)) {
      return DEFAULT_INSTAGRAM_POSTS.slice(0, limit);
    }

    return (data.data as InstagramGraphMediaItem[]).map((item: InstagramGraphMediaItem) => ({
      id: item.id,
      media_url: item.media_type === "VIDEO" ? item.thumbnail_url || item.media_url || "" : item.media_url || "",
      permalink: item.permalink || OFFICIAL_INSTAGRAM_URL,
      caption: item.caption || "Aman Kay Rang Instagram Post",
    }));
  } catch (error) {
    console.error("[Instagram API] Error fetching feed:", error);
    return DEFAULT_INSTAGRAM_POSTS.slice(0, limit);
  }
}
