import { Integration } from "@/types/integration";

export const getIntegrationImageUrl = (name: string, icon: string) => {
  return `https://stack-us-east-1.onrender.com/integrations/${name.toLowerCase()}/icon/${icon}`;
};

export async function getIntegrationData(
  id: string
): Promise<Integration | null> {
  try {
    const response = await fetch(
      "https://stack-us-east-1.onrender.com/connections/available"
    );

    if (!response.ok) throw new Error("Failed to fetch integrations");

    const data: Integration[] = await response.json();
    return data.find((integration) => integration.id === id) || null;
  } catch (error) {
    console.error("Error fetching integration data:", error);
    return null;
  }
}

export async function fetchIntegrations(): Promise<Integration[]> {
  const response = await fetch(
    "https://stack-us-east-1.onrender.com/connections/available"
  );
  return await response.json();
}
