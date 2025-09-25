"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Link from "next/link";

export default function ForbiddenPage() {
  const [open, setOpen] = useState(true);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Forbidden</DialogTitle>
        <DialogDescription>
          <div className="text-red-600 font-semibold mb-2">You are not allowed to perform this action.</div>
          <div className="text-xs text-gray-500 mb-4">If you believe this is a mistake, please contact support.</div>
          <Link href="/" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold inline-block">Go Home</Link>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
