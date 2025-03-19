"use client";
import { Command } from "@phosphor-icons/react/dist/ssr";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";

export default function Searchbar({
  searchTerm,
  handleChange,
}: {
  searchTerm: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    <div
      className={`w-full border-2 rounded-md p-1 mb-6 md:mb-16 mx-auto max-w-lg flex items-center gap-2 transition-all duration-200 ${
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
  );
}
