"use client";
import { useState, useEffect, FormEvent } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import PlanCard from "@/components/plan-card";
import IntegrationStatus from "@/components/integration-status/page";



// --- Types ---
interface DashboardItem {
  id: number;
  name: string;
  updated: string;
}
type ItemType = "project" | "stream" | "media";
type FormMode = "create" | "edit" | "delete" | null;

// --- Mock API ---
const fetchData = async (type: ItemType): Promise<DashboardItem[]> => {
  if (type === "project")
    return [
      { id: 1, name: "AI Demo Reel", updated: "2 hours ago" },
      { id: 2, name: "Marketing Video", updated: "1 day ago" },
    ];
  if (type === "stream")
    return [
      { id: 1, name: "AI Live Stream", updated: "3 days ago" },
      { id: 2, name: "Product Launch", updated: "5 days ago" },
    ];
  if (type === "media")
    return [
      { id: 1, name: "demo.mp4", updated: "1 day ago" },
      { id: 2, name: "banner.png", updated: "2 days ago" },
    ];
  return [];
};
const createData = async (type: ItemType, item: DashboardItem) => ({
  ...item,
  id: Math.floor(Math.random() * 100000),
  updated: "just now",
});
const updateData = async (type: ItemType, id: number, item: DashboardItem) => ({
  ...item,
  id,
  updated: "just now",
});
const deleteData = async (type: ItemType, id: number) => true;

// --- Main Component ---
export default function DashboardPage() {
  // State
  const [projects, setProjects] = useState<DashboardItem[]>([]);
  const [streams, setStreams] = useState<DashboardItem[]>([]);
  const [media, setMedia] = useState<DashboardItem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [formType, setFormType] = useState<ItemType | null>(null);
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [formData, setFormData] = useState<Partial<DashboardItem>>({});
  const [editId, setEditId] = useState<number | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<FormMode>(null);
  const [dialogType, setDialogType] = useState<ItemType>("project");
  const [dialogItem, setDialogItem] = useState<DashboardItem | null>(null);

  // Load data on mount
  useEffect(() => {
    fetchData("project").then(setProjects);
    fetchData("stream").then(setStreams);
    fetchData("media").then(setMedia);
  }, []);

  // Quick actions
  const quickActions = [
    {
      label: "New Project",
      description: "Start a new AI video project.",
      type: "project",
    },
    {
      label: "Upload Media",
      description: "Upload images or videos to your library.",
      type: "media",
    },
    {
      label: "Go Live",
      description: "Start a live streaming session.",
      type: "stream",
    },
  ];

  // Handlers
  function handleAction(action: string, type: ItemType) {
    setSelectedAction(action);
    setFormType(type);
    setFormMode("create");
    setFormData({});
    setOpenDialog(true);
    setEditId(null);
  }

  function handleEdit(type: ItemType, item: DashboardItem) {
    setSelectedAction(`Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`);
    setFormType(type);
    setFormMode("edit");
    setFormData({ name: item.name });
    setOpenDialog(true);
    setEditId(item.id);
  }

  function handleDelete(type: ItemType, item: DashboardItem) {
    setSelectedAction(`Delete ${type.charAt(0).toUpperCase() + type.slice(1)}`);
    setFormType(type);
    setFormMode("delete");
    setFormData({ name: item.name });
    setOpenDialog(true);
    setEditId(item.id);
  }

  async function handleSubmit(e?: FormEvent) {
    if (e) e.preventDefault();
    if (!formType) return;

    if (formMode === "create") {
      const newItem = await createData(formType, {
        id: 0,
        name: formData.name || "",
        updated: "just now",
      });
      if (formType === "project") setProjects([...projects, newItem]);
      if (formType === "stream") setStreams([...streams, newItem]);
      if (formType === "media") setMedia([...media, newItem]);
    }
    if (formMode === "edit" && editId !== null) {
      const updatedItem = await updateData(formType, editId, {
        id: editId,
        name: formData.name || "",
        updated: "just now",
      });
      if (formType === "project")
        setProjects(projects.map((p) => (p.id === editId ? updatedItem : p)));
      if (formType === "stream")
        setStreams(streams.map((s) => (s.id === editId ? updatedItem : s)));
      if (formType === "media")
        setMedia(media.map((m) => (m.id === editId ? updatedItem : m)));
    }
    if (formMode === "delete" && editId !== null) {
      await deleteData(formType, editId);
      if (formType === "project")
        setProjects(projects.filter((p) => p.id !== editId));
      if (formType === "stream")
        setStreams(streams.filter((s) => s.id !== editId));
      if (formType === "media") setMedia(media.filter((m) => m.id !== editId));
    }
    setOpenDialog(false);
    setFormData({});
    setEditId(null);
    setFormMode(null);
    setFormType(null);
  }

  function renderForm() {
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
              type="button"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-red-500 text-white"
              onClick={() => handleSubmit()}
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      );
    }
    return (
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <input
            className="border rounded px-3 py-2 w-full"
            placeholder={`Name of ${formType}`}
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
  }

  // Example dialog trigger for creating a project
  const handleCreateProject = () => {
    setDialogMode("create");
    setDialogType("project");
    setDialogItem(null);
    setShowDialog(true);
  };

  // --- Render ---
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
        
      </div>

      <div className="max-w-4xl mx-auto mt-16 bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <button
            className="px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition"
            onClick={handleCreateProject}
          >
            New Project
          </button>
        </div>
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
              <li key={`p${p.id}`}>
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
              <li key={`m${m.id}`}>
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
              <li key={`s${s.id}`}>
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
                <div className="font-bold mb-2 text-blue-600">
                  Quick Actions
                </div>
                <div>
                  Use these shortcuts to quickly start a new project, upload
                  media, or go live with AI streaming.
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-4">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="px-4 py-2 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition"
                onClick={() =>
                  handleAction(action.label, action.type as ItemType)
                }
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
        {/* DIALOG */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogTitle>{selectedAction}</DialogTitle>
            <DialogDescription>
              {formMode === "create" &&
                quickActions.find((a) => a.label === selectedAction)
                  ?.description}
            </DialogDescription>
            {renderForm()}
          </DialogContent>
        </Dialog>

        {/* Copilot-style Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogTitle>
              {dialogMode === "create"
                ? `Create ${dialogType}`
                : dialogMode === "edit"
                  ? `Edit ${dialogType}`
                  : `Delete ${dialogType}`}
            </DialogTitle>
            <DialogDescription>
              {dialogMode === "create" && (
                <form className="space-y-4">
                  <input
                    className="w-full border rounded px-3 py-2"
                    placeholder={`Name your ${dialogType}`}
                  />
                  <button className="w-full py-2 rounded bg-blue-600 text-white font-semibold">
                    Create
                  </button>
                </form>
              )}
              {dialogMode === "edit" && dialogItem && (
                <form className="space-y-4">
                  <input
                    className="w-full border rounded px-3 py-2"
                    defaultValue={dialogItem.name}
                  />
                  <button className="w-full py-2 rounded bg-purple-600 text-white font-semibold">
                    Save Changes
                  </button>
                </form>
              )}
              {dialogMode === "delete" && dialogItem && (
                <div className="space-y-4">
                  <div className="text-red-600 font-semibold">
                    Are you sure you want to delete <b>{dialogItem.name}</b>?
                  </div>
                  <button className="w-full py-2 rounded bg-red-600 text-white font-semibold">
                    Delete
                  </button>
                </div>
              )}
              <button
                className="w-full py-2 rounded bg-gray-300 text-gray-700 font-semibold mt-4"
                onClick={() => setShowDialog(false)}
              >
                Cancel
              </button>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
