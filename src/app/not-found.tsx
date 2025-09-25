"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Link from "next/link";

export default function NotFoundPage() {
  const [open, setOpen] = useState(true);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Page Not Found</DialogTitle>
        <DialogDescription>
          <div className="text-yellow-600 font-semibold mb-2">Sorry, the page you requested does not exist.</div>
          <div className="text-xs text-gray-500 mb-4">Check the URL or return to the homepage.</div>
          <Link href="/" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold inline-block">Go Home</Link>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
