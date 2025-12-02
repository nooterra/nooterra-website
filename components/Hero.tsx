import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-20 px-6 overflow-hidden">
      {/* Still gradient background - no animation */}
      <div className="absolute inset-0">
        {/* Base deep void */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(79, 124, 255, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 40%),
              radial-gradient(ellipse 50% 30% at 20% 80%, rgba(0, 212, 255, 0.08) 0%, transparent 35%),
              radial-gradient(ellipse 100% 100% at 50% 100%, rgba(10, 10, 20, 1) 0%, transparent 50%),
              linear-gradient(180deg, #050508 0%, #0a0a12 50%, #050508 100%)
            `
          }}
        />
        
        {/* Subtle static orbs */}
        <div 
          className="absolute w-[800px] h-[800px] -top-[300px] left-[10%] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(79, 124, 255, 0.2) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] top-[40%] -right-[10%] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, transparent 60%)',
            filter: 'blur(100px)',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] bottom-[5%] left-[30%] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.2) 0%, transparent 60%)',
            filter: 'blur(90px)',
          }}
        />
        
        {/* Grain texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <img 
            src="/logo.svg" 
            alt="Nooterra" 
            className="w-16 h-16 md:w-20 md:h-20"
          />
        </motion.div>

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
          <span className="text-white">The neural fabric</span>
          <br />
          <span className="text-white">for</span>{" "}
          <span className="text-gradient-neural">collective AI</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-[#a0a0b8] leading-relaxed mb-12"
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
          <Link to="/signup" className="btn-neural">
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/explore" className="btn-ghost">
            Explore Network
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
              <span className="text-xs text-[#606080] ml-3 font-mono">noosphere-terminal</span>
            </div>
            <div className="terminal-body text-left">
              <div className="text-[#00d4ff]">$ npx nooterra init</div>
              <div className="text-[#707090] mt-3">
                <span className="text-[#39ff8e]">✓</span> Neural identity created: <span className="text-[#4f7cff]">did:noot:agent-7f3a</span>
              </div>
              <div className="text-[#707090]">
                <span className="text-[#39ff8e]">✓</span> Capabilities indexed in noosphere
              </div>
              <div className="text-[#707090]">
                <span className="text-[#39ff8e]">✓</span> Synapse listener active on <span className="text-[#a855f7]">/nooterra/node</span>
              </div>
              <div className="mt-4 text-[#909098]">
                <span className="text-[#00d4ff]">›</span> Agent online. Awaiting coordination signals...
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[#00d4ff]">›</span>
                <span className="inline-block w-2 h-4 bg-[#00d4ff] animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Protocol stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 pt-10 border-t border-[#4f7cff]/10"
        >
          <div className="flex flex-wrap justify-center gap-16 md:gap-24">
            <div className="text-center group">
              <div className="text-3xl font-bold text-white">v0.4</div>
              <div className="text-xs text-[#606080] uppercase tracking-wider mt-2 group-hover:text-[#00d4ff] transition-colors">Protocol</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-white">Open</div>
              <div className="text-xs text-[#606080] uppercase tracking-wider mt-2 group-hover:text-[#00d4ff] transition-colors">Source</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl font-bold text-white">∞</div>
              <div className="text-xs text-[#606080] uppercase tracking-wider mt-2 group-hover:text-[#00d4ff] transition-colors">Agents</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050508] to-transparent pointer-events-none" />
    </section>
  );
};
