"use client";

import { useState } from "react";
import { Bell, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Props {
  productId: string;
  count: number;
}

export function NotifyWaitlistButton({ productId, count }: Props) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  if (count === 0) return null;

  async function handleNotify() {
    if (!confirm(`Send restock email to ${count} waiting customer${count !== 1 ? "s" : ""}?`)) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/waitlist/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      toast.success(`Notified ${data.notified} customer${data.notified !== 1 ? "s" : ""}`);
      setDone(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send notifications");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={handleNotify}
      disabled={busy || done}
      className="inline-flex items-center gap-1.5 font-sans text-[9px] tracking-[0.15em] uppercase transition-colors disabled:opacity-50"
      title={`Notify ${count} waiting customer${count !== 1 ? "s" : ""}`}
    >
      {busy ? (
        <Loader2 className="h-3 w-3 animate-spin text-[#85A0B5]" />
      ) : done ? (
        <CheckCircle className="h-3 w-3 text-emerald-400" />
      ) : (
        <Bell className="h-3 w-3 text-[#85A0B5]" />
      )}
      <span className={done ? "text-emerald-400" : "text-[#85A0B5] hover:text-[#9DB5C8]"}>
        {done ? "Sent" : `${count} waiting`}
      </span>
    </button>
  );
}
