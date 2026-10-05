"use client";

import React from "react";
import {
  MaskOptionType,
  MASK_OPTIONS,
  getMaskAddonInfo,
  getMaskAddonPrice,
} from "@/utils/maskAddon";
import { Product } from "@/types/product";
import { Check, ShieldCheck, Sparkles, XCircle } from "lucide-react";

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
  const maskInfo = getMaskAddonInfo(product);

  if (!maskInfo.isEligible) {
    return null;
  }

  const basePrice = maskInfo.basePrice;

  if (variant === "compact") {
    return (
      <div className="mt-2.5 pt-2 border-t border-[#f1f5f9]">
        <div className="flex items-center justify-between gap-1 mb-1.5">
          <span className="text-[10px] font-semibold tracking-wider uppercase text-[#64748b]">
            Mask Add-on:
          </span>
          <span className="text-[10px] font-bold text-[#2a6ecb]">
            {selectedOption === "nasal" && "+₹3,000 (Nasal)"}
            {selectedOption === "full-face" && "+₹4,500 (Full Face)"}
            {selectedOption === "none" && "No Mask (₹0)"}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1">
          {/* Option 1: Nasal Mask */}
          <button
            type="button"
            onClick={() => onChange("nasal")}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all text-center flex items-center justify-center gap-1 border ${
              selectedOption === "nasal"
                ? "bg-[#2a6ecb] text-white border-[#2a6ecb] shadow-xs"
                : "bg-[#f8fafc] text-[#334155] border-[#e2e8f0] hover:bg-[#edf4fc]"
            }`}
          >
            {selectedOption === "nasal" && <Check className="w-2.5 h-2.5" />}
            <span>Nasal (+3k)</span>
          </button>

          {/* Option 2: Full Face Mask */}
          <button
            type="button"
            onClick={() => onChange("full-face")}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all text-center flex items-center justify-center gap-1 border ${
              selectedOption === "full-face"
                ? "bg-[#2a6ecb] text-white border-[#2a6ecb] shadow-xs"
                : "bg-[#f8fafc] text-[#334155] border-[#e2e8f0] hover:bg-[#edf4fc]"
            }`}
          >
            {selectedOption === "full-face" && <Check className="w-2.5 h-2.5" />}
            <span>Full Face (+4.5k)</span>
          </button>

          {/* Option 3: No Mask / Toggle Off */}
          <button
            type="button"
            onClick={() => onChange("none")}
            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all text-center flex items-center justify-center gap-1 border ${
              selectedOption === "none"
                ? "bg-[#0a1f3c] text-white border-[#0a1f3c] shadow-xs"
                : "bg-[#f8fafc] text-[#64748b] border-[#e2e8f0] hover:bg-[#f1f5f9]"
            }`}
            title="Toggle off mask purchase"
          >
            {selectedOption === "none" && <Check className="w-2.5 h-2.5" />}
            <span>No Mask</span>
          </button>
        </div>
      </div>
    );
  }

  // Full Variant for Product Detail Page & Quick View Modal
  const addonAmount = getMaskAddonPrice(selectedOption);
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
              Pre-configured with Nasal Mask
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
          className={`cursor-pointer rounded-xl p-3.5 border transition-all flex items-start justify-between gap-3 ${
            selectedOption === "nasal"
              ? "bg-white border-[#2a6ecb] ring-2 ring-[#2a6ecb]/20 shadow-xs"
              : "bg-white/60 border-[#e2e8f0] hover:bg-white hover:border-[#cbd5e1]"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                selectedOption === "nasal"
                  ? "bg-[#2a6ecb] border-[#2a6ecb] text-white"
                  : "border-[#cbd5e1] bg-white"
              }`}
            >
              {selectedOption === "nasal" && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-archivo font-bold text-sm text-[#0a1f3c]">
                  Nasal Mask
                </span>
                <span className="text-[10px] font-bold bg-[#1fb37a]/15 text-[#138054] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Default Option
                </span>
              </div>
              <p className="text-xs text-[#64748b] mt-0.5">
                Standard comfortable nasal cushion. Recommended for natural nose breathers.
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="font-archivo font-bold text-sm text-[#2a6ecb] block">
              +₹3,000
            </span>
            <span className="text-[10px] text-[#64748b] font-mono">
              ₹{(basePrice + 3000).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Option 2: Full Face Mask */}
        <div
          onClick={() => onChange("full-face")}
          className={`cursor-pointer rounded-xl p-3.5 border transition-all flex items-start justify-between gap-3 ${
            selectedOption === "full-face"
              ? "bg-white border-[#2a6ecb] ring-2 ring-[#2a6ecb]/20 shadow-xs"
              : "bg-white/60 border-[#e2e8f0] hover:bg-white hover:border-[#cbd5e1]"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                selectedOption === "full-face"
                  ? "bg-[#2a6ecb] border-[#2a6ecb] text-white"
                  : "border-[#cbd5e1] bg-white"
              }`}
            >
              {selectedOption === "full-face" && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-archivo font-bold text-sm text-[#0a1f3c]">
                  Full Face Mask
                </span>
                <span className="text-[10px] font-bold bg-[#2a6ecb]/15 text-[#2a6ecb] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  BiLevel / Mouth Breather
                </span>
              </div>
              <p className="text-xs text-[#64748b] mt-0.5">
                Complete nose and mouth seal. Ideal for mouth breathing or elevated CPAP pressures.
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="font-archivo font-bold text-sm text-[#2a6ecb] block">
              +₹4,500
            </span>
            <span className="text-[10px] text-[#64748b] font-mono">
              ₹{(basePrice + 4500).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Option 3: Without Mask / Toggle Off */}
        <div
          onClick={() => onChange("none")}
          className={`cursor-pointer rounded-xl p-3.5 border transition-all flex items-start justify-between gap-3 ${
            selectedOption === "none"
              ? "bg-white border-[#0a1f3c] ring-2 ring-[#0a1f3c]/20 shadow-xs"
              : "bg-white/60 border-[#e2e8f0] hover:bg-white hover:border-[#cbd5e1]"
          }`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                selectedOption === "none"
                  ? "bg-[#0a1f3c] border-[#0a1f3c] text-white"
                  : "border-[#cbd5e1] bg-white"
              }`}
            >
              {selectedOption === "none" && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-archivo font-bold text-sm text-[#0a1f3c]">
                  Device Only (Without Mask)
                </span>
                <span className="text-[10px] font-bold bg-[#64748b]/15 text-[#64748b] px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Mask Toggled Off
                </span>
              </div>
              <p className="text-xs text-[#64748b] mt-0.5">
                Toggle off if you already own a compatible Löwenstein or CPAP mask.
              </p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="font-archivo font-bold text-sm text-[#64748b] block">
              +₹0
            </span>
            <span className="text-[10px] text-[#64748b] font-mono">
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
