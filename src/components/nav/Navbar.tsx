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
  Check,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onOpenSearch?: () => void;
  onSelectCategory?: (category: ProductCategory) => void;
}

type ActiveDropdown = "company" | "professionals" | "products" | "news" | null;
type ProductFocusKey =
  | "cpap-apap-devices"
  | "bilevel-s-st-devices"
  | "asv-titration-devices"
  | "humidifiers"
  | "ventilation"
  | "oxygen-therapy"
  | "sleep-diagnostics"
  | "masks";

interface ProductSubCategory {
  title: string;
  items: { name: string; link: string }[];
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onSelectCategory }) => {
  const { toggleCart, totalItems } = useCart();
  const { toggleWishlist, wishlist } = useWishlist();
  const { addToast } = useToast();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<ActiveDropdown>(null);
  const [activeProductFocus, setActiveProductFocus] = useState<ProductFocusKey>("cpap-apap-devices");
  const [expandedSubGroup, setExpandedSubGroup] = useState<string | null>("APAP & CPAP Therapy Devices");

  const [globalWebsiteOpen, setGlobalWebsiteOpen] = useState(false);
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("Global (English)");

  const navContainerRef = useRef<HTMLDivElement>(null);
  const globalRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", label: "Global (English)", region: "International" },
    { code: "de", label: "Germany (Deutsch)", region: "Löwenstein HQ" },
    { code: "fr", label: "France (Français)", region: "Europe" },
    { code: "es", label: "Spain (Español)", region: "Europe" },
    { code: "zh", label: "China (中文)", region: "Asia Pacific" },
  ];

  // Full internal page routes tree for all 8 categories matching Shop by Category
  const productSubMenuMap: Record<ProductFocusKey, { title: string; overviewLink: string; subGroups: ProductSubCategory[] }> = {
    "cpap-apap-devices": {
      title: "CPAP & APAP Devices",
      overviewLink: "/cpap-apap-devices",
      subGroups: [
        {
          title: "APAP & CPAP Therapy Devices",
          items: [
            { name: "Prisma 20A", link: "/cpap-apap-devices/prisma-20a" },
            { name: "Prisma Smart", link: "/cpap-apap-devices/prisma-smart" },
            { name: "Prisma Smart Plus", link: "/cpap-apap-devices/prisma-smart-plus" },
          ],
        },
      ],
    },
    "bilevel-s-st-devices": {
      title: "Bilevel-S & ST Devices",
      overviewLink: "/bilevel-s-st-devices",
      subGroups: [
        {
          title: "BiLevel Therapy Systems",
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
          title: "Warm Air Humidification",
          items: [{ name: "Prisma AQUA", link: "/humidifiers/prisma-aqua" }],
        },
      ],
    },
    ventilation: {
      title: "Ventilation",
      overviewLink: "/ventilation",
      subGroups: [
        {
          title: "Life Support & Invasive/Non-Invasive",
          items: [
            { name: "LUISA Ventilator", link: "/ventilation/luisa-ventilator" },
            { name: "PrismaVENT 40", link: "/ventilation/prisma-vent-40" },
            { name: "PrismaVENT 50C", link: "/ventilation/prisma-vent-50c" },
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
          title: "Full Face & Nasal Masks",
          items: [
            { name: "CARA Full Face", link: "/masks/cara-full-face" },
            { name: "JOYCEone Full Face", link: "/masks/joyceone-full-face" },
            { name: "LENA Full Face", link: "/masks/lena" },
            { name: "CARA Nasal", link: "/masks/cara-nasal" },
          ],
        },
      ],
    },
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
      if (globalRef.current && !globalRef.current.contains(event.target as Node)) {
        setGlobalWebsiteOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setActiveDropdown(null);
    let targetCat: ProductCategory = "All";
    if (categoryName.includes("Ventilation") || categoryName.includes("Intensive")) targetCat = "Ventilation & Sleep";
    else if (categoryName.includes("Masks")) targetCat = "PPE & Protection";
    else if (categoryName.includes("Anesthesia")) targetCat = "Surgical";
    else if (categoryName.includes("diagnostics") || categoryName.includes("Sleep")) targetCat = "Diagnostic";

    if (onSelectCategory) onSelectCategory(targetCat);

    const shopSec = document.getElementById("shop");
    if (shopSec) shopSec.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-[#003865]/10 sticky top-0 z-50 transition-all duration-200" ref={navContainerRef}>
      {/* Top Utility Bar: Contact & Global Portal */}
      <div className="wrap max-w-[1240px] mx-auto px-4 md:px-6 pt-1.5 pb-1 flex items-center justify-between text-xs text-[#003865] font-inter font-medium border-b border-[#003865]/06">
        <div className="flex items-center gap-4 text-[#4A607A]">
          <span>📞 Hotline: <a href="tel:+919343444428" className="font-bold text-[#003865] hover:text-[#007AC1]">+91 9343444428</a></span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">✉️ <a href="mailto:enquiry@pulmocare.in" className="font-bold text-[#003865] hover:text-[#007AC1]">enquiry@pulmocare.in</a></span>
        </div>

        <div className="flex items-center gap-6">
          {/* Safety Information Link */}
          <button
            onClick={() => setSafetyModalOpen(true)}
            className="flex items-center gap-1.5 hover:text-[#007AC1] transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-[#007AC1]" />
            <span>Safety information</span>
          </button>

          {/* Global Portal & Language Switcher Dropdown */}
          <div className="relative" ref={globalRef}>
            <button
              onClick={() => setGlobalWebsiteOpen(!globalWebsiteOpen)}
              className="flex items-center gap-1.5 hover:text-[#007AC1] transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#007AC1]" />
              <span>{selectedLanguage}</span>
              <ChevronDown className="w-3 h-3 text-[#4A607A]" />
            </button>

            <AnimatePresence>
              {globalWebsiteOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#003865]/12 rounded-2xl shadow-xl py-2 z-50 text-xs font-inter"
                >
                  <div className="px-3.5 py-1.5 font-bold text-[#003865] border-b border-[#003865]/08">
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
                      className="w-full flex items-center justify-between px-3.5 py-2 hover:bg-[#F0F6FA] text-left text-[#003865] transition-colors cursor-pointer"
                    >
                      <div>
                        <span className="block font-medium">{lang.label}</span>
                        <span className="text-[10px] text-[#4A607A]">{lang.region}</span>
                      </div>
                      {selectedLanguage === lang.label && <Check className="w-3.5 h-3.5 text-[#007AC1]" />}
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
        {/* Brand Logo - Official Graphic Logo Image */}
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

        {/* Primary Desktop Navigation Links */}
        <ul className="hidden lg:flex items-center gap-8 font-inter font-medium text-sm text-[#003865] list-none p-0 m-0">
          {/* 1. Company */}
          <li className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === "company" ? null : "company")}
              onMouseEnter={() => setActiveDropdown("company")}
              className={`flex items-center gap-1.5 py-1 transition-colors ${
                activeDropdown === "company" ? "text-[#007AC1] font-semibold" : "hover:text-[#007AC1]"
              }`}
            >
              <span>Company</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "company" ? "rotate-180 text-[#007AC1]" : ""}`} />
            </button>
            {activeDropdown === "company" && <div className="absolute bottom-[-14px] left-0 right-0 h-[3px] bg-[#003865] rounded-full" />}
          </li>

          {/* 2. Professionals */}
          <li className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === "professionals" ? null : "professionals")}
              onMouseEnter={() => setActiveDropdown("professionals")}
              className={`flex items-center gap-1.5 py-1 transition-colors ${
                activeDropdown === "professionals" ? "text-[#007AC1] font-semibold" : "hover:text-[#007AC1]"
              }`}
            >
              <span>Professionals</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "professionals" ? "rotate-180 text-[#007AC1]" : ""}`} />
            </button>
            {activeDropdown === "professionals" && <div className="absolute bottom-[-14px] left-0 right-0 h-[3px] bg-[#003865] rounded-full" />}
          </li>

          {/* 3. Products */}
          <li className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === "products" ? null : "products")}
              onMouseEnter={() => setActiveDropdown("products")}
              className={`flex items-center gap-1.5 py-1 transition-colors ${
                activeDropdown === "products" ? "text-[#007AC1] font-semibold" : "hover:text-[#007AC1]"
              }`}
            >
              <span>Products</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "products" ? "rotate-180 text-[#007AC1]" : ""}`} />
            </button>
            {activeDropdown === "products" && <div className="absolute bottom-[-14px] left-0 right-0 h-[3px] bg-[#003865] rounded-full" />}
          </li>

          {/* 4. News */}
          <li className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === "news" ? null : "news")}
              onMouseEnter={() => setActiveDropdown("news")}
              className={`flex items-center gap-1.5 py-1 transition-colors ${
                activeDropdown === "news" ? "text-[#007AC1] font-semibold" : "hover:text-[#007AC1]"
              }`}
            >
              <span>News</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "news" ? "rotate-180 text-[#007AC1]" : ""}`} />
            </button>
            {activeDropdown === "news" && <div className="absolute bottom-[-14px] left-0 right-0 h-[3px] bg-[#003865] rounded-full" />}
          </li>

          {/* 5. Blog Page Link */}
          <li>
            <Link href="/blog" className="hover:text-[#007AC1] transition-colors py-1">
              Blog
            </Link>
          </li>
        </ul>

        {/* Right actions cluster */}
        <div className="flex items-center gap-2">
          {/* Search Pill */}
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-full border border-[#003865]/12 bg-white text-xs text-[#4A607A] hover:text-[#003865] hover:border-[#003865]/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all"
            >
              <Search className="w-3.5 h-3.5 text-[#003865]" />
              <span>Search</span>
              <kbd className="hidden xl:inline-block bg-[#F0F6FA] text-[10px] text-[#003865] px-1.5 py-0.5 rounded border border-[#003865]/10 font-mono font-bold">
                ⌘K
              </kbd>
            </button>
          )}

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="w-10 h-10 rounded-full border border-[#003865]/12 grid place-items-center text-[#003865] hover:bg-[#F0F6FA] hover:text-[#007AC1] transition-colors relative"
            aria-label="Wishlist"
          >
            <Heart className="w-4.5 h-4.5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#007AC1] text-white text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={toggleCart}
            className="w-10 h-10 rounded-full border border-[#003865]/12 grid place-items-center text-[#003865] hover:bg-[#F0F6FA] hover:text-[#007AC1] transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#003865] text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile hamburger menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-full border border-[#003865]/12 grid place-items-center text-[#003865]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* MEGA DROPDOWN PANELS */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
              onMouseLeave={() => setActiveDropdown(null)}
              className="absolute top-[calc(100%+12px)] left-0 right-0 bg-[#EEF3F8] rounded-[28px] p-8 border border-[#003865]/15 shadow-[0_28px_60px_-24px_rgba(0,56,101,0.3)] z-50 text-[#003865]"
            >
              {/* Close Button to close mega dropdown menu */}
              <button
                onClick={() => setActiveDropdown(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#003865]/10 text-[#003865] transition-colors cursor-pointer"
                title="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
              {/* 1. COMPANY DROPDOWN WITH DEDICATED LINKS */}
              {activeDropdown === "company" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-x divide-[#003865]/15">
                  <div className="pr-4">
                    <h3 className="font-archivo font-normal text-3xl text-[#4A607A] mb-4">Company</h3>
                    <p className="text-sm font-inter text-[#4A607A] leading-relaxed mb-4">
                      Pulmo Care develops and distributes high-performance medical technology. Ventilation is our field of expertise. Ventilation is not only about supporting breathing - it&apos;s about saving lives, maintaining health, and simplifying care.
                    </p>
                    <p className="text-sm font-inter font-medium text-[#4A607A]">With people in mind.</p>
                  </div>

                  <div className="pl-6 pr-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A607A] mb-4 font-inter">
                      WE ARE PULMO CARE.
                    </h4>
                    <ul className="space-y-3 list-none p-0 m-0 text-sm font-inter text-[#003865]">
                      <li>
                        <Link href="/company/about-us" onClick={() => setActiveDropdown(null)} className="hover:text-[#007AC1] transition-colors block py-0.5 font-medium">
                          About us
                        </Link>
                      </li>
                      <li>
                        <Link href="/company/our-values" onClick={() => setActiveDropdown(null)} className="hover:text-[#007AC1] transition-colors block py-0.5 font-medium">
                          Our values
                        </Link>
                      </li>
                      <li>
                        <Link href="/company/manufacturer-service-provider" onClick={() => setActiveDropdown(null)} className="hover:text-[#007AC1] transition-colors block py-0.5 font-medium">
                          Manufacturer &amp; service provider
                        </Link>
                      </li>
                      <li>
                        <Link href="/company/quality-management" onClick={() => setActiveDropdown(null)} className="hover:text-[#007AC1] transition-colors block py-0.5 font-medium">
                          Quality management
                        </Link>
                      </li>
                      <li>
                        <Link href="/company/sustainability" onClick={() => setActiveDropdown(null)} className="hover:text-[#007AC1] transition-colors block py-0.5 font-medium">
                          Sustainability
                        </Link>
                      </li>
                      <li>
                        <Link href="/company/compliance" onClick={() => setActiveDropdown(null)} className="hover:text-[#007AC1] transition-colors block py-0.5 font-medium">
                          Compliance
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="pl-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A607A] mb-4 font-inter">
                      TOGETHER INTO THE FUTURE
                    </h4>
                    <ul className="space-y-3 list-none p-0 m-0 text-sm font-inter text-[#003865]">
                      <li>
                        <Link href="/company/job-openings" onClick={() => setActiveDropdown(null)} className="hover:text-[#007AC1] transition-colors block py-0.5 font-medium">
                          Job openings Pulmo Care
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* 2. PROFESSIONALS DROPDOWN WITH DEDICATED LINKS */}
              {activeDropdown === "professionals" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-x divide-[#003865]/15">
                  <div className="pr-6">
                    <h3 className="font-archivo font-normal text-3xl text-[#4A607A] mb-4">Professionals</h3>
                    <p className="text-sm font-inter text-[#4A607A] leading-relaxed mb-4">
                      Our mission is to enhance our patients&apos; quality of life. To achieve this, we foster strong partnerships and carefully choose our specialist dealers and suppliers.
                    </p>
                    <p className="text-sm font-inter font-medium text-[#4A607A]">
                      Together, we prioritize and ensure our patients&apos; safety.
                    </p>
                  </div>

                  <div className="pl-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A607A] mb-4 font-inter">
                      SERVICE
                    </h4>
                    <ul className="space-y-3 list-none p-0 m-0 text-sm font-inter text-[#003865]">
                      <li>
                        <Link href="/professionals/purchasing-and-specialist-dealer" onClick={() => setActiveDropdown(null)} className="hover:text-[#007AC1] transition-colors block py-0.5 font-medium">
                          Purchasing and specialist dealer
                        </Link>
                      </li>
                      <li>
                        <Link href="/professionals/supplier-form" onClick={() => setActiveDropdown(null)} className="hover:text-[#007AC1] transition-colors block py-0.5 font-medium">
                          Supplier form
                        </Link>
                      </li>
                      <li>
                        <Link href="/professionals/academy" onClick={() => setActiveDropdown(null)} className="hover:text-[#007AC1] transition-colors block py-0.5 font-medium">
                          Academy
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* 3. PRODUCTS MEGA-DROPDOWN WITH 8 CATEGORIES MATCHING SHOP BY CATEGORY */}
              {activeDropdown === "products" && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 divide-x divide-[#003865]/15">
                  {/* Column 1: Overview & Description */}
                  <div className="md:col-span-4 pr-4">
                    <h3 className="font-archivo font-normal text-3xl text-[#4A607A] mb-2">Products</h3>
                    <h4 className="text-xs font-semibold text-[#003865] mb-3 font-inter uppercase tracking-wider">
                      DIAGNOSTICS. HOSPITAL. HOMECARE.
                    </h4>
                    <p className="text-xs md:text-sm font-inter text-[#4A607A] leading-relaxed mb-4">
                      From diagnosis and hospital care to support in the patient&apos;s home, we stand by our patients every step of the way. Select from our 8 core specialty categories below.
                    </p>
                    <Link
                      href="/cpap-apap-devices"
                      onClick={() => setActiveDropdown(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#007AC1] hover:underline font-inter"
                    >
                      <span>Explore All Product Range</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Column 2: 8 CATEGORIES MATCHING SHOP BY CATEGORY */}
                  <div className="md:col-span-4 pl-6 pr-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A607A] mb-4 font-inter">
                      SHOP BY CATEGORY
                    </h4>
                    <div className="space-y-1 text-sm font-inter text-[#003865]">
                      {(
                        [
                          { key: "cpap-apap-devices", label: "CPAP & APAP Devices" },
                          { key: "bilevel-s-st-devices", label: "Bilevel-S & ST Devices" },
                          { key: "asv-titration-devices", label: "ASV & Titration Devices" },
                          { key: "humidifiers", label: "Humidifiers" },
                          { key: "ventilation", label: "Ventilation" },
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
                            onMouseEnter={() => {
                              setActiveProductFocus(focus.key);
                              setExpandedSubGroup(productSubMenuMap[focus.key].subGroups[0]?.title || null);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-left font-medium transition-all cursor-pointer ${
                              isSelected ? "bg-[#003865] text-white font-semibold shadow-sm" : "hover:bg-[#003865]/08 hover:text-[#007AC1]"
                            }`}
                          >
                            <span>{focus.label}</span>
                            <ChevronRight className={`w-4 h-4 ${isSelected ? "text-white" : "text-[#003865]/40"}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Column 3: Detailed Product Sub-Groups & Direct Links */}
                  <div className="md:col-span-4 pl-6 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-[#003865]/12">
                      <Link
                        href={productSubMenuMap[activeProductFocus].overviewLink}
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs font-bold text-[#007AC1] hover:underline flex items-center gap-1 font-inter"
                      >
                        <span>Category Overview</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                      <span className="text-[10px] uppercase font-bold text-[#4A607A] font-inter truncate max-w-[140px]">
                        {productSubMenuMap[activeProductFocus].title}
                      </span>
                    </div>

                    <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                      {productSubMenuMap[activeProductFocus].subGroups.map((subGroup) => {
                        const isExpanded = expandedSubGroup === subGroup.title;
                        return (
                          <div key={subGroup.title} className="border border-[#003865]/10 rounded-2xl bg-white/70 overflow-hidden">
                            <button
                              onClick={() => setExpandedSubGroup(isExpanded ? null : subGroup.title)}
                              className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-bold text-[#003865] hover:bg-[#F0F6FA] transition-colors"
                            >
                              <span>{subGroup.title}</span>
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-[#007AC1]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#4A607A]" />}
                            </button>

                            {isExpanded && (
                              <div className="px-4 pb-3 pt-1 border-t border-[#003865]/08 bg-white/90 space-y-1 text-xs">
                                {subGroup.items.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.link}
                                    onClick={() => setActiveDropdown(null)}
                                    className="block py-1 px-2 rounded-lg hover:bg-[#F0F6FA] text-[#4A607A] hover:text-[#003865] transition-colors font-medium"
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. NEWS DROPDOWN */}
              {activeDropdown === "news" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-x divide-[#003865]/15">
                  <div className="pr-6">
                    <h3 className="font-archivo font-normal text-3xl text-[#4A607A] mb-4">News</h3>
                    <p className="text-sm font-inter text-[#4A607A] leading-relaxed mb-4">
                      Stay informed with the latest innovations, product releases, and clinical developments from Pulmo Care.
                    </p>
                  </div>

                  <div className="pl-8">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A607A] mb-4 font-inter">
                      INSIGHTS &amp; PRESS
                    </h4>
                    <ul className="space-y-3 list-none p-0 m-0 text-sm font-inter text-[#003865]">
                      <li>
                        <Link href="/blog" onClick={() => setActiveDropdown(null)} className="hover:text-[#007AC1] transition-colors block py-0.5 font-medium">
                          Clinical Blog &amp; Articles
                        </Link>
                      </li>
                    </ul>
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
