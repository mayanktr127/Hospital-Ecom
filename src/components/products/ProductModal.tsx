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
          className="fixed inset-0 bg-[#001E36]/50 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative bg-white w-full max-w-3xl rounded-[34px] shadow-[0_28px_60px_-24px_rgba(0,56,101,0.35)] overflow-hidden border border-[#003865]/10 z-10 my-8"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-[#003865]/10 flex items-center justify-center text-[#4A607A] hover:text-[#003865] hover:bg-white transition-all shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Thumbnail container with ground shadow */}
            <div className="bg-gradient-to-br from-[#D8E7F3] via-[#F0F6FA] to-white p-8 flex flex-col items-center justify-center relative min-h-[320px]">
              {product.badge && (
                <span className="absolute top-4 left-4 bg-[#003865] text-white text-[11px] font-bold font-archivo uppercase tracking-wider px-3 py-1 rounded-full">
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
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#007AC1]">
                    {product.category}
                  </span>

                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold font-archivo">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{product.rating}</span>
                    <span className="text-[#4A607A] font-normal">({product.reviewsCount})</span>
                  </div>
                </div>

                <h2 className="font-archivo font-extrabold text-2xl text-[#0A192F] mt-1 leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-baseline gap-3 mt-3">
                  <span className="font-archivo font-bold text-2xl text-[#003865]">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <s className="text-sm font-archivo text-[#4A607A]/60 font-medium">
                      ${product.originalPrice.toFixed(2)}
                    </s>
                  )}
                  <span className="ml-auto text-xs font-semibold text-[#003865] bg-[#F0F6FA] px-2.5 py-0.5 rounded-full border border-[#003865]/15">
                    Löwenstein Certified
                  </span>
                </div>

                <p className="text-xs text-[#4A607A] mt-3 leading-relaxed">
                  {product.description}
                </p>

                {/* Specifications sheet */}
                <div className="mt-5 pt-4 border-t border-[#003865]/08">
                  <h4 className="text-xs font-bold font-archivo text-[#003865] uppercase tracking-wider mb-2">
                    German Technical Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {product.specifications.map((spec, i) => (
                      <div key={i} className="bg-[#F8FAFC] p-2 rounded-xl border border-[#003865]/05">
                        <span className="text-[#4A607A] block text-[10px] uppercase font-semibold">{spec.label}</span>
                        <span className="font-archivo font-bold text-[#0A192F] block mt-0.5">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Quantity selector */}
                  <div className="flex items-center border border-[#003865]/10 rounded-full bg-[#F8FAFC] h-11 px-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[#4A607A] hover:text-[#003865] hover:bg-[#003865]/05 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-archivo font-bold text-sm text-[#003865]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[#4A607A] hover:text-[#003865] hover:bg-[#003865]/05 transition-colors"
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
                    className="flex-1 py-3 px-6 rounded-full bg-[#003865] text-white font-inter font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#005A9C] shadow-[0_12px_26px_-14px_#003865] active:scale-[0.98] transition-all"
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
                    className={`p-3 rounded-full border border-[#003865]/10 transition-colors ${
                      favorite ? "bg-rose-50 text-rose-600 border-rose-200" : "bg-white text-[#0A192F] hover:bg-[#003865]/05"
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${favorite ? "fill-rose-600" : ""}`} />
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
