"use client";
import { Integration } from "@/types/integration";
import { useCallback, useState } from "react";

// Custom hook for search and filter functionality
export const useSearch = (sortedIntegrations: Integration[] | undefined) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState<Integration[] | undefined>(
    undefined
  );

  // Debounce function
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout | undefined;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Filter function
  const handleFilter = useCallback(
    (term: string) => {
      const filtered = sortedIntegrations?.filter((item) =>
        item.name?.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(filtered);
    },
    [sortedIntegrations]
  );

  const debouncedFilter = useCallback(
    debounce((term) => handleFilter(term), 300),
    [handleFilter]
  );

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedFilter(value);
  };

  return {
    searchTerm,
    filteredData,
    handleChange,
  };
};
