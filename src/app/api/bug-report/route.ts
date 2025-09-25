import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../../lib/email";

let bugs: { id: number; email: string; description: string; created: string }[] = [];

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.email || !body.description) {
    return NextResponse.json({ error: "Missing email or description" }, { status: 400 });
  }
  const entry = {
    id: Date.now(),
    email: body.email,
    description: body.description,
    created: new Date().toISOString(),
  };
  bugs.unshift(entry);
  // Send bug report notification email
  await sendEmail({
  to: process.env.BUG_REPORT_EMAIL || process.env.SMTP_USER || "",
    subject: `New Bug Report from ${body.email}`,
    html: `<p><b>Reporter:</b> ${body.email}<br><b>Description:</b> ${body.description}</p>`
  });
  return NextResponse.json(entry);
}
