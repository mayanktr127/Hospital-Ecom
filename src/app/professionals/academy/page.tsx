"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { GraduationCap, BookOpen, Award, CheckCircle2, Calendar, UserCheck, PhoneCall, Mail } from "lucide-react";

export default function AcademyPage() {
  const courses = [
    {
      title: "CPAP & BiPAP Titration Masterclass for Sleep Technicians",
      target: "Sleep Technicians, Pulmonology Nurses, & Clinical Specialists",
      duration: "1-Day Workshop & Hands-on Titration",
      location: "Bengaluru HQ / Online Interactive",
    },
    {
      title: "Mechanical Ventilation & Home Care Respiratory Support",
      target: "ICU Doctors, Intensivists, & Homecare Specialists",
      duration: "2-Day Advanced Clinical Training",
      location: "Bengaluru / Regional Medical Centers",
    },
    {
      title: "prismaTS Telemetry & Sleep Data Analysis Certification",
      target: "Pulmonologists & Sleep Lab Directors",
      duration: "Webinar CME Certification",
      location: "Online Portal",
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
            <GraduationCap className="w-4 h-4 text-[#1fb37a]" />
            Pulmo Care Clinical Training
          </span>

          <h1 className="font-archivo font-medium text-4xl md:text-[64px] tracking-[-0.04em] text-[#0a1f3c] mb-4 leading-[1.0]">
            Pulmo Care Academy
          </h1>

          <p className="text-base md:text-lg font-inter text-[#182a41] max-w-3xl leading-relaxed">
            Empowering Indian physicians, sleep technicians, and respiratory therapists with certified CME training, hands-on ventilator titration workshops, and telemetry software masterclasses.
          </p>
        </div>

        {/* Courses List */}
        <div className="space-y-6 mb-12">
          {courses.map((c, idx) => (
            <div key={idx} className="bg-white border border-[#e9edf4] rounded-[28px] p-6 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-1">{c.title}</h3>
                  <p className="text-xs text-[#2a6ecb] font-semibold">{c.target}</p>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f6f4fb] text-xs font-bold text-[#0a1f3c]">
                  <Calendar className="w-3.5 h-3.5 text-[#2a6ecb]" />
                  {c.duration}
                </span>
              </div>
              <div className="pt-4 border-t border-[#0a1f3c]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#64748b]">
                <span>Venue: <strong>{c.location}</strong></span>
                <a
                  href="mailto:enquiry@pulmocare.in?subject=Registration Inquiry for Academy Course"
                  className="inline-flex items-center gap-1 font-bold text-[#2a6ecb] hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Register Interest →</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}