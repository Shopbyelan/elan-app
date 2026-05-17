"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  function update(f: string, v: string) {
    setForm((prev) => ({ ...prev, [f]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }
      setRegisteredEmail(form.email);
    } finally {
      setLoading(false);
    }
  }

  if (registeredEmail) {
    return (
      <div className="min-h-screen flex">
        <div className="hidden lg:flex lg:w-1/2 gradient-silver relative overflow-hidden items-end p-16">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(184,212,232,0.1) 30px, rgba(184,212,232,0.1) 31px)` }}
          />
          <div className="relative z-10">
            <span className="font-serif text-5xl tracking-[0.3em] text-white">ÉLAN</span>
            <p className="font-sans text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase mt-2 mb-6">Fine Jewellery</p>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-[#0A0A0A]">
          <div className="w-full max-w-sm text-center">
            <CheckCircle className="h-14 w-14 text-[#C9A84C] mx-auto mb-6" strokeWidth={1} />
            <h1 className="font-serif text-3xl text-white mb-3">Check your inbox</h1>
            <p className="font-sans text-sm text-[#9A9A9A] leading-relaxed mb-2">
              We sent a verification link to
            </p>
            <p className="font-sans text-sm text-white mb-8">{registeredEmail}</p>
            <p className="font-sans text-xs text-[#5A5A5A] leading-relaxed mb-8">
              Click the link in the email to activate your account. The link expires in 24 hours.
            </p>
            <Link href="/login" className="font-sans text-sm text-[#C9A84C] hover:text-[#D4AF6C] transition-colors">
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-silver relative overflow-hidden items-end p-16">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(184,212,232,0.1) 30px, rgba(184,212,232,0.1) 31px)` }}
        />
        <div className="relative z-10">
          <span className="font-serif text-5xl tracking-[0.3em] text-white">ÉLAN</span>
          <p className="font-sans text-[10px] tracking-[0.4em] text-[#C9A84C] uppercase mt-2 mb-6">Fine Jewellery</p>
          <p className="font-sans text-sm text-[#9A9A9A] leading-relaxed max-w-xs">
            Join the Élan circle. Access exclusive pieces, track your orders, and receive priority service.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-[#0A0A0A]">
        <div className="w-full max-w-sm">
          <Link href="/" className="block mb-10 lg:hidden">
            <span className="font-serif text-2xl tracking-[0.3em] text-white">ÉLAN</span>
          </Link>

          <h1 className="font-serif text-3xl text-white mb-2">Create an account</h1>
          <p className="font-sans text-sm text-[#9A9A9A] mb-8">
            Join the Élan inner circle
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" placeholder="Ada Okonkwo" value={form.name} onChange={(e) => update("name", e.target.value)} required />
            <Input label="Email Address" type="email" placeholder="ada@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} required />
            <Input
              label="Password"
              type={showPw ? "text" : "password"}
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              required
              suffix={
                <button type="button" onClick={() => setShowPw(!showPw)} className="hover:text-white transition-colors">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
            />
            <Input
              label="Confirm Password"
              type={showPw ? "text" : "password"}
              placeholder="Re-enter password"
              value={form.confirm}
              onChange={(e) => update("confirm", e.target.value)}
              required
            />

            <p className="font-sans text-[11px] text-[#5A5A5A] leading-relaxed">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-[#C9A84C] hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-[#C9A84C] hover:underline">Privacy Policy</Link>.
            </p>

            <Button type="submit" variant="gold" size="lg" className="w-full" loading={loading}>
              Create Account
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1A1A1A]" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-[#0A0A0A] px-4 font-sans text-[10px] tracking-[0.2em] text-[#5A5A5A] uppercase">or</span>
            </div>
          </div>

          <Button variant="dark" size="lg" className="w-full" onClick={() => signIn("google", { callbackUrl: "/home" })}>
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </Button>

          <p className="mt-8 text-center font-sans text-sm text-[#5A5A5A]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#C9A84C] hover:text-[#D4AF6C] transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
