"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Link from "next/link";

export default function RateLimitPage() {
  const [open, setOpen] = useState(true);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Rate Limit Exceeded</DialogTitle>
        <DialogDescription>
          <div className="text-orange-600 font-semibold mb-2">You've hit a usage limit.</div>
          <div className="text-xs text-gray-500 mb-4">Please wait a moment before trying again, or upgrade your plan for higher limits.</div>
          <Link href="/" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold inline-block">Go Home</Link>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
