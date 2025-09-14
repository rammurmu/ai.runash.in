"use client";
import { useState } from "react";

export default function LiveStreamVideo() {
  const [isStreaming, setIsStreaming] = useState(false);
  // Placeholder for video stream URL or state
  return (
    <div className="bg-black rounded-xl p-6 shadow-lg flex flex-col items-center w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-white">
        Live Video Generation
      </h2>
      <div className="w-full aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-4 border border-gray-700">
        {isStreaming ? (
          <video
            src="#"
            controls
            autoPlay
            className="w-full h-full rounded-lg"
          />
        ) : (
          <span className="text-gray-400">Live stream will appear here</span>
        )}
      </div>
      <button
        className="px-6 py-2 rounded bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition"
        onClick={() => setIsStreaming((s) => !s)}
      >
        {isStreaming ? "Stop Streaming" : "Start Live Generation"}
      </button>
    </div>
  );
}
