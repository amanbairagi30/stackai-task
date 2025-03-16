import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import IntegrationImage from "@/components/integrations/integration-image";
import {
  CurrencyCircleDollar,
  Note,
  Plugs,
} from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { HeroButton } from "@/components/hero-button";
import { BackButton } from "@/components/back-button";
import { getIntegrationData, getIntegrationImageUrl } from "@/lib/integration";
import { Metadata } from "next";
import { getFilteredToolsData } from "@/lib/tools";
import { Integration } from "@/types/integration";
import { Tool } from "@/types/integration";

export const metadata: Metadata = {
  title: "StackAI - Integration",
  description: "StackAI - Integration",
};

export default async function IntegrationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const integrationData = await getIntegrationData(id);

  if (!integrationData) {
    notFound();
  }

  const toolData = await getFilteredToolsData(id);

  const displayData: Integration | Tool = toolData || integrationData;

  const imageUrl = getIntegrationImageUrl(displayData.name, displayData.icon);

  return (
    <div className="space-y-10">
      <BackButton text={`Integration`} />
      <Card className="border-transparent shadow-none p-0 outline-none border-none">
        <CardHeader className="flex p-0 items-center gap-4">
          <div className="flex !size-24 border-2 rounded-lg p-2 items-center">
            <IntegrationImage
              src={toolData ? toolData.icon : imageUrl}
              alt={displayData.name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <CardTitle className="text-3xl">{integrationData.name}</CardTitle>
            <div className="mb-4 flex flex-wrap gap-2">
              {(toolData?.tags || integrationData.labels || []).map(
                (tag: string) => (
                  <Badge variant={"secondary"} className="text-xs" key={tag}>
                    {tag.toUpperCase()}
                  </Badge>
                )
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border rounded-lg">
              <h2 className="text-xl flex  bg-accent border-b rounded-t-lg p-4 items-center gap-2 font-semibold mb-2">
                <Note /> Description
              </h2>
              <p className="text-sm leading-tight p-4 font-secondary">
                {integrationData.description}
              </p>
            </div>

            <div className="h-full border rounded-lg">
              <h2 className="text-xl flex  bg-accent border-b rounded-t-lg p-4 items-center gap-2 font-semibold mb-2">
                <CurrencyCircleDollar /> Plan
              </h2>
              <div className="p-4 text-sm font-medium">
                {integrationData.minimum_plan?.toUpperCase()}
              </div>
            </div>

            {integrationData.params && integrationData.params.length > 0 ? (
              <div className="h-full  border rounded-lg">
                <h2 className="text-xl flex  bg-accent border-b rounded-t-lg p-4 items-center gap-2 font-semibold mb-2">
                  <Plugs /> Connection Parameters
                </h2>
                <ul className="flex flex-wrap p-4 gap-4">
                  {integrationData.params.map((param) => (
                    <div
                      key={param.name}
                      className="flex bg-accent border-2 rounded-lg p-4 text-sm items-center gap-2"
                    >
                      <span className="font-medium">{param.label}</span> (
                      {param.type}){" "}
                      {param.required ? (
                        <Badge variant={"destructive"} className="text-xs">
                          Required
                        </Badge>
                      ) : (
                        <Badge variant={"default"} className="text-xs">
                          Optional
                        </Badge>
                      )}
                    </div>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="h-full border rounded-lg">
                <h2 className="text-xl flex  bg-accent border-b rounded-t-lg p-4 items-center gap-2 font-semibold mb-2">
                  <Plugs /> Connection Parameters
                </h2>
                <div className="p-4">No parameters found</div>
              </div>
            )}
          </section>
          {/* Display actions if toolData exists */}

          <div className="rounded-lg mt-8">
            {toolData ? (
              <>
                <h2 className="text-xl font-semibold mb-2">
                  Actions ({toolData.actions.length})
                </h2>
                {toolData.actions.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {toolData.actions.map((action) => (
                      <div
                        className="mt-2 border flex items-center p-4 h-full justify-between w-full rounded-xl"
                        key={action.action_id}
                      >
                        <div className="w-full">
                          <h3 className="font-medium">{action.name}</h3>
                          <p className="text-sm text-gray-500">
                            {action.description.human}
                          </p>
                        </div>
                        <HeroButton
                          href={`/integrations/${id}/actions/${action.action_id}`}
                        >
                          Read more
                        </HeroButton>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No actions available for this integration.
                  </p>
                )}
              </>
            ) : (
              <p className="text-gray-500">
                No actions available. Showing basic integration details.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
