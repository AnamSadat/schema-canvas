import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingState() {
  return (
    <div className="flex h-full w-full">
      {/* Sidebar Skeleton */}
      <div className="w-72 border-r border-border/50 bg-card/30 p-4 space-y-4">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-10 w-full" />
        <div className="space-y-2 pt-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>

      {/* Canvas Loading */}
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Generating ERD...</p>
        </div>
      </div>
    </div>
  );
}
