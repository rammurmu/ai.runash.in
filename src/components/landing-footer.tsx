import Link from "next/link";
import { Video } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t flex w-full border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 max-w-screen-md md:grid-cols-3 gap-8 mx-auto">
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-2 mb-4">
              {/* <Video className="w-6 h-6" /> */}
              <span className="font-semibold">RunAsh AI</span>
            </div>
            <p className="text-sm text-gray-400">
             AI live video stream generation model
            </p>
            </div>
            

          <div className="flex flex-col items-center text-center">
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="https://runash.in/ai/about"
                  className="hover:text-white transition-colors"
                >
                  About 
                </Link>
              </li>
              <li>
                <Link
                  href="https://runash.in/ai/blog"
                  className="hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="https://runash.in/ai/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact 
                </Link>
              </li>
              <li>
                <Link
                  href="https://runash.in/ai/models"
                  className="hover:text-white transition-colors"
                >
                  AI Models
                </Link>
              </li>
              <li>
                <Link
                  href="https://runash.in/ai/api"
                  className="hover:text-white transition-colors"
                >
                  API 
                </Link>
              </li>
              <li>
                <Link
                  href="https://runash.in/ai/careers"
                  className="hover:text-white transition-colors"
                >
                  Careers 
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center text-center">
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link
                  href="https://github.com/runash/community"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://discord.gg/runash"
                  className="hover:text-white transition-colors"
                >
                  Discord
                </Link>
              </li>
              <li>
                <Link
                  href="https://x.com/runash.ai"
                  target="_blank"
                  className="hover:text-white transition-colors"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://linkedin.com/in/runash.ai"
                  target="_blank"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn 
                </Link>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
    </footer>
    <div className="max-w-2xl mx-auto text-center container mx-auto px-4">
      <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} RunAsh AI. All rights reserved.
        </p>
   </div>
  );
}
