export default function AboutPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        AI
      </h1>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Mission</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Empower creators and developers with cutting-edge AI tools for live
          video, image, and real-time interaction. We believe in open-source,
          transparency, and the power of community-driven innovation.
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
            <div className="text-sm text-gray-500">Founder & AI Engineer</div>
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
              src="/"
              alt="Team member"
              className="w-20 h-20 rounded-full mb-3 border-4 border-gray-900"
            />
            <div className="font-semibold text-lg">P K Murmu.</div>
            <div className="text-sm text-gray-500">Product Designer</div>
          </div>
        </div>
      </section>
    </div>
  );
}
