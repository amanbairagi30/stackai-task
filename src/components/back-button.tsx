"use client";
import { ArrowLeft } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const BackButton = ({ text }: { text: string }) => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      variant={"secondary"}
      className="flex gap-2 font-semibold bg-accent/60 w-fit border px-2 py-1 rounded-md cursor-pointer items-center mb-6"
    >
      <ArrowLeft className="size-5" />
      {text}
    </Button>
  );
};
