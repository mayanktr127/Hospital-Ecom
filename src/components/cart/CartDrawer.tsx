"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";

export const CartDrawer: React.FC = () => {
  const { cart, isOpen, closeCart, removeFromCart, updateQuantity, subtotal, totalItems, freeShippingThreshold } = useCart();
  const { addToast } = useToast();

  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
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
                  <ShoppingBag className="w-5 h-5 text-[#003865]" />
                  <h3 className="font-archivo font-bold text-xl text-[#003865]">Procurement Cart</h3>
                  <span className="bg-[#D8E7F3] text-[#003865] text-xs font-bold px-2.5 py-0.5 rounded-full font-archivo">
                    {totalItems}
                  </span>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-[#003865]/05 text-[#4A607A] transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free shipping banner */}
              <div className="px-6 py-3 bg-[#F0F6FA] border-b border-[#003865]/06">
                <div className="flex items-center gap-2 text-xs font-inter text-[#003865] font-medium mb-1.5">
                  <Truck className="w-4 h-4 shrink-0 text-[#007AC1]" />
                  {remainingForFreeShipping > 0 ? (
                    <span>Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more for <strong>FREE Priority Express Shipping</strong></span>
                  ) : (
                    <span className="font-bold text-[#003865]">You unlocked FREE Express Priority Shipping! 🚚</span>
                  )}
                </div>
                <div className="w-full bg-white/80 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#007AC1] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-[#4A607A] py-12">
                    <div className="w-16 h-16 rounded-full bg-[#F0F6FA] flex items-center justify-center mb-4 text-[#003865]">
                      <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <h4 className="font-archivo font-bold text-lg text-[#003865]">Your cart is empty</h4>
                    <p className="text-xs max-w-xs mt-1 text-[#4A607A]">
                      Explore our Löwenstein Medical hardware catalog and add items to your cart.
                    </p>
                  </div>
                ) : (
                  cart.map(({ product, quantity }) => (
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
                          ${(product.price * quantity).toFixed(2)}
                        </span>

                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-[#003865]/10 rounded-full bg-[#F8FAFC] h-7 px-1">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="w-5 h-5 rounded-full flex items-center justify-center text-[#4A607A] hover:text-[#003865] hover:bg-[#003865]/05 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-archivo font-bold text-[#003865]">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="w-5 h-5 rounded-full flex items-center justify-center text-[#4A607A] hover:text-[#003865] hover:bg-[#003865]/05 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(product.id)}
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

              {/* Footer / Checkout */}
              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-[#003865]/08 space-y-4">
                  <div className="space-y-1.5 text-xs text-[#4A607A]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-archivo font-semibold text-[#0A192F]">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Tax (8%)</span>
                      <span className="font-archivo font-semibold text-[#0A192F]">${(subtotal * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#003865]/06 text-[#0A192F]">
                      <span>Total</span>
                      <span className="font-archivo text-base text-[#003865]">
                        ${(subtotal * 1.08).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      addToast("Löwenstein Order Submitted!", "Your clinical procurement order has been logged.");
                      closeCart();
                    }}
                    className="w-full py-4 rounded-full bg-[#003865] text-white font-inter font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#005A9C] shadow-[0_12px_26px_-14px_#003865] active:scale-[0.98] transition-all"
                  >
                    <span>Proceed to Hospital Procurement</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#4A607A] font-medium pt-1">
                    <ShieldCheck className="w-4 h-4 text-[#007AC1]" />
                    <span>256-Bit ISO Encrypted Procurement Portal</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
