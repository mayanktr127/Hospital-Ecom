// Products are either sold at a listed price or offered on rental.
// The admin portal sets this per product; when it has never been set,
// the category decides — Sleep Diagnostics and Masks are priced, the
// rest are rental.

const PRICED_CATEGORY_MATCHERS = ["diagnostic", "mask", "ppe"];

export const RENTAL_MESSAGE = "This device is available for rental — please contact us";
export const RENTAL_SHORT_MESSAGE = "Available for rental — please contact";

export const RENTAL_PHONE = "+919343444428";
export const RENTAL_PHONE_DISPLAY = "+91 93434 44428";
export const RENTAL_ENQUIRY_URL = "/professionals/demo-request";

export interface RentalCheckInput {
  category?: string | null;
  isRental?: boolean | null;
}

/** The category default, used when a product has no explicit setting. */
export const isRentalCategory = (category?: string | null): boolean => {
  const categoryText = (category || "").toLowerCase();
  return !PRICED_CATEGORY_MATCHERS.some((matcher) => categoryText.includes(matcher));
};

/**
 * Rental products cannot be purchased online — price, cart and checkout
 * actions are replaced with a contact CTA.
 */
export const isRentalProduct = (product?: RentalCheckInput | null): boolean => {
  if (typeof product?.isRental === "boolean") return product.isRental;
  return isRentalCategory(product?.category);
};
