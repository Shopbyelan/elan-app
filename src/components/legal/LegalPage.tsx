import Link from "next/link";

export function LegalPage({
  label,
  title,
  updated,
  intro,
  children,
}: {
  label: string;
  title: React.ReactNode;
  updated: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#FFFFFF]">
      <section className="py-20 md:py-28 px-4 sm:px-6 border-b border-[#E4E1DA]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-sans text-[11px] tracking-[0.45em] text-[#3A5A78] uppercase mb-5">
            {label}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-[#0A0A0A] mb-5 leading-tight">
            {title}
          </h1>
          {intro && (
            <p className="font-serif text-base md:text-lg text-[#9A9A9A] italic leading-relaxed max-w-xl mx-auto mb-6">
              {intro}
            </p>
          )}
          <p className="font-sans text-[11px] tracking-[0.2em] text-[#9A9A9A] uppercase">
            Last updated: {updated}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">{children}</div>
      </section>

      {/* Quick nav to related legal pages */}
      <div className="border-t border-[#E4E1DA] py-8 px-4 sm:px-6 bg-[#F7F5F2]">
        <div className="max-w-3xl mx-auto flex flex-wrap gap-6 justify-center">
          {[
            { href: "/privacy", label: "Privacy Policy" },
            { href: "/terms", label: "Terms of Service" },
            { href: "/cookies", label: "Cookie Policy" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-sans text-[12px] tracking-[0.2em] text-[#9A9A9A] uppercase hover:text-[#3A5A78] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LSection({
  num,
  title,
  children,
}: {
  num: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12 last:mb-0">
      <h2 className="font-serif text-xl md:text-2xl text-[#0A0A0A] mb-4 flex items-baseline gap-3">
        <span className="font-sans text-xs tracking-[0.2em] text-[#85A0B5]">{num}</span>
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function LP({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-sm md:text-[15px] text-[#6B6B6B] leading-relaxed">
      {children}
    </p>
  );
}

export function LUL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 font-sans text-sm md:text-[15px] text-[#6B6B6B] leading-relaxed">
          <span className="mt-2 w-1 h-1 rounded-full bg-[#85A0B5]/60 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LNote({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-[#85A0B5]/40 bg-[#F7F5F2] pl-4 py-3 pr-4">
      <p className="font-sans text-[10px] tracking-[0.3em] text-[#3A5A78] uppercase mb-1.5">
        {label}
      </p>
      <p className="font-serif text-sm text-[#6B6B6B] italic leading-relaxed">
        {children}
      </p>
    </div>
  );
}
