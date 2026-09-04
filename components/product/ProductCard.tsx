"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlistStore } from "@/lib/store/wishlist";
import { formatPrice } from "@/lib/utils";
import type { NormalizedProduct } from "@/lib/shopify/types";

interface Props {
  product: NormalizedProduct;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: Props) {
  const [hovered, setHovered] = useState(false);
  const [altLoaded, setAltLoaded] = useState(false);
  const wishlistItems = useWishlistStore((s) => s.items);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const isWishlisted = wishlistItems.some((i) => i.slug === product.slug);

  const handleMouseEnter = () => {
    setHovered(true);
    if (!altLoaded) setAltLoaded(true);
  };

  const mainImage = product.shopifyImages?.[0]?.url || product.images.main;
  const altImage = product.shopifyImages?.[1]?.url || product.images.alt || mainImage;

  return (
    <div
      className="group relative flex flex-col h-full bg-ivory rounded-xl overflow-hidden shadow-card transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-cardHover hover:-translate-y-0.5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container */}
      <Link href={`/shop/${product.slug}`} className="relative aspect-[3/4] w-full overflow-hidden block bg-beige product-image-wrapper">
        {/* Main image */}
        <Image
          src={mainImage}
          alt={`${product.name} — handcrafted Pakistani ${product.category} suit`}
          fill
          quality={80}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover object-center transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            hovered ? "scale-[1.04] opacity-0" : "scale-100 opacity-100"
          }`}
          priority={priority}
        />

        {/* Alt image — loaded on hover */}
        {altLoaded && (
          <Image
            src={altImage}
            alt={`${product.name} alternate view`}
            fill
            quality={75}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover object-center absolute inset-0 transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              hovered ? "scale-[1.04] opacity-100" : "scale-100 opacity-0"
            }`}
          />
        )}

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-ivory/90 backdrop-blur-sm text-ink text-[9px] font-semibold tracking-[0.15em] uppercase px-3 py-1 rounded-full z-10 shadow-sm border border-line/30">
            {product.badge}
          </span>
        )}

        {/* Wishlist button */}
        <AnimatePresence>
          {hovered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product);
              }}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-ivory/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-line/30 hover:bg-rose hover:text-white transition-colors duration-300"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                strokeWidth={1.25}
                size={14}
                className={isWishlisted ? "fill-roseDeep text-roseDeep" : "text-ink"}
              />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Quick View pill */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10"
            >
              <div className="flex items-center gap-1.5 bg-ivory/95 backdrop-blur-sm text-ink text-[10px] font-medium tracking-[0.15em] uppercase px-4 py-2 rounded-full shadow-sm border border-line/30">
                <Eye strokeWidth={1.25} size={12} />
                Quick View
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Link>

      {/* Product Info */}
      <div className="p-3.5 md:p-4 flex flex-col flex-1 justify-between gap-2">
        <div className="space-y-1">
          <Link href={`/shop/${product.slug}`} className="block">
            <h3 className="text-[12px] font-medium tracking-[0.15em] uppercase text-ink group-hover:text-roseDeep transition-colors duration-300">
              {product.name}
            </h3>
          </Link>
          <p className="text-[11px] text-muted uppercase font-light tracking-wider">
            {product.categoryTitle || product.category}
          </p>
        </div>

        <div className="flex justify-between items-center mt-2 pt-2 border-t border-line/40">
          <div className="flex items-baseline gap-2">
            <span className="text-[12px] font-semibold text-ink">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-[10px] text-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className="text-muted hover:text-roseDeep p-1.5 rounded-full hover:bg-beige/40 transition-colors duration-300"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              strokeWidth={1.25}
              size={15}
              className={isWishlisted ? "fill-roseDeep text-roseDeep" : "text-muted"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
