import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

export async function sendWelcomeEmail(to: string, name: string) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: "Welcome to Élan — Where Rarity Becomes Ritual",
    html: `
      <div style="font-family: Georgia, serif; background:#0a0a0a; color:#fff; padding:40px; max-width:600px; margin:0 auto;">
        <h1 style="color:#85A0B5; font-size:32px; margin-bottom:8px;">ÉLAN</h1>
        <p style="color:#9a9a9a; font-size:12px; letter-spacing:4px; margin-bottom:32px;">FINE JEWELLERY</p>
        <h2 style="font-size:24px; margin-bottom:16px;">Welcome, ${name}</h2>
        <p style="color:#ccc; line-height:1.8;">
          You have joined a circle of those who understand that luxury is not merely ownership — it is the considered choice of excellence.
        </p>
        <p style="color:#ccc; line-height:1.8; margin-top:16px;">
          Explore our curated collections, each piece crafted to endure generations.
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/shop"
           style="display:inline-block; margin-top:32px; background:#85A0B5; color:#000; padding:14px 32px; text-decoration:none; font-size:13px; letter-spacing:2px;">
          DISCOVER THE COLLECTION
        </a>
      </div>
    `,
  });
}

export async function sendOrderConfirmationEmail(
  to: string,
  name: string,
  orderNumber: string,
  total: number,
  isGuest = false
) {
  const orderUrl = isGuest
    ? `${process.env.NEXT_PUBLIC_APP_URL}/order-confirmed?ref=${orderNumber}`
    : `${process.env.NEXT_PUBLIC_APP_URL}/orders`;

  return resend.emails.send({
    from: FROM,
    to,
    subject: `Order Confirmed — ${orderNumber}`,
    html: `
      <div style="font-family: Georgia, serif; background:#0a0a0a; color:#fff; padding:40px; max-width:600px; margin:0 auto;">
        <h1 style="color:#85A0B5; font-size:32px; margin-bottom:8px;">ÉLAN</h1>
        <p style="color:#9a9a9a; font-size:12px; letter-spacing:4px; margin-bottom:32px;">FINE JEWELLERY</p>
        <h2 style="font-size:24px; margin-bottom:8px;">Order Confirmed</h2>
        <p style="color:#85A0B5; font-size:14px; letter-spacing:2px;">${orderNumber}</p>
        <p style="color:#ccc; line-height:1.8; margin-top:24px;">
          Dear ${name}, your order has been received and is being prepared with the utmost care.
        </p>
        <div style="background:#111; padding:24px; margin:24px 0; border-left:2px solid #85A0B5;">
          <p style="color:#9a9a9a; font-size:12px; letter-spacing:2px; margin:0 0 8px;">ORDER TOTAL</p>
          <p style="color:#85A0B5; font-size:24px; margin:0;">₦${total.toLocaleString()}</p>
        </div>
        <a href="${orderUrl}"
           style="display:inline-block; background:#85A0B5; color:#000; padding:14px 32px; text-decoration:none; font-size:13px; letter-spacing:2px;">
          VIEW ORDER
        </a>
        <p style="color:#5a5a5a; font-size:12px; margin-top:32px;">
          Keep your order reference: <strong style="color:#9a9a9a;">${orderNumber}</strong>
        </p>
      </div>
    `,
  });
}

export async function sendEmailVerificationEmail(to: string, name: string, verifyUrl: string) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: "Verify your Élan account",
    html: `
      <div style="font-family: Georgia, serif; background:#0a0a0a; color:#fff; padding:40px; max-width:600px; margin:0 auto;">
        <h1 style="color:#85A0B5; font-size:32px; margin-bottom:8px;">ÉLAN</h1>
        <p style="color:#9a9a9a; font-size:12px; letter-spacing:4px; margin-bottom:32px;">FINE JEWELLERY</p>
        <h2 style="font-size:22px; margin-bottom:16px;">Verify your email</h2>
        <p style="color:#ccc; line-height:1.8;">
          Hello ${name}, please verify your email address to activate your account.
        </p>
        <a href="${verifyUrl}"
           style="display:inline-block; margin-top:32px; background:#85A0B5; color:#000; padding:14px 32px; text-decoration:none; font-size:13px; letter-spacing:2px;">
          VERIFY EMAIL
        </a>
        <p style="color:#5a5a5a; font-size:12px; margin-top:32px;">
          This link expires in 24 hours. If you did not create an account, ignore this email.
        </p>
      </div>
    `,
  });
}

export async function sendNewsletterConfirmEmail(to: string) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: "You're on the list — Élan Fine Jewellery",
    html: `
      <div style="font-family: Georgia, serif; background:#0a0a0a; color:#fff; padding:40px; max-width:600px; margin:0 auto;">
        <h1 style="color:#85A0B5; font-size:32px; margin-bottom:8px;">ÉLAN</h1>
        <p style="color:#9a9a9a; font-size:12px; letter-spacing:4px; margin-bottom:32px;">FINE JEWELLERY</p>
        <h2 style="font-size:22px; margin-bottom:16px;">You're on the list.</h2>
        <p style="color:#ccc; line-height:1.8;">
          Thank you for subscribing. You'll be the first to know about new collections,
          exclusive events, and the stories behind each piece.
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/shop"
           style="display:inline-block; margin-top:32px; background:#85A0B5; color:#000; padding:14px 32px; text-decoration:none; font-size:13px; letter-spacing:2px;">
          EXPLORE THE COLLECTION
        </a>
      </div>
    `,
  });
}

export async function sendWaitlistNotificationEmail(
  to: string,
  productName: string,
  productUrl: string,
) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: `Back in Stock — ${productName} | ÉLAN`,
    html: `
      <div style="font-family: Georgia, serif; background:#0a0a0a; color:#fff; padding:40px; max-width:600px; margin:0 auto;">
        <h1 style="color:#85A0B5; font-size:32px; margin-bottom:8px;">ÉLAN</h1>
        <p style="color:#9a9a9a; font-size:12px; letter-spacing:4px; margin-bottom:32px;">FINE JEWELLERY</p>
        <h2 style="font-size:22px; margin-bottom:8px;">Good news — it's back.</h2>
        <p style="color:#85A0B5; font-size:14px; letter-spacing:2px; margin-bottom:24px;">${productName}</p>
        <p style="color:#ccc; line-height:1.8;">
          A piece you've been waiting for is back in stock. We're reaching out to you first
          as a member of our exclusive waiting list. Quantities may be limited — shop now to secure yours.
        </p>
        <a href="${productUrl}"
           style="display:inline-block; margin-top:32px; background:#85A0B5; color:#000; padding:14px 32px; text-decoration:none; font-size:13px; letter-spacing:2px;">
          SHOP NOW
        </a>
        <p style="color:#5a5a5a; font-size:12px; margin-top:32px;">
          You received this because you joined the waiting list for this piece.
        </p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: "Reset Your Élan Password",
    html: `
      <div style="font-family: Georgia, serif; background:#0a0a0a; color:#fff; padding:40px; max-width:600px; margin:0 auto;">
        <h1 style="color:#85A0B5; font-size:32px; margin-bottom:32px;">ÉLAN</h1>
        <h2 style="font-size:20px; margin-bottom:16px;">Password Reset Request</h2>
        <p style="color:#ccc; line-height:1.8;">
          We received a request to reset your password. Click the button below to create a new one.
          This link expires in 1 hour.
        </p>
        <a href="${resetUrl}"
           style="display:inline-block; margin-top:32px; background:#85A0B5; color:#000; padding:14px 32px; text-decoration:none; font-size:13px; letter-spacing:2px;">
          RESET PASSWORD
        </a>
        <p style="color:#5a5a5a; font-size:12px; margin-top:32px;">
          If you did not request this, please ignore this email.
        </p>
      </div>
    `,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface CorporateInquiryEmailData {
  reference: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  occasion: string;
  totalQuantity: number;
  budgetPerPiece?: string | null;
  deliveryDate?: Date | null;
  deliveryCity?: string | null;
  engraving: boolean;
  brandedPackaging: boolean;
  message?: string | null;
  items: { productName: string; quantity: number }[];
}

export async function sendCorporateInquiryConfirmationEmail(data: CorporateInquiryEmailData) {
  return resend.emails.send({
    from: FROM,
    to: data.email,
    subject: `We've received your gifting request — ${data.reference}`,
    html: `
      <div style="font-family: Georgia, serif; background:#0a0a0a; color:#fff; padding:40px; max-width:600px; margin:0 auto;">
        <h1 style="color:#85A0B5; font-size:32px; margin-bottom:8px;">ÉLAN</h1>
        <p style="color:#9a9a9a; font-size:12px; letter-spacing:4px; margin-bottom:32px;">CORPORATE &amp; GIFTING</p>
        <h2 style="font-size:22px; margin-bottom:8px;">Thank you, ${escapeHtml(data.contactName)}.</h2>
        <p style="color:#85A0B5; font-size:14px; letter-spacing:2px;">${data.reference}</p>
        <p style="color:#ccc; line-height:1.8; margin-top:24px;">
          Your request for <strong>${data.totalQuantity} pieces</strong> on behalf of
          ${escapeHtml(data.companyName)} has reached our gifting concierge. A dedicated
          advisor will contact you within one business day with a tailored proposal and quote.
        </p>
        <p style="color:#5a5a5a; font-size:12px; margin-top:32px;">
          Please quote <strong style="color:#9a9a9a;">${data.reference}</strong> in any correspondence about this request.
        </p>
      </div>
    `,
  });
}

export async function sendCorporateInquiryAdminEmail(data: CorporateInquiryEmailData, adminUrl: string) {
  const to = process.env.CORPORATE_INQUIRY_EMAIL || "hello@shopbyelan.com";
  const row = (label: string, value: string) =>
    `<tr><td style="color:#9a9a9a; padding:6px 16px 6px 0; font-size:12px; letter-spacing:1px; vertical-align:top;">${label}</td><td style="color:#eee; padding:6px 0; font-size:14px;">${value}</td></tr>`;
  const items = data.items.length
    ? data.items.map((i) => `${i.quantity} × ${escapeHtml(i.productName)}`).join("<br/>")
    : "No specific pieces selected";
  const extras = [data.engraving && "Engraving", data.brandedPackaging && "Branded packaging"]
    .filter(Boolean)
    .join(", ") || "None";

  return resend.emails.send({
    from: FROM,
    to,
    replyTo: data.email,
    subject: `New corporate request — ${data.companyName} (${data.totalQuantity} pcs)`,
    html: `
      <div style="font-family: Georgia, serif; background:#0a0a0a; color:#fff; padding:40px; max-width:600px; margin:0 auto;">
        <h1 style="color:#85A0B5; font-size:24px; margin-bottom:4px;">New Corporate Request</h1>
        <p style="color:#85A0B5; font-size:13px; letter-spacing:2px; margin-bottom:24px;">${data.reference}</p>
        <table style="border-collapse:collapse; width:100%;">
          ${row("COMPANY", escapeHtml(data.companyName))}
          ${row("CONTACT", escapeHtml(data.contactName))}
          ${row("EMAIL", escapeHtml(data.email))}
          ${row("PHONE", escapeHtml(data.phone))}
          ${row("OCCASION", escapeHtml(data.occasion))}
          ${row("QUANTITY", String(data.totalQuantity))}
          ${row("BUDGET / PIECE", escapeHtml(data.budgetPerPiece || "Not specified"))}
          ${row("DELIVERY", `${data.deliveryDate ? data.deliveryDate.toDateString() : "No date"}${data.deliveryCity ? ` · ${escapeHtml(data.deliveryCity)}` : ""}`)}
          ${row("EXTRAS", extras)}
          ${row("PIECES", items)}
        </table>
        ${data.message ? `<div style="background:#111; padding:16px; margin-top:24px; border-left:2px solid #85A0B5; color:#ccc; line-height:1.7; white-space:pre-wrap;">${escapeHtml(data.message)}</div>` : ""}
        <a href="${adminUrl}"
           style="display:inline-block; margin-top:32px; background:#85A0B5; color:#000; padding:14px 32px; text-decoration:none; font-size:13px; letter-spacing:2px;">
          VIEW IN ADMIN
        </a>
      </div>
    `,
  });
}
