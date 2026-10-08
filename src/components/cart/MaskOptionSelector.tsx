"use client";

import React from "react";
import {
  MaskOptionType,
  MASK_OPTIONS,
  getMaskAddonInfo,
  getMaskAddonPrice,
  getMaskOptionDetails,
} from "@/utils/maskAddon";
import { Product } from "@/types/product";
import { Check, ShieldCheck, Sparkles, XCircle, SlidersHorizontal } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

interface MaskOptionSelectorProps {
  product: Product;
  selectedOption: MaskOptionType;
  onChange: (option: MaskOptionType) => void;
  variant?: "full" | "compact";
}

export const MaskOptionSelector: React.FC<MaskOptionSelectorProps> = ({
  product,
  selectedOption,
  onChange,
  variant = "full",
}) => {
  const { pricingSettings } = useAdmin();
  const nasalPrice = pricingSettings?.nasalMaskAddonPrice ?? 3000;
  const fullFacePrice = pricingSettings?.fullFaceMaskAddonPrice ?? 4500;
  const maskInfo = getMaskAddonInfo(product);

  if (!maskInfo.isEligible) {
    return null;
  }

  const basePrice =
    typeof product.price === "number" && product.price > 0
      ? product.price
      : maskInfo.basePrice;
  const currentMaskDetail = getMaskOptionDetails(selectedOption, pricingSettings);

  if (variant === "compact") {
    return (
      <div className="mt-3 pt-2.5 border-t border-[#f1f5f9]">
        <div className="flex items-center justify-between mb-2 px-0.5">
          <span className="text-[10px] font-bold tracking-wider uppercase text-[#64748b]">
            Mask Interface:
          </span>
          <span className="text-[10px] font-semibold">
            {selectedOption === "nasal" && (
              <span className="text-[#2a6ecb] font-bold">JOYCEone Nasal (+₹{nasalPrice.toLocaleString("en-IN")})</span>
            )}
            {selectedOption === "full-face" && (
              <span className="text-[#2a6ecb] font-bold">JOYCEone Full Face (+₹{fullFacePrice.toLocaleString("en-IN")})</span>
            )}
            {selectedOption === "none" && (
              <span className="text-[#64748b]">Device Only (No Mask)</span>
            )}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {/* Option 1: Nasal Mask */}
          <button
            type="button"
            onClick={() => onChange("nasal")}
            className={`px-2 py-1.5 rounded-lg text-[11px] font-bold transition-all text-center flex items-center justify-center gap-1 border cursor-pointer ${
              selectedOption === "nasal"
                ? "bg-[#2a6ecb] text-white border-[#2a6ecb] shadow-xs"
                : "bg-[#f8fafc] text-[#334155] border-[#e2e8f0] hover:bg-[#edf4fc] hover:border-[#2a6ecb]/40"
            }`}
          >
            {selectedOption === "nasal" && <Check className="w-3 h-3 stroke-[2.5]" />}
            <span>JOYCE Nasal (+₹{nasalPrice.toLocaleString("en-IN")})</span>
          </button>

          {/* Option 2: Full Face Mask */}
          <button
            type="button"
            onClick={() => onChange("full-face")}
            className={`px-2 py-1.5 rounded-lg text-[11px] font-bold transition-all text-center flex items-center justify-center gap-1 border cursor-pointer ${
              selectedOption === "full-face"
                ? "bg-[#2a6ecb] text-white border-[#2a6ecb] shadow-xs"
                : "bg-[#f8fafc] text-[#334155] border-[#e2e8f0] hover:bg-[#edf4fc] hover:border-[#2a6ecb]/40"
            }`}
          >
            {selectedOption === "full-face" && <Check className="w-3 h-3 stroke-[2.5]" />}
            <span>JOYCE Full Face (+₹{fullFacePrice.toLocaleString("en-IN")})</span>
          </button>

          {/* Option 3: No Mask / Toggle Off */}
          <button
            type="button"
            onClick={() => onChange("none")}
            className={`px-2 py-1.5 rounded-lg text-[11px] font-bold transition-all text-center flex items-center justify-center gap-1 border cursor-pointer ${
              selectedOption === "none"
                ? "bg-[#0a1f3c] text-white border-[#0a1f3c] shadow-xs"
                : "bg-[#f8fafc] text-[#64748b] border-[#e2e8f0] hover:bg-[#f1f5f9]"
            }`}
          >
            {selectedOption === "none" && <Check className="w-3 h-3 stroke-[2.5]" />}
            <span>No Mask</span>
          </button>
        </div>
      </div>
    );
  }

  // Full Variant for Product Detail Page & Quick View Modal
  const addonAmount = getMaskAddonPrice(selectedOption, pricingSettings);
  const totalWithMask = basePrice + addonAmount;

  return (
    <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[20px] p-5 my-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 border-b border-[#e2e8f0]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2a6ecb] bg-[#2a6ecb]/10 px-2 py-0.5 rounded-full">
              Mask Customization
            </span>
            <span className="text-xs text-[#64748b] font-medium hidden sm:inline">
              {selectedOption === "none"
                ? "Device Only (No mask added)"
                : selectedOption === "nasal"
                ? `JOYCEone Nasal Mask selected (+₹${nasalPrice.toLocaleString("en-IN")})`
                : `JOYCEone Full Face Mask selected (+₹${fullFacePrice.toLocaleString("en-IN")})`}
            </span>
          </div>
          <h4 className="font-archivo font-bold text-base text-[#0a1f3c] mt-1">
            Choose Patient Mask Interface
          </h4>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-[#64748b] uppercase font-bold block">
            Configured Price
          </span>
          <span className="font-archivo font-bold text-xl text-[#0a1f3c]">
            ₹{totalWithMask.toLocaleString("en-IN")}.00
          </span>
        </div>
      </div>

      {/* 3 Selectable Radio Cards */}
      <div className="grid grid-cols-1 gap-2.5">
        {/* Option 1: Nasal Mask */}
        <div
          onClick={() => onChange("nasal")}
          className={`cursor-pointer rounded-2xl p-3 sm:p-3.5 border transition-all flex items-center justify-between gap-3 ${
            selectedOption === "nasal"
              ? "bg-white border-[#2a6ecb] ring-2 ring-[#2a6ecb]/20 shadow-xs"
              : "bg-white/60 border-[#e2e8f0] hover:bg-white hover:border-[#cbd5e1]"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                selectedOption === "nasal"
                  ? "bg-[#2a6ecb] border-[#2a6ecb] text-white"
                  : "border-[#cbd5e1] bg-white"
              }`}
            >
              {selectedOption === "nasal" && <Check className="w-3 h-3 stroke-[3]" />}
            </div>

            {/* Mask Photo */}
            <div className="w-12 h-12 rounded-xl bg-white p-1 border border-[#e2e8f0] flex items-center justify-center shrink-0 shadow-2xs">
              <img
                src="/images/site/masks_csm_joyceone_mask_patient_interface_nasal_right_c8ef6f8727.png"
                alt="Löwenstein JOYCEone Nasal Mask"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-archivo font-bold text-xs sm:text-sm text-[#0a1f3c] truncate">
                  Löwenstein JOYCEone Nasal Mask
                </span>
                <span className="text-[9px] font-bold bg-[#1fb37a]/15 text-[#138054] px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                  Recommended Default
                </span>
              </div>
              <p className="text-[11px] text-[#64748b] mt-0.5 line-clamp-1 sm:line-clamp-2">
                Intelligent auto-adjusting fit cushion. Effortless comfortable nocturnal fit.
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="font-archivo font-bold text-xs sm:text-sm text-[#2a6ecb] block whitespace-nowrap">
              +₹{nasalPrice.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] text-[#64748b] font-mono whitespace-nowrap">
              ₹{(basePrice + nasalPrice).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Option 2: Full Face Mask */}
        <div
          onClick={() => onChange("full-face")}
          className={`cursor-pointer rounded-2xl p-3 sm:p-3.5 border transition-all flex items-center justify-between gap-3 ${
            selectedOption === "full-face"
              ? "bg-white border-[#2a6ecb] ring-2 ring-[#2a6ecb]/20 shadow-xs"
              : "bg-white/60 border-[#e2e8f0] hover:bg-white hover:border-[#cbd5e1]"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                selectedOption === "full-face"
                  ? "bg-[#2a6ecb] border-[#2a6ecb] text-white"
                  : "border-[#cbd5e1] bg-white"
              }`}
            >
              {selectedOption === "full-face" && <Check className="w-3 h-3 stroke-[3]" />}
            </div>

            {/* Mask Photo */}
            <div className="w-12 h-12 rounded-xl bg-white p-1 border border-[#e2e8f0] flex items-center justify-center shrink-0 shadow-2xs">
              <img
                src="/images/site/masks_csm_joyceone_mask_patient_interface_fullface_vented_right_4560a66624.png"
                alt="Löwenstein JOYCEone Full Face Mask"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-archivo font-bold text-xs sm:text-sm text-[#0a1f3c] truncate">
                  Löwenstein JOYCEone Full Face Mask
                </span>
                <span className="text-[9px] font-bold bg-[#2a6ecb]/15 text-[#2a6ecb] px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                  BiLevel / Mouth Breather
                </span>
              </div>
              <p className="text-[11px] text-[#64748b] mt-0.5 line-clamp-1 sm:line-clamp-2">
                Universal auto-fitting oronasal seal with forehead support for high pressures and mouth breathers.
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="font-archivo font-bold text-xs sm:text-sm text-[#2a6ecb] block whitespace-nowrap">
              +₹{fullFacePrice.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] text-[#64748b] font-mono whitespace-nowrap">
              ₹{(basePrice + fullFacePrice).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Option 3: Without Mask / Toggle Off */}
        <div
          onClick={() => onChange("none")}
          className={`cursor-pointer rounded-2xl p-3 sm:p-3.5 border transition-all flex items-center justify-between gap-3 ${
            selectedOption === "none"
              ? "bg-white border-[#0a1f3c] ring-2 ring-[#0a1f3c]/20 shadow-xs"
              : "bg-white/60 border-[#e2e8f0] hover:bg-white hover:border-[#cbd5e1]"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div
              className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                selectedOption === "none"
                  ? "bg-[#0a1f3c] border-[#0a1f3c] text-white"
                  : "border-[#cbd5e1] bg-white"
              }`}
            >
              {selectedOption === "none" && <Check className="w-3 h-3 stroke-[3]" />}
            </div>

            {/* Device Icon / Photo */}
            <div className="w-12 h-12 rounded-xl bg-white p-1 border border-[#e2e8f0] flex items-center justify-center shrink-0 shadow-2xs">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-archivo font-bold text-xs sm:text-sm text-[#0a1f3c] truncate">
                  Device Only (Without Mask)
                </span>
                <span className="text-[9px] font-bold bg-[#64748b]/15 text-[#64748b] px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                  Mask Toggled Off
                </span>
              </div>
              <p className="text-[11px] text-[#64748b] mt-0.5 line-clamp-1 sm:line-clamp-2">
                Toggle off if you already own a compatible Löwenstein or CPAP mask.
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="font-archivo font-bold text-xs sm:text-sm text-[#64748b] block whitespace-nowrap">
              +₹0
            </span>
            <span className="text-[10px] text-[#64748b] font-mono whitespace-nowrap">
              ₹{basePrice.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      {/* Summary note */}
      <div className="pt-2 flex items-center justify-between text-xs text-[#64748b]">
        <span>
          Base Device: <strong>₹{basePrice.toLocaleString("en-IN")}</strong>
        </span>
        <span>
          Mask Add-on: <strong>{addonAmount > 0 ? `+₹${addonAmount.toLocaleString("en-IN")}` : "₹0 (None)"}</strong>
        </span>
      </div>
    </div>
  );
};
