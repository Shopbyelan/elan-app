import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { FooterNewsletterForm } from "./FooterNewsletterForm";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2347079579907";
const WHATSAPP_MESSAGE =
  "Hello! I'm interested in an Élan jewellery piece and would love some guidance.";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1A1A1A] mt-24">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image src="/ElanLogowhite.png" alt="Élan Fine Jewellery" width={140} height={56} className="h-10 w-auto mb-6" />
            <p className="font-sans text-sm text-[#5A5A5A] leading-relaxed max-w-48">
              Where rarity becomes ritual. Crafted for those who understand the language of fine jewellery.
            </p>
            <div className="flex gap-4 mt-6">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/shop.by.elan?igsh=ZHYzZXM3eWd6aXB3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#5A5A5A] hover:text-[#85A0B5] transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@shopbyelan?_r=1&_t=ZS-98rhaod7IHo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-[#5A5A5A] hover:text-[#85A0B5] transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.6 5.82c-1.02-.88-1.63-2.15-1.63-3.53h-3.15v13.84c0 1.63-1.32 2.95-2.95 2.95a2.95 2.95 0 0 1 0-5.9c.3 0 .59.05.86.13V9.29a6.1 6.1 0 0 0-.86-.06 6.1 6.1 0 1 0 6.1 6.1V9.85a9.19 9.19 0 0 0 5.37 1.72V8.42a5.98 5.98 0 0 1-3.74-2.6z"/>
                </svg>
              </a>
            </div>
            <FooterNewsletterForm />
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.3em] text-[#85A0B5] uppercase mb-6">
              Collections
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/shop?category=18k-gold", label: "18k Gold" },
                { href: "/shop?category=sterling-silver", label: "Sterling Silver" },
                { href: "/shop?category=cultivated-diamond", label: "Cultivated Diamond" },
                { href: "/shop?category=platinum", label: "Platinum 950" },
                { href: "/shop?category=crystal-moissanite", label: "Crystal Moissanite" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-sans text-sm text-[#5A5A5A] hover:text-[#9A9A9A] transition-colors tracking-wider">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.3em] text-[#85A0B5] uppercase mb-6">
              Help
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/guide", label: "Client Guide" },
                { href: "/guide#authentication", label: "Authentication" },
                { href: "/guide#sizing", label: "Ring Sizing" },
                { href: "/guide#care", label: "Jewellery Care" },
                { href: "/guide#returns", label: "Returns Policy" },
                { href: "/faq", label: "FAQ" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-sans text-sm text-[#5A5A5A] hover:text-[#9A9A9A] transition-colors tracking-wider">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs tracking-[0.3em] text-[#85A0B5] uppercase mb-6">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="font-sans text-sm text-[#5A5A5A] leading-relaxed">
                hello@shopbyelan.com
              </li>
              <li className="font-sans text-sm text-[#5A5A5A] leading-relaxed">
                0707 957 9907
              </li>
              <li className="font-sans text-sm text-[#5A5A5A] leading-relaxed">
                Lagos · Abuja · Port Harcourt
              </li>
            </ul>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 border border-[#25D366]/40 text-[#25D366] px-4 py-2.5 font-sans text-xs tracking-[0.15em] uppercase hover:bg-[#25D366] hover:text-[#0A0A0A] transition-colors duration-200"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
            <div className="mt-6">
              <p className="font-sans text-xs tracking-[0.2em] text-[#5A5A5A] uppercase mb-2">
                Certificate of Authenticity
              </p>
              <p className="font-sans text-xs text-[#3A3A3A] leading-relaxed">
                Every Élan piece ships with a certificate verifying metal purity and stone specifications.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#141414] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-sm text-[#3A3A3A] tracking-wider">
            © {new Date().getFullYear()} Élan Jewellery. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
              { href: "/cookies", label: "Cookies" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="font-sans text-sm text-[#3A3A3A] hover:text-[#5A5A5A] tracking-wider transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
