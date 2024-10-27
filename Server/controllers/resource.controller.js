import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Resource from "../models/resourceModel.js";

const AddResources=asyncHandler(async(req,res)=>{
    const {title,text}=req.body
    const  resourceLocation=req.files?.resource?.[0]?.path
    if(!resourceLocation){
        throw new ApiError(400,"No resource provided")
    }
    const resources=await uploadOnCloudinary(resourceLocation)
    const resource=resources.url
    const CreatedResource=await Resource.create({
        title,
        text,
        resource
    })
    if(!CreatedResource){
        throw new ApiError(400,"Failed to add resource")
    }
    res.status(200)
    .json(
        new ApiResponse(
            200,
            CreatedResource,
            "New Resource added"
        )
    )
})

export {AddResources}