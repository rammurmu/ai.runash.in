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
  Equal,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Overview", icon: Home },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/integrations", label: "Integrations", icon: Zap },
  { href: "/background-agents", label: "Background Agents", icon: Bot },
  { href: "/bugbot", label: "Bugbot", icon: HelpCircle },
  { href: "/usage", label: "Usage", icon: BarChart3 },
  { href: "/billing", label: "Billing & Invoices", icon: CreditCard },
  { href: "/docs", label: "Docs", icon: BookOpen },
  { href: "/contact", label: "Contact Us", icon: FileText },
];

const integrations = [
  { name: "GitHub", icon: Github, status: "Connected", link: "/manage/github" },
  { name: "Slack", icon: Slack, status: "Connect", link: "/manage/slack" },
  { name: "Equal", icon: Equal, status: "Connect", link: "/manage/equal" },
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
            RM
          </div>
          {!collapsed && (
            <div>
              <div className="font-semibold">Ram Murmu</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Free Plan · runashinc@outl...</div>
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
