import {useRef, useEffect, useCallback} from "react"
import { useDispatch, useSelector } from "react-redux"
import { startDrawing, addPoint, endDrawing, setPaths } from "@/store/canvasSlice"
import { addToHistory,  undo as undoAction, 
    redo as redoAction } from "@/store/historySlice"
import { drawPath, getMousePos } from "../utils/drawingUtils"


export const useCanvasDrawing = (canvasRef) => {
    const dispatch = useDispatch();
    const currentTool = useSelector(state => state.tools.currentTool);
    const toolSettings = useSelector(state => state.tools.toolSettings);
    const isDrawing = useSelector(state => state.canvas.isDrawing);
    const canvasState = useSelector(state => state.canvas);
    const history = useSelector(state => state.history);
  
    const startPointRef = useRef(null);
    const previousStateRef = useRef(null);
  
    const redrawCanvas = useCallback((paths = canvasState.paths) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
  
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Draw all completed paths
      paths.forEach(path => {
        drawPath(ctx, path);
      });
      
      // Draw current path if exists
      if (canvasState.currentPath) {
        drawPath(ctx, canvasState.currentPath);
      }
    }, [canvasState]);
  
    const handleMouseDown = (e) => {
      e.preventDefault(); // Prevent unwanted behaviors
      
      const canvas = canvasRef.current;
      const point = getMousePos(canvas, e);
      startPointRef.current = point;
  
      // For shape tools, store the previous canvas state
      if (currentTool !== 'pencil' && currentTool !== 'eraser') {
        const ctx = canvas.getContext('2d');
        previousStateRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      }
      
      dispatch(startDrawing({
        tool: currentTool,
        settings: toolSettings[currentTool],
        point
      }));
    };
  
    const handleMouseMove = (e) => {
      e.preventDefault();
      if (!isDrawing) return;
      
      const canvas = canvasRef.current;
      const point = getMousePos(canvas, e);
      
      dispatch(addPoint(point));
  
      // For shapes, restore previous state before drawing
      if (currentTool !== 'pencil' && currentTool !== 'eraser') {
        if (previousStateRef.current) {
          const ctx = canvas.getContext('2d');
          ctx.putImageData(previousStateRef.current, 0, 0);
          if (canvasState.currentPath) {
            drawPath(ctx, canvasState.currentPath);
          }
        }
      } else {
        // For pencil and eraser, draw incrementally
        const ctx = canvas.getContext('2d');
        if (canvasState.currentPath?.points.length > 1) {
          drawPath(ctx, {
            tool: currentTool,
            settings: toolSettings[currentTool],
            points: [
              canvasState.currentPath.points[canvasState.currentPath.points.length - 2],
              point
            ]
          });
        }
      }
    };
  
    const handleMouseUp = () => {
        if (isDrawing) {
          // Complete the current drawing
          dispatch(endDrawing());
          
          // Create new paths array including the current path
          const newPaths = [...canvasState.paths];
          if (canvasState.currentPath) {
            newPaths.push(canvasState.currentPath);
          }
          
          // Add to history
          dispatch(addToHistory(newPaths));
          
          // Reset refs
          previousStateRef.current = null;
          startPointRef.current = null;
        }
      };
    
  
    const handleMouseLeave = () => {
      if (isDrawing) {
        handleMouseUp();
      }
    };
  
    const handleUndo = useCallback(() => {
        const past = history.past;
        if (past.length > 0) {
          // Get the previous state
          const previousPaths = past[past.length - 1];
          
          // Dispatch undo action with current paths
          dispatch(undoAction({ currentPaths: canvasState.paths }));
          
          // Update canvas paths with previous state
          dispatch(setPaths(previousPaths));
          
          // Redraw canvas
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          previousPaths.forEach(path => drawPath(ctx, path));
        }
      }, [history.past, canvasState.paths, dispatch]);
    
      const handleRedo = useCallback(() => {
        const future = history.future;
        if (future.length > 0) {
          // Get the next state
          const nextPaths = future[0];
          
          // Dispatch redo action with current paths
          dispatch(redoAction({ currentPaths: canvasState.paths }));
          
          // Update canvas paths with next state
          dispatch(setPaths(nextPaths));
          
          // Redraw canvas
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          nextPaths.forEach(path => drawPath(ctx, path));
        }
      }, [history.future, canvasState.paths, dispatch]);
  
    // Redraw canvas when paths change
    useEffect(() => {
      redrawCanvas();
    }, [redrawCanvas, canvasState.paths]);
  
    return {
      handleMouseDown,
      handleMouseMove,
      handleMouseUp,
      handleMouseLeave,
      handleUndo,
      handleRedo,
      redrawCanvas
    };
  };