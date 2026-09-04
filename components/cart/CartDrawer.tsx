"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const remove = useCartStore((s) => s.remove);
  const updateQty = useCartStore((s) => s.updateQty);
  const initCart = useCartStore((s) => s.initCart);
  const isLoading = useCartStore((s) => s.isLoading);

  // Rehydrate cart from Shopify on mount
  useEffect(() => {
    initCart();
  }, [initCart]);

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

  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);
  const [isRedirecting, setIsRedirecting] = React.useState(false);
  const [checkoutError, setCheckoutError] = React.useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (isRedirecting) return;
    setIsRedirecting(true);
    setCheckoutError(null);

    try {
      const url = await getCheckoutUrl();
      if (url && (url.startsWith("https://") || url.startsWith("http://"))) {
        const parsed = new URL(url);
        console.log("CHECKOUT URL EXISTS: true");
        console.log("CHECKOUT URL HOST:", parsed.hostname);
        console.log("CHECKOUT URL PATH:", parsed.pathname);

        // Direct full browser navigation to external Shopify Checkout
        window.location.href = url;
        return;
      }
      throw new Error("Checkout URL not available");
    } catch (err) {
      console.error("[Checkout Redirect Error]:", err);
      setIsRedirecting(false);
      setCheckoutError("Unable to open checkout. Please try again.");
    }
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
            onClick={closeCart}
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
                <h3 className="text-[12px] font-semibold tracking-eyebrow uppercase">Shopping Bag</h3>
                <p className="text-[11px] text-muted font-light mt-0.5">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="hover:text-roseDeep transition-colors p-1"
                aria-label="Close Cart"
              >
                <X strokeWidth={1.25} size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar space-y-6">
              {isLoading ? (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-3">
                  <Loader2 className="animate-spin text-roseDeep" size={24} />
                  <p className="text-[12px] text-muted font-light">Syncing shopping bag...</p>
                </div>
              ) : items.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
                  <p className="text-[13px] text-muted">Your shopping bag is empty.</p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="inline-flex items-center justify-center h-11 px-6 bg-rose text-white text-[11px] tracking-eyebrow uppercase rounded-xl hover:bg-roseHover transition-colors duration-300"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start border-b border-line/45 pb-6 last:border-b-0">
                    <div className="relative w-20 aspect-[3/4] bg-beige rounded-xl overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-beige" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-[12px] font-medium tracking-eyebrow uppercase text-ink truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => remove(item.id)}
                          className="text-muted hover:text-roseDeep transition-colors"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 strokeWidth={1.25} size={15} />
                        </button>
                      </div>
                      <p className="text-[11px] text-muted mt-1 uppercase font-light">Size: {item.size}</p>
                      <p className="text-[12px] text-muted font-medium mt-1">{formatPrice(item.price)}</p>

                      {/* Quantity Selector */}
                      <div className="flex items-center border border-line rounded-lg w-fit mt-3 h-8">
                        <button
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          className="px-2 hover:text-roseDeep transition-colors h-full flex items-center"
                          aria-label="Decrease quantity"
                        >
                          <Minus strokeWidth={1.25} size={12} />
                        </button>
                        <span className="px-2 text-[12px] font-medium text-ink w-8 text-center select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="px-2 hover:text-roseDeep transition-colors h-full flex items-center"
                          aria-label="Increase quantity"
                        >
                          <Plus strokeWidth={1.25} size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer summary */}
            {items.length > 0 && (
              <div className="border-t border-line px-6 py-6 bg-beige/30 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] font-semibold tracking-eyebrow uppercase text-muted">Subtotal</span>
                  <span className="text-base font-semibold text-ink">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-[11px] text-muted font-light leading-relaxed">
                  Shipping and taxes calculated at secure checkout. Handcrafted packaging included with every order.
                </p>

                {checkoutError && (
                  <p className="text-[11px] text-roseDeep font-medium text-center">{checkoutError}</p>
                )}

                <div className="grid grid-cols-1 gap-2 pt-2">
                  <button
                    onClick={handleCheckout}
                    disabled={isRedirecting}
                    className="inline-flex items-center justify-center gap-2 h-12 bg-rose text-white text-[12px] font-medium tracking-eyebrow uppercase rounded-xl hover:bg-roseHover transition-colors duration-500 ease-luxury text-center w-full disabled:opacity-75"
                  >
                    {isRedirecting ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Redirecting to checkout...
                      </>
                    ) : (
                      <>
                        Proceed to Checkout
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                  <button
                    onClick={closeCart}
                    disabled={isRedirecting}
                    className="h-10 text-[11px] font-medium tracking-eyebrow uppercase text-ink hover:text-roseDeep transition-colors disabled:opacity-50"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
