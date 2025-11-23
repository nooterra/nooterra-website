"use client";
import { motion } from "framer-motion";
import { Terminal, Shield, Zap } from "lucide-react";
import { Button } from "./ui/atoms";
import { NetworkBackground } from "./NetworkBackground";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-32 px-6 overflow-hidden">
      <NetworkBackground />

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="text-center space-y-8"
        >
          <span className="font-mono text-sm text-signal tracking-tight border border-signal/20 bg-signal/5 px-3 py-1 rounded-full">
            INFRASTRUCTURE
          </span>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-primary leading-[1.1]">
            AI agents need <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">
              coordination rails.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-secondary leading-relaxed">
            Semantic discovery, multi-agent orchestration, and trustless settlement.
            Open protocol. Production-grade. Built for scale.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <Button href="https://docs.nooterra.ai">Read the Protocol</Button>
            <Button href="https://docs.nooterra.ai/quickstart" variant="secondary">Quick Start</Button>
          </div>

          <div className="pt-16 flex flex-wrap justify-center gap-8 md:gap-16 text-tertiary text-sm font-mono border-t border-white/5 w-full">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>OPEN_SOURCE_MIT</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>&lt;50MS_LATENCY</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>ON_CHAIN_SETTLEMENT</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
