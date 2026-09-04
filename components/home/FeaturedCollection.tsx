"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ProductCard from "@/components/product/ProductCard";
import { getAllProducts } from "@/lib/shopify/products";
import type { NormalizedProduct } from "@/lib/shopify/types";

export default function FeaturedCollection() {
  const [featuredProducts, setFeaturedProducts] = useState<NormalizedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await getAllProducts();
      if (res.data) {
        setFeaturedProducts(res.data.slice(0, 4));
      }
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <section className="bg-ivory section-md relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Text Block */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <RevealOnScroll className="space-y-4">
              <Eyebrow className="text-[11px] sm:text-[12px] tracking-[0.22em]">Featured Collection</Eyebrow>
              <h2 className="font-serif text-[34px] sm:text-[42px] md:text-[48px] lg:text-[44px] xl:text-[52px] leading-[1.08] text-ink font-light tracking-tight mt-3">
                Timeless in
                <br />
                <em className="font-serif italic font-light text-roseDeep">Every Thread</em>
              </h2>
              <p className="text-[14px] sm:text-[15px] lg:text-[15.5px] text-muted leading-relaxed font-light max-w-sm sm:max-w-md">
                A curated selection of hand-block printed cotton and soft lawn sets, capturing traditional motifs in modern silhouettes.
              </p>
              <div className="pt-2 sm:pt-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center text-[12px] font-semibold tracking-[0.2em] uppercase text-ink border-b-2 border-ink pb-1.5 hover:text-roseDeep hover:border-roseDeep transition-colors duration-500 min-h-[44px]"
                >
                  Explore All
                  <span className="ml-2 text-[14px] transition-transform duration-300 group-hover:translate-x-1">&#8594;</span>
                </Link>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-8">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-[3/4] bg-beige/60 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : featuredProducts.length === 0 ? (
              <div className="py-12 text-center text-muted font-light text-[13px] bg-beige/20 rounded-2xl border border-line/50 p-6">
                New handcrafted collections launching soon.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {featuredProducts.map((product, idx) => (
                  <RevealOnScroll key={product.slug} delay={idx * 0.07}>
                    <ProductCard product={product} priority={idx < 2} />
                  </RevealOnScroll>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
