"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { ShoppingBag, Heart, Eye, Star } from "lucide-react";
import { motion } from "motion/react";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useWishlist();
  const { addToast } = useToast();

  const favorite = isFavorite(product.id);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
      className="group bg-white border border-[#003865]/08 rounded-[24px] p-5 flex flex-col gap-3 shadow-[0_2px_4px_rgba(0,56,101,0.04),0_12px_28px_-12px_rgba(0,56,101,0.18)] hover:shadow-[0_4px_8px_rgba(0,56,101,0.05),0_28px_60px_-24px_rgba(0,56,101,0.35)] transition-shadow relative"
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
        className={`absolute top-6 right-6 z-10 w-8 h-8 rounded-full border border-[#003865]/10 flex items-center justify-center transition-all ${
          favorite ? "bg-rose-50 text-rose-600 border-rose-200" : "bg-white/90 backdrop-blur-md text-[#4A607A] hover:text-[#003865]"
        }`}
        aria-label="Toggle wishlist"
      >
        <Heart className={`w-4 h-4 ${favorite ? "fill-rose-600" : ""}`} />
      </button>

      {/* Thumbnail with pseudo ground shadow */}
      <div
        onClick={() => onQuickView(product)}
        className="bg-gradient-to-br from-[#D8E7F3] to-white rounded-[16px] h-[175px] flex items-center justify-center p-4 relative overflow-hidden cursor-pointer thumb-ground-shadow"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={155}
          height={155}
          className="max-h-full max-w-full object-contain mix-blend-multiply drop-shadow-[0_16px_12px_rgba(0,56,101,0.22)] group-hover:scale-105 group-hover:-translate-y-1.5 transition-transform duration-500"
        />

        {/* Quick View overlay badge */}
        <div className="absolute inset-0 bg-[#003865]/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white text-[#003865] font-archivo font-bold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </span>
        </div>
      </div>

      {/* Category Eyebrow & Title */}
      <div className="mt-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#007AC1] block">
          {product.category}
        </span>
        <h4
          onClick={() => onQuickView(product)}
          className="font-archivo font-semibold text-[15px] leading-snug text-[#0A192F] group-hover:text-[#003865] transition-colors cursor-pointer line-clamp-1 mt-0.5"
        >
          {product.name}
        </h4>
      </div>

      {/* Rating & Price */}
      <div className="flex items-center justify-between pt-1">
        <div className="font-archivo font-bold text-base text-[#003865] flex items-baseline gap-2">
          <span>${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <s className="font-normal text-xs text-[#4A607A]/60">
              ${product.originalPrice.toFixed(2)}
            </s>
          )}
        </div>

        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold font-archivo">
          <Star className="w-3 h-3 fill-amber-500" />
          <span>{product.rating}</span>
        </div>
      </div>

      {/* Add to Cart CTA */}
      <button
        onClick={() => {
          addToCart(product);
          addToast("Added to Cart", `${product.name} added to your cart.`);
        }}
        className="w-full py-2.5 px-4 rounded-full bg-[#003865] text-white font-inter font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#005A9C] shadow-[0_12px_26px_-14px_#003865] active:scale-[0.98] transition-all mt-1"
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        <span>Add to cart</span>
      </button>
    </motion.div>
  );
};
