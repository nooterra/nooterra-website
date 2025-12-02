import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isConsole = location.pathname.startsWith("/console");

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "glass-nav" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-neural-blue/20 animate-pulse-slow" />
            {/* Inner logo */}
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-neural-blue via-neural-purple to-neural-cyan flex items-center justify-center">
              <span className="text-abyss font-bold text-sm">N</span>
            </div>
          </div>
          <span className="text-lg font-semibold tracking-tight hidden sm:block">
            <span className="text-primary">NOO</span>
            <span className="text-neural-blue">TERRA</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/" active={location.pathname === "/"}>
            Home
          </NavLink>
          <NavLink href="https://docs.nooterra.ai/whitepaper">
            Protocol
          </NavLink>
          <NavLink to="/console/agents" active={isConsole}>
            Console
          </NavLink>
          <NavLink href="https://docs.nooterra.ai">
            Docs
          </NavLink>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/nooterra"
            target="_blank"
            rel="noopener noreferrer"
            className="text-tertiary hover:text-neural-cyan transition-colors p-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a href="https://docs.nooterra.ai/quickstart" className="btn-neural text-xs py-2 px-5">
            Connect
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary p-2 hover:text-neural-cyan transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-abyss/95 backdrop-blur-xl border-t border-neural-blue/10 px-6 py-6 space-y-4">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-secondary hover:text-neural-cyan py-2 text-sm font-medium transition-colors"
          >
            Home
          </Link>
          <a
            href="https://docs.nooterra.ai/whitepaper"
            className="block text-secondary hover:text-neural-cyan py-2 text-sm font-medium transition-colors"
          >
            Protocol
          </a>
          <Link
            to="/console/agents"
            onClick={() => setIsOpen(false)}
            className="block text-secondary hover:text-neural-cyan py-2 text-sm font-medium transition-colors"
          >
            Console
          </Link>
          <a
            href="https://docs.nooterra.ai"
            className="block text-secondary hover:text-neural-cyan py-2 text-sm font-medium transition-colors"
          >
            Documentation
          </a>
          <div className="pt-4 border-t border-neural-blue/10">
            <a href="https://docs.nooterra.ai/quickstart" className="btn-neural w-full text-center text-xs">
              Connect to Network
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({
  children,
  to,
  href,
  active,
}: {
  children: React.ReactNode;
  to?: string;
  href?: string;
  active?: boolean;
}) => {
  const baseClasses = `px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg relative ${
    active
      ? "text-neural-cyan"
      : "text-secondary hover:text-primary"
  }`;

  const content = (
    <>
      {children}
      {active && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neural-cyan shadow-glow-cyan" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={to || "/"} className={baseClasses}>
      {content}
    </Link>
  );
};
