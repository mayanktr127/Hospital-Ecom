"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/footer/Footer";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAdmin } from "@/context/AdminContext";
import { Product } from "@/types/product";
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Play,
  Download,
  Moon,
  Hand,
  X,
  Star,
  ShieldCheck,
  Truck,
  CreditCard,
  Facebook,
  Twitter,
  Linkedin,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  CheckCircle,
  FileText,
} from "lucide-react";
import siteContent from "@/data/site_content.json";
import structuredProducts from "@/data/product_pages/structured_products.json";

interface ProductDetailPageProps {
  categoryTitle: string;
  categorySlug: string;
  itemSlug: string;
  title: string;
  rawText?: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  categoryTitle,
  categorySlug,
  itemSlug,
  title,
}) => {
  const { addToCart, toggleCart } = useCart();
  const { addToast } = useToast();
  const { toggleFavorite, isFavorite } = useWishlist();

  const [quantity, setQuantity] = useState<number>(1);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  // Dynamic Lookup Keys
  const catKey = categorySlug.replace(/-/g, "_");
  const itemKey = itemSlug.replace(/-/g, "_");
  const fullKey = `${catKey}_${itemKey}`;

  // Structured dataset from scraped official content
  const sData = (structuredProducts as any)[fullKey] || (structuredProducts as any)[itemKey] || null;
  const scrapedData = (siteContent as any)[fullKey] || (siteContent as any)[catKey] || null;

  const imagesList = scrapedData?.images || [];

  const { products, reviews } = useAdmin();

  // Find exact matching product from catalog
  const foundProd = products.find(
    (p) => p.id === itemSlug || p.id.includes(itemSlug) || itemSlug.includes(p.id)
  );

  // Product cutout image for Description & Image section
  const heroCutoutImage =
    foundProd?.image ||
    sData?.image ||
    imagesList.find((img: any) => img.src.includes("right_65") || img.src.includes("fullface_right") || img.src.includes("smart") || img.src.includes("prisma"))?.src ||
    "/images/pulmocare/pulmocare_prisma-smart.png";

  // Title & Subtitle
  const displayTitle = foundProd?.name || sData?.title || title || itemSlug.toUpperCase();
  const brandName = "Löwenstein Medical";
  const skuNumber = sData?.sku || `LS-RCD-${itemSlug.toUpperCase().replace(/-/g, "")}-1000`;
  
  const rawPrice = foundProd?.price || 45990;
  const rawOrigPrice = foundProd?.originalPrice || Math.round(rawPrice * 1.35);

  const priceValue = `₹${rawPrice.toLocaleString("en-IN")}.00`;
  const originalPriceValue = `₹${rawOrigPrice.toLocaleString("en-IN")}.00`;
  const emiMonthlyValue = `₹${Math.round(rawPrice / 36).toLocaleString("en-IN")}/month`;
  const discountSavings = `₹${Math.round(rawPrice * 0.01).toLocaleString("en-IN")}`;

  // Intro Paragraph
  const introParagraphText =
    foundProd?.description ||
    sData?.introText ||
    `${displayTitle} continues the tradition of high-quality respiratory and ventilation devices, combining precision medical engineering with intuitive patient comfort.`;

  // Feature bullets
  const productFeaturesList =
    foundProd?.features && foundProd.features.length > 0
      ? foundProd.features
      : sData?.features || [
          "Unheard-of silence and quiet operation for uninterrupted nocturnal sleep",
          "Standard operating concept with clearly structured, target group-oriented menus",
          "Large LCD monitor – highly visible display of clinical therapy information",
          "prismaLINE range of accessories and modular system integration",
          "Familiar features such as recognition of Cheyne-Stokes respiration across the entire line",
        ];

  // Specifications
  const specificationsList =
    foundProd?.specifications && foundProd.specifications.length > 0
      ? foundProd.specifications.map((s: any) => ({ label: s.key, value: s.value }))
      : [
          { label: "Temperature range", value: "Operation: +5 °C to +40 °C | Storage: – 25 °C to +70 °C" },
          { label: "Air pressure range", value: "700 – 1060 hPa (corresponds to an altitude of 3000m above sea level)" },
          { label: "Electrical output", value: "max. 40 VA" },
          { label: "System interface", value: "24 V DC max. 5 VA" },
          { label: "Mean sound pressure level", value: "about 26 dB(A) at 10 hPa" },
          { label: "Recommended max O₂ flow", value: "15 liters/minute" },
        ];

  // Box Content (Matching Screenshot 4)
  const boxContentsList = [
    `${displayTitle} Main Device Unit`,
    "Flexible Hose Pipe / Patient Circuit",
    "Power Adapter & Mains Cable",
    "High-Efficiency Air Filter",
    "Protective Travel & Carry Bag",
    "User Operating Manuals & Quick Guide",
  ];

  // Documentation (Matching Screenshot 5)
  const documentBrochure = `${displayTitle} Brochure.pdf`;

  // Sample Customer Reviews (Matching Screenshot 5)
  const reviewsList = [
    {
      author: "Dr. Rajesh K.",
      rating: 5,
      date: "July 24, 2026",
      comment: "Exceptional build quality and quiet operation. Highly recommended for OSA patient therapy.",
    },
    {
      author: "Priya Sharma",
      rating: 5,
      date: "June 18, 2026",
      comment: "Very easy to set up and smooth pressure adjustments. Fast delivery by Pulmo Care.",
    },
  ];

  const matchedReviews = reviews.filter(
    (r) =>
      r.productId === itemSlug ||
      r.productName.toLowerCase().includes(displayTitle.toLowerCase()) ||
      displayTitle.toLowerCase().includes(r.productName.toLowerCase())
  );
  const reviewsToDisplay = matchedReviews.length > 0 ? matchedReviews : reviewsList;

  const currentProductObj: Product = {
    id: itemSlug,
    name: displayTitle,
    category: "Ventilation & Sleep",
    price: 45990,
    originalPrice: 65000,
    image: heroCutoutImage,
    rating: 5,
    reviewsCount: 2,
    inStock: true,
    description: introParagraphText,
    specifications: specificationsList,
  };

  const isInWishlist = isFavorite(itemSlug);

  const handleAddToCart = () => {
    addToCart(currentProductObj, quantity);
    addToast("Added to Cart", `${quantity}x ${displayTitle} added to your cart.`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    toggleCart();
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-paper text-ink font-inter selection:bg-[#003865] selection:text-white">
      <Navbar />

      <main className="w-full flex-1 wrap max-w-[1240px] mx-auto px-4 md:px-6 py-8">
        {/* BREADCRUMBS STRIP (Matching Screenshot 1) */}
        <div className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-[#007AC1] uppercase font-bold tracking-wider">
          <Link href="/" className="hover:underline text-[#003865]">Home</Link>
          <span>/</span>
          <Link href={`/${categorySlug}`} className="hover:underline">{categoryTitle}</Link>
          <span>/</span>
          <span className="text-[#4A607A] font-normal">BANGALORE {categoryTitle} / DELHI {categoryTitle} / HYDERABAD {categoryTitle} / MUMBAI {categoryTitle} / PUNE {categoryTitle}</span>
        </div>

        {/* TOP HERO SECTION: Image Box + Right Purchase Details Panel (Matching Screenshot 1 & 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16 items-start">
          {/* Left 6-Cols: Image Frame with Offer Banner */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="w-full bg-gradient-to-br from-[#F0F6FA] via-[#F8FAFC] to-white rounded-[32px] border border-[#003865]/10 p-8 md:p-12 flex items-center justify-center min-h-[380px] shadow-sm relative group overflow-hidden">
              <img
                src={heroCutoutImage}
                alt={displayTitle}
                className="max-h-[320px] max-w-full object-contain mix-blend-multiply drop-shadow-[0_16px_20px_rgba(0,56,101,0.2)] group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/pulmocare/pulmocare_prisma-smart.png";
                }}
              />
            </div>

            {/* Offer Banner Strip under Product Image (Matching Screenshot 1) */}
            <div className="w-full mt-4 bg-[#007AC1] text-white py-2.5 px-4 rounded-xl text-center font-archivo font-bold text-xs md:text-sm shadow-sm tracking-wide">
              Free Delivery, COD, Extra Discounts on UPI!
            </div>
          </div>

          {/* Right 6-Cols: Pricing, EMI, Offers, SKU & Quick Buy Panel */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h1 className="font-archivo font-extrabold text-3xl sm:text-4xl text-[#003865] mb-2 leading-tight">
                {displayTitle}
              </h1>

              <div className="flex items-center gap-4 text-xs font-inter mb-4">
                <span className="text-[#007AC1] font-semibold">Brand: {brandName}</span>
                <span className="text-[#4A607A]">|</span>
                <div className="flex items-center gap-1 text-amber-500">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#003865] ml-1">2 reviews</span>
                </div>
              </div>

              {/* Price & Discounts Block */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-archivo font-extrabold text-3xl sm:text-4xl text-[#D9534F]">
                  {priceValue}
                </span>
                <span className="text-base text-[#4A607A] line-through font-inter">
                  {originalPriceValue}
                </span>
              </div>

              {/* EMI & Offers Cards (Matching Screenshot 1) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 bg-[#F0F6FA] rounded-xl border border-[#007AC1]/20 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#003865] block">EMI from {emiMonthlyValue}</span>
                    <span className="text-[#4A607A] text-[10px]">Z &amp; more</span>
                  </div>
                  <span className="text-[#007AC1] font-bold text-[11px] hover:underline cursor-pointer">View plans</span>
                </div>

                <div className="p-3.5 bg-[#F0F6FA] rounded-xl border border-[#007AC1]/20 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#003865] block">Save up to {discountSavings}</span>
                    <span className="text-[#4A607A] text-[10px]">💳 &amp; more</span>
                  </div>
                  <span className="text-[#007AC1] font-bold text-[11px] hover:underline cursor-pointer">View offers</span>
                </div>
              </div>

              {/* Razorpay Trust Badge */}
              <div className="flex items-center gap-2 text-xs text-[#4A607A] mb-6 font-inter">
                <ShieldCheck className="w-4 h-4 text-[#007AC1]" />
                <span>Secured by <strong>Razorpay</strong> 256-bit SSL Encryption</span>
              </div>

              {/* Quantity Selector (Matching Screenshot 1) */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold text-[#003865] uppercase font-archivo">Quantity</span>
                <div className="flex items-center border border-[#003865]/20 rounded-full bg-[#F8FAFC] px-3 py-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 text-[#003865] hover:text-[#007AC1] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 font-archivo font-bold text-sm text-[#003865]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 text-[#003865] hover:text-[#007AC1] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons: Add to Cart, Buy Now, Wishlist */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-[#003865] text-white font-archivo font-bold text-xs uppercase tracking-wider hover:bg-[#002A4E] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-full bg-[#007AC1] text-white font-archivo font-bold text-xs uppercase tracking-wider hover:bg-[#00629B] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Buy Now</span>
                </button>

                <button
                  onClick={() => toggleFavorite(currentProductObj)}
                  className={`w-12 h-12 rounded-full border border-[#003865]/20 grid place-items-center transition-colors shrink-0 cursor-pointer ${
                    isInWishlist ? "bg-red-50 text-red-500 border-red-200" : "text-[#003865] hover:bg-[#F0F6FA]"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Metadata Block (Matching Screenshot 2) */}
              <div className="pt-6 border-t border-[#003865]/10 space-y-2 text-xs text-[#4A607A] font-inter">
                <p className="text-sm text-[#003865] font-medium leading-relaxed mb-4">
                  {introParagraphText}
                </p>

                <div className="flex items-center justify-between py-1">
                  <span className="font-bold text-[#003865]">Sku:</span>
                  <span className="font-mono text-[#003865]">{skuNumber}</span>
                </div>

                <div className="flex items-center justify-between py-1">
                  <span className="font-bold text-[#003865]">Brand:</span>
                  <span className="text-[#003865] font-medium">{brandName}</span>
                </div>

                {/* Social Sharing Icons (Matching Screenshot 2) */}
                <div className="flex items-center gap-3 pt-3">
                  <span className="text-[11px] font-bold text-[#003865] uppercase">Share:</span>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#F0F6FA] text-[#003865] hover:text-[#007AC1] transition-colors">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#F0F6FA] text-[#003865] hover:text-[#007AC1] transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-[#F0F6FA] text-[#003865] hover:text-[#007AC1] transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT DESCRIPTION & FEATURES SECTION (Matching Screenshot 3) */}
        <section className="bg-white rounded-[32px] border border-[#003865]/10 p-8 md:p-12 mb-16 shadow-sm">
          <h2 className="font-archivo font-extrabold text-3xl text-[#007AC1] mb-8 pb-4 border-b border-[#003865]/10">
            Description
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="font-archivo font-bold text-2xl text-[#007AC1] mb-6">
                {displayTitle} Features:
              </h3>

              <ul className="space-y-3 list-disc pl-6 text-sm sm:text-base text-[#4A607A] leading-relaxed font-inter">
                {productFeaturesList.map((feat: string, idx: number) => (
                  <li key={idx} className="marker:text-[#007AC1]">
                    {feat}
                  </li>
                ))}
              </ul>
            </div>

            {/* Video Banner (Matching Screenshot 3) */}
            <div className="pt-8 border-t border-[#003865]/10">
              <h3 className="font-archivo font-extrabold text-2xl sm:text-3xl text-[#007AC1] mb-6">
                Why Pulmo Care – Watch this quick video!
              </h3>

              <div
                onClick={() => setActiveVideoModal(`${displayTitle} Product Demonstration`)}
                className="relative w-full max-w-2xl h-64 sm:h-80 bg-gradient-to-br from-[#003865] to-[#002A4E] rounded-3xl overflow-hidden shadow-lg flex items-center justify-center group cursor-pointer"
              >
                <img
                  src={heroCutoutImage}
                  alt={`${displayTitle} Video Thumbnail`}
                  className="w-full h-full object-contain p-8 mix-blend-multiply opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#003865]/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#007AC1] group-hover:bg-white text-white group-hover:text-[#007AC1] flex items-center justify-center shadow-xl transition-all">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SPECIFICATIONS & BOX CONTENT SECTION (Matching Screenshot 4) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Specifications */}
          <div className="bg-white rounded-[32px] border border-[#003865]/10 p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-archivo font-extrabold text-2xl text-[#007AC1] mb-6 pb-3 border-b border-[#003865]/10">
                {displayTitle} Specifications:
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#4A607A] font-inter">
                {specificationsList.map((spec, idx) => (
                  <div key={idx} className="pb-3 border-b border-[#003865]/06 last:border-none">
                    <span className="font-bold text-[#003865] block mb-0.5">{spec.label}:</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Box Content */}
          <div className="bg-[#F0F6FA] rounded-[32px] border border-[#007AC1]/20 p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-archivo font-extrabold text-2xl text-[#007AC1] mb-6 pb-3 border-b border-[#003865]/10">
                {displayTitle} Box Content:
              </h3>

              <ul className="space-y-3 text-sm text-[#003865] font-inter">
                {boxContentsList.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-3 font-medium">
                    <CheckCircle className="w-4 h-4 text-[#007AC1] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* DOCUMENTATION & ADDITIONAL INFO SECTION (Matching Screenshot 5) */}
        <section className="bg-white rounded-[32px] border border-[#003865]/10 p-8 md:p-12 mb-16 shadow-sm">
          {/* Documentation */}
          <div className="mb-10">
            <h3 className="font-archivo font-extrabold text-2xl text-[#007AC1] mb-4">
              {displayTitle} Documentation:
            </h3>

            <a
              href="/doc-files/LM_QuickSupport_Win_v15.zip"
              download
              className="inline-flex items-center gap-3 p-4 rounded-2xl bg-[#F0F6FA] border border-[#003865]/10 text-xs sm:text-sm font-bold text-[#003865] hover:text-[#007AC1] transition-colors"
            >
              <FileText className="w-5 h-5 text-[#007AC1]" />
              <span>{documentBrochure}</span>
              <Download className="w-4 h-4 text-[#007AC1] ml-2" />
            </a>
          </div>

          {/* Additional Information */}
          <div className="pt-8 border-t border-[#003865]/10 mb-12">
            <h3 className="font-archivo font-extrabold text-2xl text-[#007AC1] mb-6">
              Additional information
            </h3>

            <div className="max-w-md bg-[#F8FAFC] rounded-2xl border border-[#003865]/10 p-4 flex items-center justify-between text-xs sm:text-sm">
              <span className="font-bold text-[#003865]">Warranty</span>
              <span className="text-[#4A607A] font-semibold">2 Years Official Löwenstein Warranty</span>
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="pt-8 border-t border-[#003865]/10">
            <h3 className="font-archivo font-extrabold text-2xl text-[#007AC1] mb-8">
              {reviewsToDisplay.length} {reviewsToDisplay.length === 1 ? "review" : "reviews"} for {displayTitle}
            </h3>

            <div className="space-y-6">
              {reviewsToDisplay.map((rev, idx) => (
                <div key={idx} className="p-6 bg-[#F8FAFC] rounded-2xl border border-[#003865]/08 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-archivo font-bold text-sm text-[#003865]">{rev.author}</span>
                    <span className="text-xs text-[#4A607A]">{rev.date}</span>
                  </div>

                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A607A] leading-relaxed font-inter">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* In-Page Video Player Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl relative border border-white/20">
            <div className="flex items-center justify-between p-6 border-b border-[#003865]/10 bg-[#EEF3F8]">
              <h3 className="font-archivo font-bold text-lg text-[#003865]">
                {activeVideoModal}
              </h3>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-2 rounded-full hover:bg-[#003865]/10 text-[#003865] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full aspect-video bg-black flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title={activeVideoModal}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
