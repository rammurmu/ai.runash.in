"use client";
import { useState } from "react";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from "@/components/ui/toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setShowToast(true);
    // Trigger forgot password API and send email
    await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        resetUrl: `${window.location.origin}/reset?email=${encodeURIComponent(
          email
        )}`,
      }),
    });
  };

  return (
    <ToastProvider>
      <div className="max-w-md mx-auto mt-20 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Enter your email address and we'll send you instructions to reset your
          password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded font-semibold hover:from-blue-700 hover:to-purple-700 transition"
            disabled={submitted}
          >
            {submitted ? "Email Sent!" : "Send Reset Link"}
          </button>
        </form>
      </div>
      <Toast open={showToast} onOpenChange={setShowToast}>
        <ToastTitle>Check your email</ToastTitle>
        <ToastDescription>
          If an account exists for {email}, you will receive a password reset
          link shortly.
        </ToastDescription>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
