"use client";
import { Eye } from "@phosphor-icons/react";
import { Layout } from "@phosphor-icons/react";
import { Cube } from "@phosphor-icons/react";
import { CubeFocus } from "@phosphor-icons/react";
import { Logo } from "../svgs/logo";
import { Badge } from "../ui/badge";
import { HeroButton } from "../hero-button";

export const Hero = () => {
  return (
    <div className="relative mb-10 w-full overflow-y-hidden h-[30rem] max-h-fit">
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

        <div className="flex gap-3 items-center w-full justify-center mt-6 flex-wrap">
          <Badge
            variant={"secondary"}
            className="rounded-sm transition-all duration-500 hover:font-extrabold flex items-center gap-2 text-sm h-fit"
          >
            50+ Integrations <Cube className="size-5" />
          </Badge>
          <Badge
            variant={"secondary"}
            className="rounded-sm transition-all duration-500 hover:font-extrabold flex items-center gap-2 text-sm h-fit"
          >
            2000+ projects created <Layout className="size-5" />
          </Badge>
          <Badge
            variant={"secondary"}
            className="rounded-sm transition-all duration-500 hover:font-extrabold flex items-center gap-2 text-sm h-fit"
          >
            500K+ Total Views <Eye className="size-5" />
          </Badge>
        </div>
      </div>
    </div>
  );
};
