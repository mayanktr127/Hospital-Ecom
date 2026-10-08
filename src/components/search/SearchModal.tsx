"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { useAdmin } from "@/context/AdminContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useInquiry } from "@/context/InquiryContext";
import { getDefaultProducts } from "@/utils/defaultProducts";
import { isMaskEligible, MaskOptionType } from "@/utils/maskAddon";
import { isRentalProduct, RENTAL_SHORT_MESSAGE } from "@/utils/rental";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ShoppingBag, Phone, Star } from "lucide-react";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { products: adminProducts, pricingSettings } = useAdmin();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const { openInquiryModal } = useInquiry();

  const nasalPrice = pricingSettings?.nasalMaskAddonPrice ?? 3000;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Combine products with fallbacks, filtering out invalid or test products
  const productSource = useMemo(() => {
    const prods = adminProducts && adminProducts.length > 0 ? adminProducts : getDefaultProducts();
    const map = new Map<string, Product>();
    prods.forEach((p) => {
      if (!p || !p.name) return;
      const pName = (p.name || "").toLowerCase().trim();
      const pId = (p.id || "").toLowerCase().trim();
      if (pId.includes("addon") || pName === "wrwe" || pName.includes("test") || pId.includes("test")) return;
      if (!map.has(pId)) map.set(pId, p);
    });
    return Array.from(map.values());
  }, [adminProducts]);

  // Comprehensive multi-keyword search
  const filteredProducts = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      // Return top featured Löwenstein clinical devices by default
      const featuredSlugs = [
        "prisma-smart",
        "prisma-smart-plus",
        "prisma-25st",
        "prisma-25s",
        "prisma-20a",
        "luisa-ventilator",
        "prisma-aqua",
      ];
      const featured = productSource.filter((p) =>
        featuredSlugs.some((slug) => p.id?.toLowerCase().includes(slug) || p.slug?.toLowerCase().includes(slug))
      );
      return featured.length >= 4 ? featured.slice(0, 6) : productSource.slice(0, 6);
    }

    const keywords = trimmed.split(/\s+/).filter(Boolean);

    return productSource
      .map((p) => {
        const nameLower = (p.name || "").toLowerCase();
        const catLower = (p.category || "").toLowerCase();
        const descLower = (p.description || "").toLowerCase();
        const brandLower = (p.brand || "").toLowerCase();
        const skuLower = (p.sku || "").toLowerCase();
        const featuresText = Array.isArray(p.features) ? p.features.join(" ").toLowerCase() : "";
        const specsText = Array.isArray(p.specifications)
          ? p.specifications.map((s: any) => `${s.label || ""} ${s.value || ""}`).join(" ").toLowerCase()
          : "";

        const allText = `${nameLower} ${catLower} ${descLower} ${brandLower} ${skuLower} ${featuresText} ${specsText}`;

        // Every keyword must be matched somewhere in the product
        const matchesAll = keywords.every((kw) => allText.includes(kw));
        if (!matchesAll) return null;

        // Calculate relevance score
        let score = 0;
        if (nameLower === trimmed) score += 100;
        else if (nameLower.startsWith(trimmed)) score += 60;
        else if (nameLower.includes(trimmed)) score += 40;

        keywords.forEach((kw) => {
          if (nameLower.includes(kw)) score += 15;
          if (catLower.includes(kw)) score += 10;
          if (brandLower.includes(kw)) score += 8;
          if (skuLower.includes(kw)) score += 8;
          if (descLower.includes(kw)) score += 3;
        });

        return { product: p, score };
      })
      .filter((item): item is { product: Product; score: number } => item !== null)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.product);
  }, [productSource, query]);

  const getProductUrl = (p: Product) => {
    const catSlug = (p.category || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const pSlug = p.slug || p.id;
    if (catSlug.includes("sleep") || catSlug.includes("cpap")) return `/sleep-apnea-therapy/${pSlug}`;
    if (catSlug.includes("bilevel")) return `/bilevel-s-st-devices/${pSlug}`;
    if (catSlug.includes("asv") || catSlug.includes("titration")) return `/asv-titration-devices/${pSlug}`;
    if (catSlug.includes("humidifier")) return `/humidifiers/${pSlug}`;
    if (catSlug.includes("mask")) return `/masks/${pSlug}`;
    if (catSlug.includes("vent")) return `/ventilation/${pSlug}`;
    if (catSlug.includes("oxygen")) return `/oxygen-therapy/${pSlug}`;
    if (catSlug.includes("diag")) return `/sleep-diagnostics/${pSlug}`;
    return `/product/${pSlug}`;
  };

  const handleProductClick = (product: Product) => {
    if (onSelectProduct) {
      onSelectProduct(product);
    } else {
      router.push(getProductUrl(product));
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 md:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0a1f3c]/50 backdrop-blur-md"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative bg-white w-full max-w-2xl rounded-[28px] shadow-[0_30px_70px_rgba(24,42,65,0.14)] overflow-hidden border border-[#e9edf4] z-10 flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-[#e9edf4] focus-within:border-[#7fb0ee]">
              <Search className="w-5 h-5 text-[#0a1f3c]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Löwenstein ventilation, diagnostics, masks, CPAP..."
                autoFocus
                className="w-full bg-transparent border-0 text-[#182a41] font-inter text-base placeholder-[#64748b] focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#f6f4fb] text-[#64748b] transition-colors cursor-pointer"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content list */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#64748b]">
                  {query ? `Search Results (${filteredProducts.length})` : "Featured Löwenstein Devices"}
                </span>
                <span className="text-xs text-[#64748b]">Press ESC to exit</span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center text-[#64748b] bg-[#f8fafc] rounded-2xl border border-[#e9edf4]">
                  <p className="font-archivo font-medium text-lg tracking-[-0.03em] text-[#0a1f3c]">No devices found</p>
                  <p className="text-sm mt-1">Try searching for &quot;Prisma SMART&quot;, &quot;BiLevel&quot;, &quot;LUISA&quot;, or &quot;Mask&quot;</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group flex items-center justify-between p-3.5 rounded-[16px] border border-[#e9edf4] hover:border-[#dcebfb] hover:shadow-[0_16px_44px_rgba(24,42,65,0.09)] transition-all bg-white"
                    >
                      <div
                        onClick={() => handleProductClick(product)}
                        className="flex items-center gap-4 cursor-pointer flex-1"
                      >
                        <div className="w-16 h-16 rounded-[14px] bg-gradient-to-br from-[#e9e6fb] to-white flex items-center justify-center p-2 shrink-0 border border-[#e9edf4]">
                          <Image
                            src={product.image || "/images/pulmocare/pulmocare_prisma-smart.png"}
                            alt={product.name}
                            width={56}
                            height={56}
                            className="object-contain max-h-full product-drop-shadow"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="eyebrow text-[10px]">
                              {product.category}
                            </span>
                            <div className="flex items-center gap-0.5 text-amber-500 text-[11px] font-bold">
                              <Star className="w-3 h-3 fill-amber-500" />
                              <span>{product.rating || 5}.0</span>
                            </div>
                          </div>
                          <h4 className="font-archivo font-semibold text-sm text-[#182a41] group-hover:text-[#2a6ecb] transition-colors leading-tight">
                            {product.name}
                          </h4>

                          {product.price && product.price > 0 ? (
                            <div className="mt-0.5">
                              <span className="font-archivo font-bold text-sm text-[#0a1f3c]">
                                ₹{(isMaskEligible(product) ? product.price + nasalPrice : product.price).toLocaleString("en-IN")}.00
                              </span>
                              {isMaskEligible(product) && (
                                <span className="text-[10px] text-[#2a6ecb] font-semibold block">
                                  Incl. JOYCEone Nasal (+₹{nasalPrice.toLocaleString("en-IN")})
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs font-archivo font-bold text-[#2a6ecb] mt-0.5 block">
                              Price on Request
                            </span>
                          )}

                          {isRentalProduct(product) && (
                            <span className="flex items-center gap-1 text-[10px] font-archivo font-bold text-[#2a6ecb] mt-0.5">
                              <Phone className="w-2.5 h-2.5 shrink-0" />
                              <span>{RENTAL_SHORT_MESSAGE}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        {product.price && product.price > 0 ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const effectiveMask: MaskOptionType = isMaskEligible(product) ? "nasal" : "none";
                              addToCart(product, 1, effectiveMask);
                              const maskLabel = effectiveMask === "nasal" ? ` (with JOYCEone Nasal Mask)` : "";
                              addToast("Added to Cart", `${product.name}${maskLabel} added to your cart.`);
                            }}
                            className="btn btn-primary !px-4 !py-2.5 !text-[13px] flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onClose();
                              openInquiryModal(product);
                            }}
                            className="btn btn-outline !px-3.5 !py-2 !text-xs border border-[#2a6ecb] text-[#2a6ecb] hover:bg-[#EBF5FF] rounded-full inline-flex items-center gap-1 font-archivo font-bold cursor-pointer"
                          >
                            <Phone className="w-3 h-3" />
                            <span>Enquire</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};