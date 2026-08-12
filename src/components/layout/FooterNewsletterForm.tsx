"use client";

import { useState } from "react";
import { toast } from "sonner";

export function FooterNewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        localStorage.setItem("elan_newsletter_subscribed", "true");
        toast.success("You're on the list. Welcome to Élan.");
        setEmail("");
      } else {
        const data = await res.json();
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <p className="font-sans text-[11px] tracking-[0.2em] text-[#5A5A5A] uppercase mb-3">
        Stay in the Loop
      </p>
      <form onSubmit={handleSubmit} className="flex gap-0 max-w-52">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email address"
          className="flex-1 min-w-0 h-9 px-3 font-sans text-xs text-[#E4E1DA] bg-[#141414] border border-[#2A2A2A] placeholder:text-[#5A5A5A] focus:outline-none focus:border-[#85A0B5] transition-colors"
        />
        <button
          type="submit"
          disabled={loading}
          aria-label="Join the newsletter"
          className="shrink-0 h-9 px-3 font-sans text-[11px] tracking-wider uppercase text-[#0A0A0A] bg-[#85A0B5] hover:bg-[#9AB2C5] transition-colors disabled:opacity-50"
        >
          {loading ? "..." : "Join"}
        </button>
      </form>
    </div>
  );
}
