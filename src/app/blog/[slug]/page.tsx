"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ToastContainer } from "@/components/ui/Toast";
import { SearchModal } from "@/components/search/SearchModal";
import { ProductModal } from "@/components/products/ProductModal";
import { Product } from "@/types/product";
import { BLOG_POSTS } from "@/data/blog_posts";
import { ArrowLeft, Calendar, Clock, User, Share2, Sparkles, CheckCircle } from "lucide-react";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-paper">
        <Navbar />
        <main className="flex-1 wrap max-w-[1240px] mx-auto px-4 py-20 text-center">
          <h1 className="font-archivo font-bold text-3xl text-[#003865] mb-4">Article Not Found</h1>
          <p className="text-sm text-[#4A607A] mb-6">The requested clinical blog article does not exist.</p>
          <Link href="/blog" className="px-6 py-2.5 rounded-full bg-[#003865] text-white font-bold text-xs">
            Back to Blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink font-inter">
      <ToastContainer />

      <Navbar onOpenSearch={() => setSearchModalOpen(true)} />

      <main className="flex-1 w-full wrap max-w-[960px] mx-auto px-4 md:px-6 py-12">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-archivo font-bold text-[#007AC1] hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Clinical Articles</span>
        </Link>

        {/* Category & Title */}
        <div className="mb-8">
          <span className="inline-block bg-[#003865] text-white text-xs font-archivo font-bold px-3.5 py-1 rounded-full uppercase tracking-wider mb-4">
            {post.category}
          </span>
          <h1 className="font-archivo font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#003865] leading-snug mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[#4A607A] border-b border-[#003865]/10 pb-6">
            <span className="flex items-center gap-1.5 font-semibold text-[#003865]">
              <User className="w-4 h-4 text-[#007AC1]" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#007AC1]" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#007AC1]" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Featured Image Box */}
        <div className="bg-gradient-to-br from-[#EEF3F8] to-white rounded-[32px] border border-[#003865]/10 p-8 md:p-12 mb-12 flex items-center justify-center">
          <img
            src={post.image}
            alt={post.title}
            className="max-h-72 object-contain mix-blend-multiply drop-shadow-xl"
          />
        </div>

        {/* Article Body */}
        <article className="prose prose-lg max-w-none text-[#2B2B2B] leading-relaxed font-inter space-y-6 mb-16">
          <p className="text-base sm:text-lg font-semibold text-[#003865] leading-relaxed border-l-4 border-[#007AC1] pl-4 italic">
            {post.excerpt}
          </p>

          {post.content.map((paragraph, idx) => (
            <p key={idx} className="text-sm sm:text-base text-[#4A607A] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Clinical Disclaimer Box */}
        <div className="bg-[#F0F6FA] border border-[#007AC1]/20 rounded-3xl p-6 mb-16 flex items-start gap-4">
          <CheckCircle className="w-6 h-6 text-[#007AC1] shrink-0 mt-0.5" />
          <p className="text-xs text-[#4A607A] leading-relaxed m-0">
            <strong>Medical Disclaimer:</strong> Clinical articles published on Pulmo Care are for informational and educational purposes only. Therapy settings, pressure titration, and medical equipment configuration must be directed by a qualified physician or licensed respiratory therapist.
          </p>
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
