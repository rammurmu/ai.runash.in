"use client"

import { Github, Twitter, MessageCircle, Mail, Sun, Moon, Monitor } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const footerLinks = {
  product: [
    { name: "Features", href: "#features" },
    { name: "All Features", href: "/features" },
    { name: "Pricing", href: "#pricing" },
    { name: "API", href: "/api" },
    { name: "Documentation", href: "/docs" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "https://runash.in/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Community", href: "#community" },
    { name: "Help Center", href: "/help" },
    { name: "Status", href: "/status" },
    { name: "Changelog", href: "/changelog" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "GDPR", href: "/gdpr" },
  ],
}

const socialLinks = [
  { name: "GitHub", href: "https://github.com/runash-ai-community", icon: Github },
  { name: "Twitter", href: "https://twitter.com/runashai", icon: Twitter },
  { name: "Discord", href: "/discord", icon: MessageCircle },
  { name: "Email", href: "mailto:hello@runash.ai", icon: Mail },
]

export default function Footer() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark" | "system") || "system"
    setTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    const root = window.document.documentElement

    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.toggle("dark", systemTheme === "dark")
    } else {
      root.classList.toggle("dark", newTheme === "dark")
    }
  }

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    applyTheme(newTheme)
  }

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-bold text-black dark:text-white">RunAsh AI</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
              Create stunning live streaming videos with AI. Transform your ideas into engaging visual content in
              seconds.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-white dark:bg-black border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-black dark:text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-black dark:text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-black dark:text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-black dark:text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-black dark:text-white font-semibold mb-2">Stay updated</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Get the latest updates on new features and releases.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Theme Toggle */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 RunAsh AI. All rights reserved.
          </p>

          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Theme:</span>
              <div className="flex rounded-lg bg-white dark:bg-black border border-gray-200 dark:border-gray-700 p-1">
                <button
                  onClick={() => handleThemeChange("light")}
                  className={`p-2 rounded-md transition-colors ${
                    theme === "light"
                      ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                  aria-label="Light theme"
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleThemeChange("dark")}
                  className={`p-2 rounded-md transition-colors ${
                    theme === "dark"
                      ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                  aria-label="Dark theme"
                >
                  <Moon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleThemeChange("system")}
                  className={`p-2 rounded-md transition-colors ${
                    theme === "system"
                      ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                  aria-label="System theme"
                >
                  <Monitor className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              <Link href="/status" className="hover:text-black dark:hover:text-white transition-colors">
                <span className="inline-flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  All systems operational
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
     }
  
