"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Scale, Building2, Phone, Mail, FileText, CheckCircle2 } from "lucide-react";

export default function LegalNoticePage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F8FAFC] text-[#0A192F] font-inter">
      <Navbar />

      <main className="wrap max-w-[1040px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-12 mb-10 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#e9e6fb] rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-xs font-bold font-inter mb-3 border border-white text-[#2a6ecb]">
            <Scale className="w-3.5 h-3.5 text-[#2a6ecb]" />
            Regulatory &amp; Legal Compliance
          </span>

          <h1 className="font-archivo font-medium text-3xl md:text-4xl text-[#0a1f3c] mb-3">
            Legal Notice &amp; Corporate Information
          </h1>

          <p className="text-sm md:text-base font-inter text-[#64748b] max-w-2xl leading-relaxed">
            Corporate identification, CDSCO medical device compliance, and contact disclosures for Pulmo Care India.
          </p>
        </div>

        {/* Legal Body Sections */}
        <div className="space-y-8 font-inter text-[#0a1f3c]">
          {/* Section 1: Corporate Details */}
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="font-archivo font-bold text-xl text-[#0a1f3c]">Corporate Entity Disclosures</h2>
            </div>
            
            <div className="space-y-2 text-sm text-[#64748b] leading-relaxed font-inter pl-2 border-l-2 border-[#2a6ecb]">
              <p className="font-bold text-[#0a1f3c]">Pulmo Care</p>
              <p>#85, 20th Main Rd, 1st N Block</p>
              <p>Rajajinagar, Bengaluru, Karnataka 560010</p>
              <p>India</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#e9edf4] text-xs text-[#64748b]">
              <div>
                <span className="font-bold text-[#0a1f3c] block mb-1">Corporate Registration:</span>
                <p>Registered Office: Bengaluru, Karnataka</p>
                <p>Medical Device Import &amp; Supply License: CDSCO Authorized</p>
              </div>

              <div>
                <span className="font-bold text-[#0a1f3c] block mb-1">GST Registration &amp; Tax ID:</span>
                <p>GSTIN: Authorized Indian Medical Provider</p>
              </div>
            </div>
          </div>

          {/* Section 2: Contact Channels */}
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 md:p-8 shadow-sm">
            <h2 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-4">Direct Contact &amp; Support Channels</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#f6f4fb] p-4 rounded-2xl border border-[#e9edf4]">
                <Phone className="w-5 h-5 text-[#2a6ecb] mb-2" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block">Telephone Helpline</span>
                <span className="text-xs font-semibold text-[#0a1f3c]">+91 93434 44428</span>
              </div>

              <div className="bg-[#f6f4fb] p-4 rounded-2xl border border-[#e9edf4]">
                <Mail className="w-5 h-5 text-[#2a6ecb] mb-2" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block">Email Disclosures</span>
                <span className="text-xs font-semibold text-[#0a1f3c]">enquiry@pulmocare.in</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}