"use client";

import React, { createContext, useContext, useState } from "react";

export interface InquiryTargetProduct {
  id: string;
  name: string;
  image?: string;
  category?: string;
  brand?: string;
}

interface InquiryContextType {
  isInquiryOpen: boolean;
  targetProduct: InquiryTargetProduct | null;
  openInquiryModal: (product?: InquiryTargetProduct | null) => void;
  closeInquiryModal: () => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export const InquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [targetProduct, setTargetProduct] = useState<InquiryTargetProduct | null>(null);

  const openInquiryModal = (product?: InquiryTargetProduct | null) => {
    setTargetProduct(product || null);
    setIsInquiryOpen(true);
  };

  const closeInquiryModal = () => {
    setIsInquiryOpen(false);
    setTargetProduct(null);
  };

  return (
    <InquiryContext.Provider
      value={{
        isInquiryOpen,
        targetProduct,
        openInquiryModal,
        closeInquiryModal,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error("useInquiry must be used within an InquiryProvider");
  }
  return context;
};
