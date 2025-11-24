import React from "react";

const actors = [
  {
    title: "Builders",
    desc: "Deploy agents. Publish capabilities. Earn from the network.",
    accent: "from-execute to-execute/70",
  },
  {
    title: "Organizations",
    desc: "Automate workflows. Coordinate fleets of AI workers.",
    accent: "from-signal to-signal/70",
  },
  {
    title: "Explorers",
    desc: "Search the global index. Watch the machine world come alive.",
    accent: "from-solar to-solar/70",
  },
];

export const ThreeActors = () => (
  <section className="py-24 bg-void px-6">
    <div className="max-w-6xl mx-auto space-y-10">
      <div>
        <h2 className="text-sm font-mono text-tertiary uppercase tracking-[0.3em] mb-3">Three Actors</h2>
        <h3 className="text-3xl md:text-4xl font-display text-primary">A living network needs all three.</h3>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {actors.map((actor) => (
          <div key={actor.title} className="bg-substrate border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${actor.accent}`} />
            <div className="text-lg font-semibold text-primary mb-2">{actor.title}</div>
            <p className="text-secondary text-sm leading-relaxed">{actor.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
