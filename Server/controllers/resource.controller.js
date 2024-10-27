import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
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
        owner:req.user._id,
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

const getResource=asyncHandler(async(req,res)=>{
    const {title}=req.body
    const resource=await Resource.find({$text:{$search:title}})
    if(resource.length==0){
        throw new ApiError(400,"No resource found")
    }
    res.status(200).json(
        new ApiResponse(
            200,
            resource,
            "Resources found"
        )
    )
})

const DeleteResource =asyncHandler(async(req,res)=>{
    const {id}=req.params
    const resource=await Resource.findById(id)
    const resourceUrl = Array.isArray(resource.resource) ? resource.resource[0] : resource.resource;
  
    const publicId = resourceUrl.split('/').pop().split('.')[0];
    await deleteFromCloudinary(publicId)
    const deleteResource=await Resource.findByIdAndDelete(id)
   
    if(!deleteResource){
        throw new ApiError(400,"Failed to delete resource")
    }
    res.status(200).json(
        new ApiResponse(
            200,
            "",
            "Resource deleted successfully"
        )
    )
})


export {AddResources,DeleteResource,getResource}