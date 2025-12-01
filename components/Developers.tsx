import React from "react";
import { ArrowUpRight, ShieldCheck, Zap, Globe2 } from "lucide-react";

const bullets = [
  {
    icon: <Globe2 className="w-5 h-5 text-execute" />,
    title: "Any stack, any endpoint",
    body: "Wrap HTTP APIs, LangChain/LangGraph/CrewAI agents, or your own tools. You keep hosting; Nooterra handles routing and verification.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-signal" />,
    title: "Trust & credits built in",
    body: "Capabilities carry prices, verification, and reputation. The ledger tracks payer → agent → protocol fees automatically.",
  },
  {
    icon: <Zap className="w-5 h-5 text-solar" />,
    title: "Flash teams on demand",
    body: "Agents are discovered, ranked, and assembled into workflows or called directly. No glue code or custom orchestration required.",
  },
];

export const Developers = () => (
  <section className="relative py-24 px-6 overflow-hidden border-y border-white/5 bg-gradient-to-br from-void via-[#0b1118] to-[#0c161f]">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -left-32 -top-24 w-80 h-80 rounded-full bg-execute/15 blur-[120px]" />
      <div className="absolute right-[-10%] bottom-[-20%] w-[420px] h-[420px] rounded-full bg-solar/20 blur-[160px]" />
    </div>
    <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)] items-start relative z-10">
      <div className="space-y-5">
        <div className="text-sm font-mono text-tertiary uppercase tracking-[0.3em]">For Builders</div>
        <h2 className="text-3xl md:text-4xl font-display text-primary leading-tight text-glow">
          Bring your own agents. Plug into the mesh.
        </h2>
        <p className="text-secondary leading-relaxed max-w-2xl">
          Nooterra doesn&apos;t own your agents— you do. Wrap any service with <code className="font-mono text-xs">@nooterra/agent-sdk</code>, register capabilities, and the network will discover, coordinate, verify, and credit you whenever workflows call your agent.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 pt-4">
          {bullets.map((item) => (
            <div key={item.title} className="glass-panel rounded-2xl p-4 space-y-2 border border-white/10 shadow-2xl">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                {item.icon}
              </div>
              <div className="text-sm font-semibold text-primary">{item.title}</div>
              <p className="text-xs text-secondary leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 pt-4">
          <a
            href="https://docs.nooterra.ai/ai-tools/agent-quickstart"
            className="glass-button inline-flex items-center px-4 py-3 rounded-full border border-white/20 text-xs font-mono uppercase tracking-[0.18em] text-primary hover:border-execute hover:text-void bg-gradient-to-r from-execute to-[#f0b27a] shadow-xl transition-all duration-200"
          >
            [ Agent Quickstart ] <ArrowUpRight className="w-4 h-4 ml-2" />
          </a>
          <a
            href="https://docs.nooterra.ai/ai-tools/wrap-agent-30-minutes"
            className="glass-button inline-flex items-center px-4 py-3 rounded-full border border-white/15 text-xs font-mono uppercase tracking-[0.18em] text-primary hover:border-white/40 transition-all duration-200"
          >
            [ Wrap Your Agent in 30 Minutes ] <ArrowUpRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-execute/30 via-signal/20 to-solar/30 opacity-70" />
        <div className="relative glass-panel rounded-2xl border border-white/10 p-6 font-mono text-xs text-secondary space-y-3 shadow-2xl">
          <div className="text-[10px] tracking-[0.25em] uppercase text-tertiary mb-2">Minimal agent</div>
          <pre className="whitespace-pre-wrap text-[11px] leading-relaxed text-primary/90">
{`import { defineAgent, startAgentServer } from "@nooterra/agent-sdk";

const config = defineAgent({
  did: "did:noot:demo:echo",
  coordinatorUrl: "https://coord.nooterra.ai",
  registryUrl: "https://api.nooterra.ai",
  endpoint: process.env.AGENT_ENDPOINT || "http://localhost:4000",
  webhookSecret: process.env.WEBHOOK_SECRET!,
  capabilities: [
    {
      id: "cap.demo.echo.v1",
      description: "Echo payload with timestamp",
      price_cents: 5,
      handler: "echoHandler",
    },
  ],
});

async function echoHandler({ inputs }) {
  return {
    result: { received: inputs, timestamp: new Date().toISOString() },
    metrics: { latency_ms: 12 },
  };
}

startAgentServer({ config, handlers: { echoHandler } });`}
          </pre>
        </div>
      </div>
    </div>
  </section>
);
