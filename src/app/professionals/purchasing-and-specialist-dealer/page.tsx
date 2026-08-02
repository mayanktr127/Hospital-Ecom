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
        <div className="rounded-[36px] bg-[#003865] text-white p-8 md:p-14 mb-12 shadow-[0_28px_60px_-24px_rgba(0,56,101,0.4)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#007AC1]/20 rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-semibold font-archivo mb-4 border border-white/20">
            <Store className="w-4 h-4 text-[#007AC1]" />
            Dealer &amp; Purchasing Network
          </span>

          <h1 className="font-archivo font-extrabold text-4xl md:text-6xl text-white mb-4 leading-tight">
            Purchasing &amp; Specialist Dealer Portal
          </h1>

          <p className="text-base md:text-lg font-inter text-white/85 max-w-3xl leading-relaxed">
            Our mission is to enhance our patients&apos; quality of life. To achieve this, we foster strong partnerships with certified medical procurement groups, hospital buyers, and specialist dealers worldwide.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-[#003865]/12 rounded-[32px] p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F6FA] text-[#007AC1] grid place-items-center mb-2">
              <Store className="w-6 h-6" />
            </div>
            <h2 className="font-archivo font-bold text-2xl text-[#003865]">Specialist Dealers Network</h2>
            <p className="text-sm text-[#4A607A] leading-relaxed">
              We provide authorized specialist medical dealers with direct access to certified product documentation, spare parts catalogs, marketing materials, and specialized clinical software licensing.
            </p>
            <div className="pt-2">
              <Link
                href="/professionals/supplier-form"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#003865] text-white text-xs font-semibold hover:bg-[#005A9C] transition-colors"
              >
                <span>Supplier Application Form</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-white border border-[#003865]/12 rounded-[32px] p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F0F6FA] text-[#007AC1] grid place-items-center mb-2">
              <ShoppingBag className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="font-archivo font-bold text-2xl text-[#003865]">Hospital &amp; Procurement Buyers</h2>
            <p className="text-sm text-[#4A607A] leading-relaxed">
              Hospital purchasing departments receive streamlined procurement support, frameworks for bulk equipment acquisition, customized maintenance contracts, and technical safety inspection compliance.
            </p>
            <div className="pt-2">
              <Link
                href="/downloads"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F0F6FA] border border-[#003865]/15 text-[#003865] text-xs font-semibold hover:bg-[#D8E7F3] transition-colors"
              >
                <span>Download Clinical Specifications</span>
                <FileText className="w-4 h-4 text-[#007AC1]" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
