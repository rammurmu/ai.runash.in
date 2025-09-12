import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import pool from "../../../../lib/neon";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { email, password, name } = parsed.data;
    // Check if user exists
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (rows.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 },
      );
    }
    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    // Insert user
    const { rows: inserted } = await pool.query(
      "INSERT INTO users (email, password, name, createdat) VALUES ($1, $2, $3, NOW()) RETURNING id, email, name",
      [email, hashed, name || null],
    );
    const user = inserted[0];
    return NextResponse.json({ user });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
