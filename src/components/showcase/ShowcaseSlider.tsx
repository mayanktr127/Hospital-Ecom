"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Link from "next/link";

import Image from "next/image";

interface SlideData {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaAction: string;
  bgGradient: string;
  image: string;
  bannerImage: string;
}

export const ShowcaseSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides: SlideData[] = [
    {
      id: "slide-1",
      badge: "• INTENSIVE CARE",
      title: "prismaVENT Series",
      subtitle: "High-performance clinical ventilation for hospital & homecare.",
      ctaText: "Explore prismaVENT",
      ctaAction: "/ventilation/prisma-vent40",
      bgGradient: "from-[#0a1f3c] via-[#1a4079] to-[#0a1f3c]",
      image: "/images/site/carousel_prismavent_series.png",
      bannerImage: "/images/site/designer_banner_prismavent.png",
    },
    {
      id: "slide-2",
      badge: "• LIFE SUPPORT VENTILATION",
      title: "LUISA Ventilator",
      subtitle: "Life-sustaining mobile ventilation for pediatric & adult patients.",
      ctaText: "Discover LUISA",
      ctaAction: "/ventilation/luisa",
      bgGradient: "from-[#1a4079] via-[#12315c] to-[#0a1f3c]",
      image: "/images/site/carousel_luisa_ventilator.png",
      bannerImage: "/images/site/designer_banner_luisa.png",
    },
    {
      id: "slide-3",
      badge: "• ANESTHESIA WORKSTATION",
      title: "LEON plus edition",
      subtitle: "True to itself. Ready for the future of clinical surgery.",
      ctaText: "Discover LEON plus",
      ctaAction: "/anesthesia/leon-plus-edition",
      bgGradient: "from-[#0a1f3c] via-[#0a1f3c] to-[#0a1f3c]",
      image: "/images/site/carousel_leon_anesthesia.png",
      bannerImage: "/images/site/designer_banner_leon.png",
    },
    {
      id: "slide-4",
      badge: "• ICU VENTILATION",
      title: "elisa 800 Series",
      subtitle: "Next-generation intensive care ventilators with universal ventilation modes.",
      ctaText: "Explore elisa 800",
      ctaAction: "/intensive-care-ventilation/elisa-800",
      bgGradient: "from-[#12315c] via-[#0a1f3c] to-[#0a1f3c]",
      image: "/images/site/carousel_elisa_icu.png",
      bannerImage: "/images/site/designer_banner_elisa.png",
    },
    {
      id: "slide-5",
      badge: "• PATIENT INTERFACE",
      title: "LENA & CARA Masks",
      subtitle: "Maximum therapy compliance with ultra-quiet exhalation systems.",
      ctaText: "View Patient Interfaces",
      ctaAction: "/masks/lena",
      bgGradient: "from-[#1a4079] via-[#1a4079] to-[#12315c]",
      image: "/images/site/carousel_cara_masks.png",
      bannerImage: "/images/site/designer_banner_cara.png",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const active = slides[currentSlide];

  return (
    <section className="wrap max-w-[1240px] mx-auto px-4 md:px-6 pt-3">
      {/* Pastel canvas frame (newdesign.md §4) — hero sits on the marketing wash */}
      <div className="pastel-canvas rounded-[28px] sm:rounded-[28px] md:rounded-[28px] p-3 sm:p-4 border border-white/70 shadow-[0_16px_44px_rgba(24,42,65,0.09)]">
        {/* Outer Hero Container */}
        <div className="w-full rounded-[24px] sm:rounded-[28px] md:rounded-[28px] overflow-hidden relative shadow-[0_30px_70px_rgba(24,42,65,0.14)] min-h-[520px] sm:min-h-[480px] md:min-h-[540px] flex items-center border border-white/40 bg-[#0a1f3c]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            className="absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col lg:flex-row items-center justify-between gap-6 pb-20 sm:pb-16 overflow-hidden"
          >
            {/* Full Designer Banner Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={active.bannerImage}
                alt={active.title}
                fill
                priority
                sizes="(max-width: 1240px) 100vw, 1240px"
                className="object-cover object-center scale-105 transition-transform duration-1000"
              />
              {/* Directional Overlay tuned so text is crystal clear while background atmosphere remains visible */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a1f3c]/90 via-[#0a1f3c]/70 to-[#0a1f3c]/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f3c]/80 via-transparent to-transparent" />
            </div>

            {/* Tech Grid Overlay Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:28px_28px] opacity-30 pointer-events-none z-1" />

            {/* Left Content Column */}
            <div className="max-w-xl z-10 text-left w-full lg:w-1/2">
              {/* Category Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] sm:text-xs font-archivo font-bold uppercase tracking-wider mb-3 sm:mb-6 shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#7fb0ee] animate-pulse" />
                <span>{active.badge}</span>
              </div>

              {/* Display Headline */}
              <h1 className="font-archivo font-semibold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08] mb-3 sm:mb-5 drop-shadow-md">
                {active.title}
              </h1>

              {/* Subtitle text */}
              <p className="text-white/95 text-xs sm:text-lg lg:text-xl font-inter font-normal leading-relaxed max-w-xl mb-5 sm:mb-8 line-clamp-2 sm:line-clamp-none drop-shadow-xs">
                {active.subtitle}
              </p>

              {/* Primary White Pill CTA Button */}
              <Link
                href={active.ctaAction}
                className="inline-flex items-center gap-2.5 bg-white text-[#0a1f3c] hover:bg-white/95 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-archivo font-bold text-xs sm:text-base shadow-2xl transition-all group"
              >
                <span>{active.ctaText}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#0a1f3c] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Content Column: High Resolution Slide Product Image */}
            <div className="relative z-10 w-full lg:w-1/2 flex justify-center lg:justify-end items-center h-full">
              <div className="relative w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[400px] aspect-square flex items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-[28px] border border-white/25 shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain p-3 drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)] hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Control Bar */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {/* Slide Progress Pill */}
          <div className="flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 shadow-lg text-white">
            <span className="font-mono text-[10px] sm:text-xs font-bold tracking-wider">{currentSlide + 1} / {slides.length}</span>
            <div className="w-8 sm:w-12 h-1.5 bg-white/25 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-300 rounded-full"
                style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
              />
            </div>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white hover:text-[#7fb0ee] transition-colors p-0.5 cursor-pointer"
              aria-label="Toggle carousel auto-play"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={prevSlide}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/20 grid place-items-center text-white transition-all shadow-md cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/20 grid place-items-center text-white transition-all shadow-md cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};