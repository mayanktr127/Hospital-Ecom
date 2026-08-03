"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Scale, Lock, ShieldCheck, CheckCircle2, FileText, AlertCircle } from "lucide-react";

export default function CompliancePage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink font-inter">
      <Navbar />

      <main className="wrap max-w-[1140px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-14 mb-12 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#e9e6fb] rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md eyebrow mb-4 border border-white">
            <Scale className="w-4 h-4 text-[#2a6ecb]" />
            Regulatory Compliance &amp; Standards
          </span>

          <h1 className="font-archivo font-medium text-4xl md:text-[64px] tracking-[-0.04em] text-[#0a1f3c] mb-4 leading-[1.0]">
            Pulmo Care Compliance Framework
          </h1>

          <p className="text-base md:text-lg font-inter text-[#182a41] max-w-3xl leading-relaxed">
            Pulmo Care operates under strict Indian CDSCO medical device regulations, consumer protection laws, transparent warranty standards, and ethical healthcare marketing practices.
          </p>
        </div>

        {/* Compliance Highlights */}
        <div className="bg-white border border-[#e9edf4] rounded-[28px] p-8 md:p-12 shadow-sm space-y-6 font-inter text-[#0a1f3c]">
          <div>
            <h2 className="font-archivo font-bold text-2xl text-[#0a1f3c] mb-3">CDSCO &amp; Indian Regulatory Compliance</h2>
            <p className="text-sm text-[#64748b] leading-relaxed">
              All medical equipment supplied by Pulmo Care — including CPAP/APAP machines, BiPAP systems, ventilators, and oxygen concentrators — holds valid CDSCO (Central Drugs Standard Control Organisation) registration and import licenses.
            </p>
          </div>

          <div className="pt-4 border-t border-[#0a1f3c]/10">
            <h2 className="font-archivo font-bold text-2xl text-[#0a1f3c] mb-3">Ethical Code of Conduct</h2>
            <p className="text-sm text-[#64748b] leading-relaxed">
              We adhere to strict ethical guidelines regarding patient data privacy, prescription-based device dispensing, clear warranty terms, and honest pricing in Indian Rupees (INR) without hidden charges.
            </p>
          </div>

          <div className="pt-4 border-t border-[#0a1f3c]/10">
            <h2 className="font-archivo font-bold text-2xl text-[#0a1f3c] mb-3">Patient Data Protection</h2>
            <p className="text-sm text-[#64748b] leading-relaxed">
              Therapy telemetry data downloaded via SD cards or cloud software (prismaTS / Web-based portals) is handled in full accordance with Indian Information Technology &amp; Data Protection regulations.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}