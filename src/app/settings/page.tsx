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

// Fix: Add typing for ThemeSwitcher props
type ThemeSwitcherProps = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
};

function ThemeSwitcher({ theme, setTheme }: ThemeSwitcherProps) {
  useEffect(() => {
    if (theme === "system") {
      document.documentElement.classList.toggle(
        "dark",
        window.matchMedia("(prefers-color-scheme: dark)").matches,
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

// Fix: Add typing for AccentColorPicker props
type AccentColorPickerProps = {
  accentColor: string;
  setAccentColor: React.Dispatch<React.SetStateAction<string>>;
};

function AccentColorPicker({
  accentColor,
  setAccentColor,
}: AccentColorPickerProps) {
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
      <span className="text-sm ml-2">
        Accent: <b className={`text-${accentColor}-500`}>{accentColor}</b>
      </span>
    </div>
  );
}

// Fix: Add typing for LanguagePicker props
type LanguagePickerProps = {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
};

function LanguagePicker({ language, setLanguage }: LanguagePickerProps) {
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

// Fix: Add typing for ProfileImageUpload props
type ProfileImageUploadProps = {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

function ProfileImageUpload({ image, setImage }: ProfileImageUploadProps) {
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
  const [theme, setTheme] = useState<string>("system");
  const [accentColor, setAccentColor] = useState<string>("blue");
  const [language, setLanguage] = useState<string>("auto");
  const [spokenLanguage, setSpokenLanguage] = useState<string>("hi");
  const [voice, setVoice] = useState<string>("play");
  const [image, setImage] = useState<string>("");

  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [showThemeDialog, setShowThemeDialog] = useState(false);
  const [showAccountDialog, setShowAccountDialog] = useState(false);

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
                <label className="block text-sm font-semibold mb-1">
                  Username
                </label>
                <input
                  className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Email
                </label>
                <input
                  className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>
              <button
                type="button"
                className="w-full py-2 rounded bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition"
                onClick={() => setShowProfileDialog(true)}
              >
                Edit Profile
              </button>
            </form>
          )}
          {section === "personalization" && (
            <div className="space-y-6">
              <AccentColorPicker
                accentColor={accentColor}
                setAccentColor={setAccentColor}
              />
              <LanguagePicker language={language} setLanguage={setLanguage} />
              <button
                type="button"
                className="w-full py-2 rounded bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold shadow hover:from-purple-600 hover:to-blue-600 transition"
                onClick={() => setShowThemeDialog(true)}
              >
                Edit Theme
              </button>
            </div>
          )}
          {section === "account" && (
            <div className="space-y-6">
              <button
                type="button"
                className="w-full py-2 rounded bg-gradient-to-r from-red-500 to-orange-600 text-white font-semibold shadow hover:from-red-600 hover:to-orange-600 transition"
                onClick={() => setShowAccountDialog(true)}
              >
                Account Actions
              </button>
            </div>
          )}
        </div>
        {/* Profile Edit Dialog */}
        <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
          <DialogContent>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              <div className="space-y-4">
                <ProfileImageUpload image={image} setImage={setImage} />
                <input
                  className="w-full border rounded px-3 py-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
                <input
                  className="w-full border rounded px-3 py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <button
                  className="w-full py-2 rounded bg-blue-600 text-white font-semibold"
                  onClick={() => setShowProfileDialog(false)}
                >
                  Save Changes
                </button>
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
        {/* Theme Edit Dialog */}
        <Dialog open={showThemeDialog} onOpenChange={setShowThemeDialog}>
          <DialogContent>
            <DialogTitle>Edit Theme</DialogTitle>
            <DialogDescription>
              <ThemeSwitcher theme={theme} setTheme={setTheme} />
              <AccentColorPicker
                accentColor={accentColor}
                setAccentColor={setAccentColor}
              />
              <button
                className="w-full py-2 rounded bg-purple-600 text-white font-semibold mt-4"
                onClick={() => setShowThemeDialog(false)}
              >
                Apply
              </button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
        {/* Account Actions Dialog */}
        <Dialog open={showAccountDialog} onOpenChange={setShowAccountDialog}>
          <DialogContent>
            <DialogTitle>Account Actions</DialogTitle>
            <DialogDescription>
              <div className="space-y-4">
                <button className="w-full py-2 rounded bg-red-600 text-white font-semibold">
                  Delete Account
                </button>
                <button className="w-full py-2 rounded bg-orange-500 text-white font-semibold">
                  Sign Out
                </button>
                <button
                  className="w-full py-2 rounded bg-blue-600 text-white font-semibold"
                  onClick={() => setShowAccountDialog(false)}
                >
                  Cancel
                </button>
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
