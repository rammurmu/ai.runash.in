import { NextRequest, NextResponse } from "next/server";

// Example in-memory notifications (replace with DB in production)
let notifications = [
  { id: 1, message: "Welcome to Runash AI!", read: false },
  { id: 2, message: "Your project has finished processing.", read: false },
  { id: 3, message: "New feature: Copilot sidebar!", read: true },
];

export async function GET(req: NextRequest) {
  return NextResponse.json(notifications);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (body.action === "markAllRead") {
    notifications = notifications.map((n) => ({ ...n, read: true }));
    return NextResponse.json({ success: true });
  }
  if (body.action === "add" && body.message) {
    const newNotif = { id: Date.now(), message: body.message, read: false };
    notifications.unshift(newNotif);
    return NextResponse.json(newNotif);
  }
  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
