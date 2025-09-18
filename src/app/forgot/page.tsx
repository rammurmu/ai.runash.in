"use client";
import { useState } from "react";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Replace with your API call to send reset email
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Example: await fetch("/api/auth/forgot-password", { ... });
    // Simulate request:
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center pt-8">
      {/* Logo */}
      <div className="mb-3 mt-8">
        <Image
          src="/runash-logo.png" // <-- replace with your logo
          alt="RunAsh Logo"
          width={72}
          height={72}
        />
      </div>
      {/* Card */}
      <div className="w-full max-w-md bg-white dark:bg-gray-950 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Password reset
        </h1>
        <div className="text-center text-gray-700 dark:text-gray-300 mb-4 text-sm">
          Enter your user account’s email and<br />
          we will send you a password reset link.
        </div>
        {sent ? (
          <div className="w-full text-center text-green-600 dark:text-green-400 font-medium mt-4">
            If an account exists for <span className="font-mono">{email}</span>, a reset link has been sent.
          </div>
        ) : (
          <form className="w-full flex flex-col gap-3" onSubmit={handleReset}>
            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email address"
            />
            <button
              type="submit"
              disabled={loading || !email}
              className="mt-4 w-full py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-semibold shadow hover:bg-gray-300 hover:dark:bg-gray-700 transition"
            >
              {loading ? "Sending..." : "Send password reset email"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
      }
