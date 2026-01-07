"use client";

import { useCallback, useEffect, useMemo } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  ConnectionLineType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useERDStore } from "@/lib/store/erd-store";
import { TableNode } from "./table-node";
import { CustomEdge } from "./custom-edge";
import { ViewerToolbar } from "./viewer-toolbar";
import { TableNodeData } from "@/types/schema";

type TableNodeType = Node<TableNodeData, "tableNode">;

export function ERDCanvas() {
  const {
    nodes: storeNodes,
    edges: storeEdges,
    setNodes: setStoreNodes,
    setEdges: setStoreEdges,
    clearSelection,
  } = useERDStore();

  const nodeTypes = useMemo(() => ({ tableNode: TableNode }), []);
  const edgeTypes = useMemo(() => ({ custom: CustomEdge }), []);

  const [nodes, setNodes, onNodesChange] = useNodesState<TableNodeType>(
    storeNodes as TableNodeType[]
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(storeEdges);

  useEffect(() => {
    setNodes(storeNodes as TableNodeType[]);
  }, [storeNodes, setNodes]);

  useEffect(() => {
    setEdges(storeEdges);
  }, [storeEdges, setEdges]);

  const handleNodesChange: OnNodesChange<TableNodeType> = useCallback(
    (changes) => {
      onNodesChange(changes);

      const dragEndChange = changes.find(
        (c) => c.type === "position" && !("dragging" in c && c.dragging)
      );
      if (dragEndChange) {
        setStoreNodes(nodes as Node<TableNodeData>[]);
      }
    },
    [onNodesChange, setStoreNodes, nodes]
  );

  const handleEdgesChange: OnEdgesChange<Edge> = useCallback(
    (changes) => {
      onEdgesChange(changes);
      // Sync edge changes back to store
      setStoreEdges(edges);
    },
    [onEdgesChange, setStoreEdges, edges]
  );

  const handlePaneClick = useCallback(() => {
    clearSelection();
  }, [clearSelection]);

  return (
    <div className="relative h-full w-full bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onPaneClick={handlePaneClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="oklch(0.28 0.02 260)"
        />
        <Controls showInteractive={false} className="bottom-4! left-4!" />
        <MiniMap
          className="bottom-4! right-4!"
          nodeColor="oklch(0.35 0.05 190)"
          maskColor="rgba(0, 0, 0, 0.7)"
          style={{
            backgroundColor: "oklch(0.17 0.02 260)",
          }}
        />
      </ReactFlow>
      <ViewerToolbar />
    </div>
  );
}
