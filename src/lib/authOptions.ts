import type { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcrypt";
import pool from "../../lib/neon";
import { sendEmail } from "../../lib/email";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          throw new Error("Invalid credentials");
        }
        const { email, password } = parsed.data;
        // Query Neon for user
        const { rows } = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email],
        );
        const user = rows[0];
        if (!user) return null;
        // Compare password
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;
        // Send login notification email
        await sendEmail({
          to: email,
          subject: `Login to Runash AI successful`,
          html: `<div style='font-family:sans-serif;padding:24px;background:#f9f9f9;'>
            <h2 style='color:#6c47ff;'>Login Successful</h2>
            <p>Hi ${email},</p>
            <p>You have successfully logged in to <b>Runash AI</b>. If this was not you, please reset your password immediately.</p>
            <hr style='margin:32px 0;border:none;border-top:1px solid #eee;'>
            <p style='font-size:12px;color:#888;'>Runash AI Team</p>
          </div>`
        });
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && token.user) {
        session.user = token.user as Session["user"];
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};
