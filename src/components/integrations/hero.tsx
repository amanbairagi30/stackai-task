"use client";
import { CubeFocus } from "@phosphor-icons/react";
import { Logo } from "../svgs/logo";
import { Badge } from "../ui/badge";
import { HeroButton } from "../hero-button";
import { heroData } from "@/constants/data";

export const Hero = () => {
  return (
    <section className="relative mb-10 w-full overflow-y-hidden h-[30rem] max-h-fit">
      <div className="max-w-7xl flex gap-3 items-center py-14 flex-col h-fit mx-auto p-6">
        <div className="flex flex-col gap-3 mb-4">
          <Logo />
          <p className="text-sm font-bold font-secondary">Stack AI</p>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold">Integrations</h1>
        <p className="w-full md:text-base text-sm font-medium font-secondary md:max-w-2xl text-center">
          At Stack AI, security and privacy of our customer&apos;s data is our
          top priority. Today, we are thrilled to announce that Stack AI is now
          SOC 2 Type II and HIPAA compliant.
        </p>
        <HeroButton className="mx-auto" href={"#integrations"}>
          See all Integrations <CubeFocus weight="duotone" className="size-5" />
        </HeroButton>

        {/* Below information are just mock information */}
        <div className="flex gap-3 items-center w-full justify-center mt-6 flex-wrap">
          {heroData.map((item) => (
            <Badge
              key={item.title}
              variant={"secondary"}
              className="rounded-sm transition-all duration-500 hover:font-extrabold flex items-center gap-2 text-sm h-fit"
            >
              {item.title} <item.icon className="size-5" />
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};
