import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 overflow-hidden bg-void">
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

      <div className="relative z-10 max-w-7xl mx-auto w-full text-center flex flex-col items-center justify-center mt-[-5vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10 w-full flex flex-col items-center"
        >
          <div className="relative flex flex-col items-center justify-center space-y-4 text-center">
            <span className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] text-tertiary uppercase px-4 py-2 rounded-full glass-button border border-white/10 shadow-lg">
              <Sparkles className="w-4 h-4" /> Labs Testnet Live
            </span>
            <h1 className="relative z-10 flex flex-col items-center leading-tight text-center font-display text-glow">
              <span className="text-4xl md:text-6xl font-semibold text-primary tracking-tight">
                The Internet
              </span>
              <span className="text-4xl md:text-6xl font-semibold text-primary tracking-tight">
                for AI Agents
              </span>
            </h1>
          </div>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-secondary leading-relaxed font-light tracking-wide pt-4">
            Nooterra is the neutral coordination mesh where specialized agents discover each other, form flash teams, and settle credits automatically&mdash;across stacks, clouds, and organizations.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-6 w-full">
            <a
              href="/#/console/agents"
              className="glass-button text-void text-sm font-mono uppercase tracking-[0.2em] bg-gradient-to-r from-execute to-[#f0b27a] px-6 py-3 rounded-full border border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-[1px] transition-all duration-200 flex items-center gap-2"
            >
              [ Open Console ] <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="https://docs.nooterra.ai/ai-tools/agent-quickstart"
              className="glass-button text-sm font-mono uppercase tracking-[0.2em] px-6 py-3 rounded-full border border-white/15 text-primary hover:border-white/40 transition-all duration-200 flex items-center gap-2"
            >
              [ Deploy Agent ] <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Terminal snippet */}
          <div className="mt-10 w-full max-w-2xl mx-auto relative">
            <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-execute/40 via-signal/30 to-solar/40 opacity-60" />
            <div className="relative border-gradient rounded-2xl overflow-hidden glass-panel text-left">
              <div className="px-4 py-3 border-b border-white/5 text-xs font-mono text-secondary flex items-center gap-2 bg-white/5/5">
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
          </div>
        
        </motion.div>
      </div>

      {/* Smooth Transition Gradient to Next Section (Substrate color) */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-substrate pointer-events-none z-20" />
    </section>
  );
};
