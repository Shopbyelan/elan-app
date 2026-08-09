"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2347079579907";
  const message = encodeURIComponent(
    "Hello! I'm interested in an Élan jewellery piece and would love some guidance."
  );
  const url = `https://wa.me/${number}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 shadow-lg hover:bg-[#20BD5A] transition-colors duration-200 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="font-sans text-xs tracking-wider uppercase font-medium hidden group-hover:block">
        Chat with us
      </span>
    </a>
  );
}
