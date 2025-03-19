"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const HeroButton = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} className="flex w-fit scroll-smooth items-center gap-2">
      <Button
        className={cn(
          "z-[50] relative cursor-pointer hover:ring-4 ring-foreground/20 duration-500 group overflow-hidden",
          className
        )}
      >
        <div className="w-8 absolute bg-accent/20 -translate-x-[8rem] group-hover:translate-x-[7rem] transition-all duration-300 ease-linear rotate-20 h-[10rem]"></div>
        {children}
      </Button>
    </Link>
  );
};
