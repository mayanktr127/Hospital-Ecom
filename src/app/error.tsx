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
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center bg-white text-[#003865]">
      <div className="max-w-md bg-[#EEF3F8] p-8 rounded-3xl border border-[#003865]/15 shadow-sm">
        <h2 className="font-archivo font-bold text-2xl mb-3 text-[#003865]">
          Something went wrong
        </h2>
        <p className="text-sm text-[#4A607A] mb-6 leading-relaxed font-inter">
          An error occurred while displaying this page. Click below to reload the section.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-[#003865] hover:bg-[#007AC1] text-white font-archivo font-bold text-sm rounded-full transition-colors shadow-md cursor-pointer"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
