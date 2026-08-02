"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";
import { useToast } from "@/context/ToastContext";
import { ShieldCheck, Lock, Mail, Key, ArrowRight, Sparkles, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAdminAuthenticated } = useAdmin();
  const { addToast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (isAdminAuthenticated) {
    if (typeof window !== "undefined") {
      router.push("/admin");
    }
  }

  const handleFillDemo = () => {
    setEmail("admin@pulmocare.in");
    setPassword("admin123");
    setErrorMsg(null);
    addToast("Demo Credentials Populated", "Email: admin@pulmocare.in | Pass: admin123");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const success = login(email, password);
    if (success) {
      addToast("Login Successful", "Welcome to Pulmo Care Admin Control Suite.");
      router.push("/admin");
    } else {
      setErrorMsg("Invalid credentials. Click 'Fill Demo Credentials' to login automatically.");
    }
  };

  return (
    <div className="min-h-screen bg-[#001D36] text-white flex flex-col justify-center items-center px-4 py-12 font-inter relative overflow-hidden">
      {/* Background Ambient Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#007AC1]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-[36px] border border-white/20 p-8 sm:p-10 shadow-2xl text-[#003865] relative z-10">
        {/* Header Logo & Title */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <img
              src="/images/pulmocare/pulmocare_logo.png"
              alt="Pulmo Care Logo"
              className="h-8 w-auto object-contain mx-auto"
            />
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#007AC1]/10 text-[#007AC1] text-[11px] font-archivo font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SECURE ADMIN PORTAL</span>
          </div>

          <h1 className="font-archivo font-extrabold text-3xl text-[#003865] tracking-tight">
            Administrator Sign In
          </h1>
        </div>

        {/* Demo Credentials Quick Fill Banner */}
        <div className="mb-6 bg-[#F0F6FA] rounded-2xl border border-[#007AC1]/30 p-4 text-xs text-[#003865] space-y-2">
          <div className="flex items-center justify-between font-archivo font-bold">
            <span className="flex items-center gap-1.5 text-[#007AC1]">
              <Sparkles className="w-4 h-4" />
              Demo Portal Credentials
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="bg-[#007AC1] hover:bg-[#00629B] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full transition-all cursor-pointer shadow-xs"
            >
              Fill Demo Login
            </button>
          </div>
          <div className="font-mono text-[11px] space-y-0.5 text-[#4A607A]">
            <p><strong>Email:</strong> admin@pulmocare.in</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 bg-red-50 text-red-600 border border-red-200 rounded-2xl p-3.5 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-archivo font-bold text-[#003865] uppercase mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#4A607A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pulmocare.in"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#003865]/15 bg-[#F8FAFC] text-sm text-[#003865] focus:outline-none focus:border-[#007AC1] focus:bg-white transition-all font-inter"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-archivo font-bold text-[#003865] uppercase mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#4A607A] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#003865]/15 bg-[#F8FAFC] text-sm text-[#003865] focus:outline-none focus:border-[#007AC1] focus:bg-white transition-all font-inter"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full bg-[#003865] hover:bg-[#002A4E] text-white font-archivo font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Access Control Suite</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 text-center border-t border-[#003865]/10 pt-4">
          <Link href="/" className="text-xs font-semibold text-[#007AC1] hover:underline">
            ← Return to Pulmo Care Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
