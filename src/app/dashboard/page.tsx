use client;
import { useState, useEffect } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import PlanCard from "@/components/plan-card";
import IntegrationStatus from "@/components/integration-status";

// ---- MOCK API ----
// Replace these with your real API endpoints!
const fetchData = async (type: string) => {
  // Simulate API call
  if (type === "projects") return [
    { id: 1, name: "AI Demo Reel", updated: "2 hours ago" },
    { id: 2, name: "Marketing Video", updated: "1 day ago" },
  ];
  if (type === "streams") return [
    { id: 1, name: "AI Live Stream", updated: "3 days ago" },
    { id: 2, name: "Product Launch", updated: "5 days ago" },
  ];
  if (type === "media") return [
    { id: 1, name: "demo.mp4", updated: "1 day ago" },
    { id: 2, name: "banner.png", updated: "2 days ago" },
  ];
  return [];
};

const createData = async (type: string, item: any) => {
  // Simulate API call
  return { ...item, id: Math.random() };
};

const updateData = async (type: string, id: number, item: any) => {
  // Simulate API call
  return { ...item, id };
};

const deleteData = async (type: string, id: number) => {
  // Simulate API call
  return true;
};
// ---- END MOCK API ----

export default function DashboardPage() {
  // State
  const [projects, setProjects] = useState<any[]>([]);
  const [streams, setStreams] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [formType, setFormType] = useState<string | null>(null); // project, stream, media
  const [formMode, setFormMode] = useState<"create"|"edit"|"delete"|null>(null);
  const [formData, setFormData] = useState<any>({});
  const [editId, setEditId] = useState<number|null>(null);

  // Load data
  useEffect(() => {
    fetchData("projects").then(setProjects);
    fetchData("streams").then(setStreams);
    fetchData("media").then(setMedia);
  }, []);

  // Quick actions
  const quickActions = [
    { label: "New Project", description: "Start a new AI video project.", type: "project" },
    { label: "Upload Media", description: "Upload images or videos to your library.", type: "media" },
    { label: "Go Live", description: "Start a live streaming session.", type: "stream" },
  ];

  // Handlers
  const handleAction = (action: string, type: string) => {
    setSelectedAction(action);
    setFormType(type);
    setFormMode("create");
    setFormData({});
    setOpenDialog(true);
    setEditId(null);
  };

  const handleEdit = (type: string, item: any) => {
    setSelectedAction(`Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`);
    setFormType(type);
    setFormMode("edit");
    setFormData(item);
    setOpenDialog(true);
    setEditId(item.id);
  };

  const handleDelete = (type: string, item: any) => {
    setSelectedAction(`Delete ${type.charAt(0).toUpperCase() + type.slice(1)}`);
    setFormType(type);
    setFormMode("delete");
    setFormData(item);
    setOpenDialog(true);
    setEditId(item.id);
  };

  // Form submission
  const handleSubmit = async () => {
    if (!formType) return;
    if (formMode === "create") {
      const newItem = await createData(formType, formData);
      if (formType === "project") setProjects([...projects, newItem]);
      if (formType === "stream") setStreams([...streams, newItem]);
      if (formType === "media") setMedia([...media, newItem]);
    }
    if (formMode === "edit" && editId) {
      const updatedItem = await updateData(formType, editId, formData);
      if (formType === "project") setProjects(projects.map(p => p.id === editId ? updatedItem : p));
      if (formType === "stream") setStreams(streams.map(s => s.id === editId ? updatedItem : s));
      if (formType === "media") setMedia(media.map(m => m.id === editId ? updatedItem : m));
    }
    if (formMode === "delete" && editId) {
      await deleteData(formType, editId);
      if (formType === "project") setProjects(projects.filter(p => p.id !== editId));
      if (formType === "stream") setStreams(streams.filter(s => s.id !== editId));
      if (formType === "media") setMedia(media.filter(m => m.id !== editId));
    }
    setOpenDialog(false);
    setFormData({});
    setEditId(null);
    setFormMode(null);
    setFormType(null);
  };

  // Form UI
  const renderForm = () => {
    if (!formType) return null;
    if (formMode === "delete") {
      return (
        <div>
          <p>
            Are you sure you want to delete <b>{formData.name}</b>?
          </p>
          <div className="flex justify-end mt-6">
            <button
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 mr-2"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-red-500 text-white"
              onClick={handleSubmit}
            >
              Delete
            </button>
          </div>
        </div>
      );
    }
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="space-y-4">
          <input
            className="border rounded px-3 py-2 w-full"
            placeholder={`Name of ${formType}`}
            value={formData.name || ""}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 mr-2"
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-500 text-white"
          >
            {formMode === "create" ? "Create" : "Update"}
          </button>
        </div>
      </form>
    );
  };

  return (
    <>
      {/* PLAN CARDS */}
      <div className="grid gap-6 md:grid-cols-3 mt-6">
        <PlanCard
          plan="Free"
          title="Free Plan"
          description="Limited Tab completions and Agent requests."
          features={[
            "Basic tab completions",
            "Community support",
            "Limited agent requests",
          ]}
        />
        <PlanCard
          plan="Pro"
          title="Pro Plan"
          description="Extended limits, unlimited completions, more."
          features={[
            "Unlimited tab completions",
            "Priority support",
            "Extended agent requests",
            "Max context windows",
          ]}
          cta={{ label: "Upgrade to Pro", url: "/upgrade/pro" }}
          highlight
        />
        <PlanCard
          plan="Ultra"
          title="Ultra Plan"
          description="20x higher limits, advanced models, early access."
          features={[
            "20x higher limits",
            "Early access to features",
            "Enterprise-grade security",
          ]}
          cta={{ label: "Upgrade to Ultra", url: "/upgrade/ultra" }}
        />
      </div>

      <div className="mt-8">
        <IntegrationStatus />
      </div>

      <div className="max-w-4xl mx-auto mt-16 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-6 flex flex-col items-center">
            <div className="text-3xl font-bold mb-2">{projects.length}</div>
            <div className="text-gray-500">Projects</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-xl p-6 flex flex-col items-center">
            <div className="text-3xl font-bold mb-2">{streams.length}</div>
            <div className="text-gray-500">Live Streams</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500/10 to-yellow-500/10 rounded-xl p-6 flex flex-col items-center">
            <div className="text-3xl font-bold mb-2">{media.length}</div>
            <div className="text-gray-500">Media Uploads</div>
          </div>
        </div>
        {/* RECENT ACTIVITY */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            {projects.map((p) => (
              <li key={p.id}>
                🎬 Project <b>{p.name}</b> ({p.updated})
                <button
                  className="ml-2 text-xs text-blue-500"
                  onClick={() => handleEdit("project", p)}
                >
                  Edit
                </button>
                <button
                  className="ml-2 text-xs text-red-500"
                  onClick={() => handleDelete("project", p)}
                >
                  Delete
                </button>
              </li>
            ))}
            {media.map((m) => (
              <li key={m.id}>
                📤 Uploaded <b>{m.name}</b> ({m.updated})
                <button
                  className="ml-2 text-xs text-blue-500"
                  onClick={() => handleEdit("media", m)}
                >
                  Edit
                </button>
                <button
                  className="ml-2 text-xs text-red-500"
                  onClick={() => handleDelete("media", m)}
                >
                  Delete
                </button>
              </li>
            ))}
            {streams.map((s) => (
              <li key={s.id}>
                🔴 Stream <b>{s.name}</b> ({s.updated})
                <button
                  className="ml-2 text-xs text-blue-500"
                  onClick={() => handleEdit("stream", s)}
                >
                  Edit
                </button>
                <button
                  className="ml-2 text-xs text-red-500"
                  onClick={() => handleDelete("stream", s)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* QUICK ACTIONS */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
            <Popover>
              <PopoverTrigger asChild>
                <button className="text-xs text-blue-500 hover:underline">
                  What are these?
                </button>
              </PopoverTrigger>
              <PopoverContent className="text-sm max-w-xs">
                <div className="font-bold mb-2 text-blue-600">Quick Actions</div>
                <div>
                  Use these shortcuts to quickly start a new project, upload media, or go live with AI streaming.
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-4">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition"
                onClick={() => handleAction(action.label, action.type)}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
        {/* DIALOG */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogTitle>
              {selectedAction}
            </DialogTitle>
            <DialogDescription>
              {formMode === "create" && quickActions.find(a => a.label === selectedAction)?.description}
            </DialogDescription>
            {renderForm()}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}