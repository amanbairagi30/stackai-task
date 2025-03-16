"use client";

import Link from "next/link";

interface ActionProps {
  id: string;
  action: {
    action_id: string;
    name: string;
    description: { human: string };
  };
}

export default function ActionLink({ id, action }: ActionProps) {
  return (
    <Link href={`/integrations/${id}/actions/${action.action_id}`}>
      <div className="p-4 border rounded hover:bg-gray-50 cursor-pointer">
        <h3 className="font-medium">{action.name}</h3>
        <p className="text-sm text-gray-500">{action.description.human}</p>
      </div>
    </Link>
  );
}
