"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { useAdmin } from "@/context/AdminContext";
import { ShoppingCart, Heart, ArrowRight, ShieldCheck, Star } from "lucide-react";
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
  const { products, categories, isLoading } = useAdmin();
  const { addToCart } = useCart();
  const { addToast } = useToast();

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

  const categoryProducts = products.filter((p) => {
    if (!currentCategory) {
      return (
        p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-") === categorySlug.toLowerCase() ||
        p.category.toLowerCase().includes(categorySlug.toLowerCase().replace(/-/g, " "))
      );
    }
    return (
      p.category === currentCategory.name ||
      p.category.toLowerCase().includes(currentCategory.name.toLowerCase()) ||
      currentCategory.name.toLowerCase().includes(p.category.toLowerCase())
    );
  });

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden animate-pulse">
                <div className="bg-[#F1F5F9] h-52" />
                <div className="p-4 space-y-3">
                  <div className="h-3 w-24 bg-[#E2E8F0] rounded" />
                  <div className="h-5 w-full bg-[#E2E8F0] rounded" />
                  <div className="h-5 w-28 bg-[#E2E8F0] rounded" />
                  <div className="h-10 w-full bg-[#E2E8F0] rounded-xl" />
                </div>
              </div>
            ))}
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
        <div className="mb-12 bg-white rounded-3xl p-8 md:p-12 border border-[#E2E8F0] shadow-sm relative overflow-hidden">
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
                    <div className="w-full h-48 mb-6 flex items-center justify-center p-3 relative bg-[#F8FAFC] rounded-2xl border border-[#F1F5F9]">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-md group-hover:scale-108 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/images/pulmocare/pulmocare_prisma-smart.png";
                        }}
                      />
                    </div>

                    <span className="text-[10px] uppercase font-archivo font-bold text-[#0066FF] tracking-wider block mb-1">
                      {prod.category}
                    </span>
                    <h3 className="font-archivo font-bold text-lg text-[#0A192F] group-hover:text-[#0066FF] transition-colors mb-2 line-clamp-1">
                      {prod.name}
                    </h3>
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

      <Footer />
    </div>
  );
};
