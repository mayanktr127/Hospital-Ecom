import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import dns from "dns";

try {
  dns.setDefaultResultOrder("ipv4first");
} catch (e) {}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = "INR", receipt, notes = {} } = body;

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json(
        { success: false, error: "Valid amount is required" },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Check if credentials are missing or default placeholder
    const isPlaceholderKey =
      !keyId ||
      !keySecret ||
      keyId.includes("dummy") ||
      keyId.includes("your_key") ||
      keySecret.includes("dummy") ||
      keySecret.includes("your_key");

    const amountInPaise = Math.round(Number(amount) * 100);
    const receiptId = (receipt || `rcpt_${Date.now()}`).slice(0, 40);

    if (isPlaceholderKey) {
      // Provide sandbox simulated order if user hasn't added real test keys yet
      const simulatedOrderId = `order_test_${Date.now().toString().slice(-8)}`;
      return NextResponse.json({
        success: true,
        order: {
          id: simulatedOrderId,
          entity: "order",
          amount: amountInPaise,
          amount_paid: 0,
          amount_due: amountInPaise,
          currency: currency,
          receipt: receiptId,
          status: "created",
          notes: notes,
        },
        keyId: keyId || "rzp_test_dummy_key_id",
        isSimulated: true,
        message: "Razorpay sandbox simulation mode (configure real keys in .env.local)",
      });
    }

    // Initialize Razorpay SDK with real credentials
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: currency,
      receipt: receiptId,
      notes: notes,
    });

    return NextResponse.json({
      success: true,
      order,
      keyId,
      isSimulated: false,
    });
  } catch (error: any) {
    console.error("Razorpay Order Creation Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to create Razorpay order",
      },
      { status: 500 }
    );
  }
}
