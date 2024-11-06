import { useEffect } from 'react';
import { setZoom, setPan, setViewportTransform } from '../store/canvasSlice';

export const useInfiniteCanvas = (fabricRef, dispatch) => {
  useEffect(() => {
    if (!fabricRef.current) return;
    const canvas = fabricRef.current;
    let isDragging = false;
    let lastPosX = 0;
    let lastPosY = 0;

    // More conservative canvas boundaries
    const CANVAS_BOUNDS = {
      width: 8000,  
      height: 8000,
      minX: -4000,
      minY: -4000,
      maxX: 4000,
      maxY: 4000
    };

    // Stricter zoom constraints
    const ZOOM_LIMITS = {
      min: 0.25,  // Minimum 25% zoom
      max: 5      // Maximum 500% zoom
    };

    // Enhanced boundary checking that prevents any overflow
    const constrainPan = (vpt) => {
      const zoom = vpt[0];
      const viewportWidth = canvas.width / zoom;
      const viewportHeight = canvas.height / zoom;

      // Calculate boundaries taking viewport size into account
      const minX = Math.min(-CANVAS_BOUNDS.maxX * zoom + viewportWidth * zoom, 0);
      const maxX = Math.max(-CANVAS_BOUNDS.minX * zoom - viewportWidth * zoom, -viewportWidth * zoom * 2);
      const minY = Math.min(-CANVAS_BOUNDS.maxY * zoom + viewportHeight * zoom, 0);
      const maxY = Math.max(-CANVAS_BOUNDS.minY * zoom - viewportHeight * zoom, -viewportHeight * zoom * 2);

      // Apply strict constraints
      vpt[4] = Math.min(Math.max(vpt[4], minX), maxX);
      vpt[5] = Math.min(Math.max(vpt[5], minY), maxY);

      return vpt;
    };

    const handleWheel = (opt) => {
      opt.e.preventDefault();
      opt.e.stopPropagation();

      const delta = opt.e.deltaY;
      let zoomLevel = canvas.getZoom();

      // Smoother zoom with smaller increments
      zoomLevel *= 0.999 ** delta;

      // Apply strict zoom limits
      zoomLevel = Math.min(Math.max(ZOOM_LIMITS.min, zoomLevel), ZOOM_LIMITS.max);

      // Get mouse position
      const pointer = canvas.getPointer(opt.e);
      
      // Calculate zoom point with boundaries in mind
      const point = {
        x: Math.min(Math.max(pointer.x, CANVAS_BOUNDS.minX), CANVAS_BOUNDS.maxX),
        y: Math.min(Math.max(pointer.y, CANVAS_BOUNDS.minY), CANVAS_BOUNDS.maxY)
      };

      // Apply zoom
      canvas.zoomToPoint(point, zoomLevel);

      // Ensure we're within bounds after zoom
      const constrainedVpt = constrainPan(canvas.viewportTransform);
      canvas.setViewportTransform(constrainedVpt);

      // Update Redux state
      dispatch(setZoom(zoomLevel));
      dispatch(setViewportTransform(constrainedVpt));
    };

    const handleMouseDown = (opt) => {
      if (opt.e.button === 1 || opt.e.altKey) {
        isDragging = true;
        canvas.selection = false;
        lastPosX = opt.e.clientX;
        lastPosY = opt.e.clientY;
      }
    };

    const handleMouseMove = (opt) => {
      if (!isDragging) return;
      
      const e = opt.e;
      const currentPosX = e.clientX;
      const currentPosY = e.clientY;

      // Calculate the proposed movement
      const dx = currentPosX - lastPosX;
      const dy = currentPosY - lastPosY;

      // Get current viewport transform
      const vpt = [...canvas.viewportTransform];

      // Apply the movement
      vpt[4] += dx;
      vpt[5] += dy;

      // Constrain the movement
      const constrainedVpt = constrainPan(vpt);

      // Only update if movement is within bounds
      if (constrainedVpt[4] !== canvas.viewportTransform[4] || 
          constrainedVpt[5] !== canvas.viewportTransform[5]) {
        canvas.setViewportTransform(constrainedVpt);
        dispatch(setPan({ x: constrainedVpt[4], y: constrainedVpt[5] }));
        dispatch(setViewportTransform(constrainedVpt));
      }

      // Update last position
      lastPosX = currentPosX;
      lastPosY = currentPosY;
    };

    const handleMouseUp = () => {
      isDragging = false;
      canvas.selection = true;
    };

    // Initialize with constrained viewport
    const initialVpt = [...canvas.viewportTransform];
    const constrainedInitialVpt = constrainPan(initialVpt);
    canvas.setViewportTransform(constrainedInitialVpt);
    dispatch(setViewportTransform(constrainedInitialVpt));

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
