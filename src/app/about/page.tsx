"use client";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white font-serif">
      {/* Hero Section */}
      <div className="relative w-full h-[420px] md:h-[540px] overflow-hidden">
        <Image
          src="/about-hero.png" // Place your uploaded hero image in public/about-hero.jpg
          alt="RunAsh AI Hero"
          fill
          priority
          className="object-cover object-top brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        <div className="absolute w-full bottom-12 flex justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            Retail Automation 
          </h1>
        </div>
      </div>

      {/* Intro and Story */}
        <section className="max-w-2xl mx-auto mt-16 px-6">
        <p className="text-lg mb-6 leading-relaxed text-gray-300">
          RunAsh AI is an applied research lab working at the frontier of retail and creative automation. Our approach is to build the creator of the future: a human–AI creator that's an order of magnitude more effective than any one creator.
        </p>
        <p className="text-lg mb-6 leading-relaxed text-gray-300">
          This hybrid creator will have effortless control over their contents and no low-entropy keystrokes. They will iterate at the speed of their judgment, even in the most complex systems. Using a combination of AI and human ingenuity, they will out-smart and out-creator the best pure-AI system.
        </p>
        <p className="text-lg mb-6 leading-relaxed text-gray-300">
          We are a group of researchers and engineers. We build software and models to invent at the edge of what's useful and what's possible. Our <Link href="/work" className="underline text-blue-400 hover:text-blue-600">work</Link> has already improved the lives of thousands of creators.
        </p>
        <p className="mb-8">
          If this excites you, we'd love to hear from you.
        </p>
        <p className="mb-16 text-gray-400">
          — <Link href="https://github.com/rammurmu" className="underline">Ram Murmu</Link>, Vaibhav Murmu, P K Murmu, and the entire RunAsh AI team
        </p>
        <hr className="border-gray-800 mb-8"/>
      </section> 
      
      {/* Inspired intro and story from previous contents */}
      {/*  <section className="max-w-2xl mx-auto mt-16 px-6">
        <p className="text-lg mb-6 leading-relaxed text-gray-300">
          RunAsh AI is an applied research lab working at the frontier of retail  and creative automation, Our approach is to building the future retail not just better tools but better creators.
        </p>
        <p className="text-lg mb-6 leading-relaxed text-gray-300">
          The future of retail isn’t just automated. It’s co-created. At its heart is a new kind of engineer: the Human-AI Programmer. This isn’t another AI assistant. It’s a symbiotic partner—an order-of-magnitude force multiplier that fuses human intuition with AI’s scale, speed, and precision.
        </p>
        <p className="text-lg mb-6 leading-relaxed text-gray-300">
          Our Human-AI Programmer doesn’t type code. They think in systems. They don’t debug line by line—they direct entire architectures with a thought. No low-entropy keystrokes. No context switches. No friction between idea and execution. They iterate at the speed of judgment—even inside the most complex, high-stakes retail ecosystems.
        </p>
        <p className="text-lg mb-6 leading-relaxed text-gray-300">
          We believe the best AI systems aren’t those that replace humans—but those that elevate them beyond what was once imaginable. A pure-AI system can optimize. A Human-AI Programmer can invent.
        </p>
        <p className="text-lg mb-6 leading-relaxed text-gray-300">
          Empower creators and developers with cutting-edge AI tools for live video, image, and real-time interaction. We believe in open-source, transparency, and the power of community-driven innovation.
        </p>
        <p className="text-lg mb-6 leading-relaxed text-gray-300">
          To invent the foundational software and intelligence layers that enable this new breed of creator—engineers who wield AI not as a tool, but as an extension of their own intellect. We build models, interfaces, and infrastructures that turn ambiguity into action, and complexity into clarity—all while keeping the human at the center.
        </p>
        <p className="text-lg mb-6 leading-relaxed text-gray-300">
          We’re a tight-knit team of researchers, engineers, and tinkerers obsessed with the edge case—where what’s possible meets what’s useful. We don’t chase trends. We chase breakthroughs.
        </p>
        <p className="text-lg mb-6 leading-relaxed text-gray-300">
          Our work has already improved the daily lives of millions of programmers worldwide—making them faster, more confident, and more creative.
        </p>
        <p className="mb-8">
          We don’t just build software. We build the next generation of human potential.
        </p>
        <p className="mb-8">
          If you believe the future belongs to those who think beyond automation—to those who dare to co-create with machines—we want to hear from you.
        </p>
        <p className="mb-16 text-gray-400">
          — <Link href="https://github.com/rammurmu" className="underline">Ram Murmu</Link>, Vaibhav Murmu, P K Murmu, and the entire RunAsh AI team
        </p>
        <hr className="border-gray-800 mb-8"/>
      </section> */}

      {/* Story Section */}
      {/*  <section className="max-w-2xl mx-auto px-6 mb-16">
        <h2 className="text-2xl font-bold mb-3 text-gray-100">Story</h2>
        <p className="text-lg text-gray-300 mb-4">
          RunAsh AI started as a passion project to make advanced AI video and media generation accessible to everyone. Today, we are a global team building the future of creative AI, with a focus on real-time, interactive, and ethical technology.
        </p>
      </section> */}

      {/* Careers Section */}
      <section className="max-w-2xl mx-auto px-4 mb-16">
        <h2 className="text-2xl font-semibold mb-6">Careers</h2>
        <div className="mb-10">
          <h3 className="text-lg font-semibold mb-2">Engineering</h3>
          <div className="divide-y divide-gray-800">
            <CareerRow title="Infrastructure Engineer" location="Remote / Global" />
            <CareerRow title="Research Engineer" location="Remote / Global" />
            <CareerRow title="Product Engineer" location="Remote / Global" />
            <CareerRow title="Enterprise Product Engineer" location="Remote / Global" />
            <CareerRow title="Growth Data Scientist" location="Remote / Global" />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Go-to-Market</h3>
          <div className="divide-y divide-gray-800">
            <CareerRow title="Account Executive" location="Remote / Global" />
            <CareerRow title="Technical Account Manager" location="Remote / Global" />
            <CareerRow title="Field Engineer" location="Remote / Global" />
            <CareerRow title="Technical Support Engineer" location="Remote / Global" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-3xl mx-auto px-4 mb-20">
        <h2 className="text-2xl font-semibold mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TeamCard
            name="Ram Murmu"
            role="Founder & AI Developer"
            image="/ram.png"
            github="https://github.com/rammurmu"
          />
          <TeamCard
            name="Vaibhav Murmu"
            role="Developer"
            image="/vaibhav.png"
            github="https://github.com/vaibhavmurmu"
          />
          <TeamCard
            name="P K Murmu"
            role="Product Designer"
            image="/pkmurmu.png"
          />
        </div>
      </section>
    </div>
  );
}

// Team card component
function TeamCard({ name, role, image, github }: { name: string, role: string, image: string, github?: string }) {
  return (
    <div className="flex flex-col items-center bg-[#171A23] rounded-xl shadow p-6 border border-gray-800">
      <Image
        src={image}
        alt={name}
        width={80}
        height={80}
        className="rounded-full mb-3 border-4 border-gray-900"
      />
      <div className="font-semibold text-lg">{name}</div>
      <div className="text-sm text-gray-400 mb-2">{role}</div>
      {github && (
        <a href={github} target="_blank" rel="noopener" className="text-blue-400 hover:underline text-sm">GitHub</a>
      )}
    </div>
  );
}

// Career row component
function CareerRow({ title, location }: { title: string, location: string }) {
  return (
    <div className="flex justify-between py-2">
      <Link href={`/careers/${title.toLowerCase().replace(/ /g, "-")}`} className="text-gray-200 hover:underline">{title}</Link>
      <span className="text-gray-400 text-sm">{location}</span>
    </div>
  );
        }
