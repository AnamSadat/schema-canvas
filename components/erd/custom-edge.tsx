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
    borderRadius: 8,
  });

  // Determine cardinality based on relation type
  // Source = FK side (from), Target = PK side (to)
  const sourceIsMany =
    relationType === "many-to-one" || relationType === "many-to-many";
  const targetIsMany =
    relationType === "one-to-many" || relationType === "many-to-many";

  const strokeColor = selected ? "oklch(0.75 0.15 190)" : "oklch(0.5 0.1 190)";
  const strokeWidth = selected ? 2.5 : 2;

  // Get label text
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

  // Calculate marker positions and angles
  const getMarkerTransform = (
    x: number,
    y: number,
    position: Position,
    isSource: boolean
  ) => {
    let angle = 0;
    let offsetX = 0;
    let offsetY = 0;
    const markerOffset = 2;

    if (position === Position.Right) {
      angle = 0;
      offsetX = isSource ? markerOffset : -markerOffset;
    } else if (position === Position.Left) {
      angle = 180;
      offsetX = isSource ? -markerOffset : markerOffset;
    } else if (position === Position.Top) {
      angle = -90;
      offsetY = isSource ? -markerOffset : markerOffset;
    } else if (position === Position.Bottom) {
      angle = 90;
      offsetY = isSource ? markerOffset : -markerOffset;
    }

    return { x: x + offsetX, y: y + offsetY, angle };
  };

  const sourceMarker = getMarkerTransform(
    sourceX,
    sourceY,
    sourcePosition,
    true
  );
  const targetMarker = getMarkerTransform(
    targetX,
    targetY,
    targetPosition,
    false
  );

  // Handle drag
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
      <g
        transform={`translate(${sourceMarker.x}, ${sourceMarker.y}) rotate(${sourceMarker.angle})`}
      >
        {sourceIsMany ? (
          // Crow's foot (many)
          <>
            <line
              x1="0"
              y1="0"
              x2="12"
              y2="-8"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <line
              x1="0"
              y1="0"
              x2="12"
              y2="0"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <line
              x1="0"
              y1="0"
              x2="12"
              y2="8"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </>
        ) : (
          // Single line (one)
          <>
            <line
              x1="8"
              y1="-8"
              x2="8"
              y2="8"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </>
        )}
      </g>

      {/* Target marker (PK side) */}
      <g
        transform={`translate(${targetMarker.x}, ${targetMarker.y}) rotate(${targetMarker.angle})`}
      >
        {targetIsMany ? (
          // Crow's foot (many)
          <>
            <line
              x1="0"
              y1="0"
              x2="-12"
              y2="-8"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <line
              x1="0"
              y1="0"
              x2="-12"
              y2="0"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
            <line
              x1="0"
              y1="0"
              x2="-12"
              y2="8"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </>
        ) : (
          // Single line (one)
          <>
            <line
              x1="-8"
              y1="-8"
              x2="-8"
              y2="8"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
            />
          </>
        )}
      </g>

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
              px-2 py-1 rounded text-[10px] font-mono 
              bg-card border border-border/50 text-muted-foreground 
              hover:text-foreground hover:border-primary/50 
              transition-colors select-none
              ${selected ? "border-primary text-foreground" : ""}
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
