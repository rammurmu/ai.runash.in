"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SidebarFooter from "@/components/sidebar-footer";
import { WithTooltip } from "@/components/ui/tooltip";
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
  {
    section: "Main",
    links: [
      { href: "/", label: "Overview", icon: Home },
      { href: "/usage", label: "Usage", icon: BarChart3 },
      { href: "/background-agents", label: "Background Agents", icon: Bot },
      { href: "/bugbot", label: "Bugbot", icon: HelpCircle },
    ],
  },
  {
    section: "Account",
    links: [
      { href: "/settings", label: "Settings", icon: Settings },
      { href: "/billing", label: "Billing & Invoices", icon: CreditCard },
      { href: "/contact", label: "Contact Us", icon: FileText },
    ],
  },
  {
    section: "Resources",
    links: [
      { href: "/docs", label: "Docs", icon: BookOpen },
      { href: "/integrations", label: "Integrations", icon: Zap },
    ],
  },
];

const integrations = [
  { name: "GitHub", icon: Github, status: "Connected", link: "/manage/github" },
  { name: "Slack", icon: Slack, status: "Connect", link: "/manage/slack" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const [avatar, setAvatar] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedImage = localStorage.getItem("profileImage");
      if (storedImage) setAvatar(storedImage);
    }
  }, []);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
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
        <div className="mt-6 px-4 flex items-center gap-3">
          {avatar ? (
            <img
              src={avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow">
              {session?.user?.name?.[0] || "U"}
            </div>
          )}
          {!collapsed && (
            <div>
              <div className="font-semibold">
                {session?.user?.name || "User"}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Free Plan
              </div>
              <div className="text-xs text-gray-400">
                {session?.user?.email || "user@email.com"}
              </div>
            </div>
          )}
        </div>
        {/* Navigation */}
        <nav className="mt-8 flex flex-col gap-4">
          {navLinks.map((section) => (
            <div key={section.section} className="flex flex-col gap-1">
              {!collapsed && (
                <div className="text-xs font-bold text-gray-400 uppercase px-4 mb-1 tracking-wider">
                  {section.section}
                </div>
              )}
              {section.links.map((link) => {
                const Icon = link.icon;
                const active = pathname === link.href;
                if (collapsed) {
                  return (
                    <WithTooltip key={link.href} tooltip={link.label}>
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-2 rounded transition-colors ${
                          active
                            ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 font-semibold border-l-4 border-blue-500 dark:border-purple-500"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                      </Link>
                    </WithTooltip>
                  );
                } else {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 px-4 py-2 rounded transition-colors ${
                        active
                          ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 font-semibold border-l-4 border-blue-500 dark:border-purple-500"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.label}</span>
                    </Link>
                  );
                }
              })}
            </div>
          ))}
        </nav>
        {/* Integrations Panel */}
        {!collapsed && (
          <div className="mt-8 px-4">
            <div className="font-bold mb-2 text-gray-500">Integrations</div>
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
        <SidebarFooter />
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
