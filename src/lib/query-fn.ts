import { Integration } from "@/types/integration";

export const getAllIntegrations = async () => {
  try {
    const response = await fetch(
      "https://stack-us-east-1.onrender.com/connections/available"
    );
    const updatedData: Integration[] = await response.json();
    return updatedData;
  } catch (error) {
    console.error("Error refreshing integrations:", error);
  }
};
