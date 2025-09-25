import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../../lib/email";

let feedbacks: { id: number; email: string; message: string; created: string }[] = [];

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.email || !body.message) {
    return NextResponse.json({ error: "Missing email or message" }, { status: 400 });
  }
  const entry = {
    id: Date.now(),
    email: body.email,
    message: body.message,
    created: new Date().toISOString(),
  };
  feedbacks.unshift(entry);
  // Send feedback notification email
  await sendEmail({
    to: process.env.FEEDBACK_EMAIL || process.env.SMTP_USER || "",
    subject: `New Feedback from ${body.email}`,
    html: `<p><b>Sender:</b> ${body.email}<br><b>Message:</b> ${body.message}</p>`
  });
  return NextResponse.json(entry);
}
