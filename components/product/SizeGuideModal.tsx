"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/lib/store/ui";

const sizingData = [
  { size: "XS", chest: "34\"", shoulder: "13.5\"", length: "38\"", hips: "36\"" },
  { size: "S", chest: "36\"", shoulder: "14\"", length: "39\"", hips: "38\"" },
  { size: "M", chest: "40\"", shoulder: "15\"", length: "40\"", hips: "42\"" },
  { size: "L", chest: "44\"", shoulder: "16\"", length: "41\"", hips: "46\"" },
  { size: "XL", chest: "48\"", shoulder: "17\"", length: "42\"", hips: "50\"" },
];

export default function SizeGuideModal() {
  const isOpen = useUIStore((s) => s.isSizeGuideOpen);
  const closeSizeGuide = useUIStore((s) => s.closeSizeGuide);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={closeSizeGuide}
            className="absolute inset-0 bg-ink cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="relative bg-ivory w-full max-w-lg rounded-xl shadow-cardHover overflow-hidden z-10 border border-line"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-line flex justify-between items-center bg-ivory">
              <h3 className="text-[12px] font-semibold tracking-eyebrow uppercase text-ink">
                Size Guide
              </h3>
              <button
                onClick={closeSizeGuide}
                className="text-muted hover:text-ink p-1"
                aria-label="Close size guide"
              >
                <X strokeWidth={1.25} size={20} />
              </button>
            </div>

            {/* Content Table */}
            <div className="p-6 overflow-x-auto no-scrollbar">
              <p className="text-[12px] text-muted mb-4 font-light leading-relaxed">
                All measurements listed below are garment dimensions in inches. Please select the size that corresponds to your body measurements plus a few inches of ease.
              </p>

              <table className="w-full text-left text-[12px] border-collapse">
                <thead>
                  <tr className="border-b border-line text-roseDeep font-semibold">
                    <th className="py-2.5 font-medium tracking-wider">Size</th>
                    <th className="py-2.5 font-medium tracking-wider">Chest</th>
                    <th className="py-2.5 font-medium tracking-wider">Shoulder</th>
                    <th className="py-2.5 font-medium tracking-wider">Length</th>
                    <th className="py-2.5 font-medium tracking-wider">Hips</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/45 text-ink font-light">
                  {sizingData.map((row) => (
                    <tr key={row.size} className="hover:bg-beige/20 transition-colors">
                      <td className="py-3 font-medium text-roseDeep">{row.size}</td>
                      <td className="py-3">{row.chest}</td>
                      <td className="py-3">{row.shoulder}</td>
                      <td className="py-3">{row.length}</td>
                      <td className="py-3">{row.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="text-[11px] text-muted/80 mt-6 leading-relaxed font-light">
                *Note: Fabric may shrink up to 3% upon first wash for 100% cotton lawn items. We suggest dry cleaning or hand washing in cold water.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
