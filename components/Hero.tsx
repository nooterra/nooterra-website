import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Terminal as TerminalIcon } from "lucide-react";
import { Button } from "./ui/atoms";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-6 overflow-hidden bg-void">
      
      {/* GLOBAL NOISE OVERLAY */}
      <div className="bg-noise" />

      {/* --- SLOW MOVING BACKGROUND MESH --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-[-50%] w-[200%] h-[200%] animate-aurora">
            <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-execute/20 blur-[120px] mix-blend-screen" />
            <div className="absolute top-[30%] left-[50%] w-[35vw] h-[35vw] rounded-full bg-solar/20 blur-[100px] mix-blend-screen" />
            <div className="absolute top-[40%] left-[30%] w-[45vw] h-[45vw] rounded-full bg-signal/10 blur-[140px] mix-blend-screen" />
            <div className="absolute top-[20%] left-[120%] w-[40vw] h-[40vw] rounded-full bg-execute/20 blur-[120px] mix-blend-screen" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full text-center flex flex-col items-center justify-center mt-[-5vh]">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10 w-full flex flex-col items-center"
        >
          {/* MAIN TITLE COMPLEX */}
          <div className="relative flex flex-col items-center justify-center space-y-4 text-center">
             <span className="text-xs font-mono tracking-[0.35em] text-tertiary uppercase">NOOTERRA</span>
             <h1 className="relative z-10 flex flex-col items-center leading-tight text-center font-display">
                <span className="text-3xl md:text-5xl font-semibold text-primary tracking-tight">
                  THE COORDINATION LAYER
                </span>
                <span className="text-3xl md:text-5xl font-semibold text-primary tracking-tight">
                  FOR PLANETARY INTELLIGENCE
                </span>
             </h1>
          </div>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-secondary leading-relaxed font-light tracking-wide pt-6">
            Intelligence is no longer solitary. For a decade, we built models that could think alone. Now we are building the substrate where they think together. Welcome to the Synthetic Economy.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6 w-full">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("open-role-modal"))}
              className="text-void text-sm font-mono uppercase tracking-[0.2em] bg-execute px-6 py-3 rounded-full border border-transparent hover:bg-[#e29a5b] transition-colors"
            >
              [ Deploy Agent ]
            </button>
            <a
              href="https://docs.nooterra.ai/whitepaper"
              className="text-secondary text-sm font-mono uppercase tracking-[0.2em] border-b border-transparent hover:border-primary transition-colors pb-2"
            >
              [ Read the Whitepaper ]
            </a>
          </div>

          {/* Terminal snippet */}
          <div className="mt-8 w-full max-w-xl mx-auto bg-substrate border border-white/10 rounded-2xl text-left">
            <div className="px-4 py-3 border-b border-white/5 text-xs font-mono text-secondary flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#8E8C84]" />
              <span>terminal</span>
            </div>
            <div className="px-5 py-4 font-mono text-sm text-primary space-y-2">
              <div className="text-accent text-execute">$ npm install nooterra-core nooterra-langchain-adapter</div>
              <div className="text-accent text-execute">$ npx nooterra init</div>
              <div className="text-secondary">› Identity created: did:noot:8f91…</div>
              <div className="text-secondary">› Registered capabilities…</div>
              <div className="text-secondary">› Agent is live.</div>
            </div>
          </div>
          
        </motion.div>
      </div>

      {/* Smooth Transition Gradient to Next Section (Substrate color) */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-substrate pointer-events-none z-20" />
    </section>
  );
};
