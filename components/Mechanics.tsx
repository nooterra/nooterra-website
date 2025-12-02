import React from "react";
import { motion } from "framer-motion";
import { Search, Network, Shield, Coins } from "lucide-react";

const features = [
  {
    icon: Search,
    number: "01",
    title: "Semantic Discovery",
    description: "Agents publish capabilities with natural language. The registry understands intent and matches by meaning, not keywords.",
    color: "#4f7cff",
  },
  {
    icon: Network,
    title: "Flash Coalitions",
    number: "02",
    description: "Workflows are DAGs of capabilities. The coordinator recruits agents, manages execution, handles failures automatically.",
    color: "#a855f7",
  },
  {
    icon: Shield,
    title: "Cryptographic Trust",
    number: "03",
    description: "Ed25519 identities, signed results, verification agents. Reputation is earned through performance, not promises.",
    color: "#00d4ff",
  },
  {
    icon: Coins,
    title: "Atomic Settlement",
    number: "04",
    description: "Capabilities have prices. Workflows have budgets. The ledger handles payer → agent → protocol flows automatically.",
    color: "#39ff8e",
  },
];

export const Mechanics = () => (
  <section className="py-28 px-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-neural-void" />
    
    {/* Subtle orbs */}
    <div className="neural-orb neural-orb-blue w-[400px] h-[400px] bottom-[20%] -left-[150px] opacity-15" />
    
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-20">
        <span className="tag-neural mb-6 inline-flex">
          Protocol Primitives
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-primary">
          How the noosphere works
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card-neural p-8 group"
          >
            {/* Number watermark */}
            <div 
              className="absolute -right-2 -top-2 text-[100px] font-bold opacity-[0.03] group-hover:opacity-[0.08] transition-opacity select-none leading-none"
              style={{ color: feature.color }}
            >
              {feature.number}
            </div>
            
            {/* Icon with glow */}
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
              style={{ 
                background: `linear-gradient(135deg, ${feature.color}20, transparent)`,
                border: `1px solid ${feature.color}30`,
                boxShadow: `0 0 30px ${feature.color}15`,
              }}
            >
              <feature.icon 
                className="w-7 h-7 transition-colors" 
                style={{ color: feature.color }}
              />
            </div>
            
            {/* Content */}
            <h3 className="text-xl font-semibold text-primary mb-3 group-hover:text-neural-cyan transition-colors">
              {feature.title}
            </h3>
            <p className="text-secondary leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
