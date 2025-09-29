import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../../lib/email";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.email || !body.resetUrl) {
    return NextResponse.json(
      { error: "Missing email or resetUrl" },
      { status: 400 },
    );
  }
  // TODO: Add password reset logic here
  // Send personalized password reset email
  await sendEmail({
    to: body.email,
    subject: `Reset your password for Runash AI`,
    html: `<div style='font-family:sans-serif;padding:24px;background:#f9f9f9;'>
      <h2 style='color:#6c47ff;'>Password Reset Request</h2>
      <p>Hi ${body.email},</p>
      <p>We received a request to reset your password. Click the button below to set a new password:</p>
      <a href='${body.resetUrl}' style='display:inline-block;padding:12px 24px;background:#6c47ff;color:#fff;border-radius:6px;text-decoration:none;font-weight:bold;margin-top:16px;'>Reset Password</a>
      <p style='margin-top:24px;'>If you did not request this, you can safely ignore this email.</p>
      <hr style='margin:32px 0;border:none;border-top:1px solid #eee;'>
      <p style='font-size:12px;color:#888;'>Runash AI Team</p>
    </div>`,
  });
  return NextResponse.json({ success: true });
}
