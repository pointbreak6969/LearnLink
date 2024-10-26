import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import UserProfile from "../models/user_profileModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const EditProfile = asyncHandler(async(req,res)=>{
   
    const {phone,location,university,college}=req.body

    const Profilelocation=req.files?.profilePicture?.[0]?.path;
   
    if(!Profilelocation){
        throw new ApiError(401,"Failed to upload Profile")
    }
    const uploadProfile=await uploadOnCloudinary(Profilelocation)
    console.log(uploadProfile);
    const profilePicture=uploadProfile.url
    const profile=UserProfile.create({
        user:req.user._id,
        profilePicture,
        contactInfo:{phone,location,university,college}
    })
    if(!profile){
        throw new ApiError(401,"Failed to edit Profile")
    }
    res.status(200).json(
        new ApiResponse(
            200,
            profile,
            "Profile edited successfully"
        )
    )
})

const getProfile=asyncHandler(async(req,res)=>{
    const userProfile=await UserProfile.find({user:req.user._id})
    if(!userProfile){
        throw new ApiError(400,"No use found")
    }
    res.status(200).json(
        new ApiResponse(
            200,
            userProfile,
            "user found successfully"
        )
    )
})

export {EditProfile,getProfile}