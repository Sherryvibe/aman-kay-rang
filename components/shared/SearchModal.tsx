"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/lib/store/ui";
import { searchProducts } from "@/lib/shopify/products";
import type { NormalizedProduct } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/utils";

export default function SearchModal() {
  const isOpen = useUIStore((s) => s.isSearchOpen);
  const closeSearch = useUIStore((s) => s.closeSearch);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<NormalizedProduct[]>([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    const timer = setTimeout(async () => {
      const matches = await searchProducts(query, 8);
      setResults(matches);
      setSearching(false);
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex flex-col justify-start">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="absolute inset-0 bg-ink"
          />

          {/* Search container */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative bg-ivory border-b border-line w-full px-6 py-10 md:py-16 flex flex-col items-center"
          >
            <div className="max-w-[800px] w-full relative">
              <button
                onClick={closeSearch}
                className="absolute right-0 -top-8 text-muted hover:text-ink transition-colors p-1"
                aria-label="Close search"
              >
                <X strokeWidth={1.25} size={24} />
              </button>

              <div className="relative flex items-center border-b border-ink/40 py-2">
                <Search strokeWidth={1.25} size={22} className="text-muted mr-3" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search our heritage collections..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-transparent border-none text-[16px] md:text-[18px] text-ink placeholder:text-muted/65 focus:outline-none w-full font-light"
                />
                {searching && <Loader2 className="animate-spin text-roseDeep ml-2" size={18} />}
              </div>

              {/* Suggestions / Results */}
              <div className="mt-8 overflow-y-auto max-h-[50vh] no-scrollbar">
                {query && !searching && results.length === 0 ? (
                  <p className="text-[13px] text-muted text-center py-6">
                    No results found for &ldquo;{query}&rdquo;. Try searching for &ldquo;Lawn&rdquo; or &ldquo;Naz&rdquo;.
                  </p>
                ) : results.length > 0 ? (
                  <div className="space-y-4">
                    <h4 className="text-[10px] tracking-eyebrow uppercase text-roseDeep font-semibold">
                      Results ({results.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {results.map((product) => (
                        <Link
                          key={product.slug}
                          href={`/shop/${product.slug}`}
                          onClick={closeSearch}
                          className="flex gap-4 p-3 bg-beige/35 rounded-xl hover:bg-beige/65 transition-colors group"
                        >
                          <div className="relative w-12 aspect-[3/4] bg-beige rounded-lg overflow-hidden flex-shrink-0">
                            {product.images.main ? (
                              <Image
                                src={product.images.main}
                                alt={product.name}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-beige" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <h5 className="text-[12px] font-semibold tracking-eyebrow uppercase text-ink group-hover:text-roseDeep transition-colors truncate">
                              {product.name}
                            </h5>
                            <p className="text-[11px] text-muted uppercase font-light mt-0.5">{product.categoryTitle || product.category}</p>
                            <p className="text-[11px] font-medium text-ink mt-1">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h4 className="text-[10px] tracking-eyebrow uppercase text-muted font-semibold">
                      Suggested Searches
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Gul-e-Naz", "Unstitched", "Lawn", "Chikankari", "Stitched"].map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-4 py-2 bg-beige/40 hover:bg-beige/80 rounded-xl text-[12px] text-ink transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
