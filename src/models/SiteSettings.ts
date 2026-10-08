import mongoose, { Schema, Document } from "mongoose";

export interface ISiteSettings extends Document {
  key: string;
  nasalMaskAddonPrice: number;
  fullFaceMaskAddonPrice: number;
  humidifierBundlePrice: number;
  humidifierStandalonePrice: number;
  sleepStudyCharge: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const SiteSettingsSchema: Schema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: "pricing_settings" },
    nasalMaskAddonPrice: { type: Number, default: 3000 },
    fullFaceMaskAddonPrice: { type: Number, default: 4500 },
    humidifierBundlePrice: { type: Number, default: 10000 },
    humidifierStandalonePrice: { type: Number, default: 12600 },
    sleepStudyCharge: { type: Number, default: 5000 },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
