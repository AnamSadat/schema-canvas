import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { APP_NAME } from "@/constants";

// ========================
// Terms of Service Page
// ========================

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container py-12">
        <div className="mx-auto max-w-3xl prose prose-neutral dark:prose-invert">
          <h1>Terms of Service</h1>
          <p className="lead">Last updated: January 2026</p>

          <p>
            Please read these Terms of Service (&quot;Terms&quot;) carefully
            before using {APP_NAME}
            (&quot;Service&quot;). By using the Service, you agree to be bound
            by these Terms.
          </p>

          <h2>1. Acceptable Use</h2>
          <p>
            You agree to use {APP_NAME} only for lawful purposes and in
            accordance with these Terms. You agree not to:
          </p>
          <ul>
            <li>
              Use the Service to access databases you do not have authorization
              to access
            </li>
            <li>
              Attempt to probe, scan, or test the vulnerability of the Service
            </li>
            <li>Use the Service to generate ERDs for malicious purposes</li>
            <li>
              Interfere with or disrupt the Service or servers connected to the
              Service
            </li>
            <li>
              Use automated systems to access the Service in a manner that sends
              more requests than a human can reasonably produce
            </li>
          </ul>

          <h2>2. Database Access Authorization</h2>
          <p>By using {APP_NAME}, you represent and warrant that:</p>
          <ul>
            <li>
              You have proper authorization to access the database you are
              connecting to
            </li>
            <li>You have the right to view and export the database schema</li>
            <li>
              Your use of the Service complies with your organization&apos;s
              security policies
            </li>
            <li>
              You are not violating any confidentiality agreements by using the
              Service
            </li>
          </ul>

          <h2>3. User Responsibility</h2>
          <p>You are solely responsible for:</p>
          <ul>
            <li>The security of your database credentials</li>
            <li>
              Ensuring your database connection is properly secured (SSL/TLS)
            </li>
            <li>
              Any actions taken using your database credentials through the
              Service
            </li>
            <li>
              Compliance with applicable data protection laws and regulations
            </li>
          </ul>

          <h2>4. Service Availability</h2>
          <p>
            We strive to provide reliable service, but we do not guarantee that{" "}
            {APP_NAME} will be available at all times. The Service may be
            temporarily unavailable due to maintenance, updates, or
            circumstances beyond our control.
          </p>

          <h2>5. Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS
            AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO:
          </p>
          <ul>
            <li>Implied warranties of merchantability</li>
            <li>Fitness for a particular purpose</li>
            <li>Non-infringement</li>
            <li>Accuracy or completeness of generated ERD diagrams</li>
          </ul>

          <h2>6. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, {APP_NAME.toUpperCase()} AND
            ITS OPERATORS SHALL NOT BE LIABLE FOR ANY:
          </p>
          <ul>
            <li>
              Indirect, incidental, special, consequential, or punitive damages
            </li>
            <li>
              Loss of profits, data, use, goodwill, or other intangible losses
            </li>
            <li>Damages resulting from unauthorized access to your database</li>
            <li>
              Damages resulting from any interruption or cessation of the
              Service
            </li>
            <li>
              Damages resulting from any bugs, viruses, or other harmful code
            </li>
          </ul>

          <h2>7. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless {APP_NAME} and its
            operators from any claims, damages, losses, liabilities, and
            expenses (including legal fees) arising from:
          </p>
          <ul>
            <li>Your use of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any third-party rights</li>
            <li>Unauthorized access to databases using your credentials</li>
          </ul>

          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will
            provide notice of significant changes by posting the new Terms on
            this page and updating the &quot;Last updated&quot; date. Your
            continued use of the Service after changes constitutes acceptance of
            the new Terms.
          </p>

          <h2>9. Termination</h2>
          <p>
            We may terminate or suspend your access to the Service immediately,
            without prior notice, for any reason, including breach of these
            Terms.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            applicable laws, without regard to conflict of law principles.
          </p>

          <h2>11. Contact</h2>
          <p>
            If you have any questions about these Terms, please contact us at
            legal@schemacanvas.app
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
