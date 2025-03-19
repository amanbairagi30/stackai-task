"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Integration } from "@/types/integration";

interface TagFilterProps {
  integrations: Integration[] | undefined;
  filteredIntegrations: Integration[] | undefined;
  selectedTags: string[];
  isFilterOpen: boolean;
  onTagToggle: (tag: string) => void;
  onClearTags: () => void;
  searchTerm: string;
}

export const TagFilter = ({
  isFilterOpen,
  integrations,
  filteredIntegrations,
  selectedTags,
  onTagToggle,
  onClearTags,
  searchTerm,
}: TagFilterProps) => {
  const tagsWithCounts = useMemo(() => {
    if (!integrations) return [];

    const tagCounts = new Map<string, number>();

    integrations.forEach((integration) => {
      integration.labels.forEach((label: string) => {
        if (!tagCounts.has(label)) {
          tagCounts.set(label, 0);
        }
      });
    });

    integrations.forEach((integration) => {
      integration.labels.forEach((label: string) => {
        tagCounts.set(label, (tagCounts.get(label) || 0) + 1);
      });
    });

    return Array.from(tagCounts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => a.tag.localeCompare(b.tag));
  }, [integrations, filteredIntegrations, searchTerm]);

  if (!tagsWithCounts.length) return null;

  return (
    <div className={`w-full ${isFilterOpen ? "block" : "hidden"}`}>
      <div className="flex items-center justify-between mb-2">
        {selectedTags.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearTags}
            className="h-7 px-2 text-xs"
          >
            Clear all
            <X className="ml-1 size-3" />
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {tagsWithCounts.map(({ tag, count }) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            className={`cursor-pointer hover:opacity-80 transition-opacity flex items-center`}
            onClick={() => onTagToggle(tag)}
          >
            {tag}
            {count > 1 && (
              <span className="ml-1.5 text-xs bg-muted-foreground/20 px-1.5 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </Badge>
        ))}
      </div>
    </div>
  );
};
