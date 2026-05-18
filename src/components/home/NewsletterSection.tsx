"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function NewsletterSection() {
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
    <section className="py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#85A0B5]/30" />
          <span className="font-sans text-[10px] tracking-[0.4em] text-[#85A0B5] uppercase">
            Élan Inner Circle
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#85A0B5]/30" />
        </div>

        <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
          First Access. Always.
        </h2>
        <p className="font-sans text-sm text-[#9A9A9A] leading-relaxed mb-10">
          Join the Élan circle and receive early access to new arrivals, exclusive pieces,
          and invitations to private events — before the world sees them.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-0 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 border-r-0 focus:z-10"
          />
          <Button
            type="submit"
            variant="gold"
            size="md"
            loading={loading}
            className="flex-shrink-0 px-6"
          >
            Join
          </Button>
        </form>

        <p className="font-sans text-[10px] text-[#3A3A3A] mt-4">
          No spam. Only excellence. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
