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
            className="fixed inset-0 bg-[#001E36]/50 backdrop-blur-md"
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative bg-white w-full max-w-2xl rounded-[34px] shadow-[0_28px_60px_-24px_rgba(0,56,101,0.35)] overflow-hidden border border-[#003865]/10 z-10 flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-[#003865]/08">
              <Search className="w-5 h-5 text-[#003865]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Löwenstein ventilation, diagnostics, PPE..."
                autoFocus
                className="w-full bg-transparent border-0 outline-none text-[#0A192F] font-inter text-base placeholder-[#4A607A]/60"
              />
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#003865]/05 text-[#4A607A] transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content list */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#4A607A]">
                  {query ? `Search Results (${filteredProducts.length})` : "Featured Löwenstein Devices"}
                </span>
                <span className="text-xs text-[#4A607A]">Press ESC to exit</span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center text-[#4A607A]">
                  <p className="font-archivo font-bold text-lg text-[#003865]">No devices found</p>
                  <p className="text-sm mt-1">Try searching for &quot;microscope&quot;, &quot;oximeter&quot;, or &quot;sanitizer&quot;</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group flex items-center justify-between p-3 rounded-2xl border border-[#003865]/06 hover:border-[#003865]/30 hover:shadow-[0_4px_8px_rgba(0,56,101,0.05)] transition-all bg-[#F8FAFC]"
                    >
                      <div
                        onClick={() => {
                          if (onSelectProduct) onSelectProduct(product);
                          onClose();
                        }}
                        className="flex items-center gap-4 cursor-pointer flex-1"
                      >
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D8E7F3] to-white flex items-center justify-center p-2 shrink-0 border border-[#003865]/05">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="object-contain max-h-full product-drop-shadow"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#007AC1]">
                            {product.category}
                          </span>
                          <h4 className="font-archivo font-semibold text-sm text-[#0A192F] group-hover:text-[#003865] transition-colors leading-tight">
                            {product.name}
                          </h4>
                          <span className="font-archivo font-bold text-sm text-[#003865] mt-0.5 block">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            addToCart(product);
                            addToast("Added to Cart", `${product.name} added to your cart.`);
                          }}
                          className="px-3 py-2 rounded-full bg-[#003865] text-white text-xs font-inter font-semibold flex items-center gap-1.5 hover:bg-[#005A9C] transition-colors shadow-sm"
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
