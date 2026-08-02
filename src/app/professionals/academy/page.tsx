"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { GraduationCap, BookOpen, Award, CheckCircle2, Calendar, UserCheck } from "lucide-react";

export default function AcademyPage() {
  const courses = [
    {
      title: "Advanced Clinical Ventilation Masterclass (LUISA & elisa Series)",
      target: "ICU Physicians, Intensivists, & Respiratory Therapists",
      duration: "2-Day Intensive Hands-on Workshop",
      location: "Bad Ems Training Center / Online CME",
    },
    {
      title: "Neonatal & Infant Ventilation Seminar (LEONI 4)",
      target: "Neonatal Nurses & Pediatric ICU Specialists",
      duration: "1-Day Certified Training",
      location: "Hamburg Medical Academy",
    },
    {
      title: "prismaTS & Data Telemetry Software Certification",
      target: "Sleep Lab Technicians & Homecare Managers",
      duration: "Interactive Webinar (CME Accredited)",
      location: "Online Portal",
    },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink">
      <Navbar />

      <main className="wrap max-w-[1140px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="rounded-[36px] bg-[#003865] text-white p-8 md:p-14 mb-12 shadow-[0_28px_60px_-24px_rgba(0,56,101,0.4)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#007AC1]/20 rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-semibold font-archivo mb-4 border border-white/20">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            Clinical Education &amp; Training
          </span>

          <h1 className="font-archivo font-extrabold text-4xl md:text-6xl text-white mb-4 leading-tight">
            Löwenstein Medical Academy
          </h1>

          <p className="text-base md:text-lg font-inter text-white/85 max-w-3xl leading-relaxed">
            Empowering physicians, clinical nurses, sleep specialists, and service technicians with certified CME education, hands-on ventilator workshops, and device operation masterclasses.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="space-y-6 mb-12 font-inter text-[#003865]">
          <h2 className="font-archivo font-bold text-2xl text-[#003865] mb-4">Upcoming Accredited Seminars &amp; CME Courses</h2>

          {courses.map((c) => (
            <div
              key={c.title}
              className="bg-white border border-[#003865]/12 rounded-[28px] p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#007AC1]/40 transition-colors"
            >
              <div>
                <span className="bg-[#F0F6FA] text-[#007AC1] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#003865]/08 mb-2 inline-block">
                  CME Certified
                </span>
                <h3 className="font-archivo font-bold text-xl text-[#003865] mb-2">{c.title}</h3>
                <p className="text-xs md:text-sm text-[#4A607A] mb-2">Target Audience: {c.target}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#4A607A]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#007AC1]" /> {c.duration}
                  </span>
                  <span>•</span>
                  <span>Location: {c.location}</span>
                </div>
              </div>

              <button
                onClick={() => alert("Registration request submitted to Löwenstein Academy.")}
                className="px-5 py-2.5 rounded-full bg-[#003865] text-white font-inter font-semibold text-xs hover:bg-[#005A9C] shadow-sm shrink-0"
              >
                Register for Course
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
