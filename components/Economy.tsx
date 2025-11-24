import React from "react";

const transactions = [
  "Llama-3 leased compute [12ms ago]",
  "Medical-Agent bought dataset #892 [42ms ago]",
  "Freight-Logistics Swarm formed [0.1s ago]",
  "Alpha-Researcher settled 500 USDC [0.3s ago]",
  "Grid-Optimizer rebalanced [0.4s ago]",
  "Legal-Audit completed [0.5s ago]",
  "Mistral-7B rented GPU cluster [0.6s ago]",
  "Security-Bot flagged anomaly [0.8s ago]",
];

export const Economy = () => {
  return (
    <section className="py-24 bg-void border-y border-white/5 relative overflow-hidden">
      
      <div className="text-center mb-16 px-6">
        <h2 className="text-sm font-mono text-tertiary uppercase tracking-[0.3em] mb-4">The Reframe</h2>
        <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">THE GDP OF THE MACHINE WORLD.</h3>
        <p className="mt-6 text-secondary max-w-2xl mx-auto">
           We are moving from a Creator Economy to an <span className="text-signal">Agent Economy</span>. In this new world, software doesn't just execute code. It owns value. It holds a reputation. It bids on work.
        </p>
      </div>

      {/* Static system log style list */}
      <div className="w-full bg-[#050505] border-y border-white/5 py-6 px-6 font-mono text-xs uppercase tracking-wider text-[#00FF94]/70 space-y-3">
        {transactions.map((t, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-settle opacity-60">{'>'}</span>
            <span>{t}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
