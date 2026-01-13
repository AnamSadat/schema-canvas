"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useERDStore } from "@/lib/store/erd-store";

export function StoreReset() {
  const pathname = usePathname();
  const resetStore = useERDStore((state) => state.resetStore);

  useEffect(() => {
    // Reset store setiap kali user masuk ke home page
    if (pathname === "/") {
      resetStore();
    }
  }, [pathname, resetStore]);

  return null;
}
