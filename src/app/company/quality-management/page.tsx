"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ShieldCheck, Award, FileCheck, CheckCircle2, Building2 } from "lucide-react";

export default function QualityManagementPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink">
      <Navbar />

      <main className="wrap max-w-[1140px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-14 mb-12 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#e9e6fb] rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md eyebrow mb-4 border border-white">
            <Award className="w-4 h-4 text-[#1fb37a]" />
            Clinical Excellence &amp; Safety
          </span>

          <h1 className="font-archivo font-medium text-4xl md:text-[64px] tracking-[-0.04em] text-[#0a1f3c] mb-4 leading-[1.0]">
            Quality Management &amp; Regulatory Certifications
          </h1>

          <p className="text-base md:text-lg font-inter text-[#182a41] max-w-3xl leading-relaxed">
            Quality is the foundation of patient safety. Löwenstein Medical operates under rigorous international quality management systems certified to ISO 13485 and EU MDR 2017/745 standards.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-4">
              <ShieldCheck className="w-6 h-6 text-[#2a6ecb]" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">ISO 13485:2016</h3>
            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
              Certified Quality Management System for design, development, production, installation, and servicing of medical devices.
            </p>
          </div>

          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-4">
              <FileCheck className="w-6 h-6 text-[#1fb37a]" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">EU MDR 2017/745 CE</h3>
            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
              Full CE compliance and clinical evaluation under European Medical Device Regulation for Class IIa &amp; Class IIb ventilators.
            </p>
          </div>

          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-4">
              <Award className="w-6 h-6 text-[#f2b134]" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">FDA 510(k) Clearances</h3>
            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
              International market authorizations certified by regulatory authorities across the United States, Japan, and Australia.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}