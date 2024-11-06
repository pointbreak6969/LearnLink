import { useEffect } from 'react';
import { setZoom, setPan, setViewportTransform, setObjects } from "../store/canvasSlice.js"
import canvasService from '@/services/canvas.js';

export const useCanvasEvents = (fabricRef, dispatch, canvasId, saveCanvasState) => {
  useEffect(() => {
    if (!fabricRef.current) return;

    const canvas = fabricRef.current;

    const handleWheel = (opt) => {
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
    };

    const handleMouseDown = function(opt) {
      const evt = opt.e;
      if (evt.altKey === true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    };

    const handleMouseMove = function(opt) {
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
    };

    const handleMouseUp = function() {
      this.isDragging = false;
      this.selection = true;
    };

    const handleModification = () => {
      if (canvasId) {
        dispatch(setObjects(canvasService.serializeCanvas(canvas)));
        saveCanvasState(canvasId);
      }
    };

    canvas.on('mouse:wheel', handleWheel);
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);
    canvas.on('object:modified', handleModification);

    return () => {
      canvas.off('mouse:wheel', handleWheel);
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:move', handleMouseMove);
      canvas.off('mouse:up', handleMouseUp);
      canvas.off('object:modified', handleModification);
    };
  }, [fabricRef, dispatch, canvasId, saveCanvasState]);
};