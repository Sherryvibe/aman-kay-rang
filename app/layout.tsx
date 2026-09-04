import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import WishlistDrawer from "@/components/cart/WishlistDrawer";
import SearchModal from "@/components/shared/SearchModal";
import AnnounceBar from "@/components/layout/AnnounceBar";
import CustomCursor from "@/components/ui/CustomCursor";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aman Kay Rang — Handcrafted Stories, Woven Into Every Thread",
  description:
    "A tribute to Aman. A journey of love. Heritage Pakistani fashion, handcrafted by artisans.",
  openGraph: {
    title: "Aman Kay Rang",
    description: "Handcrafted luxury Pakistani fashion, celebrating heritage.",
    type: "website",
  },
  metadataBase: new URL("https://amankayrang.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="bg-ivory text-ink font-sans antialiased selection:bg-rose selection:text-ivory">
        {/* Skip to content */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-rose focus:text-white focus:px-4 focus:py-2 focus:rounded-xl focus:text-[12px] focus:tracking-[0.15em] focus:uppercase"
        >
          Skip to content
        </a>

        {/* Custom cursor — desktop only, progressive enhancement */}
        <CustomCursor />

        {/* Announce bar — dismissible marquee */}
        <AnnounceBar />

        <Navbar />

        <main id="main" className="min-h-screen">
          {children}
        </main>

        <Footer />
        <CartDrawer />
        <WishlistDrawer />
        <SearchModal />
      </body>
    </html>
  );
}
