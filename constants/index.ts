// ========================
// App Constants
// ========================

export const APP_NAME = "SchemaCanvas";
export const APP_DESCRIPTION =
  "Generate ERD dari MySQL/PostgreSQL secara cepat dan rapi";

export const SUPPORTED_DIALECTS = [
  { value: "postgresql", label: "PostgreSQL", defaultPort: "5432" },
  { value: "mysql", label: "MySQL", defaultPort: "3306" },
] as const;

export const DEFAULT_PORTS: Record<string, string> = {
  postgresql: "5432",
  mysql: "3306",
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/connect", label: "Connect" },
] as const;

export const FOOTER_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

// Security messages
export const SECURITY_NOTICE = {
  title: "Your credentials are safe",
  description:
    "We don't store your database credentials. All connection data is processed in-memory and never logged or persisted.",
};
