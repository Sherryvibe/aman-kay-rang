"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Instagram, Facebook, Twitter } from "lucide-react";

const shopLinks = [
  { href: "/collections", label: "All Collections" },
  { href: "/shop", label: "New Arrivals" },
  { href: "/shop?category=stitched", label: "Stitched Sets" },
  { href: "/shop?category=unstitched", label: "Unstitched Fabric" },
];

const careLinks = [
  { href: "/contact", label: "Contact Us" },
  { href: "/size-guide", label: "Size Guide" },
  { href: "/shipping", label: "Shipping & Delivery" },
  { href: "/returns", label: "Returns & Exchanges" },
];

const storyLinks = [
  { href: "/our-story", label: "About Us" },
  { href: "/artisans", label: "Our Artisans" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/journal", label: "Journal" },
];

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h4 className="text-[11px] tracking-[0.2em] uppercase text-ink mb-5 font-medium">{title}</h4>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[13px] text-muted hover:text-roseDeep transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 rounded-sm"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <footer className="bg-ivory border-t border-line/60 pt-14 md:pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Link
              href="/"
              className="font-serif text-[17px] tracking-[0.22em] text-ink whitespace-nowrap hover:text-roseDeep transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 rounded-sm"
            >
              AMAN&nbsp;KAY&nbsp;RANG
            </Link>
            <p className="mt-5 text-[13px] leading-relaxed text-muted max-w-xs">
              Handcrafted stories, woven into every thread. A tribute to Aman — celebrating heritage, craftsmanship, and quiet beauty.
            </p>
            <div className="mt-8 flex items-center gap-5 text-ink">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on Instagram"
                className="hover:text-roseDeep transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 rounded-sm"
              >
                <Instagram strokeWidth={1.25} size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on Facebook"
                className="hover:text-roseDeep transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 rounded-sm"
              >
                <Facebook strokeWidth={1.25} size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow us on Twitter"
                className="hover:text-roseDeep transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 rounded-sm"
              >
                <Twitter strokeWidth={1.25} size={18} />
              </a>
            </div>
          </div>

          <FooterCol title="Shop" links={shopLinks} />
          <FooterCol title="Customer Care" links={careLinks} />
          <FooterCol title="Our Story" links={storyLinks} />
        </div>

        {/* Newsletter */}
        <div className="mt-20 pt-10 border-t border-line/60 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-roseDeep font-medium">Stay in the story</p>
            <h3 className="font-serif text-2xl md:text-3xl text-ink mt-2 font-light">
              Receive new arrivals &amp; journal entries.
            </h3>
          </div>
          {status === "success" ? (
            <p className="text-[13px] text-roseDeep font-medium">Thank you — check your inbox.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 h-12 px-5 rounded-xl bg-white border border-line text-[14px] text-ink placeholder:text-muted/60 focus:outline-none focus:border-rose transition-colors focus-visible:ring-2 focus-visible:ring-rose"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-12 px-7 bg-rose text-white text-[11px] tracking-[0.2em] uppercase rounded-xl hover:bg-roseHover transition-colors duration-500 disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2"
              >
                {status === "loading" ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
                ) : "Subscribe"}
              </button>
            </form>
          )}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col md:flex-row justify-between gap-4 text-[11px] tracking-[0.15em] uppercase text-muted">
          <p>© {new Date().getFullYear()} Aman Kay Rang. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-roseDeep transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose rounded-sm">Privacy</Link>
            <Link href="/terms" className="hover:text-roseDeep transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose rounded-sm">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
