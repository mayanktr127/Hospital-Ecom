"use client";

import React from "react";
import { ShieldCheck, Truck, Award, FileCheck2, Wrench, Headset } from "lucide-react";

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: ShieldCheck,
      title: "ISO 13485 & CE Certified",
      desc: "All devices strictly comply with German and European medical quality standards.",
    },
    {
      icon: Truck,
      title: "24-Hour Hospital Priority Shipping",
      desc: "Direct express dispatch for emergency intensive care and anesthesia requirements.",
    },
    {
      icon: Award,
      title: "German Engineering Guarantee",
      desc: "Precision manufacturing with total batch traceability and lot numbers.",
    },
    {
      icon: FileCheck2,
      title: "Enterprise PO Invoicing",
      desc: "Flexible purchase order invoicing and credit lines for hospital networks.",
    },
    {
      icon: Wrench,
      title: "Full Calibration & Warranty",
      desc: "Comprehensive 2-year warranty with annual biomedical calibration support.",
    },
    {
      icon: Headset,
      title: "24/7 Clinical Support",
      desc: "Dedicated clinical engineer hotlines for ventilator & diagnostic support.",
    },
  ];

  return (
    <section id="benefits" className="benefits bg-[#003865] border-radius-[48px] rounded-[48px] p-8 sm:p-14 text-white shadow-[0_4px_8px_rgba(0,56,101,0.05),0_28px_60px_-24px_rgba(0,56,101,0.35)] relative overflow-hidden mt-24">
      <div className="absolute -top-[90px] -right-[90px] w-[340px] h-[340px] rounded-full bg-radial from-[#007AC1]/40 to-transparent pointer-events-none" />

      <h2 className="font-archivo font-extrabold text-[clamp(34px,5vw,58px)] text-[#EAF5F5] max-w-[620px] leading-tight relative z-10">
        German Engineering & Clinical Reliability
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6.5 mt-9 relative z-10">
        {benefits.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white/[0.08] border border-white/15 rounded-[22px] p-5.5 backdrop-blur-[8px] hover:bg-white/[0.14] transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-[#007AC1]/30 text-[#D8E7F3] flex items-center justify-center mb-3">
                <Icon className="w-5 h-5" />
              </div>
              <h4 className="font-archivo font-semibold text-lg text-white tracking-tight leading-tight m-0 mb-1.5">
                {item.title}
              </h4>
              <p className="text-xs font-inter text-[#D8E7F3]/80 leading-[1.55] m-0">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
