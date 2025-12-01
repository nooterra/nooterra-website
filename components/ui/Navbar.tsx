import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-void to-substrate border border-white/10 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-solar/20 to-execute/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10" />
          </div>
          <span className="font-bold text-lg tracking-tighter text-white">NOOTERRA</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-secondary">
          <Link to="/" className="hover:text-white transition-colors relative group py-2">
            HOME
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-solar to-execute group-hover:w-full transition-all duration-300" />
          </Link>
          <a href="https://docs.nooterra.ai/whitepaper" className="hover:text-white transition-colors relative group py-2">
            PROTOCOL
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-solar to-execute group-hover:w-full transition-all duration-300" />
          </a>
          <a href="https://explore.nooterra.ai" className="hover:text-white transition-colors relative group py-2">
            EXPLORER
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-solar to-execute group-hover:w-full transition-all duration-300" />
          </a>
          <Link to="/console/agents" className="hover:text-white transition-colors relative group py-2">
            CONSOLE
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-solar to-execute group-hover:w-full transition-all duration-300" />
          </Link>
          <a href="https://docs.nooterra.ai/technical-spec" className="hover:text-white transition-colors relative group py-2">
            RESEARCH
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-solar to-execute group-hover:w-full transition-all duration-300" />
          </a>
          <a href="https://docs.nooterra.ai" className="hover:text-white transition-colors relative group py-2">
            DOCS
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-solar to-execute group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#pricing" className="hover:text-white transition-colors relative group py-2">
            PRICING
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-solar to-execute group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#enterprise" className="hover:text-white transition-colors relative group py-2">
            ENTERPRISE
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-solar to-execute group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#customers" className="hover:text-white transition-colors relative group py-2">
            CUSTOMERS
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-solar to-execute group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#request-demo" className="hover:text-white transition-colors relative group py-2">
            REQUEST DEMO
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-solar to-execute group-hover:w-full transition-all duration-300" />
          </a>
          <a href="#signup" className="hover:text-white transition-colors relative group py-2">
            SIGN UP
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-solar to-execute group-hover:w-full transition-all duration-300" />
          </a>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/console/agents"
            className="text-white text-[10px] tracking-wider uppercase border-b border-white/30 hover:border-white transition-colors pb-1"
          >
            [ Console ]
          </Link>
          <a
            href="https://docs.nooterra.ai/quickstart"
            className="text-white text-[10px] tracking-wider uppercase border-b border-white/30 hover:border-white transition-colors pb-1"
          >
            [ Deploy Agent ]
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-void border-b border-white/10 p-6 space-y-4 animate-in slide-in-from-top-4">
           <Link to="/" className="block text-sm font-mono text-secondary hover:text-white">HOME</Link>
           <a href="https://docs.nooterra.ai/whitepaper" className="block text-sm font-mono text-secondary hover:text-white">PROTOCOL</a>
           <a href="https://explore.nooterra.ai" className="block text-sm font-mono text-secondary hover:text-white">EXPLORER</a>
           <Link to="/console/agents" className="block text-sm font-mono text-secondary hover:text-white">CONSOLE</Link>
           <a href="https://docs.nooterra.ai/technical-spec" className="block text-sm font-mono text-secondary hover:text-white">RESEARCH</a>
           <a href="https://docs.nooterra.ai" className="block text-sm font-mono text-secondary hover:text-white">DOCS</a>
           <a href="#pricing" className="block text-sm font-mono text-secondary hover:text-white">PRICING</a>
           <a href="#enterprise" className="block text-sm font-mono text-secondary hover:text-white">ENTERPRISE</a>
           <a href="#customers" className="block text-sm font-mono text-secondary hover:text-white">CUSTOMERS</a>
           <a href="#request-demo" className="block text-sm font-mono text-secondary hover:text-white">REQUEST DEMO</a>
           <a href="#signup" className="block text-sm font-mono text-secondary hover:text-white">SIGN UP</a>
           <div className="mt-4 space-y-3">
              <Link
                to="/console/agents"
                className="w-full inline-block text-center bg-transparent text-white hover:bg-white/10 uppercase text-xs py-3 transition-colors border-b border-white/30"
              >
                 [ Console ]
              </Link>
              <a
                href="https://docs.nooterra.ai/quickstart"
                className="w-full inline-block text-center bg-transparent text-white hover:bg-white/10 uppercase text-xs py-3 transition-colors border-b border-white/30"
              >
                 [ Deploy Agent ]
              </a>
           </div>
        </div>
      )}
    </nav>
  );
};
