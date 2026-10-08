"use client";

import React, { useState, useEffect } from "react";
import { useAdmin, DEFAULT_PRICING_SETTINGS, SitePricingSettings } from "@/context/AdminContext";
import { useToast } from "@/context/ToastContext";
import {
  Sliders,
  Save,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Droplets,
  Activity,
  Tag,
  Info,
  Calendar,
  Layers,
  ShoppingBag,
} from "lucide-react";

export const PricingSettingsTab: React.FC = () => {
  const { pricingSettings, updatePricingSettings } = useAdmin();
  const { addToast } = useToast();

  const [formData, setFormData] = useState<SitePricingSettings>(
    pricingSettings || DEFAULT_PRICING_SETTINGS
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (pricingSettings) {
      setFormData(pricingSettings);
    }
  }, [pricingSettings]);

  const handleChange = (field: keyof SitePricingSettings, value: number) => {
    setIsSaved(false);
    setFormData((prev) => ({
      ...prev,
      [field]: isNaN(value) ? 0 : Math.max(0, value),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updatePricingSettings(formData);
      setIsSaving(false);
      setIsSaved(true);
      addToast(
        "Pricing Updated",
        "New add-on and accessory prices have been saved to MongoDB Atlas and applied to the entire storefront."
      );
      setTimeout(() => setIsSaved(false), 4000);
    } catch (err: any) {
      setIsSaving(false);
      addToast("Update Failed", err?.message || "Failed to save settings.", "error");
    }
  };

  const handleResetToDefaults = () => {
    if (confirm("Reset all add-on and accessory prices to default values?")) {
      setFormData(DEFAULT_PRICING_SETTINGS);
      setIsSaved(false);
    }
  };

  const humidifierSavings = Math.max(
    0,
    formData.humidifierStandalonePrice - formData.humidifierBundlePrice
  );

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#e9edf4]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#2a6ecb]/10 text-[#2a6ecb] px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sliders className="w-3 h-3" />
              Dynamic System Config
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1fb37a]/15 text-[#138054] px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              MongoDB Atlas Synced
            </span>
          </div>
          <h1 className="font-archivo font-bold text-2xl md:text-3xl text-[#0a1f3c] tracking-tight">
            Pricing &amp; Add-ons Settings
          </h1>
          <p className="text-xs text-[#64748b] mt-1 max-w-2xl">
            Control the add-on charges for patient masks, heated humidifiers, and sleep study diagnostics across the entire website. Any changes saved here reflect instantly on device pages, cart calculations, and checkout totals without touching code.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleResetToDefaults}
            className="px-4 py-2 rounded-xl border border-[#cbd5e1] text-[#475569] hover:bg-[#f8fafc] hover:border-[#94a3b8] font-archivo font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION 1: Mask Add-ons */}
        <div className="bg-white rounded-[24px] p-6 border border-[#e2e8f0] shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2a6ecb]/10 text-[#2a6ecb] flex items-center justify-center font-bold">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-archivo font-bold text-base text-[#0a1f3c]">
                  Patient Mask Add-on Prices
                </h3>
                <p className="text-[11px] text-[#64748b]">
                  Applied when patients buy CPAP &amp; BiLevel devices with bundled masks.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#2a6ecb] bg-[#2a6ecb]/10 px-2 py-0.5 rounded-full">
              CPAP &amp; BiLevel Add-ons
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Nasal Mask */}
            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-archivo font-bold text-xs text-[#0a1f3c] uppercase tracking-wide">
                  JOYCEone Nasal Mask Add-on
                </label>
                <span className="text-[10px] text-[#64748b] font-mono">Default: ₹3,000</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#64748b]">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  step="50"
                  required
                  value={formData.nasalMaskAddonPrice}
                  onChange={(e) => handleChange("nasalMaskAddonPrice", parseInt(e.target.value, 10))}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#cbd5e1] bg-white font-mono font-bold text-sm text-[#0a1f3c] focus:outline-none focus:border-[#2a6ecb] focus:ring-2 focus:ring-[#2a6ecb]/20"
                />
              </div>
              <p className="text-[11px] text-[#64748b] leading-relaxed">
                Default mask pre-selected for CPAP and BiLevel machines in the store.
              </p>
            </div>

            {/* Full Face Mask */}
            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-archivo font-bold text-xs text-[#0a1f3c] uppercase tracking-wide">
                  JOYCEone Full Face Mask Add-on
                </label>
                <span className="text-[10px] text-[#64748b] font-mono">Default: ₹4,500</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#64748b]">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  step="50"
                  required
                  value={formData.fullFaceMaskAddonPrice}
                  onChange={(e) => handleChange("fullFaceMaskAddonPrice", parseInt(e.target.value, 10))}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#cbd5e1] bg-white font-mono font-bold text-sm text-[#0a1f3c] focus:outline-none focus:border-[#2a6ecb] focus:ring-2 focus:ring-[#2a6ecb]/20"
                />
              </div>
              <p className="text-[11px] text-[#64748b] leading-relaxed">
                Upgrade charge when patients choose a Full Face Mask instead of a Nasal Mask.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 2: Humidifier Pricing */}
        <div className="bg-white rounded-[24px] p-6 border border-[#e2e8f0] shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center font-bold">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-archivo font-bold text-base text-[#0a1f3c]">
                  Löwenstein Prisma AQUA Humidifier Pricing
                </h3>
                <p className="text-[11px] text-[#64748b]">
                  Control both bundle discount price and individual standalone price.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#138054] bg-[#1fb37a]/15 px-2.5 py-0.5 rounded-full">
              Bundle Savings: ₹{humidifierSavings.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Humidifier Bundle Price */}
            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-archivo font-bold text-xs text-[#0a1f3c] uppercase tracking-wide">
                  Bundle Price (With Device)
                </label>
                <span className="text-[10px] text-[#64748b] font-mono">Default: ₹10,000</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#64748b]">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  step="100"
                  required
                  value={formData.humidifierBundlePrice}
                  onChange={(e) => handleChange("humidifierBundlePrice", parseInt(e.target.value, 10))}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#cbd5e1] bg-white font-mono font-bold text-sm text-[#0066FF] focus:outline-none focus:border-[#0066FF] focus:ring-2 focus:ring-[#0066FF]/20"
                />
              </div>
              <p className="text-[11px] text-[#64748b] leading-relaxed">
                Special discounted price added when customer toggles &ldquo;Add Humidifier&rdquo; on a CPAP or BiLevel device.
              </p>
            </div>

            {/* Standalone Price */}
            <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-archivo font-bold text-xs text-[#0a1f3c] uppercase tracking-wide">
                  Standalone Retail Price
                </label>
                <span className="text-[10px] text-[#64748b] font-mono">Default: ₹12,600</span>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#64748b]">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  step="100"
                  required
                  value={formData.humidifierStandalonePrice}
                  onChange={(e) => handleChange("humidifierStandalonePrice", parseInt(e.target.value, 10))}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#cbd5e1] bg-white font-mono font-bold text-sm text-[#0a1f3c] focus:outline-none focus:border-[#0a1f3c] focus:ring-2 focus:ring-[#0a1f3c]/20"
                />
              </div>
              <p className="text-[11px] text-[#64748b] leading-relaxed">
                Shown as the strikethrough comparison price on the bundle card to highlight patient savings.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: Sleep Diagnostics */}
        <div className="bg-white rounded-[24px] p-6 border border-[#e2e8f0] shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#1fb37a]/15 text-[#138054] flex items-center justify-center font-bold">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-archivo font-bold text-base text-[#0a1f3c]">
                  Clinical Sleep Study Diagnostics
                </h3>
                <p className="text-[11px] text-[#64748b]">
                  Standard charge for home/clinic polysomnography booking reservations.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#138054] bg-[#1fb37a]/15 px-2 py-0.5 rounded-full">
              Diagnostics Booking
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-archivo font-bold text-xs text-[#0a1f3c] uppercase tracking-wide">
                Sleep Study Booking Fee
              </label>
              <span className="text-[10px] text-[#64748b] font-mono">Default: ₹5,000</span>
            </div>
            <div className="relative max-w-sm">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#64748b]">
                ₹
              </span>
              <input
                type="number"
                min="0"
                step="500"
                required
                value={formData.sleepStudyCharge}
                onChange={(e) => handleChange("sleepStudyCharge", parseInt(e.target.value, 10))}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#cbd5e1] bg-white font-mono font-bold text-sm text-[#0a1f3c] focus:outline-none focus:border-[#1fb37a] focus:ring-2 focus:ring-[#1fb37a]/20"
              />
            </div>
            <p className="text-[11px] text-[#64748b] leading-relaxed">
              Shown in the booking modal on the Sleep Diagnostics category page and recorded with patient appointments in MongoDB.
            </p>
          </div>
        </div>

        {/* LIVE STOREFRONT PREVIEW CALCULATOR */}
        <div className="bg-gradient-to-br from-[#0a1f3c] to-[#12315c] text-white rounded-[24px] p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7fb0ee]" />
              <span className="font-archivo font-bold text-xs uppercase tracking-wider text-white">
                Live Storefront Calculation Simulator
              </span>
            </div>
            <span className="text-[10px] bg-white/10 text-white/80 px-2 py-0.5 rounded-full">
              Real-time Preview
            </span>
          </div>

          <p className="text-xs text-white/80 leading-relaxed">
            Here is how a typical CPAP device (Base Price: ₹45,000) will calculate and appear to patients with your current settings:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {/* Nasal Mask Option */}
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
              <span className="text-[10px] text-white/70 block uppercase font-bold tracking-wide">
                With JOYCEone Nasal (+₹{formData.nasalMaskAddonPrice.toLocaleString("en-IN")})
              </span>
              <span className="font-archivo font-bold text-lg text-white block">
                ₹{(45000 + formData.nasalMaskAddonPrice).toLocaleString("en-IN")}.00
              </span>
              <span className="text-[10px] text-white/60 block">Default store selection</span>
            </div>

            {/* Full Face Mask Option */}
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
              <span className="text-[10px] text-white/70 block uppercase font-bold tracking-wide">
                With Full Face (+₹{formData.fullFaceMaskAddonPrice.toLocaleString("en-IN")})
              </span>
              <span className="font-archivo font-bold text-lg text-white block">
                ₹{(45000 + formData.fullFaceMaskAddonPrice).toLocaleString("en-IN")}.00
              </span>
              <span className="text-[10px] text-white/60 block">Configured by customer</span>
            </div>

            {/* With Device + Humidifier Bundle */}
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
              <span className="text-[10px] text-[#1fb37a] block uppercase font-bold tracking-wide">
                Device + Humidifier Bundle
              </span>
              <span className="font-archivo font-bold text-lg text-white block">
                ₹{(45000 + formData.nasalMaskAddonPrice + formData.humidifierBundlePrice).toLocaleString("en-IN")}.00
              </span>
              <span className="text-[10px] text-white/60 block">
                Save ₹{humidifierSavings.toLocaleString("en-IN")} vs standalone
              </span>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs">
          <div className="flex items-center gap-2">
            {isSaved ? (
              <span className="flex items-center gap-1.5 text-xs font-bold text-[#138054] bg-[#1fb37a]/15 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
                Saved &amp; Active on Storefront!
              </span>
            ) : (
              <span className="text-xs text-[#64748b]">
                Clicking save will instantly synchronize these prices with MongoDB Atlas and the live frontend.
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className={`px-8 py-3 rounded-xl font-archivo font-bold text-xs uppercase tracking-wider text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
              isSaving
                ? "bg-[#64748b] cursor-not-allowed"
                : "bg-[#0066FF] hover:bg-[#0052cc] hover:shadow-lg active:scale-95"
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving to MongoDB..." : "Save Pricing Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
