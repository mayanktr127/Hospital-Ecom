"use client";

import React, { useState } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Heart, Star, Plus, Minus } from "lucide-react";
import Image from "next/image";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useWishlist();
  const { addToast } = useToast();

  if (!product) return null;
  const favorite = isFavorite(product.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0a1f3c]/50 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative bg-white w-full max-w-3xl rounded-[28px] shadow-[0_30px_70px_rgba(24,42,65,0.14)] overflow-hidden border border-[#e9edf4] z-10 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-[#e9edf4] flex items-center justify-center text-[#64748b] hover:text-[#2a6ecb] hover:bg-white transition-all shadow-[0_2px_8px_rgba(24,42,65,0.05)]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Thumbnail container with ground shadow */}
            <div className="bg-gradient-to-br from-[#e9e6fb] via-[#dcebfb] to-white p-8 flex flex-col items-center justify-center relative min-h-[320px]">
              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#0a1f3c] text-white text-[11px] font-bold font-archivo uppercase tracking-wider px-3 py-1 rounded-full">
                  {product.badge}
                </span>
              )}

              <div className="relative w-full max-w-[240px] aspect-square flex items-center justify-center thumb-ground-shadow">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={240}
                  height={240}
                  className="object-contain max-h-full product-drop-shadow hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Right: Content details */}
            <div className="p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-[11px]">
                    {product.category}
                  </span>

                  <div className="flex items-center gap-1 text-[#f2b134] text-xs font-bold font-archivo">
                    <Star className="w-3.5 h-3.5 fill-[#f2b134] text-[#f2b134]" />
                    <span>{product.rating}</span>
                    <span className="text-[#64748b] font-normal">({product.reviewsCount})</span>
                  </div>
                </div>

                <h2 className="font-archivo font-medium text-[28px] tracking-[-0.04em] text-[#0a1f3c] mt-1 leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-3 mt-3">
                  <span className="font-archivo font-bold text-2xl text-[#0a1f3c]">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <s className="text-sm font-inter text-[#64748b] font-medium">
                      ${product.originalPrice.toFixed(2)}
                    </s>
                  )}
                  <span className="ml-auto text-xs font-semibold text-[#2a6ecb] bg-[#dcebfb] px-2.5 py-1 rounded-full">
                    Löwenstein Certified
                  </span>
                </div>

                <p className="text-xs text-[#64748b] mt-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Specifications sheet */}
                <div className="mt-5 pt-4 border-t border-[#e9edf4]">
                  <h4 className="text-xs font-bold font-archivo text-[#0a1f3c] uppercase tracking-wider mb-2">
                    German Technical Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {product.specifications.map((spec, i) => (
                      <div key={i} className="bg-[#f6f4fb] p-2.5 rounded-[14px] border border-[#e9edf4]">
                        <span className="text-[#64748b] block text-[10px] uppercase font-semibold">{spec.label}</span>
                        <span className="font-archivo font-bold text-[#182a41] block mt-0.5">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-[#e9edf4] rounded-full bg-white h-11 px-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[#64748b] hover:text-[#0a1f3c] hover:bg-[#f6f4fb] transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-archivo font-bold text-sm text-[#0a1f3c]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[#64748b] hover:text-[#0a1f3c] hover:bg-[#f6f4fb] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                      addToast("Added to Cart", `${quantity}x ${product.name} added to your cart.`);
                      onClose();
                    }}
                    className="btn btn-primary flex-1 active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart — ${(product.price * quantity).toFixed(2)}</span>
                  </button>

                  <button
                    onClick={() => {
                      toggleFavorite(product);
                      addToast(
                        favorite ? "Removed from Wishlist" : "Saved to Wishlist",
                        favorite ? `${product.name} removed.` : `${product.name} saved to your shortlist.`
                      );
                    }}
                    className={`p-3 rounded-full border transition-colors ${
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
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};