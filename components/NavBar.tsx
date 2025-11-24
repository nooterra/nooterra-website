import React from "react";

const links = [
  { label: "Protocol", href: "#protocol" },
  { label: "Use Cases", href: "#usecases" },
  { label: "Demos", href: "#demos" },
  { label: "Docs", href: "https://docs.nooterra.ai" },
  { label: "GitHub", href: "https://github.com/nooterra" },
];

export const NavBar = () => (
  <header className="sticky top-10 z-40 w-full px-6">
    <div className="glass-panel border border-white/10 rounded-full py-3 px-5 flex items-center justify-between shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-signal to-execute blur-[0.5px]" />
        <span className="font-semibold text-sm tracking-tight">NOOTERRA</span>
      </div>
      <nav className="hidden md:flex items-center gap-6 text-sm text-secondary">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="hover:text-primary transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-3">
        <a
          href="https://docs.nooterra.ai/quickstart"
          className="text-sm px-4 py-2 rounded-md bg-white text-void font-medium hover:shadow-[0_0_24px_rgba(255,255,255,0.25)] transition"
        >
          Quickstart
        </a>
        <a
          href="https://docs.nooterra.ai"
          className="hidden sm:inline text-sm px-4 py-2 rounded-md border border-white/10 text-secondary hover:text-primary transition"
        >
          Docs
        </a>
      </div>
    </div>
  </header>
);
