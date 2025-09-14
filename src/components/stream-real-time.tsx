"use client";
import { useState } from "react";

export default function StreamRealTime() {
  const [streaming, setStreaming] = useState(false);
  const [output, setOutput] = useState<string[]>([]);

  const handleStream = () => {
    setStreaming(true);
    setOutput([]);
    // Simulate real-time streaming output
    let i = 0;
    const messages = [
      "Connecting to AI...",
      "Generating response...",
      "Streaming data chunk 1...",
      "Streaming data chunk 2...",
      "Streaming data chunk 3...",
      "Done!",
    ];
    const interval = setInterval(() => {
      setOutput((prev) => [...prev, messages[i]]);
      i++;
      if (i >= messages.length) {
        clearInterval(interval);
        setStreaming(false);
      }
    }, 800);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col items-center w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Real-Time Streaming</h2>
      <button
        className="px-6 py-2 rounded bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold hover:from-green-600 hover:to-blue-600 transition mb-4"
        onClick={handleStream}
        disabled={streaming}
      >
        {streaming ? "Streaming..." : "Start Streaming"}
      </button>
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded p-4 text-gray-700 dark:text-gray-200 min-h-[80px] mt-2">
        {output.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
    </div>
  );
}
