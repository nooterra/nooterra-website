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
  const [log, setLog] = React.useState(transactions);

  React.useEffect(() => {
    // fallback loop to keep motion if SSE unavailable
    const id = setInterval(() => {
      setLog((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 900);

    // Live event stream from coordinator
    if (typeof window !== "undefined") {
      const coordUrl = (import.meta as any).env?.VITE_COORD_URL || "https://coord.nooterra.ai";
      try {
        const es = new EventSource(`${coordUrl}/v1/events/stream`);
        const pushLine = (line: string) => {
          setLog((prev) => [line, ...prev].slice(0, transactions.length));
        };
        const handlers: Record<string, (ev: MessageEvent) => void> = {
          TASK_PUBLISHED: (ev) => {
            try {
              const data = JSON.parse(ev.data);
              pushLine(`Task ${data.taskId ?? ""} published`);
            } catch {
              pushLine("Task published");
            }
          },
          AGENT_BID: (ev) => {
            try {
              const data = JSON.parse(ev.data);
              pushLine(`Bid ${data.agentDid ?? ""} on ${data.taskId ?? ""}`);
            } catch {
              pushLine("Bid received");
            }
          },
          TASK_SETTLED: (ev) => {
            try {
              const data = JSON.parse(ev.data);
              pushLine(`Settled ${data.taskId ?? ""}`);
            } catch {
              pushLine("Settlement finalized");
            }
          },
          AGENT_HEARTBEAT: (ev) => {
            try {
              const data = JSON.parse(ev.data);
              pushLine(`Agent ${data.agentDid ?? ""} live`);
            } catch {
              pushLine("Agent heartbeat");
            }
          },
          TASK_RESULT_INVALID: (ev) => {
            try {
              const data = JSON.parse(ev.data);
              pushLine(`Result flagged ${data.taskId ?? ""}`);
            } catch {
              pushLine("Result flagged");
            }
          },
        };
        Object.keys(handlers).forEach((evt) => es.addEventListener(evt, handlers[evt]));
        es.onerror = () => {
          es.close();
        };
        return () => {
          es.close();
          clearInterval(id);
        };
      } catch {
        // ignore, fallback to rotation
      }
    }
    return () => clearInterval(id);
  }, []);

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
      <div className="w-full bg-gradient-to-b from-[#02050a] to-[#0a0f1a] border-y border-white/5 py-6 px-6 font-mono text-xs uppercase tracking-wider text-signal space-y-3 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{backgroundImage: "linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.2) 25%, rgba(255,255,255,0.2) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.2) 75%, rgba(255,255,255,0.2) 76%, transparent 77%)", backgroundSize: "100% 4px"}} />
        {log.map((t, i) => (
          <div key={i} className="flex items-center gap-3 transition-colors hover:text-primary">
            <span className="text-signal opacity-70">{'>'}</span>
            <span>{t}</span>
          </div>
        ))}
        <div className="mt-2 text-primary/70 animate-[blink_0.7s_steps(2,start)_infinite]">|</div>
      </div>
    </section>
  );
};
