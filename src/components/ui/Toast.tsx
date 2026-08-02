"use client";

import React from "react";
import { useToast } from "@/context/ToastContext";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            className="pointer-events-auto glass !rounded-[20px] border border-[#e9edf4] !p-4 shadow-[0_16px_44px_rgba(24,42,65,0.09)] flex items-start gap-3 text-[#182a41]"
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-[#1fb37a]" />}
              {toast.type === "error" && <AlertCircle className="w-5 h-5 text-[#dc4b56]" />}
              {toast.type === "info" && <Info className="w-5 h-5 text-[#2a6ecb]" />}
              {toast.type === "warning" && <AlertCircle className="w-5 h-5 text-[#e8a33d]" />}
            </div>

            <div className="flex-1">
              <h4 className="font-archivo font-semibold text-sm leading-tight text-[#0a1f3c]">
                {toast.title}
              </h4>
              {toast.description && (
                <p className="text-xs text-[#64748b] mt-1 leading-snug">
                  {toast.description}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#64748b] hover:text-[#0a1f3c] p-1 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};