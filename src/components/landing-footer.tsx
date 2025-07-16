import Link from "next/link";
import { Video } from "lucide-react";

export default function Footer() {
  return (
     {/* Footer */}
      <footer className="py-12 bg-white dark:bg-gray-950 border-t border-gray-200/50 dark:border-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-orange-600 to-yellow-600 dark:from-orange-400 dark:to-yellow-400 text-transparent bg-clip-text">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/press"
                    className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
                  >
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 text-transparent bg-clip-text">
                Product
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
                  >
                    
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-orange-600 to-yellow-600 dark:from-orange-400 dark:to-yellow-400 text-transparent bg-clip-text">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/docs"
                    className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
                  >
                    
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-400 text-transparent bg-clip-text">
                Connect
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500">
            <p>© {new Date().getFullYear()} RunAsh. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
}
