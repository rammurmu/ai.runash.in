import React from "react";
import CustomDialog from "./CustomDialog";

export default function AccountSettings({ username, email, setUsername, setEmail }) {
  return (
    <div>
      <h2 className="font-semibold mb-2">Account</h2>
      <div>
        <label>Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <CustomDialog
        triggerText="Delete Account"
        title="Delete Account"
        description="Are you sure you want to delete your account? This action cannot be undone."
      >
        <button className="bg-red-600 text-white px-4 py-2 rounded">Confirm Delete</button>
      </CustomDialog>
    </div>
  );
      }
