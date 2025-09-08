"use client"

import { Button } from "@/components/ui/button"
import { Github, Menu, X, Bell, SettingsIcon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Logo } from "./logo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showBanner, setShowBanner] = useState(true)
  // ...other logic
  return (
    <>
      {/* Top Banner */}
      {showBanner && (
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 text-center text-sm relative">
          <div className="flex items-center justify-center space-x-2">
            <Bell className="w-4 h-4" />
            <span>
              🎉 New AI Video Generation Model Released!{" "}
              <Link href="/blog/new-model" className="underline font-semibold hover:text-purple-200">
                Learn more
              </Link>
            </span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-purple-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
                <Logo />
              </div>
              <span className="text-xl font-bold text-black dark:text-white">RunAsh AI</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                Features
              </Link>
              <Link
                href="/features"
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                All Features
              </Link>
              <Link
                href="#community"
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                Community
              </Link>
              <Link
                href="https://runash.in/blog"
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                Blog
              </Link>
              <Link
                href="https://github.com/runash-ai-community"
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/app">
                <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200">
                  Try Now
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-black dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-white/10">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="#features"
                  className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="/features"
                  className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  All Features
                </Link>
                <Link
                  href="#community"
                  className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  Community
                </Link>
                <Link
                  href="https://runash.in/blog"
                  className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="https://github.com/runash-ai-community"
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </Link>
                <Link href="/try">
      <Button className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 w-full">
        Try Now
      </Button>
    </Link>
    {process.env.NEXT_PUBLIC_CUSTOM_KEY && openKeyDialog && (
      <Button
        variant="ghost"
        onClick={openKeyDialog}
      >
        <SettingsIcon className="w-6 h-6" />
      </Button>
    )}
    // ...other JSX
                
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
      }
      



