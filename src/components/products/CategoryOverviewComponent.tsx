"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { useAdmin } from "@/context/AdminContext";
import { useInquiry } from "@/context/InquiryContext";
import { getDefaultProducts } from "@/utils/defaultProducts";
import { isMaskEligible, isMaskAddonProduct } from "@/utils/maskAddon";
import { isHumidifierAddonProduct } from "@/utils/humidifierAddon";
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
import { isRentalProduct, RENTAL_SHORT_MESSAGE, RENTAL_PHONE } from "@/utils/rental";

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
  const { openInquiryModal } = useInquiry();

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
      if (isMaskAddonProduct(p) || isHumidifierAddonProduct(p)) return false;

      // Filter out test/dummy products (e.g. wrwe, test entries)
      const pName = (p.name || "").toLowerCase().trim();
      const pId = (p.id || "").toLowerCase().trim();
      if (pName === "wrwe" || pName.includes("test") || pId === "wrwe" || pId.includes("test")) {
        return false;
      }

      const pCatNorm = p.category.toLowerCase().replace(/[^a-z0-9]/g, "");
      const slugNorm = categorySlug.toLowerCase().replace(/[^a-z0-9]/g, "");

      // For Ventilation category, only include genuine ventilators (Luisa, Prisma VENT)
      if (slugNorm === "ventilation") {
        const isOfficialVent =
          pId.includes("luisa") ||
          pId.includes("prisma-vent") ||
          pName.includes("luisa") ||
          pName.includes("prisma vent") ||
          pName.includes("ventilator");
        return isOfficialVent && pCatNorm.includes("ventilation");
      }

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
                      {prod.price && prod.price > 0 ? (
                        <div>
                          {prod.originalPrice && !isMaskEligible(prod) && (
                            <span className="text-xs text-[#94A3B8] line-through block">
                              ₹{prod.originalPrice.toLocaleString("en-IN")}.00
                            </span>
                          )}
                          <span className="font-archivo font-extrabold text-lg text-[#0A192F]">
                            ₹{(isMaskEligible(prod) ? prod.price + 3000 : prod.price).toLocaleString("en-IN")}.00
                          </span>
                          {isMaskEligible(prod) && (
                            <span className="text-[10px] text-[#0066FF] font-semibold block">
                              Incl. JOYCEone Nasal (+₹3k)
                            </span>
                          )}
                        </div>
                      ) : (
                        <div>
                          <button
                            type="button"
                            onClick={() => openInquiryModal(prod)}
                            className="text-xs font-archivo font-bold text-[#0066FF] bg-[#EBF5FF] hover:bg-[#dcebfb] border border-[#0066FF]/20 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                          >
                            Price on Request
                          </button>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{prod.rating || 5}.0</span>
                      </div>
                    </div>

                    {/* Rental availability — shown alongside the price */}
                    {isRentalProduct(prod) && (
                      <a
                        href={`tel:${RENTAL_PHONE}`}
                        className="flex items-center gap-1.5 text-[11px] font-archivo font-bold text-[#0066FF] bg-[#EBF5FF] border border-[#0066FF]/20 rounded-full px-2.5 py-1.5 hover:bg-[#dcebfb] transition-colors"
                      >
                        <Phone className="w-3 h-3 shrink-0" />
                        <span>{RENTAL_SHORT_MESSAGE}</span>
                      </a>
                    )}

                    <div className="flex items-center gap-2">
                      {prod.price && prod.price > 0 ? (
                        <button
                          onClick={() => {
                            addToCart(prod, 1, "none");
                            addToast(
                              "Added to Cart",
                              `${prod.name} has been added to your cart.`
                            );
                          }}
                          className="flex-1 py-2.5 rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white font-archivo font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => openInquiryModal(prod)}
                          className="flex-1 py-2.5 rounded-full border border-[#0066FF] text-[#0066FF] hover:bg-[#EBF5FF] font-archivo font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Enquire Now</span>
                        </button>
                      )}
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

      <Footer />
    </div>
  );
};
