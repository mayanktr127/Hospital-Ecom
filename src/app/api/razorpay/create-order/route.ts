import { NextResponse } from "next/server";
import dns from "dns";

try {
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {}

import { getRazorpayClient } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = "INR", receipt, notes = {} } = body;

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { success: false, error: "Valid amount in INR is required." },
        { status: 400 }
      );
    }

    const razorpay = getRazorpayClient();

    // Razorpay amount is expressed in paise (1 INR = 100 paise)
    const options = {
      amount: Math.round(amount * 100),
      currency: currency.toUpperCase(),
      receipt: (receipt || `rcpt_${Date.now()}`).slice(0, 40),
      notes: {
        ...notes,
        createdVia: "PulmoCare Medical Portal",
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
      },
    });
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to create Razorpay order." },
      { status: 500 }
    );
  }
}
