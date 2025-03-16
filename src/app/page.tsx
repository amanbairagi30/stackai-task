import { Hero } from "@/components/integrations/hero";
import { Integrations } from "@/components/integrations/integrations";

export default function Home() {
  return (
    <div className="space-y-10 relative p-6 max-w-7xl w-full border-x mx-auto">
      <div className="absolute inset-0 z-[-1] w-full h-[22rem] border-red-500 bg-gradient-to-b from-accent via-foreground/5 "></div>
      <Hero />
      <Integrations />
    </div>
  );
}
