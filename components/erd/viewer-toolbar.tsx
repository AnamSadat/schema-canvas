"use client";

import { useReactFlow } from "@xyflow/react";
import { ZoomIn, ZoomOut, Maximize, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import { useERDStore } from "@/lib/store/erd-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ViewerToolbar() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const { resetLayout } = useERDStore();

  const tools = [
    {
      icon: ZoomIn,
      label: "Zoom In",
      onClick: () => zoomIn({ duration: 200 }),
    },
    {
      icon: ZoomOut,
      label: "Zoom Out",
      onClick: () => zoomOut({ duration: 200 }),
    },
    {
      icon: Maximize,
      label: "Fit View",
      onClick: () => fitView({ padding: 0.2, duration: 500 }),
    },
  ];

  return (
    <TooltipProvider delayDuration={300}>
      <div className="absolute top-4 left-4 z-10 flex items-center gap-1 rounded-lg border border-border/50 bg-card/95 p-1.5 shadow-lg backdrop-blur">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <Link href="/">
                <Home className="h-4 w-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Back to Home</p>
          </TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {tools.map((tool, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={tool.onClick}
              >
                <tool.icon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{tool.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        <Separator orientation="vertical" className="h-6 mx-1" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={resetLayout}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Reset Layout</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
