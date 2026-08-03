"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Building2, Heart, Scale, Award, Leaf, Briefcase, ArrowRight, CheckCircle2, Stethoscope, ShieldCheck } from "lucide-react";

export default function CompanyOverviewPage() {
  const companyCards = [
    {
      title: "About Us",
      subtitle: "Pulmo Care's history, mission, leadership, and national network across India.",
      icon: Building2,
      href: "/company/about-us",
      color: "text-[#2a6ecb]",
      badge: "Heritage",
    },
    {
      title: "Our Values",
      subtitle: "Patient-first care, technical excellence, empathy, and 24/7 clinical support.",
      icon: Heart,
      href: "/company/our-values",
      color: "text-[#dc4b56]",
      badge: "Philosophy",
    },
    {
      title: "Compliance & Ethics",
      subtitle: "CDSCO regulatory compliance, transparent warranties, and ethical healthcare standards.",
      icon: Scale,
      href: "/company/compliance",
      color: "text-[#2a6ecb]",
      badge: "Integrity",
    },
    {
      title: "Quality Management",
      subtitle: "Certified biomedical testing, device calibration, and genuine OEM spare parts.",
      icon: Award,
      href: "/company/quality-management",
      color: "text-[#1fb37a]",
      badge: "ISO Standards",
    },
    {
      title: "Sustainability & ESG",
      subtitle: "Responsible equipment handling, energy-efficient concentrators, and paperless care.",
      icon: Leaf,
      href: "/company/sustainability",
      color: "text-[#1fb37a]",
      badge: "Eco Responsibility",
    },
    {
      title: "Careers at Pulmo Care",
      subtitle: "Join our team of biomedical engineers, clinical specialists, and customer care leaders.",
      icon: Briefcase,
      href: "/career/job-openings",
      color: "text-[#2a6ecb]",
      badge: "Careers",
    },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F8FAFC] text-[#0A192F] font-inter">
      <Navbar />

      <main className="wrap max-w-[1140px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-14 mb-12 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#e9e6fb] rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md eyebrow mb-4 border border-white">
            <Building2 className="w-4 h-4 text-[#2a6ecb]" />
            Company Overview
          </span>

          <h1 className="font-archivo font-medium text-4xl md:text-[60px] tracking-[-0.04em] text-[#0a1f3c] mb-4 leading-[1.05]">
            About Pulmo Care
          </h1>

          <p className="text-base md:text-lg font-inter text-[#64748b] max-w-3xl leading-relaxed">
            Pulmo Care is India&apos;s trusted leader in advanced sleep therapy, home &amp; ICU ventilation, oxygen concentrators, and sleep diagnostic technology. Headquartered in Bengaluru, we empower patients and healthcare providers with world-class medical equipment and dedicated support.
          </p>
        </div>

        {/* 6 Company Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {companyCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className="group bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs hover:shadow-xl hover:border-[#2a6ecb]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-[#f6f4fb] ${card.color} grid place-items-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-archivo font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#EBF5FF] text-[#2a6ecb]">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="font-archivo font-bold text-xl text-[#0a1f3c] group-hover:text-[#2a6ecb] transition-colors mb-2">
                    {card.title}
                  </h3>

                  <p className="text-xs text-[#64748b] leading-relaxed mb-6 font-inter">
                    {card.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between text-xs font-bold text-[#2a6ecb]">
                  <span>Explore Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Company Summary Banner */}
        <div className="bg-white border border-[#E2E8F0] rounded-[28px] p-8 md:p-12 shadow-sm space-y-6 font-inter text-[#0A192F]">
          <div>
            <h2 className="font-archivo font-bold text-2xl md:text-3xl text-[#0a1f3c] mb-3">
              Empowering Respiratory Health Across India
            </h2>
            <p className="text-sm text-[#64748b] leading-relaxed">
              From individual CPAP setups for Obstructive Sleep Apnea (OSA) patients to complex ICU ventilation systems in top hospitals, Pulmo Care delivers end-to-end care — including product consultation, mask fitting, therapy titration, rental options, and 24/7 technical hotline support.
            </p>
          </div>

          <div className="pt-4 border-t border-[#F1F5F9] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-[#0a1f3c]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0" />
              <span>Pan-India Distribution &amp; Service</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0" />
              <span>Certified Biomedical Engineers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0" />
              <span>24/7 Customer Hotline</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
