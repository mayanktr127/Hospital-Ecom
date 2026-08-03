"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Heart, ShieldCheck, Target, Sparkles, CheckCircle2, UserCheck } from "lucide-react";

export default function OurValuesPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink font-inter">
      <Navbar />

      <main className="wrap max-w-[1140px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-14 mb-12 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#e9e6fb] rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md eyebrow mb-4 border border-white">
            <Heart className="w-4 h-4 text-[#dc4b56]" />
            Pulmo Care Mission &amp; Values
          </span>

          <h1 className="font-archivo font-medium text-4xl md:text-[64px] tracking-[-0.04em] text-[#0a1f3c] mb-4 leading-[1.0]">
            Our Guiding Principles &amp; Values
          </h1>

          <p className="text-base md:text-lg font-inter text-[#182a41] max-w-3xl leading-relaxed">
            At Pulmo Care, every device we recommend and every patient we assist is driven by a simple promise: <strong>Restoring restful sleep and healthy breathing for everyone</strong>.
          </p>
        </div>

        {/* 4 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-8 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#dc4b56] grid place-items-center mb-4">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-archivo font-bold text-2xl text-[#0a1f3c] mb-3">1. Patient Wellbeing First</h3>
            <p className="text-sm text-[#64748b] leading-relaxed">
              We understand that adapting to CPAP or BiPAP therapy can be challenging. We prioritize personalized mask fitting, quiet operation, and patient comfort to maximize therapy compliance.
            </p>
          </div>

          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-8 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-archivo font-bold text-2xl text-[#0a1f3c] mb-3">2. Authentic Quality Assurance</h3>
            <p className="text-sm text-[#64748b] leading-relaxed">
              We exclusively supply genuine, manufacturer-certified equipment from premium global healthcare brands with full Indian CDSCO compliance and official manufacturer warranty.
            </p>
          </div>

          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-8 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#1fb37a] grid place-items-center mb-4">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="font-archivo font-bold text-2xl text-[#0a1f3c] mb-3">3. Clinical Partnership</h3>
            <p className="text-sm text-[#64748b] leading-relaxed">
              We act as a direct liaison between doctors and patients, supplying detailed therapy compliance reports (AHI, leak rates, usage hours) directly to treating pulmonologists.
            </p>
          </div>

          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-8 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-4">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-archivo font-bold text-2xl text-[#0a1f3c] mb-3">4. 24/7 Technical Reliability</h3>
            <p className="text-sm text-[#64748b] leading-relaxed">
              Respiratory care doesn&apos;t stop at business hours. Our technical hotline and on-field biomedical team provide round-the-clock emergency support across India.
            </p>
          </div>
        </div>

        {/* Commitment Banner */}
        <div className="bg-white border border-[#e9edf4] rounded-[28px] p-8 md:p-12 shadow-sm space-y-6 font-inter text-[#0a1f3c]">
          <h2 className="font-archivo font-bold text-2xl text-[#0a1f3c]">
            The Pulmo Care Quality Promise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm text-[#64748b]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#1fb37a] shrink-0" />
              <span>100% Genuine Certified Devices</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#1fb37a] shrink-0" />
              <span>Free In-Home Mask Fitting Trials</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#1fb37a] shrink-0" />
              <span>Dedicated Therapy Data Downloads</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#1fb37a] shrink-0" />
              <span>Transparent Pricing in INR (₹)</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}