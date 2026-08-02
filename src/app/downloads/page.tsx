"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/nav/Navbar";
import { DownloadsSection } from "@/components/downloads/DownloadsSection";
import { Footer } from "@/components/footer/Footer";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { WishlistDrawer } from "@/components/wishlist/WishlistDrawer";
import { SearchModal } from "@/components/search/SearchModal";
import { ProductModal } from "@/components/products/ProductModal";
import { useToast } from "@/context/ToastContext";

import { Product } from "@/types/product";
import { ShieldCheck, FileCheck, Send, ArrowRight, Download, Server, HardDrive, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export default function DownloadsPage() {
  const { addToast } = useToast();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Custom document request form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hospital: "",
    deviceModel: "prismaVENT Series",
    documentType: "Instruction for Use (IFU)",
    language: "English",
    notes: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      addToast("Missing Information", "Please enter your name and email address.");
      return;
    }
    setFormSubmitted(true);
    addToast(
      "Request Submitted",
      `Thank you ${formData.name}. Your document request for ${formData.deviceModel} has been sent to Löwenstein Compliance.`
    );
  };

  const softwareReleases = [
    {
      name: "prismaTS Therapy Software Suite",
      version: "v5.12.0.44",
      size: "148 MB",
      os: "Windows 11 / 10 (64-bit)",
      releaseDate: "2026-02-01",
      notes: "Adds support for prismaVENT50-C firmware 3.4 & enhanced CPAP leak reporting.",
      url: "https://loewensteinmedical.com/en/downloads/",
    },
    {
      name: "LUISA Companion Telemetry App Setup",
      version: "v2.4.1",
      size: "28.5 MB",
      os: "Android 14+ / iOS 17+",
      releaseDate: "2026-01-20",
      notes: "Bluetooth Low Energy (BLE) stability updates and real-time oxygen trend graphs.",
      url: "https://loewensteinmedical.com/en/downloads/",
    },
    {
      name: "LEOlytics Anesthesia Analytics Package",
      version: "v3.0.8",
      size: "312 MB",
      os: "Windows Server / Workstation",
      releaseDate: "2025-12-15",
      notes: "Gas consumption forecasting & agent usage tracking for LEON plus workstations.",
      url: "https://loewensteinmedical.com/en/downloads/",
    },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink">
      {/* Floating Sticky Glass Nav */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Downloads Content Area */}
      <main className="wrap max-w-[1240px] w-full mx-auto px-4 md:px-6 flex-1 pt-6">
        {/* Page Hero Header */}
        <div className="relative rounded-[28px] bg-[#0a1f3c] text-white p-8 md:p-14 overflow-hidden mb-12 shadow-[0_28px_60px_-24px_rgba(24,42,65,0.4)]">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#2a6ecb]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold font-archivo mb-4">
              <ShieldCheck className="w-4 h-4 text-[#2a6ecb]" />
              Official Löwenstein Document Portal
            </span>

            <h1 className="font-archivo font-semibold text-[clamp(36px,5vw,64px)] leading-tight text-white mb-4">
              Clinical Downloads &amp; Firmware Center
            </h1>

            <p className="text-base md:text-lg font-inter text-white/85 leading-relaxed mb-6">
              Download certified Instructions for Use (IFU), clinical product brochures, ISO 13485 quality declarations, and therapy software suites directly from Löwenstein Medical Germany.
            </p>
          </div>
        </div>

        {/* Section 1: Main Downloads Grid (Filtered by Category & Search) */}
        <DownloadsSection />

        {/* Section 2: Direct Software & Firmware Repository Section */}
        <section className="mt-20 mb-20 bg-white border border-[#0a1f3c]/10 rounded-[28px] p-8 md:p-12 shadow-[0_4px_12px_rgba(24,42,65,0.04)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2a6ecb] block mb-1">
                Digital Solutions &amp; Updates
              </span>
              <h2 className="font-archivo font-semibold text-3xl md:text-4xl text-[#0a1f3c]">
                Software &amp; Firmware Downloads
              </h2>
            </div>
            <p className="max-w-md text-xs md:text-sm text-[#64748b] leading-relaxed font-inter m-0">
              Verified clinical software packages for therapy titration, patient data management, and workstation telemetry.
            </p>
          </div>

          <div className="space-y-4">
            {softwareReleases.map((sw) => (
              <div
                key={sw.name}
                className="bg-[#f6f4fb] border border-[#0a1f3c]/10 rounded-[24px] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[#2a6ecb]/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#0a1f3c] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Server className="w-6 h-6 text-[#2a6ecb]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-archivo font-bold text-base text-[#0a1f3c]">{sw.name}</h3>
                      <span className="bg-white px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-[#2a6ecb] border border-[#0a1f3c]/10">
                        {sw.version}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748b] font-inter mb-2">{sw.notes}</p>
                    <div className="flex items-center gap-4 text-[11px] font-mono text-[#64748b]">
                      <span>OS: {sw.os}</span>
                      <span>•</span>
                      <span>Size: {sw.size}</span>
                      <span>•</span>
                      <span>Released: {sw.releaseDate}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={sw.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => addToast("Downloading Software", `Downloading ${sw.name}`)}
                  className="px-5 py-2.5 rounded-full bg-[#0a1f3c] text-white font-inter font-semibold text-xs flex items-center gap-2 hover:bg-[#12315c] shadow-sm shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Package</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Request Custom Document / Translation Section */}
        <section className="mb-24 bg-gradient-to-br from-[#0a1f3c] via-[#1a4079] to-[#0a1f3c] rounded-[28px] p-8 md:p-14 text-white shadow-[0_28px_60px_-24px_rgba(24,42,65,0.4)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Info */}
            <div className="lg:col-span-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold font-archivo mb-4 border border-white/20">
                <FileCheck className="w-3.5 h-3.5 text-[#2a6ecb]" />
                Compliance &amp; Special Requests
              </span>

              <h2 className="font-archivo font-semibold text-3xl md:text-5xl text-white mb-4 leading-tight">
                Request Custom Manuals &amp; Certificates
              </h2>

              <p className="text-sm md:text-base font-inter text-white/85 leading-relaxed mb-6">
                Need a specific legacy device manual, FDA 510(k) clearance document, or certified clinical translation? Submit your request directly to our global regulatory affairs department.
              </p>

              <div className="space-y-3 text-xs text-white/80 font-inter">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1fb37a]" />
                  <span>Official response within 24 business hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1fb37a]" />
                  <span>ISO 13485 certified documentation dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#1fb37a]" />
                  <span>Multi-language certified translations (30+ languages)</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Form */}
            <div className="lg:col-span-7 bg-white text-[#0a1f3c] rounded-[28px] p-6 md:p-8 shadow-2xl border border-white/20">
              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full bg-[#e0f3ec] text-[#1fb37a] grid place-items-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-archivo font-bold text-2xl mb-2 text-[#0a1f3c]">Request Received</h3>
                  <p className="text-xs text-[#64748b] max-w-md mx-auto mb-6">
                    Our compliance team has dispatched your inquiry to regulatory affairs. A copy of the requested document will be delivered to <strong>{formData.email}</strong>.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="btn btn-soft"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <h3 className="font-archivo font-bold text-xl text-[#0a1f3c] mb-2">Document Request Form</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Dr. Hans Weber"
                        className="w-full bg-[#f6f4fb] border border-[#e9edf4] rounded-xl px-3.5 py-2.5 text-xs text-[#0a1f3c] focus:border-[#2a6ecb]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="h.weber@charite.de"
                        className="w-full bg-[#f6f4fb] border border-[#e9edf4] rounded-xl px-3.5 py-2.5 text-xs text-[#0a1f3c] focus:border-[#2a6ecb]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-1">
                        Hospital / Institution
                      </label>
                      <input
                        type="text"
                        value={formData.hospital}
                        onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                        placeholder="Charité University Hospital Berlin"
                        className="w-full bg-[#f6f4fb] border border-[#e9edf4] rounded-xl px-3.5 py-2.5 text-xs text-[#0a1f3c] focus:border-[#2a6ecb]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-1">
                        Device Model
                      </label>
                      <select
                        value={formData.deviceModel}
                        onChange={(e) => setFormData({ ...formData, deviceModel: e.target.value })}
                        className="w-full bg-[#f6f4fb] border border-[#e9edf4] rounded-xl px-3.5 py-2.5 text-xs text-[#0a1f3c] cursor-pointer focus:border-[#2a6ecb]"
                      >
                        <option value="LUISA Life Support Ventilator">LUISA Life Support Ventilator</option>
                        <option value="prismaVENT Series">prismaVENT Series</option>
                        <option value="LEON plus Anesthesia Workstation">LEON plus Anesthesia Workstation</option>
                        <option value="elisa 800 ICU Ventilator">elisa 800 ICU Ventilator</option>
                        <option value="LEONI 4 Neonatal Ventilator">LEONI 4 Neonatal Ventilator</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#64748b] uppercase tracking-wider mb-1">
                      Notes / Specific Document Revision
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Specify language or serial number (e.g. firmware revision 4.12)..."
                      className="w-full bg-[#f6f4fb] border border-[#e9edf4] rounded-xl p-3 text-xs text-[#0a1f3c] focus:border-[#2a6ecb]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-[#0a1f3c] text-white font-inter font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#12315c] shadow-md transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Document Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => setQuickViewProduct(product)}
      />
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
}