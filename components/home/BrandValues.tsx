"use client";
import React from "react";
import { Sparkles, Heart, Compass, ShieldCheck } from "lucide-react";
import Container from "@/components/ui/Container";

const values = [
  {
    icon: Heart,
    title: "Handcrafted",
    desc: "With love and tradition",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    desc: "Natural fabrics. Timeless pieces.",
  },
  {
    icon: Compass,
    title: "Made in Pakistan",
    desc: "Supporting local artisans",
  },
  {
    icon: ShieldCheck,
    title: "Ethical Fashion",
    desc: "Thoughtful. Conscious. Timeless.",
  },
];

export default function BrandValues() {
  return (
    <section className="bg-beige/40 border-y border-line py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 divide-y lg:divide-y-0 lg:divide-x divide-line/70">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className={`flex items-start gap-4 p-2 ${
                  i > 1 ? "pt-6 lg:pt-2" : ""
                } ${i === 1 ? "pt-2 md:pt-2" : ""} lg:pl-8 first:pl-0`}
              >
                <div className="text-roseDeep bg-ivory rounded-xl w-10 h-10 flex items-center justify-center shadow-[0_2px_12px_rgba(43,43,43,0.03)] border border-line/20 flex-shrink-0">
                  <Icon strokeWidth={1.25} size={18} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-[11px] font-semibold tracking-eyebrow uppercase text-ink">
                    {v.title}
                  </h3>
                  <p className="text-[12px] text-muted font-light leading-snug">
                    {v.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
