"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import BotanicalDecor from "@/components/ui/BotanicalDecor";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

export default function CraftedByArtisans() {
  return (
    <section className="bg-beige section-md relative overflow-hidden border-t border-line/45">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Left Block-printing / Hands Image */}
          <RevealOnScroll className="w-full">
            <div className="relative aspect-[16/9] lg:aspect-[4/3] rounded-xl overflow-hidden bg-ivory shadow-card">
              <Image
                src="/images/Artisan Image.webp"
                alt="Artisan hands working on traditional textile weaving"
                fill
                quality={92}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                loading="lazy"
                style={{ backgroundColor: "#E8DDD3" }}
              />
              <div className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
            </div>
          </RevealOnScroll>

          {/* Right Text Column */}
          <div className="relative w-full">
            {/* Corner Cherry SVG decoration */}
            <BotanicalDecor position="bottom-right" variant="cherry" className="text-roseDeep/15 -bottom-16 -right-10 w-48 h-48" />

            <RevealOnScroll delay={0.15} className="space-y-5">
              <Eyebrow>Crafted By Artisans</Eyebrow>
              <h2 className="font-serif text-[30px] md:text-[44px] leading-[1.1] text-ink font-light tracking-tight">
                Rooted in Tradition.
                <br />
                <em className="font-serif italic font-light text-roseDeep block mt-1">
                  Made by Hands.
                </em>
                <em className="font-serif italic font-light text-roseDeep block">
                  That Tell Stories.
                </em>
              </h2>
              
              <p className="text-[13.5px] text-muted font-light leading-relaxed max-w-md">
                Every thread is guided by generations of wisdom. By working directly with master weavers, block-print makers, and embroidery artisans across Pakistan, we preserve historical art forms while creating sustainable, fair livelihoods.
              </p>

              <div className="pt-2">
                <Link
                  href="/artisans"
                  className="inline-flex items-center text-[11px] font-semibold tracking-eyebrow uppercase text-ink border-b border-ink pb-1.5 hover:text-roseDeep hover:border-roseDeep transition-colors duration-500 gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2"
                >
                  Meet Our Artisans
                  <span className="text-[14px]">&#8594;</span>
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </Container>
    </section>
  );
}
