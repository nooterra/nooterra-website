import React from "react";

export const WhyNow = () => (
  <section className="py-20 px-6 bg-horizon border-y border-white/5">
    <div className="max-w-5xl mx-auto grid md:grid-cols-[120px,1fr] gap-6 items-start">
      <div className="text-xs font-mono tracking-[0.25em] text-tertiary uppercase">Why Now</div>
      <div className="space-y-3">
        <p className="text-2xl md:text-3xl font-display text-primary leading-tight">
          Models have scaled. Data has scaled. Compute has scaled.
        </p>
        <p className="text-2xl md:text-3xl font-display text-primary leading-tight">
          Coordination hasn’t.
        </p>
        <p className="text-secondary leading-relaxed">
          The next breakthrough in AI isn’t a bigger model—it’s the fabric where models coordinate.
        </p>
      </div>
    </div>
  </section>
);
