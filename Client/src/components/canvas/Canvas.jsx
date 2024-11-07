import {useRef, useEffect} from "react"
import { useDispatch } from "react-redux"
import { Card } from "../ui/card"
import { setCanvasSize } from "@/store/canvasSlice"
import { Toolbar } from "./Toolbar"
import { ExportButton } from "./ExportButton"
import { useCanvasDrawing } from "./hooks/useCanvasDrawing"

const Canvas = () => {
    const canvasRef = useRef(null);
    const dispatch = useDispatch();
    const { 
      handleMouseDown, 
      handleMouseMove, 
      handleMouseUp,
      handleMouseLeave,
      handleUndo,
      handleRedo 
    } = useCanvasDrawing(canvasRef);
  
    useEffect(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        dispatch(setCanvasSize({ width: rect.width, height: rect.height }));
      }
    }, [dispatch]);
  
    return (
      <div className="w-full p-4 space-y-4">
        <ExportButton canvasRef={canvasRef} />
        <Toolbar onUndo={handleUndo} onRedo={handleRedo} />
        <Card className="w-full aspect-video bg-white">
          <canvas 
            ref={canvasRef}
            className="w-full h-full"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          />
        </Card>
      </div>
    );
  };
  
  export default Canvas;