"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Bell, BellOff, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface WaitlistButtonProps {
  productId: string;
  productName: string;
}

type State = "loading" | "joined" | "not-joined";

export function WaitlistButton({ productId, productName }: WaitlistButtonProps) {
  const { data: session, status: authStatus } = useSession();
  const [state, setState] = useState<State>("loading");
  const [busy, setBusy] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");

  // Check waitlist status for authenticated users
  useEffect(() => {
    if (authStatus === "loading") return;
    if (!session?.user) { setState("not-joined"); return; }

    fetch(`/api/waitlist?productId=${productId}`)
      .then((r) => r.json())
      .then((d) => setState(d.joined ? "joined" : "not-joined"))
      .catch(() => setState("not-joined"));
  }, [authStatus, session, productId]);

  async function join(email?: string) {
    setBusy(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, email }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Could not join the waiting list");
        return;
      }
      setState("joined");
      setShowEmailForm(false);
      toast.success(`You're on the waiting list for "${productName}"`);
    } finally {
      setBusy(false);
    }
  }

  async function leave() {
    setBusy(true);
    try {
      await fetch(`/api/waitlist?productId=${productId}`, { method: "DELETE" });
      setState("not-joined");
      toast("Removed from waiting list");
    } finally {
      setBusy(false);
    }
  }

  // Initial skeleton while we resolve auth + waitlist status
  if (state === "loading") {
    return (
      <div className="flex-1 h-13 bg-[#FFFFFF] border border-[#E4E1DA] animate-pulse" />
    );
  }

  // Already on the waitlist
  if (state === "joined") {
    return (
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-3 h-13 px-5 border border-[#85A0B5]/40 bg-[#85A0B5]/5">
          <Check className="h-4 w-4 text-[#3A5A78] flex-shrink-0" />
          <div>
            <p className="font-sans text-xs tracking-[0.12em] text-[#3A5A78]">
              On the waiting list
            </p>
            <p className="font-sans text-[12px] text-[#9A9A9A]">
              We&apos;ll email you when it&apos;s back in stock
            </p>
          </div>
        </div>
        <button
          onClick={leave}
          disabled={busy}
          className="flex items-center gap-1.5 font-sans text-[12px] tracking-[0.15em] text-[#9A9A9A] uppercase hover:text-[#6B6B6B] transition-colors disabled:opacity-40"
        >
          {busy ? <Loader2 className="h-3 w-3 animate-spin" /> : <BellOff className="h-3 w-3" />}
          Leave waiting list
        </button>
      </div>
    );
  }

  // Guest — show email capture form after clicking
  if (!session && showEmailForm) {
    return (
      <div className="flex-1 space-y-3">
        <p className="font-sans text-xs text-[#6B6B6B] leading-relaxed">
          Enter your email and we&apos;ll notify you the moment this piece is back in stock.
        </p>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="your@email.com"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && guestEmail && join(guestEmail)}
            className="flex-1 text-sm"
            autoFocus
          />
          <Button
            variant="gold"
            size="md"
            loading={busy}
            disabled={!guestEmail}
            onClick={() => join(guestEmail)}
            className="flex-shrink-0"
          >
            Notify me
          </Button>
        </div>
        <button
          onClick={() => setShowEmailForm(false)}
          className="font-sans text-[12px] tracking-[0.15em] text-[#9A9A9A] uppercase hover:text-[#6B6B6B] transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  // Default: invite to join
  return (
    <Button
      variant="outline"
      size="lg"
      className="flex-1"
      loading={busy}
      onClick={() => {
        if (session) join(session.user?.email ?? "");
        else setShowEmailForm(true);
      }}
    >
      <Bell className="h-4 w-4" />
      Join Waiting List
    </Button>
  );
}
