"use client";

import React from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Briefcase, ArrowUpRight, Building2, MapPin, CheckCircle2, Search } from "lucide-react";

export default function JobOpeningsPage() {
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
        <div className="rounded-[36px] bg-[#003865] text-white p-8 md:p-14 mb-12 shadow-[0_28px_60px_-24px_rgba(0,56,101,0.4)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#007AC1]/20 rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-semibold font-archivo mb-4 border border-white/20">
            <Briefcase className="w-4 h-4 text-[#007AC1]" />
            Careers at Löwenstein Medical
          </span>

          <h1 className="font-archivo font-extrabold text-4xl md:text-6xl text-white mb-4 leading-tight">
            Job Openings Löwenstein Medical Germany
          </h1>

          <p className="text-base md:text-lg font-inter text-white/85 max-w-3xl leading-relaxed">
            Shape the future of mechanical ventilation, neonatal care, and digital medical software with a passionate team of over 2,000 specialists.
          </p>
        </div>

        {/* Job Listings */}
        <div className="space-y-4 mb-12">
          {jobs.map((job) => (
            <div
              key={job.title}
              className="bg-white border border-[#003865]/12 rounded-[24px] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#007AC1]/40 transition-colors shadow-sm"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#F0F6FA] text-[#007AC1] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-[#003865]/08">
                    {job.department}
                  </span>
                  <span className="text-xs text-[#4A607A]">{job.type}</span>
                </div>

                <h3 className="font-archivo font-bold text-lg text-[#003865] mb-1">{job.title}</h3>

                <div className="flex items-center gap-2 text-xs text-[#4A607A]">
                  <MapPin className="w-3.5 h-3.5 text-[#007AC1]" />
                  <span>{job.location}</span>
                </div>
              </div>

              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#003865] text-white font-inter font-semibold text-xs flex items-center gap-1.5 hover:bg-[#005A9C] shadow-sm shrink-0"
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
