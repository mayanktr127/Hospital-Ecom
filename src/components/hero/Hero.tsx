"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";
import { PRODUCTS } from "@/data/products";
import { ArrowRight, ShieldCheck, Award, FileText, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

interface HeroProps {
  onQuickView: (product: Product) => void;
}

interface SlideData {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaAction: string;
  bgGradient: string;
  image: string;
}

export const Hero: React.FC<HeroProps> = ({ onQuickView }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const heroSlides: SlideData[] = [
    {
      id: "slide-1",
      badge: "INTENSIVE CARE",
      title: "prismaVENT Series",
      subtitle: "High-performance clinical ventilation for hospital & homecare.",
      ctaText: "Explore prismaVENT",
      ctaAction: "#shop",
      bgGradient: "from-[#0a1f3c] via-[#1a4079] to-[#0a1f3c]",
      image: "/images/site/carousel_prismavent_series.png",
    },
    {
      id: "slide-2",
      badge: "LÖWENSTEIN LUISA",
      title: "LUISA Mobile Ventilator",
      subtitle: "Reliable life-support availability for pediatric & adult patient care.",
      ctaText: "Learn more about LUISA",
      ctaAction: "#shop",
      bgGradient: "from-[#1a4079] via-[#12315c] to-[#0a1f3c]",
      image: "/images/site/carousel_luisa_ventilator.png",
    },
    {
      id: "slide-3",
      badge: "ANESTHESIA SYSTEM",
      title: "LEON plus edition",
      subtitle: "True to itself. Ready for the future of clinical surgery.",
      ctaText: "Discover LEON plus",
      ctaAction: "#offers",
      bgGradient: "from-[#0a1f3c] via-[#0a1f3c] to-[#0a1f3c]",
      image: "/images/site/carousel_leon_anesthesia.png",
    },
    {
      id: "slide-4",
      badge: "ICU VENTILATION",
      title: "elisa 800 Series",
      subtitle: "Next-generation intensive care ventilators with universal modes.",
      ctaText: "Discover elisa 800",
      ctaAction: "#shop",
      bgGradient: "from-[#0a1f3c] via-[#0a1f3c] to-[#0a1f3c]",
      image: "/images/site/carousel_elisa_icu.png",
    },
    {
      id: "slide-5",
      badge: "PATIENT INTERFACE",
      title: "LENA & CARA Masks",
      subtitle: "Maximum therapy compliance with ultra-quiet exhalation systems.",
      ctaText: "View Patient Interfaces",
      ctaAction: "#shop",
      bgGradient: "from-[#12315c] via-[#2a6ecb] to-[#0a1f3c]",
      image: "/images/site/carousel_cara_masks.png",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Auto advance every 5 seconds (5000ms)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const activeSlide = heroSlides[currentSlide];

  return (
    <section className="relative mt-5 mb-14 overflow-hidden rounded-[28px] bg-[#dcebfb] p-6 sm:p-10 md:p-12 border border-[#0a1f3c]/10 shadow-[0_4px_8px_rgba(24,42,65,0.04),0_28px_60px_-24px_rgba(24,42,65,0.22)]">
      {/* Background Soft radial ice gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(216,231,243,0.8),transparent_70%)] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
        {/* Left Column: Typography & Brand Specs (Image 1 exact design) */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#0a1f3c]/15 text-[#0a1f3c] text-xs font-semibold font-archivo w-fit mb-4 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2a6ecb]" />
            <span>ISO 13485 Medical Engineering</span>
          </div>

          {/* Headline (Image 1 design: Löwenstein solid navy, Medical outlined) */}
          <h1 className="font-archivo font-semibold text-[clamp(42px,5.5vw,72px)] leading-[0.92] tracking-[-0.03em] mb-4 text-[#0a1f3c]">
            Löwenstein <br />
            <em className="not-italic text-transparent [-webkit-text-stroke:2px_#0a1f3c]">
              Medical
            </em>
          </h1>

          <p className="text-base sm:text-lg text-[#64748b] font-inter leading-relaxed mb-6 max-w-md">
            Clinical-grade respiratory, ventilation, and diagnostic equipment engineered in Germany for hospitals and homecare.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 mb-8">
            <a
              href="#shop"
              className="px-7 py-3.5 rounded-full bg-[#0a1f3c] text-white font-inter font-semibold text-sm flex items-center gap-2 hover:bg-[#12315c] shadow-[0_12px_26px_-14px_#0a1f3c] active:scale-[0.98] transition-all"
            >
              <span>Explore Equipment</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#benefits"
              className="px-6 py-3.5 rounded-full bg-white border border-[#0a1f3c]/15 text-[#0a1f3c] font-inter font-semibold text-sm flex items-center gap-2 hover:border-[#0a1f3c]/40 hover:bg-[#f6f4fb] transition-all shadow-sm"
            >
              <FileText className="w-4 h-4 text-[#2a6ecb]" />
              <span>Catalog PDF</span>
            </a>
          </div>

          {/* Trust stats row */}
          <div className="flex items-center gap-6 pt-5 border-t border-[#e9edf4]">
            <div>
              <div className="font-archivo font-semibold text-xl text-[#0a1f3c]">40+ Years</div>
              <div className="text-xs text-[#64748b]">German Engineering</div>
            </div>
            <div className="w-[1px] h-8 bg-[#0a1f3c]/15" />
            <div>
              <div className="font-archivo font-semibold text-xl text-[#0a1f3c]">100+</div>
              <div className="text-xs text-[#64748b]">Global Distributors</div>
            </div>
            <div className="w-[1px] h-8 bg-[#0a1f3c]/15" />
            <div>
              <div className="font-archivo font-semibold text-xl text-[#0a1f3c]">ISO 13485</div>
              <div className="text-xs text-[#64748b]">Clinical Compliance</div>
            </div>
          </div>
        </div>

        {/* Right Column: Integrated 5-Slide Carousel (Image 3 design & Image 4 toggle control) */}
        <div className="lg:col-span-7 w-full">
          <div className="relative rounded-[28px] overflow-hidden min-h-[360px] sm:min-h-[400px] flex items-center shadow-[0_20px_50px_-20px_rgba(24,42,65,0.4)] border border-white/20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
                className="absolute inset-0 p-8 sm:p-10 flex items-center justify-between text-white overflow-hidden"
              >
                {/* Full Designer Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={activeSlide.image}
                    alt={activeSlide.title}
                    fill
                    priority
                    sizes="(max-width: 1240px) 100vw, 1240px"
                    className="object-cover object-center scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f3c]/85 via-[#0a1f3c]/40 to-transparent" />
                </div>

                {/* Carousel Text Content */}
                <div className="max-w-xl z-10">
                  <span className="inline-block text-[11px] font-bold font-archivo uppercase tracking-widest px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white mb-3">
                    {activeSlide.badge}
                  </span>

                  <h3 className="font-archivo font-semibold text-[clamp(28px,4vw,44px)] leading-tight mb-2 text-white drop-shadow-md">
                    {activeSlide.title}
                  </h3>

                  <p className="text-sm sm:text-base font-inter text-white/90 leading-relaxed mb-6 drop-shadow-xs">
                    {activeSlide.subtitle}
                  </p>

                  <a
                    href={activeSlide.ctaAction}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0a1f3c] font-inter font-semibold text-xs sm:text-sm hover:bg-[#f6f4fb] transition-all shadow-md active:scale-95"
                  >
                    <span>{activeSlide.ctaText}</span>
                    <ArrowRight className="w-4 h-4 text-[#0a1f3c]" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Toggle Control Pill & Arrows (Matches Image 3 & Image 4) */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
              {/* Image 4 Toggle Pill Box */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/75 backdrop-blur-md border border-white/30 shadow-md">
                {heroSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      currentSlide === idx
                        ? "w-4 h-2.5 bg-[#0a1f3c]"
                        : "w-2.5 h-2.5 bg-[#0a1f3c]/35 hover:bg-[#0a1f3c]/60"
                    }`}
                  />
                ))}

                {/* Pause/Play toggle */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="ml-1 text-[#0a1f3c] hover:text-[#2a6ecb] transition-colors p-0.5"
                  title={isPlaying ? "Pause auto-scroll" : "Play auto-scroll"}
                  aria-label="Toggle auto slide"
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevSlide}
                  className="w-8 h-8 rounded-full bg-white/75 backdrop-blur-md border border-white/30 grid place-items-center text-[#0a1f3c] hover:bg-white transition-colors shadow-sm"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={nextSlide}
                  className="w-8 h-8 rounded-full bg-white/75 backdrop-blur-md border border-white/30 grid place-items-center text-[#0a1f3c] hover:bg-white transition-colors shadow-sm"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};