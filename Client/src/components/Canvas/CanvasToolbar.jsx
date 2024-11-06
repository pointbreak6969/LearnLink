import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Type, 
  Square, 
  Circle, 
  MousePointer, 
  Image as ImageIcon,
  Trash2,
  RotateCw,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { setActiveTool, deleteSelectedObject, undo, redo } from '../../store/canvasSlice.js';
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const CanvasToolbar = ({ onAddText, onAddShape, onDelete, onUndo, onRedo }) => {
  const dispatch = useDispatch();
  const activeTool = useSelector(state => state.canvas.activeTool);
  const selectedObject = useSelector(state => state.canvas.selectedObject);
  
  const tools = [
    { id: 'select', icon: MousePointer, label: 'Select' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'triangle', icon: Triangle, label: 'Triangle' },
    { id: 'line', icon: Minus, label: 'Line' },
    { id: 'table', icon: Grid, label: 'Table' },
  ];

  const handleToolClick = (toolId) => {
    dispatch(setActiveTool(toolId));
  };

  return (
    <Card className="fixed left-4 top-1/2 transform -translate-y-1/2 w-12">
      <CardContent className="p-2 space-y-2">
        <TooltipProvider>
          <div className="space-y-2">
            {tools.map((tool) => (
              <Tooltip key={tool.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeTool === tool.id ? "default" : "ghost"}
                    size="icon"
                    onClick={() => handleToolClick(tool.id)}
                    className="w-8 h-8"
                  >
                    <tool.icon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{tool.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          <Separator className="my-2" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onDelete}
                disabled={!selectedObject}
                className={`w-8 h-8 ${!selectedObject ? 'opacity-50' : ''}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>

          <Separator className="my-2" />

          <div className="space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onUndo}
                  className="w-8 h-8"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Undo</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onRedo}
                  className="w-8 h-8"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Redo</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default CanvasToolbar;