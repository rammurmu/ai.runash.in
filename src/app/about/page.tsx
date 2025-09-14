export default function AboutPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        About RunAsh AI
      </h1>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-2 text-blue-600">Our Mission</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Empower creators and developers with cutting-edge AI tools for live
          video, image, and real-time interaction. We believe in open-source,
          transparency, and the power of community-driven innovation.
        </p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-2 text-purple-600">Our Story</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          RunAsh AI started as a passion project to make advanced AI video and
          media generation accessible to everyone. Today, we are a global team
          building the future of creative AI, with a focus on real-time,
          interactive, and ethical technology.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Team member"
              className="w-20 h-20 rounded-full mb-3 border-4 border-blue-500"
            />
            <div className="font-semibold text-lg">Ash R.</div>
            <div className="text-sm text-gray-500">Founder & AI Engineer</div>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Team member"
              className="w-20 h-20 rounded-full mb-3 border-4 border-purple-500"
            />
            <div className="font-semibold text-lg">Samira K.</div>
            <div className="text-sm text-gray-500">Product Designer</div>
          </div>
          <div className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <img
              src="https://randomuser.me/api/portraits/men/65.jpg"
              alt="Team member"
              className="w-20 h-20 rounded-full mb-3 border-4 border-green-500"
            />
            <div className="font-semibold text-lg">Leo M.</div>
            <div className="text-sm text-gray-500">Full Stack Developer</div>
          </div>
        </div>
      </section>
    </div>
  );
}
