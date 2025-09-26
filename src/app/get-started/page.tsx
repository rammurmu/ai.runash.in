"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function GetStartedPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // OPTIONAL: Call your registration API here
    // Or use NextAuth signIn("credentials", ...)
    await signIn("credentials", { email, password, callbackUrl: "/" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      {/* Logo/avatar */}
      <div className="mb-4">
        <Image
          src="/runash-logo.png" // Use your actual logo path
          alt="RunAsh Logo"
          width={72}
          height={72}
          className="mx-auto"
        />
      </div>
      {/* Card */}
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Join RunAsh AI
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
          Join the community of AI creators!
        </p>
        {/* Registration form */}
        <form className="w-full flex flex-col gap-3" onSubmit={handleRegister}>
          <label
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email Address"
          />
          <span className="text-xs text-gray-500 mb-2">
            Hint: Use your organization email to easily find and join your
            company/team org.
          </span>

          <label
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
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
            {loading ? "Registering..." : "Next"}
          </button>
        </form>
        {/* Already have account */}
        <p className="mt-4 text-sm text-gray-500 text-center">
          Already have an account?{" "}
          <button
            className="underline text-blue-600 hover:text-purple-600"
            onClick={() => signIn()}
            type="button"
          >
            Log in
          </button>
        </p>
        {/* SSO options */}
        <div className="mt-6 w-full">
          <div className="text-xs text-gray-400 text-center mb-2">
            Or sign up with
          </div>
          <div className="flex justify-center gap-2">
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="px-4 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 font-semibold shadow hover:bg-gray-50 hover:dark:bg-gray-800 transition"
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => signIn("github", { callbackUrl: "/" })}
              className="px-4 py-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 font-semibold shadow hover:bg-gray-50 hover:dark:bg-gray-800 transition"
            >
              GitHub
            </button>
          </div>
        </div>
        {/* SSO note */}
        <div className="mt-4 text-xs text-gray-400 text-center">
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
