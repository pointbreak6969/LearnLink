import React, { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useCanvas } from "../../hooks/useCanvas.js";
import CanvasToolbar from "./CanvasToolbar";
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

const Canvas = () => {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const dispatch = useDispatch();
  const { id: canvasId } = useParams();
  const { zoom, pan, canvasSize, activeTool, selectedObject } = useSelector(
    (state) => state.canvas
  );

  // Initialize useCanvas hook
  const { saveCanvasState, loadCanvasState, resetZoom } = useCanvas(fabricRef);

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
      fill: "#000000",
    });

    fabricRef.current.add(text);
    fabricRef.current.setActiveObject(text);
    dispatch(setObjects(canvasService.serializeCanvas(fabricRef.current)));
  };

  const addShape = (type) => {
    let shape;

    if (type === "rectangle") {
      shape = new fabric.Rect({
        left: 100,
        top: 100,
        width: 100,
        height: 100,
        fill: "transparent",
        stroke: "#000000",
        strokeWidth: 2,
      });
    } else if (type === "circle") {
      shape = new fabric.Circle({
        left: 100,
        top: 100,
        radius: 50,
        fill: "transparent",
        stroke: "#000000",
        strokeWidth: 2,
      });
    }

    if (shape) {
      fabricRef.current.add(shape);
      fabricRef.current.setActiveObject(shape);
      dispatch(setObjects(canvasService.serializeCanvas(fabricRef.current)));
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
      // Update canvas mode based on active tool
      switch (activeTool) {
        case "select":
          fabricRef.current.isDrawingMode = false;
          fabricRef.current.selection = true;
          break;
        case "text":
          fabricRef.current.isDrawingMode = false;
          fabricRef.current.selection = true;
          addText();
          break;
        case "rectangle":
        case "circle":
          fabricRef.current.isDrawingMode = false;
          fabricRef.current.selection = true;
          addShape(activeTool);
          break;
        default:
          break;
      }
    }
  }, [activeTool]);
  return (
    <div className="canvas-container relative w-full h-screen">
    <CanvasToolbar
      onAddText={addText}
      onAddShape={addShape}
      onDelete={handleDelete}
      onUndo={handleUndo}
      onRedo={handleRedo}
    />
    <canvas ref={canvasRef} />
  </div>
  );
};

export default Canvas;
