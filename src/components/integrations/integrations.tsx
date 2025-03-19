"use client";
import { useQuery } from "@tanstack/react-query";
import { Warning } from "@phosphor-icons/react";
import { getAllIntegrations } from "@/lib/query-fn";
import { getIntegrationImageUrl } from "@/lib/integration";
import { SkeletonGrids } from "../skeleton-grids";
import { IntegrationCard } from "./integration-card";
import Searchbar from "./searchbar";
import { useSearch } from "@/hooks/use-search";

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

  const { searchTerm, filteredData, handleChange } =
    useSearch(sortedIntegrations);

  const displayData = searchTerm ? filteredData : sortedIntegrations;
  const showNoResults = searchTerm && filteredData?.length === 0;

  return (
    <section id="integrations" className="w-full">
      <Searchbar searchTerm={searchTerm} handleChange={handleChange} />

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
        {showNoResults && <NoResults searchTerm={searchTerm} />}
        {isError && <ErrorMessage />}
      </div>
      {isPending && <SkeletonGrids />}
    </section>
  );
};

const NoResults = ({ searchTerm }: { searchTerm: string }) => (
  <div className="flex flex-col mt-10 gap-2 items-center justify-center col-span-full">
    <Warning className="size-20 text-yellow-500" />
    <p className="text-2xl font-bold">
      No such integration named {`"${searchTerm}"`}
    </p>
  </div>
);

const ErrorMessage = () => (
  <div className="flex flex-col mt-10 gap-2 items-center justify-center col-span-full">
    <Warning className="size-20 text-red-500" />
    <p className="text-2xl font-bold">Error loading integrations</p>
  </div>
);
