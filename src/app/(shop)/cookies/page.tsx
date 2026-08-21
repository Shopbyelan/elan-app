import type { Metadata } from "next";
import { LegalPage, LSection, LP, LNote } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy — Élan Fine Jewellery",
  description:
    "How Élan Fine Jewellery uses cookies and similar technologies on shopbyelan.com.",
};

const cookieGroups = [
  {
    name: "Essential",
    required: true,
    purpose:
      "Required for the Site to function — keeping you signed in, remembering items in your cart and wishlist, and securing checkout. The Site cannot operate correctly without these.",
    examples: "Session and authentication cookies, cart and wishlist state",
  },
  {
    name: "Functional",
    required: false,
    purpose:
      "Remember your preferences, such as recently viewed items, to make your visit smoother on return.",
    examples: "Preference and display-state cookies",
  },
];

export default function CookiePolicyPage() {
  return (
    <LegalPage
      label="Legal"
      title="Cookie Policy"
      updated="14 August 2026"
      intro="A plain explanation of the cookies we use on shopbyelan.com, and why."
    >
      <div className="space-y-12">
        <LSection num="01" title="What Are Cookies?">
          <LP>
            Cookies are small text files stored on your device when you visit a website. They help
            the site remember information about your visit — such as your login state or the
            contents of your cart — making your next visit easier and the site more useful.
          </LP>
        </LSection>

        <LSection num="02" title="Cookies We Use">
          <LP>
            We keep cookie use on shopbyelan.com deliberately minimal. We do not currently use
            third-party advertising or analytics cookies. Here is what we do use:
          </LP>

          <div className="space-y-px bg-[#E4E1DA] mt-6">
            {cookieGroups.map((group) => (
              <div key={group.name} className="bg-[#FFFFFF] p-5 md:p-6">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <p className="font-sans text-[11px] tracking-[0.3em] text-[#3A5A78] uppercase">
                    {group.name}
                  </p>
                  <span
                    className={`font-sans text-[10px] tracking-[0.2em] uppercase px-2.5 py-1 border ${
                      group.required
                        ? "border-[#3A5A78]/40 text-[#3A5A78]"
                        : "border-[#9A9A9A]/40 text-[#9A9A9A]"
                    }`}
                  >
                    {group.required ? "Always Active" : "Optional"}
                  </span>
                </div>
                <p className="font-sans text-sm text-[#6B6B6B] leading-relaxed mb-2">
                  {group.purpose}
                </p>
                <p className="font-sans text-xs text-[#9A9A9A] italic">
                  Examples: {group.examples}
                </p>
              </div>
            ))}
          </div>
          <LP>
            Our AI chat concierge keeps your conversation in your browser&apos;s session storage
            (not a cookie) so it&apos;s there if you navigate between pages, and clears automatically
            when you close the tab. It is never sent to Élan&apos;s own database.
          </LP>
        </LSection>

        <LSection num="03" title="Payment Processing">
          <LP>
            Checkout is handled by our payment partner, Paystack, which may set its own cookies
            during the payment process to prevent fraud and ensure your transaction completes
            securely. This occurs on Paystack's secure payment page and is governed by Paystack's own
            privacy and cookie practices.
          </LP>
        </LSection>

        <LSection num="04" title="Managing Cookies">
          <LP>
            Essential cookies cannot be disabled, as they are required for core functions like
            staying signed in and checking out. You can control or delete non-essential cookies
            through your browser settings at any time. Note that blocking essential cookies will
            affect the Site's functionality, including your ability to sign in or complete a
            purchase.
          </LP>
        </LSection>

        <LSection num="05" title="Changes to This Policy">
          <LP>
            As our Site evolves, the cookies we use may change. We will update this page to reflect
            any changes, with the &ldquo;Last updated&rdquo; date revised accordingly.
          </LP>
        </LSection>

        <LSection num="06" title="Contact Us">
          <LP>Questions about our use of cookies can be directed to:</LP>
          <LNote label="Client Services">
            hello@shopbyelan.com · 0707 957 9907 · Lagos · Abuja · Port Harcourt, Nigeria
          </LNote>
        </LSection>
      </div>
    </LegalPage>
  );
}
