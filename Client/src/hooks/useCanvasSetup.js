import { useEffect } from 'react';

export const useCanvasSetup = (fabricRef, canvasRef) => {
  useEffect(() => {
    if (!fabricRef.current || !canvasRef.current) return;

    const canvas = fabricRef.current;
    
    // Set up high DPI scaling
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getElement().getBoundingClientRect();
    
    canvas.setWidth(rect.width * dpr);
    canvas.setHeight(rect.height * dpr);
    canvas.setZoom(dpr);
    
    // Enable retina scaling
    canvas.enableRetinaScaling = true;
    
    // Improve rendering quality
    canvas.imageSmoothingEnabled = true;
    canvas.imageSmoothingQuality = 'high';
    
    // Set initial viewport center
    const vpw = canvas.width;
    const vph = canvas.height;
    
    // Center the viewport
    canvas.absolutePan({ x: -vpw / 2, y: -vph / 2 });
    
    return () => {
      canvas.dispose();
    };
  }, [fabricRef, canvasRef]);
};
