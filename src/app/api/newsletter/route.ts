import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNewsletterConfirmEmail } from "@/lib/resend";
import { addContactToBrevo } from "@/lib/brevo";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
  try {
    const { email } = schema.parse(await req.json());

    const existing = await prisma.newsletter.findUnique({ where: { email } });
    if (!existing) {
      await prisma.newsletter.create({ data: { email } });
      // Awaited (not fire-and-forget) — on serverless hosting the function's
      // execution can be frozen the instant the response is sent, silently
      // cutting off any in-flight un-awaited request before it completes.
      await sendNewsletterConfirmEmail(email).catch(console.error);
    }
    await addContactToBrevo(email).catch(console.error);

    return NextResponse.json({ message: "Subscribed successfully" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
