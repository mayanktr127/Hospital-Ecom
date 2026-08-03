"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ShieldCheck, Lock, Eye, CheckCircle2, Mail, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F8FAFC] text-[#0A192F] font-inter">
      <Navbar />

      <main className="wrap max-w-[1040px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-12 mb-10 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#e9e6fb] rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-xs font-bold font-inter mb-3 border border-white text-[#2a6ecb]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2a6ecb]" />
            Data Protection &amp; Patient Privacy Declaration
          </span>

          <h1 className="font-archivo font-medium text-3xl md:text-4xl text-[#0a1f3c] mb-3">
            Privacy Policy &amp; Data Protection
          </h1>

          <p className="text-sm md:text-base font-inter text-[#64748b] max-w-2xl leading-relaxed">
            How Pulmo Care India collects, processes, stores, and protects patient data, physician inquiries, and device telemetry under Indian Digital Personal Data Protection standards.
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
                The entity responsible for data protection and medical device privacy compliance on this website is:
              </p>
              <div className="p-4 rounded-2xl bg-[#f6f4fb] border border-[#e9edf4] font-mono text-[#0a1f3c]">
                <p className="font-bold font-sans text-sm">Pulmo Care</p>
                <p>#85, 20th Main Rd, 1st N Block, Rajajinagar, Bengaluru, Karnataka 560010, India</p>
                <p>Data Privacy Officer Email: <span className="underline">enquiry@pulmocare.in</span></p>
              </div>
            </div>
          </div>

          {/* Section 2: Data Collection Principles */}
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 md:p-8 shadow-sm space-y-4">
            <h2 className="font-archivo font-bold text-xl text-[#0a1f3c]">Principles of Data Processing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#64748b]">
              <div className="p-4 rounded-2xl bg-[#f6f4fb] border border-[#e9edf4]">
                <span className="font-bold text-[#0a1f3c] block mb-1">Doctor &amp; Hospital Demo Inquiries:</span>
                <p>Forms submitted for equipment demonstrations store physician name, hospital details, contact phone, and requested device models solely for clinical demo coordination.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#f6f4fb] border border-[#e9edf4]">
                <span className="font-bold text-[#0a1f3c] block mb-1">Customer E-Commerce &amp; Order Fulfillment:</span>
                <p>Order transactions store delivery addresses and phone numbers to fulfill delivery of CPAP masks, oxygen concentrators, and ventilator accessories.</p>
              </div>
            </div>
          </div>

          {/* Section 3: User Rights */}
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 md:p-8 shadow-sm space-y-4">
            <h2 className="font-archivo font-bold text-xl text-[#0a1f3c]">Your Privacy Rights</h2>
            <div className="space-y-3 text-xs md:text-sm text-[#64748b] leading-relaxed">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0 mt-0.5" />
                <span><strong>Right of Information:</strong> Right to know what personal or clinical data is collected during order processing.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0 mt-0.5" />
                <span><strong>Right to Correction:</strong> Right to request correction or updating of contact details or delivery addresses.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0 mt-0.5" />
                <span><strong>Right to Deletion:</strong> Right to request deletion of personal information upon completion of equipment warranty periods.</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}