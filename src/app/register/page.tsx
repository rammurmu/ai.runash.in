"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerMessage, setRegisterMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Add registration logic (API call to create user)
    // Simulate registration success
    await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    setLoading(false);
    setRegisterMessage("Registration successful! Check your email for a welcome message.");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center pt-8">
      <div className="mb-3 mt-8">
        <Image src="/runash-logo.png" alt="RunAsh Logo" width={72} height={72} className="mx-auto" />
      </div>
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Sign Up</h1>
        <form className="w-full flex flex-col gap-3" onSubmit={handleRegister}>
          <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input id="name" type="text" required value={name} onChange={e => setName(e.target.value)} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Your Name" />
          <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email address</label>
          <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Email address" />
          <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Password" />
          <button type="submit" disabled={loading} className="mt-4 w-full py-2 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition">{loading ? "Signing up..." : "Sign Up"}</button>
        </form>
        {registerMessage && (
          <div className="mt-2 text-center text-xs text-blue-600 dark:text-blue-400">{registerMessage}</div>
        )}
        <div className="mt-2 w-full text-right text-xs">
          <Link href="/login" className="text-gray-500 underline hover:text-blue-600">Already have an account?</Link>
        </div>
      </div>
    </div>
  );
}
