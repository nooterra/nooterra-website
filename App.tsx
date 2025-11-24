import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { Navbar } from "./components/ui/Navbar";
import { Hero } from "./components/Hero";
import { Shift } from "./components/Shift";
import { Economy } from "./components/Economy";
import { Mechanics } from "./components/Mechanics";
import { ThreeActors } from "./components/ThreeActors";
import { WhyNow } from "./components/WhyNow";
import { LiveMetrics } from "./components/metrics/LiveMetrics";
import { Footer } from "./components/Footer";
import { RoleModal } from "./components/ui/RoleModal";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-void overflow-x-hidden selection:bg-signal/30 text-primary font-sans">
        <RoleModal />
        <Navbar />
        <main className="flex flex-col w-full">
          <Hero />
          <WhyNow />
          <Shift />
          <Economy />
          <Mechanics />
          <ThreeActors />
          <LiveMetrics />
        </main>
        <Footer />
      </div>
    </Router>
  );
}
