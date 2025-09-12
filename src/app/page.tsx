import Hero from "@/components/landing-hero";
import Features from "@/components/landing-features";
import Community from "@/components/landing-community";

export default function IndexPage() {
  return (
    <main className="flex flex-col gap-12 px-4 md:px-8 lg:px-16 py-8 md:py-16 w-full max-w-7xl mx-auto">
      <section className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <div className="flex-1">
          <Hero />
        </div>
        <div className="flex-1 hidden md:block">
          {/* Add a beautiful illustration or screenshot here */}
          <img
            src="/screenshot.webp"
            alt="App screenshot"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
      </section>
      <section>
        <Features />
      </section>
      <section>
        <Community />
      </section>
    </main>
  );
}
