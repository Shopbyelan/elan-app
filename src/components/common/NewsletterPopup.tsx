"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SUBSCRIBED_KEY = "elan_newsletter_subscribed";
const DISMISSED_KEY = "elan_newsletter_dismissed_at";
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const TRIGGER_DELAY_MS = 15000;

export function NewsletterPopup() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(SUBSCRIBED_KEY) === "true") return;

    const dismissedAt = Number(localStorage.getItem(DISMISSED_KEY) || 0);
    if (Date.now() - dismissedAt < DISMISS_COOLDOWN_MS) return;

    let cancelled = false;

    async function schedule() {
      if (session?.user?.email) {
        const res = await fetch("/api/newsletter/status");
        const data = await res.json();
        if (data.subscribed) {
          localStorage.setItem(SUBSCRIBED_KEY, "true");
          return;
        }
      }
      if (cancelled) return;

      const timer = setTimeout(() => setOpen(true), TRIGGER_DELAY_MS);

      function onMouseLeave(e: MouseEvent) {
        if (e.clientY <= 0) {
          setOpen(true);
          cleanup();
        }
      }

      function cleanup() {
        clearTimeout(timer);
        document.removeEventListener("mouseleave", onMouseLeave);
      }

      document.addEventListener("mouseleave", onMouseLeave);
      return cleanup;
    }

    let cleanupFn: (() => void) | undefined;
    schedule().then((fn) => {
      if (!cancelled) cleanupFn = fn;
    });

    return () => {
      cancelled = true;
      cleanupFn?.();
    };
  }, [session?.user?.email]);

  function handleDismiss() {
    localStorage.setItem(DISMISSED_KEY, Date.now().toString());
    setOpen(false);
  }

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
        localStorage.setItem(SUBSCRIBED_KEY, "true");
        toast.success("You're on the list. Welcome to Élan.");
        setOpen(false);
      } else {
        const data = await res.json();
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : handleDismiss())}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>First Access. Always.</DialogTitle>
        </DialogHeader>
        <div className="p-6 pt-4">
          <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed mb-6">
            Join the Élan circle and receive early access to new arrivals, exclusive
            pieces, and invitations to private events.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-0">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 border-r-0 focus:z-10"
            />
            <Button type="submit" variant="gold" size="md" loading={loading} className="shrink-0 px-6">
              Join
            </Button>
          </form>
          <p className="font-sans text-[12px] text-[#9A9A9A] mt-4">
            No spam. Only excellence. Unsubscribe at any time.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
