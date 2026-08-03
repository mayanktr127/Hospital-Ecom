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
            className="fixed inset-0 bg-[#0a1f3c]/50 backdrop-blur-md"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
              className="w-screen max-w-md bg-white shadow-[0_30px_70px_rgba(24,42,65,0.14)] border-l border-[#e9edf4] flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-[#e9edf4] flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#dc4b56] fill-[#dc4b56]" />
                  <h3 className="font-archivo font-medium text-xl tracking-[-0.03em] text-[#0a1f3c]">Saved Devices</h3>
                  <span className="bg-[#dcebfb] text-[#0a1f3c] text-xs font-bold px-2.5 py-0.5 rounded-full font-archivo">
                    {wishlist.length}
                  </span>
                </div>
                <button
                  onClick={closeWishlist}
                  className="p-2 rounded-full hover:bg-[#f6f4fb] text-[#64748b] transition-colors"
                  aria-label="Close saved items"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="glass h-full flex flex-col items-center justify-center text-center text-[#64748b] !py-12">
                    <div className="w-16 h-16 rounded-full bg-[#fbe6ee] flex items-center justify-center mb-4 text-[#dc4b56]">
                      <Heart className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <h4 className="font-archivo font-medium text-lg tracking-[-0.03em] text-[#0a1f3c]">No saved equipment yet</h4>
                    <p className="text-xs max-w-xs mt-1 text-[#64748b]">
                      Click the heart icon on any product to save it to your procurement shortlist.
                    </p>
                  </div>
                ) : (
                  wishlist.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-3 bg-white border border-[#e9edf4] rounded-[14px] shadow-[0_2px_8px_rgba(24,42,65,0.05)]"
                    >
                      <div className="w-16 h-16 rounded-[14px] bg-gradient-to-br from-[#e9e6fb] to-white flex items-center justify-center p-2 shrink-0 border border-[#e9edf4]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={56}
                          height={56}
                          className="object-contain max-h-full product-drop-shadow"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-archivo font-semibold text-xs text-[#182a41] line-clamp-1">
                          {product.name}
                        </h4>
                        <span className="font-archivo font-bold text-sm text-[#0a1f3c] block mt-0.5">
                          ₹{product.price.toLocaleString("en-IN")}.00
                        </span>

                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => {
                              addToCart(product);
                              removeFromWishlist(product.id);
                              addToast("Moved to Cart", `${product.name} moved to your shopping cart.`);
                            }}
                            className="btn btn-primary !px-4 !py-2.5 !text-[13px]"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Move to Cart</span>
                          </button>

                          <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="p-1 text-[#64748b] hover:text-[#dc4b56] transition-colors ml-auto"
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