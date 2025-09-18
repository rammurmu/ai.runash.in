"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Dummy accent colors
const ACCENT_COLORS = ["blue", "purple", "green", "orange"];

const LANGUAGES = [
  { label: "Auto-detect", value: "auto" },
  { label: "English", value: "en" },
  { label: "Hindi", value: "hi" },
  { label: "Spanish", value: "es" },
];

const SECTIONS = [
  { key: "general", label: "General" },
  { key: "notifications", label: "Notifications" },
  { key: "personalization", label: "Personalization" },
  { key: "connected", label: "Connected apps" },
  { key: "data", label: "Data controls" },
  { key: "security", label: "Security" },
  { key: "account", label: "Account" },
];

function ThemeSwitcher({ theme, setTheme }) {
  useEffect(() => {
    if (theme === "system") {
      document.documentElement.classList.toggle(
        "dark",
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);
  return (
    <select
      className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}

function AccentColorPicker({ accentColor, setAccentColor }) {
  return (
    <div className="flex gap-4 items-center">
      {ACCENT_COLORS.map((color) => (
        <button
          key={color}
          className={`w-6 h-6 rounded-full border-2 ${
            accentColor === color
              ? `border-${color}-500`
              : "border-gray-300 dark:border-gray-600"
          } bg-${color}-500`}
          style={{ backgroundColor: color }}
          aria-label={`Accent color ${color}`}
          onClick={() => setAccentColor(color)}
        />
      ))}
      <span className="text-sm ml-2">Accent: <b className={`text-${accentColor}-500`}>{accentColor}</b></span>
    </div>
  );
}

function LanguagePicker({ language, setLanguage }) {
  return (
    <select
      className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}

function ProfileImageUpload({ image, setImage }) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImage(result);
      if (typeof window !== "undefined") {
        localStorage.setItem("profileImage", result);
      }
    };
    reader.readAsDataURL(file);
  }

  function handleRemove() {
    setImage("");
    if (typeof window !== "undefined") {
      localStorage.removeItem("profileImage");
    }
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col items-center gap-2 mb-4">
      <div className="relative">
        <img
          src={image || "/default-avatar.png"}
          alt="Profile"
          className="w-20 h-20 rounded-full border-2 border-gray-300 dark:border-gray-700 object-cover shadow"
        />
        {image && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-1 text-xs hover:bg-red-700"
            aria-label="Remove image"
          >
            ×
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
        id="profile-upload"
      />
      <label
        htmlFor="profile-upload"
        className="px-3 py-1 rounded bg-blue-500 text-white font-semibold cursor-pointer hover:bg-blue-600 transition text-sm"
      >
        {image ? "Change" : "Upload"} Image
      </label>
    </div>
  );
}

export default function SettingsPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [section, setSection] = useState("general");
  const [username, setUsername] = useState("runash-user");
  const [email, setEmail] = useState("user@email.com");
  const [theme, setTheme] = useState("system");
  const [accentColor, setAccentColor] = useState("blue");
  const [language, setLanguage] = useState("auto");
  const [spokenLanguage, setSpokenLanguage] = useState("hi");
  const [voice, setVoice] = useState("play");
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedImage = localStorage.getItem("profileImage");
      if (storedImage) setImage(storedImage);
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto mt-16 p-4 md:p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg transition">
      {/* Sidebar */}
      <aside className="w-full md:w-64 mb-4 md:mb-0">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
          {SECTIONS.map((item) => (
            <button
              key={item.key}
              className={`w-full text-left px-3 py-2 rounded-lg mb-2 font-semibold transition ${
                section === item.key
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setSection(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </aside>
      {/* Content */}
      <main className="flex-1">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            {SECTIONS.find((s) => s.key === section)?.label || "Settings"}
          </h1>
          {section === "general" && (
            <form className="space-y-6">
              <ProfileImageUpload image={image} setImage={setImage} />
              <div>
                <label className="block text-sm font-semibold mb-1">Username</label>
                <input
                  className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input
                  className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Theme</label>
                <ThemeSwitcher theme={theme} setTheme={setTheme} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Accent color</label>
                <AccentColorPicker accentColor={accentColor} setAccentColor={setAccentColor} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Language</label>
                <LanguagePicker language={language} setLanguage={setLanguage} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Spoken language</label>
                <input
                  className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                  value={spokenLanguage}
                  onChange={(e) => setSpokenLanguage(e.target.value)}
                  list="spoken-langs"
                />
                <datalist id="spoken-langs">
                  <option value="Hindi" />
                  <option value="English" />
                  <option value="Spanish" />
                </datalist>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  For best results, select the language you mainly speak. If it's not listed, it may still be supported via auto-detection.
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Voice</label>
                <select
                  className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                  value={voice}
                  onChange={(e) => setVoice(e.target.value)}
                >
                  <option value="play">Play</option>
                  <option value="cover">Cover</option>
                </select>
              </div>
              <div className="flex gap-4 mt-6">
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-gradient-to-r from-gray-800 to-gray-600 text-white font-semibold shadow hover:from-gray-900 hover:to-gray-700 transition"
                    >
                      What is theme?
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="text-sm max-w-xs">
                    <div className="font-bold mb-2 text-blue-600">Theme Options</div>
                    <ul className="list-disc pl-4 text-left text-gray-700 dark:text-gray-300">
                      <li>
                        <b>System</b>: Follows your device's theme
                      </li>
                      <li>
                        <b>Light</b>: Always light mode
                      </li>
                      <li>
                        <b>Dark</b>: Always dark mode
                      </li>
                    </ul>
                  </PopoverContent>
                </Popover>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition"
                      onClick={() => setOpenDialog(true)}
                    >
                      Delete Account
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete your account? This action cannot be undone.
                    </DialogDescription>
                    <div className="flex justify-end gap-2 mt-6">
                      <button
                        className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        onClick={() => setOpenDialog(false)}
                      >
                        Cancel
                      </button>
                      <button className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition">
                        Confirm Delete
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </form>
          )}
          {/* Other sections can be expanded with relevant form fields, toggles, etc. */}
          {section === "notifications" && (
            <div>
              <h2 className="font-semibold mb-2">Notifications</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your notification preferences here.
              </p>
              {/* Add notification settings UI */}
            </div>
          )}
          {section === "personalization" && (
            <div>
              <h2 className="font-semibold mb-2">Personalization</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Personalize your experience.
              </p>
              {/* Add personalization settings UI */}
            </div>
          )}
          {section === "connected" && (
            <div>
              <h2 className="font-semibold mb-2">Connected Apps</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your connected apps here.
              </p>
              {/* Add connected apps UI */}
            </div>
          )}
          {section === "data" && (
            <div>
              <h2 className="font-semibold mb-2">Data Controls</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Control your data settings here.
              </p>
              {/* Add data controls UI */}
            </div>
          )}
          {section === "security" && (
            <div>
              <h2 className="font-semibold mb-2">Security</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your security settings here.
              </p>
              {/* Add security settings UI */}
            </div>
          )}
          {section === "account" && (
            <div>
              <h2 className="font-semibold mb-2">Account</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your account settings here.
              </p>
              {/* Add account settings UI */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
