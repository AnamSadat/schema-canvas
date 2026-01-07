"use client";

import Link from "next/link";
import { Database } from "lucide-react";
import { APP_NAME } from "@/constants";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2.5 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Database className="h-4 w-4 text-primary" />
          </div>
          <span className="text-lg">{APP_NAME}</span>
        </Link>

        <nav className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/connect">Connect</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/connect">Generate ERD</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
