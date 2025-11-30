import React from "react";
import { Navbar } from "../../components/ui/Navbar";
import { Hero } from "../../components/Hero";
import { Shift } from "../../components/Shift";
import { Economy } from "../../components/Economy";
import { Mechanics } from "../../components/Mechanics";
import { Developers } from "../../components/Developers";
import { ThreeActors } from "../../components/ThreeActors";
import { WhyNow } from "../../components/WhyNow";
import { LiveMetrics } from "../../components/metrics/LiveMetrics";
import { Footer } from "../../components/Footer";
import { RoleModal } from "../../components/ui/RoleModal";

export default function Home() {
  return (
    <div className="min-h-screen bg-void overflow-x-hidden selection:bg-signal/30 text-primary font-sans">
      <RoleModal />
      <Navbar />
      <main className="flex flex-col w-full">
        <Hero />
        <WhyNow />
        <Shift />
        <Economy />
        <Mechanics />
        <Developers />
        <ThreeActors />
        <LiveMetrics />
      </main>
      <Footer />
    </div>
  );
}
