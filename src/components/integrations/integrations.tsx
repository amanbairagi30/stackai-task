"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllIntegrations } from "@/lib/query-fn";
import { SkeletonGrids } from "../skeleton-grids";
import { IntegrationCard } from "./integration-card";
import { getIntegrationImageUrl } from "@/lib/integration";

export const Integrations = () => {
  const { data: integrations, isPending } = useQuery({
    queryKey: ["integrationsData"],
    queryFn: getAllIntegrations,
  });
  return (
    <>
      <div
        id="integrations"
        className="w-full grid grid-cols-1 max-h-fit sm:grid-cols-2 gap-4 lg:grid-cols-3"
      >
        {!isPending &&
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
      </div>
      {isPending && <SkeletonGrids />}
    </>
  );
};
