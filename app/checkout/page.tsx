"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, ExternalLink, RotateCw } from "lucide-react";
import Container from "@/components/ui/Container";
import { useCartStore } from "@/lib/store/cart";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const checkoutUrl = useCartStore((s) => s.checkoutUrl);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function handleRedirect() {
      if (items.length === 0) {
        return;
      }

      setError(null);

      try {
        const url = await getCheckoutUrl();
        if (isMounted && url && (url.startsWith("https://") || url.startsWith("http://"))) {
          const parsed = new URL(url);
          console.log("CHECKOUT URL EXISTS: true");
          console.log("CHECKOUT URL HOST:", parsed.hostname);
          console.log("CHECKOUT URL PATH:", parsed.pathname);

          // Direct browser navigation to Shopify Hosted Checkout
          window.location.href = url;
          return;
        }

        if (isMounted) {
          setError("Unable to retrieve checkout link from Shopify. Please try again.");
        }
      } catch (err) {
        console.error("[Checkout Page Error]:", err);
        if (isMounted) {
          setError("Unable to open checkout. Please try again.");
        }
      }
    }

    handleRedirect();

    return () => {
      isMounted = false;
    };
  }, [items, getCheckoutUrl]);

  if (items.length === 0) {
    return (
      <div className="bg-ivory min-h-screen py-24 text-center flex items-center justify-center">
        <Container className="space-y-6">
          <p className="text-[14px] text-muted">Your shopping bag is empty.</p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center h-12 px-8 bg-rose text-white text-[12px] tracking-eyebrow uppercase rounded-xl hover:bg-roseHover transition-colors duration-500"
          >
            Continue Shopping
          </Link>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-ivory min-h-screen py-32 text-center flex items-center justify-center">
        <Container className="max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="font-serif text-[28px] text-ink font-light">Checkout Error</h1>
            <p className="text-[13.5px] text-muted font-light">{error}</p>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 h-11 px-6 bg-rose text-white text-[11px] font-semibold tracking-eyebrow uppercase rounded-xl hover:bg-roseHover transition-colors"
            >
              <RotateCw size={14} /> Retry Checkout
            </button>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center h-11 px-6 bg-beige/60 border border-line text-ink text-[11px] font-semibold tracking-eyebrow uppercase rounded-xl hover:bg-beige transition-colors"
            >
              Return to Shop
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen py-32 text-center flex items-center justify-center">
      <Container className="max-w-md space-y-6">
        <Loader2 className="animate-spin text-roseDeep mx-auto" size={32} />
        <div className="space-y-2">
          <h1 className="font-serif text-[28px] text-ink font-light">Redirecting to Secure Checkout</h1>
          <p className="text-[13px] text-muted font-light">
            Taking you to our secure checkout page to complete your Aman Kay Rang order.
          </p>
        </div>

        {checkoutUrl && (
          <a
            href={checkoutUrl}
            className="inline-flex items-center justify-center gap-2 h-12 px-8 bg-rose text-white text-[12px] tracking-eyebrow uppercase rounded-xl hover:bg-roseHover transition-colors duration-500 w-full"
          >
            Click here if you are not redirected automatically
            <ExternalLink size={14} />
          </a>
        )}
      </Container>
    </div>
  );
}
