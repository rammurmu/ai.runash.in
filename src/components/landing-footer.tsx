import Link from "next/link";
import { Video } from "lucide-react";

export default function Footer() {
  return (
        <footer className="py-16 bg-white dark:bg-black border-t border-white/10 dark:border-white/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mb-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white">RunAsh AI</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                RunAsh AI as an AI Research and Development Company focusing on live streaming innovation
              </p>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  <a href="/status" className="hover:text-orange-600 dark:hover:text-white transition-colors">
                    All systems operational
                  </a>
                </span>
              </div>

              {/* Language and Country Selector */}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                {/* <LanguageSelector /> */}
                {/* <CountrySelector /> */}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/ai"
                    className="text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors"
                  >
                    AI
                  </a>
                </li>
                <li>
                  <a
                    href="/chat"
                    className="text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors"
                  >
                    RunAshChat
                  </a>
                </li>
                <li>
                  <a
                    href="/agent"
                    className="text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors"
                  >
                   Agent
                  </a>
                </li>
                <li>
                  <a
                    href="/creator"
                    className="text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors"
                  >
                    Customer 
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/app"
                    className="text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors"
                  >
                    AI Studio
                  </a>
                </li>
                <li>
                  <a
                    href="/ios"
                    className="text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors"
                  >
                    iOS App 
                  </a>
                </li>
                <li>
                  <a
                    href="/android"
                    className="text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors"
                  >
                    Android App 
                  </a>
                </li>
                <li>
                  <a
                    href="/web"
                    className="text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors"
                  >
                    Web App 
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/doc"
                    className="text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="/tutorials"
                    className="text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="/learn"
                    className="text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors"
                  >
                    Learn 
                  </a>
                </li>
                <li>
                  <a
                    href="/community"
                    className="text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors"
                  >
                    Community 
                  </a>
                </li>
              </ul>
            </div>
          </div>
          </div>
        
       <div className="py-12 bg-white dark:bg-black border-t border-white/10 dark:border-white/10">
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
                    href="mailto:career@runash.in"
                    className="text-gray-600 hover:text-white-600 dark:text-gray-400 dark:hover:text-white-400 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:press@runash.in"
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
                    href="https://ai.runash.in/app"
                    className="text-gray-600 hover:text-white-600 dark:text-gray-400 dark:hover:text-white-400 transition-colors"
                  >
                    AI Editor 
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://ai.runash.in/ai/api"
                    className="text-gray-600 hover:text-white-600 dark:text-gray-400 dark:hover:text-white-400 transition-colors"
                  >
                    API Reference 
                  </Link>
                </li>
                <li>
                  <a
                    href="https://ai.runash.in/ai/models"
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
                    href="/pricing"
                    className="text-gray-600 hover:text-white-600 dark:text-gray-400 dark:hover:text-white-400 transition-colors"
                  >
                    Pricing 
                  </Link>
                </li>
                <li>
                  <Link
                    href="/docs"
                    className="text-gray-600 hover:text-white-600 dark:text-gray-400 dark:hover:text-white-400 transition-colors"
                  >
                    Forum 
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
                    href="mailto:contact@runash.in"
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
                    href="https://x.com/runash_ai"
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
            {/* <h3 className="font-bold text-sm mb-4 text-gray-900 dark:text-white">Try Now</h3> */}
              <p className="text-gray-600 text:sm dark:text-gray-400 mb-0">
                RunAsh AI
              </p>
              <div className="items-center gap-2 mb-0">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  <a href="/status" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                    By RunAsh AI Research Lab 
                  </a>
                </span>
              <div className="text-center text-sm text-white dark:text-gray-400">
                 <p>© {new Date().getFullYear()} RunAsh AI. All rights reserved.</p>
           </div>
           </div>
        </div>
        </div>  
       </div>
        
      </footer>
  )
}
