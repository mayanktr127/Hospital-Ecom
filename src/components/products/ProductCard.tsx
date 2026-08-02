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
        <div className="flex items-baseline gap-2">
          <span className="now">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <s className="was">
              ${product.originalPrice.toFixed(2)}
            </s>
          )}
        </div>

        <div className="flex items-center gap-1 text-[#f2b134] text-xs font-bold font-archivo">
          <Star className="w-3 h-3 fill-[#f2b134]" />
          <span>{product.rating}</span>
        </div>
      </div>

      {/* Add to Cart CTA */}
      <button
        onClick={() => {
          addToCart(product);
          addToast("Added to Cart", `${product.name} added to your cart.`);
        }}
        className="btn btn-primary add w-full mt-1 !py-3 !px-4 !text-[13px] active:scale-[0.98]"
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        <span>Add to cart</span>
      </button>
    </motion.div>
  );
};