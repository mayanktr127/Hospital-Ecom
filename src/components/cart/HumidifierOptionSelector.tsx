"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import {
  HUMIDIFIER_ADDON_PRICE,
  HUMIDIFIER_STANDALONE_PRICE,
  isSmartPlusDevice,
  getHumidifierProduct,
} from "@/utils/humidifierAddon";
import { Check, Sparkles, Droplets } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

interface HumidifierOptionSelectorProps {
  product: Product;
  selected: boolean;
  onChange: (selected: boolean) => void;
  variant?: "full" | "compact";
}

export const HumidifierOptionSelector: React.FC<HumidifierOptionSelectorProps> = ({
  product,
  selected,
  onChange,
  variant = "full",
}) => {
  const { pricingSettings } = useAdmin();
  const bundlePrice = pricingSettings?.humidifierBundlePrice ?? HUMIDIFIER_ADDON_PRICE;
  const standalonePrice = pricingSettings?.humidifierStandalonePrice ?? HUMIDIFIER_STANDALONE_PRICE;
  const savings = Math.max(0, standalonePrice - bundlePrice);

  const isWhite = isSmartPlusDevice(product);
  const colorName = isWhite ? "White" : "Black";
  const humidProduct = getHumidifierProduct(pricingSettings, product);

  if (variant === "compact") {
    return (
      <div className="mt-2.5 pt-2 border-t border-[#f1f5f9]">
        <button
          type="button"
          onClick={() => onChange(!selected)}
          className={`w-full px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center justify-between border cursor-pointer ${
            selected
              ? "bg-[#2a6ecb] text-white border-[#2a6ecb] shadow-xs"
              : "bg-[#f8fafc] text-[#334155] border-[#e2e8f0] hover:bg-[#edf4fc] hover:border-[#2a6ecb]/40"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Droplets className="w-3.5 h-3.5" />
            <span>Prisma AQUA Humidifier ({colorName}) (+₹{bundlePrice.toLocaleString("en-IN")})</span>
          </div>
          <div className="flex items-center gap-1">
            {selected && <Check className="w-3 h-3 stroke-[2.5]" />}
            <span className="text-[10px] opacity-90">{selected ? "Added" : `Add (+₹${bundlePrice.toLocaleString("en-IN")})`}</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[20px] p-5 my-4 space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-[#e2e8f0]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#2a6ecb] bg-[#2a6ecb]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Droplets className="w-3 h-3" />
            Humidifier Add-on ({colorName} Edition)
          </span>
          <span className="text-xs text-[#64748b] font-medium hidden sm:inline">
            Bundle Offer (Save ₹{savings.toLocaleString("en-IN")})
          </span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#138054] bg-[#1fb37a]/15 px-2 py-0.5 rounded-full">
          Off by default
        </span>
      </div>

      <div
        onClick={() => onChange(!selected)}
        className={`cursor-pointer rounded-2xl p-3.5 border transition-all flex items-center justify-between gap-3 ${
          selected
            ? "bg-white border-[#2a6ecb] ring-2 ring-[#2a6ecb]/20 shadow-xs"
            : "bg-white/60 border-[#e2e8f0] hover:bg-white hover:border-[#cbd5e1]"
        }`}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Custom Checkbox */}
          <div
            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
              selected
                ? "bg-[#2a6ecb] border-[#2a6ecb] text-white"
                : "border-[#cbd5e1] bg-white"
            }`}
          >
            {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>

          {/* Product Thumbnail */}
          <div className="w-12 h-12 rounded-xl bg-white p-1 border border-[#e2e8f0] flex items-center justify-center shrink-0 shadow-2xs">
            <img
              src={humidProduct.image}
              alt={`Löwenstein Prisma AQUA Humidifier (${colorName})`}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-archivo font-bold text-xs sm:text-sm text-[#0a1f3c] truncate">
                Löwenstein Prisma AQUA Humidifier ({colorName})
              </span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                isWhite ? "bg-slate-100 text-slate-700 border border-slate-200" : "bg-zinc-800 text-white"
              }`}>
                {isWhite ? "White Finish" : "Black Finish"}
              </span>
              <span className="text-[9px] font-bold bg-[#1fb37a]/15 text-[#138054] px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                Save ₹{savings.toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-[11px] text-[#64748b] mt-0.5 line-clamp-1 sm:line-clamp-2">
              {isWhite
                ? "Matching White heated humidifier for Prisma Smart Plus. Prevents morning dryness and airway irritation."
                : "Matching Black heated humidifier for prismaLINE CPAP & BiLevel devices. Prevents morning dryness and airway irritation."}
            </p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <span className="font-archivo font-bold text-xs sm:text-sm text-[#2a6ecb] block whitespace-nowrap">
            +₹{bundlePrice.toLocaleString("en-IN")}
          </span>
          <span className="text-[10px] text-[#64748b] line-through font-mono whitespace-nowrap">
            ₹{standalonePrice.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div className="pt-1 flex items-center justify-between text-xs text-[#64748b]">
        <span>
          Standalone Price: <s className="line-through">₹{standalonePrice.toLocaleString("en-IN")}</s>
        </span>
        <span className="font-semibold text-[#2a6ecb]">
          Bundle Price with {product.name || "Device"}: ₹{bundlePrice.toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  );
};
