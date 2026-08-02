"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Building2, Award, HeartHandshake, ShieldCheck, CheckCircle2, Users, Flame, Globe2 } from "lucide-react";
import { motion } from "motion/react";

export default function AboutUsPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink">
      <Navbar />

      <main className="wrap max-w-[1140px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-14 mb-12 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#e9e6fb] rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md eyebrow mb-4 border border-white">
            <Building2 className="w-4 h-4 text-[#2a6ecb]" />
            About Löwenstein Medical
          </span>

          <h1 className="font-archivo font-medium text-4xl md:text-[64px] tracking-[-0.04em] text-[#0a1f3c] mb-4 leading-[1.0]">
            40 Years of Medical Engineering Excellence
          </h1>

          <p className="text-base md:text-lg font-inter text-[#182a41] max-w-3xl leading-relaxed">
            Löwenstein has been developing and distributing medical technology for 40 years. Ventilation is our field of expertise — not only supporting breathing, but saving lives, maintaining health, and simplifying care.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-4">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">Our Expertise</h3>
            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
              Specialized in intensive care ventilation, neonatology, sleep diagnostics, anesthesia workstations, and homecare ventilation systems.
            </p>
          </div>

          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">Global Reach</h3>
            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
              Serving hospitals, specialist dealers, and homecare patients across 100+ countries with German-engineered quality and compliance.
            </p>
          </div>

          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">With People in Mind</h3>
            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
              Our guiding slogan defines our patient-centric approach — providing innovative support for clinicians, caregivers, and families alike.
            </p>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="bg-white border border-[#e9edf4] rounded-[28px] p-8 md:p-12 shadow-sm space-y-8 font-inter text-[#0a1f3c]">
          <div>
            <h2 className="font-archivo font-bold text-2xl md:text-3xl text-[#0a1f3c] mb-4">
              Pioneers in Medical Ventilation &amp; Respiratory Care
            </h2>
            <p className="text-sm md:text-base text-[#64748b] leading-relaxed mb-4">
              Founded in Germany, Löwenstein Medical SE &amp; Co. KG has grown into a premier medical technology company. Our development centers in Bad Ems, Hamburg, and Karlsruhe engineer state-of-the-art ventilation systems such as <strong>LUISA</strong>, <strong>prismaVENT</strong>, <strong>LEON plus</strong>, and <strong>elisa ICU ventilators</strong>.
            </p>
            <p className="text-sm md:text-base text-[#64748b] leading-relaxed">
              We stand by healthcare providers every step of the way — from initial sleep diagnostic polysomnography to emergency room ventilation and lifelong home care support.
            </p>
          </div>

          <div className="pt-6 border-t border-[#0a1f3c]/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm text-[#64748b]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#1fb37a] shrink-0" />
              <span>ISO 13485 Certified Medical Quality Management</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#1fb37a] shrink-0" />
              <span>Full Compliance with EU MDR 2017/745 Regulations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#1fb37a] shrink-0" />
              <span>100% In-house Development &amp; Clinical Testing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#1fb37a] shrink-0" />
              <span>Dedicated Academy Training for Healthcare Professionals</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}