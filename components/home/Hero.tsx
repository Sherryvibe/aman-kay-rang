"use client";
import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { getImageProps } from "next/image";
import Link from "next/link";
import BotanicalDecor from "@/components/ui/BotanicalDecor";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();

  // Parallax — skip on reduced motion
  const y = useTransform(scrollY, [0, 800], reduced ? [0, 0] : [0, 160]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.85,
      delay: reduced ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  // Next.js responsive art-direction configuration
  const commonImageProps = {
    alt: "Aman Kay Rang — Handcrafted Stories, Woven Into Every Thread",
    fill: true,
    priority: true,
    quality: 92,
  };

  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...commonImageProps,
    src: "/images/hero/hero-desktop.png",
    sizes: "(min-width: 768px) 100vw, 1px",
  });

  const {
    props: { srcSet: mobileSrcSet, ...imgFallbackProps },
  } = getImageProps({
    ...commonImageProps,
    src: "/images/hero/hero-mobile.png",
    sizes: "(max-width: 767px) 100vw, 1px",
  });

  return (
    <section className="relative h-[100svh] min-h-[600px] md:h-screen md:min-h-[720px] w-full overflow-hidden bg-beige">
      {/* Parallax image layer with true responsive art direction */}
      <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
        <picture className="absolute inset-0 block w-full h-full">
          <source media="(max-width: 767px)" srcSet={mobileSrcSet} />
          <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
          <img
            {...imgFallbackProps}
            alt="Aman Kay Rang — Handcrafted Stories, Woven Into Every Thread"
            className="w-full h-full object-cover object-[center_top] md:object-[75%_20%]"
            style={{ ...imgFallbackProps.style, backgroundColor: "#E8DDD3" }}
          />
        </picture>

        {/* Top gradient scrim for transparent header contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-transparent z-10 pointer-events-none" />

        {/* Mobile vertical gradient scrim (preserves models' faces at top, ensures text readability at bottom) */}
        <div className="block md:hidden absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10 pointer-events-none" />

        {/* Desktop horizontal gradient scrim (soft shade on left for text, clear view of models on right) */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10 pointer-events-none" />
      </motion.div>

      {/* Botanical decorative SVGs */}
      <BotanicalDecor
        position="top-left"
        variant="cherry"
        className="text-rose/30 w-44 sm:w-56 md:w-72 z-20 pointer-events-none"
      />
      <BotanicalDecor
        position="bottom-right"
        variant="cherry"
        className="text-rose/25 w-40 sm:w-48 md:w-64 z-20 pointer-events-none"
      />

      {/* Content — fades out on scroll */}
      <motion.div
        style={{ opacity }}
        className="relative h-full max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col justify-end pb-20 md:justify-center md:pb-0 z-20"
      >
        <div className="max-w-xl">
          <motion.p
            {...fade(0.1)}
            className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-ivory/90 mb-3 md:mb-6 font-medium"
          >
            Aman Kay Rang
          </motion.p>

          <motion.h1
            {...fade(0.25)}
            className="font-serif font-light text-4xl sm:text-5xl md:text-7xl leading-[1.08] text-ivory"
          >
            Handcrafted Stories,
            <br />
            <em className="font-light italic text-rose">Woven Into Every Thread</em>
          </motion.h1>

          <motion.p
            {...fade(0.45)}
            className="mt-4 md:mt-6 text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-ivory/80"
          >
            Celebrating Heritage. Honoring Aman.
          </motion.p>

          <motion.div {...fade(0.6)} className="mt-7 md:mt-10">
            <MagneticButton strength={10}>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center h-11 md:h-12 px-7 md:px-8 bg-rose text-white text-[11px] font-semibold tracking-[0.2em] uppercase rounded-xl hover:bg-roseHover transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              >
                Shop Now
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll indicator with subtle bounce animation */}
        <motion.div
          {...fade(0.9)}
          className="absolute bottom-6 md:bottom-10 left-6 md:left-10 flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-ivory/70 select-none z-20"
        >
          <motion.span
            animate={reduced ? {} : { y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="block w-px h-6 md:h-8 bg-ivory/50"
          />
          Scroll
        </motion.div>
      </motion.div>
    </section>
  );
}

