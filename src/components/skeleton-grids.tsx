import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";
interface SkeletonGridsProps {
  className?: string;
}

export function SkeletonGrids({ className }: SkeletonGridsProps) {
  return (
    <div
      className={cn(
        "grid gap-4 md:gap-6 grid-cols-1 px-4 mb-10 md:grid-cols-2 lg:grid-cols-3 w-full",
        className
      )}
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-full border py-4 px-4 rounded-lg">
          <Card className="flex bg-transparent border-2 flex-col p-0 h-full border-none outline-none shadow-none">
            <CardHeader className="p-0">
              <Skeleton className="size-16 rounded-lg" />
              <CardTitle className="mt-4 text-xl">
                <Skeleton className="h-7 w-3/4 mt-4" />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 h-full flex flex-col">
              <div className="space-y-2 mt-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </div>
              <div className="mt-4 flex items-end flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-6 w-16 rounded-sm" />
                ))}
              </div>
            </CardContent>
            <div className="mt-4">
              <Skeleton className="h-9 w-32 rounded-md" />
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
