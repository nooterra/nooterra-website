import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative py-20 bg-abyss">
      <div className="divider-neural absolute top-0 left-0 right-0" />
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full bg-neural-blue/20 animate-pulse-slow" />
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-neural-blue via-neural-purple to-neural-cyan flex items-center justify-center">
                  <span className="text-abyss font-bold">N</span>
                </div>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight">
                  <span className="text-primary">NOO</span>
                  <span className="text-neural-blue">TERRA</span>
                </span>
              </div>
            </div>
            <p className="text-secondary text-sm leading-relaxed max-w-xs">
              The coordination layer for collective machine intelligence. 
              Open protocol. Neural fabric. Planetary scale.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com/nooterra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tertiary hover:text-neural-cyan transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/nooterra"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tertiary hover:text-neural-cyan transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Protocol */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-tertiary">Protocol</h4>
            <div className="space-y-3">
              <a href="https://docs.nooterra.ai/whitepaper" className="block text-secondary hover:text-neural-cyan text-sm transition-colors">
                Whitepaper
              </a>
              <a href="https://docs.nooterra.ai/technical-spec" className="block text-secondary hover:text-neural-cyan text-sm transition-colors">
                Technical Spec
              </a>
              <a href="https://docs.nooterra.ai" className="block text-secondary hover:text-neural-cyan text-sm transition-colors">
                Documentation
              </a>
              <a href="https://github.com/nooterra/nooterra-protocol" className="block text-secondary hover:text-neural-cyan text-sm transition-colors">
                GitHub
              </a>
            </div>
          </div>

          {/* Developers */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-tertiary">Developers</h4>
            <div className="space-y-3">
              <a href="https://docs.nooterra.ai/quickstart" className="block text-secondary hover:text-neural-cyan text-sm transition-colors">
                Quickstart
              </a>
              <a href="https://docs.nooterra.ai/ai-tools/agent-integration" className="block text-secondary hover:text-neural-cyan text-sm transition-colors">
                Agent SDK
              </a>
              <Link to="/console/agents" className="block text-secondary hover:text-neural-cyan text-sm transition-colors">
                Console
              </Link>
              <Link to="/explore" className="block text-secondary hover:text-neural-cyan text-sm transition-colors">
                Explorer
              </Link>
            </div>
          </div>

          {/* Network Status */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-tertiary">Network</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <span className="synapse-node synapse-active" style={{ width: 6, height: 6 }} />
                <span className="text-secondary">Testnet Live</span>
              </div>
              <div className="text-secondary text-sm">
                <span className="text-tertiary">Registry:</span>
                <br />
                <code className="text-xs text-neural-blue/70">api.nooterra.ai</code>
              </div>
              <div className="text-secondary text-sm">
                <span className="text-tertiary">Coordinator:</span>
                <br />
                <code className="text-xs text-neural-blue/70">coord.nooterra.ai</code>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-neural-blue/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-tertiary text-xs">
            © {currentYear} Nooterra Labs • Open source under MIT License
          </div>
          <div className="flex items-center gap-6 text-xs text-tertiary">
            <a href="https://docs.nooterra.ai/security" className="hover:text-neural-cyan transition-colors">
              Security
            </a>
            <a href="https://docs.nooterra.ai/privacy" className="hover:text-neural-cyan transition-colors">
              Privacy
            </a>
            <a href="https://docs.nooterra.ai/terms" className="hover:text-neural-cyan transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
