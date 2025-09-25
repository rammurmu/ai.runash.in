import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../../lib/email";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.email || !body.name) {
    return NextResponse.json({ error: "Missing email or name" }, { status: 400 });
  }
  // TODO: Add user creation logic here
  // Send personalized welcome email
  await sendEmail({
    to: body.email,
    subject: `Welcome to Runash AI, ${body.name}!`,
    html: `<div style='font-family:sans-serif;padding:24px;background:#f9f9f9;'>
      <h2 style='color:#6c47ff;'>Welcome, ${body.name}!</h2>
      <p>We're excited to have you join <b>Runash AI</b>. Your account has been created and you can now explore all our features.</p>
      <p style='margin-top:24px;'>If you have any questions, reply to this email or visit our <a href='${process.env.NEXT_PUBLIC_BASE_URL}/help'>help center</a>.</p>
      <hr style='margin:32px 0;border:none;border-top:1px solid #eee;'>
      <p style='font-size:12px;color:#888;'>Runash AI Team</p>
    </div>`
  });
  return NextResponse.json({ success: true });
}
