"use client";

import React from "react";

export const MarqueeTicker: React.FC = () => {
  const items = [
    "★ LÖWENSTEIN MEDICAL • GERMAN ENGINEERING EXCELLENCE",
    "★ ISO 13485 CERTIFIED ICU VENTILATION & ANESTHESIA",
    "★ 24/7 BIOMEDICAL HOSPITAL SUPPORT & CALIBRATION",
    "★ 100% STERILE CLINICAL PACKAGING GUARANTEE",
    "★ DIRECT INSTITUTIONAL PROCUREMENT & PO SUPPORT",
  ];

  const fullItems = [...items, ...items, ...items];

  return (
    <div className="mt-16 bg-[#003865] text-white overflow-hidden py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] border-y border-[#003865]/20">
      <div className="marquee-loop font-archivo font-bold text-sm md:text-base text-white tracking-wider uppercase">
        {fullItems.map((text, idx) => (
          <span key={idx} className="flex items-center gap-3">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};
