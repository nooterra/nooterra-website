import React from "react";

const TickerItem = ({ text }: { text: string }) => (
  <div className="inline-flex items-center gap-4 mx-8 font-mono text-xs uppercase tracking-wider text-[#00FF94]/70">
    <span className="text-settle opacity-50">{'>'}</span>
    <span>{text}</span>
  </div>
);

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

      {/* Infinite Ticker - System Log Style */}
      {/* Loop logic: 2 sets of items. Animation translates -50%. This creates a seamless loop. */}
      <div className="w-full bg-[#050505] border-y border-white/5 py-4 overflow-hidden flex relative font-mono">
         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-void to-transparent z-10" />
         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-void to-transparent z-10" />
         
         <div className="flex animate-[ticker_60s_linear_infinite] whitespace-nowrap">
            {transactions.map((t, i) => <TickerItem key={`a-${i}`} text={t} />)}
            {transactions.map((t, i) => <TickerItem key={`b-${i}`} text={t} />)}
         </div>
      </div>
    </section>
  );
};