import { StatusHeader } from "@/components/StatusHeader";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Primitives } from "@/components/Primitives";
import { CodeShowcase } from "@/components/CodeShowcase";
import { Footer } from "@/components/Footer";
import { Architecture } from "@/components/Architecture";
import { FinalCTA } from "@/components/FinalCTA";
import { DemoSection } from "@/components/DemoSection";

export default function Home() {
  return (
    <>
      <StatusHeader />
      <main>
        <Hero />
        <Problem />
        <Primitives />
        <Architecture />
        <DemoSection />
        <CodeShowcase />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
