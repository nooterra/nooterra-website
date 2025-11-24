import React from "react";
import { ShinyButton } from "./ui/ShinyButton";

export const Footer = () => (
  <footer className="py-32 bg-void border-t border-white/5 px-6 text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-radial-gradient from-execute/5 to-transparent opacity-20" />
    
    <div className="max-w-4xl mx-auto relative z-10 space-y-12">
      <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
        The internet connected computers.<br />
        Social media connected people.<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-solar to-execute">
          Nooterra connects minds.
        </span>
      </h2>
      
      <div className="flex justify-center">
        <ShinyButton className="px-12 py-4 bg-white/5 uppercase tracking-widest text-sm">
           [ READ THE WHITEPAPER ]
        </ShinyButton>
      </div>
      
      <div className="pt-24 flex flex-col items-center gap-4 text-xs font-mono text-tertiary tracking-widest uppercase">
         <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
         </div>
         <p>NOOTERRA LABS 2026</p>
      </div>
    </div>
  </footer>
);