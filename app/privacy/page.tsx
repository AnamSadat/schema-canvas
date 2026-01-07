import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { APP_NAME } from "@/constants";

// ========================
// Privacy Policy Page
// ========================

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container py-12">
        <div className="mx-auto max-w-3xl prose prose-neutral dark:prose-invert">
          <h1>Privacy Policy</h1>
          <p className="lead">Last updated: January 2026</p>

          <p>
            At {APP_NAME}, we take your privacy seriously. This Privacy Policy
            explains how we handle your information when you use our database
            ERD generation service.
          </p>

          <h2>Database Credentials</h2>
          <p>
            <strong>We do not store your database credentials.</strong> When you
            connect to your database through {APP_NAME}:
          </p>
          <ul>
            <li>
              Your credentials (host, username, password, etc.) are processed
              in-memory only
            </li>
            <li>
              Credentials are never written to disk, logged, or persisted in any
              form
            </li>
            <li>
              Connection data is immediately discarded after schema
              introspection
            </li>
            <li>
              We do not have access to your actual database data, only the
              schema structure
            </li>
          </ul>

          <h2>What We Access</h2>
          <p>When generating an ERD, we only access:</p>
          <ul>
            <li>Table names and structures</li>
            <li>Column names, types, and constraints</li>
            <li>Foreign key relationships</li>
            <li>Index information</li>
          </ul>
          <p>
            <strong>
              We never access, read, or store your actual data rows.
            </strong>
          </p>

          <h2>SSL/TLS Encryption</h2>
          <p>
            We strongly recommend using SSL connections when connecting to your
            database. All connections from {APP_NAME} to your database are
            encrypted in transit when SSL is enabled.
          </p>

          <h2>Data Processing</h2>
          <p>
            Schema information is processed entirely in your browser session. We
            do not:
          </p>
          <ul>
            <li>Send your schema to external servers for processing</li>
            <li>Store schema information beyond your browser session</li>
            <li>Share any information with third parties</li>
            <li>Use your data for analytics or training purposes</li>
          </ul>

          <h2>Local Storage</h2>
          <p>We may use browser local storage to save:</p>
          <ul>
            <li>Your ERD layout preferences (node positions)</li>
            <li>UI preferences (theme, sidebar state)</li>
          </ul>
          <p>
            <strong>
              We never store passwords or sensitive credentials in local
              storage.
            </strong>
          </p>

          <h2>Cookies</h2>
          <p>
            {APP_NAME} uses minimal cookies for essential functionality only. We
            do not use tracking cookies or third-party analytics.
          </p>

          <h2>Security Best Practices</h2>
          <p>We recommend the following when using {APP_NAME}:</p>
          <ul>
            <li>Use a read-only database user when possible</li>
            <li>Always enable SSL for database connections</li>
            <li>Use database users with minimal required permissions</li>
            <li>
              Consider using a replica or staging database for ERD generation
            </li>
          </ul>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the &quot;Last updated&quot; date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at privacy@schemacanvas.app
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
