import React from "react";

export default function Tasks() {
  const [tasks, setTasks] = React.useState<any[]>([]);
  const apiKey = typeof window !== "undefined" ? localStorage.getItem("apiKey") || "" : "";
  const coordUrl = import.meta.env.VITE_COORD_URL || "https://coord.nooterra.ai";

  React.useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${coordUrl}/v1/tasks`, {
          headers: {
            ...(apiKey ? { "x-api-key": apiKey } : {}),
          },
        });
        const json = await res.json();
        setTasks(json.tasks || []);
      } catch (err) {
        console.error(err);
      }
    };
    run();
  }, [apiKey, coordUrl]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Tasks</h2>
      <div className="bg-substrate border border-white/10 rounded-xl">
        <table className="w-full text-sm">
          <thead className="text-secondary text-xs uppercase tracking-[0.2em] border-b border-white/10">
            <tr>
              <th className="text-left px-4 py-3">Task</th>
              <th className="text-left px-4 py-3">Description</th>
              <th className="text-left px-4 py-3">Winner</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-primary">{t.id}</td>
                <td className="px-4 py-3 text-secondary text-sm">{t.description}</td>
                <td className="px-4 py-3 text-secondary text-sm">{t.winner_did || "—"}</td>
                <td className="px-4 py-3 text-secondary text-sm">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
