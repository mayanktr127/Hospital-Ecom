"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useToast } from "@/context/ToastContext";
import {
  Phone,
  Printer,
  Mail,
  Download,
  BookOpen,
  Youtube,
  Facebook,
  Instagram,
  Linkedin,
  ShieldCheck,
  X,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const Footer: React.FC = () => {
  const { addToast } = useToast();
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const handleRemoteSupportDownload = () => {
    addToast("Downloading Support Tool", "Fetching Remote support tool Diagnostics (LM_QuickSupport_Win_v15.zip)...");
    const link = document.createElement("a");
    link.href = "/doc-files/LM_QuickSupport_Win_v15.zip";
    link.download = "LM_QuickSupport_Win_v15.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <footer className="w-full bg-[#002A4E] text-white pt-14 pb-8 border-t border-white/10 font-inter">
      <div className="wrap max-w-[1240px] w-full mx-auto px-4 md:px-6">
        {/* 3-Column Footer Grid matching User Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 pb-12 border-b border-white/15">
          {/* Column 1: Contact us */}
          <div>
            <h3 className="font-archivo font-bold text-2xl text-white mb-4">Contact us</h3>

            <div className="space-y-1 text-sm text-white/90 leading-relaxed font-inter mb-5">
              <p className="font-bold text-white">Pulmo Care</p>
              <p>#85, 20th Main Rd, 1st N Block</p>
              <p>Rajajinagar, Bengaluru, Karnataka 560010</p>
              <p>India</p>
            </div>

            <div className="space-y-2 text-xs md:text-sm text-white/85 mb-6">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#007AC1]" />
                <span>+91 9343444428</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#007AC1]" />
                <a href="mailto:enquiry@pulmocare.in" className="hover:underline text-white">
                  enquiry@pulmocare.in
                </a>
              </div>
            </div>

            {/* Official Social Media Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.youtube.com/@LoewensteinMedicalGlobal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#007AC1] grid place-items-center transition-all text-white border border-white/10 hover:border-[#007AC1]"
                aria-label="Official Löwenstein Medical YouTube Channel"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/loewensteinmedical/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#007AC1] grid place-items-center transition-all text-white border border-white/10 hover:border-[#007AC1]"
                aria-label="Official Löwenstein Medical Facebook Page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/loewensteinmedical?igsh=MW9kY3luZnFidzdqYw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#007AC1] grid place-items-center transition-all text-white border border-white/10 hover:border-[#007AC1]"
                aria-label="Official Löwenstein Medical Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/loewensteinmedical/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#007AC1] grid place-items-center transition-all text-white border border-white/10 hover:border-[#007AC1]"
                aria-label="Official Löwenstein Medical LinkedIn Company Page"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Emergency numbers & Remote Support */}
          <div>
            <h3 className="font-archivo font-bold text-2xl text-white mb-4">Emergency numbers</h3>

            <div className="space-y-4 text-xs md:text-sm text-white/90 mb-6">
              <div>
                <span className="font-bold text-white block">Homecare</span>
                <span className="text-white/80">+49 800 10021-20</span>
              </div>

              <div>
                <span className="font-bold text-white block">Hospital</span>
                <span className="text-white/80">+49 800 960020-5</span>
              </div>

              <div>
                <span className="font-bold text-white block">Diagnostics</span>
                <span className="text-white/80">+49 800 960020-4</span>
              </div>
            </div>

            {/* Clinical Blog Link */}
            <Link
              href="/blog"
              className="group flex items-center gap-2 text-xs md:text-sm font-medium text-white hover:text-[#007AC1] transition-colors py-1"
            >
              <BookOpen className="w-4 h-4 text-[#007AC1] group-hover:translate-x-0.5 transition-transform" />
              <div className="text-left">
                <span>Clinical Blog &amp; Insights</span>
                <span className="block text-xs text-white/70">Articles &amp; Guides</span>
              </div>
            </Link>
          </div>

          {/* Column 3: Legal Links & Data Privacy Settings */}
          <div>
            <ul className="space-y-3 list-none p-0 m-0 text-sm md:text-base font-normal text-white/90 mb-8">
              <li>
                <Link href="/blog" className="hover:text-[#007AC1] transition-colors">
                  Blog &amp; Articles
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#007AC1] font-semibold text-[#007AC1] transition-colors">
                  Admin Portal
                </Link>
              </li>
              <li>
                <Link href="/legal-notice" className="hover:text-[#007AC1] transition-colors">
                  Legal Notice
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#007AC1] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/gtcs" className="hover:text-[#007AC1] transition-colors">
                  GTCs
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="hover:text-[#007AC1] transition-colors">
                  Sitemap
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setPrivacyModalOpen(true)}
                  className="hover:text-[#007AC1] transition-colors text-left cursor-pointer"
                >
                  Change data privacy settings
                </button>
              </li>
            </ul>

            <p className="text-xs text-white/70 leading-relaxed max-w-xs font-inter">
              Please note that the product range may vary from country to country.
            </p>
          </div>
        </div>

        {/* Bottom Bar matching Screenshot */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/80 font-inter">
          <p>© 2026 Pulmo Care. All rights reserved.</p>

          {/* "With people in mind" Slogan with Cyan Arcs */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-2 border-[#007AC1] border-r-transparent border-b-transparent rotate-45 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full border border-cyan-400" />
              </div>
              <span className="font-archivo font-extrabold text-base md:text-lg text-white tracking-tight">
                With people in mind
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DATA PRIVACY PREFERENCES MODAL */}
      <AnimatePresence>
        {privacyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPrivacyModalOpen(false)}
              className="fixed inset-0 bg-[#001E36]/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white text-[#003865] w-full max-w-md rounded-[28px] p-6 shadow-2xl border border-[#003865]/10 z-10 font-inter"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#003865]/10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#007AC1]" />
                  <h3 className="font-archivo font-bold text-lg text-[#003865]">Data Privacy Preferences</h3>
                </div>
                <button
                  onClick={() => setPrivacyModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-[#003865]/05 text-[#4A607A]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-4 text-xs text-[#4A607A]">
                <p>
                  Manage your data consent preferences for analytics, telemetry, and medical device portal cookies.
                </p>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-[#F0F6FA] border border-[#003865]/10 cursor-pointer">
                    <div>
                      <span className="font-bold text-[#003865] block text-xs">Essential Functional Cookies</span>
                      <span className="text-[10px] text-[#4A607A]">Required for medical download portal authentication</span>
                    </div>
                    <input type="checkbox" checked disabled className="accent-[#003865] w-4 h-4 cursor-not-allowed" />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-[#F0F6FA] border border-[#003865]/10 cursor-pointer">
                    <div>
                      <span className="font-bold text-[#003865] block text-xs">Performance &amp; Telemetry Analytics</span>
                      <span className="text-[10px] text-[#4A607A]">Helps improve device firmware documentation speed</span>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-[#003865] w-4 h-4 cursor-pointer" />
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-[#003865]/10 flex items-center justify-between">
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> GDPR Compliant
                </span>
                <button
                  onClick={() => {
                    setPrivacyModalOpen(false);
                    addToast("Privacy Saved", "Your data privacy settings have been updated.");
                  }}
                  className="px-5 py-2 rounded-full bg-[#003865] text-white text-xs font-semibold hover:bg-[#005A9C] transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
