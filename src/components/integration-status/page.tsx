import React from "react";
import { Github, Slack, Bot } from "lucide-react";

interface IntegrationProps {
  name: string;
  icon: React.ReactNode;
  status: "Connected" | "Connect";
  link: string;
}

const integrations: IntegrationProps[] = [
  {
    name: "GitHub",
    icon: <Github size={16} />,
    status: "Connected",
    link: "/manage/github",
  },
  {
    name: "Slack",
    icon: <Slack size={16} />,
    status: "Connect",
    link: "/manage/slack",
  },
  {
    name: "Bot",
    icon: <Bot size={16} />,
    status: "Connect",
    link: "/manage/bot",
  },
];

export default function IntegrationStatus() {
  return (
    <div className="flex flex-col gap-2">
      {integrations.map((integration) => (
        <a
          key={integration.name}
          href={integration.link}
          className="flex items-center gap-3 px-3 py-2 rounded bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        >
          {integration.icon}
          <span className="flex-1">{integration.name}</span>
          <span
            className={`text-xs px-2 py-1 rounded ${
              integration.status === "Connected"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            {integration.status}
          </span>
        </a>
      ))}
    </div>
  );
}
