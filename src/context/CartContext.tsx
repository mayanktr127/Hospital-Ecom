"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "@/types/product";
import {
  MaskOptionType,
  getMaskAddonInfo,
  calculateEffectiveUnitPrice,
} from "@/utils/maskAddon";

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, quantity?: number, maskOption?: MaskOptionType) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateMaskOption: (productId: string, maskOption: MaskOptionType) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  freeShippingThreshold: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("medcore_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to load cart", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("medcore_cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addToCart = (product: Product, quantity = 1, maskOption?: MaskOptionType) => {
    const maskInfo = getMaskAddonInfo(product);
    // Auto-select nasal mask (+₹3,000) by default for the 6 eligible products
    const effectiveMaskOption: MaskOptionType | undefined = maskInfo.isEligible
      ? (maskOption ?? "nasal")
      : maskOption;

    const unitPrice = maskInfo.isEligible
      ? calculateEffectiveUnitPrice(product, effectiveMaskOption || "nasal")
      : (product.price || 0);

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        if (effectiveMaskOption) {
          newCart[existingIndex].maskOption = effectiveMaskOption;
          newCart[existingIndex].unitPrice = unitPrice;
        }
        return newCart;
      }
      return [
        ...prevCart,
        {
          product,
          quantity,
          maskOption: effectiveMaskOption,
          unitPrice,
        },
      ];
    });
    setIsOpen(true);
  };

  const updateMaskOption = (productId: string, maskOption: MaskOptionType) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId) {
          const newUnitPrice = calculateEffectiveUnitPrice(item.product, maskOption);
          return {
            ...item,
            maskOption,
            unitPrice: newUnitPrice,
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => {
    const price = item.unitPrice ?? item.product.price ?? 0;
    return acc + price * item.quantity;
  }, 0);
  const freeShippingThreshold = 150.00;

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateMaskOption,
        clearCart,
        totalItems,
        subtotal,
        freeShippingThreshold,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
