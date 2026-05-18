"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  entryId: string;
  productId: string;
}

export function RemoveWaitlistButton({ productId }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function handleRemove() {
    setBusy(true);
    try {
      await fetch(`/api/waitlist?productId=${productId}`, { method: "DELETE" });
      toast("Removed from waiting list");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={handleRemove}
      disabled={busy}
      className="flex items-center gap-1 font-sans text-[10px] tracking-[0.15em] text-[#5A5A5A] uppercase hover:text-red-400 transition-colors disabled:opacity-40"
      aria-label="Remove from waiting list"
    >
      {busy ? <Loader2 className="h-3 w-3 animate-spin" /> : <X className="h-3 w-3" />}
      Remove
    </button>
  );
}
