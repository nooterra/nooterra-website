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
          {["PROTOCOL", "EXPLORER", "RESEARCH", "DOCS"].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="hover:text-white transition-colors relative group py-2"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-solar to-execute group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <button className="bg-transparent text-white hover:bg-white/10 uppercase text-[10px] tracking-wider px-4 py-1.5 h-8 min-w-0 transition-colors">
             [ Deploy Agent ]
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-void border-b border-white/10 p-6 space-y-4 animate-in slide-in-from-top-4">
           {["PROTOCOL", "EXPLORER", "RESEARCH", "DOCS"].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="block text-sm font-mono text-secondary hover:text-white"
            >
              {item}
            </a>
          ))}
           <div className="mt-4">
              <button className="w-full bg-transparent text-white hover:bg-white/10 uppercase text-xs py-3 transition-colors">
                 [ Deploy Agent ]
              </button>
           </div>
        </div>
      )}
    </nav>
  );
};