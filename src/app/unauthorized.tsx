"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";

export default function UnauthorizedPage() {
  const [open, setOpen] = useState(true);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Access Denied</DialogTitle>
        <DialogDescription>
          <div className="text-red-600 font-semibold mb-2">
            You do not have permission to view this page.
          </div>
          <div className="text-xs text-gray-500 mb-4">
            Please login with an account that has access or contact support.
          </div>
          <Link
            href="/login"
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold inline-block"
          >
            Login
          </Link>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
