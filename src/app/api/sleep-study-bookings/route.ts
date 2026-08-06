import { NextResponse } from "next/server";
import dns from "dns";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {}

import { dbConnect } from "@/lib/mongodb";
import SleepStudyBooking from "@/models/SleepStudyBooking";

export async function GET() {
  try {
    await dbConnect();
    const bookings = await SleepStudyBooking.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, bookings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const bookingId = body.bookingId || `PSB-${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking = await SleepStudyBooking.create({
      ...body,
      bookingId,
      charges: body.charges || 5000,
      status: body.status || "Pending",
    });

    return NextResponse.json({ success: true, booking: newBooking }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { bookingId, status } = body;

    if (!bookingId) {
      return NextResponse.json({ success: false, error: "Missing bookingId" }, { status: 400 });
    }

    const updatedBooking = await SleepStudyBooking.findOneAndUpdate(
      { bookingId },
      { status },
      { new: true }
    );

    return NextResponse.json({ success: true, booking: updatedBooking });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const bookingId = searchParams.get("bookingId");

    if (!bookingId) {
      return NextResponse.json({ success: false, error: "Missing bookingId" }, { status: 400 });
    }

    await SleepStudyBooking.findOneAndDelete({ bookingId });
    return NextResponse.json({ success: true, message: `Booking ${bookingId} deleted` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
