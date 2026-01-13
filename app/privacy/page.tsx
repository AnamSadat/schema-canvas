import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { APP_NAME } from "@/constants";
import {
  Shield,
  Lock,
  Eye,
  Database,
  Cookie,
  Mail,
  CheckCircle2,
} from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative border-b border-border/50 bg-card/30">
          <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent" />
          <div className="container relative py-16 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Privacy Policy
              </h1>
              <p className="mt-4 text-muted-foreground text-lg">
                Last updated: January 2026
              </p>
            </div>
          </div>
        </section>

        {/* Highlight Box */}
        <section className="py-8">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg mb-2">
                      Your Privacy Matters
                    </h2>
                    <p className="text-muted-foreground">
                      At {APP_NAME}, we take your privacy seriously.
                      <strong className="text-foreground">
                        {" "}
                        We do not store your database credentials.
                      </strong>{" "}
                      Your connection details are processed in-memory only and
                      immediately discarded after schema introspection.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-12 md:pb-16">
          <div className="container">
            <div className="mx-auto max-w-3xl space-y-8">
              <PrivacySection
                icon={<Database className="h-5 w-5" />}
                title="Database Credentials"
                content={
                  <>
                    <p className="text-muted-foreground mb-4">
                      When you connect to your database through {APP_NAME}:
                    </p>
                    <ul className="space-y-3">
                      <PrivacyItem>
                        Credentials are processed in-memory only
                      </PrivacyItem>
                      <PrivacyItem>
                        Never written to disk, logged, or persisted
                      </PrivacyItem>
                      <PrivacyItem>
                        Immediately discarded after schema introspection
                      </PrivacyItem>
                      <PrivacyItem>
                        We only access schema structure, not your actual data
                      </PrivacyItem>
                    </ul>
                  </>
                }
              />

              <PrivacySection
                icon={<Eye className="h-5 w-5" />}
                title="What We Access"
                content={
                  <>
                    <p className="text-muted-foreground mb-4">
                      When generating an ERD, we only access:
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="rounded-lg bg-muted/50 px-4 py-2 text-sm">
                        Table names & structures
                      </div>
                      <div className="rounded-lg bg-muted/50 px-4 py-2 text-sm">
                        Column names & types
                      </div>
                      <div className="rounded-lg bg-muted/50 px-4 py-2 text-sm">
                        Foreign key relationships
                      </div>
                      <div className="rounded-lg bg-muted/50 px-4 py-2 text-sm">
                        Index information
                      </div>
                    </div>
                    <p className="text-sm text-primary font-medium">
                      ✓ We never access, read, or store your actual data rows.
                    </p>
                  </>
                }
              />

              <PrivacySection
                icon={<Lock className="h-5 w-5" />}
                title="SSL/TLS Encryption"
                content={
                  <p className="text-muted-foreground">
                    We strongly recommend using SSL connections when connecting
                    to your database. All connections from {APP_NAME} to your
                    database are encrypted in transit when SSL is enabled.
                  </p>
                }
              />

              <PrivacySection
                icon={<Shield className="h-5 w-5" />}
                title="Data Processing"
                content={
                  <>
                    <p className="text-muted-foreground mb-4">
                      Schema information is processed entirely in your browser
                      session. We do not:
                    </p>
                    <ul className="space-y-3">
                      <PrivacyItem negative>
                        Send your schema to external servers
                      </PrivacyItem>
                      <PrivacyItem negative>
                        Store schema information beyond your session
                      </PrivacyItem>
                      <PrivacyItem negative>
                        Share any information with third parties
                      </PrivacyItem>
                      <PrivacyItem negative>
                        Use your data for analytics or training
                      </PrivacyItem>
                    </ul>
                  </>
                }
              />

              <PrivacySection
                icon={<Cookie className="h-5 w-5" />}
                title="Local Storage & Cookies"
                content={
                  <>
                    <p className="text-muted-foreground mb-4">
                      We may use browser local storage to save:
                    </p>
                    <ul className="space-y-2 text-muted-foreground mb-4">
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        Your ERD layout preferences (node positions)
                      </li>
                      <li className="flex gap-2">
                        <span className="text-primary">•</span>
                        UI preferences (theme, sidebar state)
                      </li>
                    </ul>
                    <p className="text-sm text-primary font-medium">
                      ✓ We never store passwords or sensitive credentials in
                      local storage.
                    </p>
                  </>
                }
              />

              {/* Security Best Practices */}
              <div className="rounded-xl border border-border/50 bg-card/30 p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Security Best Practices
                </h2>
                <p className="text-muted-foreground mb-4">
                  We recommend the following when using {APP_NAME}:
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-border/50 bg-background/50 p-4">
                    <p className="font-medium text-sm mb-1">
                      Use Read-Only User
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Create a database user with minimal permissions
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/50 bg-background/50 p-4">
                    <p className="font-medium text-sm mb-1">Enable SSL</p>
                    <p className="text-xs text-muted-foreground">
                      Always use SSL for database connections
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/50 bg-background/50 p-4">
                    <p className="font-medium text-sm mb-1">
                      Minimal Permissions
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Only grant SELECT on information_schema
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/50 bg-background/50 p-4">
                    <p className="font-medium text-sm mb-1">Use Staging DB</p>
                    <p className="text-xs text-muted-foreground">
                      Consider using a replica for ERD generation
                    </p>
                  </div>
                </div>
              </div>

              <PrivacySection
                icon={<Mail className="h-5 w-5" />}
                title="Contact Us"
                content={
                  <p className="text-muted-foreground">
                    If you have any questions about this Privacy Policy, please
                    contact us at{" "}
                    <a
                      href="mailto:privacy@schemacanvas.app"
                      className="text-primary hover:underline"
                    >
                      privacy@schemacanvas.app
                    </a>
                  </p>
                }
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function PrivacySection({
  icon,
  title,
  content,
}: {
  icon?: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border/50 bg-card/30 p-6 transition-colors hover:bg-card/50">
      <div className="flex items-center gap-3 mb-4">
        {icon && <div className="text-primary">{icon}</div>}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {content}
    </div>
  );
}

function PrivacyItem({
  children,
  negative = false,
}: {
  children: React.ReactNode;
  negative?: boolean;
}) {
  return (
    <li className="flex items-center gap-3 text-muted-foreground">
      <div
        className={`rounded-full p-1 ${
          negative ? "bg-destructive/10" : "bg-primary/10"
        }`}
      >
        {negative ? (
          <span className="block h-3 w-3 text-destructive text-xs text-center leading-3">
            ✕
          </span>
        ) : (
          <CheckCircle2 className="h-3 w-3 text-primary" />
        )}
      </div>
      {children}
    </li>
  );
}
