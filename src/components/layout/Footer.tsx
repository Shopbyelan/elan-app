import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#1A1A1A] mt-24">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image src="/ElanLogowhite.png" alt="Élan Fine Jewellery" width={140} height={56} className="h-10 w-auto mb-6" />
            <p className="font-sans text-xs text-[#5A5A5A] leading-relaxed max-w-48">
              Where rarity becomes ritual. Crafted for those who understand the language of fine jewellery.
            </p>
            <div className="flex gap-4 mt-6">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="text-[#5A5A5A] hover:text-[#85A0B5] transition-colors">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="#" aria-label="X" className="text-[#5A5A5A] hover:text-[#85A0B5] transition-colors">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="text-[#5A5A5A] hover:text-[#85A0B5] transition-colors">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="font-sans text-[11px] tracking-[0.3em] text-[#85A0B5] uppercase mb-6">
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
                  <Link href={l.href} className="font-sans text-xs text-[#5A5A5A] hover:text-[#9A9A9A] transition-colors tracking-wider">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-sans text-[11px] tracking-[0.3em] text-[#85A0B5] uppercase mb-6">
              Help
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/guide", label: "Client Guide" },
                { href: "/guide#authentication", label: "Authentication" },
                { href: "/guide#sizing", label: "Ring Sizing" },
                { href: "/guide#care", label: "Jewellery Care" },
                { href: "/guide#returns", label: "Returns Policy" },
                { href: "/home#faq", label: "FAQ" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-sans text-xs text-[#5A5A5A] hover:text-[#9A9A9A] transition-colors tracking-wider">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[11px] tracking-[0.3em] text-[#85A0B5] uppercase mb-6">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="font-sans text-xs text-[#5A5A5A] leading-relaxed">
                hello@shopbyelan.com
              </li>
              <li className="font-sans text-xs text-[#5A5A5A] leading-relaxed">
                +234 800 000 0000
              </li>
              <li className="font-sans text-xs text-[#5A5A5A] leading-relaxed">
                Lagos · Abuja · Port Harcourt
              </li>
            </ul>
            <div className="mt-6">
              <p className="font-sans text-[11px] tracking-[0.2em] text-[#5A5A5A] uppercase mb-2">
                Certificate of Authenticity
              </p>
              <p className="font-sans text-[11px] text-[#3A3A3A] leading-relaxed">
                Every Élan piece ships with a certificate verifying metal purity and stone specifications.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#141414] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[12px] text-[#3A3A3A] tracking-wider">
            © {new Date().getFullYear()} Élan Jewellery. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
              { href: "/cookies", label: "Cookies" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="font-sans text-[12px] text-[#3A3A3A] hover:text-[#5A5A5A] tracking-wider transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
