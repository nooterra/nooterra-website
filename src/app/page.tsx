import { StatusHeader } from "@/components/StatusHeader";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Primitives } from "@/components/Primitives";
import { CodeShowcase } from "@/components/CodeShowcase";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <StatusHeader />
      <main>
        <Hero />
        <Problem />
        <Primitives />
        <CodeShowcase />
      </main>
      <Footer />
    </>
  );
}
