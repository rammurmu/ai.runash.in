"use client";
import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-8 max-w-2xl mx-auto relative">
      <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Contact Us
      </h1>
      <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
        We'd love to hear from you! Fill out the form below or use the popover
        for quick contact options.
      </p>
      <form
        className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-4 mb-8"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <input
          className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
        />
        <input
          className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
          placeholder="Your Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          required
        />
        <textarea
          className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
          placeholder="Your Message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          required
        />
        <button
          className="px-6 py-2 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition"
          type="submit"
          disabled={submitted}
        >
          {submitted ? "Message Sent!" : "Send Message"}
        </button>
      </form>
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <button className="px-4 py-2 rounded bg-gradient-to-r from-gray-800 to-gray-600 text-white font-semibold shadow hover:from-gray-900 hover:to-gray-700 transition">
              Quick Contact
            </button>
          </PopoverTrigger>
          <PopoverContent className="text-sm">
            <div className="mb-2 font-bold text-blue-600">Social & Direct</div>
            <div className="mb-1">
              Email:{" "}
              <a
                href="mailto:hello@runash.ai"
                className="text-blue-500 hover:underline"
              >
                hello@runash.ai
              </a>
            </div>
            <div className="mb-1">
              Twitter:{" "}
              <a
                href="https://twitter.com/runashai"
                className="text-blue-500 hover:underline"
              >
                @runashai
              </a>
            </div>
            <div className="mb-1">
              GitHub:{" "}
              <a
                href="https://github.com/runash-ai-community"
                className="text-blue-500 hover:underline"
              >
                runash-ai-community
              </a>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              We usually reply within 24 hours.
            </div>
          </PopoverContent>
        </Popover>
        <button
          className="px-4 py-2 rounded bg-gradient-to-r from-black to-gray-800 text-white font-semibold shadow hover:from-gray-900 hover:to-gray-900 transition"
          onClick={() => setModalOpen(true)}
        >
          Support Contact
        </button>
      </div>

      {/* Modal Contact Box */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="relative w-full max-w-xl mx-auto rounded-xl bg-gray-900 p-8 shadow-xl border border-gray-800">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg"
              aria-label="Close"
            >
              &#10005;
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Contact Us
            </h2>
            <p className="mb-4 text-gray-300">
              For all support inquiries, including billing issues, receipts, and general assistance, please email
            </p>
            <a
              href="mailto:hi@runash.in"
              className="text-blue-400 underline font-medium"
            >
              hi@cursor.com
            </a>
          </div>
        </div>
      )}
    </div>
  );
          }
