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
        <div className="rounded-[36px] bg-[#003865] text-white p-8 md:p-14 mb-10 shadow-[0_28px_60px_-24px_rgba(0,56,101,0.4)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#007AC1]/20 rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-semibold font-archivo mb-4 border border-white/20">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            Supplier Application &amp; Registration
          </span>

          <h1 className="font-archivo font-extrabold text-4xl md:text-5xl text-white mb-4 leading-tight">
            Supplier Application Form
          </h1>

          <p className="text-sm md:text-base font-inter text-white/85 max-w-2xl leading-relaxed">
            Apply to become a verified component supplier or logistics partner for Löwenstein Medical SE &amp; Co. KG.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-[#003865]/12 rounded-[32px] p-8 md:p-12 shadow-sm">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 grid place-items-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="font-archivo font-bold text-2xl text-[#003865] mb-2">Registration Submitted</h2>
              <p className="text-xs md:text-sm text-[#4A607A] max-w-md mx-auto mb-6">
                Thank you for applying. Our strategic purchasing department will evaluate your profile and contact <strong>{formData.email}</strong> within 3 business days.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-full bg-[#003865] text-white text-xs font-semibold hover:bg-[#005A9C]"
              >
                Submit Another Supplier Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 font-inter">
              <h2 className="font-archivo font-bold text-2xl text-[#003865] mb-2">Supplier Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A607A] mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Precision Medical Plastics GmbH"
                    className="w-full bg-[#F0F6FA] border border-[#003865]/12 rounded-xl px-4 py-3 text-xs text-[#003865] outline-none focus:border-[#007AC1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A607A] mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="Dr. Martin Vance"
                    className="w-full bg-[#F0F6FA] border border-[#003865]/12 rounded-xl px-4 py-3 text-xs text-[#003865] outline-none focus:border-[#007AC1]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A607A] mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="m.vance@supplier.com"
                    className="w-full bg-[#F0F6FA] border border-[#003865]/12 rounded-xl px-4 py-3 text-xs text-[#003865] outline-none focus:border-[#007AC1]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A607A] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+49 30 1234567"
                    className="w-full bg-[#F0F6FA] border border-[#003865]/12 rounded-xl px-4 py-3 text-xs text-[#003865] outline-none focus:border-[#007AC1]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A607A] mb-1">
                    Supply Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#F0F6FA] border border-[#003865]/12 rounded-xl px-4 py-3 text-xs text-[#003865] outline-none cursor-pointer focus:border-[#007AC1]"
                  >
                    <option value="Components & Precision Sensors">Components &amp; Precision Sensors</option>
                    <option value="Medical Grade Polymers & Silicone">Medical Grade Polymers &amp; Silicone</option>
                    <option value="Electronics & Microcontrollers">Electronics &amp; Microcontrollers</option>
                    <option value="Packaging & Clinical Logistics">Packaging &amp; Clinical Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A607A] mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="Germany"
                    className="w-full bg-[#F0F6FA] border border-[#003865]/12 rounded-xl px-4 py-3 text-xs text-[#003865] outline-none focus:border-[#007AC1]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A607A] mb-1">
                  Certifications &amp; Company Overview
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Specify ISO 13485 certifications, production capacity, or component types..."
                  className="w-full bg-[#F0F6FA] border border-[#003865]/12 rounded-xl p-4 text-xs text-[#003865] outline-none focus:border-[#007AC1]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#003865] text-white font-inter font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#005A9C] shadow-md transition-all"
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
