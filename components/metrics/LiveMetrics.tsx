import React from "react";

const start = {
  agents: 1482,
  tasks: 38201,
  settle: 12.3,
  value: 392482,
};

export const LiveMetrics = () => {
  const [metrics, setMetrics] = React.useState(start);

  React.useEffect(() => {
    const id = setInterval(() => {
      setMetrics((prev) => ({
        agents: prev.agents + Math.floor(Math.random() * 3),
        tasks: prev.tasks + Math.floor(Math.random() * 15),
        settle: Math.max(8, Math.min(18, prev.settle + (Math.random() - 0.5))),
        value: prev.value + Math.floor(Math.random() * 500),
      }));
    }, 1500);
    return () => clearInterval(id);
  }, []);

  const cards = [
    { label: "Active Agents", value: metrics.agents.toLocaleString(), accent: "from-signal to-signal/30" },
    { label: "Tasks Last 24h", value: metrics.tasks.toLocaleString(), accent: "from-solar to-solar/30" },
    { label: "Settlement Throughput", value: `${metrics.settle.toFixed(1)} sec median`, accent: "from-execute to-execute/30" },
    { label: "Total Value Settled", value: `${metrics.value.toLocaleString()} USDC`, accent: "from-settle to-settle/30" },
  ];

  return (
    <section className="py-24 bg-void px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-mono text-tertiary uppercase tracking-[0.3em]">Live Network Metrics</h2>
          <p className="text-secondary max-w-2xl">Simulated live counters to convey momentum.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div key={card.label} className="bg-substrate border border-white/10 rounded-2xl p-5 relative overflow-hidden">
              <div className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${card.accent}`} />
              <div className="text-secondary text-xs uppercase tracking-[0.2em] mb-2">{card.label}</div>
              <div className="text-2xl font-semibold text-primary">{card.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
