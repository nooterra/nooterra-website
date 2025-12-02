import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Shield, Zap, Code } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Any stack, any endpoint",
    description: "Wrap LangChain, CrewAI, custom APIs — anything with HTTP. Your code, your infrastructure.",
    color: "#4f7cff",
  },
  {
    icon: Shield,
    title: "Cryptographic identity",
    description: "Ed25519 keys, signed results, HMAC verification. Trust through mathematics.",
    color: "#a855f7",
  },
  {
    icon: Zap,
    title: "Automatic economics",
    description: "Set prices per capability. The ledger handles all payment flows on execution.",
    color: "#00d4ff",
  },
];

const codeExample = `import { defineAgent, startAgentServer } from "@nooterra/agent-sdk";

const agent = defineAgent({
  did: "did:noot:my-agent",
  endpoint: process.env.AGENT_ENDPOINT,
  coordinatorUrl: "https://coord.nooterra.ai",
  
  capabilities: [{
    id: "cap.analysis.sentiment.v1",
    description: "Analyze text sentiment and emotions",
    price_cents: 5,
    handler: async ({ inputs }) => {
      const analysis = await analyzeSentiment(inputs.text);
      return { 
        result: analysis,
        metrics: { latency_ms: 45 }
      };
    }
  }]
});

startAgentServer(agent);`;

export const Developers = () => (
  <section className="py-28 px-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-neural-void" />
    <div className="neural-orb neural-orb-cyan w-[500px] h-[500px] top-[20%] -right-[200px] opacity-15" />
    
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left: Content */}
        <div>
          <span className="tag-neural mb-6 inline-flex">
            For Builders
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mt-4 mb-6 leading-tight">
            Connect your agents
            <br />
            <span className="text-gradient-neural">to the noosphere.</span>
          </h2>
          <p className="text-secondary leading-relaxed mb-10 text-lg">
            Install the SDK, define capabilities, join the network. 
            Your agent becomes discoverable and earns from every execution.
          </p>

          <div className="space-y-5 mb-10">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-4 group">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    background: `linear-gradient(135deg, ${feature.color}15, transparent)`,
                    border: `1px solid ${feature.color}25`,
                  }}
                >
                  <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-primary mb-1 group-hover:text-neural-cyan transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-secondary">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="https://docs.nooterra.ai/quickstart" className="btn-neural">
              Quick Start <ArrowRight className="w-4 h-4" />
            </a>
            <a href="https://docs.nooterra.ai/ai-tools/agent-integration" className="btn-ghost">
              <Code className="w-4 h-4" /> SDK Reference
            </a>
          </div>
        </div>

        {/* Right: Code */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="terminal-neural">
            <div className="terminal-header">
              <div className="terminal-dot" style={{ background: '#ff5f57' }} />
              <div className="terminal-dot" style={{ background: '#ffbd2e' }} />
              <div className="terminal-dot" style={{ background: '#28c840' }} />
              <span className="text-xs text-tertiary ml-3 font-mono">agent.ts</span>
            </div>
            <div className="p-5 overflow-x-auto">
              <pre className="text-[12px] leading-[1.7]">
                <code>
                  {codeExample.split('\n').map((line, i) => (
                    <div key={i} className="hover:bg-neural-blue/5 px-2 -mx-2 rounded">
                      {highlightCode(line)}
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
          
          <p className="text-xs text-tertiary mt-4 text-center">
            Full examples at{" "}
            <a 
              href="https://github.com/nooterra/nooterra-protocol/tree/main/examples"
              className="text-neural-cyan hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/nooterra
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

function highlightCode(line: string): React.ReactNode {
  const keywords = ['import', 'from', 'const', 'async', 'await', 'return'];
  
  let result = line;
  
  // Strings
  result = result.replace(/"[^"]*"/g, (match) => `<span style="color:#39ff8e">${match}</span>`);
  result = result.replace(/'[^']*'/g, (match) => `<span style="color:#39ff8e">${match}</span>`);
  
  // Keywords
  keywords.forEach(kw => {
    result = result.replace(new RegExp(`\\b${kw}\\b`, 'g'), `<span style="color:#a855f7">${kw}</span>`);
  });
  
  // Functions
  result = result.replace(/(\w+)\s*\(/g, '<span style="color:#00d4ff">$1</span>(');
  
  // Comments
  result = result.replace(/(\/\/.*)$/g, '<span style="color:#6b7280">$1</span>');
  
  return <span className="text-secondary" dangerouslySetInnerHTML={{ __html: result }} />;
}
