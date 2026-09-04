"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  "Free shipping on orders over PKR 15,000",
  "New Arrivals — The Spring Edit is here",
  "Handcrafted in Pakistan, made with love",
  "Free shipping on orders over PKR 15,000",
  "New Arrivals — The Spring Edit is here",
  "Handcrafted in Pakistan, made with love",
];

const SESSION_KEY = "akr-announce-dismissed";

export default function AnnounceBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(SESSION_KEY);
    if (!dismissed) setVisible(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-ivory border-b border-line/60 overflow-hidden z-50"
        >
          <div className="flex items-center justify-between px-4 py-2.5">
            {/* Marquee wrapper */}
            <div className="flex-1 overflow-hidden">
              <div className="flex animate-[marquee_50s_linear_infinite] whitespace-nowrap gap-16">
                {MESSAGES.map((msg, i) => (
                  <span
                    key={i}
                    className="text-[11px] tracking-[0.18em] uppercase text-roseDeep font-medium"
                  >
                    {msg}
                    <span className="mx-8 text-line">·</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Dismiss */}
            <button
              onClick={dismiss}
              aria-label="Dismiss announcement"
              className="ml-4 flex-shrink-0 text-muted hover:text-roseDeep transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose rounded-sm p-0.5"
            >
              <X strokeWidth={1.25} size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
