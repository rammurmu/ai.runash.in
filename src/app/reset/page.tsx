"use client";
import { useState } from "react";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from "@/components/ui/toast";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match");
      setShowToast(true);
      return;
    }
    setError("");
    setSubmitted(true);
    setShowToast(true);
    // Here you would trigger your reset password API
  };

  return (
    <ToastProvider>
      <div className="max-w-md mx-auto mt-20 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Reset Password</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          Enter your new password below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded font-semibold hover:from-blue-700 hover:to-purple-700 transition"
            disabled={submitted}
          >
            {submitted ? "Password Reset!" : "Reset Password"}
          </button>
        </form>
      </div>
      <Toast
        open={showToast}
        onOpenChange={setShowToast}
        variant={error ? "destructive" : undefined}
      >
        <ToastTitle>{error ? "Error" : "Success"}</ToastTitle>
        <ToastDescription>
          {error
            ? error
            : "Your password has been reset. You can now log in with your new password."}
        </ToastDescription>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
