"use server";

import { Client as PgClient } from "pg";
import mysql from "mysql2/promise";
import {
  DatabaseSchema,
  ConnectionFormData,
  Table,
  Relation,
} from "@/types/schema";

// ========================
// PostgreSQL Schema Introspection
// ========================

async function getPostgresSchema(
  config: ConnectionFormData
): Promise<DatabaseSchema> {
  const client = new PgClient({
    host: config.host,
    port: parseInt(config.port),
    user: config.username,
    password: config.password,
    database: config.database,
    ssl: config.ssl ? { rejectUnauthorized: false } : false,
  });

  try {
    await client.connect();

    // Get all tables
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `);

    const tables: Table[] = [];

    for (const row of tablesResult.rows) {
      const tableName = row.table_name;

      // Get columns for each table
      const columnsResult = await client.query(
        `
        SELECT 
          c.column_name,
          c.data_type,
          c.character_maximum_length,
          c.is_nullable,
          c.column_default,
          CASE WHEN pk.column_name IS NOT NULL THEN true ELSE false END as is_primary_key,
          CASE WHEN fk.column_name IS NOT NULL THEN true ELSE false END as is_foreign_key,
          CASE WHEN uq.column_name IS NOT NULL THEN true ELSE false END as is_unique
        FROM information_schema.columns c
        LEFT JOIN (
          SELECT kcu.column_name
          FROM information_schema.table_constraints tc
          JOIN information_schema.key_column_usage kcu 
            ON tc.constraint_name = kcu.constraint_name
          WHERE tc.table_name = $1 
            AND tc.constraint_type = 'PRIMARY KEY'
        ) pk ON c.column_name = pk.column_name
        LEFT JOIN (
          SELECT kcu.column_name
          FROM information_schema.table_constraints tc
          JOIN information_schema.key_column_usage kcu 
            ON tc.constraint_name = kcu.constraint_name
          WHERE tc.table_name = $1 
            AND tc.constraint_type = 'FOREIGN KEY'
        ) fk ON c.column_name = fk.column_name
        LEFT JOIN (
          SELECT kcu.column_name
          FROM information_schema.table_constraints tc
          JOIN information_schema.key_column_usage kcu 
            ON tc.constraint_name = kcu.constraint_name
          WHERE tc.table_name = $1 
            AND tc.constraint_type = 'UNIQUE'
        ) uq ON c.column_name = uq.column_name
        WHERE c.table_name = $1 AND c.table_schema = 'public'
        ORDER BY c.ordinal_position
      `,
        [tableName]
      );

      tables.push({
        name: tableName,
        columns: columnsResult.rows.map((col) => ({
          name: col.column_name,
          type: col.character_maximum_length
            ? `${col.data_type}(${col.character_maximum_length})`
            : col.data_type,
          pk: col.is_primary_key,
          fk: col.is_foreign_key,
          unique: col.is_unique,
          nullable: col.is_nullable === "YES",
          default: col.column_default || undefined,
        })),
      });
    }

    // Get foreign key relations
    const relationsResult = await client.query(`
      SELECT
        tc.table_name as from_table,
        kcu.column_name as from_column,
        ccu.table_name as to_table,
        ccu.column_name as to_column
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
      JOIN information_schema.constraint_column_usage ccu
        ON tc.constraint_name = ccu.constraint_name
      WHERE tc.constraint_type = 'FOREIGN KEY'
        AND tc.table_schema = 'public'
    `);

    const relations: Relation[] = relationsResult.rows.map((rel) => ({
      fromTable: rel.from_table,
      fromColumn: rel.from_column,
      toTable: rel.to_table,
      toColumn: rel.to_column,
      type: "many-to-one" as const,
    }));

    return {
      name: config.database,
      dialect: "postgresql",
      tables,
      relations,
    };
  } finally {
    await client.end();
  }
}

// ========================
// MySQL Schema Introspection
// ========================

async function getMysqlSchema(
  config: ConnectionFormData
): Promise<DatabaseSchema> {
  const connection = await mysql.createConnection({
    host: config.host,
    port: parseInt(config.port),
    user: config.username,
    password: config.password,
    database: config.database,
    ssl: config.ssl ? { rejectUnauthorized: false } : undefined,
  });

  try {
    // Get all tables
    const [tablesRows] = await connection.query(
      `
      SELECT TABLE_NAME as table_name 
      FROM information_schema.tables 
      WHERE table_schema = ? 
        AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `,
      [config.database]
    );

    const tables: Table[] = [];

    // Handle different MySQL versions returning different case
    for (const row of tablesRows as Record<string, string>[]) {
      const tableName = row.table_name || row.TABLE_NAME;
      if (!tableName) continue;

      // Get columns for each table
      const [columnsRows] = await connection.query(
        `
        SELECT 
          c.COLUMN_NAME as column_name,
          c.DATA_TYPE as data_type,
          c.CHARACTER_MAXIMUM_LENGTH as char_max_length,
          c.IS_NULLABLE as is_nullable,
          c.COLUMN_DEFAULT as column_default,
          c.COLUMN_KEY as column_key
        FROM information_schema.columns c
        WHERE c.TABLE_NAME = ? AND c.TABLE_SCHEMA = ?
        ORDER BY c.ORDINAL_POSITION
      `,
        [tableName, config.database]
      );

      tables.push({
        name: tableName,
        columns: (columnsRows as Record<string, unknown>[]).map((col) => {
          const colName = (col.column_name || col.COLUMN_NAME) as string;
          const dataType = (col.data_type || col.DATA_TYPE) as string;
          const charMaxLength = (col.char_max_length ||
            col.CHARACTER_MAXIMUM_LENGTH) as number | null;
          const isNullable = (col.is_nullable || col.IS_NULLABLE) as string;
          const colDefault = (col.column_default || col.COLUMN_DEFAULT) as
            | string
            | null;
          const colKey = (col.column_key || col.COLUMN_KEY) as string;

          return {
            name: colName,
            type: charMaxLength ? `${dataType}(${charMaxLength})` : dataType,
            pk: colKey === "PRI",
            fk: colKey === "MUL",
            unique: colKey === "UNI",
            nullable: isNullable === "YES",
            default: colDefault || undefined,
          };
        }),
      });
    }

    // Get foreign key relations
    const [relationsRows] = await connection.query(
      `
      SELECT
        TABLE_NAME as from_table,
        COLUMN_NAME as from_column,
        REFERENCED_TABLE_NAME as to_table,
        REFERENCED_COLUMN_NAME as to_column
      FROM information_schema.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = ?
        AND REFERENCED_TABLE_NAME IS NOT NULL
    `,
      [config.database]
    );

    const relations: Relation[] = (
      relationsRows as Record<string, string>[]
    ).map((rel) => ({
      fromTable: rel.from_table || rel.TABLE_NAME,
      fromColumn: rel.from_column || rel.COLUMN_NAME,
      toTable: rel.to_table || rel.REFERENCED_TABLE_NAME,
      toColumn: rel.to_column || rel.REFERENCED_COLUMN_NAME,
      type: "many-to-one" as const,
    }));

    return {
      name: config.database,
      dialect: "mysql",
      tables,
      relations,
    };
  } finally {
    await connection.end();
  }
}

// ========================
// Exported Server Actions
// ========================

export async function testDatabaseConnection(
  config: ConnectionFormData
): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    if (config.dialect === "postgresql") {
      const client = new PgClient({
        host: config.host,
        port: parseInt(config.port),
        user: config.username,
        password: config.password,
        database: config.database,
        ssl: config.ssl ? { rejectUnauthorized: false } : false,
        connectionTimeoutMillis: 5000,
      });
      await client.connect();
      await client.end();
    } else {
      const connection = await mysql.createConnection({
        host: config.host,
        port: parseInt(config.port),
        user: config.username,
        password: config.password,
        database: config.database,
        ssl: config.ssl ? { rejectUnauthorized: false } : undefined,
        connectTimeout: 5000,
      });
      await connection.end();
    }
    return { success: true, message: "Connection successful!" };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Connection failed";
    return { success: false, message };
  }
}

export async function fetchDatabaseSchema(config: ConnectionFormData): Promise<{
  success: boolean;
  schema?: DatabaseSchema;
  error?: string;
}> {
  try {
    const schema =
      config.dialect === "postgresql"
        ? await getPostgresSchema(config)
        : await getMysqlSchema(config);

    return { success: true, schema };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch schema";
    return { success: false, error: message };
  }
}
