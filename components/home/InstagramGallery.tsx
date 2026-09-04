"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Instagram } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { getInstagramPosts, OFFICIAL_INSTAGRAM_URL, type InstagramPost } from "@/lib/instagram/feed";

export default function InstagramGallery() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    getInstagramPosts(6).then(setPosts);
  }, []);

  return (
    <section className="bg-ivory section-md relative overflow-hidden border-t border-line/45">
      <Container className="space-y-8">
        <div className="text-center">
          <RevealOnScroll>
            <Eyebrow className="text-center">Follow Our Journey</Eyebrow>
            <h2 className="font-serif text-[30px] md:text-[44px] leading-[1.1] text-ink font-light tracking-tight mt-3">
              On Instagram
            </h2>
            <a
              href={OFFICIAL_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-eyebrow uppercase text-roseDeep hover:text-roseHover mt-3 transition-colors"
            >
              <Instagram strokeWidth={1.25} size={14} />
              @amankayrang
            </a>
          </RevealOnScroll>
        </div>

        {/* 6-image grid with direct backlinks to Instagram posts */}
        <RevealOnScroll className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {posts.map((post, i) => (
              <a
                key={post.id || i}
                href={post.permalink || OFFICIAL_INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square rounded-xl overflow-hidden bg-beige group block shadow-sm border border-line/35"
                aria-label={`View Instagram post ${i + 1} on @amankayrang`}
                style={{ backgroundColor: "#E8DDD3" }}
              >
                <Image
                  src={post.media_url}
                  alt={post.caption || "Aman Kay Rang Instagram Post"}
                  fill
                  quality={85}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover object-center transition-transform duration-[1200ms] ease-luxury group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay hover with direct backlink CTA */}
                <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white gap-2 p-2 text-center">
                  <Instagram strokeWidth={1.25} size={22} className="text-white" />
                  <span className="text-[9px] tracking-eyebrow uppercase font-semibold text-white">View on Instagram</span>
                </div>
              </a>
            ))}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
