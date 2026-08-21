import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NewsletterPopup } from "@/components/common/NewsletterPopup";
import { ChatWidget } from "@/components/common/ChatWidget";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <NewsletterPopup />
      <ChatWidget />
    </>
  );
}
