import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { APP_NAME } from "@/constants";
import { FileText, Shield, AlertTriangle, Scale } from "lucide-react";

export default function TermsPage() {
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
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                Terms of Service
              </h1>
              <p className="mt-4 text-muted-foreground text-lg">
                Last updated: January 2026
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              {/* Intro */}
              <div className="rounded-xl border border-border/50 bg-card/50 p-6 mb-8">
                <p className="text-muted-foreground">
                  Please read these Terms of Service (&quot;Terms&quot;)
                  carefully before using {APP_NAME} (&quot;Service&quot;). By
                  using the Service, you agree to be bound by these Terms.
                </p>
              </div>

              {/* Sections */}
              <div className="space-y-8">
                <TermsSection
                  icon={<Shield className="h-5 w-5" />}
                  title="1. Acceptable Use"
                  content={
                    <>
                      <p className="text-muted-foreground mb-4">
                        You agree to use {APP_NAME} only for lawful purposes and
                        in accordance with these Terms. You agree not to:
                      </p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          Use the Service to access databases you do not have
                          authorization to access
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          Attempt to probe, scan, or test the vulnerability of
                          the Service
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          Use the Service to generate ERDs for malicious
                          purposes
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          Interfere with or disrupt the Service or servers
                          connected to the Service
                        </li>
                      </ul>
                    </>
                  }
                />

                <TermsSection
                  icon={<Scale className="h-5 w-5" />}
                  title="2. Database Access Authorization"
                  content={
                    <>
                      <p className="text-muted-foreground mb-4">
                        By using {APP_NAME}, you represent and warrant that:
                      </p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          You have proper authorization to access the database
                          you are connecting to
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          You have the right to view and export the database
                          schema
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          Your use complies with your organization&apos;s
                          security policies
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          You are not violating any confidentiality agreements
                        </li>
                      </ul>
                    </>
                  }
                />

                <TermsSection
                  icon={<AlertTriangle className="h-5 w-5" />}
                  title="3. User Responsibility"
                  content={
                    <>
                      <p className="text-muted-foreground mb-4">
                        You are solely responsible for:
                      </p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          The security of your database credentials
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          Ensuring your database connection is properly secured
                          (SSL/TLS)
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          Any actions taken using your database credentials
                          through the Service
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          Compliance with applicable data protection laws and
                          regulations
                        </li>
                      </ul>
                    </>
                  }
                />

                <TermsSection
                  title="4. Service Availability"
                  content={
                    <p className="text-muted-foreground">
                      We strive to provide reliable service, but we do not
                      guarantee that {APP_NAME} will be available at all times.
                      The Service may be temporarily unavailable due to
                      maintenance, updates, or circumstances beyond our control.
                    </p>
                  }
                />

                <TermsSection
                  title="5. Disclaimer of Warranties"
                  content={
                    <>
                      <p className="text-muted-foreground mb-4">
                        THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS
                        AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND,
                        INCLUDING:
                      </p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          Implied warranties of merchantability
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          Fitness for a particular purpose
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          Accuracy or completeness of generated ERD diagrams
                        </li>
                      </ul>
                    </>
                  }
                />

                <TermsSection
                  title="6. Limitation of Liability"
                  content={
                    <p className="text-muted-foreground">
                      TO THE MAXIMUM EXTENT PERMITTED BY LAW,{" "}
                      {APP_NAME.toUpperCase()} AND ITS OPERATORS SHALL NOT BE
                      LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                      CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF
                      PROFITS, DATA, OR OTHER INTANGIBLE LOSSES.
                    </p>
                  }
                />

                <TermsSection
                  title="7. Changes to Terms"
                  content={
                    <p className="text-muted-foreground">
                      We reserve the right to modify these Terms at any time. We
                      will provide notice of significant changes by posting the
                      new Terms on this page and updating the &quot;Last
                      updated&quot; date. Your continued use of the Service
                      after changes constitutes acceptance of the new Terms.
                    </p>
                  }
                />

                <TermsSection
                  title="8. Contact"
                  content={
                    <p className="text-muted-foreground">
                      If you have any questions about these Terms, please
                      contact us at{" "}
                      <a
                        href="mailto:legal@schemacanvas.app"
                        className="text-primary hover:underline"
                      >
                        legal@schemacanvas.app
                      </a>
                    </p>
                  }
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function TermsSection({
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
