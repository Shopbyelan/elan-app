"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!token || !email) {
    return (
      <div className="w-full max-w-sm text-center">
        <p className="font-sans text-sm text-[#6B6B6B] mb-6">This reset link is invalid or has expired.</p>
        <Link href="/forgot-password" className="font-sans text-sm text-[#3A5A78] hover:underline">
          Request a new link
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Reset failed");
        return;
      }
      toast.success("Password updated!");
      router.push("/login?reset=true");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <Link href="/" className="block mb-10 lg:hidden">
        <Image src="/ElanLogowhite.png" alt="Élan Fine Jewellery" width={120} height={40} className="h-8 w-auto" />
      </Link>

      <h1 className="font-serif text-3xl text-[#0A0A0A] mb-2">Set new password</h1>
      <p className="font-sans text-sm text-[#6B6B6B] mb-8">
        Enter your new password below.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="New Password"
          type={showPw ? "text" : "password"}
          placeholder="Min. 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          suffix={
            <button type="button" onClick={() => setShowPw(!showPw)} className="hover:text-[#3A5A78] transition-colors">
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />
        <Input
          label="Confirm Password"
          type={showPw ? "text" : "password"}
          placeholder="Re-enter new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <Button type="submit" variant="gold" size="lg" className="w-full" loading={loading}>
          Update Password
        </Button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 gradient-gold relative overflow-hidden items-end p-16">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(133, 160, 181,0.1) 30px, rgba(133, 160, 181,0.1) 31px)` }}
        />
        <div className="relative z-10">
          <Image src="/Elanlogoblue.png" alt="Élan Fine Jewellery" width={200} height={80} className="h-16 w-auto mb-6" />
          <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed max-w-xs">
            Choose a strong password to protect your Élan account.
          </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-[#FFFFFF]">
        <Suspense fallback={<div className="w-full max-w-sm animate-pulse" />}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
