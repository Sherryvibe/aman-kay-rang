"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? {} : { opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
