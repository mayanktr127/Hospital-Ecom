"use client";

import React, { useState, useMemo } from "react";
import downloadsData from "@/data/downloads.json";
import { useToast } from "@/context/ToastContext";
import {
  Search,
  Download,
  ShieldCheck,
  FileText,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CheckCircle2,
  Upload,
  RotateCcw,
} from "lucide-react";
import { motion } from "motion/react";

export interface DownloadRecord {
  id: string;
  title: string;
  remoteUrl: string;
  localUrl: string;
  fileName: string;
  language: string;
  category: string;
  product: string;
  audience: "All" | "Patients" | "Professionals";
  fileSize: string;
  format: string;
}

export const DownloadsSection: React.FC = () => {
  const { addToast } = useToast();

  // Filter States (Image 1 Controls)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedProduct, setSelectedProduct] = useState("All Products");
  const [selectedAudience, setSelectedAudience] = useState<"All" | "Patients" | "Professionals">("All");

  // Applied filter state
  const [appliedSearch, setAppliedSearch] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Multer File Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  // Extract unique options for filter dropdowns
  const languagesList = useMemo(() => {
    const set = new Set<string>();
    downloadsData.forEach((item) => set.add(item.language));
    return ["All Languages", ...Array.from(set).sort()];
  }, []);

  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    downloadsData.forEach((item) => set.add(item.category));
    return ["All Categories", ...Array.from(set).sort()];
  }, []);

  const productsList = useMemo(() => {
    const set = new Set<string>();
    downloadsData.forEach((item) => set.add(item.product));
    return ["All Products", ...Array.from(set).sort()];
  }, []);

  // Filtered dataset
  const filteredData = useMemo(() => {
    return (downloadsData as DownloadRecord[]).filter((item) => {
      // Search term
      if (appliedSearch.trim() !== "") {
        const query = appliedSearch.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesFile = item.fileName.toLowerCase().includes(query);
        const matchesProd = item.product.toLowerCase().includes(query);
        if (!matchesTitle && !matchesFile && !matchesProd) return false;
      }

      // Language filter
      if (selectedLanguage !== "All Languages" && item.language !== selectedLanguage) {
        return false;
      }

      // Category filter
      if (selectedCategory !== "All Categories" && item.category !== selectedCategory) {
        return false;
      }

      // Product filter
      if (selectedProduct !== "All Products" && item.product !== selectedProduct) {
        return false;
      }

      // Audience radio button
      if (selectedAudience !== "All" && item.audience !== selectedAudience) {
        return false;
      }

      return true;
    });
  }, [appliedSearch, selectedLanguage, selectedCategory, selectedProduct, selectedAudience]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedSearch(searchQuery);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setAppliedSearch("");
    setSelectedLanguage("All Languages");
    setSelectedCategory("All Categories");
    setSelectedProduct("All Products");
    setSelectedAudience("All");
    setCurrentPage(1);
  };

  // Pagination calculations
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSlice = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const sectionEl = document.getElementById("downloads");
      if (sectionEl) sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Download directly from local static directory /doc-files/{fileName}
  const handleDownload = (item: DownloadRecord) => {
    addToast("Downloading File", `Fetching ${item.fileName} from local server...`);
    
    const downloadUrl = item.localUrl || `/doc-files/${item.fileName}`;
    
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = item.fileName || "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Multer File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(`Uploading ${file.name} to Multer file server...`);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Server upload failed");
      }

      const data = await res.json();
      setUploadProgress(null);
      setIsUploading(false);
      addToast(
        "Upload Complete",
        `File ${data.originalName} (${data.size}) uploaded via Multer to local server.`
      );
    } catch (err: any) {
      console.error(err);
      setIsUploading(false);
      setUploadProgress(null);
      addToast("Upload Error", err.message || "Failed to upload file to Multer server.");
    }
  };

  return (
    <section id="downloads" className="mt-24 mb-16 scroll-mt-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#003865]/08 text-[#003865] text-xs font-semibold font-archivo mb-2 border border-[#003865]/10">
            <ShieldCheck className="w-4 h-4 text-[#007AC1]" />
            Local Server Repository ({downloadsData.length.toLocaleString()} Files Downloaded)
          </div>
          <h2 className="font-archivo font-extrabold text-[clamp(36px,5vw,64px)] text-[#003865] leading-none">
            Document Repository
          </h2>
        </div>

        {/* Multer Upload Trigger Button */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <label className="px-5 py-2.5 rounded-full bg-white border border-[#003865]/20 text-[#003865] font-inter font-semibold text-xs flex items-center gap-2 hover:bg-[#F0F6FA] cursor-pointer shadow-sm transition-all">
            <Upload className="w-4 h-4 text-[#007AC1]" />
            <span>Upload File via Multer</span>
            <input
              type="file"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
              accept=".pdf,.doc,.docx,.zip,.exe"
            />
          </label>
        </div>
      </div>

      {uploadProgress && (
        <div className="mb-6 bg-[#007AC1]/10 border border-[#007AC1]/30 rounded-2xl p-4 text-xs font-inter text-[#003865] flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-[#003865] border-t-transparent rounded-full animate-spin" />
          <span>{uploadProgress}</span>
        </div>
      )}

      {/* FILTER BAR SECTION MATCHING IMAGE 1 EXACTLY */}
      <div className="bg-white border border-[#003865]/12 rounded-[28px] p-6 mb-8 shadow-[0_4px_16px_rgba(0,56,101,0.06)]">
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          {/* Row 1: Search input + Select lang... + Select cate... + Select prod... + Navy Search Button (Image 1) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="lg:col-span-4 relative">
              <Search className="w-4 h-4 text-[#4A607A] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setAppliedSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search..."
                className="w-full bg-[#F4F7FA] border border-[#003865]/10 rounded-2xl pl-10 pr-4 py-3 text-sm text-[#003865] placeholder-[#4A607A]/70 outline-none focus:border-[#007AC1] focus:bg-white transition-all"
              />
            </div>

            {/* Select lang... Dropdown */}
            <div className="lg:col-span-2">
              <select
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#F4F7FA] border border-[#003865]/10 rounded-2xl px-4 py-3 text-xs text-[#003865] font-inter font-medium outline-none cursor-pointer focus:border-[#007AC1] focus:bg-white transition-all"
              >
                <option value="All Languages">Select lang...</option>
                {languagesList.filter((l) => l !== "All Languages").map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Select cate... Dropdown */}
            <div className="lg:col-span-2">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#F4F7FA] border border-[#003865]/10 rounded-2xl px-4 py-3 text-xs text-[#003865] font-inter font-medium outline-none cursor-pointer focus:border-[#007AC1] focus:bg-white transition-all"
              >
                <option value="All Categories">Select cate...</option>
                {categoriesList.filter((c) => c !== "All Categories").map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Select prod... Dropdown */}
            <div className="lg:col-span-2">
              <select
                value={selectedProduct}
                onChange={(e) => {
                  setSelectedProduct(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-[#F4F7FA] border border-[#003865]/10 rounded-2xl px-4 py-3 text-xs text-[#003865] font-inter font-medium outline-none cursor-pointer focus:border-[#007AC1] focus:bg-white transition-all"
              >
                <option value="All Products">Select prod...</option>
                {productsList.filter((p) => p !== "All Products").map((prod) => (
                  <option key={prod} value={prod}>
                    {prod}
                  </option>
                ))}
              </select>
            </div>

            {/* Navy Search Button (Image 1) */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-2xl bg-[#003865] text-white font-inter font-semibold text-sm hover:bg-[#005A9C] shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Row 2: Target Audience Radio Buttons (Image 1 design: All | Patients | Professionals) */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#003865]/08">
            <div className="flex items-center gap-6 text-sm font-inter text-[#003865]">
              <label className="flex items-center gap-2 cursor-pointer font-medium select-none">
                <input
                  type="radio"
                  name="audience"
                  checked={selectedAudience === "All"}
                  onChange={() => {
                    setSelectedAudience("All");
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 text-[#003865] accent-[#003865] cursor-pointer"
                />
                <span>All</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium select-none">
                <input
                  type="radio"
                  name="audience"
                  checked={selectedAudience === "Patients"}
                  onChange={() => {
                    setSelectedAudience("Patients");
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 text-[#003865] accent-[#003865] cursor-pointer"
                />
                <span>Patients</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-medium select-none">
                <input
                  type="radio"
                  name="audience"
                  checked={selectedAudience === "Professionals"}
                  onChange={() => {
                    setSelectedAudience("Professionals");
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 text-[#003865] accent-[#003865] cursor-pointer"
                />
                <span>Professionals</span>
              </label>
            </div>

            {/* Reset Filters CTA & Count */}
            <div className="flex items-center gap-4 text-xs text-[#4A607A]">
              <span>
                Found <strong>{totalItems.toLocaleString()}</strong> files
              </span>
              {(appliedSearch || selectedLanguage !== "All Languages" || selectedCategory !== "All Categories" || selectedProduct !== "All Products" || selectedAudience !== "All") && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-[#007AC1] hover:underline font-semibold"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* DOWNLOADS LIST GRID */}
      {currentSlice.length === 0 ? (
        <div className="bg-white border border-[#003865]/10 rounded-[28px] p-12 text-center text-[#4A607A]">
          <FileText className="w-12 h-12 text-[#003865]/30 mx-auto mb-3" />
          <h3 className="font-archivo font-bold text-xl text-[#003865] mb-1">No Files Found</h3>
          <p className="text-xs mb-4">No documentation matched your filter parameters.</p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 rounded-full bg-[#003865] text-white text-xs font-semibold"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {currentSlice.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-[#003865]/10 rounded-[24px] p-5 shadow-[0_2px_4px_rgba(0,56,101,0.04),0_12px_28px_-12px_rgba(0,56,101,0.14)] hover:shadow-[0_4px_8px_rgba(0,56,101,0.05),0_20px_40px_-18px_rgba(0,56,101,0.25)] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F0F6FA] text-[#007AC1] border border-[#003865]/08">
                    {item.category}
                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#003865]/06 text-[#003865]">
                    {item.audience}
                  </span>
                </div>

                <h3 className="font-archivo font-bold text-base text-[#003865] mb-2 leading-snug line-clamp-2">
                  {item.title}
                </h3>

                <div className="flex items-center gap-3 text-[11px] font-mono text-[#4A607A] mb-3">
                  <span className="bg-[#003865]/06 px-2 py-0.5 rounded font-bold text-[#003865]">
                    {item.format}
                  </span>
                  <span>{item.fileSize}</span>
                  <span>•</span>
                  <span className="font-sans font-medium text-[#007AC1]">{item.language}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#003865]/08 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-[11px] text-[#4A607A] font-inter">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="truncate max-w-[120px]">{item.product}</span>
                </div>

                <button
                  onClick={() => handleDownload(item)}
                  className="px-4 py-2 rounded-full bg-[#003865] text-white hover:bg-[#005A9C] font-inter font-semibold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* PAGINATION SECTION (AT BOTTOM) */}
      <div className="bg-white border border-[#003865]/10 rounded-[28px] p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        {/* Per-page selector & Status */}
        <div className="flex items-center gap-4 text-xs font-inter text-[#4A607A]">
          <span>
            Showing <strong>{startIndex + 1}</strong> – <strong>{Math.min(startIndex + itemsPerPage, totalItems)}</strong> of <strong>{totalItems.toLocaleString()}</strong> files
          </span>

          <div className="flex items-center gap-1.5">
            <span>Per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-[#F4F7FA] border border-[#003865]/10 rounded-lg px-2 py-1 text-xs text-[#003865] font-bold outline-none cursor-pointer"
            >
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
              <option value={96}>96</option>
            </select>
          </div>
        </div>

        {/* Page Buttons */}
        <div className="flex items-center gap-1.5">
          {/* First Page */}
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg border border-[#003865]/10 bg-white grid place-items-center text-[#003865] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F4F7FA] transition-colors"
            title="First page"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>

          {/* Prev Page */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-lg border border-[#003865]/10 bg-white grid place-items-center text-[#003865] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F4F7FA] transition-colors"
            title="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Numbered Page Pills */}
          <div className="flex items-center gap-1 px-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = currentPage;
              if (currentPage <= 3) pageNum = i + 1;
              else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
              else pageNum = currentPage - 2 + i;

              if (pageNum < 1 || pageNum > totalPages) return null;

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-lg text-xs font-archivo font-bold transition-all ${
                    currentPage === pageNum
                      ? "bg-[#003865] text-white shadow-sm"
                      : "bg-[#F4F7FA] text-[#003865] hover:bg-[#D8E7F3]"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          {/* Next Page */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-lg border border-[#003865]/10 bg-white grid place-items-center text-[#003865] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F4F7FA] transition-colors"
            title="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Last Page */}
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-lg border border-[#003865]/10 bg-white grid place-items-center text-[#003865] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F4F7FA] transition-colors"
            title="Last page"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
