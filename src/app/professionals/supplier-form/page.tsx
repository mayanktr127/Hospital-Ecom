"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { useToast } from "@/context/ToastContext";
import { FileCheck, Send, CheckCircle2, Building2, User, Mail, Phone, MapPin } from "lucide-react";

export default function SupplierFormPage() {
  const { addToast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    country: "Germany",
    category: "Components & Precision Sensors",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email) {
      addToast("Missing Fields", "Please complete all required fields.");
      return;
    }
    setSubmitted(true);
    addToast(
      "Application Received",
      `Supplier application for ${formData.companyName} has been submitted to Löwenstein Strategic Purchasing.`
    );
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink">
      <Navbar />

      <main className="wrap max-w-[1040px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-14 mb-10 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#e9e6fb] rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md eyebrow mb-4 border border-white">
            <FileCheck className="w-4 h-4 text-[#1fb37a]" />
            Supplier Application &amp; Registration
          </span>

          <h1 className="font-archivo font-medium text-4xl md:text-[52px] tracking-[-0.04em] text-[#0a1f3c] mb-4 leading-[1.02]">
            Supplier Application Form
          </h1>

          <p className="text-sm md:text-base font-inter text-[#182a41] max-w-2xl leading-relaxed">
            Apply to become a verified component supplier or logistics partner for Löwenstein Medical SE &amp; Co. KG.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-[#e9edf4] rounded-[28px] p-8 md:p-12 shadow-sm">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-[#e0f3ec] text-[#1fb37a] grid place-items-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="font-archivo font-bold text-2xl text-[#0a1f3c] mb-2">Registration Submitted</h2>
              <p className="text-xs md:text-sm text-[#64748b] max-w-md mx-auto mb-6">
                Thank you for applying. Our strategic purchasing department will evaluate your profile and contact <strong>{formData.email}</strong> within 3 business days.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn btn-soft"
              >
                Submit Another Supplier Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 font-inter">
              <h2 className="font-archivo font-bold text-2xl text-[#0a1f3c] mb-2">Supplier Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#64748b] mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Precision Medical Plastics GmbH"
                    className="field !text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#64748b] mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="Dr. Martin Vance"
                    className="field !text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#64748b] mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="m.vance@supplier.com"
                    className="field !text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#64748b] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+49 30 1234567"
                    className="field !text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#64748b] mb-1">
                    Supply Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="field !text-xs cursor-pointer"
                  >
                    <option value="Components & Precision Sensors">Components &amp; Precision Sensors</option>
                    <option value="Medical Grade Polymers & Silicone">Medical Grade Polymers &amp; Silicone</option>
                    <option value="Electronics & Microcontrollers">Electronics &amp; Microcontrollers</option>
                    <option value="Packaging & Clinical Logistics">Packaging &amp; Clinical Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#64748b] mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="Germany"
                    className="field !text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#64748b] mb-1">
                  Certifications &amp; Company Overview
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Specify ISO 13485 certifications, production capacity, or component types..."
                  className="field !text-xs"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
              >
                <Send className="w-4 h-4" />
                <span>Submit Supplier Application</span>
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}