"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import BotanicalDecor from "@/components/ui/BotanicalDecor";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import { img, photos } from "@/lib/images";

export default function BrandStory() {
  return (
    <section className="relative bg-ivory section-md overflow-hidden border-t border-line/45">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center">
          {/* Left Image Section — Clean 4:3 aspect ratio */}
          <RevealOnScroll className="w-full">
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-beige shadow-card">
              <Image
                src="/images/tribute image.webp"
                alt="Aman Kay Rang storytelling portrait — tribute to Aman"
                fill
                quality={92}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-roseDeep/5 mix-blend-multiply" />
            </div>
          </RevealOnScroll>

          {/* Right Text Section */}
          <div className="relative w-full">
            {/* Top-Right Botanical motif */}
            <BotanicalDecor position="top-right" variant="peony" className="text-roseDeep/20 -top-12 -right-8 w-44 h-44 pointer-events-none" />
            
            <RevealOnScroll delay={0.15} className="space-y-6">
              <Eyebrow className="text-[11px] sm:text-[12px] tracking-[0.22em]">Our Story</Eyebrow>
              <h2 className="font-serif text-[34px] sm:text-[42px] md:text-[48px] lg:text-[44px] xl:text-[52px] leading-[1.08] text-ink font-light tracking-tight">
                A Tribute to Aman.
                <br />
                <em className="font-serif italic font-light text-roseDeep">A Journey of Love.</em>
              </h2>
              
              <div className="space-y-4 text-[14px] sm:text-[15px] lg:text-[15.5px] leading-relaxed text-muted font-light max-w-lg">
                <p>
                  Aman Kay Rang was born from love and a promise. Founded by Uzma Shoaib in memory of her beloved daughter Aman, the brand is a celebration of color, craftsmanship, and the timeless beauty of Pakistani heritage.
                </p>
                <p>
                  Every piece we create is a tribute to Aman&apos;s vibrant spirit and her love for the traditional arts that continue to inspire our palettes and designs.
                </p>
              </div>

              <div className="pt-2 sm:pt-4">
                <Link
                  href="/our-story"
                  className="inline-flex items-center text-[12px] font-semibold tracking-[0.2em] uppercase text-ink border-b-2 border-ink pb-1.5 hover:text-roseDeep hover:border-roseDeep transition-colors duration-500 min-h-[44px]"
                >
                  Read Our Story
                  <span className="ml-2 text-[14px]">&#8594;</span>
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Container>
    </section>
  );
}

