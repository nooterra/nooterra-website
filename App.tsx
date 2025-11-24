import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { Navbar } from "./components/ui/Navbar";
import { Hero } from "./components/Hero";
import { Shift } from "./components/Shift";
import { Economy } from "./components/Economy";
import { Mechanics } from "./components/Mechanics";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-void overflow-x-hidden selection:bg-signal/30 text-primary font-sans">
        <Navbar />
        <main className="flex flex-col w-full">
          <Hero />
          <Shift />
          <Economy />
          <Mechanics />
        </main>
        <Footer />
      </div>
    </Router>
  );
}