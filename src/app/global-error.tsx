"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-white text-[#0a1f3c] font-sans">
        <div className="max-w-md bg-[#fbe6ee] p-8 rounded-[28px] border border-[#dc4b56]/30 text-center shadow-[0_16px_44px_rgba(24,42,65,0.09)]">
          <h2 className="text-2xl font-medium tracking-[-0.03em] mb-3 text-[#dc4b56]">
            Application Error
          </h2>
          <p className="text-sm text-[#64748b] mb-6 leading-relaxed">
            A system error occurred. Click below to refresh the page.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3.5 bg-[#2a6ecb] text-white font-semibold text-sm rounded-full hover:bg-[#4b8ee6] transition-colors"
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}