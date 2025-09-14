"use client";
import { useState } from "react";

export default function PromptEnhance() {
  const [prompt, setPrompt] = useState("");
  const [enhanced, setEnhanced] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEnhance = async () => {
    setLoading(true);
    setEnhanced(null);
    // Placeholder: Replace with real API call
    setTimeout(() => {
      setEnhanced(prompt ? `Enhanced: ${prompt} (with more detail)` : "");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col items-center w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Prompt Enhance</h2>
      <input
        className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 mb-4 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <button
        className="px-6 py-2 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition mb-4"
        onClick={handleEnhance}
        disabled={loading || !prompt.trim()}
      >
        {loading ? "Enhancing..." : "Enhance Prompt"}
      </button>
      {enhanced && (
        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded p-4 text-gray-700 dark:text-gray-200 mt-2">
          {enhanced}
        </div>
      )}
    </div>
  );
}
