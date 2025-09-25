"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function ServerErrorPage() {
  const [open, setOpen] = useState(true);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Server Error</DialogTitle>
        <DialogDescription>
          <div className="text-red-600 font-semibold mb-2">
            A server error occurred.
          </div>
          <div className="text-xs text-gray-500 mb-4">
            Please try again later or contact support if the issue persists.
          </div>
          <Link
            href="/"
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold inline-block"
          >
            Go Home
          </Link>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
