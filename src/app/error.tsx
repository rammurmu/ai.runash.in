"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(true);
  }, [error]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Something went wrong</DialogTitle>
        <DialogDescription>
          <div className="text-red-600 font-semibold mb-2">{error?.message || "An unexpected error occurred."}</div>
          <div className="text-xs text-gray-500 mb-4">If this keeps happening, please contact support or try again later.</div>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold"
            onClick={() => { setOpen(false); reset(); }}
          >Try Again</button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
