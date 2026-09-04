import * as React from "react";
import { cn } from "@/lib/utils";

interface Props {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  variant?: "cherry" | "peony" | "leaf";
  className?: string;
}

const positionMap: Record<Props["position"], string> = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0 rotate-90",
  "bottom-left": "bottom-0 left-0 -rotate-90",
  "bottom-right": "bottom-0 right-0 rotate-180",
};

export default function BotanicalDecor({ position, variant = "cherry", className = "" }: Props) {
  return (
    <div
      className={cn(
        "absolute pointer-events-none text-rose/30 w-48 md:w-64 z-10",
        positionMap[position],
        className
      )}
    >
      {variant === "cherry" && (
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M10 200 Q 60 140 80 80 T 140 10" />
          <g>
            {[40, 70, 100, 130].map((y, i) => (
              <g key={i} transform={`translate(${30 + i * 15} ${y})`}>
                <circle cx="0" cy="0" r="6" fill="none" />
                <circle cx="6" cy="4" r="6" fill="none" />
                <circle cx="-6" cy="4" r="6" fill="none" />
                <circle cx="3" cy="9" r="6" fill="none" />
                <circle cx="-3" cy="9" r="6" fill="none" />
                <circle cx="0" cy="-6" r="4" fill="currentColor" fillOpacity="0.15" />
              </g>
            ))}
          </g>
        </svg>
      )}

      {variant === "peony" && (
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M20 180 Q 80 160 100 100 T 170 30" />
          <g transform="translate(100, 100)">
            {/* Peony outline bloom */}
            <circle cx="0" cy="0" r="18" fill="none" />
            <path d="M -18 0 C -25 -10 -15 -25 0 -18 C 15 -25 25 -10 18 0 C 25 10 15 25 0 18 C -15 25 -25 10 -18 0 Z" fill="currentColor" fillOpacity="0.05" />
            <path d="M -10 -10 Q 0 -30 10 -10 T 20 20 T -10 10 Z" />
          </g>
          <g transform="translate(150, 45)">
            <circle cx="0" cy="0" r="10" fill="none" />
            <path d="M -10 0 C -15 -5 -10 -15 0 -10 C 10 -15 15 -5 10 0 C 15 5 10 15 0 10 C -10 15 -15 5 -10 0 Z" />
          </g>
        </svg>
      )}

      {variant === "leaf" && (
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M15 185 Q 70 120 110 90 T 180 20" />
          {/* Elegant leaf shapes along the branch */}
          <path d="M 60 130 C 40 120 40 105 55 115 C 70 125 70 140 60 130 Z" fill="currentColor" fillOpacity="0.05" />
          <path d="M 90 105 C 80 85 90 75 100 90 C 110 105 100 115 90 105 Z" fill="currentColor" fillOpacity="0.05" />
          <path d="M 125 80 C 115 60 125 50 135 65 C 145 80 135 90 125 80 Z" fill="currentColor" fillOpacity="0.05" />
          <path d="M 155 50 C 150 30 160 25 168 38 C 176 51 166 60 155 50 Z" fill="currentColor" fillOpacity="0.05" />
        </svg>
      )}
    </div>
  );
}
