import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import UserProfile from "../models/user_profileModel.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const completeProfile = asyncHandler(async (req, res) => {
  const { phone, location, university, college } = req.body;
  if (!(phone && location && university && college)) {
    throw new ApiError(400, "All fields are required");
  }
  const Profilelocation = req.file.path;

  if (!Profilelocation) {
    throw new ApiError(401, "Failed to upload Profile");
  }
  const uploadProfile = await uploadOnCloudinary(Profilelocation);
  const profilePicture = uploadProfile;
  const profile = UserProfile.create({
    user: req.user._id,
    profilePicture: {
      publicId: profilePicture.public_id,
      url: profilePicture.url,
    },
    contactInfo: { phone, location, university, college },
    
  });
  if (!profile) {
    throw new ApiError(401, "Failed to edit Profile");
  }
  res
    .status(200)
    .json(new ApiResponse(200, profile, "Profile edited successfully"));
});

const getProfile = asyncHandler(async (req, res) => {
  const userProfile = await UserProfile.aggregate([
    {
      '$match': {
        'user': req.user?._id
      }
    }, {
      '$lookup': {
        'from': 'users', 
        'localField': 'user', 
        'foreignField': '_id', 
        'as': 'user_details'
      }
    }, {
      '$addFields': {
        'user_details': {
          '$arrayElemAt': [
            '$user_details', 0
          ]
        }
      }
    }
  ])
  if (!userProfile) {
    throw new ApiError(400, "No use found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, userProfile, "user found successfully"));
});

const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  // Find the user's profile
  const user = await UserProfile.findOne({ user: userId });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Update profile details if provided in the request body
  if (req.body && Object.keys(req.body).length > 0) {
    Object.assign(user.contactInfo, req.body);
  }

  // Update profile picture if a new one is uploaded
  if (req.file) {
    const newProfilePicLocalPath = req.file.path;

    if (!newProfilePicLocalPath) {
      throw new ApiError(400, "New profile picture is required");
    }

    try {
      const newProfilePic = await uploadOnCloudinary(newProfilePicLocalPath);
      if (!newProfilePic) {
        throw new ApiError(500, "Failed to upload new profile picture");
      }

      // Delete the old profile picture from Cloudinary
      if (user.profilePicture?.publicId) {
        await deleteFromCloudinary(user.profilePicture.publicId);
      }

      // Update user's profile picture details
      user.profilePicture = {
        publicId: newProfilePic.public_id,
        url: newProfilePic.url,
      };
    } catch (error) {
      console.error(error.message);
      throw new ApiError(500, "Error updating profile picture");
    }
  }

  // Save the updated profile
  await user.save();

  // Respond with the updated user profile
  res.status(200).json(
    new ApiResponse(200, user, "Profile updated successfully")
  );
});

export { completeProfile, getProfile, updateProfile };
