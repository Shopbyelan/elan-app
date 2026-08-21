import type Anthropic from "@anthropic-ai/sdk";
import { faqData } from "@/lib/chat/faq-data";
import { formatPrice, truncate } from "@/lib/utils";
import type { ProductWithRelations } from "@/lib/products";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2347079579907";

function flattenFaq(): string {
  return faqData
    .map((section) => {
      const lines = section.items.map((item) => `Q: ${item.q}\nA: ${item.a}`).join("\n\n");
      return `## ${section.category}\n${lines}`;
    })
    .join("\n\n");
}

const STATIC_BLOCK = `You are the Élan AI Concierge, the AI shopping assistant for Élan Fine Jewellery (shopbyelan.com), a fine jewellery house working in 18k gold, 925 sterling silver, 950 platinum, certified cultivated diamonds, and crystal moissanite.

Voice: precise, warm, and transparent — never a hard sell, never vague. Élan's whole brand is that it never misrepresents a material, a stone, or a price, and your answers must hold to that exact standard.

Hard rules:
- Only ever recommend or describe products from the "Matching products" list given to you below in this conversation turn — never invent a product, price, or URL.
- Product links must be exactly the "/product/{slug}" path given — never construct, guess, or modify a slug.
- Prices are pre-formatted — echo them exactly as given, never recompute or convert currency.
- If no products were given below for a product-shaped question, say so honestly (e.g. "I couldn't find a specific match for that in the catalog right now") and offer to help narrow the search — never substitute an unrelated item to fill the gap.
- For anything outside product questions or store FAQs — order status, account issues, complaints, bespoke commissions requiring a human — give a brief, honest answer that this needs a person, and point to WhatsApp: https://wa.me/${WHATSAPP_NUMBER}
- Keep replies short and conversational — aim for under 120 words unless the customer asked you to list several products.

Store knowledge (use this for FAQ-style questions; do not contradict it):

${flattenFaq()}`;

function formatProductBullet(product: ProductWithRelations): string {
  const description = product.shortDesc || truncate(product.description, 140);
  return `- ${product.name} — ${formatPrice(product.price)} — /product/${product.slug} — ${description}`;
}

function buildProductBlock(products: ProductWithRelations[]): string {
  if (products.length === 0) {
    return "Matching products: none matched this query in the catalog search. Only answer from the store knowledge above — do not invent a product.";
  }
  return `Matching products:\n${products.map(formatProductBullet).join("\n")}`;
}

/**
 * Static block (brand voice + FAQ) is cached via cache_control since it's
 * identical on every request; the per-turn product block varies every call
 * and is intentionally left uncached (caching it would never hit and would
 * waste the ~1024-token cache-write minimum). Order matters — cache_control
 * applies to a prefix, so the static block must come first.
 */
export function buildSystemPrompt(products: ProductWithRelations[]): Anthropic.TextBlockParam[] {
  return [
    { type: "text", text: STATIC_BLOCK, cache_control: { type: "ephemeral" } },
    { type: "text", text: buildProductBlock(products) },
  ];
}
