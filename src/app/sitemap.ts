import { fetchIntegrations } from "@/lib/integration";
import { fetchTools } from "@/lib/tools";

export const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function sitemap() {
  const [integrations, tools] = await Promise.all([
    fetchIntegrations(),
    fetchTools(),
  ]);

  const routes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 1.0,
    },
  ];

  integrations.forEach((integration) => {
    routes.push({
      url: `${baseUrl}/integrations/${integration.id}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "yearly",
      priority: 0.8,
    });
  });

  tools.forEach((tool) => {
    tool.actions.forEach((action) => {
      routes.push({
        url: `${baseUrl}/integrations/${tool.provider_id}/${action.action_id}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.6,
      });
    });
  });

  return routes;
}
