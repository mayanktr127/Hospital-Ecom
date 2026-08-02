"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ShoppingBag, Store, ShieldCheck, CheckCircle2, ArrowRight, FileText } from "lucide-react";

export default function PurchasingSpecialistDealerPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink">
      <Navbar />

      <main className="wrap max-w-[1140px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-14 mb-12 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#e9e6fb] rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md eyebrow mb-4 border border-white">
            <Store className="w-4 h-4 text-[#2a6ecb]" />
            Dealer &amp; Purchasing Network
          </span>

          <h1 className="font-archivo font-medium text-4xl md:text-[64px] tracking-[-0.04em] text-[#0a1f3c] mb-4 leading-[1.0]">
            Purchasing &amp; Specialist Dealer Portal
          </h1>

          <p className="text-base md:text-lg font-inter text-[#182a41] max-w-3xl leading-relaxed">
            Our mission is to enhance our patients&apos; quality of life. To achieve this, we foster strong partnerships with certified medical procurement groups, hospital buyers, and specialist dealers worldwide.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-2">
              <Store className="w-6 h-6" />
            </div>
            <h2 className="font-archivo font-bold text-2xl text-[#0a1f3c]">Specialist Dealers Network</h2>
            <p className="text-sm text-[#64748b] leading-relaxed">
              We provide authorized specialist medical dealers with direct access to certified product documentation, spare parts catalogs, marketing materials, and specialized clinical software licensing.
            </p>
            <div className="pt-2">
              <Link
                href="/professionals/supplier-form"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0a1f3c] text-white text-xs font-semibold hover:bg-[#12315c] transition-colors"
              >
                <span>Supplier Application Form</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center mb-2">
              <ShoppingBag className="w-6 h-6 text-[#1fb37a]" />
            </div>
            <h2 className="font-archivo font-bold text-2xl text-[#0a1f3c]">Hospital &amp; Procurement Buyers</h2>
            <p className="text-sm text-[#64748b] leading-relaxed">
              Hospital purchasing departments receive streamlined procurement support, frameworks for bulk equipment acquisition, customized maintenance contracts, and technical safety inspection compliance.
            </p>
            <div className="pt-2">
              <Link
                href="/downloads"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f6f4fb] border border-[#0a1f3c]/15 text-[#0a1f3c] text-xs font-semibold hover:bg-[#dcebfb] transition-colors"
              >
                <span>Download Clinical Specifications</span>
                <FileText className="w-4 h-4 text-[#2a6ecb]" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}