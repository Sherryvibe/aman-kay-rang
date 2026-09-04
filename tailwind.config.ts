import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F8F4EE",
        beige: "#E8DDD3",
        rose: "#D78598",
        roseDeep: "#C96284",
        roseHover: "#C4547E",
        ink: "#2B2B2B",
        muted: "#6D625B",
        line: "#ECE4DD",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.2em",
      },
      boxShadow: {
        card: "0 2px 24px rgba(43,43,43,0.06)",
        cardHover: "0 8px 40px rgba(43,43,43,0.10)",
        drawer: "-24px 0 60px rgba(43,43,43,0.08)",
      },
      borderRadius: {
        xl: "12px",
      },
      maxWidth: {
        editorial: "1400px",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
