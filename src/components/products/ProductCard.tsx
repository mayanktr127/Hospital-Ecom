"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { useInquiry } from "@/context/InquiryContext";
import { ShoppingBag, Heart, Eye, Star, Phone } from "lucide-react";
import { motion } from "motion/react";
import { isRentalProduct, RENTAL_SHORT_MESSAGE, RENTAL_PHONE } from "@/utils/rental";
import { isMaskEligible, MaskOptionType } from "@/utils/maskAddon";
import { useAdmin } from "@/context/AdminContext";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useWishlist();
  const { addToast } = useToast();
  const { openInquiryModal } = useInquiry();

  const favorite = isFavorite(product.id);
  const alsoOnRental = isRentalProduct(product);
  const { pricingSettings } = useAdmin();
  const nasalPrice = pricingSettings?.nasalMaskAddonPrice ?? 3000;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
      className="prod group bg-white border border-[#e9edf4] rounded-[20px] p-5 flex flex-col gap-3 shadow-[0_2px_8px_rgba(24,42,65,0.05)] hover:shadow-[0_16px_44px_rgba(24,42,65,0.09)] hover:border-[#dcebfb] transition-shadow relative"
    >
      {/* Wishlist toggle button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(product);
          addToast(
            favorite ? "Removed from Wishlist" : "Saved to Wishlist",
            favorite ? `${product.name} removed.` : `${product.name} saved to your shortlist.`
          );
        }}
        className={`absolute top-6 right-6 z-10 w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
          favorite
            ? "bg-[#fbe6ee] text-[#dc4b56] border-[#dc4b56]/30"
            : "bg-white/90 backdrop-blur-md text-[#64748b] border-[#e9edf4] hover:text-[#2a6ecb] hover:border-[#7fb0ee]"
        }`}
        aria-label="Toggle wishlist"
      >
        <Heart className={`w-4 h-4 ${favorite ? "fill-[#dc4b56]" : ""}`} />
      </button>

      {/* Thumbnail with pseudo ground shadow */}
      <div
        onClick={() => onQuickView(product)}
        className="media bg-gradient-to-br from-[#e9e6fb] via-[#dcebfb] to-white rounded-[14px] h-[206px] flex items-center justify-center p-4 relative overflow-hidden cursor-pointer thumb-ground-shadow"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={155}
          height={155}
          className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-[0_16px_12px_rgba(24,42,65,0.22)] group-hover:scale-105 group-hover:-translate-y-1.5 transition-transform duration-500"
        />

        {/* Quick View overlay badge */}
        <div className="absolute inset-0 bg-[#0a1f3c]/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white text-[#0a1f3c] font-archivo font-bold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </span>
        </div>
      </div>

      {/* Category Eyebrow & Title */}
      <div className="mt-1">
        <span className="eyebrow text-[11px] block">
          {product.category}
        </span>
        <h4
          onClick={() => onQuickView(product)}
          className="font-archivo font-semibold text-[15px] leading-snug text-[#182a41] group-hover:text-[#0a1f3c] transition-colors cursor-pointer line-clamp-1 mt-0.5"
        >
          {product.name ? (/-[A-Za-z0-9]-/.test(product.name) ? product.name.replace(/-/g, "").replace(/\s+/g, " ").trim() : product.name) : ""}
        </h4>
      </div>

      {/* Rating & Price */}
      <div className="price flex items-center justify-between pt-1">
        {product.price && product.price > 0 ? (
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="now">
                ₹{(isMaskEligible(product) ? product.price + nasalPrice : product.price).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              {product.originalPrice && !isMaskEligible(product) && (
                <s className="was">
                  ₹{product.originalPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </s>
              )}
            </div>
            {isMaskEligible(product) && (
              <span className="text-[10px] text-[#2a6ecb] font-semibold">
                Incl. JOYCEone Nasal (+₹{nasalPrice.toLocaleString("en-IN")})
              </span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 py-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openInquiryModal(product);
              }}
              className="text-xs font-archivo font-bold text-[#2a6ecb] bg-[#EBF5FF] hover:bg-[#dcebfb] border border-[#2a6ecb]/20 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
            >
              Price on Request
            </button>
          </div>
        )}

        <div className="flex items-center gap-1 text-[#f2b134] text-xs font-bold font-archivo shrink-0">
          <Star className="w-3 h-3 fill-[#f2b134]" />
          <span>{product.rating}</span>
        </div>
      </div>

      {/* Rental availability notice — shown alongside the price */}
      {alsoOnRental && (
        <a
          href={`tel:${RENTAL_PHONE}`}
          className="flex items-center gap-1.5 text-[11px] font-archivo font-bold text-[#2a6ecb] bg-[#EBF5FF] border border-[#2a6ecb]/20 rounded-full px-2.5 py-1.5 hover:bg-[#dcebfb] transition-colors"
        >
          <Phone className="w-3 h-3 shrink-0" />
          <span>{RENTAL_SHORT_MESSAGE}</span>
        </a>
      )}

      {/* Add to Cart or Enquire CTA */}
      {product.price && product.price > 0 ? (
        <button
          onClick={() => {
            const effectiveMask: MaskOptionType = isMaskEligible(product) ? "nasal" : "none";
            addToCart(product, 1, effectiveMask);
            const maskLabel = effectiveMask === "nasal" ? ` (with JOYCEone Nasal Mask)` : "";
            addToast(
              "Added to Cart",
              `${product.name}${maskLabel} added to your cart.`
            );
          }}
          className="btn btn-primary add w-full mt-1 !py-3 !px-4 !text-[13px] active:scale-[0.98]"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Add to cart</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => openInquiryModal(product)}
          className="btn w-full mt-1 !py-3 !px-4 !text-[13px] active:scale-[0.98] inline-flex items-center justify-center gap-1.5 border border-[#2a6ecb] text-[#2a6ecb] hover:bg-[#EBF5FF] rounded-full font-archivo font-bold transition-colors cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Enquire Now</span>
        </button>
      )}
    </motion.div>
  );
};