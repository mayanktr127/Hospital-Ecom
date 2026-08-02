"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Briefcase, ArrowUpRight, MapPin } from "lucide-react";

export default function CareerJobOpeningsPage() {
  const jobs = [
    {
      title: "Senior Embedded Software Developer (m/w/d) — Mechanical Ventilation",
      location: "Bad Ems / Remote Germany",
      type: "Full-time",
      department: "R&D Software Engineering",
      link: "https://loewensteinmedical.com/en/career/job-openings/",
    },
    {
      title: "Clinical Application Specialist (m/w/d) — Intensive Care & Anesthesia",
      location: "Hamburg / Field Nationwide",
      type: "Full-time",
      department: "Clinical Field Application",
      link: "https://loewensteinmedical.com/en/career/job-openings/",
    },
    {
      title: "Regulatory Affairs Manager (m/w/d) — EU MDR & FDA Submissions",
      location: "Bad Ems HQ",
      type: "Full-time",
      department: "Quality & Compliance",
      link: "https://loewensteinmedical.com/en/career/job-openings/",
    },
    {
      title: "Field Service Technician (m/w/d) — Homecare Systems",
      location: "Berlin / Brandenburg",
      type: "Full-time",
      department: "Technical Customer Service",
      link: "https://loewensteinmedical.com/en/career/job-openings/",
    },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink">
      <Navbar />

      <main className="wrap max-w-[1140px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-14 mb-12 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#e9e6fb] rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md eyebrow mb-4 border border-white">
            <Briefcase className="w-4 h-4 text-[#2a6ecb]" />
            Careers at Löwenstein Medical
          </span>

          <h1 className="font-archivo font-medium text-4xl md:text-[64px] tracking-[-0.04em] text-[#0a1f3c] mb-4 leading-[1.0]">
            Job Openings Löwenstein Medical Germany
          </h1>

          <p className="text-base md:text-lg font-inter text-[#182a41] max-w-3xl leading-relaxed">
            Shape the future of mechanical ventilation, neonatal care, and digital medical software with a passionate team of over 2,000 specialists.
          </p>
        </div>

        {/* Job Listings */}
        <div className="space-y-4 mb-12">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="bg-white border border-[#e9edf4] rounded-[24px] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#2a6ecb]/40 transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#f6f4fb] text-[#2a6ecb] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#e9edf4]">
                    {job.department}
                  </span>
                  <span className="text-xs text-[#64748b]">{job.type}</span>
                </div>

                <h3 className="font-archivo font-bold text-lg text-[#0a1f3c] mb-1">{job.title}</h3>

                <div className="flex items-center gap-2 text-xs text-[#64748b]">
                  <MapPin className="w-3.5 h-3.5 text-[#2a6ecb]" />
                  <span>{job.location}</span>
                </div>
              </div>

              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#0a1f3c] text-white font-inter font-semibold text-xs flex items-center gap-1.5 hover:bg-[#12315c] shadow-sm shrink-0"
              >
                <span>Apply Now</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}