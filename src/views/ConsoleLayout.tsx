import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Navbar } from "../../components/ui/Navbar";

export default function ConsoleLayout() {
  const location = useLocation();
  const tabs = [
    { label: "Agents", to: "/console/agents" },
    { label: "Tasks", to: "/console/tasks" },
    { label: "Workflows", to: "/console/workflows" },
    { label: "Credits", to: "/console/credits" },
  ];
  return (
    <div className="min-h-screen bg-void text-primary">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-24">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">Console</h1>
          <ApiKeyModal />
        </div>
        <div className="flex gap-4 border-b border-white/10 mb-6">
          {tabs.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              className={`pb-2 text-sm ${
                location.pathname.startsWith(tab.to)
                  ? "text-primary border-b-2 border-execute"
                  : "text-secondary hover:text-primary"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
        <Outlet />
      </div>
    </div>
  );
}

function ApiKeyModal() {
  const [key, setKey] = React.useState(localStorage.getItem("apiKey") || "");
  const [open, setOpen] = React.useState(false);

  const save = () => {
    localStorage.setItem("apiKey", key.trim());
    setOpen(false);
  };

  return (
    <div>
      <button
        className="text-xs font-mono border border-white/20 px-3 py-2 rounded-md text-secondary hover:text-primary"
        onClick={() => setOpen(true)}
      >
        {key ? "API Key Set" : "Set API Key"}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={() => setOpen(false)}>
          <div className="bg-substrate border border-white/10 rounded-xl p-5 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-3">Set API Key</h3>
            <input
              className="w-full bg-void border border-white/10 rounded px-3 py-2 text-sm mb-3"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="x-api-key"
            />
            <div className="flex justify-end gap-3 text-sm">
              <button onClick={() => setOpen(false)} className="text-secondary hover:text-primary">Cancel</button>
              <button onClick={save} className="bg-execute text-void px-3 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
