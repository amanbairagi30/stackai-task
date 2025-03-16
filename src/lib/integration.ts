export const getIntegrationImageUrl = (name: string, icon: string) => {
  return `https://stack-us-east-1.onrender.com/integrations/${name.toLowerCase()}/icon/${icon}`;
};
