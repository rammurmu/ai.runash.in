"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function MaintenancePage() {
  const [open, setOpen] = useState(true);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Site Under Maintenance</DialogTitle>
        <DialogDescription>
          <div className="text-orange-600 font-semibold mb-2">
            We're currently performing scheduled maintenance.
          </div>
          <div className="text-xs text-gray-500 mb-4">
            Please check back soon. Thank you for your patience!
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
