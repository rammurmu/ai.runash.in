import { Button } from "@/components/ui/button"
import { Github, MessageCircle, Users, Star, GitFork, Eye, Twitter, DiscIcon as Discord } from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "GitHub Stars", value: "0", icon: Star },
  { label: "Forks", value: "0", icon: GitFork },
  { label: "Watchers", value: "0", icon: Eye },
  { label: "Contributors", value: "0", icon: Users },
]

export default function Community() {
  return (
    <section id="community" className="py-20 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join our community</h2>
          <p className="text-gray-400 mb-8">
           AI live video streaming platform  is built by RunAsh, for
            creater. Join our growing community and help shape the future of
            video generation and editing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="https://github.com/runash-ai-community">
              <Button variant="outline" className="w-full">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </Button>
            </Link>
            <Link href="https://discord.gg/runash-ai">
              <Button variant="outline" className="w-full">
                <Discord className="mr-2 h-5 w-5" />
                Discord
              </Button>
            </Link>
            <Link href="https://x.com/runash.ai">
              <Button variant="outline" className="w-full">
                <Twitter className="mr-2 h-5 w-5" />
                Twitter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
    <section id="community" className="py-20 px-4 bg-white dark:bg-black">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
            Join our growing
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              community
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Connect with thousands of creators, developers, and AI enthusiasts building the future of video content
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-2">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Community Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* GitHub Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
            <Github className="w-12 h-12 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Open Source</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              RunAsh AI is completely open source. Contribute to the project, report issues, or fork it for your own
              use.
            </p>
            <Link
              href="https://github.com/runash-ai-community"
              className="inline-flex items-center px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              View on GitHub
              <Github className="ml-2 w-5 h-5" />
            </Link>
          </div>

          {/* Discord Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <MessageCircle className="w-12 h-12 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Discord Community</h3>
            <p className="text-purple-100 mb-6 leading-relaxed">
              Join our Discord server to chat with other users, get help, share your creations, and stay updated.
            </p>
            <Link
              href="https://discord.gg/runashai"
              className="inline-flex items-center px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
            >
              Join Discord
              <MessageCircle className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-12 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800">
          <h3 className="text-3xl font-bold mb-4 text-black dark:text-white">Ready to get started?</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using RunAsh AI to create amazing videos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/app"
              className="inline-flex items-center px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              Start Creating
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center px-8 py-4 border border-gray-300 dark:border-gray-600 text-black dark:text-white rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Read Documentation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
            

