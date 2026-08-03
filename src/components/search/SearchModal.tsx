"use client";

import React, { useState, useEffect } from "react";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ShoppingBag } from "lucide-react";
import Image from "next/image";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectProduct }) => {
  const [query, setQuery] = useState("");
  const { addToCart } = useCart();
  const { addToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery("");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : PRODUCTS.slice(0, 4);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0a1f3c]/50 backdrop-blur-md"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative bg-white w-full max-w-2xl rounded-[28px] shadow-[0_30px_70px_rgba(24,42,65,0.14)] overflow-hidden border border-[#e9edf4] z-10 flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-[#e9edf4] focus-within:border-[#7fb0ee]">
              <Search className="w-5 h-5 text-[#0a1f3c]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Löwenstein ventilation, diagnostics, PPE..."
                autoFocus
                className="w-full bg-transparent border-0 text-[#182a41] font-inter text-base placeholder-[#64748b]"
              />
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#f6f4fb] text-[#64748b] transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content list */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#64748b]">
                  {query ? `Search Results (${filteredProducts.length})` : "Featured Löwenstein Devices"}
                </span>
                <span className="text-xs text-[#64748b]">Press ESC to exit</span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="glass !py-12 text-center text-[#64748b]">
                  <p className="font-archivo font-medium text-lg tracking-[-0.03em] text-[#0a1f3c]">No devices found</p>
                  <p className="text-sm mt-1">Try searching for &quot;microscope&quot;, &quot;oximeter&quot;, or &quot;sanitizer&quot;</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group flex items-center justify-between p-3 rounded-[14px] border border-[#e9edf4] hover:border-[#dcebfb] hover:shadow-[0_16px_44px_rgba(24,42,65,0.09)] transition-all bg-white"
                    >
                      <div
                        onClick={() => {
                          if (onSelectProduct) onSelectProduct(product);
                          onClose();
                        }}
                        className="flex items-center gap-4 cursor-pointer flex-1"
                      >
                        <div className="w-14 h-14 rounded-[14px] bg-gradient-to-br from-[#e9e6fb] to-white flex items-center justify-center p-2 shrink-0 border border-[#e9edf4]">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="object-contain max-h-full product-drop-shadow"
                          />
                        </div>
                        <div>
                          <span className="eyebrow text-[10px]">
                            {product.category}
                          </span>
                          <h4 className="font-archivo font-semibold text-sm text-[#182a41] group-hover:text-[#0a1f3c] transition-colors leading-tight">
                            {product.name}
                          </h4>
                          <span className="font-archivo font-bold text-sm text-[#0a1f3c] mt-0.5 block">
                            ₹{product.price.toLocaleString("en-IN")}.00
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            addToCart(product);
                            addToast("Added to Cart", `${product.name} added to your cart.`);
                          }}
                          className="btn btn-primary !px-4 !py-2.5 !text-[13px]"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};