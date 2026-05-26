"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-gold relative overflow-hidden items-end p-16">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(133, 160, 181,0.1) 30px, rgba(133, 160, 181,0.1) 31px)`,
          }}
        />
        <div className="relative z-10">
          <Image src="/Elanlogoblue.png" alt="Élan Fine Jewellery" width={200} height={80} className="h-16 w-auto mb-6" />
          <p className="font-sans text-sm text-[#9A9A9A] leading-relaxed max-w-xs">
            We&apos;ll send you a secure link to reset your password.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-[#0A0A0A]">
        <div className="w-full max-w-sm">
          <Link href="/" className="block mb-10 lg:hidden">
            <Image src="/ElanLogowhite.png" alt="Élan Fine Jewellery" width={120} height={40} className="h-8 w-auto" />
          </Link>

          {sent ? (
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-[#85A0B5] mx-auto mb-6" />
              <h1 className="font-serif text-3xl text-white mb-3">Check your inbox</h1>
              <p className="font-sans text-sm text-[#9A9A9A] mb-8 leading-relaxed">
                If an account exists for <span className="text-white">{email}</span>, you&apos;ll receive a reset link shortly.
              </p>
              <Link
                href="/login"
                className="font-sans text-sm text-[#85A0B5] hover:text-[#9DB5C8] transition-colors"
              >
                ← Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-serif text-3xl text-white mb-2">Reset password</h1>
              <p className="font-sans text-sm text-[#9A9A9A] mb-8 leading-relaxed">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="ada@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" variant="gold" size="lg" className="w-full" loading={loading}>
                  Send Reset Link
                </Button>
              </form>

              <p className="mt-6 text-center font-sans text-sm text-[#5A5A5A]">
                Remember your password?{" "}
                <Link href="/login" className="text-[#85A0B5] hover:text-[#9DB5C8] transition-colors">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
