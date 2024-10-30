import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import UserProfile from "../models/user_profileModel.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const CompleteProfile = asyncHandler(async (req, res) => {
  const { phone, location, university, college } = req.body;

  const Profilelocation = req.files?.profilePicture?.[0]?.path;

  if (!Profilelocation) {
    throw new ApiError(401, "Failed to upload Profile");
  }
  const uploadProfile = await uploadOnCloudinary(Profilelocation);
  console.log(uploadProfile);
  const profilePicture = uploadProfile.url;
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
  const userProfile = await UserProfile.find({ user: req.user._id });
  if (!userProfile) {
    throw new ApiError(400, "No use found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, userProfile, "user found successfully"));
});

const EditProfileDetails = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await UserProfile.findOne({ user: userId });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  Object.assign(user.contactInfo, req.body);

  await user.save();
  res.status(200).json(new ApiResponse(200, user, "User updated successfully"));
});
const editProfilePicture = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const user = await UserProfile.findOne({ user: userId });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const oldProfilePic = UserProfile.profilePicture;
  const newProfilePicLocalPath = req.file?.path;

  if (!newProfilePicLocalPath) {
    throw new ApiError(400, "new profile pic needed");
  }
  try {
    const newProfilePic = await uploadOnCloudinary(newProfilePicLocalPath);
    if (!newProfilePic) {
      throw new ApiError(500, "Profile can't be updated");
    }
    const newProfileDetails = await UserProfile.findByIdAndUpdate(userId, {
      $set: {
        profilePicture: {
          publicId: newProfilePic.public_id,
          url: newProfilePic.url,
        },
      },
    });
    if (!newProfileDetails) {
      throw new ApiError(500, "Failed while updating the profile pic");
    }
    await deleteFromCloudinary(oldProfilePic.publicId)
    return res.status(200).json(new ApiResponse(200, newProfileDetails, "Profile Pic updated successfully"))
  } catch (error) {
    console.log(error.message)
    throw new ApiError(500, "Server Error")
  }
});

export { CompleteProfile, getProfile, EditProfileDetails, editProfilePicture };
