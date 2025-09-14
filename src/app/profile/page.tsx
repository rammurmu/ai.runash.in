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

export default function ProfilePage() {
  const [name, setName] = useState("Ash R.");
  const [email, setEmail] = useState("ash@runash.ai");
  const [bio, setBio] = useState("AI enthusiast and builder.");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // Simulate save
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(false);
    // Here you would call your update API
  };

  // Simulate delete
  const handleDelete = () => {
    // Here you would call your delete API
    setOpenDialog(false);
    setName("");
    setEmail("");
    setBio("");
    setAvatar(null);
  };

  // Simulate avatar upload
  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-20 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Profile
      </h1>
      <form className="space-y-6" onSubmit={handleSave}>
        <div className="flex flex-col items-center gap-2 mb-4">
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <img
              src={avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
              alt="Avatar"
              className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover mb-2"
            />
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatar}
            />
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="text-xs text-blue-500 hover:underline"
              >
                What is this?
              </button>
            </PopoverTrigger>
            <PopoverContent className="text-sm max-w-xs">
              <div className="font-bold mb-2 text-blue-600">
                Profile Picture
              </div>
              <div>
                Upload a clear photo or avatar. This will be visible to other
                users in the app.
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!editing}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            disabled={!editing}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Bio</label>
          <textarea
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            disabled={!editing}
          />
        </div>
        <div className="flex gap-4 mt-6">
          {editing ? (
            <>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition"
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className="px-4 py-2 rounded bg-gradient-to-r from-gray-800 to-gray-600 text-white font-semibold shadow hover:from-gray-900 hover:to-gray-700 transition"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                    onClick={() => setOpenDialog(true)}
                  >
                    Delete
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Delete Profile</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete your profile? This action
                    cannot be undone.
                  </DialogDescription>
                  <div className="flex justify-end gap-2 mt-6">
                    <button
                      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                      onClick={handleDelete}
                    >
                      Confirm Delete
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
