"use client";
import * as React from "react";

export function Carousel({ items }: { items: React.ReactNode[] }) {
  const [index, setIndex] = React.useState(0);
  const prev = () => setIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === items.length - 1 ? 0 : i + 1));
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      <div className="relative w-full h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden mb-4">
        {items[index]}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow hover:bg-white dark:hover:bg-gray-800"
        >
          ◀
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 rounded-full p-2 shadow hover:bg-white dark:hover:bg-gray-800"
        >
          ▶
        </button>
      </div>
      <div className="flex gap-2">
        {items.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${i === index ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700"}`}
          ></span>
        ))}
      </div>
    </div>
  );
}
