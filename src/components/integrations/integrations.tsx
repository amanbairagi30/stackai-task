"use client";
import { useQuery } from "@tanstack/react-query";
import { Warning } from "@phosphor-icons/react";
import { getAllIntegrations } from "@/lib/query-fn";
import { getIntegrationImageUrl } from "@/lib/integration";
import { SkeletonGrids } from "../skeleton-grids";
import { IntegrationCard } from "./integration-card";
import Searchbar from "./searchbar";
import { useSearch } from "@/hooks/use-search";
import { TagFilter } from "./tag-filter";
import { useState } from "react";

export const Integrations = () => {
  const {
    data: integrations,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["integrationsData"],
    queryFn: getAllIntegrations,
  });

  const sortedIntegrations = integrations?.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {
    searchTerm,
    selectedTags,
    filteredData,
    handleChange,
    handleTagToggle,
    clearTags,
  } = useSearch(sortedIntegrations);

  const displayData =
    searchTerm || selectedTags.length > 0 ? filteredData : sortedIntegrations;
  const showNoResults =
    (searchTerm || selectedTags.length > 0) && filteredData?.length === 0;

  return (
    <section id="integrations" className="w-full">
      <div className="flex flex-col gap-6 mb-6 md:mb-16">
        <Searchbar
          searchTerm={searchTerm}
          handleChange={handleChange}
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
        <TagFilter
          filteredIntegrations={filteredData}
          searchTerm={searchTerm}
          integrations={sortedIntegrations}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          isFilterOpen={isFilterOpen}
          onClearTags={clearTags}
        />
      </div>

      <div className="w-full grid grid-cols-1 max-h-fit sm:grid-cols-2 gap-4 lg:grid-cols-3">
        {displayData &&
          !showNoResults &&
          displayData.map((integration) => {
            const imageUrl = getIntegrationImageUrl(
              integration.name,
              integration.icon
            );
            return (
              <IntegrationCard
                imageUrl={imageUrl}
                key={integration.id}
                integration={integration}
              />
            );
          })}
        {showNoResults && (
          <NoResults searchTerm={searchTerm} selectedTags={selectedTags} />
        )}
        {isError && <ErrorMessage />}
      </div>
      {isPending && <SkeletonGrids />}
    </section>
  );
};

const NoResults = ({
  searchTerm,
  selectedTags,
}: {
  searchTerm: string;
  selectedTags: string[];
}) => {
  const searchMessage = searchTerm ? `named "${searchTerm}"` : "";
  const tagMessage =
    selectedTags.length > 0 ? `with tags: ${selectedTags.join(", ")}` : "";

  const message = [searchMessage, tagMessage].filter(Boolean).join(" and ");

  return (
    <div className="flex flex-col mt-10 gap-2 items-center justify-center col-span-full">
      <Warning className="size-20 text-yellow-500" />
      <p className="text-2xl font-bold text-center">
        No integrations found {message}
      </p>
    </div>
  );
};

const ErrorMessage = () => (
  <div className="flex flex-col mt-10 gap-2 items-center justify-center col-span-full">
    <Warning className="size-20 text-red-500" />
    <p className="text-2xl font-bold">Error loading integrations</p>
  </div>
);
