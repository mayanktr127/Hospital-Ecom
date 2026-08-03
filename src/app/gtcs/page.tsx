"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { FileCheck, ShieldCheck, Truck, Scale, CheckCircle2 } from "lucide-react";

export default function GTCSPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F8FAFC] text-[#0A192F] font-inter">
      <Navbar />

      <main className="wrap max-w-[1040px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-12 mb-10 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#e9e6fb] rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-xs font-bold font-inter mb-3 border border-white text-[#2a6ecb]">
            <FileCheck className="w-3.5 h-3.5 text-[#2a6ecb]" />
            Commercial &amp; Service Terms
          </span>

          <h1 className="font-archivo font-medium text-3xl md:text-4xl text-[#0a1f3c] mb-3">
            General Terms &amp; Conditions (GTCs)
          </h1>

          <p className="text-sm md:text-base font-inter text-[#64748b] max-w-2xl leading-relaxed">
            Commercial terms of sale, delivery, device rental, and technical maintenance for Pulmo Care respiratory and sleep therapy equipment in India.
          </p>
        </div>

        {/* GTC Content */}
        <div className="space-y-8 font-inter text-[#0a1f3c]">
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 md:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">1. Scope of Application</h2>
              <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
                These General Terms and Conditions apply to all equipment sales, CPAP/BiPAP rentals, home oxygen deliveries, and annual maintenance contracts (AMC/CMC) fulfilled by Pulmo Care across India.
              </p>
            </div>

            <div className="pt-4 border-t border-[#e9edf4]">
              <h2 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">2. Delivery &amp; Installation Services</h2>
              <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
                Pulmo Care provides direct door-step delivery and clinical setup by trained biomedical engineers. Delivery timelines range from 24 to 48 hours in metro cities and 3 to 5 business days for regional deliveries.
              </p>
            </div>

            <div className="pt-4 border-t border-[#e9edf4]">
              <h2 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">3. Warranty &amp; Technical Support</h2>
              <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
                All medical devices supplied by Pulmo Care carry an official manufacturer warranty (typically 24 months for CPAP/BiLevel devices and ICU ventilators). Technical support and standby units are provided for critical home ventilation patients.
              </p>
            </div>

            <div className="pt-4 border-t border-[#e9edf4]">
              <h2 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">4. Applicable Law &amp; Jurisdiction</h2>
              <p className="text-xs md:text-sm text-[#64748b] leading-relaxed">
                All commercial agreements and services shall be governed exclusively by the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Bengaluru, Karnataka.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}