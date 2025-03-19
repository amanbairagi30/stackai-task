"use client";
import { Integration } from "@/types/integration";
import { useCallback, useState } from "react";

export const useSearch = (sortedIntegrations: Integration[] | undefined) => {
  const [searchTerm, setSearchTerm] = useState("");
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
    (term: string) => {
      const filtered = sortedIntegrations?.filter((item) =>
        item.name?.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(filtered);
    },
    [sortedIntegrations]
  );

  const debouncedFilter = useCallback(
    debounce((term: string) => handleFilter(term), 300),
    [handleFilter]
  );

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
