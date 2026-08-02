import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  id: string;
  productId: string;
  productName: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  status: string;
}

const ReviewSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    author: { type: String, required: true },
    rating: { type: Number, required: true, default: 5 },
    comment: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, default: "Approved" },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
