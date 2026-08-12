export type ProductCategory = 
  | "All"
  | "Ventilation & Sleep"
  | "Diagnostic"
  | "Surgical"
  | "PPE & Protection"
  | "Disinfection"
  | "Personal Care";

export interface ProductSpecification {
  key?: string;
  label?: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  isFeatured?: boolean;
  isOffer?: boolean;
  /**
   * true  = rental only, shows "available for rental — please contact"
   * false = sold at the listed price
   * undefined = fall back to the category default (see utils/rental.ts)
   */
  isRental?: boolean;
  description: string;
  features?: string[];
  specifications: ProductSpecification[];
  badge?: string;
  brand?: string;
  sku?: string;
  boxContents?: string[];
  warranty?: string;
  brochureUrl?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: "success" | "info" | "warning" | "error";
}
