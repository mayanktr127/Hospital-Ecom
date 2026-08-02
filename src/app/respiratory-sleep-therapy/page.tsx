"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";

export default function CategoryOverviewPage() {
  const products: any[] = [];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white text-[#0a1f3c] font-inter">
      <Navbar />

      <main className="w-full mx-auto px-4 md:px-12 py-10 max-w-[1280px] flex-1">
        {/* Category Header */}
        <div className="pastel-canvas rounded-[28px] border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] p-8 md:p-12 mb-12">
          <span className="eyebrow block mb-3">
            Pulmo Care Catalog
          </span>
          <h1 className="font-archivo font-medium text-4xl md:text-[52px] text-[#0a1f3c] mb-4 tracking-[-0.04em] leading-[1.02]">
            CPAP & APAP Devices
          </h1>
          <div className="w-12 h-1 bg-[#2a6ecb] mb-6 rounded-full" aria-hidden="true" />
          <p className="text-sm md:text-base text-[#182a41] leading-relaxed font-inter max-w-3xl">
            High-performance medical hardware engineered for clinical hospital and homecare respiratory therapy. Certified to international CE and ISO 13485 quality standards.
          </p>
        </div>

        {/* Product Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((item: any) => (
              <Link
                key={item.slug}
                href={`/respiratory-sleep-therapy/${item.slug}`}
                className="prod group bg-white border border-[#e9edf4] rounded-[20px] p-6 shadow-[0_2px_8px_rgba(24,42,65,0.05)] hover:shadow-[0_16px_44px_rgba(24,42,65,0.09)] hover:border-[#dcebfb] transition-all duration-300 items-center justify-between text-center"
              >
                <div className="media w-full h-48 mb-6 rounded-[14px] bg-gradient-to-br from-[#e9e6fb] via-[#dcebfb] to-white p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-md group-hover:scale-108 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/products/mask.png";
                    }}
                  />
                </div>
                <div>
                  <span className="eyebrow text-[10px] block mb-1.5">
                    German Engineering
                  </span>
                  <h3 className="font-archivo font-semibold text-lg text-[#0a1f3c] group-hover:text-[#2a6ecb] transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#64748b] leading-relaxed line-clamp-2 mb-4 font-inter">
                    {item.introParagraph}
                  </p>
                </div>
                <div className="w-full pt-3 border-t border-[#e9edf4] text-xs font-archivo font-semibold text-[#2a6ecb] group-hover:underline">
                  View Details &rarr;
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}