import mongoose, { Schema, Document } from "mongoose";

export interface IMedia extends Document {
  filename: string;
  contentType: string;
  data: Buffer;
  size: number;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema: Schema = new Schema(
  {
    filename: { type: String, required: true, unique: true, index: true },
    contentType: { type: String, required: true, default: "application/octet-stream" },
    data: { type: Buffer, required: true },
    size: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Media || mongoose.model<IMedia>("Media", MediaSchema);
