import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useCanvas } from "@/hooks/useCanvas.js";
import CanvasToolbar from "./CanvasToolbar";
import TableModal from "./Table";
import {
  setObjects,
  setSelectedObject,
  undo,
  redo,
  deleteSelectedObject,
  setZoom,
  setPan,
  setViewportTransform,
  setActiveTool,
} from "../../store/canvasSlice";
import canvasService from "@/services/canvas";

const ORIGIN_X = 2000;
const ORIGIN_Y = 2000;
const MIN_ZOOM = 0.01;
const MAX_ZOOM = 50;

const Canvas = () => {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const dispatch = useDispatch();
  const { id: canvasId } = useParams();
  const {
    zoom,
    pan,
    canvasSize,
    activeTool,
    selectedObject,
    currentColor,
    currentFill,
    viewportTransform,
  } = useSelector((state) => state.canvas);
  const [showTableModal, setShowTableModal] = useState(false);

  const { saveCanvasState, loadCanvasState, resetZoom } = useCanvas(fabricRef);

  const addText = () => {
    if (!fabricRef.current) return;

    const text = new fabric.IText("Double click to edit", {
      left: fabricRef.current.getCenter().left,
      top: fabricRef.current.getCenter().top,
      fontFamily: "Arial",
      fontSize: 20,
      fill: currentColor || "#000000",
      originX: 'center',
      originY: 'center'
    });

    fabricRef.current.add(text);
    fabricRef.current.setActiveObject(text);
    dispatch(setObjects(canvasService.serializeCanvas(fabricRef.current)));
    // Reset tool after adding text
    dispatch(setActiveTool('select'));
  };

  const handleCreateTable = (dimensions) => {
    if (!fabricRef.current) return;
    
    const { rows, cols, cellSize } = dimensions;
    const tableGroup = [];

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = new fabric.Rect({
          left: j * cellSize,
          top: i * cellSize,
          width: cellSize,
          height: cellSize,
          fill: 'transparent',
          stroke: currentColor || '#000000',
          strokeWidth: 1,
        });
        tableGroup.push(cell);
      }
    }

    const table = new fabric.Group(tableGroup, {
      left: fabricRef.current.getCenter().left,
      top: fabricRef.current.getCenter().top,
      originX: 'center',
      originY: 'center'
    });

    fabricRef.current.add(table);
    fabricRef.current.setActiveObject(table);
    fabricRef.current.renderAll();
    dispatch(setObjects(canvasService.serializeCanvas(fabricRef.current)));
    dispatch(setActiveTool('select'));
  };

  const handleShapeAdd = (type) => {
    if (type === "table") {
      setShowTableModal(true);
    } else {
      addShape(type);
    }
  };

  const addShape = (type) => {
    if (!fabricRef.current) return;

    let shape;
    const center = fabricRef.current.getCenter();
    
    const commonProps = {
      left: center.left,
      top: center.top,
      fill: currentFill || 'transparent',
      stroke: currentColor || '#000000',
      strokeWidth: 2,
      originX: 'center',
      originY: 'center'
    };

    switch (type) {
      case "rectangle":
        shape = new fabric.Rect({
          ...commonProps,
          width: 100,
          height: 100,
        });
        break;

      case "circle":
        shape = new fabric.Circle({
          ...commonProps,
          radius: 50,
        });
        break;

      case "triangle":
        shape = new fabric.Triangle({
          ...commonProps,
          width: 100,
          height: 100,
        });
        break;

      case "line":
        shape = new fabric.Line([0, 0, 100, 0], {
          ...commonProps,
          stroke: currentColor || '#000000',
        });
        break;

      default:
        break;
    }

    if (shape) {
      fabricRef.current.add(shape);
      fabricRef.current.setActiveObject(shape);
      dispatch(setObjects(canvasService.serializeCanvas(fabricRef.current)));
      dispatch(setActiveTool('select'));
    }
  };

  const handleDelete = () => {
    if (!fabricRef.current) return;
    
    const activeObject = fabricRef.current.getActiveObject();
    if (activeObject) {
      fabricRef.current.remove(activeObject);
      dispatch(setObjects(canvasService.serializeCanvas(fabricRef.current)));
      dispatch(deleteSelectedObject());
    }
  };

  const handleUndo = () => {
    dispatch(undo());
    if (canvasId) {
      loadCanvasState(canvasId);
    }
  };

  const handleRedo = () => {
    dispatch(redo());
    if (canvasId) {
      loadCanvasState(canvasId);
    }
  };

  // Your existing useEffect hooks for canvas initialization and events...
  // (Keep the previous useEffect hooks for canvas initialization and infinite canvas handling)

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <CanvasToolbar
          onAddText={addText}
          onAddShape={handleShapeAdd}
          onDelete={handleDelete}
          onUndo={handleUndo}
          onRedo={handleRedo}
          activeTool={activeTool}
          onToolChange={(tool) => dispatch(setActiveTool(tool))}
        />
      </div>

      <div className="pt-16 w-full h-full">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full touch-none"
        />
      </div>

      {showTableModal && (
        <TableModal
          onClose={() => setShowTableModal(false)}
          onCreateTable={handleCreateTable}
        />
      )}
    </div>
  );
};

export default Canvas;