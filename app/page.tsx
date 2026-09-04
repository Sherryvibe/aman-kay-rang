import React from "react";
import Hero from "@/components/home/Hero";
import BrandValues from "@/components/home/BrandValues";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import BrandStory from "@/components/home/BrandStory";
import NewArrivals from "@/components/home/NewArrivals";
import CraftedByArtisans from "@/components/home/CraftedByArtisans";
import LookbookGrid from "@/components/home/LookbookGrid";
import Testimonials from "@/components/home/Testimonials";
import InstagramGallery from "@/components/home/InstagramGallery";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Brand Values Banner */}
      <BrandValues />

      {/* 3. Featured Collection Section */}
      <FeaturedCollection />

      {/* 4. Brand Story Section */}
      <BrandStory />

      {/* 5. New Arrivals Section */}
      <NewArrivals />

      {/* 6. Crafted By Artisans Storytelling Section */}
      <CraftedByArtisans />

      {/* 7. Lookbook Grid */}
      <LookbookGrid />

      {/* 8. Testimonials Section */}
      <Testimonials />

      {/* 9. Instagram Gallery */}
      <InstagramGallery />

      {/* 10. Newsletter Banner */}
      <Newsletter />
    </div>
  );
}
