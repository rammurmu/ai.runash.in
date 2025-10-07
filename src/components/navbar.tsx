"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ThemeSwitcher from "@/components/ui/theme-switcher";

export default function Navbar() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinks = [
    { href: "/features", label: "Features" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 right-3 z-50 bg-white/80 dark:bg-black/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 h-16">
      <Link href="/" className="font-bold text-xl">
        Runash AI
      </Link>
      <nav className="flex gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="transition-colors hover:underline"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <ThemeSwitcher />
      </div>
    </header>
  );
    }

{/* "use client";
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
} */}
