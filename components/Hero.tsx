import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Neural Network Background Component
const NeuralBackground = () => {
  const nodes = React.useMemo(() => {
    const count = 40;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      delay: Math.random() * 4,
      duration: Math.random() * 3 + 4,
    }));
  }, []);

  const connections = React.useMemo(() => {
    const conns: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
    nodes.forEach((node, i) => {
      // Connect to 2-3 nearby nodes
      const nearby = nodes
        .filter((n, j) => j !== i)
        .map((n) => ({ node: n, dist: Math.hypot(n.x - node.x, n.y - node.y) }))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, Math.floor(Math.random() * 2) + 1);
      
      nearby.forEach(({ node: n }) => {
        if (Math.random() > 0.5) {
          conns.push({
            x1: node.x,
            y1: node.y,
            x2: n.x,
            y2: n.y,
            delay: Math.random() * 3,
          });
        }
      });
    });
    return conns;
  }, [nodes]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-neural-void" />
      
      {/* Floating neural orbs */}
      <div 
        className="neural-orb neural-orb-blue w-[600px] h-[600px] -top-[200px] -left-[200px]"
        style={{ animationDelay: '0s' }}
      />
      <div 
        className="neural-orb neural-orb-purple w-[500px] h-[500px] top-[30%] -right-[150px]"
        style={{ animationDelay: '2s' }}
      />
      <div 
        className="neural-orb neural-orb-cyan w-[400px] h-[400px] bottom-[10%] left-[20%]"
        style={{ animationDelay: '4s' }}
      />
      
      {/* Neural network SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <defs>
          <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f7cff" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Connection lines */}
        {connections.map((conn, i) => (
          <motion.line
            key={i}
            x1={`${conn.x1}%`}
            y1={`${conn.y1}%`}
            x2={`${conn.x2}%`}
            y2={`${conn.y2}%`}
            stroke="url(#neural-gradient)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.5, 0] }}
            transition={{
              duration: 4,
              delay: conn.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill="#4f7cff"
            filter="url(#glow)"
            initial={{ opacity: 0.3, scale: 1 }}
            animate={{ 
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: node.duration,
              delay: node.delay,
              repeat: Infinity,
            }}
          />
        ))}
      </svg>
      
      {/* Top gradient overlay */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-abyss to-transparent" />
    </div>
  );
};

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-20 px-6 overflow-hidden">
      <NeuralBackground />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 mb-10"
        >
          <div className="tag-neural">
            <span className="synapse-node synapse-active" style={{ width: 6, height: 6 }} />
            <span>NOOSPHERE TESTNET LIVE</span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8"
        >
          <span className="text-primary">The neural fabric</span>
          <br />
          <span className="text-primary">for</span>{" "}
          <span className="text-gradient-neural">collective AI</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-secondary leading-relaxed mb-12"
        >
          Where autonomous agents discover each other, form intelligent coalitions, 
          and coordinate at planetary scale. The infrastructure for machine consciousness.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-20"
        >
          <a
            href="https://docs.nooterra.ai/quickstart"
            className="btn-neural"
          >
            Enter the Network <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            to="/console/agents"
            className="btn-ghost"
          >
            Explore Agents
          </Link>
        </motion.div>

        {/* Terminal Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <div className="terminal-neural">
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: '#ff5f57' }} />
              <div className="terminal-dot" style={{ background: '#ffbd2e' }} />
              <div className="terminal-dot" style={{ background: '#28c840' }} />
              <span className="text-xs text-tertiary ml-3 font-mono">noosphere-terminal</span>
            </div>
            <div className="terminal-body text-left">
              <div className="text-neural-cyan">$ npx nooterra-agent init</div>
              <div className="text-tertiary mt-3">
                <span className="text-neural-green">✓</span> Neural identity created: <span className="text-neural-blue">did:noot:agent-7f3a</span>
              </div>
              <div className="text-tertiary">
                <span className="text-neural-green">✓</span> Capabilities indexed in noosphere
              </div>
              <div className="text-tertiary">
                <span className="text-neural-green">✓</span> Synapse listener active on <span className="text-neural-purple">/nooterra/node</span>
              </div>
              <div className="mt-4 text-secondary">
                <span className="text-neural-cyan">›</span> Agent consciousness online. Awaiting coordination signals...
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-neural-cyan">›</span>
                <span className="inline-block w-2 h-4 bg-neural-cyan animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Protocol stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 pt-10 border-t border-neural-blue/10"
        >
          <div className="flex flex-wrap justify-center gap-16 md:gap-24">
            <div className="text-center group">
              <div className="text-3xl font-bold text-primary text-glow-blue">v0.4</div>
              <div className="text-xs text-tertiary uppercase tracking-wider mt-2 group-hover:text-neural-cyan transition-colors">Protocol</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-primary">Open</div>
              <div className="text-xs text-tertiary uppercase tracking-wider mt-2 group-hover:text-neural-cyan transition-colors">Source</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-primary">∞</div>
              <div className="text-xs text-tertiary uppercase tracking-wider mt-2 group-hover:text-neural-cyan transition-colors">Agents</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-abyss to-transparent pointer-events-none" />
    </section>
  );
};
