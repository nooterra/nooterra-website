import React from "react";
export const Footer = () => (
  <footer className="py-16 bg-void border-t border-white/5 px-6">
    <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
      <div className="space-y-3">
        <div className="font-bold text-2xl tracking-tighter text-primary">NOOTERRA</div>
        <p className="text-secondary text-sm leading-relaxed">
          The coordination layer for planetary intelligence.
        </p>
      </div>
      <div className="space-y-3">
        <h4 className="font-semibold text-primary text-sm uppercase tracking-[0.2em]">Product</h4>
        <a href="https://docs.nooterra.ai" className="block text-secondary hover:text-primary text-sm">Docs</a>
        <a href="https://docs.nooterra.ai/whitepaper" className="block text-secondary hover:text-primary text-sm">Protocol (Whitepaper)</a>
        <a href="https://docs.nooterra.ai/technical-spec" className="block text-secondary hover:text-primary text-sm">Spec v1.0</a>
        <a href="/status" className="block text-secondary hover:text-primary text-sm">Status</a>
      </div>
      <div className="space-y-3">
        <h4 className="font-semibold text-primary text-sm uppercase tracking-[0.2em]">Company</h4>
        <a href="/careers" className="block text-secondary hover:text-primary text-sm">Careers</a>
        <a href="/security" className="block text-secondary hover:text-primary text-sm">Security</a>
        <a href="https://github.com/nooterra" className="block text-secondary hover:text-primary text-sm">GitHub</a>
      </div>
      <div className="space-y-3">
        <h4 className="font-semibold text-primary text-sm uppercase tracking-[0.2em]">Legal</h4>
        <a href="/legal/tos" className="block text-secondary hover:text-primary text-sm">Terms</a>
        <a href="/legal/privacy" className="block text-secondary hover:text-primary text-sm">Privacy</a>
      </div>
    </div>
    <div className="mt-10 text-center text-tertiary text-xs font-mono">
      © 2026 Nooterra Labs. All rights reserved.
    </div>
  </footer>
);
