"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Heart, ChevronRight, Loader2, RotateCw, ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/product/ProductCard";
import SizeGuideModal from "@/components/product/SizeGuideModal";
import { getProductByHandle, getRelatedProducts } from "@/lib/shopify/products";
import type { NormalizedProduct } from "@/lib/shopify/types";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useUIStore } from "@/lib/store/ui";
import { formatPrice } from "@/lib/utils";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const productHandle = Array.isArray(slug) ? slug[0] : slug;

  const [product, setProduct] = useState<NormalizedProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<NormalizedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [sizeError, setSizeError] = useState(false);

  const addCart = useCartStore((s) => s.add);
  const isAdding = useCartStore((s) => s.isAdding);
  const toggleWishlist = useWishlistStore((s) => s.toggle);
  const wishlistItems = useWishlistStore((s) => s.items);
  const openSizeGuide = useUIStore((s) => s.openSizeGuide);

  const loadData = useCallback(async () => {
    if (!productHandle) return;
    setLoading(true);
    setApiError(null);
    const res = await getProductByHandle(productHandle);

    if (res.error) {
      setApiError(res.error);
      setProduct(null);
    } else {
      setProduct(res.data);
      setApiError(null);

      if (res.data) {
        if (res.data.sizes.length > 0) {
          setSelectedSize(res.data.sizes[0]);
        }
        const related = await getRelatedProducts(res.data.category, res.data.slug, 4);
        setRelatedProducts(related);
      }
    }
    setLoading(false);
  }, [productHandle]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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
          <p className="text-[13px] text-muted font-light">Failed to fetch product details.</p>
          <button
            onClick={loadData}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-rose text-white text-[11px] uppercase font-semibold rounded-xl"
          >
            <RotateCw size={14} /> Retry
          </button>
        </Container>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-ivory min-h-screen py-24 text-center">
        <Container className="py-20 text-center space-y-4">
          <p className="text-[14px] text-muted">Product not found.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-eyebrow font-semibold text-roseDeep hover:underline"
          >
            <ArrowLeft size={14} /> Back to Shop
          </Link>
        </Container>
      </div>
    );
  }

  const isWishlisted = wishlistItems.some((i) => i.slug === product.slug);

  const images = product.shopifyImages.length > 0
    ? product.shopifyImages.map((i) => i.url)
    : [product.images.main, product.images.alt];

  const selectedVariant = product.variants.find((v) =>
    v.options.some((o) => o.value === selectedSize)
  ) || product.variants[0];

  const handleAddToCart = async () => {
    if (!selectedSize && product.sizes.length > 0) {
      setSizeError(true);
      return;
    }
    setSizeError(false);

    await addCart({
      variantId: selectedVariant?.id,
      slug: product.slug,
      name: product.name,
      price: selectedVariant?.price || product.price,
      size: selectedSize || "Standard",
      quantity: 1,
      image: selectedVariant?.image?.url || product.images.main,
    });
  };

  return (
    <div className="bg-ivory min-h-screen py-10 md:py-20 pt-24">
      <Container className="space-y-14 md:space-y-20">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted font-light flex-wrap">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/shop" className="hover:text-ink transition-colors">Shop</Link>
          <ChevronRight size={10} />
          <Link
            href={`/shop?category=${encodeURIComponent(product.category.toLowerCase())}`}
            className="hover:text-ink transition-colors uppercase text-roseDeep font-medium underline underline-offset-4 decoration-roseDeep/40"
          >
            {product.categoryTitle || product.category}
          </Link>
          <ChevronRight size={10} />
          <span className="text-ink font-normal">{product.name}</span>
        </div>

        {/* Product details split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left: Gallery Column */}
          <div className="lg:col-span-7 space-y-3">
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-beige shadow-card">
              <Image
                src={images[activeImageIdx] || product.images.main}
                alt={`${product.name} active display`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                quality={88}
                className="object-cover"
                priority
              />
            </div>
            
            {images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
                {images.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`relative w-14 md:w-20 aspect-[3/4] rounded-lg overflow-hidden bg-beige flex-shrink-0 border-2 transition-all ${
                      activeImageIdx === i ? "border-rose" : "border-transparent opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`${product.name} thumbnail view ${i + 1}`}
                      fill
                      sizes="80px"
                      quality={60}
                      className="object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info details */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="space-y-3">
              {product.badge && (
                <span className="inline-block bg-rose/10 text-roseDeep text-[9px] font-semibold tracking-eyebrow uppercase px-3 py-1 rounded-full border border-rose/25">
                  {product.badge}
                </span>
              )}
              <h1 className="font-serif text-[32px] md:text-[46px] leading-tight text-ink font-light tracking-tight">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-3">
                <p className="text-xl font-medium text-ink">
                  {formatPrice(selectedVariant?.price || product.price)}
                </p>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <p className="text-sm text-muted line-through">
                    {formatPrice(product.compareAtPrice)}
                  </p>
                )}
              </div>
              
              <div className="h-px bg-line/80" />
              
              {product.descriptionHtml ? (
                <div
                  className="text-[13.5px] leading-relaxed text-muted font-light prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              ) : (
                <p className="text-[13.5px] leading-relaxed text-muted font-light">
                  {product.description}
                </p>
              )}
            </div>

            {/* Sizing selection */}
            {product.inStock && product.sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-[11px] font-semibold tracking-eyebrow uppercase text-ink">
                    Select Size
                  </h4>
                  <button
                    onClick={openSizeGuide}
                    className="text-[11px] font-semibold tracking-eyebrow uppercase text-roseDeep hover:text-roseHover underline transition-colors"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => {
                        setSelectedSize(sz);
                        setSizeError(false);
                      }}
                      className={`w-12 h-12 rounded-xl text-[12px] font-semibold border flex items-center justify-center transition-all ${
                        selectedSize === sz
                          ? "bg-ink text-white border-ink"
                          : "bg-transparent text-ink border-line hover:border-ink/40"
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <p className="text-[11px] text-roseDeep font-medium">Please select a size to proceed.</p>
                )}
              </div>
            )}

            {/* CTA area */}
            <div className="pt-1">
              {product.inStock ? (
                <div className="flex items-center gap-3 w-full">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="
                      flex-1 min-w-0
                      h-12
                      inline-flex items-center justify-center gap-2
                      rounded-xl
                      bg-rose text-white
                      text-[11px] font-semibold tracking-[0.18em] uppercase
                      hover:bg-roseHover active:scale-[0.98]
                      transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2
                      disabled:opacity-75
                    "
                  >
                    {isAdding ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Adding to Bag...
                      </>
                    ) : (
                      "Add to Bag"
                    )}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`
                      flex-shrink-0
                      h-12 w-12
                      rounded-xl border
                      flex items-center justify-center
                      transition-colors duration-300
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2
                      ${isWishlisted
                        ? "border-roseDeep text-roseDeep bg-rose/5"
                        : "border-line text-muted hover:border-ink/40 hover:text-ink"
                      }
                    `}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      strokeWidth={1.25}
                      size={20}
                      className={isWishlisted ? "fill-roseDeep" : ""}
                    />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 w-full">
                  <button
                    disabled
                    className="
                      flex-1 h-12
                      inline-flex items-center justify-center
                      rounded-xl
                      bg-muted/40 text-muted
                      text-[11px] font-semibold tracking-[0.18em] uppercase
                      cursor-not-allowed opacity-70
                    "
                  >
                    Out of Stock
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`
                      flex-shrink-0 h-12 w-12
                      rounded-xl border flex items-center justify-center
                      transition-colors duration-300
                      ${isWishlisted
                        ? "border-roseDeep text-roseDeep bg-rose/5"
                        : "border-line text-muted hover:border-ink/40"
                      }
                    `}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart strokeWidth={1.25} size={20} className={isWishlisted ? "fill-roseDeep" : ""} />
                  </button>
                </div>
              )}
            </div>

            {/* Details Accordions */}
            <div className="border-t border-line divide-y divide-line/60">
              <details className="py-4 group" open>
                <summary className="flex justify-between items-center text-[12px] font-semibold tracking-eyebrow uppercase text-ink cursor-pointer list-none select-none">
                  Product Details
                  <span className="text-[14px] transition-transform duration-300 group-open:rotate-180">&#9662;</span>
                </summary>
                <div className="mt-3 text-[13px] text-muted font-light leading-relaxed space-y-1.5 pl-1.5">
                  <p><span className="font-semibold text-ink">Category:</span> {product.categoryTitle}</p>
                  {product.productType && <p><span className="font-semibold text-ink">Type:</span> {product.productType}</p>}
                </div>
              </details>

              <details className="py-4 group">
                <summary className="flex justify-between items-center text-[12px] font-semibold tracking-eyebrow uppercase text-ink cursor-pointer list-none select-none">
                  Shipping & Returns
                  <span className="text-[14px] transition-transform duration-300 group-open:rotate-180">&#9662;</span>
                </summary>
                <div className="mt-3 text-[13px] text-muted font-light leading-relaxed pl-1.5 space-y-2">
                  <p>Standard delivery across Pakistan takes 3 to 5 working days.</p>
                  <p>Unstitched and unworn garments can be exchanged within 14 days of delivery.</p>
                </div>
              </details>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-line">
            <h3 className="font-serif text-[26px] md:text-[32px] text-ink font-light tracking-tight">
              You May Also Like
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}
      </Container>

      <SizeGuideModal />
    </div>
  );
}
