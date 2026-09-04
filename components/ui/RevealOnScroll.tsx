"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function RevealOnScroll({ children, delay = 0, className }: Props) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Respect prefers-reduced-motion — skip animation entirely
  if (reduced) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
