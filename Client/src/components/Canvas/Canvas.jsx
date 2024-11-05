import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useCanvas } from '../../hooks/useCanvas.js';
import {
  setObjects,
  setSelectedObject,
  setZoom,
  setPan,
  setViewportTransform
} from '../../store/canvasSlice.js';

const Canvas = () => {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const dispatch = useDispatch();
  const { id: canvasId } = useParams(); // Assuming you're using route params for canvas ID
  const { zoom, pan, canvasSize } = useSelector((state) => state.canvas);
  
  // Initialize useCanvas hook
  const { saveCanvasState, loadCanvasState, resetZoom } = useCanvas(fabricRef);

  useEffect(() => {
    // Initialize fabric canvas
    fabricRef.current = new fabric.Canvas(canvasRef.current, {
      width: canvasSize.width,
      height: canvasSize.height,
      backgroundColor: '#ffffff',
      selection: true,
      preserveObjectStacking: true
    });

    const canvas = fabricRef.current;

    // Load existing canvas data if we have a canvasId
    if (canvasId) {
      loadCanvasState(canvasId);
    }

    // Enable pan and zoom
    canvas.on('mouse:wheel', function(opt) {
      const delta = opt.e.deltaY;
      let newZoom = canvas.getZoom() * 0.999 ** delta;
      newZoom = Math.min(Math.max(0.1, newZoom), 20);

      const point = {
        x: opt.e.offsetX,
        y: opt.e.offsetY
      };

      canvas.zoomToPoint(point, newZoom);
      dispatch(setZoom(newZoom));
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    // Pan functionality
    canvas.on('mouse:down', function(opt) {
      const evt = opt.e;
      if (evt.altKey === true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });

    canvas.on('mouse:move', function(opt) {
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

    canvas.on('mouse:up', function() {
      this.isDragging = false;
      this.selection = true;
    });

    // Handle object selection
    canvas.on('selection:created', (options) => {
      dispatch(setSelectedObject(options.selected[0]));
    });

    canvas.on('selection:cleared', () => {
      dispatch(setSelectedObject(null));
    });

    // Save canvas state after modifications
    canvas.on('object:modified', () => {
      if (canvasId) {
        dispatch(setObjects(canvasService.serializeCanvas(canvas)));
        saveCanvasState(canvasId);
      }
    });

    // Handle window resize
    const handleResize = () => {
      canvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      canvas.renderAll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      canvas.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasId, dispatch, loadCanvasState, saveCanvasState]);

  return (
    <div className="canvas-container relative w-full h-screen">
      <div className="absolute top-4 right-4 flex gap-2">
        <button 
          onClick={() => resetZoom()} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reset View
        </button>
        <button 
          onClick={() => saveCanvasState(canvasId)} 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save
        </button>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Canvas;