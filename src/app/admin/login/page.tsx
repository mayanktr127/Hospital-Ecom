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

  React.useEffect(() => {
    if (isAdminAuthenticated) {
      router.push("/admin");
    }
  }, [isAdminAuthenticated, router]);

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
    <div className="min-h-screen pastel-canvas text-[#182a41] flex flex-col justify-center items-center px-4 py-12 font-inter relative overflow-hidden">
      {/* Background Ambient Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#e9e6fb] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#fbe6ee] blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <div className="glass max-w-md w-full !rounded-[28px] !p-8 sm:!p-10 shadow-[0_30px_70px_rgba(24,42,65,0.14)] text-[#0a1f3c] relative z-10">
        {/* Header Logo & Title */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <img
              src="/images/pulmocare/pulmocare_logo.png"
              alt="Pulmo Care Logo"
              className="h-8 w-auto object-contain mx-auto"
            />
          </Link>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#dcebfb] eyebrow mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>SECURE ADMIN PORTAL</span>
          </div>

          <h1 className="font-archivo font-medium text-[32px] text-[#0a1f3c] tracking-[-0.04em]">
            Administrator Sign In
          </h1>
        </div>

        {/* Demo Credentials Quick Fill Banner */}
        <div className="mb-6 bg-[#dcebfb] rounded-[14px] border border-white p-4 text-xs text-[#0a1f3c] space-y-2">
          <div className="flex items-center justify-between font-archivo font-bold">
            <span className="flex items-center gap-1.5 text-[#2a6ecb]">
              <Sparkles className="w-4 h-4" />
              Demo Portal Credentials
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="bg-[#2a6ecb] hover:bg-[#4b8ee6] text-white text-[10px] uppercase font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer"
            >
              Fill Demo Login
            </button>
          </div>
          <div className="font-mono text-[11px] space-y-0.5 text-[#64748b]">
            <p><strong>Email:</strong> admin@pulmocare.in</p>
            <p><strong>Password:</strong> admin123</p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-6 bg-[#fbe6ee] text-[#dc4b56] border border-[#dc4b56]/30 rounded-2xl p-3.5 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-archivo font-bold text-[#0a1f3c] uppercase mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@pulmocare.in"
                className="field !pl-10 !text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-archivo font-bold text-[#0a1f3c] uppercase mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="field !pl-10 !text-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full cursor-pointer mt-2"
          >
            <span>Access Control Suite</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 text-center border-t border-[#0a1f3c]/10 pt-4">
          <Link href="/" className="text-xs font-semibold text-[#2a6ecb] hover:underline">
            ← Return to Pulmo Care Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}