"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Building2, Heart, Scale, Award, Leaf, Briefcase, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function CompanyOverviewPage() {
  const companyCards = [
    {
      title: "About Us",
      subtitle: "Our heritage, leadership & German medical engineering history.",
      icon: Building2,
      href: "/company/about-us",
      color: "text-[#2a6ecb]",
      badge: "Heritage",
    },
    {
      title: "Our Values",
      subtitle: "Patient-first responsibility, trust & zero-compromise care.",
      icon: Heart,
      href: "/company/our-values",
      color: "text-[#dc4b56]",
      badge: "Philosophy",
    },
    {
      title: "Compliance",
      subtitle: "Ethics, EU MDR 2017/745 & regulatory compliance framework.",
      icon: Scale,
      href: "/company/compliance",
      color: "text-[#2a6ecb]",
      badge: "Integrity",
    },
    {
      title: "Quality Management",
      subtitle: "ISO 13485:2016 quality standards & clinical evaluation.",
      icon: Award,
      href: "/company/quality-management",
      color: "text-[#1fb37a]",
      badge: "ISO 13485",
    },
    {
      title: "Sustainability",
      subtitle: "Eco-friendly manufacturing, solar energy & ESG initiatives.",
      icon: Leaf,
      href: "/company/sustainability",
      color: "text-[#1fb37a]",
      badge: "ESG Green",
    },
    {
      title: "Careers & Team",
      subtitle: "Join our R&D medical engineering & clinical application team.",
      icon: Briefcase,
      href: "/career/job-openings",
      color: "text-[#2a6ecb]",
      badge: "Hiring",
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
            Löwenstein Medical &amp; Pulmo Care
          </h1>

          <p className="text-base md:text-lg font-inter text-[#64748b] max-w-3xl leading-relaxed">
            Discover our history, company values, ISO 13485 quality management systems, regulatory compliance, and eco-friendly medical manufacturing.
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
              German Precision Engineering for Global Healthcare
            </h2>
            <p className="text-sm text-[#64748b] leading-relaxed">
              With specialized development facilities in Bad Ems, Hamburg, and Karlsruhe, Löwenstein Medical develops, manufactures, and services intensive care ventilators, sleep therapy devices, diagnostics, and patient masks for clinicians in over 100 countries.
            </p>
          </div>

          <div className="pt-4 border-t border-[#F1F5F9] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-[#0a1f3c]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0" />
              <span>40+ Years Clinical Heritage</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0" />
              <span>ISO 13485 Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0" />
              <span>EU MDR 2017/745 Compliant</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
