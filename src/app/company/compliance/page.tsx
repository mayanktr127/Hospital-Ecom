"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Scale, Lock, ShieldCheck, CheckCircle2, FileText, AlertCircle } from "lucide-react";

export default function CompliancePage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink">
      <Navbar />

      <main className="wrap max-w-[1140px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-14 mb-12 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#e9e6fb] rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md eyebrow mb-4 border border-white">
            <Scale className="w-4 h-4 text-[#2a6ecb]" />
            Corporate Integrity &amp; Ethics
          </span>

          <h1 className="font-archivo font-medium text-4xl md:text-[64px] tracking-[-0.04em] text-[#0a1f3c] mb-4 leading-[1.0]">
            Corporate Compliance &amp; Ethics
          </h1>

          <p className="text-base md:text-lg font-inter text-[#182a41] max-w-3xl leading-relaxed">
            Löwenstein Medical enforces zero-tolerance policies against bribery, antitrust violations, and supply chain non-compliance.
          </p>
        </div>

        {/* Compliance Highlights */}
        <div className="bg-white border border-[#e9edf4] rounded-[28px] p-8 md:p-12 shadow-sm space-y-6 font-inter text-[#0a1f3c]">
          <div>
            <h2 className="font-archivo font-bold text-2xl text-[#0a1f3c] mb-3">Code of Conduct</h2>
            <p className="text-sm text-[#64748b] leading-relaxed">
              Our Code of Conduct binds all employees, management, and global distributors to legal integrity, ethical purchasing, fair competition, and strict compliance with German and international medical device marketing laws (HWG).
            </p>
          </div>

          <div className="pt-4 border-t border-[#0a1f3c]/10">
            <h2 className="font-archivo font-bold text-2xl text-[#0a1f3c] mb-3">Whistleblower System (Hinweisgebersystem)</h2>
            <p className="text-sm text-[#64748b] leading-relaxed">
              In accordance with the EU Whistleblower Directive (2019/1937) and German Hinweisgeberschutzgesetz (HinSchG), employees and external partners can submit confidential compliance reports regarding regulatory, financial, or data safety violations.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}