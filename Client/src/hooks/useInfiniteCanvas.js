import { useEffect } from 'react';
import { setZoom, setPan, setViewportTransform } from '../../../store/canvasSlice';

export const useInfiniteCanvas = (fabricRef, dispatch) => {
  useEffect(() => {
    if (!fabricRef.current) return;

    const canvas = fabricRef.current;
    let isDragging = false;
    let lastPosX = 0;
    let lastPosY = 0;
    
    // Improved zoom handling
    const handleWheel = (opt) => {
      opt.e.preventDefault();
      opt.e.stopPropagation();
      
      const delta = opt.e.deltaY;
      let zoomLevel = canvas.getZoom();
      
      // Make zooming more smooth
      zoomLevel *= 0.999 ** delta;
      
      // Limit zoom range but allow for very detailed zooming
      zoomLevel = Math.min(Math.max(0.01, zoomLevel), 50);
      
      // Get mouse position relative to canvas
      const pointer = canvas.getPointer(opt.e);
      const point = {
        x: pointer.x,
        y: pointer.y,
      };

      // Zoom to point with easing
      canvas.zoomToPoint(point, zoomLevel);
      
      // Update Redux state
      dispatch(setZoom(zoomLevel));
      dispatch(setViewportTransform(canvas.viewportTransform));
    };

    // Improved panning
    const handleMouseDown = (opt) => {
      // Enable panning with middle mouse button or when holding spacebar
      if (opt.e.button === 1 || opt.e.altKey) {
        isDragging = true;
        canvas.selection = false;
        lastPosX = opt.e.clientX;
        lastPosY = opt.e.clientY;
        canvas.requestRenderAll();
      }
    };

    const handleMouseMove = (opt) => {
      if (!isDragging) return;

      const vpt = canvas.viewportTransform;
      const e = opt.e;
      
      // Calculate movement with inertia
      const dx = e.clientX - lastPosX;
      const dy = e.clientY - lastPosY;
      
      // Update viewport transform with smooth movement
      vpt[4] += dx;
      vpt[5] += dy;
      
      // Request render frame
      canvas.requestRenderAll();
      
      // Update last position
      lastPosX = e.clientX;
      lastPosY = e.clientY;
      
      // Update Redux state
      dispatch(setPan({ x: vpt[4], y: vpt[5] }));
      dispatch(setViewportTransform(vpt));
    };

    const handleMouseUp = () => {
      isDragging = false;
      canvas.selection = true;
      canvas.requestRenderAll();
    };

    // Add event listeners
    canvas.on('mouse:wheel', handleWheel);
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);

    return () => {
      canvas.off('mouse:wheel', handleWheel);
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:move', handleMouseMove);
      canvas.off('mouse:up', handleMouseUp);
    };
  }, [fabricRef, dispatch]);
};