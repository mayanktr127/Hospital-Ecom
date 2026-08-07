"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { useAdmin } from "@/context/AdminContext";
import { getDefaultProducts } from "@/utils/defaultProducts";
import {
  ShoppingCart,
  Heart,
  ArrowRight,
  ShieldCheck,
  Star,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Ruler,
  Weight,
  Activity,
  Sparkles,
  CheckCircle,
  X,
  MapPin,
  FileText,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

interface CategoryOverviewComponentProps {
  categorySlug: string;
  defaultTitle?: string;
  defaultDesc?: string;
}

export const CategoryOverviewComponent: React.FC<CategoryOverviewComponentProps> = ({
  categorySlug,
  defaultTitle,
  defaultDesc,
}) => {
  const { products, categories, isLoading, addSleepStudyBooking } = useAdmin();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  // Sleep Study Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    email: "",
    height: "",
    weight: "",
    bedTime: "10:30 PM",
    upTime: "06:30 AM",
    level: "Lvl 2", // Lvl 1, Lvl 2, Lvl 3
    studyDate: new Date().toISOString().split("T")[0],
    address: "",
    city: "Bangalore",
    notes: "",
  });

  const currentCategory = categories.find(
    (c) =>
      c.slug.toLowerCase() === categorySlug.toLowerCase() ||
      c.id.toLowerCase() === categorySlug.toLowerCase() ||
      c.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === categorySlug.toLowerCase() ||
      c.name.toLowerCase() === categorySlug.toLowerCase()
  );

  const title = currentCategory ? currentCategory.name : defaultTitle || "Medical Equipment Catalog";
  const description =
    currentCategory?.desc ||
    defaultDesc ||
    "High-performance medical hardware engineered for clinical hospital and homecare respiratory therapy. Certified to international CE and ISO 13485 quality standards.";

  const sourceProducts = products && products.length > 0 ? products : getDefaultProducts();

  const filterCategoryProducts = (prods: typeof sourceProducts) =>
    prods.filter((p) => {
      if (!p || !p.category) return false;

      const pCatNorm = p.category.toLowerCase().replace(/[^a-z0-9]/g, "");
      const slugNorm = categorySlug.toLowerCase().replace(/[^a-z0-9]/g, "");

      const cNameNorm = currentCategory ? currentCategory.name.toLowerCase().replace(/[^a-z0-9]/g, "") : "";
      const cSlugNorm = currentCategory ? (currentCategory.slug || "").toLowerCase().replace(/[^a-z0-9]/g, "") : "";

      return (
        pCatNorm === slugNorm ||
        pCatNorm === cNameNorm ||
        pCatNorm === cSlugNorm ||
        pCatNorm.includes(slugNorm) ||
        slugNorm.includes(pCatNorm) ||
        (cNameNorm && (pCatNorm.includes(cNameNorm) || cNameNorm.includes(pCatNorm))) ||
        (cSlugNorm && (pCatNorm.includes(cSlugNorm) || cSlugNorm.includes(pCatNorm))) ||
        (slugNorm.includes("sleep") && pCatNorm.includes("cpap")) ||
        (slugNorm.includes("cpap") && pCatNorm.includes("sleep"))
      );
    });

  let categoryProducts = filterCategoryProducts(sourceProducts);
  if (categoryProducts.length === 0) {
    categoryProducts = filterCategoryProducts(getDefaultProducts());
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.phone || !formData.email || !formData.address) {
      addToast("Missing Fields", "Please complete all required patient registration details.");
      return;
    }

    setIsSubmitting(true);
    try {
      const bookingId = `PSB-${Math.floor(1000 + Math.random() * 9000)}`;
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
        charges: 5000,
        notes: formData.notes,
        status: "Pending",
      });

      addToast(
        "Sleep Study Booked!",
        `Booking Ref #${bookingId} confirmed at ₹5,000/day. Our clinical coordinator will call you shortly.`
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
        level: "Lvl 2",
        studyDate: new Date().toISOString().split("T")[0],
        address: "",
        city: "Bangalore",
        notes: "",
      });
    } catch (err) {
      addToast("Booking Error", "Could not record sleep study booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex flex-col bg-[#F8FAFC] text-[#0A192F] font-inter">
        <Navbar />
        <main className="w-full mx-auto px-4 md:px-12 py-10 max-w-[1280px] flex-1">
          <div className="mb-12 bg-white rounded-3xl p-8 md:p-12 border border-[#E2E8F0] shadow-sm animate-pulse">
            <div className="h-4 w-40 bg-[#E2E8F0] rounded mb-4" />
            <div className="h-10 w-80 bg-[#E2E8F0] rounded mb-4" />
            <div className="h-4 w-full max-w-lg bg-[#E2E8F0] rounded" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F8FAFC] text-[#0A192F] font-inter">
      <Navbar />

      <main className="w-full mx-auto px-4 md:px-12 py-10 max-w-[1280px] flex-1">
        {/* Category Header Card */}
        <div className="mb-8 bg-white rounded-3xl p-8 md:p-12 border border-[#E2E8F0] shadow-sm relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <span className="text-xs font-archivo font-extrabold uppercase tracking-widest text-[#0066FF] block mb-2">
              Pulmo Care Specialty Catalog
            </span>
            <h1 className="font-archivo font-extrabold text-3xl md:text-5xl text-[#0A192F] mb-4 tracking-tight">
              {title}
            </h1>
            <div className="w-16 h-1.5 bg-[#0066FF] mb-6 rounded-full" />
            <p className="text-sm md:text-base text-[#64748B] leading-relaxed font-inter">
              {description}
            </p>
            <div className="mt-6 inline-flex items-center gap-3 bg-[#EBF5FF] text-[#0066FF] px-4 py-2 rounded-full font-archivo font-bold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>{categoryProducts.length} Certified Medical Devices Available</span>
            </div>
          </div>
        </div>

        {/* PROMINENT SLEEP STUDY RENTAL / DAY CHARGES SECTION (₹5,000 INR PER STUDY) */}
        <section className="mb-12 bg-gradient-to-r from-[#0A192F] via-[#1E293B] to-[#0F172A] rounded-3xl p-6 md:p-10 text-white shadow-xl relative overflow-hidden border border-[#1E293B]">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#0066FF]/20 to-transparent pointer-events-none" />
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF] text-white text-xs font-archivo font-extrabold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Overnight Diagnostic Rental & Service</span>
              </div>
              <h2 className="font-archivo font-bold text-2xl md:text-4xl text-white tracking-tight leading-tight">
                Home & Hospital Sleep Study Rental
              </h2>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Book a comprehensive overnight diagnostic sleep study (Lvl 1, Lvl 2, Lvl 3) using official German Löwenstein polygraphy equipment. Includes technician delivery & setup with board-certified doctor report.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-200">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md">
                  <CheckCircle className="w-4 h-4 text-[#38BDF8]" />
                  <span>CE & ISO 13485 Devices</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md">
                  <CheckCircle className="w-4 h-4 text-[#38BDF8]" />
                  <span>Level 1, Level 2 & Level 3 Options</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl backdrop-blur-md">
                  <CheckCircle className="w-4 h-4 text-[#38BDF8]" />
                  <span>Physician Report Included</span>
                </div>
              </div>
            </div>

            {/* Pricing Badge & Booking CTA */}
            <div className="w-full lg:w-auto bg-white/10 backdrop-blur-xl border border-white/15 p-6 rounded-2xl flex flex-col items-center text-center gap-4 min-w-[280px]">
              <div>
                <span className="text-[11px] font-archivo font-bold uppercase tracking-wider text-slate-300 block">
                  Daily Study Rate
                </span>
                <div className="flex items-baseline justify-center gap-1 mt-1">
                  <span className="font-archivo font-extrabold text-3xl md:text-4xl text-white">
                    ₹5,000
                  </span>
                  <span className="text-xs text-slate-300 font-medium">/ study (per day)</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold block mt-1">
                  ✓ All-Inclusive Technician & Diagnostic Report
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

        {/* Product Grid Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-archivo font-bold text-xl text-[#0A192F]">
            Featured Diagnostic Devices & Systems
          </h2>
          <span className="text-xs text-[#64748B]">Showing {categoryProducts.length} items</span>
        </div>

        {/* Product Grid */}
        <section className="mb-16">
          {categoryProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#E2E8F0] space-y-3">
              <h3 className="font-archivo font-bold text-xl text-[#0A192F]">No Products Available Yet</h3>
              <p className="text-xs text-[#64748B]">New devices for this category can be uploaded directly from the Admin Panel.</p>
              <Link href="/" className="inline-block mt-4 text-xs font-bold text-[#0066FF] hover:underline">
                Return to Storefront Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categoryProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="group bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-xs hover:shadow-xl hover:border-[#0066FF]/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <Link href={`/product/${prod.id}`} className="block">
                      <div className="w-full h-48 mb-6 flex items-center justify-center p-3 relative bg-[#F8FAFC] rounded-2xl border border-[#F1F5F9] cursor-pointer group-hover:border-[#0066FF]/20 transition-colors">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-md group-hover:scale-108 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/pulmocare/pulmocare_prisma-smart.png";
                          }}
                        />
                      </div>
                    </Link>

                    <span className="text-[10px] uppercase font-archivo font-bold text-[#0066FF] tracking-wider block mb-1">
                      {prod.category}
                    </span>
                    <Link href={`/product/${prod.id}`} className="block">
                      <h3 className="font-archivo font-bold text-lg text-[#0A192F] group-hover:text-[#0066FF] transition-colors mb-2 line-clamp-1 cursor-pointer">
                        {prod.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2 mb-4 font-inter">
                      {prod.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#F1F5F9] space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#94A3B8] line-through block">
                          ₹{prod.originalPrice?.toLocaleString("en-IN")}.00
                        </span>
                        <span className="font-archivo font-extrabold text-lg text-[#0A192F]">
                          ₹{prod.price.toLocaleString("en-IN")}.00
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{prod.rating || 5}.0</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          addToCart(prod);
                          addToast("Added to Cart", `${prod.name} has been added to your cart.`);
                        }}
                        className="flex-1 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-archivo font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                      <Link
                        href={`/product/${prod.id}`}
                        className="p-2.5 rounded-full bg-[#F8FAFC] hover:bg-[#E2E8F0] text-[#0A192F] transition-colors cursor-pointer"
                        title="View Full Details"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* PATIENT SLEEP STUDY REGISTRATION MODAL FORM (100% RESPONSIVE) */}
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
                  Daily Rental Charge: <strong className="text-[#0066FF]">₹5,000 INR per Study</strong>. Complete patient details for technician scheduling.
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
              {/* Level Selection Section (Responsive 1-col on mobile, 3-col on desktop) */}
              <div>
                <label className="block font-archivo font-bold text-[#0A192F] mb-2">
                  Select Study Level *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: "Lvl 1",
                      title: "Lvl 1 (Level 1)",
                      subtitle: "Hospital Attended PSG",
                      desc: "33 Channels + HD Video + EEG",
                    },
                    {
                      id: "Lvl 2",
                      title: "Lvl 2 (Level 2)",
                      subtitle: "Home Unattended PSG",
                      desc: "16 - 28 Channels Full Diagnostic",
                    },
                    {
                      id: "Lvl 3",
                      title: "Lvl 3 (Level 3)",
                      subtitle: "Home Polygraphy HSAT",
                      desc: "10 Channels Sleep Screening",
                    },
                  ].map((levelItem) => (
                    <div
                      key={levelItem.id}
                      onClick={() => setFormData({ ...formData, level: levelItem.id })}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                        formData.level === levelItem.id
                          ? "bg-[#EBF5FF] border-[#0066FF] text-[#0066FF] shadow-xs ring-2 ring-[#0066FF]/20"
                          : "bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:border-[#0066FF]/40"
                      }`}
                    >
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
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#0066FF] focus:outline-none text-xs text-[#0A192F]"
                  />
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block font-archivo font-bold text-[#0A192F] mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#0066FF] focus:outline-none text-xs text-[#0A192F]"
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
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#0066FF] focus:outline-none text-xs text-[#0A192F]"
                    />
                  </div>
                </div>
              </div>

              {/* Height & Weight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block font-archivo font-bold text-[#0A192F] mb-1">
                    Height (cm or ft/in) *
                  </label>
                  <div className="relative">
                    <Ruler className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. 175 cm or 5 ft 9 in"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#0066FF] focus:outline-none text-xs text-[#0A192F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-archivo font-bold text-[#0A192F] mb-1">
                    Weight (kg) *
                  </label>
                  <div className="relative">
                    <Weight className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. 78 kg"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#0066FF] focus:outline-none text-xs text-[#0A192F]"
                    />
                  </div>
                </div>
              </div>

              {/* Bed Time & Up Time (Select Time Dropdown Pickers) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block font-archivo font-bold text-[#0A192F] mb-1">
                    Usual Bed Time *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3 pointer-events-none z-10" />
                    <select
                      required
                      value={formData.bedTime}
                      onChange={(e) => setFormData({ ...formData, bedTime: e.target.value })}
                      className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#0066FF] focus:outline-none text-xs text-[#0A192F] bg-white appearance-none cursor-pointer"
                    >
                      <option value="08:00 PM">08:00 PM</option>
                      <option value="08:30 PM">08:30 PM</option>
                      <option value="09:00 PM">09:00 PM</option>
                      <option value="09:30 PM">09:30 PM</option>
                      <option value="10:00 PM">10:00 PM</option>
                      <option value="10:30 PM">10:30 PM</option>
                      <option value="11:00 PM">11:00 PM</option>
                      <option value="11:30 PM">11:30 PM</option>
                      <option value="12:00 AM">12:00 AM (Midnight)</option>
                      <option value="12:30 AM">12:30 AM</option>
                      <option value="01:00 AM">01:00 AM</option>
                      <option value="01:30 AM">01:30 AM</option>
                      <option value="02:00 AM">02:00 AM</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-3 pointer-events-none z-10" />
                  </div>
                </div>

                <div>
                  <label className="block font-archivo font-bold text-[#0A192F] mb-1">
                    Usual Wake / Up Time *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3 pointer-events-none z-10" />
                    <select
                      required
                      value={formData.upTime}
                      onChange={(e) => setFormData({ ...formData, upTime: e.target.value })}
                      className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#0066FF] focus:outline-none text-xs text-[#0A192F] bg-white appearance-none cursor-pointer"
                    >
                      <option value="04:00 AM">04:00 AM</option>
                      <option value="04:30 AM">04:30 AM</option>
                      <option value="05:00 AM">05:00 AM</option>
                      <option value="05:30 AM">05:30 AM</option>
                      <option value="06:00 AM">06:00 AM</option>
                      <option value="06:30 AM">06:30 AM</option>
                      <option value="07:00 AM">07:00 AM</option>
                      <option value="07:30 AM">07:30 AM</option>
                      <option value="08:00 AM">08:00 AM</option>
                      <option value="08:30 AM">08:30 AM</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="09:30 AM">09:30 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="10:30 AM">10:30 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#94A3B8] absolute right-3 top-3 pointer-events-none z-10" />
                  </div>
                </div>
              </div>

              {/* Preferred Date & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block font-archivo font-bold text-[#0A192F] mb-1">
                    Preferred Study Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                    <input
                      type="date"
                      required
                      value={formData.studyDate}
                      onChange={(e) => setFormData({ ...formData, studyDate: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#0066FF] focus:outline-none text-xs text-[#0A192F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-archivo font-bold text-[#0A192F] mb-1">
                    City *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bangalore"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] focus:border-[#0066FF] focus:outline-none text-xs text-[#0A192F]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block font-archivo font-bold text-[#0A192F] mb-1">
                  Full Home / Hospital Address *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Enter house no, street name, landmark & area pincode..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#E2E8F0] focus:border-[#0066FF] focus:outline-none text-xs text-[#0A192F]"
                />
              </div>

              {/* Notes / Symptoms */}
              <div>
                <label className="block font-archivo font-bold text-[#0A192F] mb-1">
                  Medical History / Symptoms (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Snoring, daytime sleepiness, doctor referral note, etc..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#E2E8F0] focus:border-[#0066FF] focus:outline-none text-xs text-[#0A192F]"
                />
              </div>
            </form>

            {/* Pinned Modal Action Footer */}
            <div className="p-4 sm:p-5 border-t border-[#E2E8F0] bg-[#F8FAFC] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-[#64748B] flex items-center gap-1.5 justify-center sm:justify-start">
                <ShieldCheck className="w-4 h-4 text-[#0066FF]" />
                <span>Rate: <strong className="text-[#0A192F]">₹5,000 INR / Study</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(false)}
                  className="px-4 py-2.5 rounded-full border border-[#E2E8F0] text-[#64748B] font-archivo font-bold text-xs hover:bg-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="sleepStudyForm"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none py-2.5 px-6 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-archivo font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all disabled:opacity-50 cursor-pointer text-center"
                >
                  {isSubmitting ? "Submitting..." : "Confirm Study Booking (₹5,000)"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
