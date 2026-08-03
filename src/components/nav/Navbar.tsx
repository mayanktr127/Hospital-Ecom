"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { ProductCategory } from "@/types/product";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Globe,
  ShieldAlert,
  ShieldCheck,
  Check,
  ChevronUp,
  Phone,
  Mail,
  FileText,
  Building2,
  Briefcase,
  UserCheck,
  Stethoscope,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onOpenSearch?: () => void;
  onSelectCategory?: (category: ProductCategory) => void;
}

type DropdownKey = "company" | "professionals" | "products" | "news" | null;
type ProductFocusKey =
  | "sleep-therapy"
  | "ventilation"
  | "asv-titration-devices"
  | "humidifiers"
  | "bilevel-s-st-devices"
  | "oxygen-therapy"
  | "sleep-diagnostics"
  | "masks";

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onSelectCategory }) => {
  const { totalItems, toggleCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Focus Category selection inside Products mega dropdown
  const [activeProductFocus, setActiveProductFocus] = useState<ProductFocusKey>("sleep-therapy");
  const [expandedSubGroup, setExpandedSubGroup] = useState<string | null>("CPAP & APAP Devices");

  // Global Website Selector Dropdown State
  const [globalWebsiteOpen, setGlobalWebsiteOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Global (English)");
  const [safetyModalOpen, setSafetyModalOpen] = useState<boolean>(false);

  // Mobile Accordion States inside Mobile Menu
  const [mobileProductsOpen, setMobileProductsOpen] = useState<boolean>(true);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState<boolean>(false);
  const [mobileProfessionalsOpen, setMobileProfessionalsOpen] = useState<boolean>(false);

  const globalRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "global", label: "Global (English)", region: "Worldwide" },
    { code: "de", label: "Deutschland (Deutsch)", region: "Germany" },
    { code: "in", label: "India (English)", region: "India" },
    { code: "fr", label: "France (Français)", region: "France" },
    { code: "es", label: "España (Español)", region: "Spain" },
  ];

  // Product Sub-Menu Navigation Data Tree
  const productSubMenuMap: Record<
    ProductFocusKey,
    {
      title: string;
      overviewLink: string;
      subGroups: { title: string; items: { name: string; link: string }[] }[];
    }
  > = {
    "sleep-therapy": {
      title: "Sleep Apnea Therapy",
      overviewLink: "/sleep-apnea-therapy",
      subGroups: [
        {
          title: "CPAP & APAP Devices",
          items: [
            { name: "Prisma SMART", link: "/cpap-apap-devices/prisma-smart" },
            { name: "Prisma SOFT", link: "/cpap-apap-devices/prisma-soft" },
            { name: "Prisma 20A", link: "/cpap-apap-devices/prisma-20a" },
          ],
        },
      ],
    },
    ventilation: {
      title: "Ventilation",
      overviewLink: "/ventilation",
      subGroups: [
        {
          title: "Home & Life Support Ventilation",
          items: [
            { name: "prismaVENT Series", link: "/ventilation/prisma-vent40" },
            { name: "LUISA Ventilator", link: "/ventilation/luisa" },
          ],
        },
      ],
    },
    "bilevel-s-st-devices": {
      title: "BiLevel S & ST Devices",
      overviewLink: "/bilevel-s-st-devices",
      subGroups: [
        {
          title: "BiLevel Therapy Units",
          items: [
            { name: "Prisma 25S", link: "/bilevel-s-st-devices/prisma-25s" },
            { name: "Prisma 25ST", link: "/bilevel-s-st-devices/prisma-25st" },
            { name: "Prisma 30ST", link: "/bilevel-s-st-devices/prisma-30st" },
          ],
        },
      ],
    },
    "asv-titration-devices": {
      title: "ASV & Titration Devices",
      overviewLink: "/asv-titration-devices",
      subGroups: [
        {
          title: "Adaptive Servo-Ventilation & Titration",
          items: [
            { name: "Prisma CR", link: "/asv-titration-devices/prisma-cr" },
            { name: "Prisma LAB", link: "/asv-titration-devices/prisma-lab" },
          ],
        },
      ],
    },
    humidifiers: {
      title: "Humidifiers",
      overviewLink: "/humidifiers",
      subGroups: [
        {
          title: "Respiratory Humidification",
          items: [
            { name: "Prisma AQUA", link: "/humidifiers/prisma-aqua" },
            { name: "VENTIclick", link: "/humidifiers/venticlick" },
          ],
        },
      ],
    },
    "oxygen-therapy": {
      title: "Oxygen Therapy",
      overviewLink: "/oxygen-therapy",
      subGroups: [
        {
          title: "Oxygen Concentrators",
          items: [
            { name: "Inogen Rove 6", link: "/oxygen-therapy/inogen-rove-6" },
            { name: "Nidek Neo 5", link: "/oxygen-therapy/nidek-neo-5" },
          ],
        },
      ],
    },
    "sleep-diagnostics": {
      title: "Sleep Diagnostics",
      overviewLink: "/sleep-diagnostics",
      subGroups: [
        {
          title: "Polygraphy & Sleep Screening",
          items: [
            { name: "Samoa Polygraphy System", link: "/sleep-diagnostics/samoa" },
            { name: "Scala PSG Diagnostics", link: "/sleep-diagnostics/scala" },
            { name: "Sonata Sleep Lab System", link: "/sleep-diagnostics/sonata" },
          ],
        },
      ],
    },
    masks: {
      title: "Masks",
      overviewLink: "/masks",
      subGroups: [
        {
          title: "Full Face Masks",
          items: [
            { name: "LENA Full Face Mask", link: "/masks/lena" },
            { name: "CARA Full Face Mask", link: "/masks/cara-full-face" },
            { name: "JOYCEone Full Face", link: "/masks/joyceone-full-face" },
          ],
        },
      ],
    },
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (globalRef.current && !globalRef.current.contains(event.target as Node)) {
        setGlobalWebsiteOpen(false);
      }
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className="w-full bg-white/75 backdrop-blur-xl border-b border-[#e9edf4] sticky top-0 z-50 transition-all duration-200 shadow-[0_2px_8px_rgba(24,42,65,0.05)]"
      ref={navContainerRef}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      {/* Top Utility Bar: Contact & Global Portal */}
      <div className="wrap max-w-[1240px] mx-auto px-4 md:px-6 py-1.5 flex items-center justify-between text-xs text-[#0a1f3c] font-inter font-medium border-b border-[#e9edf4]">
        <div className="flex items-center gap-4 text-[#64748b] w-full sm:w-auto justify-center sm:justify-start">
          <span>📞 Hotline: <a href="tel:+919343444428" className="font-bold text-[#0a1f3c] hover:text-[#2a6ecb]">+91 9343444428</a></span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">✉️ <a href="mailto:enquiry@pulmocare.in" className="font-bold text-[#0a1f3c] hover:text-[#2a6ecb]">enquiry@pulmocare.in</a></span>
        </div>

        <div className="hidden sm:flex items-center gap-6">
          {/* Admin Portal Link */}
          <Link
            href="/admin"
            className="flex items-center gap-1 text-[#2a6ecb] hover:text-[#0a1f3c] font-bold transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Portal</span>
          </Link>

          {/* Safety Information Link */}
          <button
            onClick={() => setSafetyModalOpen(true)}
            className="flex items-center gap-1.5 hover:text-[#2a6ecb] transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#2a6ecb]" />
            <span>Safety information</span>
          </button>

          {/* Global Portal & Language Switcher Dropdown */}
          <div className="relative" ref={globalRef}>
            <button
              onClick={() => setGlobalWebsiteOpen(!globalWebsiteOpen)}
              className="flex items-center gap-1.5 hover:text-[#2a6ecb] transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#2a6ecb]" />
              <span>{selectedLanguage}</span>
              <ChevronDown className="w-3 h-3 text-[#64748b]" />
            </button>

            <AnimatePresence>
              {globalWebsiteOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#e9edf4] rounded-2xl shadow-xl py-2 z-50 text-xs font-inter"
                >
                  <div className="px-3.5 py-1.5 font-bold text-[#0a1f3c] border-b border-[#e9edf4]">
                    Select Region &amp; Language
                  </div>

                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.label);
                        setGlobalWebsiteOpen(false);
                        addToast("Region Updated", `Switched to ${lang.label}`);
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-2 hover:bg-[#f6f4fb] text-left text-[#0a1f3c] transition-colors cursor-pointer"
                    >
                      <div>
                        <span className="block font-medium">{lang.label}</span>
                        <span className="text-[10px] text-[#64748b]">{lang.region}</span>
                      </div>
                      {selectedLanguage === lang.label && <Check className="w-3.5 h-3.5 text-[#2a6ecb]" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Primary Brand Navigation Bar */}
      <div className="wrap max-w-[1240px] mx-auto px-4 md:px-6 py-3.5 flex items-center justify-between relative">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/images/pulmocare/pulmocare_logo.png"
            alt="Pulmo Care Logo"
            className="h-7 sm:h-8 w-auto object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-8 font-inter font-medium text-sm text-[#0a1f3c] list-none p-0 m-0">
          <li className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === "company" ? null : "company")}
              onMouseEnter={() => setActiveDropdown("company")}
              className={`flex items-center gap-1.5 py-1 transition-colors ${
                activeDropdown === "company" ? "text-[#2a6ecb] font-semibold" : "hover:text-[#2a6ecb]"
              }`}
            >
              <span>Company</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "company" ? "rotate-180 text-[#2a6ecb]" : ""}`} />
            </button>
          </li>

          <li className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === "professionals" ? null : "professionals")}
              onMouseEnter={() => setActiveDropdown("professionals")}
              className={`flex items-center gap-1.5 py-1 transition-colors ${
                activeDropdown === "professionals" ? "text-[#2a6ecb] font-semibold" : "hover:text-[#2a6ecb]"
              }`}
            >
              <span>Professionals</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "professionals" ? "rotate-180 text-[#2a6ecb]" : ""}`} />
            </button>
          </li>

          <li className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === "products" ? null : "products")}
              onMouseEnter={() => setActiveDropdown("products")}
              className={`flex items-center gap-1.5 py-1 transition-colors ${
                activeDropdown === "products" ? "text-[#2a6ecb] font-semibold" : "hover:text-[#2a6ecb]"
              }`}
            >
              <span>Products</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "products" ? "rotate-180 text-[#2a6ecb]" : ""}`} />
            </button>
          </li>

          <li>
            <Link href="/blog" className="hover:text-[#2a6ecb] transition-colors py-1">
              Blog
            </Link>
          </li>
        </ul>

        {/* Right Action Icons Cluster */}
        <div className="flex items-center gap-2">
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-full border border-[#e9edf4] bg-white text-xs text-[#64748b] hover:text-[#2a6ecb] hover:border-[#7fb0ee] shadow-[0_2px_8px_rgba(24,42,65,0.05)] transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#0a1f3c]" />
              <span>Search</span>
            </button>
          )}

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="w-10 h-10 rounded-full border border-[#e9edf4] bg-white flex items-center justify-center text-[#0a1f3c] hover:bg-[#fbe6ee] hover:text-[#2a6ecb] hover:border-[#7fb0ee] transition-colors relative shrink-0 cursor-pointer shadow-[0_2px_8px_rgba(24,42,65,0.05)]"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 text-[#0a1f3c]" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 rounded-full bg-[#2a6ecb] text-white text-[10px] font-archivo font-semibold flex items-center justify-center border-2 border-white shadow-md z-10 leading-none">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="w-10 h-10 rounded-full border border-[#e9edf4] bg-white flex items-center justify-center text-[#0a1f3c] hover:bg-[#dcebfb] hover:text-[#2a6ecb] hover:border-[#7fb0ee] transition-colors relative shrink-0 cursor-pointer shadow-[0_2px_8px_rgba(24,42,65,0.05)]"
            aria-label="Cart"
          >
            <ShoppingBag className="w-5 h-5 text-[#0a1f3c]" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 rounded-full bg-[#0a1f3c] text-white text-[10px] font-archivo font-semibold flex items-center justify-center border-2 border-white shadow-md z-10 leading-none">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Button (≡) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-full border border-[#e9edf4] bg-white grid place-items-center text-[#0a1f3c] cursor-pointer shadow-[0_2px_8px_rgba(24,42,65,0.05)]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#0a1f3c]" /> : <Menu className="w-5 h-5 text-[#0a1f3c]" />}
          </button>
        </div>

        {/* FULL MOBILE MENU DRAWER OVERLAY (Triggers on ≡ Click) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-[#0a1f3c]/15 shadow-2xl overflow-hidden z-50 text-xs font-inter"
            >
              <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                {/* 1. Products Accordion */}
                <div className="border border-[#0a1f3c]/10 rounded-2xl p-4 bg-[#f7f6fb]">
                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="w-full flex items-center justify-between font-archivo font-semibold text-sm text-[#0a1f3c]"
                  >
                    <span className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-[#2a6ecb]" />
                      Products &amp; Categories
                    </span>
                    {mobileProductsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {mobileProductsOpen && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-[#0a1f3c]/10">
                      {Object.entries(productSubMenuMap).map(([key, cat]) => (
                        <div key={key} className="space-y-1">
                          <Link
                            href={cat.overviewLink}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block font-bold text-[#2a6ecb] hover:underline py-1 text-xs"
                          >
                            {cat.title} →
                          </Link>
                          <div className="pl-3 space-y-1 text-[#64748b]">
                            {cat.subGroups[0]?.items.map((item) => (
                              <Link
                                key={item.name}
                                href={item.link}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-1 hover:text-[#0a1f3c]"
                              >
                                • {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. Company Accordion */}
                <div className="border border-[#0a1f3c]/10 rounded-2xl p-4 bg-[#f7f6fb]">
                  <button
                    onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                    className="w-full flex items-center justify-between font-archivo font-semibold text-sm text-[#0a1f3c]"
                  >
                    <span className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-[#2a6ecb]" />
                      Company Overview
                    </span>
                    {mobileCompanyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {mobileCompanyOpen && (
                    <div className="mt-3 space-y-2 pt-2 border-t border-[#0a1f3c]/10 text-[#64748b]">
                      <Link href="/company/about-us" onClick={() => setMobileMenuOpen(false)} className="block py-1 font-medium hover:text-[#2a6ecb]">About Us</Link>
                      <Link href="/company/our-values" onClick={() => setMobileMenuOpen(false)} className="block py-1 font-medium hover:text-[#2a6ecb]">Our Values</Link>
                      <Link href="/company/compliance" onClick={() => setMobileMenuOpen(false)} className="block py-1 font-medium hover:text-[#2a6ecb]">Compliance</Link>
                      <Link href="/company/quality-management" onClick={() => setMobileMenuOpen(false)} className="block py-1 font-medium hover:text-[#2a6ecb]">Quality Management</Link>
                      <Link href="/company/sustainability" onClick={() => setMobileMenuOpen(false)} className="block py-1 font-medium hover:text-[#2a6ecb]">Sustainability</Link>
                      <Link href="/career/job-openings" onClick={() => setMobileMenuOpen(false)} className="block py-1 font-medium hover:text-[#2a6ecb]">Job Openings</Link>
                    </div>
                  )}
                </div>

                {/* 3. Direct Quick Links */}
                <div className="space-y-2 pt-2">
                  <Link
                    href="/blog"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 font-archivo font-bold text-sm text-[#0a1f3c] p-3 rounded-xl hover:bg-[#f6f4fb]"
                  >
                    <FileText className="w-4 h-4 text-[#2a6ecb]" />
                    <span>Clinical Blog &amp; Articles</span>
                  </Link>

                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 font-archivo font-bold text-sm text-[#2a6ecb] p-3 rounded-xl bg-[#2a6ecb]/10"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#2a6ecb]" />
                    <span>Admin Control Portal</span>
                  </Link>
                </div>

                {/* 4. Contact Footer Strip */}
                <div className="pt-4 border-t border-[#0a1f3c]/10 space-y-2 text-xs text-[#64748b]">
                  <a href="tel:+919343444428" className="flex items-center gap-2 font-bold text-[#0a1f3c]">
                    <Phone className="w-4 h-4 text-[#2a6ecb]" />
                    <span>Hotline: +91 9343444428</span>
                  </a>
                  <a href="mailto:enquiry@pulmocare.in" className="flex items-center gap-2 font-medium">
                    <Mail className="w-4 h-4 text-[#2a6ecb]" />
                    <span>enquiry@pulmocare.in</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Mega Dropdowns */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:block absolute top-full left-0 right-0 bg-white border-b border-[#0a1f3c]/15 shadow-2xl z-40 p-8 text-xs font-inter"
            >
              {/* 1. COMPANY MEGA DROPDOWN */}
              {activeDropdown === "company" && (
                <div className="max-w-[1240px] mx-auto grid grid-cols-12 gap-8">
                  <div className="col-span-4 pr-6 border-r border-[#e9edf4]">
                    <h3 className="font-archivo font-normal text-3xl text-[#64748b] mb-3">Company</h3>
                    <p className="text-xs font-inter text-[#64748b] leading-relaxed mb-4">
                      Discover Pulmo Care&apos;s history, corporate values, quality standards, clinical solutions, and career opportunities in sleep and respiratory care.
                    </p>
                  </div>
                  <div className="col-span-8 grid grid-cols-3 gap-4">
                    <Link
                      href="/company/about-us"
                      onClick={() => setActiveDropdown(null)}
                      className="p-4 rounded-[20px] bg-[#f6f4fb] border border-[#e9edf4] hover:border-[#7fb0ee] hover:bg-[#dcebfb] hover:-translate-y-0.5 transition-all group"
                    >
                      <Building2 className="w-5 h-5 text-[#2a6ecb] mb-2 group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-[#0a1f3c] block mb-1">About Us</span>
                      <span className="text-[11px] text-[#64748b]">Our heritage &amp; leadership</span>
                    </Link>
                    <Link
                      href="/company/our-values"
                      onClick={() => setActiveDropdown(null)}
                      className="p-4 rounded-[20px] bg-[#f6f4fb] border border-[#e9edf4] hover:border-[#7fb0ee] hover:bg-[#dcebfb] hover:-translate-y-0.5 transition-all group"
                    >
                      <ShieldCheck className="w-5 h-5 text-[#2a6ecb] mb-2 group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-[#0a1f3c] block mb-1">Our Values</span>
                      <span className="text-[11px] text-[#64748b]">Quality, trust &amp; patient care</span>
                    </Link>
                    <Link
                      href="/company/compliance"
                      onClick={() => setActiveDropdown(null)}
                      className="p-4 rounded-[20px] bg-[#f6f4fb] border border-[#e9edf4] hover:border-[#7fb0ee] hover:bg-[#dcebfb] hover:-translate-y-0.5 transition-all group"
                    >
                      <FileText className="w-5 h-5 text-[#2a6ecb] mb-2 group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-[#0a1f3c] block mb-1">Compliance</span>
                      <span className="text-[11px] text-[#64748b]">Regulatory &amp; clinical ethics</span>
                    </Link>
                    <Link
                      href="/company/quality-management"
                      onClick={() => setActiveDropdown(null)}
                      className="p-4 rounded-[20px] bg-[#f6f4fb] border border-[#e9edf4] hover:border-[#7fb0ee] hover:bg-[#dcebfb] hover:-translate-y-0.5 transition-all group"
                    >
                      <Check className="w-5 h-5 text-[#2a6ecb] mb-2 group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-[#0a1f3c] block mb-1">Quality Management</span>
                      <span className="text-[11px] text-[#64748b]">ISO 13485 Standards</span>
                    </Link>
                    <Link
                      href="/company/sustainability"
                      onClick={() => setActiveDropdown(null)}
                      className="p-4 rounded-[20px] bg-[#f6f4fb] border border-[#e9edf4] hover:border-[#7fb0ee] hover:bg-[#dcebfb] hover:-translate-y-0.5 transition-all group"
                    >
                      <Globe className="w-5 h-5 text-[#2a6ecb] mb-2 group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-[#0a1f3c] block mb-1">Sustainability</span>
                      <span className="text-[11px] text-[#64748b]">Eco-friendly manufacturing</span>
                    </Link>
                    <Link
                      href="/career/job-openings"
                      onClick={() => setActiveDropdown(null)}
                      className="p-4 rounded-[20px] bg-[#f6f4fb] border border-[#e9edf4] hover:border-[#7fb0ee] hover:bg-[#dcebfb] hover:-translate-y-0.5 transition-all group"
                    >
                      <Briefcase className="w-5 h-5 text-[#2a6ecb] mb-2 group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-[#0a1f3c] block mb-1">Careers</span>
                      <span className="text-[11px] text-[#64748b]">Join our medical team</span>
                    </Link>
                  </div>
                </div>
              )}

              {/* 2. PROFESSIONALS MEGA DROPDOWN */}
              {activeDropdown === "professionals" && (
                <div className="max-w-[1240px] mx-auto grid grid-cols-12 gap-8">
                  <div className="col-span-4 pr-6 border-r border-[#e9edf4]">
                    <h3 className="font-archivo font-normal text-3xl text-[#64748b] mb-3">Professionals</h3>
                    <p className="text-xs font-inter text-[#64748b] leading-relaxed mb-4">
                      Clinical resources, equipment trial requests, specialist training, and research insights for physicians and medical specialists.
                    </p>
                  </div>
                  <div className="col-span-8 grid grid-cols-3 gap-4">
                    <Link
                      href="/professionals"
                      onClick={() => setActiveDropdown(null)}
                      className="p-4 rounded-[20px] bg-[#f6f4fb] border border-[#e9edf4] hover:border-[#7fb0ee] hover:bg-[#dcebfb] hover:-translate-y-0.5 transition-all group"
                    >
                      <UserCheck className="w-5 h-5 text-[#2a6ecb] mb-2 group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-[#0a1f3c] block mb-1">Clinical Portal</span>
                      <span className="text-[11px] text-[#64748b]">Physician &amp; specialist hub</span>
                    </Link>
                    <Link
                      href="/professionals/demo-request"
                      onClick={() => setActiveDropdown(null)}
                      className="p-4 rounded-[20px] bg-[#f6f4fb] border border-[#e9edf4] hover:border-[#7fb0ee] hover:bg-[#dcebfb] hover:-translate-y-0.5 transition-all group"
                    >
                      <Stethoscope className="w-5 h-5 text-[#2a6ecb] mb-2 group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-[#0a1f3c] block mb-1">Clinical Demos &amp; Trials</span>
                      <span className="text-[11px] text-[#64748b]">Request hospital &amp; clinic trial units</span>
                    </Link>
                    <Link
                      href="/blog"
                      onClick={() => setActiveDropdown(null)}
                      className="p-4 rounded-[20px] bg-[#f6f4fb] border border-[#e9edf4] hover:border-[#7fb0ee] hover:bg-[#dcebfb] hover:-translate-y-0.5 transition-all group"
                    >
                      <FileText className="w-5 h-5 text-[#2a6ecb] mb-2 group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-[#0a1f3c] block mb-1">Clinical Research</span>
                      <span className="text-[11px] text-[#64748b]">Ventilation study insights</span>
                    </Link>
                  </div>
                </div>
              )}

              {/* 3. PRODUCTS MEGA DROPDOWN */}
              {activeDropdown === "products" && (
                <div className="max-w-[1240px] mx-auto grid grid-cols-12 gap-8 divide-x divide-[#0a1f3c]/15">
                  <div className="col-span-3 pr-6">
                    <h3 className="font-archivo font-normal text-3xl text-[#64748b] mb-3">Products</h3>
                    <p className="text-xs font-inter text-[#64748b] leading-relaxed mb-4">
                      Explore German engineered ventilators, CPAP devices, diagnostics, and patient interfaces.
                    </p>
                  </div>

                  <div className="col-span-5 px-6 border-r border-[#e9edf4]">
                    <div className="space-y-1 max-h-[360px] overflow-y-auto pr-1">
                      {(
                        [
                          { key: "sleep-therapy", label: "Sleep Apnea Therapy" },
                          { key: "ventilation", label: "Ventilation" },
                          { key: "bilevel-s-st-devices", label: "BiLevel S & ST Devices" },
                          { key: "asv-titration-devices", label: "ASV & Titration Devices" },
                          { key: "humidifiers", label: "Humidifiers" },
                          { key: "oxygen-therapy", label: "Oxygen Therapy" },
                          { key: "sleep-diagnostics", label: "Sleep Diagnostics" },
                          { key: "masks", label: "Masks" },
                        ] as { key: ProductFocusKey; label: string }[]
                      ).map((focus) => {
                        const isSelected = activeProductFocus === focus.key;
                        return (
                          <button
                            key={focus.key}
                            onClick={() => {
                              setActiveProductFocus(focus.key);
                              setExpandedSubGroup(productSubMenuMap[focus.key].subGroups[0]?.title || null);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-left font-medium transition-all cursor-pointer ${
                              isSelected ? "bg-[#0a1f3c] text-[#FFFFFF] font-semibold shadow-sm" : "hover:bg-[#f6f4fb] hover:text-[#2a6ecb]"
                            }`}
                          >
                            <span>{focus.label}</span>
                            <ChevronRight className={`w-4 h-4 ${isSelected ? "text-white" : "text-[#0a1f3c]/40"}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="col-span-4 pl-6 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[#e9edf4]">
                      <Link
                        href={productSubMenuMap[activeProductFocus].overviewLink}
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs font-bold text-[#2a6ecb] hover:underline flex items-center gap-1 font-inter"
                      >
                        <span>Category Overview</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="space-y-2">
                      {productSubMenuMap[activeProductFocus].subGroups.map((subGroup) => (
                        <div key={subGroup.title} className="border border-[#0a1f3c]/10 rounded-2xl p-3 bg-white/90">
                          <span className="font-bold text-[#0a1f3c] block mb-2">{subGroup.title}</span>
                          <div className="space-y-1 pl-2">
                            {subGroup.items.map((item) => (
                              <Link
                                key={item.name}
                                href={item.link}
                                onClick={() => setActiveDropdown(null)}
                                className="block py-1 hover:text-[#2a6ecb] font-medium"
                              >
                                • {item.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};