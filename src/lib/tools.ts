import { Tool } from "@/types/integration";

export async function fetchTools(): Promise<Tool[]> {
  const response = await fetch(
    "https://stack-us-east-1.onrender.com/tools/stackai",
    {
      headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
      },
    }
  );
  return await response.json();
}

export async function getFilteredToolsData(id: string): Promise<Tool | null> {
  try {
    const response = await fetch(
      "https://stack-us-east-1.onrender.com/tools/stackai",
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch tool data");

    const data: Tool[] = await response.json();
    return data.find((tool) => tool.provider_id === id) || null;
  } catch (error) {
    console.error("Error fetching tool data:", error);
    return null;
  }
}

export async function getToolsData() {
  try {
    const response = await fetch(
      "https://stack-us-east-1.onrender.com/tools/stackai",
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
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
