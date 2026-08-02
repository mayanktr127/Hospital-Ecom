"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Leaf, Sun, Recycle, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function SustainabilityPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink">
      <Navbar />

      <main className="wrap max-w-[1140px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="rounded-[36px] bg-[#003865] text-white p-8 md:p-14 mb-12 shadow-[0_28px_60px_-24px_rgba(0,56,101,0.4)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-semibold font-archivo mb-4 border border-white/20">
            <Leaf className="w-4 h-4 text-emerald-400" />
            Environmental Responsibility &amp; ESG
          </span>

          <h1 className="font-archivo font-extrabold text-4xl md:text-6xl text-white mb-4 leading-tight">
            Sustainability &amp; Eco Responsibility
          </h1>

          <p className="text-base md:text-lg font-inter text-white/85 max-w-3xl leading-relaxed">
            Reducing environmental impact in healthcare: Eco-friendly device manufacturing, solar energy powered facilities, and circular mask recycling programs.
          </p>
        </div>

        {/* ESG Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-[#003865]/12 rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F6FA] text-emerald-600 grid place-items-center mb-4">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#003865] mb-2">Solar Clean Energy</h3>
            <p className="text-xs md:text-sm text-[#4A607A] leading-relaxed">
              Photovoltaic solar installations at our Bad Ems headquarters generate over 60% of our annual manufacturing electricity requirement.
            </p>
          </div>

          <div className="bg-white border border-[#003865]/12 rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F6FA] text-emerald-600 grid place-items-center mb-4">
              <Recycle className="w-6 h-6" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#003865] mb-2">Circular Material Reuse</h3>
            <p className="text-xs md:text-sm text-[#4A607A] leading-relaxed">
              REMONDIS certified waste tracking balance reduces plastic production waste by over 45 tons annually.
            </p>
          </div>

          <div className="bg-white border border-[#003865]/12 rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F6FA] text-emerald-600 grid place-items-center mb-4">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#003865] mb-2">Energy-Efficient Turbines</h3>
            <p className="text-xs md:text-sm text-[#4A607A] leading-relaxed">
              LUISA and prismaVENT turbine designs optimize power consumption, reducing carbon footprint during long-term home ventilation.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
