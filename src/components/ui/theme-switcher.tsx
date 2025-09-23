"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Avoid hydration mismatch

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      className="flex items-center gap-2 px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark/light mode"
    >
      {currentTheme === "dark" ? (
        <>
          <span role="img" aria-label="moon">
            🌙
          </span>
          <span className="hidden md:inline">Dark</span>
        </>
      ) : (
        <>
          <span role="img" aria-label="sun">
            ☀️
          </span>
          <span className="hidden md:inline">Light</span>
        </>
      )}
    </button>
  );
}
