"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "@/types/product";
import {
  MaskOptionType,
  getMaskAddonInfo,
  calculateEffectiveUnitPrice,
  getMaskProduct,
  isMaskAddonProduct,
} from "@/utils/maskAddon";
import {
  isHumidifierEligible,
  isHumidifierAddonProduct,
  PRISMA_AQUA_PRODUCT,
  getHumidifierProduct,
} from "@/utils/humidifierAddon";
import { useAdmin } from "./AdminContext";

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (
    product: Product,
    quantity?: number,
    maskOption?: MaskOptionType,
    includeHumidifier?: boolean
  ) => void;
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
  const { pricingSettings } = useAdmin();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("medcore_cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart) as CartItem[];
        // Sanitize: ensure eligible products use pure basePrice, not stale bundled prices
        const sanitized = parsed.map((item) => {
          const info = getMaskAddonInfo(item.product);
          if (info.isEligible) {
            const actualBase =
              typeof item.product.price === "number" && item.product.price > 0
                ? item.product.price
                : info.basePrice;
            return {
              ...item,
              product: { ...item.product, price: actualBase },
              unitPrice: actualBase,
              maskOption: item.maskOption || "nasal",
            };
          }
          if (isMaskAddonProduct(item.product)) {
            const maskProd = getMaskProduct(item.product.id.includes("full-face") ? "full-face" : "nasal", pricingSettings);
            if (maskProd) {
              return {
                ...item,
                product: maskProd,
                unitPrice: maskProd.price,
              };
            }
          }
          if (isHumidifierAddonProduct(item.product)) {
            const humProd = getHumidifierProduct(pricingSettings, item.product);
            return {
              ...item,
              product: humProd,
              unitPrice: humProd.price,
            };
          }
          return item;
        });
        setCart(sanitized);
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

  const addToCart = (
    product: Product,
    quantity = 1,
    maskOption: MaskOptionType = "nasal",
    includeHumidifier = false
  ) => {
    const maskInfo = getMaskAddonInfo(product);

    // Dynamic base price for the machine (prefer current product.price if set)
    const baseDevicePrice =
      typeof product.price === "number" && product.price > 0
        ? product.price
        : maskInfo.isEligible
        ? maskInfo.basePrice
        : 0;
    const deviceProduct: Product = maskInfo.isEligible
      ? { ...product, price: baseDevicePrice }
      : product;

    const effectiveMaskOption: MaskOptionType = maskInfo.isEligible
      ? (maskOption === "full-face" ? "full-face" : "nasal")
      : "none";

    setCart((prevCart) => {
      let updatedCart = [...prevCart];

      // 1. Add or update the device in the cart
      const existingDeviceIdx = updatedCart.findIndex((item) => item.product.id === product.id);
      if (existingDeviceIdx > -1) {
        updatedCart[existingDeviceIdx] = {
          ...updatedCart[existingDeviceIdx],
          product: deviceProduct,
          quantity: updatedCart[existingDeviceIdx].quantity + quantity,
          maskOption: effectiveMaskOption,
          unitPrice: baseDevicePrice,
        };
      } else {
        updatedCart.push({
          product: deviceProduct,
          quantity,
          maskOption: effectiveMaskOption,
          unitPrice: baseDevicePrice,
        });
      }

      // 2. Manage the Mask Product in the cart
      if (maskInfo.isEligible) {
        // Remove any existing mask add-on items first
        updatedCart = updatedCart.filter((item) => !isMaskAddonProduct(item.product));

        // If user chose a mask (Nasal or Full Face), insert it right after the device
        if (effectiveMaskOption !== "none") {
          const maskProduct = getMaskProduct(effectiveMaskOption, pricingSettings);
          if (maskProduct) {
            const devIdx = updatedCart.findIndex((item) => item.product.id === product.id);
            const targetQty = devIdx > -1 ? updatedCart[devIdx].quantity : quantity;
            const maskItem: CartItem = {
              product: maskProduct,
              quantity: targetQty,
              unitPrice: maskProduct.price,
            };
            if (devIdx > -1) {
              updatedCart.splice(devIdx + 1, 0, maskItem);
            } else {
              updatedCart.push(maskItem);
            }
          }
        }
      }

      // 3. Manage the Humidifier Add-on in the cart
      if (isHumidifierEligible(product)) {
        // Remove previous humidifier bundle add-on
        updatedCart = updatedCart.filter((item) => !isHumidifierAddonProduct(item.product));

        if (includeHumidifier) {
          const humidProduct = getHumidifierProduct(pricingSettings, product);
          const devIdx = updatedCart.findIndex((item) => item.product.id === product.id);
          const targetQty = devIdx > -1 ? updatedCart[devIdx].quantity : quantity;
          const humidifierItem: CartItem = {
            product: humidProduct,
            quantity: targetQty,
            unitPrice: humidProduct.price,
          };
          if (devIdx > -1) {
            // Insert after mask if present, or right after device
            const insertIdx = devIdx + (effectiveMaskOption !== "none" ? 2 : 1);
            updatedCart.splice(Math.min(insertIdx, updatedCart.length), 0, humidifierItem);
          } else {
            updatedCart.push(humidifierItem);
          }
        }
      }

      return updatedCart;
    });

    setIsOpen(true);
  };

  const updateMaskOption = (productId: string, maskOption: MaskOptionType) => {
    const safeMaskOption: MaskOptionType = maskOption === "full-face" ? "full-face" : "nasal";
    setCart((prevCart) => {
      let updatedCart = [...prevCart];

      // 1. Update the machine's maskOption and get its current quantity
      let targetQuantity = 1;
      updatedCart = updatedCart.map((item) => {
        if (item.product.id === productId) {
          targetQuantity = item.quantity;
          const maskInfo = getMaskAddonInfo(item.product);
          const baseDevicePrice = maskInfo.isEligible ? maskInfo.basePrice : (item.product.price || 0);
          return {
            ...item,
            product: { ...item.product, price: baseDevicePrice },
            unitPrice: baseDevicePrice,
            maskOption: safeMaskOption,
          };
        }
        return item;
      });

      // 2. Remove all previous mask addon items from the cart
      updatedCart = updatedCart.filter((item) => !isMaskAddonProduct(item.product));

      // 3. Insert the selected mask product right after the device
      const maskProduct = getMaskProduct(safeMaskOption, pricingSettings);
      if (maskProduct) {
        const newDeviceIdx = updatedCart.findIndex((item) => item.product.id === productId);
        const maskItem: CartItem = {
          product: maskProduct,
          quantity: targetQuantity,
          unitPrice: maskProduct.price,
        };
        if (newDeviceIdx > -1) {
          updatedCart.splice(newDeviceIdx + 1, 0, maskItem);
        } else {
          updatedCart.push(maskItem);
        }
      }

      return updatedCart;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      // If user removes a mask addon directly with the trash button, revert to default nasal mask
      if (isMaskAddonProduct(productId)) {
        return prevCart.map((item) => {
          if (getMaskAddonInfo(item.product).isEligible) {
            return { ...item, maskOption: "nasal" };
          }
          if (isMaskAddonProduct(item.product)) {
            const nasalProduct = getMaskProduct("nasal", pricingSettings) || item.product;
            return { ...item, product: nasalProduct, unitPrice: nasalProduct.price };
          }
          return item;
        });
      }

      // If user removes an eligible machine, also remove any mask addon items and bundled humidifier
      const isEligibleDevice = prevCart.some(
        (item) => item.product.id === productId && getMaskAddonInfo(item.product).isEligible
      );

      if (isEligibleDevice) {
        return prevCart.filter(
          (item) =>
            item.product.id !== productId &&
            !isMaskAddonProduct(item.product) &&
            item.product.id !== PRISMA_AQUA_PRODUCT.id
        );
      }

      return prevCart.filter((item) => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const isEligibleDevice = prevCart.some(
        (item) => item.product.id === productId && getMaskAddonInfo(item.product).isEligible
      );

      return prevCart.map((item) => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }
        // Sync mask addon and bundled humidifier quantity with the device quantity
        if (
          isEligibleDevice &&
          (isMaskAddonProduct(item.product) || item.product.id === PRISMA_AQUA_PRODUCT.id)
        ) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => {
    const price = item.product.price || 0;
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
