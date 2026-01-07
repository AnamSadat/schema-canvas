"use client";

import { memo, useState } from "react";
import {
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
  Position,
} from "@xyflow/react";
import { RelationType } from "@/types/schema";

interface CustomEdgeData {
  relationType?: RelationType;
  fromColumn?: string;
  toColumn?: string;
}

interface MarkerProps {
  x: number;
  y: number;
  rotation: number;
  strokeColor: string;
  strokeWidth: number;
}

// Crow's foot marker (many) - two lines pointing toward table like >
const CrowsFoot = memo(function CrowsFoot({
  x,
  y,
  rotation,
  strokeColor,
  strokeWidth,
}: MarkerProps) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation})`}>
      {/* Connection line to table */}
      <line
        x1="15"
        y1="0"
        x2="-6"
        y2="0"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Top line */}
      <line
        x1="15"
        y1="0"
        x2="-6"
        y2="-10"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Bottom line */}
      <line
        x1="15"
        y1="0"
        x2="-6"
        y2="10"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </g>
  );
});

// One marker - vertical line crossing the edge
const OneLine = memo(function OneLine({
  x,
  y,
  rotation,
  strokeColor,
  strokeWidth,
}: MarkerProps) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation})`}>
      <line
        x1="-10"
        y1="-8"
        x2="-10"
        y2="8"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </g>
  );
});

function CustomEdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
}: EdgeProps) {
  const edgeData = data as CustomEdgeData | undefined;
  const relationType = edgeData?.relationType || "many-to-one";

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 12,
    offset: 40,
  });

  // Source = FK side (many), Target = PK side (one) for many-to-one
  const sourceIsMany =
    relationType === "many-to-one" || relationType === "many-to-many";
  const targetIsMany =
    relationType === "one-to-many" || relationType === "many-to-many";

  const strokeColor = selected ? "oklch(0.75 0.15 190)" : "oklch(0.5 0.1 190)";
  const strokeWidth = selected ? 2.5 : 2;

  const getLabelText = () => {
    switch (relationType) {
      case "one-to-one":
        return "1:1";
      case "one-to-many":
        return "1:N";
      case "many-to-one":
        return "N:1";
      case "many-to-many":
        return "M:N";
      default:
        return "N:1";
    }
  };

  // Calculate direction for markers
  const getMarkerRotation = (position: Position) => {
    switch (position) {
      case Position.Right:
        return 0;
      case Position.Left:
        return 180;
      case Position.Top:
        return -90;
      case Position.Bottom:
        return 90;
      default:
        return 0;
    }
  };

  const sourceRotation = getMarkerRotation(sourcePosition);
  const targetRotation = getMarkerRotation(targetPosition);

  // Handle drag for label
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startOffset = { ...offset };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      setOffset({
        x: startOffset.x + dx,
        y: startOffset.y + dy,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      {/* Main edge path */}
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        className="react-flow__edge-path"
      />

      {/* Source marker (FK side) */}
      {sourceIsMany ? (
        <CrowsFoot
          x={sourceX}
          y={sourceY}
          rotation={sourceRotation}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
        />
      ) : (
        <OneLine
          x={sourceX}
          y={sourceY}
          rotation={sourceRotation}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
        />
      )}

      {/* Target marker (PK side) */}
      {targetIsMany ? (
        <CrowsFoot
          x={targetX}
          y={targetY}
          rotation={targetRotation + 180}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
        />
      ) : (
        <OneLine
          x={targetX}
          y={targetY}
          rotation={targetRotation + 180}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
        />
      )}

      {/* Draggable Label */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${
              labelX + offset.x
            }px, ${labelY + offset.y}px)`,
            pointerEvents: "all",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          className="nodrag nopan"
          onMouseDown={handleMouseDown}
        >
          <div
            className={`
              px-2.5 py-1 rounded-md text-[11px] font-semibold font-mono 
              bg-slate-800 border-2 border-cyan-600/70 text-cyan-300
              shadow-lg shadow-cyan-900/30
              hover:bg-slate-700 hover:border-cyan-500 hover:text-cyan-200
              transition-all select-none
              ${selected ? "border-cyan-400 text-cyan-200 bg-slate-700" : ""}
            `}
          >
            {getLabelText()}
          </div>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export const CustomEdge = memo(CustomEdgeComponent);
