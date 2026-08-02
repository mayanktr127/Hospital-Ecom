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
            className="pointer-events-auto bg-white/95 backdrop-blur-md border border-[#003865]/10 rounded-2xl p-4 shadow-[0_12px_28px_-12px_rgba(0,56,101,0.25)] flex items-start gap-3 text-[#0A192F]"
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-[#007AC1]" />}
              {toast.type === "error" && <AlertCircle className="w-5 h-5 text-red-600" />}
              {toast.type === "info" && <Info className="w-5 h-5 text-[#003865]" />}
              {toast.type === "warning" && <AlertCircle className="w-5 h-5 text-amber-500" />}
            </div>

            <div className="flex-1">
              <h4 className="font-archivo font-bold text-sm leading-tight text-[#003865]">
                {toast.title}
              </h4>
              {toast.description && (
                <p className="text-xs text-[#4A607A] mt-1 leading-snug">
                  {toast.description}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#4A607A] hover:text-[#003865] p-1 transition-colors"
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
