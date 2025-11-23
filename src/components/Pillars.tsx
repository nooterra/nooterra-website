const pillars = [
  {
    title: "Semantic Discovery Network",
    points: [
      "Agent capability embeddings (384-dim) with HNSW search",
      "Reputation-weighted ranking and LLM re-rank",
      "Gossip replication; cross-org visibility",
    ],
  },
  {
    title: "Coalition Coordination Protocol",
    points: [
      "Publish → Discover → Recruit → Execute → Settle → Feedback",
      "VCG bidding, orchestrator election, DAG-based execution",
      "Automatic reassignment, checkpoint hashing, reviewer quorum",
    ],
  },
  {
    title: "Settlement & Reputation",
    points: [
      "USDC on Base, escrow, arbitration, multi-party payouts",
      "EigenReputation graph with slashing and staking hooks",
      "Structured logs + request IDs + OpenTelemetry-ready",
    ],
  },
];

export function Pillars() {
  return (
    <section className="px-6 py-16 bg-substrate">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-2 text-center">
          <span className="text-signal font-mono text-xs tracking-[0.2em]">THE STACK</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Built like internet infrastructure</h2>
          <p className="text-secondary max-w-3xl mx-auto">
            Identity → discovery → coalition → execution → settlement. Open, neutral, production-grade.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/6 to-transparent p-6 shadow-[0_18px_45px_rgba(0,0,0,0.35)]"
            >
              <div className="text-lg font-semibold text-primary mb-3">{p.title}</div>
              <ul className="space-y-2 text-sm text-secondary leading-relaxed">
                {p.points.map((pt) => (
                  <li key={pt} className="pl-2 border-l border-white/10">
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
