"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ShowcaseSlider } from "@/components/showcase/ShowcaseSlider";
import { SearchModal } from "@/components/search/SearchModal";
import { ProductModal } from "@/components/products/ProductModal";
import { ProductSection } from "@/components/products/ProductSection";
import { ToastContainer } from "@/components/ui/Toast";
import { ProductCategory, Product } from "@/types/product";
import { Activity, ShieldCheck, ArrowRight, FileText, Flame, ShoppingCart, Headphones, Clock, BookOpen, Sparkles } from "lucide-react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("All");
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const thematicFocuses = [
    {
      name: "CPAP & APAP Devices",
      slug: "cpap-apap-devices",
      image: "/images/pulmocare/pulmocare_prisma-20a.png",
      count: "3 Models",
      desc: "Prisma 20A, Prisma Smart, and Prisma Smart Plus APAP devices.",
    },
    {
      name: "Bilevel-S & ST Devices",
      slug: "bilevel-s-st-devices",
      image: "/images/pulmocare/pulmocare_prisma-25-st.png",
      count: "3 Models",
      desc: "Prisma 25S, Prisma 25ST, and Prisma 30ST BiLevel devices.",
    },
    {
      name: "ASV & Titration Devices",
      slug: "asv-titration-devices",
      image: "/images/pulmocare/pulmocare_prisma-cr.png",
      count: "2 Models",
      desc: "Prisma CR and Prisma LAB adaptive servo-ventilation systems.",
    },
    {
      name: "Humidifiers",
      slug: "humidifiers",
      image: "/images/pulmocare/pulmocare_prisma-aqua.png",
      count: "Clinical Humidifier",
      desc: "Prisma AQUA warm air humidification systems.",
    },
    {
      name: "Ventilation",
      slug: "ventilation",
      image: "/images/pulmocare/pulmocare_luisa-ventilator.png",
      count: "3 Ventilators",
      desc: "LUISA life-support, PrismaVENT 40, and PrismaVENT 50C ventilators.",
    },
    {
      name: "Oxygen Therapy",
      slug: "oxygen-therapy",
      image: "/images/pulmocare/pulmocare_inogen-rove-6.png",
      count: "2 Concentrators",
      desc: "Inogen Rove 6 & Nidek Neo 5 oxygen therapy devices.",
    },
    {
      name: "Sleep Diagnostics",
      slug: "sleep-diagnostics",
      image: "/images/pulmocare/pulmocare_polygraphy-devices-samoa.png",
      count: "3 Systems",
      desc: "Samoa, Scala, and Sonata diagnostic polygraphy systems.",
    },
    {
      name: "Masks",
      slug: "masks",
      image: "/images/pulmocare/pulmo_l-wenstein-lena.png",
      count: "4 Mask Series",
      desc: "CARA Full Face, JOYCEone Full Face, LENA, and CARA Nasal masks.",
    },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink selection:bg-[#003865] selection:text-white font-inter">
      <ToastContainer />

      {/* Global Navbar Header */}
      <Navbar
        onOpenSearch={() => setSearchModalOpen(true)}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      <main className="flex-1 w-full overflow-hidden">
        {/* 1. Official Hero Showcase Slider matching Screenshot */}
        <section className="mb-14 pt-2">
          <ShowcaseSlider />
        </section>

        {/* 2. Redesigned Premium Section: Shop by Category */}
        <section className="w-full wrap max-w-[1240px] mx-auto px-4 md:px-6 mb-24">
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#007AC1]/10 text-[#007AC1] text-xs font-archivo font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXPLORE PULMO CARE PORTFOLIO</span>
            </div>
            <h2 className="font-archivo font-extrabold text-4xl sm:text-5xl text-[#003865] tracking-tight mb-3 leading-none">
              Shop by Category
            </h2>
            <p className="text-sm sm:text-base text-[#4A607A] font-inter max-w-xl mx-auto">
              Select from our 8 clinical specialty categories for homecare, hospital ventilation, and sleep diagnostics.
            </p>
          </div>

          {/* 8 Premium Category Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {thematicFocuses.map((cat) => (
              <Link
                key={cat.name}
                href={`/${cat.slug}`}
                className="group relative flex flex-col justify-between p-6 sm:p-7 bg-gradient-to-b from-[#F0F6FA] via-[#F8FAFC] to-white rounded-[32px] border border-[#003865]/10 shadow-[0_4px_20px_rgba(0,56,101,0.05)] hover:shadow-[0_24px_48px_-12px_rgba(0,56,101,0.22)] hover:border-[#007AC1]/40 transition-all duration-500 overflow-hidden"
              >
                {/* Top Badge Pill */}
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <span className="bg-white/90 backdrop-blur-md text-[#007AC1] text-[11px] font-archivo font-bold px-3 py-1 rounded-full border border-[#007AC1]/15 shadow-xs">
                    {cat.count}
                  </span>
                </div>

                {/* Floating Product Stage with Radial Ground Shadow */}
                <div className="w-full h-44 mb-6 flex items-center justify-center p-3 relative thumb-ground-shadow">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="max-h-36 max-w-full object-contain mix-blend-multiply drop-shadow-[0_14px_12px_rgba(0,56,101,0.2)] group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/products/mask.png";
                    }}
                  />
                </div>

                {/* Category Title, Subtext & Action CTA */}
                <div className="relative z-10">
                  <h3 className="font-archivo font-bold text-xl text-[#003865] group-hover:text-[#007AC1] transition-colors leading-tight mb-2">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#4A607A] leading-relaxed font-inter line-clamp-2 mb-4">
                    {cat.desc}
                  </p>

                  <div className="inline-flex items-center gap-1.5 text-xs font-archivo font-bold text-[#007AC1] group-hover:translate-x-1.5 transition-transform pt-3 border-t border-[#003865]/08 w-full">
                    <span>Explore Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. Redesigned Premium Section: Flagship Device Spotlight Banner */}
        <section className="w-full wrap max-w-[1240px] mx-auto px-4 md:px-6 mb-24">
          <div className="bg-gradient-to-br from-[#002A4E] via-[#003865] to-[#004C84] rounded-[40px] border border-white/10 shadow-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            {/* Ambient Glow Orbs in Background */}
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#007AC1]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
              {/* Left Column: Premium Copy & CTAs */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#007AC1]/20 border border-cyan-400/30 text-cyan-300 text-xs font-archivo font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>FLAGSHIP MEDICAL INNOVATION</span>
                </div>

                <h2 className="font-archivo font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                  Restorative Sleep &amp; Advanced Respiratory Therapy
                </h2>

                <p className="text-sm sm:text-base text-white/80 font-inter leading-relaxed max-w-xl">
                  Experience ultra-quiet, auto-adjusting CPAP and BiLevel therapy engineered in Germany. Pulmo Care delivers clinically proven ventilation solutions designed for optimal patient compliance and restful sleep.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/cpap-apap-devices/prisma-smart"
                    className="inline-flex items-center gap-2 bg-[#007AC1] hover:bg-[#00629B] text-white px-8 py-4 rounded-full font-archivo font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-cyan-500/25 transition-all cursor-pointer"
                  >
                    <span>Explore Prisma Series</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="tel:+919343444428"
                    className="inline-flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 px-7 py-4 rounded-full font-archivo font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <Headphones className="w-4 h-4 text-cyan-300" />
                    <span>Consult Specialist</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Floating 100% Transparent PNG Product Cutout */}
              <div className="lg:col-span-5 flex justify-center items-center relative">
                <div className="w-full max-w-[340px] aspect-square rounded-full bg-gradient-to-br from-[#007AC1]/25 to-transparent border border-white/15 p-6 flex items-center justify-center relative shadow-2xl">
                  <img
                    src="/images/pulmocare/pulmocare_prisma-smart.png"
                    alt="Prisma Smart Device"
                    className="max-h-72 w-auto object-contain mix-blend-multiply drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] hover:scale-108 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/images/products/mask.png";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Official Section: Why Choose Us, Mission & Vision matching Screenshot 1 */}
        <section className="w-full wrap max-w-[1240px] mx-auto px-4 md:px-6 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-[40px] overflow-hidden shadow-2xl border border-[#003865]/10">
            {/* Left Column: Doctor Patient Consultation Image */}
            <div className="relative min-h-[420px] bg-[url('/images/pulmocare/why_choose_us_consultation.png')] bg-cover bg-center">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Right Column: Navy Blue Text Box matching Screenshot 1 */}
            <div className="bg-[#0A2647] text-white p-8 md:p-14 flex flex-col justify-center text-left">
              <h2 className="font-archivo font-extrabold text-3xl md:text-4xl text-white mb-6">
                Why Choose Us
              </h2>

              <p className="text-sm md:text-base text-white/90 leading-relaxed font-inter mb-8">
                All these devices are best in working and meet to the global standards of the quality. These products are superior in working and offer best treatment to patient suffering from asthma, and other respiratory track related problems.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-archivo font-bold text-xl text-cyan-300 mb-2">
                    Mission
                  </h3>
                  <p className="text-sm text-white/85 leading-relaxed font-inter">
                    At Pulmocare Medical our continuing mission is working with our partners to provide one of the widest ranges of hospital and home healthcare products available today.
                  </p>
                </div>

                <div>
                  <h3 className="font-archivo font-bold text-xl text-cyan-300 mb-2">
                    Vision
                  </h3>
                  <p className="text-sm text-white/85 leading-relaxed font-inter">
                    We envision to create a healthcare ecosystem that synergistically bears fruit for all the comprising elements of the ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Value Proposition Strip matching Screenshot 3 */}
        <section className="w-full wrap max-w-[1240px] mx-auto px-4 md:px-6 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#F8FAFC] p-8 rounded-3xl border border-[#003865]/08 shadow-sm">
            {/* Free Shipping */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#003865]/05 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-[#EEF3F8] grid place-items-center shrink-0">
                <ShoppingCart className="w-6 h-6 text-[#007AC1]" />
              </div>
              <div>
                <h4 className="font-archivo font-bold text-lg text-[#003865]">Free Shipping</h4>
                <p className="text-xs text-[#4A607A]">T &amp; C Apply</p>
              </div>
            </div>

            {/* Dedicated Support */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#003865]/05 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-[#EEF3F8] grid place-items-center shrink-0">
                <Headphones className="w-6 h-6 text-[#007AC1]" />
              </div>
              <div>
                <h4 className="font-archivo font-bold text-lg text-[#003865]">Dedicated Support</h4>
                <p className="text-xs text-[#4A607A]">Quick response</p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-[#003865]/05 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-[#EEF3F8] grid place-items-center shrink-0">
                <Clock className="w-6 h-6 text-[#007AC1]" />
              </div>
              <div>
                <h4 className="font-archivo font-bold text-lg text-[#003865]">Working Hours</h4>
                <p className="text-xs text-[#4A607A]">10AM to 6PM</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Clinical Product Storefront Grid */}
        <section id="shop" className="w-full wrap max-w-[1240px] mx-auto px-4 md:px-6 mb-20">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#003865]/10 pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#007AC1] block mb-1">
                Official Pulmo Care Storefront
              </span>
              <h2 className="font-archivo font-extrabold text-3xl text-[#003865]">
                Medical Devices &amp; Hardware
              </h2>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#007AC1] hover:underline font-inter"
            >
              <BookOpen className="w-4 h-4" />
              <span>Browse Clinical Blog Articles &amp; Insights</span>
            </Link>
          </div>

          <ProductSection
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            onQuickView={(product: Product) => setSelectedProduct(product)}
          />
        </section>
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setSearchModalOpen(false);
        }}
      />
    </div>
  );
}
