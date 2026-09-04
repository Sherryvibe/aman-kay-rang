"use client";
import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import BotanicalDecor from "@/components/ui/BotanicalDecor";
import { artisans } from "@/lib/data/artisans";

export default function ArtisansPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 md:py-20 relative overflow-hidden">
      {/* Decorative botanical element */}
      <BotanicalDecor position="bottom-left" variant="leaf" className="text-roseDeep/15 w-64 h-64 -bottom-10 -left-10" />

      <Container className="space-y-14 md:space-y-20">
        {/* Header Block */}
        <div className="max-w-3xl space-y-6">
          <Eyebrow>Craftspeople</Eyebrow>
          <h1 className="font-serif text-[42px] md:text-[60px] leading-tight text-ink font-light tracking-tight">
            Meet the Artisans Behind<br />
            <em className="font-serif italic font-light text-roseDeep">Aman Kay Rang</em>
          </h1>
          <p className="text-[14px] leading-relaxed text-muted font-light max-w-xl">
            We partner directly with regional makers in Multan, Bahawalpur, and Lahore. By bypassing middlemen, we return value and pride to the communities whose skilled hands weave and print our stories.
          </p>
        </div>

        {/* Artisans Grid List — Consistent visual balance across all sections */}
        <div className="space-y-16 md:space-y-24">
          {artisans.map((artisan, idx) => (
            <div
              key={artisan.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 xl:gap-18 items-center ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image Block — Controlled 4:3 aspect ratio */}
              <div
                className={`lg:col-span-5 relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-beige shadow-card ${
                  idx % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={artisan.image}
                  alt={artisan.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-[center_35%]"
                />
                <div className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
              </div>

              {/* Story Details */}
              <div className={`lg:col-span-7 space-y-6 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                <RevealOnScroll className="space-y-5">
                  <span className="text-[11px] sm:text-[12px] tracking-[0.22em] uppercase font-semibold text-roseDeep block">
                    {artisan.craft} • {artisan.region}
                  </span>
                  <h3 className="font-serif text-[34px] sm:text-[42px] md:text-[48px] lg:text-[44px] xl:text-[52px] leading-[1.08] text-ink font-light tracking-tight">
                    {artisan.name}
                  </h3>
                  
                  {/* Pull Quote */}
                  <blockquote className="border-l-2 border-roseDeep pl-5 py-2 my-6 text-[16px] sm:text-[18px] lg:text-[19px] italic text-ink font-serif font-light leading-relaxed">
                    &ldquo;{artisan.quote}&rdquo;
                  </blockquote>

                  <div className="space-y-4 text-[14px] sm:text-[15px] lg:text-[15.5px] leading-relaxed text-muted font-light max-w-xl">
                    <p>{artisan.story}</p>
                    <p>
                      Every piece Sajida, Shoaib, or Zeenat touches represents a piece of geographical art. By choosing this collection, you support sustainable local arts and ensure these techniques are preserved for generations to come.
                    </p>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
