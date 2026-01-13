import { DatabaseSchema } from "@/types/schema";
import { DatabaseDialect } from "@/types/schema";

// ========================
// Mock Schema untuk Demo
// ========================

const baseMockSchema = {
  tables: [
    {
      name: "users",
      columns: [
        { name: "id", type: "uuid", pk: true },
        { name: "email", type: "varchar(255)", unique: true },
        { name: "username", type: "varchar(100)", unique: true },
        { name: "password_hash", type: "varchar(255)" },
        { name: "full_name", type: "varchar(200)", nullable: true },
        { name: "avatar_url", type: "text", nullable: true },
        { name: "is_active", type: "boolean", default: "true" },
        { name: "created_at", type: "timestamp", default: "now()" },
        { name: "updated_at", type: "timestamp", default: "now()" },
      ],
    },
    {
      name: "organizations",
      columns: [
        { name: "id", type: "uuid", pk: true },
        { name: "name", type: "varchar(200)" },
        { name: "slug", type: "varchar(100)", unique: true },
        { name: "logo_url", type: "text", nullable: true },
        { name: "created_at", type: "timestamp", default: "now()" },
      ],
    },
    {
      name: "organization_members",
      columns: [
        { name: "id", type: "uuid", pk: true },
        { name: "organization_id", type: "uuid", fk: true },
        { name: "user_id", type: "uuid", fk: true },
        { name: "role", type: "varchar(50)", default: "'member'" },
        { name: "joined_at", type: "timestamp", default: "now()" },
      ],
    },
    {
      name: "projects",
      columns: [
        { name: "id", type: "uuid", pk: true },
        { name: "organization_id", type: "uuid", fk: true },
        { name: "name", type: "varchar(200)" },
        { name: "description", type: "text", nullable: true },
        { name: "is_public", type: "boolean", default: "false" },
        { name: "created_by", type: "uuid", fk: true },
        { name: "created_at", type: "timestamp", default: "now()" },
        { name: "updated_at", type: "timestamp", default: "now()" },
      ],
    },
    {
      name: "schemas",
      columns: [
        { name: "id", type: "uuid", pk: true },
        { name: "project_id", type: "uuid", fk: true },
        { name: "name", type: "varchar(100)" },
        { name: "version", type: "integer", default: "1" },
        { name: "schema_json", type: "jsonb" },
        { name: "created_at", type: "timestamp", default: "now()" },
      ],
    },
    {
      name: "connections",
      columns: [
        { name: "id", type: "uuid", pk: true },
        { name: "project_id", type: "uuid", fk: true },
        { name: "name", type: "varchar(100)" },
        { name: "dialect", type: "varchar(20)" },
        { name: "host", type: "varchar(255)" },
        { name: "port", type: "integer" },
        { name: "database", type: "varchar(100)" },
        { name: "username", type: "varchar(100)" },
        { name: "ssl_enabled", type: "boolean", default: "true" },
        { name: "created_at", type: "timestamp", default: "now()" },
      ],
    },
  ],
  relations: [
    {
      fromTable: "organization_members",
      fromColumn: "organization_id",
      toTable: "organizations",
      toColumn: "id",
      type: "many-to-one" as const,
    },
    {
      fromTable: "organization_members",
      fromColumn: "user_id",
      toTable: "users",
      toColumn: "id",
      type: "many-to-one" as const,
    },
    {
      fromTable: "projects",
      fromColumn: "organization_id",
      toTable: "organizations",
      toColumn: "id",
      type: "many-to-one" as const,
    },
    {
      fromTable: "projects",
      fromColumn: "created_by",
      toTable: "users",
      toColumn: "id",
      type: "many-to-one" as const,
    },
    {
      fromTable: "schemas",
      fromColumn: "project_id",
      toTable: "projects",
      toColumn: "id",
      type: "many-to-one" as const,
    },
    {
      fromTable: "connections",
      fromColumn: "project_id",
      toTable: "projects",
      toColumn: "id",
      type: "many-to-one" as const,
    },
  ],
};

export const getMockSchema = (
  dialect: DatabaseDialect = "postgresql",
  dbName: string = "demo_db"
): DatabaseSchema => ({
  name: dbName,
  dialect,
  ...baseMockSchema,
});

// Default export untuk backward compatibility
export const mockSchema: DatabaseSchema = getMockSchema(
  "postgresql",
  "demo_db"
);
