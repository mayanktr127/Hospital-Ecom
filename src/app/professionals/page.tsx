"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { UserCheck, FileText, GraduationCap, ShieldCheck, ArrowRight, CheckCircle2, Download, BookOpen, Stethoscope, PhoneCall } from "lucide-react";

export default function ProfessionalsPage() {
  const professionalCards = [
    {
      title: "Clinical Portal & Training",
      subtitle: "Specialist hub for physicians, pulmonologists, sleep labs, and clinical trial teams.",
      icon: UserCheck,
      href: "/professionals/academy",
      color: "text-[#2a6ecb]",
      badge: "Physician Hub",
    },
    {
      title: "Clinical Demos & Equipment Trials",
      subtitle: "Request on-site hospital demonstrations, patient trial units & clinic evaluations.",
      icon: Stethoscope,
      href: "/professionals/demo-request",
      color: "text-[#1fb37a]",
      badge: "Doctor Trials",
    },
    {
      title: "Clinical Research & Articles",
      subtitle: "Ventilation study insights, OSA prevalence in India & therapy whitepapers.",
      icon: BookOpen,
      href: "/blog",
      color: "text-[#2a6ecb]",
      badge: "Research & Blog",
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
            <UserCheck className="w-4 h-4 text-[#2a6ecb]" />
            Pulmo Care Professional Portal
          </span>

          <h1 className="font-archivo font-medium text-4xl md:text-[60px] tracking-[-0.04em] text-[#0a1f3c] mb-4 leading-[1.05]">
            Clinical Resources &amp; Specialist Hub
          </h1>

          <p className="text-base md:text-lg font-inter text-[#64748b] max-w-3xl leading-relaxed">
            Dedicated technical support, sleep telemetry reporting (prismaTS), certified CME training, and device manual downloads for pulmonologists, sleep specialists, and clinical care teams in India.
          </p>
        </div>

        {/* 3 Core Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {professionalCards.map((card) => {
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
                  <span>Access Portal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Doctor & Hospital Collaboration Banner */}
        <div className="bg-white border border-[#E2E8F0] rounded-[28px] p-8 md:p-12 shadow-sm space-y-6 font-inter text-[#0A192F]">
          <div>
            <h2 className="font-archivo font-bold text-2xl md:text-3xl text-[#0a1f3c] mb-3">
              Physician &amp; Sleep Lab Collaboration
            </h2>
            <p className="text-sm text-[#64748b] leading-relaxed">
              Pulmo Care collaborates directly with hospital ICUs, sleep laboratories, and pulmonology clinics. We assist physicians with automated AHI therapy report generation, mask leak troubleshooting, and remote patient monitoring setup.
            </p>
          </div>

          <div className="pt-4 border-t border-[#F1F5F9] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-[#0a1f3c]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0" />
              <span>Dedicated Physician Helpline</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0" />
              <span>Complimentary Demo Requests</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1fb37a] shrink-0" />
              <span>Therapy Compliance Data Export</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
