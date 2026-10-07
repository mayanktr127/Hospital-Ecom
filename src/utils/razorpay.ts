declare global {
  interface Window {
    Razorpay: any;
  }
}

let razorpayScriptLoadedPromise: Promise<boolean> | null = null;

export function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === "undefined") {
    return Promise.resolve(false);
  }

  if (window.Razorpay) {
    return Promise.resolve(true);
  }

  if (razorpayScriptLoadedPromise) {
    return razorpayScriptLoadedPromise;
  }

  razorpayScriptLoadedPromise = new Promise((resolve) => {
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay checkout SDK script.");
      resolve(false);
    };
    document.body.appendChild(script);
  });

  return razorpayScriptLoadedPromise;
}

export interface RazorpayPaymentSuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface RazorpayCheckoutConfig {
  amount: number; // in Rupees
  name?: string;
  description?: string;
  image?: string;
  receipt?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  themeColor?: string;
  onSuccess: (response: RazorpayPaymentSuccessResponse) => void | Promise<void>;
  onDismiss?: () => void;
  onError?: (error: any) => void;
}

export async function openRazorpayModal(config: RazorpayCheckoutConfig): Promise<boolean> {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded || !window.Razorpay) {
    throw new Error("Razorpay Checkout SDK failed to load. Please check your internet connection.");
  }

  // 1. Create order on backend
  const res = await fetch("/api/razorpay/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: config.amount,
      currency: "INR",
      receipt: config.receipt,
      notes: config.notes,
    }),
  });

  const data = await res.json();
  if (!data.success || !data.order) {
    throw new Error(data.error || "Unable to initiate payment order on Razorpay.");
  }

  const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_TVVVipnwFKK8iC";

  // 2. Open Razorpay Standard Checkout modal
  const options = {
    key: razorpayKey,
    amount: data.order.amount,
    currency: data.order.currency,
    name: config.name || "Pulmo Care Medical",
    description: config.description || "Medical Equipment Procurement",
    image: config.image || "/images/pulmocare/pulmocare_logo.png",
    order_id: data.order.id,
    prefill: {
      name: config.prefill?.name || "",
      email: config.prefill?.email || "",
      contact: config.prefill?.contact || "",
    },
    notes: config.notes || {},
    theme: {
      color: config.themeColor || "#0066FF",
    },
    modal: {
      backdropclose: false,
      escape: true,
      handleback: true,
      confirm_close: true,
      ondismiss: () => {
        if (config.onDismiss) config.onDismiss();
      },
    },
    handler: async function (response: RazorpayPaymentSuccessResponse) {
      try {
        await config.onSuccess(response);
      } catch (err) {
        console.error("Error in Razorpay success handler:", err);
        if (config.onError) config.onError(err);
      }
    },
  };

  const rzp = new window.Razorpay(options);

  rzp.on("payment.failed", function (response: any) {
    console.error("Razorpay payment failed:", response.error);
    if (config.onError) {
      config.onError(response.error);
    }
  });

  rzp.open();
  return true;
}
