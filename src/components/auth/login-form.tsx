"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastViewport } from "@/components/ui/toast";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError(res.error);
      setShowToast(true);
    }
    // Optionally, redirect on success
    // if (res?.ok) router.push("/");
  };

  return (
    <ToastProvider>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg mt-12">
        <h2 className="text-2xl font-bold text-center mb-2">Sign in to RunAsh AI</h2>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded py-2 mb-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          onClick={() => signIn("google")}
        >
          <FcGoogle className="text-xl" /> Sign in with Google
        </button>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded py-2 mb-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          onClick={() => signIn("github")}
        >
          <FaGithub className="text-xl" /> Sign in with GitHub
        </button>
        <div className="flex items-center gap-2 mb-2">
          <span className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <span className="text-xs text-gray-400">or</span>
          <span className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded font-semibold disabled:opacity-50 hover:from-purple-700 hover:to-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div className="text-red-500 text-center text-sm">{error}</div>}
        <div className="flex justify-between text-xs mt-2">
          <a href="/forgot" className="text-blue-500 hover:underline">Forgot password?</a>
          <a href="/get-started" className="text-blue-500 hover:underline">Get started</a>
        </div>
      </form>
      <Toast open={showToast} onOpenChange={setShowToast} variant="destructive">
        <ToastTitle>Login Error</ToastTitle>
        <ToastDescription>{error}</ToastDescription>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
