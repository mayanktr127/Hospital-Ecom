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
  const { products, categories } = useAdmin();
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

  return (
    <section id="shop" className="mt-20 relative">
      {/* Section Header matching Lovable & Pulmo Care aesthetic */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#007AC1]/10 text-[#007AC1] text-xs font-archivo font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OFFICIAL PULMO CARE CATALOG</span>
          </div>
          <h2 className="font-archivo font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#003865] tracking-tight leading-none">
            Our Top Devices
          </h2>
        </div>

        <p className="max-w-md text-sm sm:text-base text-[#4A607A] leading-relaxed font-inter">
          High-performance hospital &amp; home healthcare medical hardware, CPAPs, ventilators, diagnostics, and masks.
        </p>
      </div>

      {/* Filter Tabs & Sort Controls matching image 1 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#003865]/10">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
          {categoriesList.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category as ProductCategory)}
                className={`px-5 py-2.5 rounded-full text-xs font-archivo font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#003865] text-white shadow-[0_4px_14px_rgba(0,56,101,0.3)] scale-105"
                    : "bg-white border border-[#003865]/12 text-[#4A607A] hover:text-[#003865] hover:bg-[#003865]/05"
                }`}
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#003865]/15 text-[#003865] text-xs font-bold hover:bg-[#003865]/05 transition-colors cursor-pointer"
            title={isPaused ? "Resume auto scroll" : "Pause auto scroll"}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 text-[#007AC1]" /> : <Pause className="w-3.5 h-3.5 text-[#007AC1]" />}
            <span className="hidden sm:inline">{isPaused ? "Play" : "Pause"}</span>
          </button>

          {/* Prev / Next Manual Navigation Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={scrollLeft}
              className="w-9 h-9 rounded-full bg-white border border-[#003865]/15 grid place-items-center text-[#003865] hover:bg-[#003865] hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Previous products"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-9 h-9 rounded-full bg-white border border-[#003865]/15 grid place-items-center text-[#003865] hover:bg-[#003865] hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Next products"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#4A607A]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#003865]/12 text-[#003865] text-xs font-archivo font-bold rounded-full px-4 py-2 outline-none cursor-pointer hover:border-[#003865]/30"
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
