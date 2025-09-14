import Hero from "@/components/landing-hero";
import Features from "@/components/landing-features";
import Community from "@/components/landing-community";
import LiveStreamVideo from "@/components/live-stream-video";
import ImageGeneration from "@/components/image-generation";
import TalkToLive from "@/components/talk-to-live";
import PromptEnhance from "@/components/prompt-enhance";
import StreamRealTime from "@/components/stream-real-time";
import Chat from "@/components/chat";

export default function IndexPage() {
  return (
    <main className="flex flex-col gap-12 px-4 md:px-8 lg:px-16 py-8 md:py-16 w-full max-w-7xl mx-auto">
      <section>
        <Hero />
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-6 text-center">
          AI Features & Live Demos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LiveStreamVideo />
          <ImageGeneration />
          <TalkToLive />
          <PromptEnhance />
          <StreamRealTime />
          <Chat />
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
