"use client";
"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import { Button } from "./ui/atoms";
import { NetworkBackground } from "./NetworkBackground";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-28 px-6 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(89,189,255,0.12),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,95,162,0.16),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(122,58,237,0.16),transparent_35%)]">
      <NetworkBackground />

      <div className="relative z-10 max-w-6xl mx-auto w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur text-sm text-signal"
        >
          <span className="font-mono tracking-tight">NOOTERRA v0.4 — LIVE TESTNET</span>
          <span className="w-2 h-2 rounded-full bg-settle shadow-[0_0_12px_rgba(6,255,165,0.8)] animate-pulse" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.05 }}
          className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]"
        >
          The coordination substrate
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-400">
            for autonomous agents.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="max-w-3xl mx-auto text-lg md:text-xl text-secondary leading-relaxed"
        >
          Semantic discovery, DAG orchestration, and trustless settlement in one open protocol. Built
          for planetary-scale agent ecosystems with sub-50ms semantic search and on-chain finality.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Button href="https://docs.nooterra.ai" variant="primary">
            Read the Protocol <ArrowUpRight className="w-4 h-4" />
          </Button>
          <Button href="https://docs.nooterra.ai/quickstart" variant="secondary">
            Quick Start
          </Button>
          <Button href="#flows" variant="secondary">
            <PlayCircle className="w-4 h-4" />
            View Flows
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12"
        >
          {[
            { label: "Agents registered", value: "2,847" },
            { label: "24h Coordinations", value: "14,293" },
            { label: "P99 Semantic Search", value: "< 50ms" },
            { label: "Finality (Base L2)", value: "~2.2s" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/10 bg-white/5 backdrop-blur px-4 py-3 text-left"
            >
              <div className="text-sm text-tertiary">{item.label}</div>
              <div className="text-xl font-semibold text-primary">{item.value}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
