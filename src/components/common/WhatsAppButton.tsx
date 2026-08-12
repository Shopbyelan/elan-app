"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const GREETING =
  "Hi there! 👋 Welcome to Élan Jewelry. How can we help you find the perfect piece today?";
const DEFAULT_MESSAGE =
  "Hello! I'm interested in an Élan jewellery piece and would love some guidance.";

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2347079579907";

  function handleSend() {
    const lines = [];
    if (name.trim()) lines.push(`Name: ${name.trim()}`);
    if (email.trim()) lines.push(`Email: ${email.trim()}`);
    lines.push(text.trim() || DEFAULT_MESSAGE);

    const message = lines.join("\n");
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setText("");
    setIsOpen(false);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div className="w-[320px] max-w-[calc(100vw-3rem)] bg-white border border-[#E4E1DA] shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#0A0A0A] px-4 py-4 flex items-start justify-between">
            <div>
              <p className="font-serif text-base text-white">Élan Jewelry</p>
              <p className="font-sans text-[11px] text-[#85A0B5] flex items-center gap-1.5 mt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25D366] inline-block" />
                Typically replies within minutes
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-[#F7F5F2] min-h-35">
            <div className="bg-white border border-[#E4E1DA] px-3 py-2 max-w-[85%] font-sans text-xs text-[#3A3A3A] leading-relaxed shadow-sm">
              {GREETING}
            </div>
          </div>

          {/* Contact details */}
          <div className="px-3 pt-3 bg-white flex gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="flex-1 min-w-0 font-sans text-xs px-3 py-2 border border-[#E4E1DA] text-[#3A3A3A] focus:outline-none focus:border-[#3A5A78] placeholder:text-[#9A9A9A] transition-colors"
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your email"
              className="flex-1 min-w-0 font-sans text-xs px-3 py-2 border border-[#E4E1DA] text-[#3A3A3A] focus:outline-none focus:border-[#3A5A78] placeholder:text-[#9A9A9A] transition-colors"
            />
          </div>

          {/* Message + send */}
          <div className="p-3 border-t border-[#E4E1DA] bg-white flex items-center gap-2 mt-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 font-sans text-xs px-3 py-2 border border-[#E4E1DA] text-[#3A3A3A] focus:outline-none focus:border-[#3A5A78] placeholder:text-[#9A9A9A] transition-colors"
            />
            <button
              onClick={handleSend}
              aria-label="Send message on WhatsApp"
              className="shrink-0 bg-[#25D366] text-white p-2.5 hover:bg-[#20BD5A] transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="px-3 pb-2 pt-1 font-sans text-[10px] text-[#9A9A9A] bg-white">
            Continues on WhatsApp
          </p>
        </div>
      )}

      {/* Toggle bubble */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close chat" : "Chat with us"}
        className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 shadow-lg hover:bg-[#20BD5A] transition-colors duration-200 group"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        {!isOpen && (
          <span className="font-sans text-xs tracking-wider uppercase font-medium hidden group-hover:block">
            Chat with us
          </span>
        )}
      </button>
    </div>
  );
}
