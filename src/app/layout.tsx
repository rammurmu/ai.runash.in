import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

import { ThemeProvider } from "next-themes";
import { NextAuthProvider } from "@/components/next-auth-provider";

export const metadata: Metadata = {
  title: "RunAsh AI",
  description: "Agentic AI live video streaming generation model and studio",
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
      </body>
    </html>
  );
}
