"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  BarChart3,
  User,
  Settings,
  Zap,
  Bot,
  BookOpen,
  FileText,
  HelpCircle,
  Users,
  CreditCard,
  Github,
  Slack,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { href: "/home", label: "Overview", icon: Home },
  { href: "/app", label: "Studio", icon: Settings },
  { href: "/app", label: "Editor", icon: Zap },
  { href: "/home", label: "Agents", icon: Bot },
  { href: "/home", label: "Chat", icon: HelpCircle },
  { href: "/home", label: "Usage", icon: BarChart3 },
  { href: "/billing", label: "Billing & Invoices", icon: CreditCard },
  { href: "/docs", label: "Docs", icon: BookOpen },
  { href: "/contact", label: "Contact Us", icon: FileText },
];

const integrations = [
  { name: "GitHub", icon: Github, status: "Connect", link: "/manage/github" },
  { name: "Slack", icon: Slack, status: "Connect", link: "/manage/slack" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={`fixed top-0 left-0 h-full z-50 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 transition-all duration-300 flex flex-col
          ${collapsed ? "w-16" : "w-56"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <button
          className="absolute top-4 right-[-16px] bg-gray-200 dark:bg-gray-700 rounded-full p-1 shadow hidden md:block"
          onClick={() => setCollapsed((c) => !c)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? "→" : "←"}
        </button>
        <button
          className="absolute top-4 left-4 bg-gray-200 dark:bg-gray-700 rounded-full p-1 shadow md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close sidebar"
        >
          <X size={20} />
        </button>
        {/* User info */}
        <div className="mt-6 px-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
            U
          </div>
          {!collapsed && (
            <div>
              <div className="font-semibold">user</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Free Plan · user@email.com...</div>
            </div>
          )}
        </div>
        {/* Navigation */}
        <nav className="mt-8 flex flex-col gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2 rounded transition-colors ${
                  active ? "bg-gray-200 dark:bg-gray-800 font-semibold" : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>
        {/* Integrations Panel */}
        {!collapsed && (
          <div className="mt-8 px-4">
            <div className="font-bold mb-2">Integrations</div>
            <div className="flex flex-col gap-2">
              {integrations.map((integration) => {
                const Icon = integration.icon;
                return (
                  <Link
                    key={integration.name}
                    href={integration.link}
                    className="flex items-center gap-3 px-3 py-2 rounded transition-colors bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800"
                  >
                    <Icon className="w-4 h-4" />
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
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </aside>
      {/* Mobile open button */}
      <button
        className="fixed top-4 left-4 z-50 bg-gray-200 dark:bg-gray-700 rounded-full p-2 shadow md:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>
    </>
  );
   }
