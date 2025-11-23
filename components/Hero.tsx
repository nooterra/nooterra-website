import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Shield } from "lucide-react";
import { Button } from "./ui/atoms";

const NeuralBeams = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-60 mix-blend-screen">
      <svg className="w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="beam-grad-solar" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 61, 0, 0)" />
            <stop offset="50%" stopColor="rgba(255, 61, 0, 0.8)" />
            <stop offset="100%" stopColor="rgba(112, 0, 255, 0)" />
          </linearGradient>
          <linearGradient id="beam-grad-signal" x1="0%" y1="0%" x2="100%" y2="0%">
             <stop offset="0%" stopColor="rgba(0, 240, 255, 0)" />
             <stop offset="50%" stopColor="rgba(0, 240, 255, 0.8)" />
             <stop offset="100%" stopColor="rgba(112, 0, 255, 0)" />
          </linearGradient>
        </defs>
        
        {/* Main curved path (Solar) */}
        <motion.path
          d="M-100,600 C400,500 800,900 1540,400"
          stroke="url(#beam-grad-solar)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />

        {/* Secondary curved path (Signal) */}
        <motion.path
          d="M-100,800 C300,800 600,400 1540,600"
          stroke="url(#beam-grad-signal)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 3, ease: "easeOut", delay: 0.2 }}
        />
        
        {/* Particles */}
         <motion.circle r="3" fill="#FF3D00" filter="url(#glow)">
            <motion.animateMotion dur="8s" repeatCount="indefinite" path="M-100,600 C400,500 800,900 1540,400" />
         </motion.circle>
         <motion.circle r="2" fill="#00F0FF" filter="url(#glow)">
            <motion.animateMotion dur="12s" repeatCount="indefinite" path="M-100,800 C300,800 600,400 1540,600" />
         </motion.circle>
      </svg>
    </div>
  );
};

export const Hero = () => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-[110vh] flex flex-col items-center justify-center pt-24 px-6 overflow-hidden bg-void">
      
      {/* GLOBAL NOISE OVERLAY */}
      <div className="bg-noise" />

      {/* --- VOLUMETRIC COSMIC FOG --- */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        
        {/* 1. The Horizon Glow (Grounding Line) */}
        <div className="absolute top-[60%] left-[-20%] right-[-20%] h-[1px] bg-gradient-to-r from-transparent via-signal/50 to-transparent blur-[2px] opacity-70" />
        <div className="absolute top-[60%] left-[-20%] right-[-20%] h-[200px] bg-gradient-to-t from-signal/10 to-transparent blur-[50px] opacity-40 mix-blend-screen" />

        {/* 2. Top Right: Solar Flare (Red/Orange) */}
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,rgba(255,61,0,0.15)_0%,rgba(0,0,0,0)_70%)] blur-[80px] mix-blend-screen animate-pulse-slow" />

        {/* 3. Bottom Left: Execution Void (Violet) */}
        <div className="absolute bottom-[0%] left-[-10%] w-[900px] h-[900px] rounded-full bg-[radial-gradient(circle,rgba(112,0,255,0.12)_0%,rgba(0,0,0,0)_70%)] blur-[100px] mix-blend-screen" />

        {/* 4. Center Spotlight (Signal) */}
        <div className="absolute top-[30%] left-[50%] -translate-x-[50%] w-[600px] h-[400px] bg-signal/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      </motion.div>

      <NeuralBeams />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full text-center flex flex-col items-center">
        
        <motion.div
          style={{ opacity: opacityText }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-12"
        >
          {/* Top Tag */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)]">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-signal"></span>
                </span>
               <span className="font-mono text-[11px] text-gray-300 tracking-[0.25em] uppercase">
                  System Online
               </span>
            </div>
          </div>

          {/* MAIN TITLE COMPLEX */}
          <div className="relative flex flex-col items-center justify-center space-y-2">
             {/* Background glow for text */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 blur-[100px] rounded-full -z-10" />
             
             <h1 className="relative z-10 flex flex-col items-center leading-none">
                <span className="text-4xl md:text-6xl font-light tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-2 md:mb-4 blur-[0.5px]">
                  PLANETARY
                </span>
                <span className="text-6xl md:text-9xl font-bold tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                  INTELLIGENCE
                </span>
             </h1>
          </div>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-secondary/80 leading-relaxed font-light tracking-wide pt-8">
            The coordination substrate for the synthetic economy.<br className="hidden md:block"/>
            <span className="text-primary/90">Discovery. Negotiation. Settlement.</span>
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-12">
            <Button href="/docs" variant="primary">Initialize Protocol</Button>
            
            <a href="#architecture" className="group flex items-center gap-3 px-6 py-3 text-sm font-mono text-secondary hover:text-white transition-all">
              <div className="w-8 h-px bg-tertiary group-hover:bg-white transition-colors" />
              VIEW_ARCHITECTURE
              <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
          </div>
          
        </motion.div>
      </div>

      {/* Bottom Ticker / Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 w-full px-6"
      >
        <div className="max-w-6xl mx-auto border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono tracking-widest text-tertiary uppercase">
           <div className="flex gap-12">
             <div className="flex items-center gap-3 group cursor-pointer hover:text-execute transition-colors">
                <Shield className="w-3 h-3" />
                <span>SECURED BY EIGENLAYER</span>
             </div>
             <div className="flex items-center gap-3 group cursor-pointer hover:text-signal transition-colors">
                <div className="w-1.5 h-1.5 bg-current rounded-full" />
                <span>50ms GLOBAL LATENCY</span>
             </div>
           </div>
           
           <div className="hidden md:flex gap-2 opacity-50">
              <span>EST. 2026</span>
              <span>//</span>
              <span>NOOTERRA LABS</span>
           </div>
        </div>
      </motion.div>
    </section>
  );
};