"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Table2,
  ChevronRight,
  Key,
  Link2,
  Fingerprint,
} from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import { cn } from "@/lib/utils";
import { useERDStore } from "@/lib/store/erd-store";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export function SidebarNavigator() {
  const { setCenter } = useReactFlow();
  const {
    schema,
    nodes,
    selectedTable,
    selectedColumn,
    searchQuery,
    setSearchQuery,
    selectTable,
    selectColumn,
    clearSelection,
    isLoading,
  } = useERDStore();

  const [expandedTables, setExpandedTables] = useState<Set<string>>(new Set());

  const filteredTables = useMemo(() => {
    if (!schema) return [];

    const query = searchQuery.toLowerCase();
    if (!query) return schema.tables;

    return schema.tables.filter((table) => {
      const tableMatch = table.name.toLowerCase().includes(query);
      const columnMatch = table.columns.some((col) =>
        col.name.toLowerCase().includes(query)
      );
      return tableMatch || columnMatch;
    });
  }, [schema, searchQuery]);

  const toggleExpand = (tableName: string) => {
    setExpandedTables((prev) => {
      const next = new Set(prev);
      if (next.has(tableName)) {
        next.delete(tableName);
      } else {
        next.add(tableName);
      }
      return next;
    });
  };

  const handleTableClick = (tableName: string) => {
    // Toggle selection - if already selected, deselect
    if (selectedTable === tableName && !selectedColumn) {
      clearSelection();
      return;
    }

    selectTable(tableName);

    const node = nodes.find((n) => n.id === tableName);
    if (node) {
      setCenter(node.position.x + 140, node.position.y + 100, {
        zoom: 1,
        duration: 500,
      });
    }
  };

  const handleExpandClick = (e: React.MouseEvent, tableName: string) => {
    e.stopPropagation();
    toggleExpand(tableName);
  };

  const handleColumnClick = (tableName: string, columnName: string) => {
    // Toggle selection - if already selected, deselect
    if (selectedTable === tableName && selectedColumn === columnName) {
      clearSelection();
      return;
    }

    selectColumn(tableName, columnName);

    const node = nodes.find((n) => n.id === tableName);
    if (node) {
      setCenter(node.position.x + 140, node.position.y + 100, {
        zoom: 1.2,
        duration: 500,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="w-72 border-r border-border/50 bg-card/30 flex flex-col">
        <div className="p-4 border-b border-border/50">
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="p-4 space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 border-r border-border/50 bg-card/30 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <h2 className="font-semibold mb-3">Tables</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tables, columns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background/50"
          />
        </div>
      </div>

      {/* Table List */}
      <div className="flex-1 min-h-0 overflow-y-auto sidebar-scroll">
        <div className="p-2">
          {filteredTables.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No tables found
            </p>
          ) : (
            filteredTables.map((table, tableIndex) => {
              const isExpanded = expandedTables.has(table.name);
              const isSelected = selectedTable === table.name;

              return (
                <div key={`${table.name}-${tableIndex}`} className="mb-1">
                  <div
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
                      "hover:bg-accent",
                      isSelected &&
                        !selectedColumn &&
                        "bg-primary/10 text-primary"
                    )}
                  >
                    <button
                      onClick={(e) => handleExpandClick(e, table.name)}
                      className="p-0.5 -ml-1 hover:bg-accent rounded shrink-0"
                    >
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform",
                          isExpanded && "rotate-90"
                        )}
                      />
                    </button>
                    <button
                      onClick={() => handleTableClick(table.name)}
                      className="flex-1 flex items-center gap-2 text-left"
                    >
                      <Table2
                        className={cn(
                          "h-4 w-4 shrink-0",
                          isSelected && !selectedColumn
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      />
                      <span className="flex-1 truncate font-medium">
                        {table.name}
                      </span>
                    </button>
                    <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                      {table.columns.length}
                    </span>
                  </div>

                  {isExpanded && (
                    <div className="ml-5 mt-1 space-y-0.5 border-l border-border/50 pl-3">
                      {table.columns.map((column) => {
                        const isColumnSelected =
                          selectedTable === table.name &&
                          selectedColumn === column.name;

                        return (
                          <button
                            key={column.name}
                            onClick={() =>
                              handleColumnClick(table.name, column.name)
                            }
                            className={cn(
                              "w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors",
                              "hover:bg-accent/50",
                              isColumnSelected && "bg-primary/10 text-primary"
                            )}
                          >
                            <span className="w-4 flex justify-center shrink-0">
                              {column.pk && (
                                <Key className="h-3 w-3 text-amber-400" />
                              )}
                              {column.fk && !column.pk && (
                                <Link2 className="h-3 w-3 text-blue-400" />
                              )}
                              {column.unique && !column.pk && !column.fk && (
                                <Fingerprint className="h-3 w-3 text-purple-400" />
                              )}
                            </span>
                            <span className="flex-1 text-left truncate font-mono">
                              {column.name}
                            </span>
                            <span className="text-muted-foreground font-mono text-[10px]">
                              {column.type.split("(")[0]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Stats */}
      {schema && (
        <div className="p-4 border-t border-border/50 text-xs text-muted-foreground flex items-center justify-between">
          <span>{schema.tables.length} tables</span>
          <span>{schema.relations.length} relations</span>
        </div>
      )}
    </div>
  );
}
