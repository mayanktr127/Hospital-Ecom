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
        <div className="rounded-[36px] bg-[#003865] text-white p-8 md:p-14 mb-12 shadow-[0_28px_60px_-24px_rgba(0,56,101,0.4)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#007AC1]/20 rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-semibold font-archivo mb-4 border border-white/20">
            <Scale className="w-4 h-4 text-[#007AC1]" />
            Corporate Integrity &amp; Ethics
          </span>

          <h1 className="font-archivo font-extrabold text-4xl md:text-6xl text-white mb-4 leading-tight">
            Corporate Compliance &amp; Ethics
          </h1>

          <p className="text-base md:text-lg font-inter text-white/85 max-w-3xl leading-relaxed">
            Löwenstein Medical enforces zero-tolerance policies against bribery, antitrust violations, and supply chain non-compliance.
          </p>
        </div>

        {/* Compliance Highlights */}
        <div className="bg-white border border-[#003865]/12 rounded-[32px] p-8 md:p-12 shadow-sm space-y-6 font-inter text-[#003865]">
          <div>
            <h2 className="font-archivo font-bold text-2xl text-[#003865] mb-3">Code of Conduct</h2>
            <p className="text-sm text-[#4A607A] leading-relaxed">
              Our Code of Conduct binds all employees, management, and global distributors to legal integrity, ethical purchasing, fair competition, and strict compliance with German and international medical device marketing laws (HWG).
            </p>
          </div>

          <div className="pt-4 border-t border-[#003865]/10">
            <h2 className="font-archivo font-bold text-2xl text-[#003865] mb-3">Whistleblower System (Hinweisgebersystem)</h2>
            <p className="text-sm text-[#4A607A] leading-relaxed">
              In accordance with the EU Whistleblower Directive (2019/1937) and German Hinweisgeberschutzgesetz (HinSchG), employees and external partners can submit confidential compliance reports regarding regulatory, financial, or data safety violations.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
