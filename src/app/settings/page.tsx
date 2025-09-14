"use client";
import { useState } from "react";
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

export default function SettingsPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [username, setUsername] = useState("runash-user");
  const [email, setEmail] = useState("user@email.com");
  const [theme, setTheme] = useState("system");

  return (
    <div className="max-w-lg mx-auto mt-20 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Settings
      </h1>
      <form className="space-y-6">
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
          <select
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="system">System</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
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
                Are you sure you want to delete your account? This action cannot
                be undone.
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
    </div>
  );
}
