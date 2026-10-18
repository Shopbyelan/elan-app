/**
 * Google "Preferred sources" lets searchers pin sites they want to see more of
 * in Top Stories. This deep link opens Google's preference page with our
 * domain pre-filled, so adding ÉLAN is a single tap.
 */
const SITE_DOMAIN = "shopbyelan.com";
const PREFERRED_SOURCE_URL = `https://www.google.com/preferences/source?q=${SITE_DOMAIN}`;

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.46a5.52 5.52 0 0 1-2.4 3.62v3h3.88c2.27-2.09 3.58-5.17 3.58-8.81Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.92l-3.88-3c-1.07.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.72-4.95H1.27v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.28 14.28A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.38-2.28v-3.1H1.27a12 12 0 0 0 0 10.76l4.01-3.1Z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.27 6.62l4.01 3.1C6.22 6.88 8.87 4.77 12 4.77Z" />
    </svg>
  );
}

export function PreferredSourceBar() {
  return (
    <div className="border-b border-[#1A1A1A] bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <p className="font-serif text-lg text-white">See ÉLAN first on Google</p>
          <p className="font-sans text-xs text-[#5A5A5A] mt-1 tracking-wide">
            Add us as a preferred source to catch new collections and stories in your search results.
          </p>
        </div>
        <a
          href={PREFERRED_SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex-shrink-0 inline-flex items-center gap-3 rounded-full bg-white pl-2 pr-5 py-2 transition-all duration-300 hover:shadow-[0_0_0_4px_rgba(133,160,181,0.25)]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
            <GoogleG className="h-5 w-5" />
          </span>
          <span className="font-sans text-[13px] text-[#1F1F1F] leading-tight">
            Add as a preferred source <span className="font-medium">on Google</span>
          </span>
        </a>
      </div>
    </div>
  );
}
