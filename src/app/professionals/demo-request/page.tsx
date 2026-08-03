"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { useToast } from "@/context/ToastContext";
import { Stethoscope, CheckCircle2, Building2, Calendar, Phone, Mail, MapPin, Send, ShieldCheck, Clock, UserCheck, Flame } from "lucide-react";

export default function DemoRequestPage() {
  const { addToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    doctorName: "",
    specialization: "Pulmonologist",
    hospitalName: "",
    city: "",
    phone: "",
    email: "",
    deviceType: "CPAP / APAP Auto Devices",
    demoType: "In-Hospital Demonstration",
    preferredDate: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.doctorName || !formData.hospitalName || !formData.phone) {
      addToast("Required Fields Missing", "Please enter doctor name, hospital name, and contact phone number.");
      return;
    }

    setSubmitted(true);
    addToast("Demo Request Received!", `Thank you Dr. ${formData.doctorName}. Our clinical team will contact you within 24 hours.`);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F8FAFC] text-[#0A192F] font-inter">
      <Navbar />

      <main className="wrap max-w-[1140px] w-full mx-auto px-4 md:px-6 flex-1 py-10">
        {/* Page Hero Header */}
        <div className="pastel-canvas rounded-[28px] text-[#182a41] p-8 md:p-12 mb-12 border border-white/80 shadow-[0_2px_8px_rgba(24,42,65,0.05)] relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#e9e6fb] rounded-full blur-3xl pointer-events-none" />
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md eyebrow mb-4 border border-white text-xs font-bold text-[#2a6ecb]">
            <Stethoscope className="w-4 h-4 text-[#2a6ecb]" />
            Doctor &amp; Hospital Portal
          </span>

          <h1 className="font-archivo font-medium text-3xl md:text-[54px] tracking-[-0.04em] text-[#0a1f3c] mb-4 leading-[1.08]">
            Clinical Equipment Demo &amp; Trial Request
          </h1>

          <p className="text-sm md:text-base font-inter text-[#64748b] max-w-3xl leading-relaxed">
            Request on-site equipment demonstrations, trial units for sleep labs, and ICU ventilator evaluations for physicians, pulmonologists, and hospital directors across India.
          </p>
        </div>

        {/* 3 Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF5FF] text-[#2a6ecb] grid place-items-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-archivo font-bold text-lg text-[#0a1f3c] mb-2">48-Hour On-Site Setup</h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Fast delivery of evaluation units to hospitals and sleep clinics in major Indian metro centers.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F0FDF4] text-[#1fb37a] grid place-items-center mb-4">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="font-archivo font-bold text-lg text-[#0a1f3c] mb-2">Biomedical Engineer Accompaniment</h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Our clinical specialists guide your team through pressure settings, software telemetry, and mask fittings.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF5FF] text-[#2a6ecb] grid place-items-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-archivo font-bold text-lg text-[#0a1f3c] mb-2">Complimentary Trial Period</h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Zero-obligation trial units for certified pulmonologists, sleep diagnostic labs, and ICU departments.
            </p>
          </div>
        </div>

        {/* Demo Request Form Section */}
        <div className="bg-white border border-[#E2E8F0] rounded-[28px] p-8 md:p-12 shadow-sm font-inter text-[#0A192F] mb-12">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F0FDF4] text-[#1fb37a] grid place-items-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-archivo font-bold text-2xl md:text-3xl text-[#0a1f3c]">
                Demo Request Submitted Successfully!
              </h2>
              <p className="text-sm text-[#64748b] max-w-lg mx-auto leading-relaxed">
                Thank you Dr. <strong>{formData.doctorName}</strong>. Our clinical team from Pulmo Care Bengaluru will contact you at <strong>{formData.phone}</strong> to confirm the demonstration details for <strong>{formData.hospitalName}</strong>.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    doctorName: "",
                    specialization: "Pulmonologist",
                    hospitalName: "",
                    city: "",
                    phone: "",
                    email: "",
                    deviceType: "CPAP / APAP Auto Devices",
                    demoType: "In-Hospital Demonstration",
                    preferredDate: "",
                    notes: "",
                  });
                }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#0a1f3c] text-white text-xs font-bold hover:bg-[#2a6ecb] transition-all cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <h2 className="font-archivo font-bold text-2xl md:text-3xl text-[#0a1f3c] mb-2">
                  Request Equipment Demonstration &amp; Trial
                </h2>
                <p className="text-xs md:text-sm text-[#64748b]">
                  Please fill out the form below. A senior Pulmo Care clinical specialist will reach out within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Doctor Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#0a1f3c] uppercase tracking-wider mb-2">
                      Doctor / Specialist Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh Sharma"
                      value={formData.doctorName}
                      onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-medium focus:outline-none focus:border-[#2a6ecb] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Specialization */}
                  <div>
                    <label className="block text-xs font-bold text-[#0a1f3c] uppercase tracking-wider mb-2">
                      Specialization / Role
                    </label>
                    <select
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-medium focus:outline-none focus:border-[#2a6ecb] focus:bg-white transition-all"
                    >
                      <option value="Pulmonologist">Pulmonologist</option>
                      <option value="Intensivist / ICU Director">Intensivist / ICU Director</option>
                      <option value="Somnologist / Sleep Specialist">Somnologist / Sleep Specialist</option>
                      <option value="ENT Specialist">ENT Specialist</option>
                      <option value="Hospital Administrator">Hospital Administrator</option>
                      <option value="Biomedical Engineer">Biomedical Engineer</option>
                    </select>
                  </div>

                  {/* Hospital Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#0a1f3c] uppercase tracking-wider mb-2">
                      Hospital / Clinic Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Manipal Hospital, Rajajinagar"
                      value={formData.hospitalName}
                      onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-medium focus:outline-none focus:border-[#2a6ecb] focus:bg-white transition-all"
                    />
                  </div>

                  {/* City & State */}
                  <div>
                    <label className="block text-xs font-bold text-[#0a1f3c] uppercase tracking-wider mb-2">
                      City &amp; State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bengaluru, Karnataka"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-medium focus:outline-none focus:border-[#2a6ecb] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-[#0a1f3c] uppercase tracking-wider mb-2">
                      Contact Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-medium focus:outline-none focus:border-[#2a6ecb] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-[#0a1f3c] uppercase tracking-wider mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="doctor@hospital.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-medium focus:outline-none focus:border-[#2a6ecb] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Device Required */}
                  <div>
                    <label className="block text-xs font-bold text-[#0a1f3c] uppercase tracking-wider mb-2">
                      Equipment Category Needed
                    </label>
                    <select
                      value={formData.deviceType}
                      onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-medium focus:outline-none focus:border-[#2a6ecb] focus:bg-white transition-all"
                    >
                      <option value="CPAP / APAP Auto Devices">CPAP / APAP Auto Devices (Prisma SMART / SOFT)</option>
                      <option value="BiLevel S / ST Therapy Units">BiLevel S / ST Therapy Units (Prisma 25S / 25ST)</option>
                      <option value="ICU & Home Ventilator Systems">ICU &amp; Home Ventilators (LUISA / PrismaVENT)</option>
                      <option value="Oxygen Concentrators">Oxygen Concentrators (Inogen Rove 6 / Nidek NEO 5)</option>
                      <option value="Sleep Diagnostic Systems">Polygraphy &amp; Sleep Diagnostic Systems (Samoa / Sonata)</option>
                      <option value="CPAP Masks & Interfaces">Full Face &amp; Nasal CPAP Masks (CARA / LENA / JOYCEone)</option>
                    </select>
                  </div>

                  {/* Demo Type */}
                  <div>
                    <label className="block text-xs font-bold text-[#0a1f3c] uppercase tracking-wider mb-2">
                      Demo Preference
                    </label>
                    <select
                      value={formData.demoType}
                      onChange={(e) => setFormData({ ...formData, demoType: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-medium focus:outline-none focus:border-[#2a6ecb] focus:bg-white transition-all"
                    >
                      <option value="In-Hospital Demonstration">In-Hospital Demonstration</option>
                      <option value="Patient Trial Unit">Patient Trial Unit for Sleep Lab</option>
                      <option value="Virtual Clinical Briefing">Virtual Clinical Briefing via Video Call</option>
                    </select>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-xs font-bold text-[#0a1f3c] uppercase tracking-wider mb-2">
                    Specific Clinical Notes / Patient Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mention specific pressure ranges, patient compliance concerns, or hospital department requirements..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs font-medium focus:outline-none focus:border-[#2a6ecb] focus:bg-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto h-12 px-8 rounded-xl bg-[#2a6ecb] text-white text-xs font-bold hover:bg-[#0a1f3c] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Submit Demo Request</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
