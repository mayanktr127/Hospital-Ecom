"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Building2, Award, ShieldCheck, CheckCircle2, Users, HeartPulse, Globe2, MapPin, Phone, Mail } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink font-inter">
      <Navbar />

      <main className="wrap max-w-[1140px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-14 mb-12 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#e9e6fb] rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md eyebrow mb-4 border border-white">
            <Building2 className="w-4 h-4 text-[#2a6ecb]" />
            About Pulmo Care
          </span>

          <h1 className="font-archivo font-medium text-4xl md:text-[64px] tracking-[-0.04em] text-[#0a1f3c] mb-4 leading-[1.0]">
            India&apos;s Trusted Respiratory &amp; Sleep Care Partner
          </h1>

          <p className="text-base md:text-lg font-inter text-[#182a41] max-w-3xl leading-relaxed">
            Pulmo Care is dedicated to improving life quality through world-class medical equipment, sleep apnea therapy, oxygen solutions, and critical care ventilation.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-4">
              <HeartPulse className="w-6 h-6 text-[#2a6ecb]" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">Sleep &amp; Respiratory Focus</h3>
            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
              Specialized in CPAP, APAP, BiLevel S/ST, ASV devices, oxygen concentrators, and diagnostic sleep polygraphy systems.
            </p>
          </div>

          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-4">
              <Globe2 className="w-6 h-6 text-[#2a6ecb]" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">Global Medical Partnerships</h3>
            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
              Authorized provider for world-renowned international brands including Löwenstein Medical, Inogen, and Nidek Medical.
            </p>
          </div>

          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-4">
              <Users className="w-6 h-6 text-[#2a6ecb]" />
            </div>
            <h3 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">Patient-Centric Service</h3>
            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
              Comprehensive care model — mask fitting, home setup, therapy data reporting, maintenance calibration, and 24/7 technical hotline.
            </p>
          </div>
        </div>

        {/* Detailed Story & Mission */}
        <div className="bg-white border border-[#e9edf4] rounded-[28px] p-8 md:p-12 shadow-sm space-y-8 font-inter text-[#0a1f3c]">
          <div>
            <h2 className="font-archivo font-bold text-2xl md:text-3xl text-[#0a1f3c] mb-4">
              Our Journey &amp; Clinical Mission
            </h2>
            <p className="text-sm md:text-base text-[#64748b] leading-relaxed mb-4">
              Pulmo Care was established to bridge the gap between advanced medical technology and patient needs in India. Headquartered in Bengaluru, we work closely with leading pulmonologists, somnologists, neurologists, and intensive care units to deliver precise respiratory solutions.
            </p>
            <p className="text-sm md:text-base text-[#64748b] leading-relaxed">
              Whether supporting a patient suffering from Obstructive Sleep Apnea (OSA) with a silent CPAP system or providing life-support ventilation for chronic respiratory failure, Pulmo Care guarantees authenticity, warranty protection, and prompt technical service.
            </p>
          </div>

          {/* Location & Headquarters */}
          <div className="pt-6 border-t border-[#0a1f3c]/10 grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#f8fafc] p-6 rounded-2xl border border-[#e2e8f0]">
            <div>
              <span className="font-archivo font-bold text-[#0a1f3c] flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[#2a6ecb]" />
                Headquarters Address
              </span>
              <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
                Pulmo Care<br />
                #85, 20th Main Rd, 1st N Block,<br />
                Rajajinagar, Bengaluru, Karnataka 560010, India
              </p>
            </div>
            <div>
              <span className="font-archivo font-bold text-[#0a1f3c] flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-[#2a6ecb]" />
                Direct Contact &amp; Helpline
              </span>
              <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
                Helpline: +91 93434 44428<br />
                Email: enquiry@pulmocare.in<br />
                Website: https://pulmocare.in
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#0a1f3c]/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs md:text-sm text-[#64748b]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#1fb37a] shrink-0" />
              <span>Genuine Factory-Warranted Medical Devices</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#1fb37a] shrink-0" />
              <span>Certified Sleep Therapy Titration &amp; Data Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#1fb37a] shrink-0" />
              <span>Pan-India Rental &amp; Purchase Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#1fb37a] shrink-0" />
              <span>24/7 Clinical &amp; Biomedical Engineer Support</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}