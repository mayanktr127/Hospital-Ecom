"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAdmin } from "@/context/AdminContext";
import { Product, ProductCategory } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { SlidersHorizontal, ChevronLeft, ChevronRight, Pause, Play, Sparkles } from "lucide-react";
import { motion, useAnimationControls } from "motion/react";

interface ProductSectionProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onQuickView: (product: Product) => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  onQuickView,
}) => {
  const { products, categories, isLoading } = useAdmin();
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categoriesList = ["All", ...categories.map((c) => c.name)];

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "All") return true;
    return (
      product.category === selectedCategory ||
      product.category.toLowerCase().includes((selectedCategory as string).toLowerCase()) ||
      (selectedCategory as string).toLowerCase().includes(product.category.toLowerCase())
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0; // featured default
  });

  // Duplicate items array to create seamless 100% infinite horizontal loop
  const loopProducts = sortedProducts.length > 0 
    ? [...sortedProducts, ...sortedProducts, ...sortedProducts]
    : [];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  if (isLoading) {
    return (
      <section id="shop" className="mt-20 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 animate-pulse">
          <div>
            <div className="h-6 w-56 bg-[#e9edf4] rounded-full mb-3" />
            <div className="h-12 w-72 bg-[#e9edf4] rounded" />
          </div>
          <div className="h-5 w-80 bg-[#e9edf4] rounded" />
        </div>
        <div className="flex gap-6 overflow-hidden py-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-[320px] shrink-0 bg-white rounded-[24px] border border-[#e9edf4] overflow-hidden animate-pulse">
              <div className="bg-[#f6f4fb] h-52" />
              <div className="p-5 space-y-3">
                <div className="h-3 w-20 bg-[#e9edf4] rounded" />
                <div className="h-5 w-full bg-[#e9edf4] rounded" />
                <div className="h-6 w-28 bg-[#e9edf4] rounded" />
                <div className="h-10 w-full bg-[#e9edf4] rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="shop" className="mt-20 relative">
      {/* Section Header matching Lovable & Pulmo Care aesthetic */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#dcebfb] eyebrow mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OFFICIAL PULMO CARE CATALOG</span>
          </div>
          <h2 className="font-archivo font-medium text-4xl sm:text-5xl lg:text-[52px] text-[#0a1f3c] tracking-[-0.04em] leading-none">
            Our Top Devices
          </h2>
        </div>

        <p className="max-w-md text-sm sm:text-base text-[#64748b] leading-relaxed font-inter">
          High-performance hospital &amp; home healthcare medical hardware, CPAPs, ventilators, diagnostics, and masks.
        </p>
      </div>

      {/* Filter Tabs & Sort Controls matching image 1 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#0a1f3c]/10">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
          {categoriesList.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category as ProductCategory)}
                className={`chip whitespace-nowrap font-inter ${isActive ? "active" : ""}`}
                aria-pressed={isActive}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Sort Selector & Carousel Controls */}
        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          {/* Pause / Auto-play Toggle */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#e0f3ec] border border-transparent text-[#12315c] text-xs font-archivo font-semibold hover:bg-[#dcebfb] transition-colors cursor-pointer"
            title={isPaused ? "Resume auto scroll" : "Pause auto scroll"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-[#2a6ecb]" /> : <Pause className="w-3.5 h-3.5 text-[#2a6ecb]" />}
            <span className="hidden sm:inline">{isPaused ? "Play" : "Pause"}</span>
          </button>

          {/* Prev / Next Manual Navigation Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={scrollLeft}
              className="w-9 h-9 rounded-full bg-white border border-[#e9edf4] grid place-items-center text-[#0a1f3c] hover:bg-[#0a1f3c] hover:text-white hover:border-[#0a1f3c] transition-all shadow-[0_2px_8px_rgba(24,42,65,0.05)] active:scale-95 cursor-pointer"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-9 h-9 rounded-full bg-white border border-[#e9edf4] grid place-items-center text-[#0a1f3c] hover:bg-[#0a1f3c] hover:text-white hover:border-[#0a1f3c] transition-all shadow-[0_2px_8px_rgba(24,42,65,0.05)] active:scale-95 cursor-pointer"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#64748b]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#e9edf4] text-[#0a1f3c] text-xs font-archivo font-semibold rounded-full px-4 py-2.5 cursor-pointer hover:border-[#7fb0ee] transition-colors"
              aria-label="Sort products"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Horizontal Infinity Loop Carousel Container */}
      <div 
        className="w-full overflow-x-auto no-scrollbar py-4 px-1"
        ref={scrollContainerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div 
          className={`flex gap-6 lg:gap-8 ${
            !isPaused ? "animate-marquee" : ""
          } hover:[animation-play-state:paused]`}
          style={{ width: "max-content" }}
        >
          {loopProducts.map((product, idx) => (
            <div key={`${product.id}-${idx}`} className="w-[300px] sm:w-[320px] lg:w-[340px] shrink-0">
              <ProductCard product={product} onQuickView={onQuickView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};