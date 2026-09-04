"use client";
import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { img, photos } from "@/lib/images";

const spreads = [
  {
    image: img(photos.ourStory, { w: 1600, q: 90 }),
    title: "Timeless Comfort",
    sub: "Unstitched Linen & Lawn",
    col: "col-span-12"
  },
  {
    image: img(photos.hero, { w: 1200, q: 90 }),
    title: "Shadow Stitches",
    sub: "Chikankari detail from Bahawalpur",
    col: "col-span-12 md:col-span-6"
  },
  {
    image: img(photos.product3alt, { w: 1200, q: 90 }),
    title: "Light & Sheer",
    sub: "Summer Voiles and Soft Cotton Dupattas",
    col: "col-span-12 md:col-span-6"
  },
  {
    image: img(photos.product2, { w: 1600, q: 90 }),
    title: "Multani Blocks",
    sub: "Deep Indigo and Madder Dyes",
    col: "col-span-12"
  }
];

export default function LookbookPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 md:py-20">
      <Container className="space-y-10 md:space-y-14">
        {/* Centered Header */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <Eyebrow className="text-center">Lookbook</Eyebrow>
          <h1 className="font-serif text-[38px] md:text-[54px] leading-tight text-ink font-light tracking-tight">
            Stories Beyond Clothing
          </h1>
          <p className="text-[13.5px] leading-relaxed text-muted font-light">
            A visual documentation of flow, color, and structure. Our garments are designed to move with grace, reflecting the soil and heritage of Pakistan.
          </p>
        </div>

        {/* Editorial Spreads Grid */}
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          {spreads.map((s, idx) => (
            <RevealOnScroll key={idx} className={`${s.col} space-y-4`}>
              <div className="relative aspect-[16/10] md:aspect-[16/9] lg:aspect-[16/8] rounded-xl overflow-hidden bg-beige shadow-card group">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-[1500ms] ease-luxury group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-ink/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-6 md:p-10 text-white">
                  <span className="text-[10px] tracking-eyebrow uppercase font-semibold text-rose/90">{s.sub}</span>
                  <h3 className="font-serif text-[24px] md:text-[32px] font-light mt-1">{s.title}</h3>
                </div>
              </div>
              <div className="flex justify-between items-baseline px-2 md:hidden">
                <h3 className="font-serif text-lg text-ink font-light">{s.title}</h3>
                <span className="text-[11px] uppercase tracking-wider text-muted font-light">{s.sub}</span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </div>
  );
}
