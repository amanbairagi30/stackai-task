"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllIntegrations } from "@/lib/query-fn";
import { SkeletonGrids } from "../skeleton-grids";
import { IntegrationCard } from "./integration-card";
import { getIntegrationImageUrl } from "@/lib/integration";
import { Warning } from "@phosphor-icons/react";

export const Integrations = () => {
  const {
    data: integrations,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["integrationsData"],
    queryFn: getAllIntegrations,
  });
  return (
    <>
      <section
        id="integrations"
        className="w-full grid grid-cols-1 max-h-fit sm:grid-cols-2 gap-4 lg:grid-cols-3"
      >
        {!isPending &&
          !isError &&
          integrations?.map((integration) => {
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
        {isError && (
          <div className="flex flex-col mt-10 gap-2 items-center justify-center col-span-full">
            <Warning className="size-20 text-red-500" />
            <p className="text-2xl font-bold">Error loading integrations</p>
          </div>
        )}
      </section>
      {isPending && <SkeletonGrids />}
    </>
  );
};
