"use client";
import { Integration } from "@/types/integration";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import IntegrationImage from "@/components/integrations/integration-image";
import { ArrowUpRight } from "@phosphor-icons/react";
import { HeroButton } from "@/components/hero-button";

export const IntegrationCard = ({
  integration,
  imageUrl,
}: {
  integration: Integration;
  imageUrl: string;
}) => {
  return (
    <div
      key={integration.id}
      className="h-full hover:shadow-2xl shadow-accent duration-500 border py-4 px-4 rounded-lg"
    >
      <Card className="flex bg-transparent border-2 flex-col p-0 h-full border-none outline-none shadow-none transition-shadow">
        <CardHeader className="p-0">
          <div className="size-16 rounded-lg bg-accent p-2 flex items-center justify-center">
            <IntegrationImage src={imageUrl} alt={integration.name} />
          </div>
          <CardTitle className="mt-4 text-xl">{integration.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 p-0 h-full flex flex-col">
          <p className="text-gray-600 font-secondary">
            {integration.description}
          </p>
          <div className="mt-4 flex items-end flex-wrap gap-2">
            {integration.labels.map((label) => (
              <Badge
                variant={"secondary"}
                className="rounded-sm h-fit"
                key={label}
              >
                {label}
              </Badge>
            ))}
          </div>
        </CardContent>
        <HeroButton className="w-fit" href={`/integrations/${integration.id}`}>
          Explore more <ArrowUpRight className="w-4 font-bold h-4" />
        </HeroButton>
      </Card>
    </div>
  );
};
