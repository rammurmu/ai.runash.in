import Link from "next/link";
import { Video } from "lucide-react";

export default function Footer() {
  return (
       <footer className="py-12 bg-white dark:bg-black border-t border-white/10 dark:border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 bg-white dark:black text-transparent bg-clip-text">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-white-600 dark:text-gray-400 dark:hover:text-white-400 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-600 hover:text-white-600 dark:text-gray-400 dark:hover:text-white-400 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/press"
                    className="text-gray-600 hover:text-white-600 dark:text-gray-400 dark:hover:text-white-400 transition-colors"
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 bg-white dark:black text-transparent bg-clip-text">
                Product
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="text-gray-600 hover:text-white-600 dark:text-gray-400 dark:hover:text-white-400 transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-gray-600 hover:text-white-600 dark:text-gray-400 dark:hover:text-white-400 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://runash.in/ai/api"
                    className="text-gray-600 hover:text-white-600 dark:text-gray-400 dark:hover:text-white-400 transition-colors"
                  >
                    API Reference 
                  </Link>
                </li>
                <li>
                  <a
                    href="https://runash.in/ai/models"
                    className="text-gray-600 hover:text-white-600 dark:text-gray-400 dark:hover:text-white-400 transition-colors"
                  >
                    AI Models 
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 bg-white dark:black text-transparent bg-clip-text">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/docs"
                    className="text-gray-600 hover:text-white-600 dark:text-gray-400 dark:hover:text-white-400 transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-600 hover:text-white-600 dark:text-gray-400 dark:hover:text-white-400 transition-colors"
                  >
                    
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600 hover:text-white-600 dark:text-gray-400 dark:hover:text-white-400 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 bg-white dark:black text-transparent bg-clip-text">
                Connect
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-white-600 dark:text-gray-400 dark:hover:text-white-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/runash-ai"
                    className="text-gray-600 hover:text-white-600 dark:text-gray-400 dark:hover:text-white-400 transition-colors"
                  >
                    GitHub 
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/runash-ai"
                    className="text-gray-600 hover:text-white-600 dark:text-gray-400 dark:hover:text-white-400 transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.gg/runash-ai"
                    className="text-gray-600 hover:text-white-600 dark:text-gray-400 dark:hover:text-white-400 transition-colors"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 dark:border-white-800 text-center text-gray-500">
              <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">RunAsh AI</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Live video stream generation model
              </p>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  <a href="/status" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                    All systems operational
                  </a>
                </span>
                </div>
            </div>
              
            <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  <a href="/status" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                    © {new Date().getFullYear()} RunAsh AI. All rights reserved.
              
                  </a>
                </span>
                </div>
            </div>
              
              
        </div>
      </footer>
  )
}
