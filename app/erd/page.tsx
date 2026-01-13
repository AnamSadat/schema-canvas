"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ReactFlowProvider } from "@xyflow/react";

import { useERDStore } from "@/lib/store/erd-store";
import { getMockSchema } from "@/lib/schema/mock-data";
import { SidebarNavigator } from "@/components/erd/sidebar-navigator";
import { ERDCanvas } from "@/components/erd/erd-canvas";
import { EmptyState } from "@/components/erd/empty-state";
import { LoadingState } from "@/components/erd/loading-state";
import { DatabaseDialect } from "@/types/schema";

// ========================
// ERD Viewer Content
// ========================

function ERDViewerContent() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get("demo") === "true";
  const dialect =
    (searchParams.get("dialect") as DatabaseDialect) || "postgresql";
  const dbName = searchParams.get("db") || "demo_db";

  const { schema, setSchema, isLoading, setLoading } = useERDStore();

  // Load demo schema jika demo mode
  useEffect(() => {
    if (isDemo && !schema) {
      setLoading(true);
      // Simulasi loading untuk demo
      setTimeout(() => {
        setSchema(getMockSchema(dialect, dbName));
        setLoading(false);
      }, 1000);
    }
  }, [isDemo, dialect, dbName, schema, setSchema, setLoading]);

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Empty state - tidak ada schema
  if (!schema) {
    return <EmptyState />;
  }

  // ERD Viewer
  return (
    <div className="flex h-screen">
      <SidebarNavigator />
      <div className="flex-1">
        <ERDCanvas />
      </div>
    </div>
  );
}

// ========================
// ERD Viewer Page
// ========================

export default function ERDPage() {
  return (
    <ReactFlowProvider>
      <Suspense fallback={<LoadingState />}>
        <ERDViewerContent />
      </Suspense>
    </ReactFlowProvider>
  );
}
