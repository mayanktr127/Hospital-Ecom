"use client";

import React, { useState } from "react";
import { useAdmin, InquiryItem } from "@/context/AdminContext";
import { useToast } from "@/context/ToastContext";
import { Send, Phone, Mail, MapPin, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";

export const ContactSection: React.FC = () => {
  const { addInquiry, products } = useAdmin();
  const { addToast } = useToast();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("CPAP / BiLevel Purchase");
  const [device, setDevice] = useState("Löwenstein Prisma SMART Auto CPAP");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newInquiry: InquiryItem = {
      id: `inq-${Date.now()}`,
      fullName,
      phone,
      email,
      inquiryType,
      device,
      city: city || "Not Specified",
      message,
      status: "New Lead",
      createdAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    };

    await addInquiry(newInquiry);
    setIsSubmitting(false);
    setSubmitted(true);
    addToast(
      "Contact Request Submitted!",
      `Thank you ${fullName}. Our medical specialist will call you at ${phone} shortly.`
    );
  };

  return (
    <section id="contact-us" className="py-20 bg-gradient-to-b from-[#F0F6FA] to-white relative overflow-hidden">
      {/* Background Decorative Blur Pedestals */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0066FF]/05 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#003865]/05 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Contact Info & Hotline Strip */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 text-[#0066FF] font-archivo font-extrabold text-xs uppercase tracking-wider mb-4 border border-[#0066FF]/20">
                <Phone className="w-3.5 h-3.5" />
                24/7 Clinical Consultation
              </span>
              <h2 className="font-archivo font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#0A192F] leading-tight">
                Connect With Our <span className="text-[#0066FF]">Medical Experts</span>
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#4A607A] leading-relaxed">
                Need guidance choosing the right CPAP, BiLevel, or Life Support Ventilator? Submit your contact details below or call our clinical helpline directly.
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="space-y-4">
              <a
                href="tel:+919343444428"
                className="p-5 bg-white rounded-2xl border border-[#003865]/10 shadow-xs hover:shadow-md transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#64748B] uppercase block">Hotline Phone Support</span>
                  <span className="font-archivo font-extrabold text-lg text-[#0A192F] group-hover:text-[#0066FF] transition-colors">
                    +91 9343444428
                  </span>
                </div>
              </a>

              <a
                href="mailto:enquiry@pulmocare.in"
                className="p-5 bg-white rounded-2xl border border-[#003865]/10 shadow-xs hover:shadow-md transition-all flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center shrink-0 group-hover:bg-[#0066FF] group-hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#64748B] uppercase block">Official Email Address</span>
                  <span className="font-archivo font-extrabold text-base text-[#0A192F] group-hover:text-[#0066FF] transition-colors">
                    enquiry@pulmocare.in
                  </span>
                </div>
              </a>

              <div className="p-5 bg-white rounded-2xl border border-[#003865]/10 shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#64748B] uppercase block">Headquarters Office</span>
                  <span className="font-archivo font-semibold text-xs text-[#0A192F]">
                    #85, 20th Main Rd, 1st N Block, Rajajinagar, Bengaluru 560010
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Assurance Strip */}
            <div className="flex items-center gap-4 pt-2 text-xs text-[#4A607A] border-t border-[#003865]/10">
              <span className="flex items-center gap-1.5 font-bold text-[#003865]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                ISO 13485 Certified
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-bold text-[#003865]">
                <Clock className="w-4 h-4 text-[#0066FF]" />
                2 Hours Response Time
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Medical Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#003865]/12 shadow-[0_12px_40px_-16px_rgba(0,56,101,0.15)] relative">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-archivo font-extrabold text-2xl text-[#0A192F]">
                    Inquiry Submitted Successfully!
                  </h3>
                  <p className="text-sm text-[#4A607A] max-w-md mx-auto">
                    Thank you, <strong className="text-[#0A192F]">{fullName}</strong>. Your request for <strong className="text-[#0066FF]">{device}</strong> has been logged into our clinical database. Our team will contact you at <strong className="text-[#0A192F]">{phone}</strong> within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFullName("");
                      setPhone("");
                      setEmail("");
                      setMessage("");
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#0066FF] text-white font-archivo font-bold text-xs uppercase cursor-pointer hover:bg-[#0052CC] transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-[#F1F5F9] pb-4 mb-2">
                    <h3 className="font-archivo font-extrabold text-xl text-[#0A192F]">
                      Medical Inquiry &amp; Order Form
                    </h3>
                    <p className="text-xs text-[#64748B]">Fill out your details to get pricing, home trial demo, or bulk quotes.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-archivo font-bold text-[#0A192F] uppercase mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Dr. Rajesh Kumar"
                        className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-archivo font-bold text-[#0A192F] uppercase mb-1.5">
                        Phone / WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +91 9845012345"
                        className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-archivo font-bold text-[#0A192F] uppercase mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rajesh@hospital.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-archivo font-bold text-[#0A192F] uppercase mb-1.5">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Bengaluru, Chennai, Delhi"
                        className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-archivo font-bold text-[#0A192F] uppercase mb-1.5">
                        Inquiry Category
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all"
                      >
                        <option value="CPAP / BiLevel Purchase">CPAP / BiLevel Purchase</option>
                        <option value="Ventilator Demo Request">Ventilator Demo Request</option>
                        <option value="Hospital Bulk Order">Hospital Bulk Order</option>
                        <option value="Equipment Rental">Equipment Rental</option>
                        <option value="Service & Technical Support">Service &amp; Technical Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-archivo font-bold text-[#0A192F] uppercase mb-1.5">
                        Preferred Device
                      </label>
                      <select
                        value={device}
                        onChange={(e) => setDevice(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all"
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-archivo font-bold text-[#0A192F] uppercase mb-1.5">
                      Detailed Clinical Requirements / Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please specify any prescription requirements, delivery timelines, or hospital deployment needs..."
                      className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-xs text-[#0A192F] focus:outline-none focus:border-[#0066FF] focus:bg-white transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-archivo font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Submitting Request..." : "Submit Medical Inquiry"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
