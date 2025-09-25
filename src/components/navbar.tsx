"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
// removed duplicate import
import ThemeSwitcher from "@/components/ui/theme-switcher";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import {
  Bell,
  HelpCircle,
  FolderOpen,
  Settings,
  MessageSquare,
  Bug,
  Smile,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getUserPlan } from "@/data/user-plan";

export default function Navbar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [avatar, setAvatar] = useState<string>("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<
    { id: number; message: string; read: boolean }[]
  >([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [userPlan, setUserPlan] = useState<string | null>(null);
  useEffect(() => {
    setLoadingNotifications(true);
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .finally(() => setLoadingNotifications(false));
  }, []);
  const markAllRead = async () => {
    await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "markAllRead" }),
    });
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };
  const addNotification = async (message: string) => {
    const res = await fetch("/api/notifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "add", message }),
    });
    const notif = await res.json();
    setNotifications((prev) => [notif, ...prev]);
  };
  const [status, setStatus] = useState("online"); // online, away, busy
  const [greeting, setGreeting] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedImage = localStorage.getItem("profileImage");
      if (storedImage) setAvatar(storedImage);
    }
  }, []);
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setAvatar(result);
        if (typeof window !== "undefined") {
          localStorage.setItem("profileImage", result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    // Fetch user status from backend
    if (session?.user?.email) {
      fetch(`/api/user-status?email=${encodeURIComponent(session.user.email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status) setStatus(data.status);
        });
      // Personalize greeting
      setGreeting(`Hello, ${session.user.name || session.user.email}!`);
    }
  }, [session]);
  useEffect(() => {
    async function fetchPlan() {
      if (session?.user?.email) {
        const plan = await getUserPlan(session.user.email);
        setUserPlan(plan || "Free");
      }
    }
    fetchPlan();
  }, [session?.user?.email]);
  const updateStatus = async (newStatus: string) => {
    setStatus(newStatus);
    if (session?.user?.email) {
      await fetch("/api/user-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session.user.email, status: newStatus }),
      });
    }
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/features", label: "Features" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 h-16">
      <Link
        href="/"
        className="font-bold text-xl tracking-tight flex items-center gap-2"
      >
        <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Runash AI
        </span>
      </Link>
      {session && greeting && (
        <span className="ml-6 text-base font-semibold text-blue-600 dark:text-purple-400">
          {greeting}
        </span>
      )}
      {userPlan && (
        <span className="ml-4 text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-bold">
          Plan: {userPlan}
        </span>
      )}
      <nav className="flex gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              (pathname === link.href
                ? "underline font-semibold"
                : "hover:underline") + " transition-colors"
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2 relative">
        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition relative"
            aria-label="Notifications"
            onClick={() => setShowNotifications((v) => !v)}
          >
            <Bell className="w-5 h-5" />
            {notifications.some((n) => !n.read) && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-black"></span>
            )}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-2 z-50 border border-gray-100 dark:border-gray-800">
              <div className="px-4 py-2 font-semibold text-sm border-b border-gray-100 dark:border-gray-800">
                Notifications
              </div>
              <ul className="max-h-64 overflow-y-auto">
                {loadingNotifications ? (
                  <li className="px-4 py-2 text-gray-500 text-sm">
                    Loading...
                  </li>
                ) : notifications.length === 0 ? (
                  <li className="px-4 py-2 text-gray-500 text-sm">
                    No notifications
                  </li>
                ) : (
                  notifications.map((n) => (
                    <li
                      key={n.id}
                      className={`px-4 py-2 text-sm ${n.read ? "text-gray-400" : "text-gray-900 dark:text-white"}`}
                    >
                      {n.message}
                    </li>
                  ))
                )}
              </ul>
              <button
                className="w-full px-4 py-2 text-xs text-blue-600 hover:underline text-left"
                onClick={markAllRead}
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>
        <ThemeSwitcher />
        {/* Status indicator and custom actions */}
        <span
          className={`ml-2 w-3 h-3 rounded-full border-2 border-white dark:border-black ${
            status === "online"
              ? "bg-green-500"
              : status === "away"
                ? "bg-yellow-400"
                : "bg-red-500"
          }`}
          title={`Status: ${status}`}
        />
        {session ? (
          <div className="relative">
            <button
              className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              onClick={() => setShowDropdown((v) => !v)}
              aria-label="User menu"
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
                />
              ) : (
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {session.user?.name?.[0] || "U"}
                </span>
              )}
              <span className="hidden md:inline font-medium text-sm max-w-[120px] truncate">
                {session.user?.name || session.user?.email}
              </span>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg py-2 z-50 border border-gray-100 dark:border-gray-800">
                <div className="px-4 py-2 flex items-center gap-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="font-semibold text-xs text-gray-500">
                    Status:
                  </span>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="text-xs rounded px-2 py-1 border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                  >
                    <option value="online">Online</option>
                    <option value="away">Away</option>
                    <option value="busy">Busy</option>
                  </select>
                  <span
                    className={`w-3 h-3 rounded-full border-2 border-white dark:border-black ${
                      status === "online"
                        ? "bg-green-500"
                        : status === "away"
                          ? "bg-yellow-400"
                          : "bg-red-500"
                    }`}
                  />
                </div>
                <button
                  className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                  onClick={() => {
                    addNotification("AI Assistant opened");
                    alert("Custom Action: Open AI Assistant");
                  }}
                >
                  🤖 AI Assistant
                </button>
                <button
                  className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                  onClick={() => {
                    addNotification("Started a new project");
                    alert("Custom Action: Start New Project");
                  }}
                >
                  🚀 New Project
                </button>
                <button
                  className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                  onClick={async () => {
                    const message = prompt("Enter your feedback:");
                    if (message && session?.user?.email) {
                      const res = await fetch("/api/feedback", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          email: session.user.email,
                          message,
                        }),
                      });
                      if (res.ok) {
                        addNotification("Feedback submitted");
                        alert("Thank you for your feedback!");
                      } else {
                        alert("Failed to submit feedback.");
                      }
                    }
                  }}
                >
                  <MessageSquare className="w-4 h-4 opacity-60" /> Send Feedback
                </button>
                <button
                  className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                  onClick={async () => {
                    const description = prompt("Describe the bug:");
                    if (description && session?.user?.email) {
                      const res = await fetch("/api/bug-report", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          email: session.user.email,
                          description,
                        }),
                      });
                      if (res.ok) {
                        addNotification("Bug reported");
                        alert("Bug report submitted. Thank you!");
                      } else {
                        alert("Failed to submit bug report.");
                      }
                    }
                  }}
                >
                  <Bug className="w-4 h-4 opacity-60" /> Report Bug
                </button>
                <button
                  className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                  onClick={() => {
                    addNotification("Greeting personalized");
                    alert("Custom Action: Personalized greeting!");
                  }}
                >
                  <Smile className="w-4 h-4 opacity-60" /> Personalize Greeting
                </button>
                <div className="flex items-center gap-3 px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                  <label
                    htmlFor="avatar-upload-navbar"
                    className="cursor-pointer"
                  >
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                      />
                    ) : (
                      <span className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        {session.user?.name?.[0] || "U"}
                      </span>
                    )}
                    <input
                      id="avatar-upload-navbar"
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                    />
                  </label>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">
                      {session.user?.name || "User"}
                    </span>
                    <span className="text-xs text-gray-500 truncate max-w-[120px]">
                      {session.user?.email}
                    </span>
                    <span className="text-xs text-blue-600 font-bold mt-1">
                      Free Plan{" "}
                      <button
                        className="ml-2 text-xs text-purple-600 underline"
                        onClick={() => router.push("/settings")}
                      >
                        Upgrade
                      </button>
                    </span>
                  </div>
                </div>
                <button
                  className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                  onClick={() => router.push("/dashboard")}
                >
                  <FolderOpen className="w-4 h-4 opacity-60" /> My Projects
                </button>
                <button
                  className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                  onClick={() => router.push("/profile")}
                >
                  <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
                    P
                  </span>{" "}
                  Profile
                </button>
                <button
                  className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                  onClick={() => router.push("/settings")}
                >
                  <Settings className="w-4 h-4 opacity-60" /> Settings
                </button>
                <button
                  className="w-full flex items-center gap-2 text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                  onClick={() => router.push("/help")}
                >
                  <HelpCircle className="w-4 h-4 opacity-60" /> Help
                </button>
                <div className="px-4 py-2">
                  <ThemeSwitcher />
                </div>
                <hr className="my-2 border-gray-200 dark:border-gray-800" />
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-red-600"
                  onClick={async () => {
                    setShowDropdown(false);
                    await signOut({ redirect: false });
                    setShowToast(true);
                    setTimeout(() => {
                      router.push("/");
                    }, 1200);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Login
          </button>
        )}
      </div>
      {/* Toast for logout */}
      {showToast && (
        <div className="fixed top-20 right-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg rounded-lg px-4 py-2 z-50">
          <div className="font-semibold">Logged out</div>
          <div className="text-xs text-gray-500">
            You have been logged out. Redirecting...
          </div>
        </div>
      )}
    </header>
  );
}

{
  /* "use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from "@/components/ui/toast";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  useEffect(() => setMounted(true), []);

  const navLinks = [
    { href: "/features", label: "Features" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <ToastProvider>
      <header className="w-full fixed top-0 left-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 h-16">
        <Link href="/" className="font-bold text-xl">
          Runash AI
        </Link>
        <nav className="flex gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                (pathname === link.href
                  ? "underline font-semibold"
                  : "hover:underline") + " transition-colors"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {session ? (
            <button
              onClick={async () => {
                await signOut({ redirect: false });
                setShowToast(true);
                setTimeout(() => {
                  router.push("/");
                }, 1200);
              }}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Login
            </button>
          )}
          <button
            className="ml-2 p-2 rounded bg-gray-200 dark:bg-gray-700"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {mounted && (theme === "dark" ? "🌙" : "☀️")}
          </button>
        </div>
      </header>
      <Toast open={showToast} onOpenChange={setShowToast}>
        <ToastTitle>Logged out</ToastTitle>
        <ToastDescription>
          You have been logged out. Redirecting...
        </ToastDescription>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
} */
}
