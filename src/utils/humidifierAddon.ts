import { Product } from "@/types/product";
import { isMaskEligible } from "./maskAddon";

export const HUMIDIFIER_ADDON_PRICE = 10000;
export const HUMIDIFIER_STANDALONE_PRICE = 12600;

export const PRISMA_AQUA_PRODUCT: Product = {
  id: "addon-prisma-aqua-humidifier",
  name: "Löwenstein Prisma AQUA Heated Humidifier",
  category: "Humidifiers",
  price: HUMIDIFIER_ADDON_PRICE,
  originalPrice: HUMIDIFIER_STANDALONE_PRICE,
  image: "/images/pulmocare/pulmocare_prisma-aqua.png",
  rating: 4.9,
  reviewsCount: 19,
  inStock: true,
  description:
    "Official Löwenstein Prisma AQUA Heated Humidifier. Seamless click-in warm air humidification engineered for all prismaLINE CPAP and BiLevel devices to prevent airway dryness.",
  badge: "Bundle Offer (₹10,000)",
  brand: "Löwenstein Medical",
  specifications: [
    { label: "Type", value: "Warm air humidifier" },
    { label: "Compatibility", value: "Prisma Smart, Smart Plus, 20A, 25S, 25ST, 30ST" },
    { label: "Chamber Capacity", value: "400 ml" },
    { label: "Origin", value: "Germany" },
    { label: "Warranty", value: "2 Years Official Warranty" },
  ],
};

export function getHumidifierProduct(pricingSettings?: {
  humidifierBundlePrice?: number;
  humidifierStandalonePrice?: number;
}): Product {
  const price = pricingSettings?.humidifierBundlePrice ?? HUMIDIFIER_ADDON_PRICE;
  const originalPrice = pricingSettings?.humidifierStandalonePrice ?? HUMIDIFIER_STANDALONE_PRICE;
  return {
    ...PRISMA_AQUA_PRODUCT,
    price,
    originalPrice,
    badge: `Bundle Offer (₹${price.toLocaleString("en-IN")})`,
  };
}

export function isHumidifierEligible(product?: {
  id?: string;
  slug?: string;
  name?: string;
  title?: string;
}): boolean {
  return isMaskEligible(product);
}

export function isHumidifierAddonProduct(productOrId?: Product | string): boolean {
  if (!productOrId) return false;
  const id = typeof productOrId === "string" ? productOrId : productOrId.id;
  return id === "addon-prisma-aqua-humidifier" || id === "prisma-aqua";
}
