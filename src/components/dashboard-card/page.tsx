import React from "react";
import Link from "next/link";

type PlanType = "Free" | "Pro" | "Ultra";

interface DashboardCardProps {
  title: string;
  description: string;
  features: string[];
  cta?: {
    label: string;
    url: string;
  };
  highlight?: boolean;
  plan?: PlanType;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  features,
  cta,
  highlight = false,
  plan,
  className = "",
}) => {
  const planColors: Record<PlanType, string> = {
    Free: "border-gray-700 bg-gray-900 text-white",
    Pro: "border-indigo-600 bg-indigo-900 text-white",
    Ultra: "border-blue-600 bg-blue-900 text-white",
  };

  return (
    <div
      className={`rounded-xl border p-6 shadow-lg transition-all
        ${highlight ? "ring-2 ring-blue-400" : ""}
        ${plan ? planColors[plan] : "border-gray-200 bg-white dark:bg-gray-900 dark:text-white"}
        ${className}
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        {plan && (
          <span className="px-3 py-1 rounded text-xs font-bold bg-black/20 uppercase tracking-wider">
            {plan}
          </span>
        )}
      </div>
      <p className="text-gray-300 dark:text-gray-400 mb-3">{description}</p>
      <ul className="mb-4 space-y-1 text-sm">
        {features.map((f, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="text-green-400">✔️</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      {cta && (
        <Link
          href={cta.url}
          className="inline-block px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
};

export default DashboardCard;
