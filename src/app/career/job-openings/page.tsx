"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Briefcase, ArrowUpRight, MapPin, Building2, CheckCircle2, Mail } from "lucide-react";

export default function CareerJobOpeningsPage() {
  const jobs = [
    {
      title: "Biomedical Service Engineer — Sleep & Ventilation Systems",
      location: "Bengaluru (HQ) / Field Visit Karnataka",
      type: "Full-time",
      department: "Biomedical Technical Services",
      description: "Installation, pressure calibration, preventive maintenance, and emergency troubleshooting for CPAP/BiPAP and home ventilators.",
    },
    {
      title: "Clinical Application Specialist — ICU & Home Respiratory Care",
      location: "Bengaluru / Field Regional South India",
      type: "Full-time",
      department: "Clinical Training & Support",
      description: "Conducting clinical demonstrations for pulmonologists, mask fitting sessions, and therapy data reporting (prismaTS / titration software).",
    },
    {
      title: "Medical Equipment Sales Manager — Respiratory Care",
      location: "Bengaluru / Remote Field",
      type: "Full-time",
      department: "Hospital & Patient Sales",
      description: "Managing relationships with sleep clinic labs, hospitals, and homecare patients for sale & rental of sleep therapy equipment.",
    },
    {
      title: "Customer Support & Hotline Executive",
      location: "Bengaluru Office",
      type: "Full-time",
      department: "Patient & Customer Care",
      description: "Handling patient inquiries, managing rental logistics, order tracking, and 24/7 technical hotline assistance.",
    },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink font-inter">
      <Navbar />

      <main className="wrap max-w-[1140px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-14 mb-12 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#e9e6fb] rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md eyebrow mb-4 border border-white">
            <Briefcase className="w-4 h-4 text-[#2a6ecb]" />
            Careers at Pulmo Care
          </span>

          <h1 className="font-archivo font-medium text-4xl md:text-[64px] tracking-[-0.04em] text-[#0a1f3c] mb-4 leading-[1.0]">
            Join Our Respiratory Healthcare Team
          </h1>

          <p className="text-base md:text-lg font-inter text-[#182a41] max-w-3xl leading-relaxed">
            At Pulmo Care, we are committed to making life easier for sleep apnea and respiratory patients. Explore open opportunities to grow your career in biomedical engineering and clinical sales.
          </p>
        </div>

        {/* Job Listings Grid */}
        <div className="space-y-4 mb-12">
          {jobs.map((job, idx) => (
            <div key={idx} className="bg-white border border-[#e9edf4] rounded-[24px] p-6 shadow-xs hover:border-[#2a6ecb]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#ebf5ff] text-[#2a6ecb]">
                    {job.department}
                  </span>
                  <span className="text-xs font-semibold text-[#1fb37a] flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {job.location}
                  </span>
                </div>

                <h3 className="font-archivo font-bold text-lg text-[#0a1f3c]">
                  {job.title}
                </h3>

                <p className="text-xs text-[#64748b] max-w-2xl leading-relaxed">
                  {job.description}
                </p>
              </div>

              <a
                href="mailto:enquiry@pulmocare.in?subject=Application for %20" 
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0a1f3c] text-white text-xs font-bold hover:bg-[#2a6ecb] transition-all cursor-pointer"
              >
                <span>Apply via Email</span>
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}