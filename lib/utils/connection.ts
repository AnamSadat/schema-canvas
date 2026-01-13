import { ConnectionFormData } from "@/types/schema";

/**
 * Parse connection URL to ConnectionFormData
 * Format: postgresql://user:pass@host:port/database?ssl=true
 * Format: mysql://user:pass@host:port/database
 */
export function parseConnectionUrl(url: string): ConnectionFormData | null {
  try {
    const urlObj = new URL(url);

    const dialect = urlObj.protocol.replace(":", "") as "postgresql" | "mysql";
    if (dialect !== "postgresql" && dialect !== "mysql") {
      return null;
    }

    const host = urlObj.hostname;
    const port = urlObj.port || (dialect === "postgresql" ? "5432" : "3306");
    const username = decodeURIComponent(urlObj.username);
    const password = decodeURIComponent(urlObj.password);
    const database = urlObj.pathname.replace("/", "");
    const ssl =
      urlObj.searchParams.get("ssl") === "true" ||
      urlObj.searchParams.get("sslmode") === "require";

    return {
      dialect,
      host,
      port,
      username,
      password,
      database,
      ssl,
    };
  } catch {
    return null;
  }
}
