"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/home";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("verified") === "true") {
      toast.success("Email verified! You can now sign in.");
    }
    if (searchParams.get("error") === "invalid-link") {
      toast.error("This verification link is invalid or has expired.");
    }
    if (searchParams.get("reset") === "true") {
      toast.success("Password updated! Sign in with your new password.");
    }
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setLoginFailed(false);
    try {
      const res = await signIn("credentials", { email, password, redirect: false });
      if (res?.error) {
        setLoginFailed(true);
        toast.error("Invalid email or password");
      } else {
        toast.success("Welcome back");
        router.push(callbackUrl);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!email) {
      toast.error("Enter your email address above first");
      return;
    }
    setResendLoading(true);
    try {
      await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      toast.success("Verification email sent — check your inbox");
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <Link href="/" className="block mb-10 lg:hidden">
        <Image src="/ElanLogowhite.png" alt="Élan Fine Jewellery" width={120} height={40} className="h-8 w-auto" />
      </Link>

      <h1 className="font-serif text-3xl text-white mb-2">Welcome back</h1>
      <p className="font-sans text-sm text-[#9A9A9A] mb-8">Sign in to your Élan account</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="ada@example.com"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setLoginFailed(false); }}
          required
        />
        <Input
          label="Password"
          type={showPw ? "text" : "password"}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          suffix={
            <button type="button" onClick={() => setShowPw(!showPw)} className="hover:text-white transition-colors">
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
        />
        <div className="flex justify-end">
          <Link href="/forgot-password" className="font-sans text-[11px] text-[#85A0B5] hover:text-[#9DB5C8] transition-colors">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" variant="gold" size="lg" className="w-full" loading={loading}>
          Sign In
        </Button>
      </form>

      {loginFailed && (
        <div className="mt-4 p-3 bg-[#111] border border-[#1A1A1A]">
          <p className="font-sans text-xs text-[#9A9A9A] leading-relaxed">
            Just registered? Your email may not be verified yet.{" "}
            <button
              onClick={handleResend}
              disabled={resendLoading}
              className="text-[#85A0B5] hover:underline disabled:opacity-50"
            >
              {resendLoading ? "Sending..." : "Resend verification email"}
            </button>
          </p>
        </div>
      )}

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#1A1A1A]" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[#0A0A0A] px-4 font-sans text-[10px] tracking-[0.2em] text-[#5A5A5A] uppercase">
            or continue with
          </span>
        </div>
      </div>

      <Button variant="dark" size="lg" className="w-full" loading={googleLoading}
        onClick={() => { setGoogleLoading(true); signIn("google", { callbackUrl }); }}>
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Continue with Google
      </Button>

      <p className="mt-8 text-center font-sans text-sm text-[#5A5A5A]">
        New to Élan?{" "}
        <Link href="/register" className="text-[#85A0B5] hover:text-[#9DB5C8] transition-colors">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 gradient-gold relative overflow-hidden items-end p-16">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(133, 160, 181,0.1) 30px, rgba(133, 160, 181,0.1) 31px)` }}
        />
        <div className="relative z-10">
          <Image src="/Elanlogoblue.png" alt="Élan Fine Jewellery" width={200} height={80} className="h-16 w-auto mb-6" />
          <p className="font-sans text-sm text-[#9A9A9A] leading-relaxed max-w-xs">
            Where rarity becomes ritual. Sign in to access your personal Élan experience.
          </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-[#0A0A0A]">
        <Suspense fallback={<div className="w-full max-w-sm animate-pulse" />}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
