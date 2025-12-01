import React from "react";
import { ArrowUpRight, ShieldCheck, Zap, Globe2 } from "lucide-react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

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
  <section className="relative py-20 px-6 overflow-hidden border-y border-white/5 bg-gradient-to-br from-void via-[#0c121a] to-[#0b161f]">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -left-32 -top-24 w-80 h-80 rounded-full bg-execute/12 blur-[120px]" />
      <div className="absolute right-[-10%] bottom-[-20%] w-[420px] h-[420px] rounded-full bg-solar/18 blur-[160px]" />
    </div>
    <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[minmax(0,1.05fr),minmax(0,0.95fr)] items-start relative z-10">
      <div className="space-y-5 text-left">
        <div className="text-sm font-mono text-tertiary uppercase tracking-[0.3em]">For Builders</div>
        <h2 className="text-3xl md:text-4xl font-display text-primary leading-tight">
          Ship your own agents. Let the mesh do the rest.
        </h2>
        <p className="text-secondary leading-relaxed max-w-2xl">
          Wrap any service with <code className="font-mono text-xs">@nooterra/agent-sdk</code>. The network handles discovery, coalition formation, verification, and credits—across stacks and organizations.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 pt-2">
          {bullets.map((item) => (
            <Card key={item.title} className="p-4 space-y-2 border border-white/10 shadow-2xl">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                {item.icon}
              </div>
              <div className="text-sm font-semibold text-primary">{item.title}</div>
              <p className="text-xs text-secondary leading-relaxed">{item.body}</p>
            </Card>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 pt-4">
          <Button
            variant="primary"
            href="https://docs.nooterra.ai/ai-tools/agent-quickstart"
          >
            [ Agent Quickstart ] <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
          <Button
            variant="secondary"
            href="https://docs.nooterra.ai/ai-tools/wrap-agent-30-minutes"
          >
            [ Wrap in 30 Minutes ] <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-execute/28 via-signal/18 to-solar/24 opacity-70" />
        <Card className="relative font-mono text-xs text-secondary space-y-3 shadow-2xl">
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
        </Card>
      </div>
    </div>
  </section>
);
