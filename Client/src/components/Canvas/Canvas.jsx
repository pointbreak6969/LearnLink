import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useCanvas } from "../../hooks/useCanvas.js";
import CanvasToolbar from "./CanvasToolbar";
import canvasService from "@/services/canvas.js";
import {
  setObjects,
  setSelectedObject,
  setZoom,
  setPan,
  setViewportTransform,
  undo,
  redo,
  deleteSelectedObject,
} from "../../store/canvasSlice.js";
import TableModal from "./Table.jsx";
const Canvas = () => {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const dispatch = useDispatch();
  const { id: canvasId } = useParams();
  const { zoom, pan, canvasSize, activeTool, selectedObject, currentColor, currentFill } =
    useSelector((state) => state.canvas);
  const [showTableModal, setShowTableModal] = useState(false);
  // Initialize useCanvas hook
  const { saveCanvasState, loadCanvasState, resetZoom } = useCanvas(fabricRef);

  const createTable = (dimensions) => {
    const { rows, cols, cellSize } = dimensions;
    const tableGroup = [];

    // Create cells
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const cell = new fabric.Rect({
          left: j * cellSize,
          top: i * cellSize,
          width: cellSize,
          height: cellSize,
          fill: "transparent",
          stroke: currentColor || "#000000", // Fallback color if currentColor is undefined
          strokeWidth: 1,
        });
        tableGroup.push(cell);
      }
    }

    const table = new fabric.Group(tableGroup, {
      left: 100,
      top: 100,
    });

    if (fabricRef.current) {
      fabricRef.current.add(table);
      fabricRef.current.setActiveObject(table);
      fabricRef.current.renderAll();
      dispatch(setObjects(canvasService.serializeCanvas(fabricRef.current)));
    }
  };
  useEffect(() => {
    // Initialize fabric canvas
    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      width: canvasSize.width,
      height: canvasSize.height,
      backgroundColor: "#ffffff",
      selection: true,
      preserveObjectStacking: true,
    });

    const canvas = fabricRef.current;

    // Load existing canvas data if we have a canvasId
    if (canvasId) {
      loadCanvasState(canvasId);
    }

    // Enable pan and zoom
    canvas.on("mouse:wheel", function (opt) {
      const delta = opt.e.deltaY;
      let newZoom = canvas.getZoom() * 0.999 ** delta;
      newZoom = Math.min(Math.max(0.1, newZoom), 20);

      const point = {
        x: opt.e.offsetX,
        y: opt.e.offsetY,
      };

      canvas.zoomToPoint(point, newZoom);
      dispatch(setZoom(newZoom));
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    // Pan functionality
    canvas.on("mouse:down", function (opt) {
      const evt = opt.e;
      if (evt.altKey === true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });

    canvas.on("mouse:move", function (opt) {
      if (this.isDragging) {
        const evt = opt.e;
        const vpt = this.viewportTransform;
        vpt[4] += evt.clientX - this.lastPosX;
        vpt[5] += evt.clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
        dispatch(setPan({ x: vpt[4], y: vpt[5] }));
        dispatch(setViewportTransform(vpt));
      }
    });

    canvas.on("mouse:up", function () {
      this.isDragging = false;
      this.selection = true;
    });

    // Handle object selection
    canvas.on("selection:created", (options) => {
      dispatch(setSelectedObject(options.selected[0]));
    });

    canvas.on("selection:cleared", () => {
      dispatch(setSelectedObject(null));
    });

    // Save canvas state after modifications
    canvas.on("object:modified", () => {
      if (canvasId) {
        dispatch(setObjects(canvasService.serializeCanvas(canvas)));
        saveCanvasState(canvasId);
      }
    });

    // Handle window resize
    const handleResize = () => {
      canvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      canvas.renderAll();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      canvas.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasId, dispatch, loadCanvasState, saveCanvasState]);
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


  const handleShapeAdd = (type) => {
    if (type === "table") {
      setShowTableModal(true);
    } else {
      addShape(type);
    }
  };
  const addShape = (type) => {
    let shape;

    const commonProps = {
      left: 100,
      top: 100,
      fill: currentFill || "transparent",
      stroke: currentColor || "#000000",
      strokeWidth: 2,
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
        shape = new fabric.Line([50, 50, 150, 50], {
          ...commonProps,
          fill: currentColor || "#000000",
        });
        break;

      default:
        break;
    }

    if (shape && fabricRef.current) {
      fabricRef.current.add(shape);
      fabricRef.current.setActiveObject(shape);
      dispatch(setObjects(canvasService.serializeCanvas(fabricRef.current)));
    }
  };
  const updateObjectColor = () => {
    const activeObject = fabricRef.current?.getActiveObject();
    
    if (activeObject) {
      if (activeObject.type === "i-text") {
        activeObject.set("fill", currentColor || "#000000");
      } else {
        activeObject.set("stroke", currentColor || "#000000");
      }
      fabricRef.current.renderAll();
      dispatch(setObjects(canvasService.serializeCanvas(fabricRef.current)));
    }
  };
  useEffect(() => {
    if (currentColor) {
      updateObjectColor();
    }
  }, [currentColor]);
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
    // Reload canvas with previous state
    loadCanvasState(canvasId);
  };

  const handleRedo = () => {
    dispatch(redo());
    // Reload canvas with next state
    loadCanvasState(canvasId);
  };

 
  useEffect(() => {
    if (fabricRef.current) {
      const canvas = fabricRef.current;
  
      // Clear any active drawing handlers
      canvas.off('mouse:down');
      canvas.off('mouse:move');
      canvas.off('mouse:up');
  
      switch (activeTool) {
        case "select":
          canvas.isDrawingMode = false;
          canvas.selection = true;
          canvas.defaultCursor = 'default';
          break;
  
        case "text":
          canvas.isDrawingMode = false;
          canvas.selection = true;
          canvas.defaultCursor = 'text';
          addText();
          break;
  
        case "rectangle":
        case "circle":
        case "triangle":
          canvas.isDrawingMode = false;
          canvas.selection = false;
          canvas.defaultCursor = 'crosshair';
          
          let isDrawing = false;
          let startPoint = null;
          let activeShape = null;
  
          canvas.on('mouse:down', (o) => {
            isDrawing = true;
            const pointer = canvas.getPointer(o.e);
            startPoint = { x: pointer.x, y: pointer.y };
  
            // Initial shape properties
            const shapeProps = {
              left: startPoint.x,
              top: startPoint.y,
              width: 0,
              height: 0,
              fill: currentFill || 'transparent',
              stroke: currentColor || '#000000',
              strokeWidth: 2,
              selectable: false,
              originX: 'left',
              originY: 'top'
            };
  
            switch (activeTool) {
              case "rectangle":
                activeShape = new fabric.Rect(shapeProps);
                break;
              case "circle":
                activeShape = new fabric.Ellipse({
                  ...shapeProps,
                  rx: 0,
                  ry: 0
                });
                break;
              case "triangle":
                activeShape = new fabric.Triangle(shapeProps);
                break;
            }
  
            if (activeShape) {
              canvas.add(activeShape);
            }
          });
  
          canvas.on('mouse:move', (o) => {
            if (!isDrawing || !activeShape) return;
            const pointer = canvas.getPointer(o.e);
  
            const width = Math.abs(pointer.x - startPoint.x);
            const height = Math.abs(pointer.y - startPoint.y);
  
            if (activeTool === "circle") {
              const radius = Math.sqrt(width * width + height * height) / 2;
              activeShape.set({
                rx: radius,
                ry: radius
              });
            } else {
              activeShape.set({
                width: width,
                height: height
              });
            }
  
            // Adjust position for negative dimensions
            if (pointer.x < startPoint.x) {
              activeShape.set({ left: pointer.x });
            }
            if (pointer.y < startPoint.y) {
              activeShape.set({ top: pointer.y });
            }
  
            canvas.renderAll();
          });
  
          canvas.on('mouse:up', () => {
            isDrawing = false;
            if (activeShape) {
              activeShape.set({
                selectable: true
              });
              canvas.setActiveObject(activeShape);
              dispatch(setObjects(canvasService.serializeCanvas(canvas)));
            }
          });
          break;
  
        // ... rest of the switch cases remain the same ...
      }
  
      // Cleanup function
      return () => {
        canvas.off('mouse:down');
        canvas.off('mouse:move');
        canvas.off('mouse:up');
        canvas.isDrawingMode = false;
        canvas.selection = true;
        canvas.defaultCursor = 'default';
      };
    }
  }, [activeTool, currentColor, currentFill, dispatch]);
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
        onCreateTable={createTable}
      />
    )}
  </div>
  );
};

export default Canvas;
