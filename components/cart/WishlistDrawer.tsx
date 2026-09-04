"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import type { NormalizedProduct } from "@/lib/shopify/types";

export default function WishlistDrawer() {
  const items = useWishlistStore((s) => s.items);
  const isOpen = useWishlistStore((s) => s.isOpen);
  const closeWishlist = useWishlistStore((s) => s.closeWishlist);
  const toggle = useWishlistStore((s) => s.toggle);
  const addCart = useCartStore((s) => s.add);

  // Disable body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleMoveToCart = (product: NormalizedProduct) => {
    addCart({
      variantId: product.variants?.[0]?.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      size: product.sizes?.[0] || "Standard",
      quantity: 1,
      image: product.images.main,
    });
    // Remove from wishlist
    toggle(product);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={closeWishlist}
            className="fixed inset-0 bg-ink z-50 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-ivory shadow-drawer z-50 flex flex-col h-full"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-line flex justify-between items-center bg-ivory">
              <div>
                <h3 className="text-[12px] font-semibold tracking-eyebrow uppercase">My Wishlist</h3>
                <p className="text-[11px] text-muted font-light mt-0.5">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={closeWishlist}
                className="hover:text-roseDeep transition-colors p-1"
                aria-label="Close Wishlist"
              >
                <X strokeWidth={1.25} size={20} />
              </button>
            </div>

            {/* Wishlist Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
                  <p className="text-[13px] text-muted">Your wishlist is empty.</p>
                  <button
                    onClick={closeWishlist}
                    className="inline-flex items-center justify-center h-11 px-6 bg-rose/10 text-roseDeep text-[11px] tracking-eyebrow uppercase rounded-xl hover:bg-rose/20 transition-colors duration-300"
                  >
                    Browse Shop
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.slug} className="flex gap-4 items-start border-b border-line/45 pb-6 last:border-b-0">
                    <Link
                      href={`/shop/${item.slug}`}
                      onClick={closeWishlist}
                      className="relative w-20 aspect-[3/4] bg-beige rounded-xl overflow-hidden flex-shrink-0"
                    >
                      <Image
                        src={item.images.main}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <Link
                          href={`/shop/${item.slug}`}
                          onClick={closeWishlist}
                          className="text-[12px] font-medium tracking-eyebrow uppercase text-ink hover:text-roseDeep transition-colors truncate block"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => toggle(item)}
                          className="text-muted hover:text-roseDeep transition-colors"
                          aria-label={`Remove ${item.name} from wishlist`}
                        >
                          <Trash2 strokeWidth={1.25} size={15} />
                        </button>
                      </div>
                      <p className="text-[12px] text-muted font-medium mt-1">{formatPrice(item.price)}</p>

                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="inline-flex items-center justify-center gap-2 h-9 px-4 border border-line rounded-lg text-[11px] font-medium tracking-eyebrow uppercase text-ink hover:bg-beige hover:border-ink transition-colors mt-3"
                      >
                        <ShoppingBag strokeWidth={1.25} size={13} />
                        Add to Bag
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
