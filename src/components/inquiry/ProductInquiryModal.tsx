"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useInquiry } from "@/context/InquiryContext";
import { useAdmin } from "@/context/AdminContext";
import { useToast } from "@/context/ToastContext";
import {
  X,
  Phone,
  Mail,
  User,
  MapPin,
  FileText,
  Send,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const ProductInquiryModal: React.FC = () => {
  const { isInquiryOpen, targetProduct, closeInquiryModal } = useInquiry();
  const { addToast } = useToast();
  const { addInquiry } = useAdmin();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    inquiryType: "Price Quote & Procurement",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Reset or pre-fill form when targetProduct changes or modal opens
  useEffect(() => {
    if (isInquiryOpen) {
      setIsSuccess(false);
      setErrorMsg(null);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        city: "",
        inquiryType: "Price Quote & Procurement",
        message: targetProduct?.name
          ? `I would like to request an official pricing quote, delivery lead time, and technical specifications for ${targetProduct.name}.`
          : "I would like to request pricing and product information.",
      });
    }
  }, [isInquiryOpen, targetProduct]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isInquiryOpen && !isSubmitting) {
        closeInquiryModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isInquiryOpen, isSubmitting, closeInquiryModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!formData.fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setErrorMsg("Please enter a valid contact phone number.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    const deviceName = targetProduct?.name || "General Device Inquiry";
    const payload = {
      id: `inq-${Date.now()}`,
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      city: formData.city.trim() || "Not Specified",
      inquiryType: formData.inquiryType,
      device: deviceName,
      message: formData.message.trim(),
      status: "New Lead",
    };

    try {
      if (addInquiry) {
        await addInquiry(payload);
      } else {
        // Fallback direct HTTP POST to /api/inquiries to persist into MongoDB
        const res = await fetch("/api/inquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const resData = await res.json().catch(() => null);

        if (!res.ok && resData?.error) {
          throw new Error(resData.error || "Failed to submit inquiry");
        }
      }

      setIsSuccess(true);
      addToast(
        "Inquiry Received!",
        `Your request for ${deviceName} has been forwarded to our clinical sales team.`
      );

      // Auto-close after 2.5s
      setTimeout(() => {
        setIsSuccess(false);
        closeInquiryModal();
      }, 2500);
    } catch (err: any) {
      console.error("Inquiry submission error:", err);
      setErrorMsg(err.message || "Failed to submit inquiry. Please try again or call our hotline.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isInquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isSubmitting && closeInquiryModal()}
            className="fixed inset-0 bg-[#0a1f3c]/60 backdrop-blur-sm transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white w-full max-w-xl rounded-[28px] shadow-2xl border border-[#e9edf4] overflow-hidden z-10 my-8"
          >
            {/* Modal Header */}
            <div className="relative bg-gradient-to-r from-[#f6f8fb] via-white to-[#EBF5FF] p-6 pb-5 border-b border-[#e9edf4]">
              <button
                onClick={() => !isSubmitting && closeInquiryModal()}
                className="absolute top-5 right-5 p-2 rounded-full text-[#64748b] hover:text-[#0a1f3c] hover:bg-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF5FF] border border-[#2a6ecb]/20 text-[#2a6ecb] text-[11px] font-archivo font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Price on Request • Official Clinical Quotation</span>
              </div>

              <h3 className="font-archivo font-bold text-xl sm:text-2xl text-[#0a1f3c] leading-tight">
                Request Product Pricing &amp; Details
              </h3>
              <p className="text-xs text-[#64748b] mt-1 font-inter">
                Submit your inquiry and our medical hardware specialists will contact you with procurement pricing.
              </p>
            </div>

            {/* Target Product Badge (if available) */}
            {targetProduct && (
              <div className="mx-6 mt-5 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3.5">
                {targetProduct.image && (
                  <div className="w-14 h-14 rounded-xl bg-white p-1 border border-[#e9edf4] shrink-0 flex items-center justify-center">
                    <img
                      src={targetProduct.image}
                      alt={targetProduct.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2a6ecb] block font-archivo">
                    {targetProduct.category || "Medical Equipment"}
                  </span>
                  <h4 className="font-archivo font-bold text-sm text-[#0a1f3c] truncate">
                    {targetProduct.name}
                  </h4>
                  <span className="text-[11px] text-[#64748b]">
                    Origin: German Clinical Standard • Warranty Supported
                  </span>
                </div>
              </div>
            )}

            {/* Content Body / Form */}
            <div className="p-6">
              {isSuccess ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#e0f3ec] text-[#1fb37a] grid place-items-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-archivo font-bold text-2xl text-[#0a1f3c]">
                    Inquiry Submitted Successfully!
                  </h4>
                  <p className="text-sm text-[#64748b] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{formData.fullName}</strong>. Your inquiry for{" "}
                    <strong>{targetProduct?.name || "equipment"}</strong> has been delivered directly to our sales administration desk. We will reach out within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-inter text-[#0a1f3c]">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-[#fbe6ee] text-[#dc4b56] text-xs border border-[#dc4b56]/20">
                      {errorMsg}
                    </div>
                  )}

                  {/* Name and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-archivo font-bold text-[#0a1f3c] uppercase mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Dr. / Mr. / Ms. Name"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#e9edf4] text-xs text-[#0a1f3c] focus:outline-none focus:border-[#2a6ecb] focus:ring-1 focus:ring-[#2a6ecb] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-archivo font-bold text-[#0a1f3c] uppercase mb-1">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#e9edf4] text-xs text-[#0a1f3c] focus:outline-none focus:border-[#2a6ecb] focus:ring-1 focus:ring-[#2a6ecb] transition-all font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email and City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-archivo font-bold text-[#0a1f3c] uppercase mb-1">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@example.com"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#e9edf4] text-xs text-[#0a1f3c] focus:outline-none focus:border-[#2a6ecb] focus:ring-1 focus:ring-[#2a6ecb] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-archivo font-bold text-[#0a1f3c] uppercase mb-1">
                        City / Hospital Name
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-[#64748b] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="e.g. Bengaluru / Manipal Hospital"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#e9edf4] text-xs text-[#0a1f3c] focus:outline-none focus:border-[#2a6ecb] focus:ring-1 focus:ring-[#2a6ecb] transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-xs font-archivo font-bold text-[#0a1f3c] uppercase mb-1">
                      Inquiry Purpose
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-[#e9edf4] text-xs text-[#0a1f3c] focus:outline-none focus:border-[#2a6ecb] bg-white transition-all font-inter"
                    >
                      <option value="Price Quote & Procurement">Official Price Quotation &amp; Procurement</option>
                      <option value="Hospital / Institutional Order">Hospital / Institutional Bulk Order</option>
                      <option value="Private Patient Purchase">Private Patient Purchase / Home Care</option>
                      <option value="Device Demonstration">Product Demonstration / Trial Request</option>
                      <option value="Rental Terms Inquiry">Equipment Rental Inquiry</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-archivo font-bold text-[#0a1f3c] uppercase mb-1">
                      Requirements &amp; Specific Notes
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify required quantities, delivery location, or special questions..."
                      className="w-full p-3 rounded-xl border border-[#e9edf4] text-xs text-[#0a1f3c] focus:outline-none focus:border-[#2a6ecb] focus:ring-1 focus:ring-[#2a6ecb] transition-all resize-none leading-relaxed"
                    />
                  </div>

                  {/* Submit and Direct Call row */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full sm:flex-1 cursor-pointer inline-flex items-center justify-center gap-2 !py-3 !text-xs uppercase tracking-wider font-bold"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Official Inquiry</span>
                        </>
                      )}
                    </button>

                    <a
                      href="tel:+919343444428"
                      className="w-full sm:w-auto px-4 py-3 rounded-full border border-[#2a6ecb] text-[#2a6ecb] text-xs font-archivo font-bold inline-flex items-center justify-center gap-1.5 hover:bg-[#EBF5FF] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call: +91 93434 44428</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-[#64748b] text-center pt-1 font-inter">
                    Your details are securely stored under ISO 27001 / DPDP compliance and delivered directly to the Pulmo Care administrator desk.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
