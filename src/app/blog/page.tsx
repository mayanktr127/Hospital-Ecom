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
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink selection:bg-[#003865] selection:text-white font-inter">
      <ToastContainer />

      <Navbar
        onOpenSearch={() => setSearchModalOpen(true)}
        onSelectCategory={(cat) => console.log(cat)}
      />

      <main className="flex-1 w-full wrap max-w-[1240px] mx-auto px-4 md:px-6 py-12">
        {/* Header Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#007AC1]/10 text-[#007AC1] text-xs font-archivo font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Pulmo Care Clinical Insights</span>
          </div>
          <h1 className="font-archivo font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#003865] tracking-tight mb-4 leading-none">
            Respiratory Health &amp; Clinical Blog
          </h1>
          <p className="text-base sm:text-lg text-[#4A607A] font-inter leading-relaxed">
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
                className={`px-5 py-2.5 rounded-full text-xs font-archivo font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#003865] text-white shadow-md scale-105"
                    : "bg-white border border-[#003865]/12 text-[#4A607A] hover:text-[#003865] hover:bg-[#003865]/05"
                }`}
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
              className="bg-white rounded-[28px] border border-[#003865]/10 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#007AC1]/30 transition-all duration-300 flex flex-col group"
            >
              {/* Post Cutout Graphic Image */}
              <div className="bg-gradient-to-br from-[#EEF3F8] to-white h-52 flex items-center justify-center p-6 relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="max-h-40 max-w-full object-contain mix-blend-multiply drop-shadow-md group-hover:scale-108 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#003865] text-white text-[10px] font-archivo font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-[#4A607A] mb-3 font-inter">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#007AC1]" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#007AC1]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-archivo font-bold text-xl text-[#003865] group-hover:text-[#007AC1] transition-colors mb-3 leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-[#4A607A] leading-relaxed font-inter line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#003865]/08 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#003865] flex items-center gap-1 font-inter">
                    <User className="w-3.5 h-3.5 text-[#007AC1]" />
                    {post.author.split(",")[0]}
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-archivo font-bold text-[#007AC1] group-hover:translate-x-1 transition-transform"
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
