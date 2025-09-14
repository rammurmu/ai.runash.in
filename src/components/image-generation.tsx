"use client";
import { useState } from "react";

export default function ImageGeneration() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setImageUrl(null);
    // Placeholder: Replace with real API call
    setTimeout(() => {
      setImageUrl("https://placehold.co/512x512?text=AI+Image");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col items-center w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">AI Image Generation</h2>
      <input
        className="w-full p-2 rounded border border-gray-300 dark:border-gray-700 mb-4 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
        placeholder="Describe your image..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        className="px-6 py-2 rounded bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold hover:from-pink-600 hover:to-yellow-600 transition mb-4"
        onClick={handleGenerate}
        disabled={loading || !prompt.trim()}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Generated"
          className="rounded-lg shadow w-64 h-64 object-cover"
        />
      )}
    </div>
  );
}
