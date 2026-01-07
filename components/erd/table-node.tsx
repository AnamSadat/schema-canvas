"use client";

import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { Key, Link2, Fingerprint, Table2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TableNodeData, Column } from "@/types/schema";

function ColumnRow({
  column,
  tableName,
  isHighlighted,
  isSource,
  isTarget,
}: {
  column: Column;
  tableName: string;
  isHighlighted: boolean;
  isSource: boolean;
  isTarget: boolean;
}) {
  const handleId = `${tableName}-${column.name}`;

  return (
    <div
      className={cn(
        "group relative flex items-center gap-2 px-3 py-1.5 text-xs transition-colors",
        isHighlighted && "bg-primary/20"
      )}
    >
      {/* Left Handle - for PK being referenced (invisible) */}
      {isTarget && (
        <Handle
          type="target"
          position={Position.Left}
          id={handleId}
          className="w-1! h-1! opacity-0! left-0!"
        />
      )}

      {/* Right Handle - for FK pointing out (invisible) */}
      {isSource && (
        <Handle
          type="source"
          position={Position.Right}
          id={handleId}
          className="w-1! h-1! opacity-0! right-0!"
        />
      )}

      {/* Column indicators */}
      <div className="flex items-center gap-0.5 w-5 shrink-0">
        {column.pk && <Key className="h-3 w-3 text-amber-400" />}
        {column.fk && <Link2 className="h-3 w-3 text-blue-400" />}
        {column.unique && !column.pk && (
          <Fingerprint className="h-3 w-3 text-purple-400" />
        )}
      </div>

      {/* Column name */}
      <span
        className={cn(
          "flex-1 font-mono truncate",
          column.pk && "font-semibold text-amber-400",
          column.fk && "text-blue-400",
          column.nullable && !column.pk && !column.fk && "text-muted-foreground"
        )}
      >
        {column.name}
      </span>

      {/* Column type */}
      <span className="text-muted-foreground font-mono text-[10px] truncate max-w-[80px]">
        {column.type}
      </span>
    </div>
  );
}

interface TableNodeProps {
  data: TableNodeData;
}

function TableNodeComponent({ data }: TableNodeProps) {
  const {
    table,
    isHighlighted,
    highlightedColumn,
    sourceColumns = [],
    targetColumns = [],
  } = data;

  return (
    <div
      className={cn(
        "min-w-[280px] rounded-lg border bg-card shadow-lg transition-all",
        isHighlighted
          ? "ring-2 ring-primary border-primary shadow-primary/20"
          : "border-border/50 hover:border-border"
      )}
    >
      {/* Table Header */}
      <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-3 py-2.5 rounded-t-lg">
        <Table2 className="h-4 w-4 text-primary" />
        <span className="font-semibold text-sm truncate flex-1">
          {table.name}
        </span>
        <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
          {table.columns.length} cols
        </span>
      </div>

      {/* Columns */}
      <div className="divide-y divide-border/30">
        {table.columns.map((column: Column) => (
          <ColumnRow
            key={column.name}
            column={column}
            tableName={table.name}
            isHighlighted={highlightedColumn === column.name}
            isSource={sourceColumns.includes(column.name)}
            isTarget={targetColumns.includes(column.name)}
          />
        ))}
      </div>
    </div>
  );
}

export const TableNode = memo(TableNodeComponent);
