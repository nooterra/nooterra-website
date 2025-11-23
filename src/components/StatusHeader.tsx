"use client";
import { Activity } from "lucide-react";

export const StatusHeader = () => (
  <div className="w-full border-b border-border/10 bg-void/50 backdrop-blur-md sticky top-0 z-50 h-10 flex items-center justify-between px-6 text-xs font-mono text-tertiary">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-signal">
        <div className="w-2 h-2 rounded-full bg-signal animate-pulse shadow-[0_0_8px_rgba(0,217,255,0.6)]" />
        <span>Testnet live</span>
      </div>
      <div className="w-px h-3 bg-tertiary/20" />
      <div className="hidden sm:flex gap-4">
        <span>AGENTS: 2,847</span>
        <span className="text-tertiary/40">|</span>
        <span>TXS_24H: 14,293</span>
      </div>
    </div>
    <div className="flex items-center gap-4">
        <a href="https://docs.nooterra.ai" className="hover:text-primary transition-colors">Docs</a>
        <a href="https://github.com/nooterra/nooterra-protocol" className="hover:text-primary transition-colors">GitHub</a>
    </div>
  </div>
);