"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Heart, ShieldCheck, Target, Sparkles, CheckCircle2 } from "lucide-react";

export default function OurValuesPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink">
      <Navbar />

      <main className="wrap max-w-[1140px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-14 mb-12 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#e9e6fb] rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md eyebrow mb-4 border border-white">
            <Heart className="w-4 h-4 text-[#dc4b56]" />
            Corporate Philosophy &amp; Mission
          </span>

          <h1 className="font-archivo font-medium text-4xl md:text-[64px] tracking-[-0.04em] text-[#0a1f3c] mb-4 leading-[1.0]">
            Our Values &amp; Guiding Principles
          </h1>

          <p className="text-base md:text-lg font-inter text-[#182a41] max-w-3xl leading-relaxed">
            Every product we manufacture and every service we deliver is anchored in our core commitment: <strong>With people in mind</strong>.
          </p>
        </div>

        {/* 4 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-8 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-4">
              <Heart className="w-6 h-6 text-[#dc4b56]" />
            </div>
            <h3 className="font-archivo font-bold text-2xl text-[#0a1f3c] mb-3">1. Patient-First Responsibility</h3>
            <p className="text-sm text-[#64748b] leading-relaxed">
              Medical technology must serve human life. We design devices that enhance therapy comfort, minimize noise, and safeguard patient wellbeing in ICUs, neonatal wards, and home settings.
            </p>
          </div>

          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-8 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-4">
              <ShieldCheck className="w-6 h-6 text-[#2a6ecb]" />
            </div>
            <h3 className="font-archivo font-bold text-2xl text-[#0a1f3c] mb-3">2. German Engineering Precision</h3>
            <p className="text-sm text-[#64748b] leading-relaxed">
              We hold ourselves to stringent German manufacturing standards, ensuring long-term durability, clinical reliability, and zero-compromise safety.
            </p>
          </div>

          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-8 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-4">
              <Target className="w-6 h-6 text-[#1fb37a]" />
            </div>
            <h3 className="font-archivo font-bold text-2xl text-[#0a1f3c] mb-3">3. Trust &amp; Partnership</h3>
            <p className="text-sm text-[#64748b] leading-relaxed">
              We foster transparent relationships with clinicians, specialist dealers, health insurers, and regulatory authorities to ensure continuous improvement in healthcare delivery.
            </p>
          </div>

          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-8 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-4">
              <Sparkles className="w-6 h-6 text-[#f2b134]" />
            </div>
            <h3 className="font-archivo font-bold text-2xl text-[#0a1f3c] mb-3">4. Sustainable Innovation</h3>
            <p className="text-sm text-[#64748b] leading-relaxed">
              Innovation is meaningful when it simplifies care. We focus on energy-efficient ventilator turbines, recycled component materials, and digital telemetry solutions.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}