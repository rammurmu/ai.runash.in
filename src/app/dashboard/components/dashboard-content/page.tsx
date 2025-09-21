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

export default function DashboardContentPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const quickActions = [
    { label: "New Project", description: "Start a new AI video project." },
    {
      label: "Upload Media",
      description: "Upload images or videos to your library.",
    },
    { label: "Go Live", description: "Start a live streaming session." },
  ];

  const handleAction = (action: string) => {
    setSelectedAction(action);
    setOpenDialog(true);
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-6 flex flex-col items-center">
          <div className="text-3xl font-bold mb-2">12</div>
          <div className="text-gray-500">Projects</div>
        </div>
        <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-xl p-6 flex flex-col items-center">
          <div className="text-3xl font-bold mb-2">5</div>
          <div className="text-gray-500">Live Streams</div>
        </div>
        <div className="bg-gradient-to-br from-pink-500/10 to-yellow-500/10 rounded-xl p-6 flex flex-col items-center">
          <div className="text-3xl font-bold mb-2">37</div>
          <div className="text-gray-500">Media Uploads</div>
        </div>
      </div>
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            🎬 Created project <b>"AI Demo Reel"</b> (2 hours ago)
          </li>
          <li>
            📤 Uploaded <b>"demo.mp4"</b> (1 day ago)
          </li>
          <li>
            🔴 Went live: <b>"AI Live Stream"</b> (3 days ago)
          </li>
        </ul>
      </div>
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <Popover>
            <PopoverTrigger asChild>
              <button className="text-xs text-blue-500 hover:underline">
                What are these?
              </button>
            </PopoverTrigger>
            <PopoverContent className="text-sm max-w-xs">
              <div className="font-bold mb-2 text-blue-600">Quick Actions</div>
              <div>
                Use these shortcuts to quickly start a new project, upload
                media, or go live with AI streaming.
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex gap-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className="px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition"
              onClick={() => handleAction(action.label)}
            >
              {action.label}
            </button>
          ))}
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogTitle>{selectedAction}</DialogTitle>
            <DialogDescription>
              {
                quickActions.find((a) => a.label === selectedAction)
                  ?.description
              }
            </DialogDescription>
            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                onClick={() => setOpenDialog(false)}
              >
                Close
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
