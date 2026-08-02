import mongoose, { Schema, Document } from "mongoose";

export interface IInquiry extends Document {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  inquiryType: string;
  device: string;
  city: string;
  message: string;
  status: string;
  createdAt: Date;
}

const InquirySchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    inquiryType: { type: String, required: true },
    device: { type: String, default: "General Inquiry" },
    city: { type: String, default: "Not Specified" },
    message: { type: String, required: true },
    status: { type: String, default: "New Lead" },
  },
  { timestamps: true }
);

export default mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);
