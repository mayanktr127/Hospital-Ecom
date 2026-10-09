import { Product } from "@/types/product";
import { isMaskEligible } from "./maskAddon";

export const HUMIDIFIER_ADDON_PRICE = 10000;
export const HUMIDIFIER_STANDALONE_PRICE = 12600;

export function isSmartPlusDevice(product?: {
  id?: string;
  slug?: string;
  name?: string;
  title?: string;
}): boolean {
  if (!product) return false;
  const str = `${product.slug || ""} ${product.id || ""} ${product.name || ""} ${product.title || ""}`.toLowerCase();
  return str.includes("smart-plus") || str.includes("smart plus") || str.includes("smart+");
}

export const WHITE_PRISMA_AQUA_PRODUCT: Product = {
  id: "addon-prisma-aqua-humidifier-white",
  name: "Löwenstein Prisma AQUA Heated Humidifier (White)",
  category: "Humidifiers",
  price: HUMIDIFIER_ADDON_PRICE,
  originalPrice: HUMIDIFIER_STANDALONE_PRICE,
  image: "/images/pulmocare/pulmocare_prisma-aqua.png",
  rating: 4.9,
  reviewsCount: 19,
  inStock: true,
  description:
    "Official Löwenstein Prisma AQUA Heated Humidifier (White Edition). Seamless click-in warm air humidification color-matched for Prisma Smart Plus to prevent airway dryness.",
  badge: "Bundle Offer (₹10,000)",
  brand: "Löwenstein Medical",
  specifications: [
    { label: "Type", value: "Warm air humidifier" },
    { label: "Color", value: "White (Matching Prisma Smart Plus)" },
    { label: "Compatibility", value: "Prisma Smart Plus" },
    { label: "Chamber Capacity", value: "400 ml" },
    { label: "Origin", value: "Germany" },
    { label: "Warranty", value: "2 Years Official Warranty" },
  ],
};

export const BLACK_PRISMA_AQUA_PRODUCT: Product = {
  id: "addon-prisma-aqua-humidifier-black",
  name: "Löwenstein Prisma AQUA Heated Humidifier (Black)",
  category: "Humidifiers",
  price: HUMIDIFIER_ADDON_PRICE,
  originalPrice: HUMIDIFIER_STANDALONE_PRICE,
  image: "/images/pulmocare/pulmocare_prisma-aqua-black.png",
  rating: 4.9,
  reviewsCount: 28,
  inStock: true,
  description:
    "Official Löwenstein Prisma AQUA Heated Humidifier (Black Edition). Seamless click-in warm air humidification color-matched for prismaLINE CPAP and BiLevel devices to prevent airway dryness.",
  badge: "Bundle Offer (₹10,000)",
  brand: "Löwenstein Medical",
  specifications: [
    { label: "Type", value: "Warm air humidifier" },
    { label: "Color", value: "Black (Matching prismaLINE devices)" },
    { label: "Compatibility", value: "Prisma Smart, 20A, 25S, 25ST, 30ST, CR, LAB" },
    { label: "Chamber Capacity", value: "400 ml" },
    { label: "Origin", value: "Germany" },
    { label: "Warranty", value: "2 Years Official Warranty" },
  ],
};

// Default backwards-compatible alias (Black edition is the standard for prismaLINE)
export const PRISMA_AQUA_PRODUCT: Product = BLACK_PRISMA_AQUA_PRODUCT;

export function getHumidifierProduct(
  pricingSettings?: {
    humidifierBundlePrice?: number;
    humidifierStandalonePrice?: number;
  },
  hostProductOrColor?: Product | { id?: string; slug?: string; name?: string; title?: string } | "white" | "black"
): Product {
  const price = pricingSettings?.humidifierBundlePrice ?? HUMIDIFIER_ADDON_PRICE;
  const originalPrice = pricingSettings?.humidifierStandalonePrice ?? HUMIDIFIER_STANDALONE_PRICE;

  const isWhite =
    hostProductOrColor === "white" ||
    (typeof hostProductOrColor === "object" &&
      (isSmartPlusDevice(hostProductOrColor) ||
        (hostProductOrColor as any).id === "addon-prisma-aqua-humidifier-white" ||
        ((hostProductOrColor as any).image?.includes("pulmocare_prisma-aqua.png") &&
          !(hostProductOrColor as any).image?.includes("black"))));

  const baseProduct = isWhite ? WHITE_PRISMA_AQUA_PRODUCT : BLACK_PRISMA_AQUA_PRODUCT;

  return {
    ...baseProduct,
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
  return (
    id === "addon-prisma-aqua-humidifier" ||
    id === "addon-prisma-aqua-humidifier-white" ||
    id === "addon-prisma-aqua-humidifier-black" ||
    id === "prisma-aqua" ||
    id === "l-wenstein-prisma-aqua" ||
    id === "l-wenstein-prisma-aqua-black" ||
    id.startsWith("addon-prisma-aqua-humidifier")
  );
}
