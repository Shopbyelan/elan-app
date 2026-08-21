"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, Send, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = "elan_chat_history";
const HISTORY_SENT_TO_API = 8;
const GREETING =
  "Hi, I'm the Élan AI Concierge. Ask me about a piece, materials, sizing, or our policies — I'll point you in the right direction.";

const PRODUCT_LINK_RE = /\/product\/[a-z0-9-]+/g;

function renderContent(content: string) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  PRODUCT_LINK_RE.lastIndex = 0;
  while ((match = PRODUCT_LINK_RE.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={key++}>{content.slice(lastIndex, match.index)}</span>);
    }
    parts.push(
      <Link key={key++} href={match[0]} className="underline text-[#3A5A78] hover:text-[#2E4560]">
        {match[0]}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < content.length) {
    parts.push(<span key={key++}>{content.slice(lastIndex)}</span>);
  }
  return parts;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setMessages(JSON.parse(stored));
    } catch {
      // ignore malformed/unavailable storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore storage quota/availability errors
    }
  }, [messages, hydrated]);

  useEffect(() => {
    if (open) scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, loading]);

  useEffect(() => {
    if (rateLimitSeconds <= 0) return;
    const timer = setTimeout(() => setRateLimitSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearTimeout(timer);
  }, [rateLimitSeconds]);

  const isDisabled = loading || rateLimitSeconds > 0;

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isDisabled) return;

    const history = messages.slice(-HISTORY_SENT_TO_API);
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();

      if (res.status === 429) {
        const retryAfter = Number(res.headers.get("Retry-After"));
        if (retryAfter > 0) setRateLimitSeconds(retryAfter);
        setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
        return;
      }

      if (!res.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong reaching the concierge — please try again, or message us on WhatsApp for immediate help.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[70vh] bg-white border border-[#E4E1DA] shadow-xl flex flex-col">
          <div className="flex items-center justify-between px-4 py-3.5 bg-[#0A0A0A] shrink-0">
            <p className="font-sans text-xs tracking-[0.2em] text-white uppercase">Élan AI Concierge</p>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-[#9A9A9A] hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#FAF9F7]">
            <div className="max-w-[85%] bg-[#F7F5F2] text-[#3A3A3A] text-sm font-sans leading-relaxed px-3.5 py-2.5 border border-[#E4E1DA]">
              {GREETING}
            </div>
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[85%] text-sm font-sans leading-relaxed px-3.5 py-2.5",
                  m.role === "user"
                    ? "ml-auto bg-[#0A0A0A] text-white"
                    : "bg-[#F7F5F2] text-[#3A3A3A] border border-[#E4E1DA]"
                )}
              >
                {renderContent(m.content)}
              </div>
            ))}
            {loading && (
              <div className="bg-[#F7F5F2] text-[#9A9A9A] border border-[#E4E1DA] px-3.5 py-2.5 w-fit flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce" />
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2 p-3 border-t border-[#E4E1DA] shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a piece, sizing, returns…"
              disabled={isDisabled}
              className="flex-1 h-10 px-3 text-sm font-sans bg-[#F7F5F2] border border-[#E4E1DA] placeholder:text-[#9A9A9A] focus:outline-none focus:border-[#3A5A78] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isDisabled || !input.trim()}
              aria-label="Send message"
              className="h-10 w-10 flex items-center justify-center bg-[#85A0B5] text-black hover:bg-[#9DB5C8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="h-14 w-14 rounded-full bg-[#0A0A0A] hover:bg-[#3A5A78] text-white flex items-center justify-center shadow-lg transition-colors"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  );
}
