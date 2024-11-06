import { useEffect } from 'react';
import * as fabric from 'fabric';
import { setObjects } from '@/store/canvasSlice.js';

export const useShapeDrawing = (fabricRef, activeTool, currentColor, currentFill, dispatch) => {
  useEffect(() => {
    if (!fabricRef.current) return;
    const canvas = fabricRef.current;

    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');

    if (!['rectangle', 'circle', 'triangle'].includes(activeTool)) {
      return;
    }

    let isDrawing = false;
    let startPoint = null;
    let activeShape = null;

    const handleMouseDown = (o) => {
      isDrawing = true;
      const pointer = canvas.getPointer(o.e);
      startPoint = { x: pointer.x, y: pointer.y };

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
    };

    const handleMouseMove = (o) => {
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

      if (pointer.x < startPoint.x) {
        activeShape.set({ left: pointer.x });
      }
      if (pointer.y < startPoint.y) {
        activeShape.set({ top: pointer.y });
      }

      canvas.renderAll();
    };

    const handleMouseUp = () => {
      isDrawing = false;
      if (activeShape) {
        activeShape.set({
          selectable: true
        });
        canvas.setActiveObject(activeShape);
        dispatch(setObjects(canvasService.serializeCanvas(canvas)));
      }
    };

    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);

    return () => {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:move', handleMouseMove);
      canvas.off('mouse:up', handleMouseUp);
    };
  }, [fabricRef, activeTool, currentColor, currentFill, dispatch]);
};
