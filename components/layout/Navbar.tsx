"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { useWishlistStore } from "@/lib/store/wishlist";
import { useUIStore } from "@/lib/store/ui";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/our-story", label: "Our Story" },
  { href: "/artisans", label: "Artisans" },
];

/**
 * Routes where the Navbar starts fully transparent over a full-screen dark hero.
 * Every other route uses the solid/scrolled header from the very first render.
 */
const DARK_HERO_ROUTES = ["/"];

export default function Navbar() {
  const pathname = usePathname();
  const hasDarkHero = DARK_HERO_ROUTES.includes(pathname);

  /**
   * scrolled = true  → solid ivory header (dark text, bottom shadow)
   * scrolled = false → transparent header (ivory text over dark hero)
   *
   * Initial value is synchronous:
   *   – Non-hero pages: always start solid (true)
   *   – Hero pages: start transparent (false), updated by scroll listener
   */
  const [scrolled, setScrolled] = useState(!hasDarkHero);

  /** Which nav link href is currently hovered (null = none) */
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const openCart = useCartStore((s) => s.openCart);
  const openSearch = useUIStore((s) => s.openSearch);

  /**
   * Route change effect: reset scroll state and close mobile menu.
   * Runs synchronously (no setTimeout) so there is zero delay between
   * route change and the header settling into its correct state.
   */
  useEffect(() => {
    const isDark = DARK_HERO_ROUTES.includes(pathname);
    if (!isDark) {
      setScrolled(true);
    } else {
      // Re-read scroll position in case the user navigated back to the homepage
      // while already scrolled — avoids a flash of transparent header.
      setScrolled(window.scrollY > 40);
    }
    setMobileOpen(false);
    setHoveredHref(null);
  }, [pathname]);

  /**
   * Scroll listener — only active on dark-hero pages.
   * Uses requestAnimationFrame to batch rapid scroll events, cancels the
   * previous frame on each new event so only the last position fires.
   */
  useEffect(() => {
    if (!hasDarkHero) return;

    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
      });
    };

    // Read the current position immediately (no rAF delay) for initial mount
    setScrolled(window.scrollY > 40);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [hasDarkHero]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isLinkActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <>
      {/*
       * ── HEADER ────────────────────────────────────────────────────────────
       * Key design decisions:
       *
       * 1. We NEVER toggle `border-b` as a class; instead we use `box-shadow`
       *    via Tailwind's shadow utilities. box-shadow transitions smoothly,
       *    while adding/removing a border class causes an instant layout jump.
       *
       * 2. `transition-[background-color,padding,box-shadow]` only animates
       *    those properties, keeping the transition compositor-friendly.
       *
       * 3. Color differences (text-ink vs text-ivory) are controlled via
       *    individual link styles — NOT a global class toggle — so each
       *    element transitions on its own cadence without fighting each other.
       */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40",
          "transition-[background-color,padding,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "bg-white/97 backdrop-blur-md shadow-[0_1px_0_0_#ECE4DD] py-3"
            : "bg-transparent py-5 shadow-[0_1px_0_0_transparent]"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid grid-cols-3 items-center">

          {/* ── Left: desktop nav ──────────────────────────────────────────── */}
          <nav
            className="hidden md:flex items-center gap-7 text-[11px] font-medium tracking-[0.18em] uppercase"
            aria-label="Main navigation"
            onMouseLeave={() => setHoveredHref(null)}
          >
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              const isHovered = hoveredHref === link.href;
              const someHovered = hoveredHref !== null;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredHref(link.href)}
                  aria-current={isActive ? "page" : undefined}
                  style={{
                    /*
                     * Use inline `color` + `opacity` to avoid Tailwind purge
                     * issues with dynamically-built class strings like text-ink/50.
                     * All color values match the Tailwind design tokens exactly.
                     */
                    color: scrolled
                      ? isActive
                        ? "#C96284"   // roseDeep
                        : "#2B2B2B"   // ink
                      : isActive
                        ? "#D78598"   // rose
                        : "#F8F4EE",  // ivory
                    opacity: someHovered && !isHovered && !isActive ? 0.45 : 1,
                    transition: "color 300ms cubic-bezier(0.22,1,0.36,1), opacity 300ms cubic-bezier(0.22,1,0.36,1)",
                  }}
                  className={cn(
                    "relative",
                    // Underline: always present, transitions width
                    "after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-px after:bg-roseDeep",
                    "after:transition-[width] after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive ? "after:w-full" : "after:w-0 hover:after:w-full",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 rounded-sm"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Mobile: hamburger ──────────────────────────────────────────── */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              style={{
                color: scrolled ? "#2B2B2B" : "#F8F4EE",
                transition: "color 300ms cubic-bezier(0.22,1,0.36,1)",
              }}
              className="p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose rounded-sm hover:text-roseDeep"
            >
              {mobileOpen ? (
                <X strokeWidth={1.25} size={22} />
              ) : (
                <Menu strokeWidth={1.25} size={22} />
              )}
            </button>
          </div>

          {/* ── Center: wordmark ───────────────────────────────────────────── */}
          <Link
            href="/"
            aria-label="Aman Kay Rang home"
            style={{
              color: scrolled ? "#2B2B2B" : "#F8F4EE",
              transition: "color 300ms cubic-bezier(0.22,1,0.36,1)",
            }}
            className="justify-self-center font-serif text-[14px] md:text-[17px] tracking-[0.22em] whitespace-nowrap hover:text-roseDeep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 rounded-sm"
          >
            AMAN&nbsp;KAY&nbsp;RANG
          </Link>

          {/* ── Right: icon actions ────────────────────────────────────────── */}
          <div className="justify-self-end flex items-center gap-3 md:gap-5">
            <button
              onClick={openSearch}
              aria-label="Search"
              style={{
                color: scrolled ? "#2B2B2B" : "#F8F4EE",
                transition: "color 300ms cubic-bezier(0.22,1,0.36,1)",
              }}
              className="p-0.5 hover:text-roseDeep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 rounded-sm"
            >
              <Search strokeWidth={1.25} size={19} />
            </button>

            <Link
              href="/account"
              aria-label="Account"
              style={{
                color: scrolled ? "#2B2B2B" : "#F8F4EE",
                transition: "color 300ms cubic-bezier(0.22,1,0.36,1)",
              }}
              className="hidden md:block p-0.5 hover:text-roseDeep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 rounded-sm"
            >
              <User strokeWidth={1.25} size={19} />
            </Link>

            <Link
              href="/wishlist"
              aria-label={`Wishlist — ${wishlistCount} item${wishlistCount !== 1 ? "s" : ""}`}
              style={{
                color: scrolled ? "#2B2B2B" : "#F8F4EE",
                transition: "color 300ms cubic-bezier(0.22,1,0.36,1)",
              }}
              className="relative hidden md:block p-0.5 hover:text-roseDeep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 rounded-sm"
            >
              <Heart strokeWidth={1.25} size={19} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 text-[10px] text-roseDeep font-semibold leading-none">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={openCart}
              aria-label={`Cart — ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
              style={{
                color: scrolled ? "#2B2B2B" : "#F8F4EE",
                transition: "color 300ms cubic-bezier(0.22,1,0.36,1)",
              }}
              className="relative flex items-center gap-1.5 p-0.5 hover:text-roseDeep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 rounded-sm"
            >
              <ShoppingBag strokeWidth={1.25} size={19} />
              <span className="text-[11px] tracking-[0.18em] uppercase">({cartCount})</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <div
            className="fixed inset-0 z-50 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 left-0 bottom-0 w-72 bg-ivory shadow-xl flex flex-col pt-24 pb-10 px-8 gap-6"
            >
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "font-serif text-[22px] font-light transition-colors duration-300",
                      isActive ? "text-roseDeep" : "text-ink hover:text-roseDeep"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="mt-auto border-t border-line/60 pt-6 space-y-4">
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="block text-[12px] tracking-[0.18em] uppercase text-muted hover:text-roseDeep transition-colors"
                >
                  Account
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="block text-[12px] tracking-[0.18em] uppercase text-muted hover:text-roseDeep transition-colors"
                >
                  Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block text-[12px] tracking-[0.18em] uppercase text-muted hover:text-roseDeep transition-colors"
                >
                  Contact
                </Link>
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
