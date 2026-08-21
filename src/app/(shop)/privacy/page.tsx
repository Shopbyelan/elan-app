import type { Metadata } from "next";
import { LegalPage, LSection, LP, LUL, LNote } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Élan Fine Jewellery",
  description:
    "How Élan Fine Jewellery collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      label="Legal"
      title="Privacy Policy"
      updated="14 August 2026"
      intro="Your trust is part of what you're buying. Here is exactly what we collect, why, and how it's protected."
    >
      <div className="space-y-12">
        <LSection num="01" title="Who We Are">
          <LP>
            This Privacy Policy applies to Élan Fine Jewellery (&ldquo;Élan&rdquo;, &ldquo;we&rdquo;,
            &ldquo;us&rdquo;, or &ldquo;our&rdquo;), operating at shopbyelan.com and across our social
            channels. It explains how we collect, use, disclose, and safeguard your information when
            you visit our site, create an account, or place an order.
          </LP>
          <LP>
            We are based in Nigeria and process personal data in accordance with the Nigeria Data
            Protection Act (NDPA) 2023 and applicable Nigeria Data Protection Regulation (NDPR)
            guidance.
          </LP>
        </LSection>

        <LSection num="02" title="Information We Collect">
          <LP>We collect information you provide directly to us, including:</LP>
          <LUL
            items={[
              "Account details — name, email address, and password when you register.",
              "Order information — billing and delivery address, phone number, and items purchased.",
              "Payment information — processed directly by our payment partner, Paystack. Élan does not store your full card or bank details on our servers.",
              "Communications — messages sent via our contact forms, WhatsApp, live chat, or email.",
              "Newsletter details — your email address if you subscribe to updates.",
            ]}
          />
          <LP>We also collect certain information automatically when you use our site:</LP>
          <LUL
            items={[
              "Device and usage data — browser type, pages visited, and general session activity, used to keep the site secure and functioning correctly.",
              "Cookies and similar technologies — see our Cookie Policy for full detail.",
            ]}
          />
        </LSection>

        <LSection num="03" title="How We Use Your Information">
          <LUL
            items={[
              "To process and fulfil your orders, including delivery, exchanges, and refunds.",
              "To create and maintain your account, and authenticate you when you sign in.",
              "To communicate with you about your order, account, or enquiries.",
              "To send you marketing communications, only if you have opted in — you may unsubscribe at any time.",
              "To detect, prevent, and address fraud, abuse, or security issues.",
              "To comply with legal and regulatory obligations.",
            ]}
          />
        </LSection>

        <LSection num="04" title="Who We Share Information With">
          <LP>
            We do not sell your personal information. We share data only with trusted service
            providers who help us operate Élan, and only to the extent necessary for them to
            perform their function:
          </LP>
          <LUL
            items={[
              <><strong className="text-[#3A3A3A] font-normal">Paystack</strong> — to process payments securely.</>,
              <><strong className="text-[#3A3A3A] font-normal">Cloudinary</strong> — to host and deliver product imagery.</>,
              <><strong className="text-[#3A3A3A] font-normal">Resend</strong> — to deliver transactional emails such as order confirmations and account notifications.</>,
              <><strong className="text-[#3A3A3A] font-normal">Anthropic</strong> — our AI chat assistant sends your chat messages to Anthropic&apos;s Claude API to generate a reply. Messages are processed transiently to produce that reply and are not stored in Élan&apos;s database.</>,
              "Delivery and courier partners — to fulfil and track your shipment.",
              "Regulators or law enforcement, where required by law.",
            ]}
          />
        </LSection>

        <LSection num="05" title="Data Retention">
          <LP>
            We retain account and order information for as long as your account is active, and for a
            reasonable period afterward to meet legal, accounting, tax, and dispute-resolution
            requirements. You may request deletion of your account at any time, subject to
            information we are required to retain by law.
          </LP>
        </LSection>

        <LSection num="06" title="Your Rights">
          <LP>Subject to applicable law, you have the right to:</LP>
          <LUL
            items={[
              "Access the personal information we hold about you.",
              "Request correction of inaccurate or incomplete information.",
              "Request deletion of your personal information.",
              "Withdraw consent to marketing communications at any time.",
              "Object to or restrict certain processing of your data.",
            ]}
          />
          <LP>
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:hello@shopbyelan.com" className="text-[#3A5A78] hover:underline">
              hello@shopbyelan.com
            </a>
            . We will respond within a reasonable timeframe.
          </LP>
        </LSection>

        <LSection num="07" title="Data Security">
          <LP>
            We use industry-standard technical and organisational measures — including encrypted
            connections and restricted access to personal data — to protect your information.
            However, no method of transmission over the internet is completely secure, and we cannot
            guarantee absolute security.
          </LP>
        </LSection>

        <LSection num="08" title="Children's Privacy">
          <LP>
            Élan is not directed at children under 18. We do not knowingly collect personal
            information from minors. If you believe a minor has provided us with personal data,
            please contact us so we can remove it.
          </LP>
        </LSection>

        <LSection num="09" title="Changes to This Policy">
          <LP>
            We may update this Privacy Policy from time to time to reflect changes in our practices
            or legal requirements. The &ldquo;Last updated&rdquo; date above reflects the most recent
            revision. Continued use of our site after changes take effect constitutes acceptance of
            the revised policy.
          </LP>
        </LSection>

        <LSection num="10" title="Contact Us">
          <LP>
            Questions about this Privacy Policy or how your data is handled can be directed to:
          </LP>
          <LNote label="Client Services">
            hello@shopbyelan.com · 0707 957 9907 · Lagos · Abuja · Port Harcourt, Nigeria
          </LNote>
        </LSection>
      </div>
    </LegalPage>
  );
}
