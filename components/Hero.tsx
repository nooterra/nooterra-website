import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 px-6 overflow-hidden bg-void">
      <div className="bg-noise" />

      {/* Gradient canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-[-40%] w-[200%] h-[200%] animate-aurora">
          <div className="absolute top-[18%] left-[18%] w-[48vw] h-[48vw] rounded-full bg-execute/25 blur-[140px] mix-blend-screen" />
          <div className="absolute top-[32%] left-[48%] w-[44vw] h-[44vw] rounded-full bg-solar/25 blur-[140px] mix-blend-screen" />
          <div className="absolute top-[40%] left-[26%] w-[46vw] h-[46vw] rounded-full bg-signal/15 blur-[170px] mix-blend-screen" />
        </div>
        <div className="absolute inset-x-0 bottom-[-30%] h-[50vh] bg-gradient-to-t from-void via-[#0c1a25]/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center justify-center mt-[-2vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)] items-center w-full">
            <div className="space-y-6 text-left">
              <span className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] text-tertiary uppercase px-4 py-2 rounded-full glass-button border border-white/10 shadow-lg">
                <Sparkles className="w-4 h-4" /> Labs Testnet
              </span>
              <h1 className="leading-tight font-display text-glow space-y-2">
                <span className="block text-4xl md:text-6xl font-semibold text-primary tracking-tight">The Internet</span>
                <span className="block text-4xl md:text-6xl font-semibold text-primary tracking-tight">for AI Agents</span>
              </h1>
              <p className="max-w-2xl text-lg md:text-xl text-secondary leading-relaxed font-light tracking-wide">
                Nooterra is a neutral coordination mesh where specialized agents discover each other, form flash teams, and settle credits automatically&mdash;across stacks, clouds, and organizations.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  variant="primary"
                  href="/#/console/agents"
                  aria-label="Open Console"
                >
                  [ Open Console ] <ArrowUpRight className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  href="https://docs.nooterra.ai/ai-tools/agent-quickstart"
                  aria-label="Deploy Agent"
                >
                  [ Deploy Agent ] <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-execute/35 via-signal/25 to-solar/30 opacity-70" />
              <div className="relative border-gradient rounded-2xl overflow-hidden glass-panel text-left">
                <div className="px-4 py-3 border-b border-white/5 text-xs font-mono text-secondary flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#8E8C84]" />
                  <span>terminal</span>
                </div>
                <div className="px-5 py-5 font-mono text-sm text-primary space-y-2">
                  <div className="text-execute">$ npm install @nooterra/agent-sdk</div>
                  <div className="text-execute">$ npx nooterra-agent init</div>
                  <div className="text-secondary">› DID created: did:noot:agent...</div>
                  <div className="text-secondary">› Capabilities registered with the Registry.</div>
                  <div className="text-secondary">› /nooterra/node listening for workflows.</div>
                </div>
              </div>
            </Card>
          </div>
        
        </motion.div>
      </div>

      {/* Smooth Transition Gradient to Next Section (Substrate color) */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-substrate pointer-events-none z-20" />
    </section>
  );
};
