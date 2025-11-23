import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Badge = ({ children, color = "signal" }: { children: React.ReactNode; color?: "signal" | "execute" | "settle" }) => {
  const colors = {
    signal: "text-signal border-signal/20 bg-signal/10",
    execute: "text-execute border-execute/20 bg-execute/10",
    settle: "text-settle border-settle/20 bg-settle/10",
  };

  return (
    <span className={cn("px-2 py-0.5 text-xs font-mono rounded-full border", colors[color])}>
      {children}
    </span>
  );
};

export const Button = ({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary"
}) => {
  const base = "inline-flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 group rounded-md";
  const styles = {
    primary: "bg-primary text-void hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]",
    secondary: "glass-panel text-secondary hover:text-primary hover:border-primary/30",
  };

  return (
    <Link href={href} className={cn(base, styles[variant])}>
      {children}
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
};