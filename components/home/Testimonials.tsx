"use client";
import React from "react";
import { Star } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { testimonials } from "@/lib/data/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-beige/25 section-md relative overflow-hidden border-t border-line/45">
      <Container className="space-y-10">
        <div className="text-center">
          <RevealOnScroll>
            <Eyebrow className="text-center">Kind Words</Eyebrow>
            <h2 className="font-serif text-[30px] md:text-[44px] leading-[1.1] text-ink font-light tracking-tight mt-3">
              Stories Shared by You
            </h2>
          </RevealOnScroll>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <RevealOnScroll key={t.id} delay={idx * 0.12}>
              <div className="bg-ivory p-6 md:p-8 rounded-xl shadow-card flex flex-col justify-between h-full min-h-[200px] transition-all duration-500 hover:shadow-cardHover border border-line/30">
                <div className="space-y-3">
                  {/* Star Rating */}
                  <div className="flex gap-1 text-roseDeep">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" stroke="none" />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="text-[13.5px] leading-relaxed text-muted font-light italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                {/* Author Info */}
                <div className="mt-5 pt-4 border-t border-line/40">
                  <h4 className="text-[11px] font-semibold tracking-eyebrow uppercase text-ink">
                    {t.name}
                  </h4>
                  <p className="text-[10px] text-muted font-light uppercase mt-0.5">
                    {t.city}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  );
}
