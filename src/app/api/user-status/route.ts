import { NextRequest, NextResponse } from "next/server";

// Example in-memory user status (replace with DB in production)
let userStatus: Record<string, string> = {};

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.json({ error: "Missing email" }, { status: 400 });
  return NextResponse.json({ status: userStatus[email] || "online" });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.email || !body.status) {
    return NextResponse.json({ error: "Missing email or status" }, { status: 400 });
  }
  userStatus[body.email] = body.status;
  return NextResponse.json({ success: true, status: body.status });
}
