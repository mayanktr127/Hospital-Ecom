"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ToastContainer } from "@/components/ui/Toast";
import { SearchModal } from "@/components/search/SearchModal";
import { ProductModal } from "@/components/products/ProductModal";
import { Product } from "@/types/product";
import { BLOG_POSTS, BlogPost } from "@/data/blog_posts";
import { BookOpen, Calendar, Clock, User, ArrowRight, Sparkles, Tag } from "lucide-react";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ["All", "Sleep Therapy", "Ventilation", "Oxygen Care", "Diagnostics", "Masks"];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (selectedCategory === "All") return true;
    return post.category === selectedCategory;
  });

  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink selection:bg-[#0a1f3c] selection:text-white font-inter">
      <ToastContainer />

      <Navbar
        onOpenSearch={() => setSearchModalOpen(true)}
        onSelectCategory={(cat) => console.log(cat)}
      />

      <main className="flex-1 w-full wrap max-w-[1240px] mx-auto px-4 md:px-6 py-12">
        {/* Header Hero Banner */}
        <div className="pastel-canvas rounded-[28px] border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] px-6 py-12 md:py-16 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white eyebrow mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Pulmo Care Clinical Insights</span>
          </div>
          <h1 className="font-archivo font-medium text-4xl sm:text-5xl lg:text-[64px] text-[#0a1f3c] tracking-[-0.04em] mb-4 leading-[1.0] max-w-3xl mx-auto">
            Respiratory Health &amp; <span className="hl">Clinical Blog</span>
          </h1>
          <p className="text-base sm:text-lg text-[#182a41] font-inter leading-relaxed max-w-2xl mx-auto">
            Expert articles, clinical guidelines, and technological insights on sleep therapy, home ventilation, oxygen care, and mask interfaces.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`chip font-inter ${isActive ? "active" : ""}`}
                aria-pressed={isActive}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="prod bg-white rounded-[20px] border border-[#e9edf4] overflow-hidden shadow-[0_2px_8px_rgba(24,42,65,0.05)] hover:shadow-[0_16px_44px_rgba(24,42,65,0.09)] hover:border-[#dcebfb] transition-all duration-300 group"
            >
              {/* Post Cutout Graphic Image */}
              <div className="media bg-gradient-to-br from-[#e9e6fb] via-[#dcebfb] to-white h-52 p-6 relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="max-h-40 max-w-full object-contain mix-blend-multiply drop-shadow-md group-hover:scale-108 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#2a6ecb] text-[10px] font-archivo font-semibold px-3 py-1 rounded-full uppercase tracking-[0.12em]">
                  {post.category}
                </span>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-[#64748b] mb-3 font-inter">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#2a6ecb]" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#2a6ecb]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-archivo font-semibold text-lg text-[#0a1f3c] group-hover:text-[#2a6ecb] transition-colors mb-3 leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed font-inter line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#e9edf4] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0a1f3c] flex items-center gap-1 font-inter">
                    <User className="w-3.5 h-3.5 text-[#2a6ecb]" />
                    {post.author.split(",")[0]}
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-archivo font-bold text-[#2a6ecb] group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />
    </div>
  );
}