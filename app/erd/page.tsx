"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ReactFlowProvider } from "@xyflow/react";

import { useERDStore } from "@/lib/store/erd-store";
import { mockSchema } from "@/lib/schema/mock-data";
import { SidebarNavigator } from "@/components/erd/sidebar-navigator";
import { ERDCanvas } from "@/components/erd/erd-canvas";
import { EmptyState } from "@/components/erd/empty-state";
import { LoadingState } from "@/components/erd/loading-state";

// ========================
// ERD Viewer Content
// ========================

function ERDViewerContent() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get("demo") === "true";

  const { schema, setSchema, isLoading, setLoading } = useERDStore();

  // Load schema on mount
  useEffect(() => {
    const loadSchema = async () => {
      if (isDemo && !schema) {
        setLoading(true);

        // Simulasi loading
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Load mock schema
        setSchema(mockSchema);
        setLoading(false);
      }
    };

    loadSchema();
  }, [isDemo, schema, setSchema, setLoading]);

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Empty state
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
