"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { FileCheck, ShieldCheck, Truck, Scale, CheckCircle2 } from "lucide-react";

export default function GTCSPage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink">
      <Navbar />

      <main className="wrap max-w-[1040px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="rounded-[32px] bg-[#003865] text-white p-8 md:p-12 mb-10 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#007AC1]/20 rounded-full blur-3xl pointer-events-none" />
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-semibold font-archivo mb-3 border border-white/20">
            <FileCheck className="w-3.5 h-3.5 text-[#007AC1]" />
            Terms of Business &amp; Delivery
          </span>
          <h1 className="font-archivo font-extrabold text-4xl md:text-5xl text-white mb-3">
            General Terms and Conditions (GTCs)
          </h1>
          <p className="text-sm md:text-base font-inter text-white/85 max-w-2xl leading-relaxed">
            Allgemeine Geschäftsbedingungen für Verkäufe, Lieferungen, Wartungen und Reparaturen von Löwenstein Medical SE &amp; Co. KG.
          </p>
        </div>

        {/* GTC Content */}
        <div className="space-y-8 font-inter text-[#003865]">
          <div className="bg-white border border-[#003865]/12 rounded-[28px] p-6 md:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="font-archivo font-bold text-xl text-[#003865] mb-2">1. Scope of Application</h2>
              <p className="text-xs md:text-sm text-[#4A607A] leading-relaxed">
                These General Terms and Conditions (GTCs) apply to all contracts, commercial purchase orders, maintenance agreements, and technical safety inspections (STK) executed between Löwenstein Medical SE &amp; Co. KG and healthcare institutions, commercial distributors, or individual users.
              </p>
            </div>

            <div className="pt-4 border-t border-[#003865]/08">
              <h2 className="font-archivo font-bold text-xl text-[#003865] mb-2">2. Delivery &amp; Transport Conditions</h2>
              <p className="text-xs md:text-sm text-[#4A607A] leading-relaxed">
                Unless expressly agreed otherwise in writing, delivery of medical devices, ventilators, anesthesia workstations, and consumable masks is fulfilled CPT (Carriage Paid To) designated hospital facilities or specialist dealer depots within Germany and international shipping zones.
              </p>
            </div>

            <div className="pt-4 border-t border-[#003865]/08">
              <h2 className="font-archivo font-bold text-xl text-[#003865] mb-2">3. Warranty &amp; Technical Safety Inspections (STK)</h2>
              <p className="text-xs md:text-sm text-[#4A607A] leading-relaxed">
                Löwenstein Medical warrants that all Class IIa and Class IIb medical devices comply strictly with European EU MDR 2017/745 standards. Statutory warranty periods for capital equipment apply for 24 months from the initial commissioning date.
              </p>
            </div>

            <div className="pt-4 border-t border-[#003865]/08">
              <h2 className="font-archivo font-bold text-xl text-[#003865] mb-2">4. Applicable Law &amp; Jurisdiction</h2>
              <p className="text-xs md:text-sm text-[#4A607A] leading-relaxed">
                The laws of the Federal Republic of Germany shall apply exclusively, excluding the UN Convention on Contracts for the International Sale of Goods (CISG). Place of performance and place of jurisdiction is Bad Ems / Koblenz, Germany.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
