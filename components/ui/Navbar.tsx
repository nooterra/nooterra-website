import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { WalletConnectButton } from "../../src/components/WalletConnect";
import { useAuth } from "../../src/contexts/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/marketplace", label: "Marketplace", highlight: true },
  { to: "/network", label: "Network" },
  { href: "https://docs.nooterra.ai", label: "Docs" },
];

export const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { user, isAuthenticated } = useAuth();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getDashboardLink = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "developer":
        return "/dev";
      case "organization":
        return "/org";
      default:
        return "/app";
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.svg" alt="Nooterra" className="w-10 h-10" />
          <span className="font-semibold text-white text-lg hidden sm:block">Nooterra</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.href ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#909098] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.to!}
                className={`text-sm transition-colors ${
                  location.pathname === link.to
                    ? "text-white font-medium"
                    : (link as any).highlight
                    ? "text-[#4f7cff] hover:text-[#00d4ff] font-medium"
                    : "text-[#909098] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* CTA / Wallet */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                to={getDashboardLink()}
                className="text-sm text-[#909098] hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <WalletConnectButton />
            </div>
          ) : (
            <WalletConnectButton />
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0a0a12] border-t border-[#4f7cff]/10 px-6 py-6">
          <div className="space-y-4">
            {navLinks.map((link) =>
              link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[#909098] hover:text-white transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.to!}
                  className={`block transition-colors ${
                    location.pathname === link.to
                      ? "text-white"
                      : "text-[#909098] hover:text-white"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-[#4f7cff]/10 space-y-3">
            {isAuthenticated ? (
              <Link
                to={getDashboardLink()}
                className="btn-neural w-full justify-center"
                onClick={() => setOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <div onClick={() => setOpen(false)}>
                <WalletConnectButton />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
