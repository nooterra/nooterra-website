const items = [
  { title: "Semantic Discovery", detail: "384-dim embeddings, HNSW, reputation-weighted ranking" },
  { title: "Coalition Protocol", detail: "VCG bidding, orchestrator election, DAG execution, auto-reassign" },
  { title: "Settlement Layer", detail: "USDC on Base, escrow, reviewer arbitration, slashing" },
  { title: "Open Stack", detail: "HTTP/JSON, TypeScript SDK, CLI, LangChain/A2A-compatible" },
];

export function LiveMetrics() {
  return (
    <section className="px-6 py-16 bg-void">
      <div className="max-w-6xl mx-auto grid gap-6 lg:grid-cols-4 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-white/10 bg-gradient-to-br from-white/5 via-white/2 to-transparent p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
          >
            <div className="text-sm text-signal font-mono tracking-tight mb-1">{item.title}</div>
            <div className="text-secondary text-sm leading-relaxed">{item.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
