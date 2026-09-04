"use client";
import Link from "next/link";
import Image from "next/image";
import { X, ShoppingBag, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";

export default function WishlistPage() {
  const items = useWishlistStore((s) => s.items);
  const toggle = useWishlistStore((s) => s.toggle);
  const addToCart = useCartStore((s) => s.add);
  const openCart = useCartStore((s) => s.openCart);

  const handleAddToCart = (product: (typeof items)[0]) => {
    addToCart({
      variantId: product.variants?.[0]?.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      size: product.sizes?.[0] || "Standard",
      quantity: 1,
      image: product.images.main,
    });
    openCart();
  };

  return (
    <div className="bg-ivory min-h-screen pt-20">
      <div className="bg-beige py-16 md:py-20 border-b border-line/60">
        <Container>
          <Eyebrow>Your Wishlist</Eyebrow>
          <h1 className="font-serif text-[38px] md:text-[54px] font-light text-ink mt-3 leading-tight">
            Pieces You Love
          </h1>
        </Container>
      </div>

      <div className="py-12 md:py-20">
        <Container>
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-32 text-center gap-6">
              <div className="w-16 h-16 rounded-full bg-beige flex items-center justify-center">
                <Heart strokeWidth={1.25} size={28} className="text-rose" />
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-2xl font-light text-ink">Your wishlist is empty</h2>
                <p className="text-[13px] text-muted max-w-xs mx-auto leading-relaxed">
                  Save pieces you love by tapping the heart on any product.
                </p>
              </div>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center h-12 px-8 bg-rose text-white text-[11px] font-semibold tracking-[0.2em] uppercase rounded-xl hover:bg-roseHover transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            /* Wishlist grid */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              <AnimatePresence>
                {items.map((product, idx) => (
                  <motion.div
                    key={product.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="relative bg-ivory rounded-xl overflow-hidden shadow-card group"
                  >
                    {/* Remove button */}
                    <button
                      onClick={() => toggle(product)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-ivory/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-line/30 hover:bg-roseDeep hover:text-white hover:border-roseDeep transition-colors duration-300"
                    >
                      <X strokeWidth={1.5} size={12} />
                    </button>

                    {/* Product image */}
                    <Link href={`/shop/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden bg-beige">
                      <Image
                        src={product.images.main}
                        alt={`${product.name} — wishlist item`}
                        fill
                        quality={90}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover object-center transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                      />
                    </Link>

                    {/* Info */}
                    <div className="p-4 space-y-3">
                      <div>
                        <Link href={`/shop/${product.slug}`}>
                          <h3 className="text-[12px] font-medium tracking-[0.15em] uppercase text-ink hover:text-roseDeep transition-colors duration-300">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-[12px] font-semibold text-ink mt-1">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full flex items-center justify-center gap-2 h-10 bg-rose text-white text-[10px] font-semibold tracking-[0.18em] uppercase rounded-xl hover:bg-roseHover transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose"
                      >
                        <ShoppingBag strokeWidth={1.25} size={14} />
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}
