"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ProductCard from "@/components/product/ProductCard";
import { getAllProducts } from "@/lib/shopify/products";
import type { NormalizedProduct } from "@/lib/shopify/types";

export default function NewArrivals() {
  const [newProducts, setNewProducts] = useState<NormalizedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await getAllProducts();
      if (res.data) {
        setNewProducts(res.data.slice(4, 8));
      }
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <section className="bg-ivory section-md relative overflow-hidden border-t border-line/45">
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Left Text Block */}
          <div className="w-full lg:w-1/4 space-y-5 lg:sticky lg:top-28">
            <RevealOnScroll>
              <Eyebrow>New Arrivals</Eyebrow>
              <h2 className="font-serif text-[30px] md:text-[44px] leading-[1.1] text-ink font-light tracking-tight mt-3">
                Freshly Crafted
                <br />
                <em className="font-serif italic font-light text-roseDeep">For You</em>
              </h2>
              <p className="text-[13px] text-muted leading-relaxed font-light mt-4 max-w-xs">
                Discover our latest lightweight lawn sets and stitched kurtis, tailor-made for clean structures and daily elegance.
              </p>
              <div className="pt-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center text-[11px] font-semibold tracking-eyebrow uppercase text-ink border-b border-ink pb-1.5 hover:text-roseDeep hover:border-roseDeep transition-colors duration-500"
                >
                  View All
                </Link>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Product Grid */}
          <div className="w-full lg:w-3/4">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-[3/4] bg-beige/60 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : newProducts.length === 0 ? (
              <div className="py-12 text-center text-muted font-light text-[13px] bg-beige/20 rounded-2xl border border-line/50 p-6">
                Fresh handcrafted arrivals dropping soon.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {newProducts.map((product, idx) => (
                  <RevealOnScroll key={product.slug} delay={idx * 0.07}>
                    <ProductCard product={product} />
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
