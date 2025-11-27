import React from "react";
import { Link } from "react-router-dom";

export default function Workflows() {
  const [items, setItems] = React.useState<any[]>([]);
  const apiKey = typeof window !== "undefined" ? localStorage.getItem("apiKey") || "" : "";
  const coordUrl = import.meta.env.VITE_COORD_URL || "https://coord.nooterra.ai";

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

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Workflows</h2>
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
