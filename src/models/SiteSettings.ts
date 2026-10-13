import mongoose, { Schema, Document } from "mongoose";

export interface ISiteSettings extends Document {
  key: string;
  nasalMaskAddonPrice: number;
  fullFaceMaskAddonPrice: number;
  humidifierBundlePrice: number;
  humidifierStandalonePrice: number;
  sleepStudyCharge: number;
  sleepStudyLevel1Price: number;
  sleepStudyLevel2Price: number;
  sleepStudyLevel3Price: number;
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
    sleepStudyCharge: { type: Number, default: 5500 },
    sleepStudyLevel1Price: { type: Number, default: 14000 },
    sleepStudyLevel2Price: { type: Number, default: 9000 },
    sleepStudyLevel3Price: { type: Number, default: 5500 },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
