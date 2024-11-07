import {useRef, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { startDrawing, addPoint, endDrawing, } from "@/store/canvasSlice"
import { addToHistory } from "@/store/historySlice"
import { drawPath } from "../utils/drawingUtils"

export const useCanvasDrawing = (canvasRef) =>{
    const dispatch = useDispatch()
    const currentTool = useSelector((state)=> state.tools.currentTool)
    const toolSettings = useSelector((state)=> state.tools.toolSettings)
    const isDrawing = useSelector((state)=> state.canvas.isDrawing)
    const canvasState = useSelector((state)=> state.canvas)
    const startPointRef = useRef(null)
    const previousStateRef = useRef(null)
    const handleMouseDown = (e)=>{
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect()
        const point = {
            x: e.clientX -rect.left,
            y: e.clientY - rect.top
        }
        startPointRef.current = point;
        if (currentTool !== "pencil" && currentTool !=="eraser"){
            const ctx = canvas.getcontext('2d');
            previousStateRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height)
        }
        dispatch(startDrawing({
            tool: currentTool,
            settings: toolSettings[currentTool],
            point
        }))
    } 
    const handleMouseMove = (e) =>{
        if (!isDrawing) return;
        const canvas = canvasRef.current;
    }
}