"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Scale, Building2, Phone, Mail, FileText, CheckCircle2 } from "lucide-react";

export default function LegalNoticePage() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink">
      <Navbar />

      <main className="wrap max-w-[1040px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="rounded-[28px] bg-[#0a1f3c] text-white p-8 md:p-12 mb-10 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#2a6ecb]/20 rounded-full blur-3xl pointer-events-none" />
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-semibold font-archivo mb-3 border border-white/20">
            <Scale className="w-3.5 h-3.5 text-[#2a6ecb]" />
            Regulatory &amp; Legal Compliance
          </span>
          <h1 className="font-archivo font-semibold text-4xl md:text-5xl text-white mb-3">
            Legal Notice (Impressum)
          </h1>
          <p className="text-sm md:text-base font-inter text-[#182a41] max-w-2xl leading-relaxed">
            Information pursuant to Section 5 of the German Telemedia Act (TMG) and EU Medical Device Regulation (MDR 2017/745).
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
              <h2 className="font-archivo font-bold text-xl text-[#0a1f3c]">Corporate Provider Information</h2>
            </div>
            
            <div className="space-y-2 text-sm text-[#64748b] leading-relaxed font-inter pl-2 border-l-2 border-[#2a6ecb]">
              <p className="font-semibold text-[#0a1f3c]">Pulmo Care SE &amp; Co. KG</p>
              <p>#85, 20th Main Rd, 1st N Block</p>
              <p>Rajajinagar, Bengaluru, Karnataka 560010</p>
              <p>India</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#e9edf4] text-xs text-[#64748b]">
              <div>
                <span className="font-bold text-[#0a1f3c] block mb-1">Commercial Register &amp; Registration:</span>
                <p>Register Court: Amtsgericht Koblenz</p>
                <p>Registration Number: HRA 20430</p>
              </div>

              <div>
                <span className="font-bold text-[#0a1f3c] block mb-1">VAT Identification Number (USt-IdNr.):</span>
                <p>DE 149 253 928 (pursuant to §27 a German VAT Tax Act)</p>
              </div>
            </div>
          </div>

          {/* Section 2: General Partner & Management */}
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 md:p-8 shadow-sm">
            <h2 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-4">Personally Liable Partner &amp; Management</h2>
            <div className="space-y-3 text-xs md:text-sm text-[#64748b] leading-relaxed">
              <p>
                <strong>Personally Liable Partner:</strong> Pulmo Care SE (Amtsgericht Koblenz, HRB 26589)
              </p>
              <p>
                <strong>Executive Board / Management:</strong> Reinhard Pulmo Care, Thomas Pulmo Care, Dr. Benjamin Pulmo Care.
              </p>
              <p>
                <strong>Supervisory Board Chair:</strong> Dr. Michael Krüger
              </p>
            </div>
          </div>

          {/* Section 3: Contact Channels */}
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 md:p-8 shadow-sm">
            <h2 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-4">Direct Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#f6f4fb] p-4 rounded-2xl border border-[#e9edf4]">
                <Phone className="w-5 h-5 text-[#2a6ecb] mb-2" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block">Telephone</span>
                <span className="text-xs font-semibold text-[#0a1f3c]">+91 9343444428</span>
              </div>

              <div className="bg-[#f6f4fb] p-4 rounded-2xl border border-[#e9edf4]">
                <FileText className="w-5 h-5 text-[#2a6ecb] mb-2" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block">Telefax</span>
                <span className="text-xs font-semibold text-[#0a1f3c]">+49 2603 9600-50</span>
              </div>

              <div className="bg-[#f6f4fb] p-4 rounded-2xl border border-[#e9edf4]">
                <Mail className="w-5 h-5 text-[#2a6ecb] mb-2" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] block">Email Inquiries</span>
                <span className="text-xs font-semibold text-[#0a1f3c]">enquiry@pulmocare.in</span>
              </div>
            </div>
          </div>

          {/* Section 4: Medical Device Supervision & Regulatory Disclaimer */}
          <div className="bg-white border border-[#e9edf4] rounded-[28px] p-6 md:p-8 shadow-sm space-y-4">
            <h2 className="font-archivo font-bold text-xl text-[#0a1f3c]">Medical Devices Regulation &amp; Disclaimer</h2>
            <div className="space-y-3 text-xs md:text-sm text-[#64748b] leading-relaxed font-inter">
              <p>
                <strong>Competent Regulatory Supervision Authority:</strong> Landesamt für Soziales, Jugend und Versorgung (LSJV) Rheinland-Pfalz, Mainz, India.
              </p>
              <p>
                <strong>Liability for Contents:</strong> As service providers, we are responsible for our own content on these pages in accordance with general legislation (§ 7 Para. 1 TMG). However, according to §§ 8 to 10 TMG, we are not obligated to monitor transmitted or stored external information or to investigate circumstances indicating illegal activity.
              </p>
              <p>
                <strong>Dispute Resolution:</strong> The European Commission provides a platform for online dispute resolution (ODR): <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-[#2a6ecb] underline">https://ec.europa.eu/consumers/odr/</a>. We are neither obliged nor willing to participate in dispute resolution proceedings before a consumer arbitration board.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}