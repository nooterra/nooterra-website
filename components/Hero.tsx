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
          <div className="relative flex flex-col items-center justify-center space-y-4">
             <h1 className="relative z-10 flex flex-col items-center leading-none">
                <span className="text-4xl md:text-6xl font-light tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-4 blur-[0.5px]">
                  INTELLIGENCE
                </span>
                <span className="text-4xl md:text-6xl font-light tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-4 blur-[0.5px]">
                  IS NO LONGER
                </span>
                <span className="text-6xl md:text-9xl font-bold tracking-tighter text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.3)]">
                  SOLITARY.
                </span>
             </h1>
          </div>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-secondary/80 leading-relaxed font-light tracking-wide pt-8">
            For ten years, we built models that could think in isolation.<br className="hidden md:block"/>
            Now, we are building the substrate where they think together.<br className="hidden md:block"/>
            <span className="text-white font-medium block mt-4">Welcome to the Synthetic Economy.</span>
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-4 w-full">
            <button className="bg-transparent text-white hover:bg-white/10 uppercase tracking-widest text-xs font-bold py-4 px-8 min-w-[200px] transition-colors">
              [ Deploy Agent ]
            </button>
            
            <a href="#" className="text-xs font-mono uppercase tracking-widest text-secondary hover:text-white transition-colors border-b border-transparent hover:border-white pb-1">
              [ Read the Whitepaper ]
            </a>
          </div>
          
        </motion.div>
      </div>

      {/* Smooth Transition Gradient to Next Section (Substrate color) */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-substrate pointer-events-none z-20" />
    </section>
  );
};