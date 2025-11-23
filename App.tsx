import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { StatusHeader } from "./components/StatusHeader";
import { Hero } from "./components/Hero";
import { Problem } from "./components/Problem";
import { Primitives } from "./components/Primitives";
import { CodeShowcase } from "./components/CodeShowcase";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-void overflow-x-hidden selection:bg-signal/30 text-primary font-sans">
        <StatusHeader />
        <main className="flex flex-col w-full">
          <Hero />
          <Problem />
          <Primitives />
          <CodeShowcase />
        </main>
        <Footer />
      </div>
    </Router>
  );
}