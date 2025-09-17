"use client";
import Image from "next/image";
import Link xfrom "next/link";

export default function AboutPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        About AI
      </h1>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">RunAsh AI</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          We are RunAsh AI — an applied research lab on the frontier of retail automation, building not just better tools but better creators.
          <br />
          The future of retail isn’t just automated. It’s co-created.
          And at its heart is a new kind of engineer: the Human-AI Programmer.
          <br />
          This isn’t another AI assistant.
          It’s a symbiotic partner — an order-of-magnitude force multiplier that fuses human intuition with AI’s scale, speed, and precision.
           <br />
          Our Human-AI Programmer doesn’t type code. They think in systems.
          They don’t debug line by line — they direct entire architectures with a thought.
          No low-entropy keystrokes. No context switches. No friction between idea and execution.
          They iterate at the speed of judgment — even inside the most complex, high-stakes retail ecosystems.
          <br />
          We believe the best AI systems aren’t those that replace humans — but those that elevate them beyond what was once imaginable.
          A pure-AI system can optimize.
          A Human-AI Programmer can invent.
          <br />
          Empower creators and developers with cutting-edge AI tools for live video, image, and real-time interaction. We believe in open-source,
          transparency, and the power of community-driven innovation.
        </p>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Our Mission</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          To invent the foundational software and intelligence layers that enable this new breed of creator — engineers who wield AI not as a tool, but as an extension of their own intellect.
          We build models, interfaces, and infrastructures that turn ambiguity into action, and complexity into clarity — all while keeping the human at the center.
        </p>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Who We Are</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          We’re a tight-knit team of researchers, engineers, and tinkerers obsessed with the edge case — where what’s possible meets what’s useful.
          We don’t chase trends. We chase breakthroughs.
          Our work has already improved the daily lives of millions of programmers worldwide — making them faster, more confident, and more creative.
          <br />
          We don’t just build software.
          We build the next generation of human potential.
        </p>
      </section>
      
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Join Us</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          If you believe the future belongs to those who think beyond automation — to those who dare to co-create with machines — we want to hear from you.
           <br />
          Let’s build the creators of tomorrow.
          Together.
          <br />
           Contact Us | Careers | Research |
        </p>
      </section>
      
    
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Story</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          RunAsh AI started as a passion project to make advanced AI video and
          media generation accessible to everyone. Today, we are a global team
          building the future of creative AI, with a focus on real-time,
          interactive, and ethical technology.
        </p>
      </section>
      </div>
    
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <img
              src="https://github.com/rammurmu/ai.runash.in/blob/69d73ad50cb1c4599cca89aae5a0bbbcf6191bf0/public/ram.png"
              alt="Team member"
              className="w-20 h-20 rounded-full mb-3 border-4 border-gray-900"
            />
            <div className="font-semibold text-lg">Ram Murmu.</div>
            <div className="text-sm text-gray-500">Founder & AI Developer</div>
          </div>
    
          <div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <img
              src="https://github.com/rammurmu/ai.runash.in/blob/69d73ad50cb1c4599cca89aae5a0bbbcf6191bf0/public/vaibhav.png"
              alt="Team member"
              className="w-20 h-20 rounded-full mb-3 border-4 border-gray-900"
            />
            <div className="font-semibold text-lg"Vaibhav Murmu .</div>
            <div className="text-sm text-gray-500">Developer</div>
          </div>
    
          <div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <img
              src="https://"
              alt="Team member"
              className="w-20 h-20 rounded-full mb-3 border-4 border-gray-900"
            />
            <div className="font-semibold text-lg">P K Murmu.</div>
            <div className="text-sm text-gray-500">Product Designer</div>
          </div>
         </div>
      </section>
    
  
  );
}
