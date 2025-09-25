import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getUserPlan } from "@/data/user-plan";

export default function SidebarFooter() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteStatus, setInviteStatus] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [userPlan, setUserPlanState] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlan() {
      if (session?.user?.email) {
        const plan = await getUserPlan(session.user.email);
        setUserPlanState(plan || "Free");
      }
    }
    fetchPlan();
  }, [session?.user?.email]);

  const handleUpgrade = async (plan: string) => {
    if (!session?.user?.email) return alert("Please login to upgrade.");
    setPaymentStatus("Processing...");
    const res = await fetch("/api/payment/stripe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, email: session.user.email }),
    });
    const data = await res.json();
    if (data.success && data.checkoutUrl) {
      setPaymentStatus(null);
      window.location.href = data.checkoutUrl;
    } else {
      setPaymentStatus("Payment failed or not implemented.");
    }
  };
  const handleInvite = async () => {
    if (!inviteEmail || !session?.user?.email) return;
    const res = await fetch("/api/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: inviteEmail,
        invitedBy: session.user.email,
      }),
    });
    if (res.ok) {
      setInviteStatus("Invite sent!");
      setInviteEmail("");
    } else {
      setInviteStatus("Failed to send invite.");
    }
  };
  return (
    <div className="mt-auto px-4 py-3 border-t border-gray-200 dark:border-gray-800">
      <button
        className="w-full py-2 rounded bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition"
        onClick={() => setOpen(true)}
      >
        New Features & Upgrade
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle>What's New & Upgrade</DialogTitle>
          <DialogDescription>
            <div className="mb-2 text-sm text-blue-600 font-semibold">
              Hi, {session?.user?.name || session?.user?.email || "User"}!<br />
              <span className="text-xs text-gray-500">
                Current Plan:{" "}
                <span className="font-bold text-green-600">
                  {userPlan || "Free"}
                </span>
              </span>
            </div>
            <ul className="list-disc pl-4 text-left text-gray-700 dark:text-gray-300 mb-4">
              <li>Copilot-inspired sidebar and navbar</li>
              <li>Real-time notifications and status</li>
              <li>Profile, feedback, and bug report integration</li>
              <li>Personalized greetings and user status</li>
              <li>Payment API integration for upgrades</li>
            </ul>
            <div className="mb-4">
              <div className="font-bold mb-2">Upgrade Plans</div>
              <div className="flex flex-col gap-2">
                <button
                  className="px-4 py-2 rounded bg-purple-600 text-white font-semibold"
                  onClick={() => handleUpgrade("Pro")}
                >
                  Upgrade to Pro
                </button>
                <button
                  className="px-4 py-2 rounded bg-blue-600 text-white font-semibold"
                  onClick={() => handleUpgrade("Ultra")}
                >
                  Upgrade to Ultra
                </button>
                <button
                  className="px-4 py-2 rounded bg-green-600 text-white font-semibold"
                  onClick={() => handleUpgrade("Enterprise")}
                >
                  Upgrade to Enterprise
                </button>
              </div>
              {paymentStatus && (
                <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                  {paymentStatus}
                </div>
              )}
              {userPlan && (
                <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                  Your current plan: {userPlan}
                </div>
              )}
            </div>
            <div className="mt-4">
              <div className="font-bold mb-2">Invite Team Members</div>
              <div className="flex gap-2 mb-2">
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Enter team member's email"
                  className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                />
                <button
                  className="px-4 py-2 rounded bg-blue-500 text-white font-semibold"
                  onClick={handleInvite}
                  disabled={!inviteEmail}
                >
                  Send Invite
                </button>
              </div>
              {inviteStatus && (
                <div className="text-xs text-green-600 dark:text-green-400 mb-2">
                  {inviteStatus}
                </div>
              )}
            </div>
            <div className="mt-4">
              <div className="font-bold mb-2">Additional Features</div>
              <ul className="list-disc pl-4 text-left text-gray-700 dark:text-gray-300">
                <li>Advanced analytics dashboard</li>
                <li>Priority support</li>
                <li>Early access to new AI models</li>
              </ul>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
