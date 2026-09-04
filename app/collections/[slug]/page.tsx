"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, Loader2, RotateCw } from "lucide-react";
import Container from "@/components/ui/Container";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ProductCard from "@/components/product/ProductCard";
import { getCollectionByHandle } from "@/lib/shopify/collections";
import type { NormalizedCollection } from "@/lib/shopify/types";

export default function SingleCollectionPage() {
  const { slug } = useParams();
  const collectionHandle = Array.isArray(slug) ? slug[0] : slug;

  const [collection, setCollection] = useState<NormalizedCollection | null>(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const loadCollection = useCallback(async () => {
    if (!collectionHandle) return;
    setLoading(true);
    setApiError(null);
    const res = await getCollectionByHandle(collectionHandle);
    if (res.error) {
      setApiError(res.error);
      setCollection(null);
    } else {
      setCollection(res.data);
      setApiError(null);
    }
    setLoading(false);
  }, [collectionHandle]);

  useEffect(() => {
    loadCollection();
  }, [loadCollection]);

  if (loading) {
    return (
      <div className="bg-ivory min-h-screen py-32 flex justify-center items-center">
        <Loader2 className="animate-spin text-roseDeep" size={32} />
      </div>
    );
  }

  if (apiError) {
    return (
      <div className="bg-ivory min-h-screen py-24 text-center">
        <Container className="max-w-md space-y-4">
          <h3 className="font-serif text-2xl text-ink font-light">Connection Error</h3>
          <p className="text-[13px] text-muted font-light">Failed to fetch collection details.</p>
          <button
            onClick={loadCollection}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-rose text-white text-[11px] uppercase font-semibold rounded-xl"
          >
            <RotateCw size={14} /> Retry
          </button>
        </Container>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="bg-ivory min-h-screen py-24 text-center">
        <Container className="space-y-4">
          <p className="text-[14px] text-muted">Collection not found in Shopify.</p>
          <Link href="/collections" className="text-roseDeep underline mt-4 inline-block">
            Back to Collections
          </Link>
        </Container>
      </div>
    );
  }

  const products = collection.products || [];

  return (
    <div className="bg-ivory min-h-screen py-12 md:py-20 pt-24">
      <Container className="space-y-16">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted font-light">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/collections" className="hover:text-ink transition-colors">Collections</Link>
          <ChevronRight size={10} />
          <span className="text-ink font-normal">{collection.name}</span>
        </div>

        {/* Collection Hero Spread */}
        <div className="relative aspect-[16/8] md:aspect-[16/6] w-full rounded-xl overflow-hidden bg-beige shadow-card">
          {collection.image && (
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-ink/20" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 text-white">
            <span className="text-[10px] tracking-eyebrow uppercase font-semibold text-rose/90">
              Collection Showcase
            </span>
            <h1 className="font-serif text-[32px] md:text-[48px] font-light mt-1">
              {collection.name}
            </h1>
          </div>
        </div>

        {/* Editorial Description */}
        {collection.description && (
          <div className="max-w-2xl space-y-4">
            <h2 className="font-serif text-[24px] md:text-[32px] text-ink font-light tracking-tight">
              About the Collection
            </h2>
            <p className="text-[13.5px] leading-relaxed text-muted font-light">
              {collection.description}
            </p>
          </div>
        )}

        {/* Product Grid */}
        <div className="space-y-8">
          <div className="flex justify-between items-baseline text-[11px] uppercase tracking-wider text-muted font-light border-b border-line/60 pb-3">
            <span>{products.length} items available</span>
            <span>PKR / Pakistan</span>
          </div>

          {products.length === 0 ? (
            <div className="py-16 text-center text-muted text-[13px] font-light">
              No products found in this collection.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {products.map((product, idx) => (
                <RevealOnScroll key={product.slug} delay={(idx % 4) * 0.1}>
                  <ProductCard product={product} />
                </RevealOnScroll>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
