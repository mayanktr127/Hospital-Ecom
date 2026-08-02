import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  isFeatured?: boolean;
  isOffer?: boolean;
  description: string;
  specifications: { label?: string; key?: string; value: string }[];
  badge?: string;
  brand?: string;
  sku?: string;
  features?: string[];
  boxContents?: string[];
  warranty?: string;
  brochureUrl?: string;
}

const ProductSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    image: { type: String, required: true },
    rating: { type: Number, default: 5 },
    reviewsCount: { type: Number, default: 4 },
    inStock: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    isOffer: { type: Boolean, default: false },
    description: { type: String, required: true },
    features: [{ type: String }],
    specifications: [
      {
        label: { type: String },
        key: { type: String },
        value: { type: String },
      },
    ],
    badge: { type: String },
    brand: { type: String },
    sku: { type: String },
    boxContents: [{ type: String }],
    warranty: { type: String },
    brochureUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
