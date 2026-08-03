"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ShieldCheck, Award, FileCheck, CheckCircle2, Wrench, Sparkles } from "lucide-react";

export default function QualityManagementPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink font-inter">
      <Navbar />

      <main className="wrap max-w-[1140px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-14 mb-12 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#e9e6fb] rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md eyebrow mb-4 border border-white">
            <Award className="w-4 h-4 text-[#1fb37a]" />
            Device Inspection &amp; Calibration
          </span>

          <h1 className="font-archivo font-medium text-4xl md:text-[64px] tracking-[-0.04em] text-[#0a1f3c] mb-4 leading-[1.0]">
            Pulmo Care Quality Assurance
          </h1>

          <p className="text-base md:text-lg font-inter text-[#182a41] max-w-3xl leading-relaxed">
            Every medical device distributed or rented by Pulmo Care undergoes multi-point biomedical inspection, pressure testing, and factory-standard calibration prior to patient delivery.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-4">
              <ShieldCheck className="w-6 h-6 text-[#2a6ecb]" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">ISO 13485 Standards</h3>
            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
              We supply ISO 13485 certified respiratory systems engineered under strict international quality management parameters.
            </p>
          </div>

          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-4">
              <Wrench className="w-6 h-6 text-[#1fb37a]" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">Pre-Delivery Calibration</h3>
            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
              Pressure sensor verification, flow accuracy tests, motor noise checks, and humidifier seal testing on specialized calibration benches.
            </p>
          </div>

          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-4">
              <FileCheck className="w-6 h-6 text-[#2a6ecb]" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">Genuine OEM Parts</h3>
            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
              100% original filters, tubings, power adapters, and replacement mask cushions direct from certified manufacturers.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}