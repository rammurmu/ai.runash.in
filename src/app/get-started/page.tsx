"use client";
import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function GetStartedPage() {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div className="max-w-lg mx-auto mt-20 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Get Started</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
        Welcome! Follow these steps to create your account and start using RunAsh AI.
      </p>
      <ol className="list-decimal pl-6 mb-8 text-gray-700 dark:text-gray-200 space-y-2">
        <li>Sign up with your email or social account</li>
        <li>Verify your email address</li>
        <li>Complete your profile</li>
        <li>Start creating and streaming with AI</li>
      </ol>
      <div className="flex flex-col gap-4 items-center">
        <Popover>
          <PopoverTrigger asChild>
            <button className="px-4 py-2 rounded bg-gradient-to-r from-gray-800 to-gray-600 text-white font-semibold shadow hover:from-gray-900 hover:to-gray-700 transition">
              Why join RunAsh AI?
            </button>
          </PopoverTrigger>
          <PopoverContent className="text-sm max-w-xs">
            <div className="font-bold mb-2 text-blue-600">Benefits</div>
            <ul className="list-disc pl-4 text-left text-gray-700 dark:text-gray-300">
              <li>Access to advanced AI video & image tools</li>
              <li>Real-time streaming and chat features</li>
              <li>Community support and resources</li>
              <li>Early access to new features</li>
            </ul>
          </PopoverContent>
        </Popover>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <button className="px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition" onClick={() => setOpenDialog(true)}>
              See Registration Demo
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Registration Demo</DialogTitle>
            <DialogDescription>
              Watch how easy it is to get started with RunAsh AI.
            </DialogDescription>
            <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center mt-4">
              <span className="text-gray-500">[Demo Video Placeholder]</span>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
