import React from "react";
import { Navbar } from "../../components/ui/Navbar";
import { Hero } from "../../components/Hero";
import { WhyNow } from "../../components/WhyNow";
import { Shift } from "../../components/Shift";
import { Mechanics } from "../../components/Mechanics";
import { Developers } from "../../components/Developers";
import { Economy } from "../../components/Economy";
import { ThreeActors } from "../../components/ThreeActors";
import { LiveMetrics } from "../../components/metrics/LiveMetrics";
import { Footer } from "../../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-void overflow-x-hidden text-primary">
      <Navbar />
      <main className="flex flex-col w-full">
        <Hero />
        <WhyNow />
        <Mechanics />
        <Shift />
        <Economy />
        <Developers />
        <ThreeActors />
        <LiveMetrics />
      </main>
      <Footer />
    </div>
  );
}
