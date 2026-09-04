"use client";
import React from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import BotanicalDecor from "@/components/ui/BotanicalDecor";
import { img, photos } from "@/lib/images";

const milestones = [
  {
    year: "2021",
    title: " Solace in Craft",
    desc: "Finding light in the dark. Founded by Uzma Shoaib in memory of her daughter Aman, we turned to traditional woodblocks and embroidery for healing.",
  },
  {
    year: "2023",
    title: "The Promise Fulfilled",
    desc: "Structuring the label around a simple mission: to preserve ancestral block-printing methods while establishing fair wages for women artisans in South Punjab.",
  },
  {
    year: "2024",
    title: "Regional Hubs Established",
    desc: "Opening dedicated centers in Multan and Bahawalpur, gathering over 30 craft women specializing in shadow work and raw vegetable dye printing.",
  },
  {
    year: "2026",
    title: "A National Tribute",
    desc: "Sharing Aman&apos;s colors on the modern digital stage, proving that heritage fashion does not belong to templates, but to handcrafted stories.",
  },
];

export default function OurStoryPage() {
  return (
    <div className="bg-ivory min-h-screen py-12 md:py-20 relative overflow-hidden">
      {/* Decorative SVG */}
      <BotanicalDecor position="top-right" variant="peony" className="text-roseDeep/15 w-64 h-64 -top-10 -right-10" />

      <Container className="space-y-14 md:space-y-20">
        {/* Header block */}
        <div className="max-w-3xl space-y-6">
          <Eyebrow>Our History</Eyebrow>
          <h1 className="font-serif text-[42px] md:text-[60px] leading-tight text-ink font-light tracking-tight">
            A Journey of Love,<br />
            <em className="font-serif italic font-light text-roseDeep">Woven Into Every Thread</em>
          </h1>
          <p className="text-[14px] leading-relaxed text-muted font-light max-w-xl">
            Aman Kay Rang was founded out of memory and love. What began as a mother&apos;s personal healing journey through ancient textiles has blossomed into a heritage fashion brand celebrating the lives, techniques, and spirits of Pakistani artisans.
          </p>
        </div>

        {/* Narrative & Image split — Equal 50/50 visual balance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 xl:gap-18 items-center">
          <RevealOnScroll className="w-full">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-beige shadow-card w-full">
              <Image
                src={img(photos.ourStory, { w: 1200, q: 90 })}
                alt="Artistic thread design, Aman Kay Rang editorial portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[center_35%]"
              />
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="space-y-6">
            <h3 className="font-serif text-[32px] sm:text-[40px] md:text-[46px] lg:text-[42px] xl:text-[48px] leading-[1.08] text-ink font-light tracking-tight">
              In Loving Memory
            </h3>
            <div className="space-y-4 sm:space-y-5 text-[14px] sm:text-[15px] lg:text-[15.5px] leading-relaxed text-muted font-light max-w-lg">
              <p>
                Uzma Shoaib founded the brand in honor of her daughter, Aman. Her dream was to see the traditional, colorful, and raw beauty of our ancient designs treated with the respect and luxury they deserve.
              </p>
              <p>
                We do not produce clothing in assembly lines. Each lawn collection, each unstitched silk piece, and every chikankari panel is printed, embroidered, and checked by human eyes and hands.
              </p>
              <p>
                Through this focus, we pay a living wage directly to the craftswomen and men in regional hubs who keep our ancestral arts alive.
              </p>
            </div>
          </RevealOnScroll>
        </div>

        {/* Milestones timeline */}
        <div className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-4">
            <Eyebrow className="text-center">Our Timeline</Eyebrow>
            <h3 className="font-serif text-[28px] md:text-[36px] text-ink font-light tracking-tight">
              How the Colors Grew
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((m, idx) => (
              <RevealOnScroll key={m.year} delay={idx * 0.1} className="space-y-4 bg-beige/35 p-6 rounded-xl border border-line/35 shadow-card hover:bg-beige/55 transition-colors">
                <span className="text-[28px] font-serif font-light text-roseDeep block">{m.year}</span>
                <h4 className="text-[12px] font-semibold tracking-eyebrow uppercase text-ink">{m.title}</h4>
                <p className="text-[13px] text-muted font-light leading-relaxed">{m.desc}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
