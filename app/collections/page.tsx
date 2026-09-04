"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RotateCw, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { getAllCollections } from "@/lib/shopify/collections";
import type { NormalizedCollection } from "@/lib/shopify/types";

export default function CollectionsPage() {
  const [collections, setCollections] = useState<NormalizedCollection[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const fetchCollections = async () => {
    setLoading(true);
    setApiError(null);
    const res = await getAllCollections();
    if (res.error) {
      setApiError(res.error);
      setCollections([]);
    } else {
      setCollections(res.data);
      setApiError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div className="bg-ivory min-h-screen py-12 md:py-20 pt-24">
      <Container className="space-y-10 md:space-y-14">
        {/* Header */}
        <div className="max-w-2xl space-y-4">
          <Eyebrow className="text-[11px] sm:text-[12px] tracking-[0.22em]">Seasonal Themes</Eyebrow>
          <h1 className="font-serif text-[38px] sm:text-[50px] md:text-[60px] leading-tight text-ink font-light tracking-tight">
            Our Collections
          </h1>
          <p className="text-[14px] sm:text-[15px] leading-relaxed text-muted font-light max-w-xl">
            Each collection is a distinct study in texture and regional craft technique, woven with generational mastery.
          </p>
        </div>

        {/* 1. Loading state */}
        {loading ? (
          <div className="space-y-8">
            {[1, 2].map((i) => (
              <div key={i} className="h-80 bg-beige/60 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : apiError ? (
          /* 2. API Error State */
          <div className="py-20 text-center max-w-md mx-auto space-y-5 bg-beige/20 p-8 rounded-2xl border border-line/60">
            <div className="w-12 h-12 rounded-full bg-rose/10 text-roseDeep flex items-center justify-center mx-auto">
              <RotateCw size={20} />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-[24px] text-ink font-light">Collections Load Error</h3>
              <p className="text-[13px] text-muted font-light leading-relaxed">
                Could not load collections. Please check your connection.
              </p>
            </div>
            <button
              onClick={fetchCollections}
              className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-rose text-white text-[11px] font-semibold tracking-eyebrow uppercase rounded-xl hover:bg-roseHover transition-colors"
            >
              <RotateCw size={14} />
              Retry Connection
            </button>
          </div>
        ) : collections.length === 0 ? (
          /* 3. Empty Collections State */
          <div className="py-24 text-center max-w-lg mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-beige/60 border border-line flex items-center justify-center mx-auto text-roseDeep">
              <Sparkles strokeWidth={1.25} size={28} />
            </div>
            <div className="space-y-3">
              <span className="text-[11px] tracking-[0.22em] uppercase font-semibold text-roseDeep">
                Aman Kay Rang Line
              </span>
              <h2 className="font-serif text-[32px] md:text-[40px] font-light text-ink leading-tight">
                No Collections Created Yet
              </h2>
              <p className="text-[14px] leading-relaxed text-muted font-light">
                New seasonal lines will appear here soon.
              </p>
            </div>
          </div>
        ) : (
          /* 4. Real Collections List */
          <div className="space-y-10 sm:space-y-14">
            {collections.map((col) => (
              <RevealOnScroll key={col.slug}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-stretch bg-beige/30 rounded-2xl overflow-hidden shadow-card border border-line/45">
                  <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto min-h-[280px] sm:min-h-[340px] lg:min-h-[420px] w-full bg-beige">
                    {col.image ? (
                      <Image
                        src={col.image}
                        alt={col.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-[1200ms] ease-luxury hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="w-full h-full bg-beige flex items-center justify-center text-muted font-serif text-xl font-light">
                        {col.name}
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-center space-y-5 sm:space-y-6">
                    <span className="text-[11px] sm:text-[12px] tracking-[0.22em] uppercase font-semibold text-roseDeep">
                      {col.featured ? "Featured Collection" : "Heritage Line"}
                    </span>
                    <h3 className="font-serif text-[32px] sm:text-[40px] md:text-[46px] lg:text-[42px] xl:text-[48px] leading-[1.08] text-ink font-light tracking-tight">
                      {col.name}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] lg:text-[15.5px] leading-relaxed text-muted font-light max-w-lg">
                      {col.description}
                    </p>
                    <div className="pt-2 sm:pt-4">
                      <Link
                        href={`/collections/${col.slug}`}
                        className="inline-flex items-center justify-center h-12 px-8 bg-rose text-white text-[12px] font-semibold tracking-[0.2em] uppercase rounded-xl hover:bg-roseHover transition-colors duration-500 shadow-sm"
                      >
                        View Collection
                      </Link>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
