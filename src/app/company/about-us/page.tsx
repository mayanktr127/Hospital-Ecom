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
        <div className="rounded-[36px] bg-[#003865] text-white p-8 md:p-14 mb-12 shadow-[0_28px_60px_-24px_rgba(0,56,101,0.4)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#007AC1]/20 rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-semibold font-archivo mb-4 border border-white/20">
            <Building2 className="w-4 h-4 text-[#007AC1]" />
            About Löwenstein Medical
          </span>

          <h1 className="font-archivo font-extrabold text-4xl md:text-6xl text-white mb-4 leading-tight">
            40 Years of Medical Engineering Excellence
          </h1>

          <p className="text-base md:text-lg font-inter text-white/85 max-w-3xl leading-relaxed">
            Löwenstein has been developing and distributing medical technology for 40 years. Ventilation is our field of expertise — not only supporting breathing, but saving lives, maintaining health, and simplifying care.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-[#003865]/12 rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F6FA] text-[#007AC1] grid place-items-center mb-4">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#003865] mb-2">Our Expertise</h3>
            <p className="text-xs md:text-sm text-[#4A607A] leading-relaxed">
              Specialized in intensive care ventilation, neonatology, sleep diagnostics, anesthesia workstations, and homecare ventilation systems.
            </p>
          </div>

          <div className="bg-white border border-[#003865]/12 rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F6FA] text-[#007AC1] grid place-items-center mb-4">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#003865] mb-2">Global Reach</h3>
            <p className="text-xs md:text-sm text-[#4A607A] leading-relaxed">
              Serving hospitals, specialist dealers, and homecare patients across 100+ countries with German-engineered quality and compliance.
            </p>
          </div>

          <div className="bg-white border border-[#003865]/12 rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F6FA] text-[#007AC1] grid place-items-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#003865] mb-2">With People in Mind</h3>
            <p className="text-xs md:text-sm text-[#4A607A] leading-relaxed">
              Our guiding slogan defines our patient-centric approach — providing innovative support for clinicians, caregivers, and families alike.
            </p>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="bg-white border border-[#003865]/12 rounded-[32px] p-8 md:p-12 shadow-sm space-y-8 font-inter text-[#003865]">
          <div>
            <h2 className="font-archivo font-bold text-2xl md:text-3xl text-[#003865] mb-4">
              Pioneers in Medical Ventilation &amp; Respiratory Care
            </h2>
            <p className="text-sm md:text-base text-[#4A607A] leading-relaxed mb-4">
              Founded in Germany, Löwenstein Medical SE &amp; Co. KG has grown into a premier medical technology company. Our development centers in Bad Ems, Hamburg, and Karlsruhe engineer state-of-the-art ventilation systems such as <strong>LUISA</strong>, <strong>prismaVENT</strong>, <strong>LEON plus</strong>, and <strong>elisa ICU ventilators</strong>.
            </p>
            <p className="text-sm md:text-base text-[#4A607A] leading-relaxed">
              We stand by healthcare providers every step of the way — from initial sleep diagnostic polysomnography to emergency room ventilation and lifelong home care support.
            </p>
          </div>

          <div className="pt-6 border-t border-[#003865]/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm text-[#4A607A]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>ISO 13485 Certified Medical Quality Management</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Full Compliance with EU MDR 2017/745 Regulations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>100% In-house Development &amp; Clinical Testing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Dedicated Academy Training for Healthcare Professionals</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
