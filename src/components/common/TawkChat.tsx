"use client";

import Script from "next/script";

const PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
const WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

export function TawkChat() {
  if (!PROPERTY_ID || !WIDGET_ID) return null;

  return (
    <Script
      id="tawk-to"
      strategy="lazyOnload"
      src={`https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}`}
    />
  );
}
