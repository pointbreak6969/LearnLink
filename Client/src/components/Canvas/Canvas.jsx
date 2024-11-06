// src/components/Canvas/Canvas.jsx
import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useCanvas } from "@/hooks/useCanvas.js";
import { useCanvasEvents } from "@/hooks/useCanvasEvents.js";
import { useShapeDrawing } from "@/hooks/useShapeDrawing.js";
import { createShape, createTableShape } from "@/lib/shapeCreators.js";
import CanvasToolbar from "./CanvasToolbar";
import TableModal from "./Table";
import {
  setObjects,
  setSelectedObject,
  undo,
  redo,
  deleteSelectedObject,
} from "../../store/canvasSlice";
import canvasService from "@/services/canvas";

const Canvas = () => {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const dispatch = useDispatch();
  const { id: canvasId } = useParams();
  const { zoom, pan, canvasSize, activeTool, selectedObject, currentColor, currentFill } =
    useSelector((state) => state.canvas);
  const [showTableModal, setShowTableModal] = useState(false);
  
  const { saveCanvasState, loadCanvasState, resetZoom } = useCanvas(fabricRef);

  // Initialize canvas events
  useCanvasEvents(fabricRef, dispatch, canvasId, saveCanvasState);
  
  // Initialize shape drawing functionality
  useShapeDrawing(fabricRef, activeTool, currentColor, currentFill, dispatch);

  // Initialize canvas
  useEffect(() => {
    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      width: canvasSize.width,
      height: canvasSize.height,
      backgroundColor: "#ffffff",
      selection: true,
      preserveObjectStacking: true,
    });

    if (canvasId) {
      loadCanvasState(canvasId);
    }

    const handleResize = () => {
      fabricRef.current.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      fabricRef.current.renderAll();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      fabricRef.current.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasId, loadCanvasState]);

  const addText = () => {
    const text = new fabric.IText("Double click to edit", {
      left: 100,
      top: 100,
      fontFamily: "Arial",
      fontSize: 20,
      fill: currentColor || "#000000",
    });

    fabricRef.current.add(text);
    fabricRef.current.setActiveObject(text);
    dispatch(setObjects(canvasService.serializeCanvas(fabricRef.current)));
  };

  const handleCreateTable = (dimensions) => {
    if (fabricRef.current) {
      const table = createTableShape(dimensions, currentColor);
      fabricRef.current.add(table);
      fabricRef.current.setActiveObject(table);
      fabricRef.current.renderAll();
      dispatch(setObjects(canvasService.serializeCanvas(fabricRef.current)));
    }
  };

  const handleShapeAdd = (type) => {
    if (type === "table") {
      setShowTableModal(true);
    } else {
      const shape = createShape(type, { currentColor, currentFill });
      if (shape && fabricRef.current) {
        fabricRef.current.add(shape);
        fabricRef.current.setActiveObject(shape);
        dispatch(setObjects(canvasService.serializeCanvas(fabricRef.current)));
      }
    }
  };

  const handleDelete = () => {
    const activeObject = fabricRef.current.getActiveObject();
    if (activeObject) {
      fabricRef.current.remove(activeObject);
      dispatch(setObjects(canvasService.serializeCanvas(fabricRef.current)));
      dispatch(deleteSelectedObject());
    }
  };

  const handleUndo = () => {
    dispatch(undo());
    loadCanvasState(canvasId);
  };

  const handleRedo = () => {
    dispatch(redo());
    loadCanvasState(canvasId);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <CanvasToolbar
          onAddText={addText}
          onAddShape={handleShapeAdd}
          onDelete={handleDelete}
          onUndo={handleUndo}
          onRedo={handleRedo}
        />
      </div>

      <div className="pt-16 w-full h-full">
        <canvas ref={canvasRef} className="w-full h-full" />
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