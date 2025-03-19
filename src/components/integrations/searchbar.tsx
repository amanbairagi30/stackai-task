"use client";
import { Command } from "@phosphor-icons/react/dist/ssr";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { Funnel } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Searchbar({
  searchTerm,
  handleChange,
  isFilterOpen,
  setIsFilterOpen,
}: {
  searchTerm: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (isFilterOpen: boolean) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+K or Command+K
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault(); // Prevent default browser behavior
        inputRef.current?.focus();
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section className="flex items-center gap-2 mx-auto max-w-lg w-full">
      <div
        className={`w-full border-2 rounded-md p-1  flex items-center gap-2 transition-all duration-200 ${
          isFocused ? "ring-2 ring-primary" : ""
        }`}
      >
        <Input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search integrations (Ex: Slack, Google, etc.)..."
          className="w-full shadow-none outline-none px-4 py-2 focus-visible:ring-0 ring-offset-0 focus-visible:ring-offset-0 focus-visible:border-none border-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="flex items-center bg-foreground/10 gap-1 px-4 rounded-md py-2 w-fit">
          <Command className="size-4" />
          <span className="text-sm font-medium font-secondary">+</span>
          <span className="text-sm font-secondary font-medium">K</span>
        </div>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {" "}
            <div
              className={`rounded-md w-12 aspect-square cursor-pointer flex items-center justify-center ${
                isFilterOpen
                  ? "bg-foreground text-background  hover:bg-foreground/80"
                  : "bg-accent text-foreground hover:bg-accent/80 hover:ring-2 hover:ring-foreground"
              }`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Funnel className="size-6" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to Toggle Filters panel</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </section>
  );
}
