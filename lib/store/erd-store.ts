import { create } from "zustand";
import { Node, Edge } from "@xyflow/react";
import { DatabaseSchema, TableNodeData } from "@/types/schema";
import { parseSchema } from "@/lib/schema/parser";

interface ERDStore {
  // State
  schema: DatabaseSchema | null;
  nodes: Node<TableNodeData>[];
  edges: Edge[];
  selectedTable: string | null;
  selectedColumn: string | null;
  searchQuery: string;
  showColumns: boolean;
  isLoading: boolean;

  // Actions
  setSchema: (schema: DatabaseSchema) => void;
  setNodes: (nodes: Node<TableNodeData>[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateEdges: (edges: Edge[]) => void;
  selectTable: (tableName: string | null) => void;
  selectColumn: (tableName: string | null, columnName: string | null) => void;
  clearSelection: () => void;
  setSearchQuery: (query: string) => void;
  toggleShowColumns: () => void;
  setLoading: (loading: boolean) => void;
  resetLayout: () => void;
  resetStore: () => void;
}

export const useERDStore = create<ERDStore>((set, get) => ({
  // Initial state
  schema: null,
  nodes: [],
  edges: [],
  selectedTable: null,
  selectedColumn: null,
  searchQuery: "",
  showColumns: true,
  isLoading: false,

  // Actions
  setSchema: (schema) => {
    // Deduplicate tables by name
    const uniqueTables = schema.tables.filter(
      (table, index, self) =>
        index === self.findIndex((t) => t.name === table.name)
    );
    const deduplicatedSchema = { ...schema, tables: uniqueTables };
    const { nodes, edges } = parseSchema(deduplicatedSchema);
    set({ schema: deduplicatedSchema, nodes, edges });
  },

  setNodes: (nodes) => set({ nodes }),

  setEdges: (edges) => set({ edges }),

  updateEdges: (edges) => set({ edges }),

  selectTable: (tableName) => {
    set({ selectedTable: tableName, selectedColumn: null });

    const { nodes } = get();
    const updatedNodes = nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        isHighlighted: node.id === tableName,
        highlightedColumn: undefined,
      },
    }));
    set({ nodes: updatedNodes });
  },

  selectColumn: (tableName, columnName) => {
    set({ selectedTable: tableName, selectedColumn: columnName });

    const { nodes } = get();
    const updatedNodes = nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        isHighlighted: node.id === tableName,
        highlightedColumn:
          node.id === tableName ? columnName ?? undefined : undefined,
      },
    }));
    set({ nodes: updatedNodes });
  },

  clearSelection: () => {
    set({ selectedTable: null, selectedColumn: null });

    const { nodes } = get();
    const updatedNodes = nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        isHighlighted: false,
        highlightedColumn: undefined,
      },
    }));
    set({ nodes: updatedNodes });
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleShowColumns: () =>
    set((state) => ({ showColumns: !state.showColumns })),

  setLoading: (loading) => set({ isLoading: loading }),

  resetLayout: () => {
    const { schema } = get();
    if (schema) {
      const { nodes, edges } = parseSchema(schema);
      set({ nodes, edges, selectedTable: null, selectedColumn: null });
    }
  },

  resetStore: () => {
    set({
      schema: null,
      nodes: [],
      edges: [],
      selectedTable: null,
      selectedColumn: null,
      searchQuery: "",
      showColumns: true,
      isLoading: false,
    });
  },
}));
