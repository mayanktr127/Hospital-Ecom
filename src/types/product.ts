export type ProductCategory = 
  | "All"
  | "Ventilation & Sleep"
  | "Diagnostic"
  | "Surgical"
  | "PPE & Protection"
  | "Disinfection"
  | "Personal Care";

export interface ProductSpecification {
  label: string;
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
  description: string;
  specifications: ProductSpecification[];
  badge?: string;
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
