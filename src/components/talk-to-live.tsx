"use client";
import { useState } from "react";

export default function TalkToLive() {
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  // Placeholder for speech-to-text and AI response
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col items-center w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Talk to Live AI</h2>
      <div className="mb-4 w-full flex flex-col items-center">
        <button
          className={`px-6 py-2 rounded bg-gradient-to-r from-green-500 to-cyan-500 text-white font-semibold transition mb-2 ${listening ? 'opacity-70' : ''}`}
          onClick={() => setListening(l => !l)}
        >
          {listening ? "Stop Listening" : "Start Talking"}
        </button>
        <textarea
          className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-white mt-2"
          rows={3}
          placeholder="Your speech transcript will appear here..."
          value={transcript}
          onChange={e => setTranscript(e.target.value)}
        />
      </div>
      <div className="w-full text-left text-gray-500 text-sm">
        (Voice-to-text and live AI response coming soon)
      </div>
    </div>
  );
}
