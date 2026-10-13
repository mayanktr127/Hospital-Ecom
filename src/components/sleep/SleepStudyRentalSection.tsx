"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle,
  Calendar,
  X,
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { useToast } from "@/context/ToastContext";

export function SleepStudyRentalSection() {
  const { addSleepStudyBooking, pricingSettings } = useAdmin();
  const { addToast } = useToast();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const lvl3Price = pricingSettings?.sleepStudyLevel3Price ?? 5500;
  const lvl2Price = pricingSettings?.sleepStudyLevel2Price ?? 9000;
  const lvl1Price = pricingSettings?.sleepStudyLevel1Price ?? 14000;

  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    email: "",
    height: "",
    weight: "",
    bedTime: "10:30 PM",
    upTime: "06:30 AM",
    level: "Lvl 3", // Lvl 3 (HSAT), Lvl 2 (PSG Home), Lvl 1 (PSG Hospital)
    studyDate: new Date().toISOString().split("T")[0],
    address: "",
    city: "Bangalore",
    notes: "",
  });

  const getPriceForLevel = (lvlId: string) => {
    if (lvlId === "Lvl 1" || lvlId.includes("1")) return lvl1Price;
    if (lvlId === "Lvl 2" || lvlId.includes("2")) return lvl2Price;
    return lvl3Price;
  };

  const currentLevelPrice = getPriceForLevel(formData.level);
  const isLvl1Selected = formData.level === "Lvl 1" || formData.level.includes("1");

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.phone || !formData.email || !formData.address) {
      addToast("Missing Fields", "Please complete all required patient registration details.");
      return;
    }

    setIsSubmitting(true);
    try {
      const bookingId = `PSB-${Math.floor(1000 + Math.random() * 9000)}`;
      const bookingCharge = getPriceForLevel(formData.level);

      await addSleepStudyBooking({
        bookingId,
        patientName: formData.patientName,
        phone: formData.phone,
        email: formData.email,
        height: formData.height || "Not specified",
        weight: formData.weight || "Not specified",
        bedTime: formData.bedTime,
        upTime: formData.upTime,
        level: formData.level,
        studyDate: formData.studyDate,
        address: formData.address,
        city: formData.city,
        charges: bookingCharge,
        notes: formData.notes,
        status: "Pending",
      });

      addToast(
        "Sleep Study Booked!",
        `Booking ${bookingId} (${formData.level}) submitted at ₹${bookingCharge.toLocaleString("en-IN")}${isLvl1Selected ? "*" : ""}. Our clinical technician will contact you for confirmation.`
      );

      setBookingModalOpen(false);
      setFormData({
        patientName: "",
        phone: "",
        email: "",
        height: "",
        weight: "",
        bedTime: "10:30 PM",
        upTime: "06:30 AM",
        level: "Lvl 3",
        studyDate: new Date().toISOString().split("T")[0],
        address: "",
        city: "Bangalore",
        notes: "",
      });
    } catch (err) {
      console.error("Booking error:", err);
      addToast("Submission Error", "Failed to register sleep study booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* PROMINENT SLEEP STUDY RENTAL / DAY CHARGES SECTION */}
      <section className="mb-16 bg-gradient-to-r from-[#0A192F] via-[#1E293B] to-[#0F172A] rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden border border-[#1E293B]">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#0066FF]/20 to-transparent pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF] text-white text-xs font-archivo font-extrabold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Overnight Diagnostic Rental &amp; Service</span>
            </div>
            <h2 className="font-archivo font-bold text-2xl md:text-4xl text-white tracking-tight leading-tight">
              Home &amp; Hospital Sleep Study Rental
            </h2>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-inter">
              Book a comprehensive overnight diagnostic sleep study (Level 1, Level 2, Level 3) using official German Löwenstein polygraphy equipment. Includes technician delivery &amp; setup with board-certified doctor report.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-200">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md">
                <CheckCircle className="w-4 h-4 text-[#38BDF8]" />
                <span>CE &amp; ISO 13485 Devices</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md">
                <CheckCircle className="w-4 h-4 text-[#38BDF8]" />
                <span>Level 1, Level 2 &amp; Level 3 Options</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md">
                <CheckCircle className="w-4 h-4 text-[#38BDF8]" />
                <span>Physician Report Included</span>
              </div>
            </div>
          </div>

          {/* Pricing Badge & Booking CTA */}
          <div className="w-full lg:w-auto bg-white/10 backdrop-blur-xl border border-white/15 p-6 rounded-2xl flex flex-col items-center text-center gap-4 min-w-[310px]">
            <div className="w-full">
              <span className="text-[11px] font-archivo font-bold uppercase tracking-wider text-slate-300 block">
                Diagnostic Study Rates
              </span>
              <div className="flex items-baseline justify-center gap-1.5 mt-1">
                <span className="text-xs text-slate-300 font-medium">Starts from</span>
                <span className="font-archivo font-extrabold text-3xl md:text-4xl text-white">
                  ₹{lvl3Price.toLocaleString("en-IN")}
                </span>
                <span className="text-xs text-slate-300 font-medium">/ study</span>
              </div>

              {/* 3 Tier Quick Pill Breakdown */}
              <div className="mt-3 pt-3 border-t border-white/15 grid grid-cols-3 gap-2 text-left">
                <div className="bg-white/10 rounded-xl p-2 text-center border border-white/10">
                  <span className="text-[9px] uppercase font-archivo font-extrabold text-emerald-400 block tracking-wider">Lvl 3</span>
                  <span className="text-[12px] font-archivo font-black text-white block mt-0.5">₹{lvl3Price.toLocaleString("en-IN")}</span>
                  <span className="text-[9px] text-slate-300 block">HSAT Home</span>
                </div>
                <div className="bg-white/10 rounded-xl p-2 text-center border border-white/10">
                  <span className="text-[9px] uppercase font-archivo font-extrabold text-blue-400 block tracking-wider">Lvl 2</span>
                  <span className="text-[12px] font-archivo font-black text-white block mt-0.5">₹{lvl2Price.toLocaleString("en-IN")}</span>
                  <span className="text-[9px] text-slate-300 block">PSG Home</span>
                </div>
                <div className="bg-white/10 rounded-xl p-2 text-center border border-white/10">
                  <span className="text-[9px] uppercase font-archivo font-extrabold text-purple-300 block tracking-wider">Lvl 1</span>
                  <span className="text-[12px] font-archivo font-black text-white block mt-0.5">₹{lvl1Price.toLocaleString("en-IN")}*</span>
                  <span className="text-[9px] text-slate-300 block">Hospital</span>
                </div>
              </div>

              <span className="text-[10px] text-amber-300/90 font-medium block mt-2 text-center">
                *Level 1 is Hospital Dependent
              </span>
            </div>

            <button
              onClick={() => setBookingModalOpen(true)}
              className="w-full py-3.5 px-6 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-archivo font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Sleep Study Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* PATIENT SLEEP STUDY REGISTRATION MODAL FORM */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#0A192F]/65 backdrop-blur-md animate-fadeIn">
          <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden my-auto flex flex-col max-h-[92vh] sm:max-h-[88vh]">
            {/* Pinned Modal Header */}
            <div className="p-5 sm:p-6 pb-4 border-b border-[#E2E8F0] flex items-start justify-between gap-4 shrink-0 bg-white z-10">
              <div className="space-y-1 pr-2">
                <span className="text-[10px] sm:text-xs font-archivo font-extrabold text-[#0066FF] uppercase tracking-wider block">
                  Sleep Study Registration Form
                </span>
                <h2 className="font-archivo font-extrabold text-xl sm:text-2xl text-[#0A192F]">
                  Book Overnight Sleep Study
                </h2>
                <p className="text-xs text-[#64748B]">
                  Level 3: <strong className="text-[#0066FF]">₹{lvl3Price.toLocaleString("en-IN")}</strong> | Level 2: <strong className="text-[#0066FF]">₹{lvl2Price.toLocaleString("en-IN")}</strong> | Level 1: <strong className="text-[#0066FF]">₹{lvl1Price.toLocaleString("en-IN")}*</strong> (Hospital Dependent). Complete details for technician scheduling.
                </p>
              </div>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[#64748B] hover:text-[#0A192F] hover:bg-[#E2E8F0] transition-all shrink-0 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form id="sleepStudyForm" onSubmit={handleBookingSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs flex-1 custom-scrollbar">
              {/* Level Selection Section */}
              <div>
                <label className="block font-archivo font-bold text-[#0A192F] mb-2">
                  Select Study Level *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: "Lvl 3",
                      title: "Lvl 3 (Level 3)",
                      subtitle: "Home Polygraphy HSAT",
                      desc: "12 Channels Sleep Screening",
                      price: lvl3Price,
                      isHospitalDependent: false,
                    },
                    {
                      id: "Lvl 2",
                      title: "Lvl 2 (Level 2)",
                      subtitle: "Home Unattended PSG",
                      desc: "28 Channels Full Diagnostic",
                      price: lvl2Price,
                      isHospitalDependent: false,
                    },
                    {
                      id: "Lvl 1",
                      title: "Lvl 1 (Level 1)",
                      subtitle: "Hospital Attended PSG",
                      desc: "33+ Channels + HD Video",
                      price: lvl1Price,
                      isHospitalDependent: true,
                    },
                  ].map((levelItem) => (
                    <div
                      key={levelItem.id}
                      onClick={() => setFormData({ ...formData, level: levelItem.id })}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                        formData.level === levelItem.id
                          ? "bg-[#EBF5FF] border-[#0066FF] text-[#0066FF] shadow-xs ring-2 ring-[#0066FF]/20"
                          : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#0066FF]/40"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-archivo font-bold text-xs">{levelItem.title}</span>
                          {formData.level === levelItem.id && (
                            <CheckCircle className="w-4 h-4 text-[#0066FF]" />
                          )}
                        </div>
                        <span className="block text-[11px] font-semibold text-[#0A192F]">
                          {levelItem.subtitle}
                        </span>
                        <span className="block text-[10px] text-[#94A3B8] mt-1 leading-tight">
                          {levelItem.desc}
                        </span>
                      </div>

                      <div className="mt-3 pt-2 border-t border-[#E2E8F0]/70 flex items-baseline justify-between">
                        <span className="font-archivo font-extrabold text-sm text-[#0A192F]">
                          ₹{levelItem.price.toLocaleString("en-IN")}{levelItem.isHospitalDependent ? "*" : ""}
                        </span>
                        {levelItem.isHospitalDependent && (
                          <span className="text-[9px] font-semibold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
                            Hospital Dep.
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patient Name */}
              <div>
                <label className="block font-archivo font-bold text-[#0A192F] mb-1">
                  Patient Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Enter patient full name"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0066FF] focus:bg-white text-xs font-medium text-[#0A192F]"
                  />
                </div>
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-archivo font-bold text-[#0A192F] mb-1">
                    Phone / Whatsapp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0066FF] focus:bg-white text-xs font-medium text-[#0A192F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-archivo font-bold text-[#0A192F] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="patient@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0066FF] focus:bg-white text-xs font-medium text-[#0A192F]"
                    />
                  </div>
                </div>
              </div>

              {/* Preferred Date & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-archivo font-bold text-[#0A192F] mb-1">
                    Preferred Study Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.studyDate}
                    onChange={(e) => setFormData({ ...formData, studyDate: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0066FF] focus:bg-white text-xs font-medium text-[#0A192F]"
                  />
                </div>

                <div>
                  <label className="block font-archivo font-bold text-[#0A192F] mb-1">
                    Location City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0066FF] focus:bg-white text-xs font-medium text-[#0A192F]"
                  >
                    <option value="Bangalore">Bangalore</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Other">Other City in India</option>
                  </select>
                </div>
              </div>

              {/* Height, Weight & Sleeping Schedule */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8FAFC] p-3 rounded-2xl border border-[#E2E8F0]">
                <div>
                  <label className="block font-archivo font-semibold text-[11px] text-[#64748B] mb-1">
                    Height
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 175 cm"
                    value={formData.height}
                    onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-archivo font-semibold text-[11px] text-[#64748B] mb-1">
                    Weight
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 78 kg"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-archivo font-semibold text-[11px] text-[#64748B] mb-1">
                    Usual Bed Time
                  </label>
                  <input
                    type="text"
                    placeholder="10:30 PM"
                    value={formData.bedTime}
                    onChange={(e) => setFormData({ ...formData, bedTime: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs"
                  />
                </div>

                <div>
                  <label className="block font-archivo font-semibold text-[11px] text-[#64748B] mb-1">
                    Usual Wake Time
                  </label>
                  <input
                    type="text"
                    placeholder="06:30 AM"
                    value={formData.upTime}
                    onChange={(e) => setFormData({ ...formData, upTime: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-[#E2E8F0] rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Complete Address */}
              <div>
                <label className="block font-archivo font-bold text-[#0A192F] mb-1">
                  Full Home / Hospital Address *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                  <textarea
                    required
                    rows={2}
                    placeholder="Complete house/apartment address for technician delivery & setup"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0066FF] focus:bg-white text-xs font-medium text-[#0A192F]"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block font-archivo font-bold text-[#0A192F] mb-1">
                  Medical Notes / Special Instructions
                </label>
                <input
                  type="text"
                  placeholder="e.g. Patient uses supplemental oxygen, prescribing doctor name"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#0066FF] focus:bg-white text-xs font-medium text-[#0A192F]"
                />
              </div>
            </form>

            {/* Pinned Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 z-10">
              <div className="text-[11px] text-[#64748B] flex items-center gap-1.5 text-center sm:text-left">
                <ShieldCheck className="w-4 h-4 text-[#0066FF] shrink-0" />
                <span>
                  Selected <strong>{formData.level}</strong>: <strong className="text-[#0066FF] font-bold">₹{currentLevelPrice.toLocaleString("en-IN")}{isLvl1Selected ? "*" : ""} INR</strong>
                  {isLvl1Selected ? " *(Hospital Dependent rate)" : ""}. Payable upon technician arrival.
                </span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(false)}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-[#CBD5E1] text-[#475569] font-archivo font-bold text-xs hover:bg-[#E2E8F0] transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="sleepStudyForm"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-archivo font-extrabold text-xs uppercase tracking-wider shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>Confirm Booking</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
