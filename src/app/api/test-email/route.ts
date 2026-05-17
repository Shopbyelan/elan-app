import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

// DELETE this file before going to production
export async function POST(req: NextRequest) {
  const { to } = await req.json();
  if (!to) return NextResponse.json({ error: "Missing 'to'" }, { status: 400 });

  const result = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
    to,
    subject: "Élan — Email Test",
    html: "<p>If you're reading this, Resend is working.</p>",
  });

  return NextResponse.json(result);
}
