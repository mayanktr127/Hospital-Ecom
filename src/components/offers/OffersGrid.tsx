"use client";

import React from "react";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Tag, Copy, Check, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export const OffersGrid: React.FC = () => {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyPromo = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    addToast("Promo Code Copied!", `Code "${code}" copied to clipboard.`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const offer1Product = PRODUCTS.find((p) => p.id === "prod-5") || PRODUCTS[0];
  const offer2Product = PRODUCTS.find((p) => p.id === "prod-6") || PRODUCTS[1];

  return (
    <section id="offers" className="mt-20">
      <div className="flex flex-col mb-7">
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748b] mb-1">
          Special Procurement Terms
        </span>
        <h2 className="font-archivo font-semibold text-[clamp(34px,5vw,64px)] text-[#0a1f3c] leading-none">
          Exclusive Offers
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Offer Card 1: Löwenstein Ice Blue gradient */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          className="rounded-[28px] p-7 md:p-8 bg-gradient-to-r from-[#f6f4fb] to-[#dcebfb] grid grid-cols-1 sm:grid-cols-[1fr_0.8fr] gap-4 items-center shadow-[0_2px_4px_rgba(24,42,65,0.04),0_12px_28px_-12px_rgba(24,42,65,0.18)] hover:shadow-[0_4px_8px_rgba(24,42,65,0.05),0_28px_60px_-24px_rgba(24,42,65,0.35)] transition-shadow border border-[#0a1f3c]/10"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0a1f3c] text-white text-[11px] font-bold font-archivo uppercase tracking-wider mb-3">
              <Tag className="w-3 h-3" />
              <span>Save 20% Off</span>
            </div>
            <h3 className="font-archivo font-semibold text-2xl md:text-3xl text-[#0a1f3c] leading-tight">
              Diagnostic Hardware Bundle
            </h3>
            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed my-3 font-inter">
              Get 20% off research microscopes and precision diagnostic gear when ordering institutional bundles.
            </p>

            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => copyPromo("LOEWENSTEIN20")}
                className="px-4 py-2 rounded-full bg-white text-[#0a1f3c] text-xs font-archivo font-bold flex items-center gap-1.5 border border-[#0a1f3c]/15 hover:bg-[#f6f4fb] transition-colors shadow-sm"
              >
                {copiedCode === "LOEWENSTEIN20" ? <Check className="w-3.5 h-3.5 text-[#1fb37a]" /> : <Copy className="w-3.5 h-3.5 text-[#0a1f3c]" />}
                <span>LOEWENSTEIN20</span>
              </button>

              <button
                onClick={() => {
                  addToCart(offer1Product);
                  addToast("Added Offer to Cart", `${offer1Product.name} added to cart.`);
                }}
                className="px-4 py-2 rounded-full bg-[#0a1f3c] text-white text-xs font-inter font-semibold flex items-center gap-1.5 hover:bg-[#12315c] shadow-md transition-colors"
              >
                <span>Claim</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center p-2">
            <Image
              src="/images/products/microscope_offer.png"
              alt="Löwenstein Offer"
              width={200}
              height={200}
              className="object-contain max-h-[180px] product-drop-shadow hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>

        {/* Offer Card 2: Löwenstein Slate Cyan gradient */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          className="rounded-[28px] p-7 md:p-8 bg-gradient-to-r from-[#dcebfb] to-[#e9e6fb] grid grid-cols-1 sm:grid-cols-[1fr_0.8fr] gap-4 items-center shadow-[0_2px_4px_rgba(24,42,65,0.04),0_12px_28px_-12px_rgba(24,42,65,0.18)] hover:shadow-[0_4px_8px_rgba(24,42,65,0.05),0_28px_60px_-24px_rgba(24,42,65,0.35)] transition-shadow border border-[#0a1f3c]/10"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2a6ecb] text-white text-[11px] font-bold font-archivo uppercase tracking-wider mb-3">
              <Tag className="w-3 h-3" />
              <span>Bulk Respiratory Offer</span>
            </div>
            <h3 className="font-archivo font-semibold text-2xl md:text-3xl text-[#0a1f3c] leading-tight">
              Hospital Mask 50-Packs
            </h3>
            <p className="text-xs md:text-sm text-[#64748b] leading-relaxed my-3 font-inter">
              Stock up on NIOSH & CE-approved N95 protective masks with tier-1 volume pricing for healthcare systems.
            </p>

            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => copyPromo("GERMANTECH15")}
                className="px-4 py-2 rounded-full bg-white text-[#0a1f3c] text-xs font-archivo font-bold flex items-center gap-1.5 border border-[#0a1f3c]/15 hover:bg-[#f6f4fb] transition-colors shadow-sm"
              >
                {copiedCode === "GERMANTECH15" ? <Check className="w-3.5 h-3.5 text-[#1fb37a]" /> : <Copy className="w-3.5 h-3.5 text-[#0a1f3c]" />}
                <span>GERMANTECH15</span>
              </button>

              <button
                onClick={() => {
                  addToCart(offer2Product);
                  addToast("Added Offer to Cart", `${offer2Product.name} added to cart.`);
                }}
                className="px-4 py-2 rounded-full bg-[#0a1f3c] text-white text-xs font-inter font-semibold flex items-center gap-1.5 hover:bg-[#12315c] shadow-md transition-colors"
              >
                <span>Claim</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center p-2">
            <Image
              src="/images/products/mask_offer.png"
              alt="Respiratory Offer"
              width={200}
              height={200}
              className="object-contain max-h-[180px] product-drop-shadow hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};