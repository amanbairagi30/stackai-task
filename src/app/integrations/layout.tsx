import { Metadata } from "next";

export const metadata: Metadata = {
  title: "StackAI - Integrations",
  description: "StackAI - Integrations",
};

export default function IntegrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
