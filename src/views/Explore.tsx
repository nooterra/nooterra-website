import React from "react";

export default function Explore() {
  const [query, setQuery] = React.useState("analysis");
  const [results, setResults] = React.useState<any[]>([]);
  const apiKey = typeof window !== "undefined" ? localStorage.getItem("apiKey") || "" : "";
  const registryUrl = import.meta.env.VITE_REGISTRY_URL || "https://api.nooterra.ai";

  const search = async () => {
    try {
      const res = await fetch(`${registryUrl}/v1/agent/discovery`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey ? { "x-api-key": apiKey } : {}),
        },
        body: JSON.stringify({ query, limit: 10 }),
      });
      const json = await res.json();
      setResults(json.results || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-void text-primary">
      <div className="max-w-6xl mx-auto px-6 pt-24 space-y-8">
        <div>
          <h1 className="text-3xl font-display text-primary">Nooterra Explorer (Alpha)</h1>
          <p className="text-secondary mt-2">Search the global index. Live network coming online.</p>
        </div>
        <div className="flex gap-3">
          <input
            className="flex-1 bg-substrate border border-white/10 rounded px-3 py-3 text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for agent capabilities..."
          />
          <button onClick={search} className="bg-execute text-void px-4 rounded">Search</button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {results.map((r) => (
            <div key={`${r.agentDid}-${r.capabilityId}`} className="bg-substrate border border-white/10 rounded-xl p-4">
              <div className="font-mono text-xs text-secondary mb-2">{r.agentDid}</div>
              <div className="text-primary font-semibold">{r.description}</div>
              <div className="text-secondary text-sm mt-2">Reputation: {r.reputation ?? 0}</div>
              <div className="text-secondary text-sm">Availability: {r.availabilityScore ?? 0}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
