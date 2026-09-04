import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/shared/PageHeader";
import { img, photos } from "@/lib/images";

export const metadata: Metadata = {
  title: "Journal — Aman Kay Rang",
  description: "Stories about heritage, craft, and the people behind Aman Kay Rang.",
};

const posts = [
  {
    slug: "the-language-of-thread",
    eyebrow: "Craft & Heritage",
    title: "The Language of Thread",
    excerpt:
      "How master weavers in Punjab carry centuries of visual storytelling in their hands — and why Aman Kay Rang has committed to preserving their art.",
    readTime: "5 min read",
    photoId: photos.journal1,
    date: "July 2025",
  },
  {
    slug: "colours-aman-loved",
    eyebrow: "Tribute",
    title: "The Colours Aman Loved",
    excerpt:
      "In memory of Aman, we trace the palette she was drawn to — warm rose, deep ivory, the dusty blue of summer dusk — and how those colours became the soul of this brand.",
    readTime: "4 min read",
    photoId: photos.journal2,
    date: "May 2025",
  },
  {
    slug: "block-print-revival",
    eyebrow: "Artisan Stories",
    title: "Block Print Revival: A Conversation with Ustad Shafiq",
    excerpt:
      "We visited Ustad Shafiq's printing studio in Old Lahore and talked about the future of hand block-printing in an age of digital textiles.",
    readTime: "7 min read",
    photoId: photos.journal3,
    date: "March 2025",
  },
];

export default function JournalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Journal"
        title="Stories — Woven in Words"
        subtitle="Essays on heritage, craftsmanship, and the quiet beauty of handmade things."
      />

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="group flex flex-col space-y-5">
              {/* Cover image */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-beige shadow-card" style={{ backgroundColor: "#E8DDD3" }}>
                <Image
                  src={img(post.photoId, { w: 1200, q: 90 })}
                  alt={post.title}
                  fill
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-[1400ms] ease-luxury group-hover:scale-[1.02]"
                />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase">
                <span className="text-roseDeep font-semibold">{post.eyebrow}</span>
                <span className="text-muted">{post.date}</span>
                <span className="text-muted">{post.readTime}</span>
              </div>

              {/* Headline */}
              <h2 className="font-serif text-2xl md:text-3xl text-ink font-light leading-snug group-hover:text-roseDeep transition-colors duration-500">
                <Link href={`/journal/${post.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose rounded-sm">
                  {post.title}
                </Link>
              </h2>

              {/* Excerpt */}
              <p className="text-[13.5px] text-muted font-light leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>

              <Link
                href={`/journal/${post.slug}`}
                className="self-start text-[11px] tracking-[0.2em] uppercase text-ink border-b border-ink pb-1 hover:text-roseDeep hover:border-roseDeep transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose rounded-sm"
              >
                Read More
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
