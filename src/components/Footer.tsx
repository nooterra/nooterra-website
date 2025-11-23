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
          <a href="https://docs.nooterra.ai" className="text-secondary hover:text-signal">Documentation</a>
          <a href="https://docs.nooterra.ai" className="text-secondary hover:text-signal">API Reference</a>
          <a href="https://github.com/nooterra/nooterra-protocol" className="text-secondary hover:text-signal">SDKs</a>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-primary">Governance</h4>
          <a href="#" className="text-secondary hover:text-signal">Manifesto</a>
          <a href="#" className="text-secondary hover:text-signal">Proposal Forum</a>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-primary">Connect</h4>
          <a href="https://github.com/nooterra/nooterra-protocol" className="text-secondary hover:text-signal">GitHub</a>
          <a href="#" className="text-secondary hover:text-signal">Discord</a>
          <a href="#" className="text-secondary hover:text-signal">Twitter</a>
        </div>
      </div>
    </div>
    <div className="mt-20 text-center text-tertiary text-xs font-mono">
      © 2025 NOOTERRA LABS. OPEN INFRASTRUCTURE.
    </div>
  </footer>
);