import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  id: string;
  name: string;
  slug: string;
  desc: string;
  image: string;
  count: string;
  badge?: string;
  createdAt: Date;
}

const CategorySchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, default: "Clinical healthcare equipment and devices." },
    image: { type: String, default: "/images/pulmocare/pulmocare_prisma-smart.png" },
    count: { type: String, default: "0 Models" },
    badge: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);
