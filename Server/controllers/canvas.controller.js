import Canvas from "../models/canvasModel.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const createCanvas = asyncHandler(async (req, res)=>{
    try {
        const {name} = req.body;
        const newCanvas = new Canvas({
            name, objects: [], createdBy: req.user?._id
        })
        await newCanvas.save()
        return res.status(200).json(new ApiResponse(201, newCanvas, "New Canvas Created Successfully"))
    } catch (error) {
        return ApiError(500, `Error creating canvas ${error.message}`)
    }
})
const getCanvas = asyncHandler(async (req, res)=>{
    try {
        const canvas = await Canvas.findById(req.params.id);
        if (!canvas) {
            return new ApiError(404, "No canvas found")
        }
        return res.status(200).json(200, canvas, "Canvas found")
    } catch (error) {
        return new ApiError(500, `Error fetching canvas ${error.message}`)
    }
});
const updateCanvas = asyncHandler(async(req, res)=>{
    try {
        const {objects, viewportTransform} = req.body;
        const canvas = await Canvas.findById(req.params.id);
        if (!canvas) {
            return ApiError(400, "Canvas not found")
        }
        canvas.objects = objects;
        canvas.viewportTransform = viewportTransform;
        canvas.lastModified = Date.now()
        await canvas.save()
        return res.status(200).json(new ApiResponse(200, canvas, "Canvas updated successfully"))
    } catch (error) {
        return new ApiError(500, `Error updating canvas ${error.message}`)
    }
})
export {createCanvas,updateCanvas, getCanvas}