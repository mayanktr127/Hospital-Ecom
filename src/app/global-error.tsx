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
      <body className="min-h-screen flex items-center justify-center bg-white text-[#003865] font-sans">
        <div className="max-w-md bg-[#EEF3F8] p-8 rounded-3xl border border-[#003865]/15 text-center shadow-lg">
          <h2 className="text-2xl font-bold mb-3 text-[#003865]">
            Application Error
          </h2>
          <p className="text-sm text-[#4A607A] mb-6 leading-relaxed">
            A system error occurred. Click below to refresh the page.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-[#003865] text-white font-bold text-sm rounded-full hover:bg-[#007AC1] transition-colors"
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}
