import Link from "next/link";
import { Database, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyState() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Database className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold mb-3">No Schema Loaded</h2>
        <p className="text-muted-foreground mb-8">
          Connect to your database to generate an ERD diagram. We support MySQL
          and PostgreSQL.
        </p>
        <Button size="lg" asChild>
          <Link href="/connect">
            Connect Database
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
