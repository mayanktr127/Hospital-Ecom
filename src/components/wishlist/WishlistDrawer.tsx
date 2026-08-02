"use client";

import React from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";

export const WishlistDrawer: React.FC = () => {
  const { wishlist, isOpen, closeWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWishlist}
            className="fixed inset-0 bg-[#001E36]/50 backdrop-blur-md"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
              className="w-screen max-w-md bg-[#F8FAFC] shadow-[0_28px_60px_-24px_rgba(0,56,101,0.35)] border-l border-[#003865]/10 flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-[#003865]/08 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                  <h3 className="font-archivo font-bold text-xl text-[#003865]">Saved Devices</h3>
                  <span className="bg-[#D8E7F3] text-[#003865] text-xs font-bold px-2.5 py-0.5 rounded-full font-archivo">
                    {wishlist.length}
                  </span>
                </div>
                <button
                  onClick={closeWishlist}
                  className="p-2 rounded-full hover:bg-[#003865]/05 text-[#4A607A] transition-colors"
                  aria-label="Close saved items"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-[#4A607A] py-12">
                    <div className="w-16 h-16 rounded-full bg-[#F0F6FA] flex items-center justify-center mb-4 text-[#003865]">
                      <Heart className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <h4 className="font-archivo font-bold text-lg text-[#003865]">No saved equipment yet</h4>
                    <p className="text-xs max-w-xs mt-1 text-[#4A607A]">
                      Click the heart icon on any product to save it to your procurement shortlist.
                    </p>
                  </div>
                ) : (
                  wishlist.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-3 bg-white border border-[#003865]/06 rounded-2xl shadow-[0_2px_4px_rgba(0,56,101,0.04)]"
                    >
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#D8E7F3] to-white flex items-center justify-center p-2 shrink-0 border border-[#003865]/05">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={56}
                          height={56}
                          className="object-contain max-h-full product-drop-shadow"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-archivo font-semibold text-xs text-[#0A192F] line-clamp-1">
                          {product.name}
                        </h4>
                        <span className="font-archivo font-bold text-sm text-[#003865] block mt-0.5">
                          ${product.price.toFixed(2)}
                        </span>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => {
                              addToCart(product);
                              removeFromWishlist(product.id);
                              addToast("Moved to Cart", `${product.name} moved to your shopping cart.`);
                            }}
                            className="px-3 py-1.5 rounded-full bg-[#003865] text-white text-xs font-inter font-semibold flex items-center gap-1 hover:bg-[#005A9C] transition-colors"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Move to Cart</span>
                          </button>

                          <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="p-1 text-[#4A607A] hover:text-red-600 transition-colors ml-auto"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
