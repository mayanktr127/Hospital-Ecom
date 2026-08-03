"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Map, Layers, FileText, ShoppingBag, ShieldCheck, Stethoscope, ChevronRight } from "lucide-react";

export default function SitemapPage() {
  const sections = [
    {
      title: "Storefront & Main Portal",
      icon: Layers,
      links: [
        { label: "Home Page", href: "/" },
        { label: "5-Slide Product Showcase Slider", href: "/#hero" },
        { label: "Featured Medical Devices", href: "/#shop" },
        { label: "Clinical Benefits & Engineering", href: "/#benefits" },
        { label: "Company Overview", href: "/company" },
      ],
    },
    {
      title: "Doctors & Clinical Professionals",
      icon: Stethoscope,
      links: [
        { label: "Healthcare Professionals Portal", href: "/professionals" },
        { label: "Equipment Demo & Trial Request", href: "/professionals/demo-request" },
        { label: "Clinical Training & Academy", href: "/professionals/academy" },
        { label: "Clinical Research & Articles", href: "/blog" },
      ],
    },
    {
      title: "Legal & Corporate Compliance",
      icon: ShieldCheck,
      links: [
        { label: "Legal Notice", href: "/legal-notice" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "General Terms & Conditions (GTCs)", href: "/gtcs" },
        { label: "Sitemap Directory", href: "/sitemap" },
      ],
    },
    {
      title: "System Administration",
      icon: FileText,
      links: [
        { label: "Admin Portal (Products & Category Management)", href: "/admin" },
      ],
    },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F8FAFC] text-[#0A192F] font-inter">
      <Navbar />

      <main className="wrap max-w-[1040px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-12 mb-10 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#e9e6fb] rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-xs font-bold font-inter mb-3 border border-white text-[#2a6ecb]">
            <Map className="w-3.5 h-3.5 text-[#2a6ecb]" />
            Website Index &amp; Structure
          </span>

          <h1 className="font-archivo font-medium text-3xl md:text-4xl text-[#0a1f3c] mb-3">
            Sitemap
          </h1>

          <p className="text-sm md:text-base font-inter text-[#64748b] max-w-2xl leading-relaxed">
            Navigate through all pages, clinical categories, doctor portal features, and legal disclosures of the Pulmo Care India portal.
          </p>
        </div>

        {/* Sitemap Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-inter text-[#0a1f3c]">
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.title}
                className="bg-white border border-[#e9edf4] rounded-[28px] p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#f6f4fb] text-[#2a6ecb] grid place-items-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="font-archivo font-bold text-lg text-[#0a1f3c]">{sec.title}</h2>
                  </div>

                  <ul className="space-y-2.5 list-none p-0 m-0 text-xs md:text-sm">
                    {sec.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="flex items-center justify-between text-[#64748b] hover:text-[#2a6ecb] py-1 transition-colors group"
                        >
                          <span>{link.label}</span>
                          <ChevronRight className="w-4 h-4 text-[#2a6ecb] group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}