"use client";
import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { RotateCw, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ProductCard from "@/components/product/ProductCard";
import { getAllProducts } from "@/lib/shopify/products";
import type { NormalizedProduct } from "@/lib/shopify/types";
import { cn } from "@/lib/utils";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");

  const [products, setProducts] = useState<NormalizedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [selectedCat, setSelectedCat] = useState("all");

  const fetchProducts = async () => {
    setLoading(true);
    setApiError(null);
    const result = await getAllProducts();
    if (result.error) {
      setApiError(result.error);
      setProducts([]);
    } else {
      setProducts(result.data);
      setApiError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Dynamically derive category filter chips from live Shopify products
  const categories = useMemo(() => {
    const chipSet = new Map<string, string>();
    chipSet.set("all", "All");

    products.forEach((p) => {
      if (p.category) {
        const key = p.category.toLowerCase();
        const label = p.categoryTitle || p.category.charAt(0).toUpperCase() + p.category.slice(1);
        chipSet.set(key, label);
      }
      if (p.badge) {
        const key = p.badge.toLowerCase();
        chipSet.set(key, p.badge);
      }
    });

    return Array.from(chipSet.entries()).map(([key, label]) => ({ key, label }));
  }, [products]);

  useEffect(() => {
    if (categoryParam) {
      const lower = categoryParam.toLowerCase();
      setSelectedCat(lower);
    } else {
      setSelectedCat("all");
    }
  }, [categoryParam]);

  const handleCategoryChange = (key: string) => {
    setSelectedCat(key);
    if (key === "all") {
      router.push("/shop", { scroll: false });
    } else {
      router.push(`/shop?category=${encodeURIComponent(key)}`, { scroll: false });
    }
  };

  const filteredProducts = useMemo(() => {
    if (selectedCat === "all") return products;
    return products.filter(
      (p) =>
        p.category.toLowerCase() === selectedCat ||
        p.productType.toLowerCase() === selectedCat ||
        (p.badge && p.badge.toLowerCase() === selectedCat) ||
        p.tags.some((t) => t.toLowerCase() === selectedCat)
    );
  }, [selectedCat, products]);

  return (
    <div className="bg-ivory min-h-screen pt-20">
      {/* Editorial banner */}
      <div className="relative bg-[#F4EFE6] py-12 md:py-16 border-b border-line/60 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/Banner Image 1.png"
            alt="Aman Kay Rang — Heritage Collection Editorial"
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-center opacity-100"
          />
        </div>
        <Container className="relative z-10">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose/10 border border-rose/25 text-roseDeep text-[10px] tracking-[0.22em] uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-roseDeep animate-pulse" />
              Handcrafted Stories
            </div>
            <h1 className="font-serif text-[38px] sm:text-[46px] md:text-[54px] leading-[1.08] text-ink font-light tracking-tight">
              The Heritage Shop
            </h1>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-muted font-light max-w-lg">
              Explore our curated catalog of traditional Pakistani wear, handcrafted with ancestral art.
            </p>
          </div>
        </Container>
      </div>

      <div className="py-8 md:py-14">
        <Container className="space-y-10">
          {/* Category filter chips — shown when products exist */}
          {categories.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-line/60 pb-6">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryChange(cat.key)}
                  className={cn(
                    "flex-shrink-0 px-5 py-2.5 rounded-xl text-[11px] tracking-[0.18em] uppercase font-medium transition-all duration-300 border",
                    selectedCat === cat.key
                      ? "bg-rose text-white border-rose shadow-sm"
                      : "bg-beige/40 text-ink border-line hover:bg-beige/80 hover:border-ink/30"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          {/* Results count or status */}
          {!loading && !apiError && products.length > 0 && (
            <div className="text-[11px] uppercase tracking-wider text-muted font-light">
              Showing {filteredProducts.length} item{filteredProducts.length !== 1 ? "s" : ""}
            </div>
          )}

          {/* 1. Loading Skeleton */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="aspect-[3/4] bg-beige/60 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : apiError ? (
            /* 2. API Error State */
            <div className="py-20 text-center max-w-md mx-auto space-y-5 bg-beige/20 p-8 rounded-2xl border border-line/60">
              <div className="w-12 h-12 rounded-full bg-rose/10 text-roseDeep flex items-center justify-center mx-auto">
                <RotateCw size={20} />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-[24px] text-ink font-light">Connection Issue</h3>
                <p className="text-[13px] text-muted font-light leading-relaxed">
                  We are currently experiencing a brief connection delay. Please try refreshing.
                </p>
              </div>
              <button
                onClick={fetchProducts}
                className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-rose text-white text-[11px] font-semibold tracking-eyebrow uppercase rounded-xl hover:bg-roseHover transition-colors"
              >
                <RotateCw size={14} />
                Retry Connection
              </button>
            </div>
          ) : products.length === 0 ? (
            /* 3. Elegant Empty Catalog State */
            <div className="py-24 text-center max-w-lg mx-auto space-y-6">
              <div className="w-16 h-16 rounded-full bg-beige/60 border border-line flex items-center justify-center mx-auto text-roseDeep">
                <Sparkles strokeWidth={1.25} size={28} />
              </div>
              <div className="space-y-3">
                <span className="text-[11px] tracking-[0.22em] uppercase font-semibold text-roseDeep">
                  Aman Kay Rang • Heritage Collection
                </span>
                <h2 className="font-serif text-[32px] md:text-[40px] font-light text-ink leading-tight">
                  No Products Available Yet
                </h2>
                <p className="text-[14px] leading-relaxed text-muted font-light">
                  Our catalog is currently being prepared with new handcrafted collections. Please check back soon.
                </p>
              </div>
            </div>
          ) : (
            /* 4. Real Shopify Product Grid */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product, idx) => (
                <RevealOnScroll key={product.slug} delay={(idx % 4) * 0.08}>
                  <ProductCard product={product} priority={idx < 4} />
                </RevealOnScroll>
              ))}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="bg-ivory min-h-screen pt-20" />}>
      <ShopContent />
    </Suspense>
  );
}
