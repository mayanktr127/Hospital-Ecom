"use client";

import React, { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      addToast("Invalid Email", "Please enter a valid email address.", "error");
      return;
    }
    setSubmitted(true);
    addToast("Subscribed!", "You have joined the Löwenstein Medical Clinical Dispatch.");
  };

  return (
    <section className="mt-24 bg-[#f6f4fb] rounded-[28px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_2px_4px_rgba(24,42,65,0.04),0_12px_28px_-12px_rgba(24,42,65,0.18)] border border-[#0a1f3c]/10">
      <div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#64748b] block mb-1">
          Clinical Supply Bulletins
        </span>
        <h2 className="font-archivo font-semibold text-[clamp(28px,4.4vw,50px)] text-[#0a1f3c] max-w-[520px] leading-tight">
          Subscribe to Löwenstein Device & Medical Bulletins
        </h2>
      </div>

      {submitted ? (
        <div className="bg-white rounded-full px-6 py-4 flex items-center gap-3 border border-[#0a1f3c]/15 shadow-sm text-[#0a1f3c] font-archivo font-bold text-sm">
          <CheckCircle2 className="w-5 h-5 text-[#1fb37a]" />
          <span>Subscribed with {email}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full md:w-auto">
          <div className="flex items-center bg-white rounded-full p-1.5 pl-5 shadow-[0_2px_4px_rgba(24,42,65,0.04),0_12px_28px_-12px_rgba(24,42,65,0.18)] min-w-[320px] sm:min-w-[380px] border border-[#0a1f3c]/10">
            <Mail className="w-4 h-4 text-[#64748b] shrink-0 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter hospital or clinic email..."
              required
              className="border-0 flex-1 text-sm font-inter text-[#182a41] placeholder-[#64748b]/60 bg-transparent"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-[#0a1f3c] text-white font-inter font-semibold text-xs flex items-center gap-2 hover:bg-[#12315c] transition-colors shrink-0 shadow-md"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}
    </section>
  );
};