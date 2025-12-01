import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Workflows() {
  const [items, setItems] = React.useState<any[]>([]);
  const [description, setDescription] = React.useState("");
  const [intent, setIntent] = React.useState("");
  const [maxCents, setMaxCents] = React.useState("");
  const [draft, setDraft] = React.useState<any | null>(null);
  const [suggestError, setSuggestError] = React.useState<string | null>(null);
  const [publishError, setPublishError] = React.useState<string | null>(null);
  const [suggestLoading, setSuggestLoading] = React.useState(false);
  const [publishLoading, setPublishLoading] = React.useState(false);
  const apiKey = typeof window !== "undefined" ? localStorage.getItem("apiKey") || "" : "";
  const coordUrl = import.meta.env.VITE_COORD_URL || "https://coord.nooterra.ai";
  const navigate = useNavigate();

  React.useEffect(() => {
    const run = async () => {
      try {
        // If no list endpoint yet, reuse /v1/tasks and filter? For now call /v1/workflows if present.
        const res = await fetch(`${coordUrl}/v1/workflows`, {
          headers: apiKey ? { "x-api-key": apiKey } : {},
        });
        if (res.ok) {
          const json = await res.json();
          setItems(json.workflows || []);
        }
      } catch (err) {
        console.error(err);
      }
    };
    run();
  }, [apiKey, coordUrl]);

  const handleSuggest = async () => {
    setSuggestError(null);
    setPublishError(null);
    setDraft(null);
    if (!apiKey) {
      setSuggestError("Missing API key. Set a Console API key in the Account view first.");
      return;
    }
    if (!description.trim()) {
      setSuggestError("Please enter a description.");
      return;
    }
    setSuggestLoading(true);
    try {
      const res = await fetch(`${coordUrl}/v1/workflows/suggest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-api-key": apiKey } : {}),
        },
        body: JSON.stringify({
          intent: intent.trim() || undefined,
          description: description.trim(),
          maxCents: maxCents ? Number(maxCents) : undefined,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSuggestError(json.error || "Suggest failed");
        return;
      }
      setDraft(json.draft || null);
    } catch (err: any) {
      console.error(err);
      setSuggestError("Suggest failed");
    } finally {
      setSuggestLoading(false);
    }
  };

  const handlePublishDraft = async () => {
    if (!draft) return;
    setPublishError(null);
    if (!apiKey) {
      setPublishError("Missing API key. Set a Console API key in the Account view first.");
      return;
    }
    setPublishLoading(true);
    try {
      const res = await fetch(`${coordUrl}/v1/workflows/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-api-key": apiKey } : {}),
        },
        body: JSON.stringify({
          intent: draft.intent || undefined,
          maxCents: draft.maxCents ?? undefined,
          nodes: draft.nodes || {},
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setPublishError(json.error || "Publish failed");
        return;
      }
      if (json.workflowId) {
        setDraft(null);
        navigate(`/console/workflows/${json.workflowId}`);
      }
    } catch (err: any) {
      console.error(err);
      setPublishError("Publish failed");
    } finally {
      setPublishLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Workflows</h2>

      <div className="bg-substrate border border-white/10 rounded-xl p-4 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-secondary mb-1">New Workflow (Suggest & Publish)</div>
            <div className="text-[11px] text-secondary">
              Describe a workflow in natural language and Nooterra will suggest a DAG using available capabilities.
            </div>
          </div>
          <button
            className="text-xs bg-execute text-void px-3 py-2 rounded disabled:opacity-40"
            onClick={handleSuggest}
            disabled={suggestLoading}
          >
            {suggestLoading ? "Suggesting..." : "Suggest DAG"}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
          <div className="md:col-span-2 space-y-2">
            <label className="block text-[11px] text-secondary">
              Description
              <textarea
                className="mt-1 w-full bg-void border border-white/10 rounded px-3 py-2 text-sm"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="E.g., Run the logistics flash team for a container and notify Slack when done."
              />
            </label>
          </div>
          <div className="space-y-2">
            <label className="block text-[11px] text-secondary">
              Intent (optional)
              <input
                className="mt-1 w-full bg-void border border-white/10 rounded px-3 py-2 text-sm"
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                placeholder="logistics-slack-demo"
              />
            </label>
            <label className="block text-[11px] text-secondary">
              Max Budget (cents, optional)
              <input
                className="mt-1 w-full bg-void border border-white/10 rounded px-3 py-2 text-sm"
                value={maxCents}
                onChange={(e) => setMaxCents(e.target.value)}
                placeholder="1000"
              />
            </label>
          </div>
        </div>
        {suggestError && <div className="text-[11px] text-red-400 mt-1">{suggestError}</div>}

        {draft && (
          <div className="mt-4 border-t border-white/10 pt-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-[0.2em] text-secondary">Suggested DAG</div>
              <button
                className="text-xs bg-execute text-void px-3 py-2 rounded disabled:opacity-40"
                onClick={handlePublishDraft}
                disabled={publishLoading}
              >
                {publishLoading ? "Publishing..." : "Publish Workflow"}
              </button>
            </div>
            <div className="bg-void border border-white/10 rounded">
              <table className="w-full text-xs">
                <thead className="text-secondary border-b border-white/10">
                  <tr>
                    <th className="text-left px-3 py-2">Node</th>
                    <th className="text-left px-3 py-2">Capability</th>
                    <th className="text-left px-3 py-2">Depends On</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(draft.nodes || {}).map(([name, node]: any) => (
                    <tr key={name} className="border-b border-white/5">
                      <td className="px-3 py-2 font-mono">{name}</td>
                      <td className="px-3 py-2 text-secondary">{node.capabilityId}</td>
                      <td className="px-3 py-2 text-secondary text-[11px]">
                        {(node.dependsOn || []).length ? (node.dependsOn || []).join(", ") : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {publishError && <div className="text-[11px] text-red-400">{publishError}</div>}
          </div>
        )}
      </div>

      <div className="bg-substrate border border-white/10 rounded-xl">
        <table className="w-full text-sm">
          <thead className="text-secondary text-xs uppercase tracking-[0.2em] border-b border-white/10">
            <tr>
              <th className="text-left px-4 py-3">Workflow</th>
              <th className="text-left px-4 py-3">Intent</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {items.map((wf) => (
              <tr key={wf.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-primary">
                  <Link to={`/console/workflows/${wf.id}`} className="underline">
                    {wf.id}
                  </Link>
                </td>
                <td className="px-4 py-3 text-secondary text-sm">{wf.intent || "—"}</td>
                <td className="px-4 py-3 text-secondary text-sm">{wf.status}</td>
                <td className="px-4 py-3 text-secondary text-sm">{wf.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
