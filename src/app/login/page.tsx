"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [userOrEmail, setUserOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [loginMessage, setLoginMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      username: userOrEmail,
      email: userOrEmail,
      password,
      callbackUrl: "/",
    });
    setLoading(false);
    if (result?.ok) {
      setLoginMessage(
        "Login successful! Check your email for a login notification.",
      );
      // Trigger custom login email notification
      await fetch("/api/auth/email-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userOrEmail, type: "login" }),
      });
      router.push("/");
    } else {
      setLoginMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center pt-8">
      {/* Logo */}
      <div className="mb-3 mt-8">
        <Image
          src="/runash-logo.png" // <-- replace with your logo
          alt="RunAsh Logo"
          width={72}
          height={72}
          className="mx-auto"
        />
      </div>
      {/* Card */}
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Log In
        </h1>
        <div className="text-center text-gray-700 dark:text-gray-300 mb-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/get-started"
            className="underline text-blue-600 hover:text-purple-600"
          >
            Sign Up
          </Link>
        </div>

        <form className="w-full flex flex-col gap-3" onSubmit={handleLogin}>
          <label
            htmlFor="userOrEmail"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Username or Email address
          </label>
          <input
            id="userOrEmail"
            type="text"
            autoComplete="username"
            required
            value={userOrEmail}
            onChange={(e) => setUserOrEmail(e.target.value)}
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Username or Email address"
          />

          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Password"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-2 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {loginMessage && (
          <div className="mt-2 text-center text-xs text-blue-600 dark:text-blue-400">
            {loginMessage}
          </div>
        )}
        <div className="mt-2 w-full text-right text-xs">
          <Link
            href="/forgot-password"
            className="text-gray-500 underline hover:text-blue-600"
          >
            Forgot your password?
          </Link>
        </div>
        {/* SSO note */}
        <div className="mt-6 text-xs text-gray-400 text-center">
          SSO is available for{" "}
          <a href="#" className="underline">
            Team & Enterprise
          </a>{" "}
          accounts.
        </div>
      </div>
    </div>
  );
}
