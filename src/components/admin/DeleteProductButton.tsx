"use client";

import { useRef } from "react";
import { Trash2 } from "lucide-react";
import { hardDeleteProduct } from "@/actions/product.actions";

export function DeleteProductButton({ id, name, hasOrders }: { id: string; name: string; hasOrders: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);

  function handleClick() {
    const msg = hasOrders
      ? `"${name}" has existing orders and will be hidden instead of deleted. Continue?`
      : `Permanently delete "${name}"? This cannot be undone.`;

    if (window.confirm(msg)) {
      formRef.current?.requestSubmit();
    }
  }

  return (
    <form ref={formRef} action={hardDeleteProduct}>
      <input type="hidden" name="id" value={id} />
      <button
        type="button"
        onClick={handleClick}
        title={hasOrders ? "Hide product (has orders)" : "Delete product"}
        className="text-[#9A9A9A] hover:text-red-400 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </form>
  );
}
