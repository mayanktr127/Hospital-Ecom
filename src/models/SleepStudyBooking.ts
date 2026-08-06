import mongoose, { Schema, Document } from "mongoose";

export interface ISleepStudyBooking extends Document {
  bookingId: string;
  patientName: string;
  phone: string;
  email: string;
  height: string;
  weight: string;
  bedTime: string;
  upTime: string;
  level: string; // Level 1 (Lvl 1), Level 2 (Lvl 2), Level 3 (Lvl 3)
  studyDate: string;
  address: string;
  city: string;
  charges: number; // 5000 INR
  notes?: string;
  status: string; // Pending, Confirmed, Completed, Cancelled
  createdAt: Date;
  updatedAt: Date;
}

const SleepStudyBookingSchema: Schema = new Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    patientName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    height: { type: String, required: true },
    weight: { type: String, required: true },
    bedTime: { type: String, required: true },
    upTime: { type: String, required: true },
    level: { type: String, required: true },
    studyDate: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, default: "Bangalore" },
    charges: { type: Number, default: 5000 },
    notes: { type: String, default: "" },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.models.SleepStudyBooking ||
  mongoose.model<ISleepStudyBooking>("SleepStudyBooking", SleepStudyBookingSchema);
