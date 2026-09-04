"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const dotX = useSpring(0, { stiffness: 1200, damping: 60 });
  const dotY = useSpring(0, { stiffness: 1200, damping: 60 });
  const ringX = useSpring(0, { stiffness: 180, damping: 28 });
  const ringY = useSpring(0, { stiffness: 180, damping: 28 });

  const rafRef = useRef<number>(0);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop || reduced) return;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        dotX.set(e.clientX);
        dotY.set(e.clientY);
        ringX.set(e.clientX);
        ringY.set(e.clientY);
      });
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseenter", onEnter);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isDesktop, reduced, dotX, dotY, ringX, ringY]);

  if (!isDesktop || reduced) return null;

  return (
    <>
      {/* Outer ring — lags behind */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      >
        <div className="w-8 h-8 rounded-full border border-roseDeep" />
      </motion.div>

      {/* Inner dot — follows immediately */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        transition={{ opacity: { duration: 0.2 } }}
      >
        <div className="w-2 h-2 rounded-full bg-ivory" />
      </motion.div>
    </>
  );
}
