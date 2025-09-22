import React from "react";

interface PlanCardProps {
  plan: "Free" | "Pro" | "Ultra";
  title: string;
  description: string;
  features: string[];
  cta?: { label: string; url: string };
  highlight?: boolean;
}

export default function PlanCard({
  plan,
  title,
  description,
  features,
  cta,
  highlight,
}: PlanCardProps) {
  const colorClass =
    plan === "Ultra"
      ? "border-blue-600 bg-blue-900"
      : plan === "Pro"
      ? "border-indigo-600 bg-indigo-900"
      : "border-gray-700 bg-gray-900";

  return (
    <div
      className={`rounded-xl border p-6 shadow-lg text-white ${colorClass} ${
        highlight ? "ring-2 ring-blue-400" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className="px-3 py-1 rounded text-xs font-bold bg-black/20 uppercase">
          {plan}
        </span>
      </div>
      <p className="text-gray-300 mb-3">{description}</p>
      <ul className="mb-4 space-y-1 text-sm">
        {features.map((f, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="text-green-400">✔️</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {cta && (
        <a
          href={cta.url}
          className="inline-block px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          {cta.label}
        </a>
      )}
    </div>
  );
}
