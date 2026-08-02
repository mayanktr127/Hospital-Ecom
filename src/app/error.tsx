"use client";

import React, { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unhandled errors quietly
    console.error("App Route Error:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center bg-white text-[#0a1f3c]">
      <div className="glass max-w-md !p-8 !rounded-[28px] border border-[#dc4b56]/30 bg-[#fbe6ee]">
        <h2 className="font-archivo font-medium text-2xl tracking-[-0.03em] mb-3 text-[#dc4b56]">
          Something went wrong
        </h2>
        <p className="text-sm text-[#64748b] mb-6 leading-relaxed font-inter">
          An error occurred while displaying this page. Click below to reload the section.
        </p>
        <button
          onClick={() => reset()}
          className="btn btn-primary cursor-pointer"
        >
          Try again
        </button>
      </div>
    </div>
  );
}