import { Node, Edge } from "@xyflow/react";
import {
  DatabaseSchema,
  TableNodeData,
  Table,
  RelationType,
} from "@/types/schema";

const TABLE_BASE_HEIGHT = 60;
const COLUMN_HEIGHT = 28;
const GRID_GAP_X = 400;
const GRID_GAP_Y = 150;
const COLUMNS_PER_ROW = 3;

function calculateNodeHeight(table: Table): number {
  return TABLE_BASE_HEIGHT + table.columns.length * COLUMN_HEIGHT;
}

function calculateNodePosition(
  index: number,
  tables: Table[]
): { x: number; y: number } {
  const col = index % COLUMNS_PER_ROW;
  const row = Math.floor(index / COLUMNS_PER_ROW);

  let yOffset = 0;
  for (let r = 0; r < row; r++) {
    let maxHeightInRow = 0;
    for (let c = 0; c < COLUMNS_PER_ROW; c++) {
      const tableIndex = r * COLUMNS_PER_ROW + c;
      if (tableIndex < tables.length) {
        const height = calculateNodeHeight(tables[tableIndex]);
        maxHeightInRow = Math.max(maxHeightInRow, height);
      }
    }
    yOffset += maxHeightInRow + GRID_GAP_Y;
  }

  return {
    x: col * GRID_GAP_X,
    y: yOffset,
  };
}

/**
 * Get columns that have relations for each table
 * Only includes columns that are actually in the relations array
 */
function getRelationColumns(schema: DatabaseSchema): {
  sourceMap: Map<string, Set<string>>;
  targetMap: Map<string, Set<string>>;
} {
  const sourceMap = new Map<string, Set<string>>();
  const targetMap = new Map<string, Set<string>>();

  for (const relation of schema.relations) {
    // Skip self-referencing relations
    if (relation.fromTable === relation.toTable) continue;

    // Source: FK columns that point OUT to other tables
    if (!sourceMap.has(relation.fromTable)) {
      sourceMap.set(relation.fromTable, new Set());
    }
    sourceMap.get(relation.fromTable)!.add(relation.fromColumn);

    // Target: PK columns that are referenced BY other tables
    if (!targetMap.has(relation.toTable)) {
      targetMap.set(relation.toTable, new Set());
    }
    targetMap.get(relation.toTable)!.add(relation.toColumn);
  }

  return { sourceMap, targetMap };
}

export function buildNodes(schema: DatabaseSchema): Node<TableNodeData>[] {
  const { sourceMap, targetMap } = getRelationColumns(schema);

  // Track used ids to handle duplicates
  const usedIds = new Set<string>();

  return schema.tables.map((table, index) => {
    const position = calculateNodePosition(index, schema.tables);
    const sourceColumns = sourceMap.get(table.name);
    const targetColumns = targetMap.get(table.name);

    // Ensure unique node id - append index if duplicate
    let nodeId = table.name;
    if (usedIds.has(nodeId)) {
      nodeId = `${table.name}_${index}`;
    }
    usedIds.add(nodeId);

    return {
      id: nodeId,
      type: "tableNode",
      position,
      data: {
        table,
        isHighlighted: false,
        highlightedColumn: undefined,
        sourceColumns: sourceColumns ? Array.from(sourceColumns) : [],
        targetColumns: targetColumns ? Array.from(targetColumns) : [],
      },
    };
  });
}

export function buildEdges(schema: DatabaseSchema): Edge[] {
  return schema.relations
    .filter((relation) => relation.fromTable !== relation.toTable)
    .map((relation, index) => ({
      id: `edge-${index}-${relation.fromTable}-${relation.fromColumn}-${relation.toTable}-${relation.toColumn}`,
      source: relation.fromTable,
      target: relation.toTable,
      sourceHandle: `${relation.fromTable}-${relation.fromColumn}`,
      targetHandle: `${relation.toTable}-${relation.toColumn}`,
      type: "custom",
      data: {
        relationType: relation.type as RelationType,
        fromColumn: relation.fromColumn,
        toColumn: relation.toColumn,
      },
    }));
}

export function parseSchema(schema: DatabaseSchema): {
  nodes: Node<TableNodeData>[];
  edges: Edge[];
} {
  return {
    nodes: buildNodes(schema),
    edges: buildEdges(schema),
  };
}

// HOOK POINTS - untuk future API integration
export async function fetchSchemaFromAPI(
  _connectionId: string
): Promise<DatabaseSchema> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const { mockSchema } = await import("./mock-data");
  return mockSchema;
}
