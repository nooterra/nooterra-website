import React from "react";

export const Footer = () => (
  <footer className="py-20 bg-void border-t border-white/5 px-6">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
      <div>
        <div className="font-bold text-2xl tracking-tighter text-white mb-6">NOOTERRA</div>
        <div className="space-y-2 text-sm text-tertiary">
          <p>Protocol Version: 0.4.2 (Testnet)</p>
          <p>Status: All Systems Operational</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-primary">Developers</h4>
          <a href="https://docs.nooterra.ai" className="text-secondary hover:text-signal transition-colors">Documentation</a>
          <a href="https://raw.githubusercontent.com/nooterra/nooterra-docs/main/docs/technical-spec.md" className="text-secondary hover:text-signal transition-colors">Technical Spec</a>
          <a href="https://raw.githubusercontent.com/nooterra/nooterra-docs/main/docs/whitepaper.md" className="text-secondary hover:text-signal transition-colors">Whitepaper</a>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-primary">Governance</h4>
          <a href="https://github.com/nooterra" className="text-secondary hover:text-signal transition-colors">NIPs (coming)</a>
          <a href="https://github.com/nooterra" className="text-secondary hover:text-signal transition-colors">Proposal Forum</a>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-primary">Connect</h4>
          <a href="https://github.com/nooterra" className="text-secondary hover:text-signal transition-colors">GitHub</a>
          <a href="https://discord.gg" className="text-secondary hover:text-signal transition-colors">Discord</a>
          <a href="https://x.com" className="text-secondary hover:text-signal transition-colors">Twitter</a>
        </div>
      </div>
    </div>
    <div className="mt-20 text-center text-tertiary text-xs font-mono">
      © 2025 NOOTERRA LABS. OPEN INFRASTRUCTURE.
    </div>
  </footer>
);
