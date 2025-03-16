import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackButton } from "@/components/back-button";
import { getTypeColor } from "@/lib/action";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Info } from "lucide-react";

const AUTH_TOKEN = process.env.AUTH_TOKEN!;

interface Tool {
  provider_id: string;
  name: string;
  actions: {
    action_id: string;
    name: string;
    description: { human: string };
    input_params: {
      name: string;
      label: string;
      type: string;
      human_description: string;
    }[];
    output_params: {
      name: string;
      label: string;
      type: string;
      human_description: string;
    }[];
  }[];
}

async function getToolsData() {
  try {
    const response = await fetch(
      "https://stack-us-east-1.onrender.com/tools/stackai",
      {
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        next: {
          revalidate: 60, // Revalidate every 60 seconds
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch tools data");

    return (await response.json()) as Tool[];
  } catch (error) {
    console.error("Error fetching tools data:", error);
    return [];
  }
}

export default async function ActionDetailPage({
  params,
}: {
  params: Promise<{ id: string; actionId: string }>;
}) {
  const { id, actionId } = await params;
  const tools = await getToolsData();

  const toolData = tools.find((tool) => tool.provider_id === id);
  const action = toolData?.actions.find((a) => a.action_id === actionId);

  if (!toolData || !action) {
    return (
      <div className="container max-w-5xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
          <Info className="h-12 w-12 text-muted-foreground" />
          <h2 className="text-2xl font-bold">Action not found</h2>
          <p className="text-muted-foreground max-w-md">
            The action you&apos;re looking for doesn&apos;t exist or may have
            been removed.
          </p>
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to tools
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <BackButton text={`${toolData.name} Integration`} />
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">{action.name}</h1>
          <Badge variant="outline" className="ml-2">
            {id}
          </Badge>
        </div>
        <p className="text-xl text-muted-foreground">
          {action.description.human}
        </p>
      </div>

      {/* Input Parameters */}
      <Card className="mb-6 shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">Input Parameters</CardTitle>
          <CardDescription>
            Parameters required to execute this action
          </CardDescription>
        </CardHeader>
        <CardContent>
          {action.input_params.length > 0 ? (
            <div className="space-y-6">
              {action.input_params.map((param) => (
                <div key={param.name} className="group">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-medium text-lg">{param.label}</h3>
                    <Badge
                      className={`${getTypeColor(param.type)} transition-all`}
                    >
                      {param.type}
                    </Badge>
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                      {param.name}
                    </code>
                  </div>
                  <p className="text-muted-foreground">
                    {param.human_description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-6 text-center">
              <p className="text-muted-foreground">
                No input parameters required
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Output Parameters */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-xl">Output Parameters</CardTitle>
          <CardDescription>
            Data returned after the action is executed
          </CardDescription>
        </CardHeader>
        <CardContent>
          {action.output_params.length > 0 ? (
            <div className="space-y-6">
              {action.output_params.map((param) => (
                <div key={param.name} className="group">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-medium text-lg">{param.label}</h3>
                    <Badge
                      className={`${getTypeColor(param.type)} transition-all`}
                    >
                      {param.type}
                    </Badge>
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">
                      {param.name}
                    </code>
                  </div>
                  <p className="text-muted-foreground">
                    {param.human_description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-6 text-center">
              <p className="text-muted-foreground">No output parameters</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
