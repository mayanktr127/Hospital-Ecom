"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ShieldCheck, Lock, Eye, CheckCircle2, Mail, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink">
      <Navbar />

      <main className="wrap max-w-[1040px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="rounded-[28px] bg-[#0a1f3c] text-white p-8 md:p-12 mb-10 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#2a6ecb]/20 rounded-full blur-3xl pointer-events-none" />
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-semibold font-archivo mb-3 border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2a6ecb]" />
            GDPR Compliance Declaration (EU 2016/679)
          </span>
          <h1 className="font-archivo font-semibold text-4xl md:text-5xl text-white mb-3">
            Privacy Policy &amp; Data Protection
          </h1>
          <p className="text-sm md:text-base font-inter text-[#182a41] max-w-2xl leading-relaxed">
            How Pulmo Care SE &amp; Co. KG processes, stores, and protects patient and healthcare provider personal data in compliance with European GDPR directives.
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-8 font-inter text-[#0a1f3c]">
          {/* Section 1: Data Controller */}
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <h2 className="font-archivo font-bold text-xl text-[#0a1f3c]">Data Controller &amp; Contact</h2>
            </div>
            
            <div className="text-xs md:text-sm text-[#64748b] leading-relaxed space-y-3">
              <p>
                The entity responsible for processing personal data on this website pursuant to Art. 4 No. 7 GDPR is:
              </p>
              <div className="p-4 rounded-2xl bg-[#f6f4fb] border border-[#e9edf4] font-mono text-[#0a1f3c]">
                <p className="font-bold font-sans text-sm">Pulmo Care SE &amp; Co. KG</p>
                <p>#85, 20th Main Rd, 1st N Block, Rajajinagar, Bengaluru, Karnataka 560010, India</p>
                <p>Data Protection Officer: <span className="underline">datenschutz@loewensteinmedical.de</span></p>
              </div>
            </div>
          </div>

          {/* Section 2: Data Collection Principles */}
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 md:p-8 shadow-sm space-y-4">
            <h2 className="font-archivo font-bold text-xl text-[#0a1f3c]">Principles of Data Processing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#64748b]">
              <div className="p-4 rounded-2xl bg-[#f6f4fb] border border-[#e9edf4]">
                <span className="font-bold text-[#0a1f3c] block mb-1">Server Log Files (Art. 6(1)(f) GDPR):</span>
                <p>IP addresses, browser type, operating system, timestamp, and requested download filenames are automatically logged to ensure server integrity and DDoS protection.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f6f4fb] border border-[#e9edf4]">
                <span className="font-bold text-[#0a1f3c] block mb-1">Document Request Forms (Art. 6(1)(b) GDPR):</span>
                <p>Form submissions for manual inquiries or custom IFUs store name, email, institution, and device model exclusively to fulfill regulatory fulfillment requirements.</p>
              </div>
            </div>
          </div>

          {/* Section 3: User Rights */}
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 md:p-8 shadow-sm space-y-4">
            <h2 className="font-archivo font-bold text-xl text-[#0a1f3c]">Your Rights Under GDPR</h2>
            <div className="space-y-3 text-xs md:text-sm text-[#64748b] leading-relaxed">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0 mt-0.5" />
                <span><strong>Right of Access (Art. 15 GDPR):</strong> Right to obtain confirmation as to whether personal data concerning you is processed.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0 mt-0.5" />
                <span><strong>Right to Rectification (Art. 16 GDPR):</strong> Right to request completion or correction of inaccurate personal data.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0 mt-0.5" />
                <span><strong>Right to Erasure (Art. 17 GDPR):</strong> Right to request deletion of personal data (&quot;Right to be forgotten&quot;).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0 mt-0.5" />
                <span><strong>Right to Data Portability (Art. 20 GDPR):</strong> Right to receive personal data in a structured, machine-readable format.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}