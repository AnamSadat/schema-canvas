// ========================
// Schema Types untuk ERD
// ========================

export interface Column {
  name: string;
  type: string;
  pk?: boolean; // Primary Key
  fk?: boolean; // Foreign Key
  unique?: boolean;
  nullable?: boolean;
  default?: string;
}

export interface Table {
  name: string;
  columns: Column[];
  schema?: string; // untuk PostgreSQL schema (public, etc)
}

export type RelationType =
  | "one-to-one"
  | "one-to-many"
  | "many-to-one"
  | "many-to-many";

export interface Relation {
  fromTable: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
  type: RelationType;
}

export interface DatabaseSchema {
  name?: string; // nama database (openmusic, book, etc)
  tables: Table[];
  relations: Relation[];
  dialect?: "mysql" | "postgresql";
}

// ========================
// Connection Types
// ========================

export type DatabaseDialect = "mysql" | "postgresql";

export interface ConnectionFormData {
  dialect: DatabaseDialect;
  host: string;
  port: string;
  username: string;
  password: string;
  database: string;
  ssl: boolean;
}

export interface ConnectionUrlData {
  dialect: DatabaseDialect;
  url: string;
}

// ========================
// ERD Viewer Types
// ========================

export interface TableNodeData extends Record<string, unknown> {
  table: Table;
  isHighlighted?: boolean;
  highlightedColumn?: string;
  sourceColumns?: string[]; // columns that have outgoing relations (FK)
  targetColumns?: string[]; // columns that are referenced (PK targets)
}

export interface ERDState {
  schema: DatabaseSchema | null;
  selectedTable: string | null;
  selectedColumn: string | null;
  searchQuery: string;
  showColumns: boolean;
}
