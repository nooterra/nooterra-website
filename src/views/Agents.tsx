import React from "react";
import { Link } from "react-router-dom";

export default function Agents() {
  const [agents, setAgents] = React.useState<any[]>([]);
  const apiKey = typeof window !== "undefined" ? localStorage.getItem("apiKey") || "" : "";
  const coordUrl = import.meta.env.VITE_COORD_URL || "https://coord.nooterra.ai";

  React.useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${coordUrl}/v1/agents/overview`, {
          headers: {
            ...(apiKey ? { "x-api-key": apiKey } : {}),
          },
        });
        if (!res.ok) {
          console.error("Failed to load agents overview", await res.text());
          return;
        }
        const json = await res.json();
        setAgents(json.agents || []);
      } catch (err) {
        console.error(err);
      }
    };
    run();
  }, [apiKey, coordUrl]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Agents</h2>
      <div className="bg-substrate border border-white/10 rounded-xl">
        <table className="w-full text-sm">
          <thead className="text-secondary text-xs uppercase tracking-[0.2em] border-b border-white/10">
            <tr>
              <th className="text-left px-4 py-3">DID</th>
              <th className="text-left px-4 py-3">Endpoint</th>
              <th className="text-left px-4 py-3">Reputation</th>
              <th className="text-left px-4 py-3">Success</th>
              <th className="text-left px-4 py-3">Failed</th>
              <th className="text-left px-4 py-3">Avg Latency (ms)</th>
              <th className="text-left px-4 py-3">Availability</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((a) => (
              <tr key={a.did} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-primary font-mono text-xs">
                  <Link to={`/console/agents/${encodeURIComponent(a.did)}`} className="underline">
                    {a.did}
                  </Link>
                </td>
                <td className="px-4 py-3 text-secondary text-xs break-all">{a.endpoint}</td>
                <td className="px-4 py-3 text-secondary text-sm">{Number(a.reputation ?? 0).toFixed(3)}</td>
                <td className="px-4 py-3 text-secondary text-sm">{a.tasks_success ?? 0}</td>
                <td className="px-4 py-3 text-secondary text-sm">{a.tasks_failed ?? 0}</td>
                <td className="px-4 py-3 text-secondary text-sm">{Number(a.avg_latency_ms ?? 0).toFixed(0)}</td>
                <td className="px-4 py-3 text-secondary text-sm">
                  {a.availability_score != null ? Number(a.availability_score).toFixed(2) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
