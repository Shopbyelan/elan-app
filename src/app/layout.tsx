import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { NavigationProgress } from "@/components/layout/NavigationProgress";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "ÉLAN — Fine Jewellery | Worn by Royalty",
    template: "%s | ÉLAN Fine Jewellery",
  },
  description:
    "Discover Élan's curated collection of fine jewellery — 18k Gold, Sterling Silver 925, Cultivated Diamonds, Platinum 950, and Crystal Moissanite. Where Rarity Becomes Ritual.",
  keywords: [
    "fine jewellery Nigeria",
    "18k gold jewellery",
    "diamond rings Lagos",
    "luxury jewellery Nigeria",
    "moissanite rings",
    "platinum jewellery",
    "sterling silver Nigeria",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "ÉLAN Fine Jewellery",
    title: "ÉLAN — Fine Jewellery | Worn by Royalty",
    description: "Where Rarity Becomes Ritual. Crafted fine jewellery for discerning taste.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ÉLAN Fine Jewellery",
    description: "Where Rarity Becomes Ritual.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#FFFFFF] text-[#3A3A3A] antialiased">
        <Providers>
          <NavigationProgress />
          {children}
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "#111111",
                border: "1px solid #2A2A2A",
                color: "#E8E8E8",
                fontFamily: "Helvetica Neue, Arial, sans-serif",
                fontSize: "13px",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
