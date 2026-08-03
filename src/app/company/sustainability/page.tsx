"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Leaf, Sun, Recycle, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function SustainabilityPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink font-inter">
      <Navbar />

      <main className="wrap max-w-[1140px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-14 mb-12 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#1fb37a]/20 rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md eyebrow mb-4 border border-white">
            <Leaf className="w-4 h-4 text-[#1fb37a]" />
            Environmental Responsibility
          </span>

          <h1 className="font-archivo font-medium text-4xl md:text-[64px] tracking-[-0.04em] text-[#0a1f3c] mb-4 leading-[1.0]">
            Pulmo Care Sustainability &amp; ESG
          </h1>

          <p className="text-base md:text-lg font-inter text-[#182a41] max-w-3xl leading-relaxed">
            Pulmo Care is committed to sustainable healthcare logistics in India: energy-efficient equipment, paperless digital clinical reports, and eco-friendly protective packaging.
          </p>
        </div>

        {/* ESG Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#1fb37a] grid place-items-center mb-4">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">Energy Efficient Devices</h3>
            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
              We supply modern low-power CPAP blowers and pulse-dose oxygen concentrators that reduce household electrical draw by up to 35%.
            </p>
          </div>

          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#1fb37a] grid place-items-center mb-4">
              <Recycle className="w-6 h-6" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">Paperless Telemetry</h3>
            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
              Digital PDF reports, cloud compliance monitoring, and electronic invoicing eliminate unnecessary paper waste.
            </p>
          </div>

          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#1fb37a] grid place-items-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">Responsible E-Waste</h3>
            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
              Certified e-waste recycling for retired battery packs, internal circuitry, and older oxygen concentrator units.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}