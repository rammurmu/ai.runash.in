"use client";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-black-500 to-white-600 bg-clip-text text-transparent">
          RunAsh AI
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Building the future of retail and creative automation through Human-AI collaboration.
          RunAsh AI is an applied research lab on the frontier of retail automation, empowering developers, creators, and businesses to harness AI not just as a tool, but as a true partner.
          <br /><br />
          We believe the future of retail and creation is co-designed by humans and AI, where the Human-AI Programmer directs entire systems with a thought, iterates at the speed of judgment, and turns complexity into clarity.
        </p>
        <ul className="list-disc ml-6 text-lg text-gray-700 dark:text-gray-300 space-y-2"></ul>
          <li>Invent foundational software and intelligence layers for creators.</li>
          <li>Design models, interfaces, and infrastructures that keep humans at the center.</li>
          <li>Make advanced AI video, image, and media generation accessible, ethical, and interactive.</li>
          <li>Champion open-source, transparency, and community-driven innovation.</li>
        </ul>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Image
            src="/runash-story.jpg"
            alt="RunAsh AI Story"
            width={320}
            height={180}
            className="rounded-lg shadow"
          />
          <p className="text-lg text-gray-700 dark:text-gray-300">
            RunAsh AI began as a passion project to democratize next-gen AI for real-time creative tasks. Today, our global team pioneers breakthroughs in retail, media, and interactive technology, always with a focus on empowering people and maintaining ethical standards.
          </p>
        </div>
      </section>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          We’re a tight-knit team of researchers, engineers, and tinkerers, obsessed with building not only better software, but better creators. Our work improves the daily lives of millions of programmers and creative professionals around the world.
        </p>
    </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <Image
              src="/ram.png"
              alt="Ram Murmu"
              width={80}
              height={80}
              className="rounded-full mb-3 border-4 border-gray-900"
            />
            <div className="font-semibold text-lg">Ram Murmu</div>
            <div className="text-sm text-gray-500">Founder & AI Developer</div>
            <a href="https://github.com/rammurmu" target="_blank" rel="noopener" className="mt-2 text-blue-600 hover:underline text-sm">GitHub</a>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <Image
              src="/vaibhav.png"
              alt="Vaibhav Murmu"
              width={80}
              height={80}
              className="rounded-full mb-3 border-4 border-gray-900"
            />
            <div className="font-semibold text-lg">Vaibhav Murmu</div>
            <div className="text-sm text-gray-500">Developer</div>
            <a href="https://github.com/vaibhavmurmu" target="_blank" rel="noopener" className="mt-2 text-blue-600 hover:underline text-sm">GitHub</a>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <Image
              src="/pkmurmu.png"
              alt="P K Murmu"
              width={80}
              height={80}
              className="rounded-full mb-3 border-4 border-gray-900"
            />
            <div className="font-semibold text-lg">P K Murmu</div>
            <div className="text-sm text-gray-500">Product Designer</div>
          </div>
        </div>
      </section>

      <section className="mb-12 text-center">
        <h2 className="text-3xl font-bold mb-3 text-gray-900">Join Us</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
          If you believe the future belongs to those who go beyond automation and co-create with intelligent systems, RunAsh AI wants to hear from you.
          <br />
          <span className="font-semibold">Let’s build the creators of tomorrow. Together.</span>
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/contact" className="px-5 py-2 bg-black text-white rounded-lg font-medium hover:bg-blue-700">Contact Us</Link>
          <Link href="/careers" className="px-5 py-2 bg-black text-white rounded-lg font-medium hover:bg-green-700">Careers</Link>
          <Link href="/research" className="px-5 py-2 bg-black text-white rounded-lg font-medium hover:bg-purple-700">Research</Link>
        </div>
      </section>
    </div>
  );
        }
