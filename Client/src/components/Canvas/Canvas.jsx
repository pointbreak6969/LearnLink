import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedObject,
  setZoom,
  setPan,
  setViewportTransform,
} from "../../store/canvasSlice";

const Canvas = () => {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const dispatch = useDispatch();
  const { zoom, pan, canvasSize } = useSelector((state) => state.canvas);

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

    // Enable pan and zoom
    canvas.on("mouse:wheel", function (opt) {
      const delta = opt.e.deltaY;
      let newZoom = canvas.getZoom() * 0.999 ** delta;
      newZoom = Math.min(Math.max(0.1, newZoom), 20); // Set zoom boundaries

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
  }, []);

  return (
    <div
      className="canvas-container"
      style={{ width: "100%", height: "100vh" }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;
