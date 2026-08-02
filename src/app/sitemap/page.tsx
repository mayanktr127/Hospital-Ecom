"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { Map, Layers, FileText, ShoppingBag, ShieldCheck, Download, ChevronRight } from "lucide-react";

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
      ],
    },
    {
      title: "Downloads & Software Center",
      icon: Download,
      links: [
        { label: "Official Document Repository (1,495 Files)", href: "/downloads" },
        { label: "prismaTS & LUISA Software Suites", href: "/downloads#software" },
        { label: "Custom Document Request Portal", href: "/downloads#request" },
      ],
    },
    {
      title: "Legal & Corporate Compliance",
      icon: ShieldCheck,
      links: [
        { label: "Legal Notice (Impressum)", href: "/legal-notice" },
        { label: "Privacy Policy (GDPR)", href: "/privacy-policy" },
        { label: "General Terms & Conditions (GTCs)", href: "/gtcs" },
        { label: "Sitemap Directory", href: "/sitemap" },
      ],
    },
    {
      title: "Remote Support & Tools",
      icon: FileText,
      links: [
        { label: "Remote Support Tool Diagnostics (ZIP)", href: "/doc-files/LM_QuickSupport_Win_v15.zip" },
      ],
    },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink">
      <Navbar />

      <main className="wrap max-w-[1040px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="rounded-[28px] bg-[#0a1f3c] text-white p-8 md:p-12 mb-10 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#2a6ecb]/20 rounded-full blur-3xl pointer-events-none" />
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-semibold font-archivo mb-3 border border-white/20">
            <Map className="w-3.5 h-3.5 text-[#2a6ecb]" />
            Website Index &amp; Structure
          </span>
          <h1 className="font-archivo font-semibold text-4xl md:text-5xl text-white mb-3">
            Sitemap
          </h1>
          <p className="text-sm md:text-base font-inter text-[#182a41] max-w-2xl leading-relaxed">
            Navigate through all pages, clinical categories, downloads, and legal documents of the Löwenstein Medical portal.
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