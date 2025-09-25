import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../../lib/email";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.email || !body.type) {
    return NextResponse.json(
      { error: "Missing email or type" },
      { status: 400 },
    );
  }
  let subject = "";
  let html = "";
  switch (body.type) {
    case "register":
      subject = "Welcome to Runash AI!";
      html = `<p>Hi ${body.email},<br>Thank you for registering at Runash AI.</p>`;
      break;
    case "reset":
      subject = "Password Reset Request";
      html = `<p>Hi ${body.email},<br>Click <a href='${body.resetUrl}'>here</a> to reset your password.</p>`;
      break;
    case "login":
      subject = "Login Notification";
      html = `<p>Hi ${body.email},<br>You have successfully logged in to Runash AI.</p>`;
      break;
    default:
      subject = "Account Notification";
      html = `<p>Hi ${body.email},<br>This is a notification regarding your account.</p>`;
  }
  await sendEmail({
    to: body.email,
    subject,
    html,
  });
  return NextResponse.json({ success: true });
}
