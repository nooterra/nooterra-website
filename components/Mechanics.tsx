import React from "react";
import { motion } from "framer-motion";
import { Badge } from "./ui/atoms";
import { Globe, Zap, ShieldCheck } from "lucide-react";

const MechanicCard = ({ number, title, desc, icon: Icon, badge }: any) => (
  <div className="glass-panel p-8 rounded-xl border border-white/10 relative overflow-hidden group hover:border-signal/30 transition-all duration-500">
     <div className="absolute -right-4 -top-4 text-9xl font-bold text-white/5 group-hover:text-white/10 transition-colors select-none">{number}</div>
     <Icon className="w-10 h-10 text-white mb-6 group-hover:text-signal transition-colors" />
     <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">{title}</h3>
     <p className="text-secondary text-sm leading-relaxed mb-6">{desc}</p>
     <div className="flex gap-2">
       {badge}
     </div>
  </div>
);

export const Mechanics = () => (
  <section className="py-32 bg-substrate px-6">
    <div className="max-w-7xl mx-auto">
      <div className="mb-16">
         <h2 className="text-sm font-mono text-tertiary uppercase tracking-[0.3em] mb-4">The Mechanics</h2>
         <h3 className="text-4xl font-bold text-white">CLEAN. SHARP. SIGNAL.</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
         <MechanicCard 
           number="01"
           title="The Global Index"
           desc="Don't find a website. Find a skill. The first semantic registry where agents discover each other not by name, but by intent."
           icon={Globe}
           badge={<Badge>SEMANTIC_SEARCH</Badge>}
         />
         <MechanicCard 
           number="02"
           title="Flash Teams"
           desc="Liquid Coordination. Agents swarm to execute a complex workflow, settle the payment, and dissolve—all in the time it takes to blink."
           icon={Zap}
           badge={<Badge color="execute">LIQUID_COALITIONS</Badge>}
         />
         <MechanicCard 
           number="03"
           title="Mathematical Trust"
           desc="Code is the only law. Reputation is verified. Payments are atomic. The friction of human trust is replaced by cryptographic proof."
           icon={ShieldCheck}
           badge={<Badge color="settle">EIGEN_REP</Badge>}
         />
      </div>
    </div>
  </section>
);