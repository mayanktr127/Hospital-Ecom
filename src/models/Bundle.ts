import mongoose, { Schema, Document } from "mongoose";

export interface IBundleItem {
  productId: string;
  name: string;
  category: string;
  image: string;
  catalogPrice?: number | null;
  customPrice: number;
  quantity: number;
  subtotal: number;
}

export interface IBundlePaymentDetails {
  paymentMethod: "card" | "upi" | "netbanking" | "cod";
  transactionId: string;
  paidAt: Date;
  paidAmount: number;
  payerName: string;
  payerPhone: string;
  payerEmail: string;
  shippingAddress: string;
  city: string;
  state: string;
  pincode: string;
  orderId?: string;
}

export interface IBundle extends Document {
  bundleId: string;
  title: string;
  description?: string;
  clientName?: string;
  clientEmail?: string;
  clientPhone?: string;
  items: IBundleItem[];
  totalAmount: number;
  discountAmount?: number;
  status: "active" | "paid" | "expired" | "cancelled";
  expiresAt?: Date;
  paymentDetails?: IBundlePaymentDetails;
  createdAt: Date;
  updatedAt: Date;
}

const BundleItemSchema = new Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, default: "Medical Equipment" },
  image: { type: String, required: true },
  catalogPrice: { type: Number, default: null },
  customPrice: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  subtotal: { type: Number, required: true },
});

const BundlePaymentDetailsSchema = new Schema({
  paymentMethod: { type: String, required: true },
  transactionId: { type: String, required: true },
  paidAt: { type: Date, default: Date.now },
  paidAmount: { type: Number, required: true },
  payerName: { type: String, required: true },
  payerPhone: { type: String, required: true },
  payerEmail: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  orderId: { type: String },
});

const BundleSchema = new Schema(
  {
    bundleId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    clientName: { type: String },
    clientEmail: { type: String },
    clientPhone: { type: String },
    items: [BundleItemSchema],
    totalAmount: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    status: { type: String, default: "active", enum: ["active", "paid", "expired", "cancelled"] },
    expiresAt: { type: Date },
    paymentDetails: BundlePaymentDetailsSchema,
  },
  { timestamps: true }
);

export default mongoose.models.Bundle || mongoose.model<IBundle>("Bundle", BundleSchema);
