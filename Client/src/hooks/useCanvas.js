import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import canvasService from '../services/canvas.js';
import {
  setZoom,
  setPan,
  setViewportTransform,
} from '../store/canvasSlice.js';

export const useCanvas = (fabricRef) => {
  const dispatch = useDispatch();
  const { zoom, pan, viewportTransform } = useSelector((state) => state.canvas);

  const saveCanvasState = useCallback(async (canvasId) => {
    if (!fabricRef.current) return;

    const canvasData = {
      objects: canvasService.serializeCanvas(fabricRef.current),
      viewportTransform: fabricRef.current.viewportTransform,
    };

    try {
      await canvasService.updateCanvas(canvasId, canvasData);
    } catch (error) {
      console.error('Error saving canvas state:', error);
    }
  }, []);

  const loadCanvasState = useCallback(async (canvasId) => {
    if (!fabricRef.current) return;

    try {
      const canvasData = await canvasService.getCanvas(canvasId);
      await canvasService.loadCanvasFromJSON(fabricRef.current, canvasData.objects);
      
      // Restore viewport transform
      if (canvasData.viewportTransform) {
        fabricRef.current.setViewportTransform(canvasData.viewportTransform);
        dispatch(setViewportTransform(canvasData.viewportTransform));
      }
    } catch (error) {
      console.error('Error loading canvas state:', error);
    }
  }, [dispatch]);

  const resetZoom = useCallback(() => {
    if (!fabricRef.current) return;
    
    fabricRef.current.setZoom(1);
    fabricRef.current.setViewportTransform([1, 0, 0, 1, 0, 0]);
    dispatch(setZoom(1));
    dispatch(setPan({ x: 0, y: 0 }));
    dispatch(setViewportTransform([1, 0, 0, 1, 0, 0]));
  }, [dispatch]);

  return {
    saveCanvasState,
    loadCanvasState,
    resetZoom,
  };
};
