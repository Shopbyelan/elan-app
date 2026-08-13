import type { Metadata } from "next";
import { FAQSection } from "@/components/home/FAQSection";

export const metadata: Metadata = {
  title: "FAQ — Élan Fine Jewellery",
  description:
    "Answers to common questions about Élan's materials, product quality, orders and delivery, returns and exchanges, care and maintenance, sustainability, and the brand.",
};

export default function FAQPage() {
  return <FAQSection />;
}
