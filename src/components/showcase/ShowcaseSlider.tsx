"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Link from "next/link";

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
      bgGradient: "from-[#0060A9] via-[#004D88] to-[#003865]",
      image: "/images/site/ventilation_csm_prisma_vent_40_home_ventilation_device_right_01_d8daadf9fd.jpg",
    },
    {
      id: "slide-2",
      badge: "• LIFE SUPPORT VENTILATION",
      title: "LUISA Ventilator",
      subtitle: "Life-sustaining mobile ventilation for pediatric & adult patients.",
      ctaText: "Discover LUISA",
      ctaAction: "/ventilation/luisa",
      bgGradient: "from-[#007AC1] via-[#005A9C] to-[#003865]",
      image: "/images/site/home_csm_luisa_home_ventilation_bedside_horizontal_wide_angle_81fcaaeec1.jpg",
    },
    {
      id: "slide-3",
      badge: "• ANESTHESIA WORKSTATION",
      title: "LEON plus edition",
      subtitle: "True to itself. Ready for the future of clinical surgery.",
      ctaText: "Discover LEON plus",
      ctaAction: "/anesthesia/leon-plus-edition",
      bgGradient: "from-[#0A2647] via-[#003865] to-[#001E36]",
      image: "/images/site/anesthesia_csm_leon_plus_anaesthesia_device_frontal_loops_c23d5c46f1.jpg",
    },
    {
      id: "slide-4",
      badge: "• ICU VENTILATION",
      title: "elisa 800 Series",
      subtitle: "Next-generation intensive care ventilators with universal ventilation modes.",
      ctaText: "Explore elisa 800",
      ctaAction: "/intensive-care-ventilation/elisa-800",
      bgGradient: "from-[#005A9C] via-[#003865] to-[#001E36]",
      image: "/images/site/intensive_care_csm_elisa_800_intensive_care_ventilators_device_frontal_f3c59a79e7.jpg",
    },
    {
      id: "slide-5",
      badge: "• PATIENT INTERFACE",
      title: "LENA & CARA Masks",
      subtitle: "Maximum therapy compliance with ultra-quiet exhalation systems.",
      ctaText: "View Patient Interfaces",
      ctaAction: "/masks/lena",
      bgGradient: "from-[#0060A9] via-[#004A85] to-[#002A4E]",
      image: "/images/site/masks_lena_csm_lena_mask_patient_interface_fullface_right_65ae40c267.jpg",
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
      {/* Outer Hero Container */}
      <div className="w-full rounded-[28px] sm:rounded-[36px] md:rounded-[48px] overflow-hidden relative shadow-2xl min-h-[520px] sm:min-h-[480px] md:min-h-[540px] flex items-center border border-[#003865]/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            className={`absolute inset-0 bg-gradient-to-r ${active.bgGradient} p-6 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-6 pb-20 sm:pb-16`}
          >
            {/* Tech Grid Overlay Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:28px_28px] opacity-40 pointer-events-none" />

            {/* Left Content Column */}
            <div className="max-w-xl z-10 text-left w-full">
              {/* Category Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-archivo font-bold uppercase tracking-wider mb-3 sm:mb-6 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-cyan-300 animate-pulse" />
                <span>{active.badge}</span>
              </div>

              {/* Display Headline */}
              <h1 className="font-archivo font-extrabold text-3xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-[1.08] mb-3 sm:mb-5 drop-shadow-xs">
                {active.title}
              </h1>

              {/* Subtitle text */}
              <p className="text-white/90 text-xs sm:text-lg lg:text-xl font-inter font-normal leading-relaxed max-w-xl mb-5 sm:mb-8 line-clamp-2 sm:line-clamp-none">
                {active.subtitle}
              </p>

              {/* Primary White Pill CTA Button */}
              <Link
                href={active.ctaAction}
                className="inline-flex items-center gap-2.5 bg-white text-[#003865] hover:bg-white/95 px-6 py-3 sm:px-8 sm:py-4 rounded-full font-archivo font-bold text-xs sm:text-base shadow-xl transition-all group"
              >
                <span>{active.ctaText}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#003865] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right Column: Product Device Image Container (Visible on Mobile & Desktop) */}
            <div className="w-full max-w-[260px] sm:max-w-[340px] lg:w-[440px] aspect-square rounded-[24px] sm:rounded-[36px] bg-white/15 backdrop-blur-md border border-white/25 p-4 sm:p-8 flex items-center justify-center relative shadow-2xl overflow-hidden z-10 shrink-0 max-h-48 sm:max-h-72 lg:max-h-full">
              <img
                src={active.image}
                alt={active.title}
                className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)] mix-blend-multiply transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/products/microscope.png";
                }}
              />
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
              className="text-white hover:text-cyan-300 transition-colors p-0.5 cursor-pointer"
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
    </section>
  );
};
