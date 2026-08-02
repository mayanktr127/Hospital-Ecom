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
        <div className="rounded-[36px] bg-[#003865] text-white p-8 md:p-14 mb-12 shadow-[0_28px_60px_-24px_rgba(0,56,101,0.4)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#007AC1]/20 rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-semibold font-archivo mb-4 border border-white/20">
            <Factory className="w-4 h-4 text-[#007AC1]" />
            Dual Role Leadership
          </span>

          <h1 className="font-archivo font-extrabold text-4xl md:text-6xl text-white mb-4 leading-tight">
            Manufacturer &amp; Service Provider
          </h1>

          <p className="text-base md:text-lg font-inter text-white/85 max-w-3xl leading-relaxed">
            Löwenstein Medical uniquely combines in-house device manufacturing with comprehensive clinical service, logistics, and maintenance support.
          </p>
        </div>

        {/* Dual Pillar Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Pillar 1: Manufacturer */}
          <div className="bg-white border border-[#003865]/12 rounded-[32px] p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F6FA] text-[#007AC1] grid place-items-center mb-2">
              <Factory className="w-6 h-6" />
            </div>
            <h2 className="font-archivo font-bold text-2xl text-[#003865]">As a Manufacturer</h2>
            <p className="text-sm text-[#4A607A] leading-relaxed">
              We design, engineer, and assemble medical devices in state-of-the-art facilities in Bad Ems and Hamburg. Our production facilities fulfill ISO 13485 quality standards, producing precision ICU ventilators, anesthesia workstations, and CPAP masks.
            </p>

            <ul className="space-y-2 text-xs text-[#4A607A] pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Proprietary turbine &amp; sensor technology</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% calibrated quality testing before dispatch</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Service Provider */}
          <div className="bg-white border border-[#003865]/12 rounded-[32px] p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F6FA] text-[#007AC1] grid place-items-center mb-2">
              <Wrench className="w-6 h-6 text-[#007AC1]" />
            </div>
            <h2 className="font-archivo font-bold text-2xl text-[#003865]">As a Service Provider</h2>
            <p className="text-sm text-[#4A607A] leading-relaxed">
              Beyond hardware, we provide 24/7 technical field maintenance, spare parts logistics, emergency replacement units, and technical safety inspections (STK) directly to hospitals and homecare patients.
            </p>

            <ul className="space-y-2 text-xs text-[#4A607A] pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Certified field service technicians nationwide</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
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
