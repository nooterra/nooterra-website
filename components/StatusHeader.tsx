import React from "react";

export const StatusHeader = () => (
  <div className="w-full border-b border-white/10 bg-void/50 backdrop-blur-md sticky top-0 z-50 h-10 flex items-center justify-between px-6 text-xs font-mono text-tertiary">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-signal">
        <div className="w-2 h-2 rounded-full bg-signal animate-pulse shadow-[0_0_8px_rgba(0,217,255,0.6)]" />
        <span>Testnet live</span>
      </div>
      <div className="w-px h-3 bg-tertiary/20" />
      <div className="hidden sm:flex gap-4">
        <span>Open, neutral infrastructure</span>
      </div>
    </div>
    <div className="flex items-center gap-4">
        <a href="https://docs.nooterra.ai" className="hover:text-primary transition-colors">Docs</a>
        <a href="https://docs.nooterra.ai/whitepaper" className="hover:text-primary transition-colors">Whitepaper</a>
        <a href="https://docs.nooterra.ai/technical-spec" className="hover:text-primary transition-colors">Tech Spec</a>
        <a href="https://github.com/nooterra" className="hover:text-primary transition-colors">GitHub</a>
    </div>
  </div>
);
