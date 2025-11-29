import React from "react";
import { useParams } from "react-router-dom";

export default function WorkflowDetail() {
  const { id } = useParams();
  const [data, setData] = React.useState<any | null>(null);
  const apiKey = typeof window !== "undefined" ? localStorage.getItem("apiKey") || "" : "";
  const coordUrl = import.meta.env.VITE_COORD_URL || "https://coord.nooterra.ai";

  React.useEffect(() => {
    if (!id) return;
    const run = async () => {
      try {
        const res = await fetch(`${coordUrl}/v1/workflows/${id}`, {
          headers: apiKey ? { "x-api-key": apiKey } : {},
        });
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error(err);
      }
    };
    run();
  }, [id, apiKey, coordUrl]);

  if (!data) {
    return <div className="text-secondary">Loading workflow…</div>;
  }

  const { workflow, nodes } = data;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Workflow {workflow.id}</h2>
          <p className="text-secondary text-sm">Intent: {workflow.intent || "—"}</p>
          <p className="text-secondary text-sm">
            Payer: {workflow.payer_did || "—"} · Budget:{" "}
            {workflow.max_cents != null ? `${workflow.max_cents}¢` : "—"} · Spent:{" "}
            {workflow.spent_cents != null ? `${workflow.spent_cents}¢` : "0¢"}
          </p>
        </div>
        <div className="text-sm text-secondary">Status: {workflow.status}</div>
      </div>

      <div className="bg-substrate border border-white/10 rounded-xl">
        <table className="w-full text-sm">
          <thead className="text-secondary text-xs uppercase tracking-[0.2em] border-b border-white/10">
            <tr>
              <th className="text-left px-4 py-3">Node</th>
              <th className="text-left px-4 py-3">Capability</th>
              <th className="text-left px-4 py-3">Agent</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Verify</th>
              <th className="text-left px-4 py-3">Attempts</th>
              <th className="text-left px-4 py-3">Started</th>
              <th className="text-left px-4 py-3">Finished</th>
            </tr>
          </thead>
          <tbody>
            {nodes?.map((n: any) => (
              <tr key={n.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-primary">{n.name}</td>
                <td className="px-4 py-3 text-secondary text-sm">{n.capability_id}</td>
                <td className="px-4 py-3 text-secondary text-sm">{n.agent_did || "—"}</td>
                <td className="px-4 py-3 text-secondary text-sm">{n.status}</td>
                <td className="px-4 py-3 text-secondary text-sm">
                  {n.requires_verification ? n.verification_status || "pending" : "n/a"}
                </td>
                <td className="px-4 py-3 text-secondary text-sm">{n.attempts}/{n.max_attempts}</td>
                <td className="px-4 py-3 text-secondary text-sm">{n.started_at || "—"}</td>
                <td className="px-4 py-3 text-secondary text-sm">{n.finished_at || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
