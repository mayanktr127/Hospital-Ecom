"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
                  <ShoppingBag className="w-5 h-5 text-[#0a1f3c]" />
                  <h3 className="font-archivo font-medium text-xl tracking-[-0.03em] text-[#0a1f3c]">Procurement Cart</h3>
                  <span className="bg-[#dcebfb] text-[#0a1f3c] text-xs font-bold px-2.5 py-0.5 rounded-full font-archivo">
                    {totalItems}
                  </span>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 rounded-full hover:bg-[#f6f4fb] text-[#64748b] transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free shipping banner */}
              <div className="px-6 py-3 bg-white border-b border-[#e9edf4]">
                <div className="flex items-center gap-2 text-xs font-inter text-[#0a1f3c] font-medium mb-1.5">
                  <Truck className="w-4 h-4 shrink-0 text-[#2a6ecb]" />
                  {remainingForFreeShipping > 0 ? (
                    <span>Add <strong>₹{remainingForFreeShipping.toLocaleString("en-IN")}.00</strong> more for <strong>FREE Priority Express Shipping</strong></span>
                  ) : (
                    <span className="font-bold text-[#1fb37a]">You unlocked FREE Express Priority Shipping! 🚚</span>
                  )}
                </div>
                <div className="w-full bg-[#e9edf4] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#2a6ecb] h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="glass h-full flex flex-col items-center justify-center text-center text-[#64748b] !py-12">
                    <div className="w-16 h-16 rounded-full bg-[#dcebfb] flex items-center justify-center mb-4 text-[#2a6ecb]">
                      <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                    </div>
                    <h4 className="font-archivo font-medium text-lg tracking-[-0.03em] text-[#0a1f3c]">Your cart is empty</h4>
                    <p className="text-xs max-w-xs mt-1 text-[#64748b]">
                      Explore our Löwenstein Medical hardware catalog and add items to your cart.
                    </p>
                  </div>
                ) : (
                  cart.map(({ product, quantity }) => (
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
                          ₹{(product.price * quantity).toLocaleString("en-IN")}.00
                        </span>

                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-[#e9edf4] rounded-full bg-white h-7 px-1">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="w-5 h-5 rounded-full flex items-center justify-center text-[#64748b] hover:text-[#0a1f3c] hover:bg-[#f6f4fb] transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-archivo font-bold text-[#0a1f3c]">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="w-5 h-5 rounded-full flex items-center justify-center text-[#64748b] hover:text-[#0a1f3c] hover:bg-[#f6f4fb] transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(product.id)}
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

              {/* Footer / Checkout */}
              {cart.length > 0 && (
                <div className="p-6 bg-white border-t border-[#e9edf4] space-y-4">
                  <div className="space-y-1.5 text-xs text-[#64748b]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-archivo font-semibold text-[#182a41]">₹{subtotal.toLocaleString("en-IN")}.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Clinical Express Delivery</span>
                      <span className="font-archivo font-bold text-[#1fb37a] uppercase">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold pt-2 border-t border-[#e9edf4] text-[#182a41]">
                      <span>Total Amount</span>
                      <span className="font-archivo text-base text-[#0a1f3c]">
                        ₹{subtotal.toLocaleString("en-IN")}.00
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="btn btn-primary w-full active:scale-[0.98] cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#64748b] font-medium pt-1">
                    <ShieldCheck className="w-4 h-4 text-[#2a6ecb]" />
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