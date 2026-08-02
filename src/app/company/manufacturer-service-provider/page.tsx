"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Factory, Wrench, ShieldCheck, CheckCircle2, Truck, Server } from "lucide-react";

export default function ManufacturerServiceProviderPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink">
      <Navbar />

      <main className="wrap max-w-[1140px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-14 mb-12 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#e9e6fb] rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md eyebrow mb-4 border border-white">
            <Factory className="w-4 h-4 text-[#2a6ecb]" />
            Dual Role Leadership
          </span>

          <h1 className="font-archivo font-medium text-4xl md:text-[64px] tracking-[-0.04em] text-[#0a1f3c] mb-4 leading-[1.0]">
            Manufacturer &amp; Service Provider
          </h1>

          <p className="text-base md:text-lg font-inter text-[#182a41] max-w-3xl leading-relaxed">
            Löwenstein Medical uniquely combines in-house device manufacturing with comprehensive clinical service, logistics, and maintenance support.
          </p>
        </div>

        {/* Dual Pillar Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Pillar 1: Manufacturer */}
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-2">
              <Factory className="w-6 h-6" />
            </div>
            <h2 className="font-archivo font-bold text-2xl text-[#0a1f3c]">As a Manufacturer</h2>
            <p className="text-sm text-[#64748b] leading-relaxed">
              We design, engineer, and assemble medical devices in state-of-the-art facilities in Bad Ems and Hamburg. Our production facilities fulfill ISO 13485 quality standards, producing precision ICU ventilators, anesthesia workstations, and CPAP masks.
            </p>

            <ul className="space-y-2 text-xs text-[#64748b] pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0" />
                <span>Proprietary turbine &amp; sensor technology</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0" />
                <span>100% calibrated quality testing before dispatch</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Service Provider */}
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-2">
              <Wrench className="w-6 h-6 text-[#2a6ecb]" />
            </div>
            <h2 className="font-archivo font-bold text-2xl text-[#0a1f3c]">As a Service Provider</h2>
            <p className="text-sm text-[#64748b] leading-relaxed">
              Beyond hardware, we provide 24/7 technical field maintenance, spare parts logistics, emergency replacement units, and technical safety inspections (STK) directly to hospitals and homecare patients.
            </p>

            <ul className="space-y-2 text-xs text-[#64748b] pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0" />
                <span>Certified field service technicians nationwide</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0" />
                <span>Remote support &amp; telemetry monitoring suites</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}