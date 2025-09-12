"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  useEffect(() => setMounted(true), []);

  const navLinks = [
    { href: "/features", label: "Features" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 h-16">
      <Link href="/" className="font-bold text-xl">Runash AI</Link>
      <nav className="flex gap-4">
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={
              (pathname === link.href ? "underline font-semibold" : "hover:underline") + " transition-colors"
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        {session ? (
          <button
            onClick={() => signOut()}
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
  );
}
