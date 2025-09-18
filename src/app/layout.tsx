import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import PWAHandler from "@/components/pwa-handler";

import { ThemeProvider } from "next-themes";
import { NextAuthProvider } from "@/components/next-auth-provider";

export const metadata: Metadata = {
  title: "RunAsh AI Studio",
  description: "AI-powered video creation and editing studio",
  manifest: "/manifest.json",
  themeColor: "#3B82F6",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RunAsh Studio",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors">
        <NextAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <Sidebar />
            <div className="pt-16 pl-0 md:pl-56 transition-all">{children}</div>
          </ThemeProvider>
        </NextAuthProvider>
        <Analytics />
        <PWAHandler />
      </body>
    </html>
  );
}
