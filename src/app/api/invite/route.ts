import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../../lib/email";

let invites: {
  id: number;
  email: string;
  invitedBy: string;
  created: string;
}[] = [];

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.email || !body.invitedBy) {
    return NextResponse.json(
      { error: "Missing email or invitedBy" },
      { status: 400 },
    );
  }
  const entry = {
    id: Date.now(),
    email: body.email,
    invitedBy: body.invitedBy,
    created: new Date().toISOString(),
  };
  invites.unshift(entry);
  // Send invite email
  await sendEmail({
    to: body.email,
    subject: `You've been invited to Runash AI by ${body.invitedBy}`,
    html: `<p>Hello,<br><br>${body.invitedBy} has invited you to join Runash AI.<br><br><a href='${process.env.NEXT_PUBLIC_BASE_URL}/register?invite=${encodeURIComponent(body.email)}'>Click here to join</a></p>`,
  });
  return NextResponse.json(entry);
}
