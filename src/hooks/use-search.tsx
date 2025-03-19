"use client";
import type { Integration } from "@/types/integration";
import type React from "react";

import { useCallback, useState } from "react";

export const useSearch = (sortedIntegrations: Integration[] | undefined) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<Integration[] | undefined>(
    undefined
  );

  // @ts-expect-error : func is (...args: any[]) => void
  const debounce = (func, delay: number) => {
    let timeoutId: NodeJS.Timeout | undefined;
    // @ts-expect-error : args is an array
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const handleFilter = useCallback(
    (term: string, tags: string[]) => {
      const filtered = sortedIntegrations?.filter((item) => {
        const nameMatch = item.name?.toLowerCase().includes(term.toLowerCase());
        const tagMatch =
          tags.length === 0 || tags.some((tag) => item.labels.includes(tag));

        return nameMatch && tagMatch;
      });
      setFilteredData(filtered);
    },
    [sortedIntegrations]
  );

  const debouncedFilter = useCallback(
    debounce((term: string, tags: string[]) => handleFilter(term, tags), 300),
    [handleFilter]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedFilter(value, selectedTags);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => {
      const newTags = prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag];

      debouncedFilter(searchTerm, newTags);
      return newTags;
    });
  };

  const clearTags = () => {
    setSelectedTags([]);
    debouncedFilter(searchTerm, []);
  };

  return {
    searchTerm,
    selectedTags,
    filteredData,
    handleChange,
    handleTagToggle,
    clearTags,
  };
};
