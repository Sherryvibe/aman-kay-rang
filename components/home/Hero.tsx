"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import BotanicalDecor from "@/components/ui/BotanicalDecor";
import MagneticButton from "@/components/ui/MagneticButton";

const HERO_IMAGES = [
  {
    src: "/images/hero.png",
    alt: "Aman Kay Rang — woman in handcrafted Pakistani floral lawn dress",
  },
  {
    src: "/images/Hero image 1.png",
    alt: "Aman Kay Rang — Handcrafted Heritage Collection",
  },
  {
    src: "/images/Hero image 2.png",
    alt: "Aman Kay Rang — Traditional Artisanal Elegance",
  },
  {
    src: "/images/Hero Image 3.PNG",
    alt: "Aman Kay Rang — Luxury Pret & Couture",
  },
];

export default function Hero() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();

  // 8-second auto rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Parallax — skip on reduced motion
  const y = useTransform(scrollY, [0, 800], reduced ? [0, 0] : [0, 180]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.9,
      delay: reduced ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  });

  return (
    <section className="relative h-screen min-h-[720px] w-full overflow-hidden bg-beige">
      {/* Parallax image layer with 8s smooth cross-fade */}
      <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
        {HERO_IMAGES.map((img, idx) => (
          <motion.div
            key={img.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: idx === currentIdx ? 1 : 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={idx === 0}
              quality={92}
              sizes="100vw"
              className="object-cover object-[65%_25%] md:object-[70%_25%] lg:object-[75%_20%]"
              style={{ backgroundColor: "#E8DDD3" }}
            />
          </motion.div>
        ))}

        {/* Dark gradient scrims for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent z-10 pointer-events-none" />
      </motion.div>

      {/* Botanical decorative SVGs */}
      <BotanicalDecor position="top-left" variant="cherry" className="text-rose/30 w-56 md:w-72 z-20 pointer-events-none" />
      <BotanicalDecor position="bottom-right" variant="cherry" className="text-rose/25 w-48 md:w-64 z-20 pointer-events-none" />

      {/* Content — fades out on scroll */}
      <motion.div
        style={{ opacity }}
        className="relative h-full max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col justify-center z-20"
      >
        <div className="max-w-xl">
          <motion.p
            {...fade(0.1)}
            className="text-[11px] tracking-[0.25em] uppercase text-ivory/90 mb-6 font-medium"
          >
            Aman Kay Rang
          </motion.p>

          <motion.h1
            {...fade(0.25)}
            className="font-serif font-light text-5xl md:text-7xl leading-[1.05] text-ivory"
          >
            Handcrafted Stories,
            <br />
            <em className="font-light italic text-rose">Woven Into Every Thread</em>
          </motion.h1>

          <motion.p
            {...fade(0.45)}
            className="mt-6 text-[11px] tracking-[0.2em] uppercase text-ivory/80"
          >
            Celebrating Heritage. Honoring Aman.
          </motion.p>

          <motion.div {...fade(0.6)} className="mt-10">
            <MagneticButton strength={10}>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center h-12 px-8 bg-rose text-white text-[11px] font-semibold tracking-[0.2em] uppercase rounded-xl hover:bg-roseHover transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
              >
                Shop Now
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Bottom controls bar: Scroll indicator (left) + Slide indicators (right) */}
        <div className="absolute bottom-10 inset-x-6 md:inset-x-10 flex justify-between items-center z-20">
          {/* Scroll indicator with bounce */}
          <motion.div
            {...fade(1.0)}
            className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-ivory/70 select-none"
          >
            <motion.span
              animate={reduced ? {} : { y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="block w-px h-8 bg-ivory/50"
            />
            Scroll
          </motion.div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIdx(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentIdx
                    ? "w-8 bg-rose"
                    : "w-2 bg-ivory/50 hover:bg-ivory/80"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
