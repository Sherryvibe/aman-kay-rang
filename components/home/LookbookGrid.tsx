"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { img, photos } from "@/lib/images";

const lookbookImages = [
  { id: photos.lookbook1, alt: "Aman Kay Rang Editorial — soft drapery portrait" },
  { id: photos.lookbook2, alt: "Aman Kay Rang Editorial — heritage silhouette study" },
  { id: photos.lookbook3, alt: "Aman Kay Rang Editorial — artisan weave portrait" },
  { id: photos.lookbook4, alt: "Aman Kay Rang Editorial — pattern detail close-up" },
  { id: photos.lookbook5, alt: "Aman Kay Rang Editorial — summer lawn editorial" },
  { id: photos.lookbook6, alt: "Aman Kay Rang Editorial — evening embroidery" },
];

export default function LookbookGrid() {
  return (
    <section className="bg-ivory section-md relative overflow-hidden border-t border-line/45">
      <Container className="text-center space-y-8">
        <RevealOnScroll>
          <Eyebrow className="text-center">Lookbook</Eyebrow>
          <h2 className="font-serif text-[30px] md:text-[44px] leading-[1.1] text-ink font-light tracking-tight mt-3">
            Stories Beyond Clothing
          </h2>
        </RevealOnScroll>

        {/* Horizontal Row of 6 Images */}
        <RevealOnScroll className="w-full">
          <div className="flex gap-4 md:gap-5 overflow-x-auto py-2 px-1 no-scrollbar scroll-smooth snap-x snap-mandatory">
            {lookbookImages.map((item, i) => (
              <div
                key={i}
                className="w-[220px] md:w-[280px] aspect-[3/4] rounded-xl overflow-hidden bg-beige shadow-card flex-shrink-0 snap-center group relative cursor-pointer"
                style={{ backgroundColor: "#E8DDD3" }}
              >
                <Image
                  src={img(item.id, { w: 560, q: 80 })}
                  alt={item.alt}
                  fill
                  quality={80}
                  sizes="(max-width: 768px) 220px, 280px"
                  className="object-cover object-center transition-transform duration-[1200ms] ease-luxury group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </RevealOnScroll>

        {/* Center link */}
        <RevealOnScroll>
          <Link
            href="/lookbook"
            className="inline-flex items-center text-[11px] font-semibold tracking-eyebrow uppercase text-ink border-b border-ink pb-1.5 hover:text-roseDeep hover:border-roseDeep transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2"
          >
            Explore More
          </Link>
        </RevealOnScroll>
      </Container>
    </section>
  );
}
