import Link from "next/link";
import { Database } from "lucide-react";
import { APP_NAME, FOOTER_LINKS } from "@/constants";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/10">
              <Database className="h-3 w-3 text-primary" />
            </div>
            <span>{APP_NAME}</span>
            <span className="text-border">·</span>
            <span>
              © {new Date().getFullYear()} Anam Sadat. All rights reserved.
            </span>
          </div>

          <nav className="flex items-center gap-6 text-sm">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
