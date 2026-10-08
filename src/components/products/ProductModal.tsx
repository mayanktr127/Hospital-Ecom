"use client";

import React, { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { useInquiry } from "@/context/InquiryContext";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Heart, Star, Plus, Minus, ArrowRight, Phone } from "lucide-react";
import Image from "next/image";
import { getProductModes } from "@/utils/productModes";
import { isRentalProduct, RENTAL_MESSAGE, RENTAL_PHONE } from "@/utils/rental";
import { MaskOptionSelector } from "@/components/cart/MaskOptionSelector";
import {
  MaskOptionType,
  getMaskAddonInfo,
  getMaskAddonPrice,
  isMaskEligible,
} from "@/utils/maskAddon";
import {
  isHumidifierEligible,
  HUMIDIFIER_ADDON_PRICE,
} from "@/utils/humidifierAddon";
import { HumidifierOptionSelector } from "@/components/cart/HumidifierOptionSelector";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedMaskOption, setSelectedMaskOption] = useState<MaskOptionType>("nasal");
  const [selectedHumidifier, setSelectedHumidifier] = useState<boolean>(false);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useWishlist();
  const { addToast } = useToast();
  const { openInquiryModal } = useInquiry();

  if (!product) return null;
  const favorite = isFavorite(product.id);
  const alsoOnRental = isRentalProduct(product);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0a1f3c]/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative bg-white w-full max-w-5xl rounded-[28px] shadow-[0_30px_90px_rgba(10,31,60,0.22)] overflow-hidden border border-[#e9edf4] z-10 flex flex-col md:flex-row max-h-[92vh] my-auto"
        >
          {/* Close button - high contrast, pinned safely at top-right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:text-[#0a1f3c] hover:bg-white transition-all shadow-xs active:scale-95 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4.5 h-4.5" />
          </button>

          {/* Left: Thumbnail stage with ground shadow */}
          <div className="w-full md:w-[42%] lg:w-[40%] bg-gradient-to-br from-[#e9e6fb] via-[#dcebfb] to-white p-6 sm:p-8 flex flex-col items-center justify-center relative shrink-0 min-h-[260px] md:min-h-0 border-b md:border-b-0 md:border-r border-[#e9edf4]">
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#0a1f3c] text-white text-[10px] sm:text-[11px] font-bold font-archivo uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                {product.badge}
              </span>
            )}

            <div className="relative w-full max-w-[260px] aspect-square flex items-center justify-center thumb-ground-shadow">
              <Image
                src={product.image}
                alt={product.name}
                width={260}
                height={260}
                className="object-contain max-h-full product-drop-shadow hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="mt-4 hidden md:flex items-center gap-2 text-xs font-semibold text-[#2a6ecb] bg-white/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white shadow-2xs">
              <span>Löwenstein Medical Certified</span>
            </div>
          </div>

          {/* Right: Scrollable Content & Configuration details */}
          <div className="w-full md:w-[58%] lg:w-[60%] p-6 sm:p-8 overflow-y-auto max-h-[92vh] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Star rating - padded right to clear close button */}
              <div className="flex items-center justify-between pr-12">
                <span className="eyebrow text-[11px]">
                  {product.category}
                </span>

                <div className="flex items-center gap-1 text-[#f2b134] text-xs font-bold font-archivo bg-[#fff9eb] px-2.5 py-1 rounded-full border border-[#fef0c7]">
                  <Star className="w-3.5 h-3.5 fill-[#f2b134] text-[#f2b134]" />
                  <span>{product.rating}</span>
                  <span className="text-[#64748b] font-normal">({product.reviewsCount})</span>
                </div>
              </div>

              <h2 className="font-archivo font-bold text-2xl sm:text-[28px] tracking-[-0.03em] text-[#0a1f3c] leading-tight">
                {product.name}
              </h2>

              {/* Price row */}
              {product.price && product.price > 0 ? (
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-archivo font-bold text-2xl text-[#0a1f3c]">
                    ₹{product.price.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  {product.originalPrice && (
                    <s className="text-sm font-inter text-[#64748b] font-medium">
                      ₹{product.originalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </s>
                  )}
                  <span className="text-xs font-semibold text-[#2a6ecb] bg-[#dcebfb] px-2.5 py-1 rounded-full">
                    Official Warranty
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="inline-block text-xs font-archivo font-bold text-[#2a6ecb] bg-[#EBF5FF] border border-[#2a6ecb]/20 px-3 py-1.5 rounded-full">
                    Price on Request
                  </span>
                  <span className="text-xs font-semibold text-[#2a6ecb] bg-[#dcebfb] px-2.5 py-1 rounded-full shrink-0">
                    Official Warranty
                  </span>
                </div>
              )}

              {/* Rental availability */}
              {alsoOnRental && (
                <a
                  href={`tel:${RENTAL_PHONE}`}
                  className="flex items-center gap-2 text-xs font-archivo font-bold text-[#2a6ecb] bg-[#EBF5FF] border border-[#2a6ecb]/20 rounded-2xl px-3.5 py-2 hover:bg-[#dcebfb] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>{RENTAL_MESSAGE}</span>
                </a>
              )}

              {/* Available Operating Modes */}
              {(() => {
                const modalModes = getProductModes(product.name || product.id);
                if (!modalModes) return null;
                return (
                  <div className="p-3 bg-[#EBF5FF] rounded-2xl border border-[#0066FF]/20 space-y-1.5">
                    <span className="text-[10px] font-archivo font-extrabold text-[#0066FF] uppercase tracking-wider block">
                      Available Operating Modes
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {modalModes.modes.map((m, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-white text-[#0066FF] font-archivo font-bold text-[10px] rounded-md border border-[#0066FF]/30"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                    {modalModes.note && (
                      <p className="text-[10px] text-[#64748B] italic">*{modalModes.note}</p>
                    )}
                  </div>
                );
              })()}

              <p className="text-xs sm:text-[13px] text-[#64748b] leading-relaxed">
                {product.description}
              </p>

              {/* Specifications sheet */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-[11px] font-bold font-archivo text-[#0a1f3c] uppercase tracking-wider mb-2">
                    German Technical Specifications
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {product.specifications.map((spec, i) => (
                      <div key={i} className="bg-[#f6f4fb] p-2.5 rounded-xl border border-[#e9edf4]">
                        <span className="text-[#64748b] block text-[10px] uppercase font-semibold truncate">{spec.label}</span>
                        <span className="font-archivo font-bold text-[#182a41] block mt-0.5 text-[11px] sm:text-xs truncate">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mask Customization Option for Eligible Products */}
              {product.price && product.price > 0 && isMaskEligible(product) && (
                <div className="pt-1">
                  <MaskOptionSelector
                    product={product}
                    selectedOption={selectedMaskOption}
                    onChange={setSelectedMaskOption}
                    variant="full"
                  />
                </div>
              )}

              {/* Humidifier Bundle Option for Eligible CPAP / BiLevel Products */}
              {product.price && product.price > 0 && isHumidifierEligible(product) && (
                <div className="pt-1">
                  <HumidifierOptionSelector
                    product={product}
                    selected={selectedHumidifier}
                    onChange={setSelectedHumidifier}
                    variant="full"
                  />
                </div>
              )}
            </div>

            {/* Action buttons footer */}
            <div className="space-y-3 pt-4 border-t border-[#f1f5f9]">
              <div className="flex items-center gap-3">
                {product.price && product.price > 0 ? (
                  <>
                    {/* Quantity selector */}
                    <div className="flex items-center border border-[#e9edf4] rounded-full bg-white h-11 px-2 shrink-0">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[#64748b] hover:text-[#0a1f3c] hover:bg-[#f6f4fb] transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center font-archivo font-bold text-sm text-[#0a1f3c]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-[#64748b] hover:text-[#0a1f3c] hover:bg-[#f6f4fb] transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {(() => {
                      const maskInfo = getMaskAddonInfo(product);
                      const baseDevicePrice =
                        typeof product.price === "number" && product.price > 0
                          ? product.price
                          : maskInfo.isEligible
                          ? maskInfo.basePrice
                          : 0;
                      const maskPrice = maskInfo.isEligible ? getMaskAddonPrice(selectedMaskOption) : 0;
                      const humidifierPrice =
                        isHumidifierEligible(product) && selectedHumidifier
                          ? HUMIDIFIER_ADDON_PRICE
                          : 0;
                      const effectiveUnitPrice = maskInfo.isEligible
                        ? baseDevicePrice + maskPrice + humidifierPrice
                        : (product.price || 0);

                      return (
                        <button
                          onClick={() => {
                            addToCart(
                              product,
                              quantity,
                              maskInfo.isEligible ? selectedMaskOption : "none",
                              isHumidifierEligible(product) ? selectedHumidifier : false
                            );
                            const maskLabel = maskInfo.isEligible
                              ? selectedMaskOption === "nasal"
                                ? " (with JOYCEone Nasal Mask [+₹3,000])"
                                : selectedMaskOption === "full-face"
                                ? " (with JOYCEone Full Face Mask [+₹4,500])"
                                : ""
                              : "";
                            const humidLabel =
                              isHumidifierEligible(product) && selectedHumidifier
                                ? " + Prisma AQUA Humidifier [+₹10,000]"
                                : "";
                            addToast(
                              "Added to Cart",
                              `${quantity}x ${product.name}${maskLabel}${humidLabel} added to your cart.`
                            );
                            onClose();
                          }}
                          className="btn btn-primary flex-1 active:scale-[0.98] cursor-pointer"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Cart — ₹{(effectiveUnitPrice * quantity).toLocaleString("en-IN")}.00</span>
                        </button>
                      );
                    })()}
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      openInquiryModal(product);
                    }}
                    className="btn btn-primary flex-1 active:scale-[0.98] inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Request Quote / Send Enquiry</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    toggleFavorite(product);
                    addToast(
                      favorite ? "Removed from Wishlist" : "Saved to Wishlist",
                      favorite ? `${product.name} removed.` : `${product.name} saved to your shortlist.`
                    );
                  }}
                  className={`p-3 rounded-full border transition-colors cursor-pointer shrink-0 ${
                    favorite
                      ? "bg-[#fbe6ee] text-[#dc4b56] border-[#dc4b56]/30"
                      : "bg-white text-[#182a41] border-[#e9edf4] hover:bg-[#f6f4fb] hover:border-[#7fb0ee]"
                  }`}
                  aria-label="Wishlist"
                  aria-pressed={favorite}
                >
                  <Heart className={`w-5 h-5 ${favorite ? "fill-[#dc4b56]" : ""}`} />
                </button>
              </div>

              <div className="pt-1 text-center">
                <a
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs font-archivo font-bold text-[#0066FF] hover:underline"
                >
                  <span>View Full Clinical Specifications &amp; Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};