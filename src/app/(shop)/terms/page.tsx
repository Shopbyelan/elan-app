import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, LSection, LP, LUL, LNote } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — Élan Fine Jewellery",
  description:
    "The terms and conditions governing your use of the Élan Fine Jewellery website and your purchase of our products.",
};

export default function TermsPage() {
  return (
    <LegalPage
      label="Legal"
      title="Terms of Service"
      updated="14 August 2026"
      intro="The terms that govern your use of shopbyelan.com and any purchase you make with us."
    >
      <div className="space-y-12">
        <LSection num="01" title="Acceptance of Terms">
          <LP>
            By accessing or using shopbyelan.com (the &ldquo;Site&rdquo;), creating an account, or
            placing an order, you agree to be bound by these Terms of Service. If you do not agree,
            please do not use the Site.
          </LP>
        </LSection>

        <LSection num="02" title="Eligibility">
          <LP>
            You must be at least 18 years old, or the age of majority in your jurisdiction, to create
            an account or place an order with Élan. By using the Site, you confirm that you meet this
            requirement.
          </LP>
        </LSection>

        <LSection num="03" title="Accounts">
          <LUL
            items={[
              "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.",
              "You agree to provide accurate, current, and complete information when creating an account or placing an order.",
              "We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or misuse the Site.",
            ]}
          />
        </LSection>

        <LSection num="04" title="Products, Pricing & Availability">
          <LUL
            items={[
              "All prices are listed in Nigerian Naira (NGN) unless otherwise stated, and are subject to change without notice.",
              "We make every effort to accurately describe and photograph our pieces. Minor variations in colour, due to display settings, or in natural stone characteristics, may occur.",
              "Availability is not guaranteed until an order is confirmed. In the rare event a piece becomes unavailable after purchase, we will notify you and offer a full refund or an alternative.",
              "Bespoke, engraved, and custom-sized pieces are made to order and may carry different lead times, communicated at the point of purchase.",
            ]}
          />
        </LSection>

        <LSection num="05" title="Orders & Payment">
          <LUL
            items={[
              "Orders are processed once payment is confirmed. Payments are handled securely by our payment partner, Paystack — Élan does not store your full card details.",
              "We reserve the right to refuse or cancel any order, including in cases of suspected fraud, pricing errors, or stock unavailability. Where an order is cancelled after payment, a full refund will be issued.",
              "You will receive email confirmation once your order is placed, and further updates as it is processed and dispatched.",
            ]}
          />
        </LSection>

        <LSection num="06" title="Shipping & Delivery">
          <LP>
            Estimated delivery times are provided at checkout and in our{" "}
            <Link href="/faq" className="text-[#3A5A78] hover:underline">FAQ</Link>. All orders are
            insured in transit and require a signature on delivery. Risk of loss passes to you once
            an order is delivered to the address provided at checkout.
          </LP>
        </LSection>

        <LSection num="07" title="Returns, Exchanges & Refunds">
          <LP>
            Our full return, exchange, and refund terms are set out in our{" "}
            <Link href="/guide#returns" className="text-[#3A5A78] hover:underline">
              Return &amp; Exchange Policy
            </Link>
            , which forms part of these Terms. In summary: unworn pieces may be returned within 2
            days of confirmed delivery, exchanges are accepted within 14 days subject to inspection,
            and refunds are issued only where a piece arrives damaged, defective, or materially
            different from what was ordered due to an error on our part.
          </LP>
        </LSection>

        <LSection num="08" title="Authentication & Product Guarantees">
          <LP>
            Every Élan piece is authenticated according to its material — GIA/IGI certification,
            an Élan Stone Specification Card, or an engraved metal hallmark, as detailed in our{" "}
            <Link href="/guide#authentication" className="text-[#3A5A78] hover:underline">
              Client Guide
            </Link>
            . We stand behind the accuracy of every certification and specification we issue.
          </LP>
        </LSection>

        <LSection num="09" title="Intellectual Property">
          <LP>
            All content on the Site — including product photography, designs, text, logos, and the
            Élan name and branding — is the property of Élan Fine Jewellery or its licensors and is
            protected by applicable intellectual property laws. You may not reproduce, distribute, or
            create derivative works from our content without prior written consent.
          </LP>
        </LSection>

        <LSection num="10" title="Prohibited Use">
          <LP>You agree not to:</LP>
          <LUL
            items={[
              "Use the Site for any unlawful purpose or in violation of these Terms.",
              "Attempt to gain unauthorised access to our systems, accounts, or data.",
              "Interfere with or disrupt the Site's security features or normal operation.",
              "Use automated means (bots, scrapers) to access or extract data from the Site without permission.",
            ]}
          />
        </LSection>

        <LSection num="11" title="Limitation of Liability">
          <LP>
            To the fullest extent permitted by law, Élan shall not be liable for any indirect,
            incidental, or consequential damages arising from your use of the Site or purchase of our
            products, beyond the value of the order in question. Nothing in these Terms limits any
            liability that cannot be excluded under applicable Nigerian law.
          </LP>
        </LSection>

        <LSection num="12" title="Governing Law">
          <LP>
            These Terms are governed by the laws of the Federal Republic of Nigeria. Any dispute
            arising from these Terms or your use of the Site shall be subject to the exclusive
            jurisdiction of the courts of Nigeria.
          </LP>
        </LSection>

        <LSection num="13" title="Changes to These Terms">
          <LP>
            We may update these Terms from time to time. Changes take effect once posted to this
            page, with the &ldquo;Last updated&rdquo; date revised accordingly. Continued use of the
            Site after changes take effect constitutes acceptance of the revised Terms.
          </LP>
        </LSection>

        <LSection num="14" title="Contact Us">
          <LP>Questions about these Terms can be directed to:</LP>
          <LNote label="Client Services">
            hello@shopbyelan.com · 0707 957 9907 · Lagos · Abuja · Port Harcourt, Nigeria
          </LNote>
        </LSection>
      </div>
    </LegalPage>
  );
}
