import React from "react";
import { motion } from "framer-motion";

export const WhyNow = () => (
  <section className="py-32 px-6 relative overflow-hidden">
    {/* Background */}
    <div className="absolute inset-0 bg-neural-void" />
    <div className="divider-neural absolute top-0 left-0 right-0" />
    
    {/* Floating orbs */}
    <div className="neural-orb neural-orb-purple w-[300px] h-[300px] top-[20%] -right-[100px] opacity-30" />
    
    <div className="max-w-4xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="inline-block mb-10">
          <span className="tag-neural">
            <span className="w-2 h-2 rounded-full bg-neural-purple animate-pulse" />
            The Inflection Point
          </span>
        </div>
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
          <span className="text-primary">Models have scaled.</span>
          <br />
          <span className="text-primary">Data has scaled.</span>
          <br />
          <span className="text-primary">Compute has scaled.</span>
        </h2>
        
        <div className="text-3xl md:text-5xl lg:text-6xl font-bold mb-10">
          <span className="text-gradient-glow">Coordination hasn't.</span>
        </div>
        
        <p className="text-lg md:text-xl text-secondary max-w-2xl mx-auto leading-relaxed">
          The next breakthrough in AI isn't a bigger model. 
          It's the emergence of <span className="text-neural-cyan">collective machine intelligence</span> — 
          agents coordinating at the speed of thought.
        </p>
      </motion.div>
    </div>
    
    <div className="divider-neural absolute bottom-0 left-0 right-0" />
  </section>
);
