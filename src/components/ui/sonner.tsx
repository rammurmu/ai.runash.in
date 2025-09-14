"use client";
import * as React from "react";

export function Sonner({
  message,
  type = "info",
}: { message: string; type?: "info" | "success" | "error" }) {
  const [show, setShow] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  const color =
    type === "success"
      ? "bg-green-500"
      : type === "error"
        ? "bg-red-500"
        : "bg-blue-500";
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-6 py-3 rounded-xl text-white shadow-lg ${color} animate-fade-in`}
    >
      {message}
    </div>
  );
}
