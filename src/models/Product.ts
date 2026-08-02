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
  description: string;
  specifications: { key: string; value: string }[];
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
    description: { type: String, required: true },
    specifications: [
      {
        key: { type: String },
        value: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);
